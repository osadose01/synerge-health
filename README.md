# Synerge Health

Synerge Health's website is built with Astro, React, and Tailwind CSS and runs as a Cloudflare Worker. Form submissions and newsletter subscriptions are stored in Cloudflare D1; notification email is sent through Resend.

## Local development

Use Node.js 22.12.0 or newer.

```bash
npm ci
npm run dev
```

Run the Astro/TypeScript diagnostics with:

```bash
npm run astro:check
```

Run the focused form workflow tests with:

```bash
npm test
```

For local Worker testing, build the site, apply the D1 migration to the local database, then start Wrangler for the site:

```bash
npm run build
npx wrangler d1 migrations apply synerge-health-forms --local
npx wrangler dev --config dist/server/wrangler.json
```

The scheduled email Worker can be run separately with `npx wrangler dev --config wrangler.scheduled.jsonc`. Set local secrets in `.dev.vars` (never commit that file). The scheduled Worker requires a `RESEND_API_KEY`; Resend must be configured with a verified sending domain before email delivery can succeed. Both Wrangler configs target the production D1 database; apply the migration to a separate local database before local testing.

## Production setup and deployment

1. Authenticate Wrangler to the Cloudflare account that contains the production `synerge-health` Worker. Confirm the production D1 ID in both Wrangler configs, then apply the schema:

   ```bash
   npx wrangler d1 migrations apply synerge-health-forms --remote
   ```
2. Verify `synergehealth.com` as a sending domain in Resend and confirm the configured sender is authorized.
3. Set the Resend API key using Wrangler's interactive secret prompt (do not pass the key as a command argument):

   ```bash
   npx wrangler secret put RESEND_API_KEY --config wrangler.scheduled.jsonc
   ```
4. Confirm the recipient and sender settings in both Wrangler configs, then deploy:

   ```bash
   npm run deploy
   ```

The site Worker serves the website and form endpoints. A separate scheduled Worker drains the email outbox and runs retention cleanup every five minutes. Its Wrangler config declares `RESEND_API_KEY` as required so deployments warn or fail if the secret is unavailable. Both Worker configs enable Workers Logs with full sampling so permanent email-delivery failures can be alerted on after deployment. If a Resend key is exposed, revoke it in Resend and create a replacement; enter secrets only through the Cloudflare secret prompt, never in chat, source, or command arguments.

## Forms, email, and retention

- Founder applications are emailed to `careers@synergehealth.com`.
- Investor enquiries are emailed to `investors@synergehealth.com`.
- Contact messages and newsletter notifications are emailed to `hello@synergehealth.com`.
- For email smoke tests, use Resend's designated `delivered@resend.dev` test address; Resend rejects `example.com` recipients with HTTP 422.
- Form endpoints validate input, apply a per-IP rate limit, persist submissions and queued email in D1, and return success only after persistence.
- Failed notifications are retried by the Worker. Founder applications and investor enquiries are retained for 12 months; contact messages for 6 months.
- After all delivery attempts are exhausted, the outbox row is marked `failed` and the Worker emits the structured `FORM_EMAIL_DELIVERY_FAILED` event with `permanent: true`. Configure a Cloudflare log-based alert for that event and route it to an operational inbox before launch; this alert is not configured automatically by the repository.
- After both Workers have been deployed, create a Cloudflare Custom Alert (Alerts > Overview) using the `logs.workersLogs` dataset. For the scheduled Worker, use this query, set the evaluation window to 15 minutes, alert when the result is greater than zero, and add a verified operational email destination:

  ```sql
  SELECT COUNT(*) AS value
  FROM logs.workersLogs
  WHERE accountTag = '<ACCOUNT_TAG>'
    AND scriptName = 'synerge-health-forms-scheduler'
    AND attributes['event'] = 'FORM_EMAIL_DELIVERY_FAILED'
    AND attributes['permanent'] = 'true'
  ```

  Custom Alerts and Workers Logs availability depend on the Cloudflare account plan and permissions. Verify delivery with the alert's test action; this repository cannot create the dashboard alert or verify an inbox.
- Astro generates per-page CSP hashes for inline scripts and styles. The middleware adds complementary security headers to Worker responses, while `public/_headers` covers static assets.
- Review exhausted jobs without exposing submission content:

  ```bash
  npx wrangler d1 execute synerge-health-forms --remote --command "SELECT id, attempts, last_error_code, created_at FROM form_email_outbox WHERE delivery_status = 'failed' ORDER BY created_at DESC;"
  ```

- Newsletter subscription is immediate. Each welcome email includes an unsubscribe link; subscriber information is retained until unsubscribe.
- Do not submit patient-identifying or other sensitive personal information through the website forms.

Cloudflare Email Routing is for receiving/forwarding mail; it does not configure Resend sending. See [TASKS.md](./TASKS.md) for the remaining account and launch checks.
