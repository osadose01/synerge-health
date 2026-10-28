# Launch checklist

This checklist describes production tasks; do not treat an item as complete until it has been verified in the relevant Cloudflare or Resend account.

## Cloudflare Worker and D1

- [x] Authenticate Wrangler to the Cloudflare account that contains the production `synerge-health` Worker.
- [ ] After verifying it is unused, clean up the empty `synerge-health-forms` D1 created in the previous CLI account; only its initial schema migration was applied. The current account shows only the production database, whose schema was rechecked read-only on 2026-10-15. The previous account/database remains inaccessible (`wrangler d1 list` returned Authentication error 10000); do not delete it until that account and its records can be checked.
- [x] Create the `synerge-health-forms` D1 database in the production account and configure its ID in both Wrangler files.
- [x] Apply `0001_form_submissions.sql` to the production database and verify the expected tables.

  ```bash
  npx wrangler d1 migrations apply synerge-health-forms --remote
  ```

- [x] Check the previously exposed key against active keys in the `synergehealth` Resend workspace on 2026-10-15. It does not match either active key.
- [ ] Confirm the exposed key's revocation if it may belong to another Resend workspace or account; the dashboard does not show deleted-key history. Leave the older general-purpose key untouched until its integration owner is known.
- [x] Create a send-only API key restricted to `synergehealth.com` and store it as `RESEND_API_KEY` on the scheduled Worker. Never put the key in `wrangler.jsonc`, source control, chat, or command arguments.

- [x] Create and verify `synergehealth.com` as a Resend sending domain; the Resend dashboard reports it as verified.
- [x] Deploy the scheduled Worker and enable its five-minute cron after configuring the Resend secret.

- [x] Confirm the notification recipients in `wrangler.jsonc`: applications to `careers@synergehealth.com`, investor enquiries to `investors@synergehealth.com`, and contact/newsletter notifications to `hello@synergehealth.com`.
- [x] Confirm `PUBLIC_SITE_URL` matches the production domain and review the configured five-minute scheduled trigger.
- [x] Deploy both Workers with `npm run deploy`; this also activates Workers Logs with full sampling.
- [x] Create and enable a Cloudflare Custom Alert for permanent delivery failures using `logs.workersLogs`, alert when the 15-minute count is greater than zero, and route it to the Cloudflare account email. Trigger the alert test action; the account inbox receipt still needs confirmation.
- [x] Test all forms, newsletter signup, unsubscribe, and email delivery using non-sensitive test data.
  - Contact, application, and investor notifications reached `sent`. Newsletter notification and welcome messages were accepted using Resend's designated `delivered@resend.dev` test address; the unsubscribe endpoint returned success. All synthetic D1 records were removed.

## Domain email

- [ ] Configure Cloudflare Email Routing if inbound forwarding is needed. Email Routing is enabled, but no routes for the public aliases were found. Destination inboxes were not provided, so no routes or DNS were changed; confirm destinations and compatibility with any existing mail provider first.
- [ ] Set up each required address (`hello@`, `careers@`, and `investors@`) as an email-routing destination or use an actual mailbox provider.
- [ ] Test inbound forwarding separately from outbound Resend delivery. Email Routing does not send the website's notification emails.

## Content, privacy, and operations

- [ ] Confirm all public contact addresses and programme descriptions are current with the site owner. Public email addresses and Worker recipients are consistent, but mailbox ownership and current programme terms are not independently verified.
- [ ] Have qualified counsel verify the named operator, applicable Nigerian and other relevant laws, and actual data-processing arrangements in the Privacy Policy and Terms of Service before launch.
- [x] Keep portfolio-company identities private unless disclosure is explicitly approved. Verified on 2026-10-15 that the public portfolio page does not name portfolio companies.
- [ ] Do not publish performance, funding, regulatory, clinical, or investment-return claims without substantiation and approval.
- [ ] Do not collect patient-identifying information through the public website forms. The forms have no dedicated patient-data fields and warn users not to submit sensitive information, but open-text fields can still accept it; review this risk and the safeguards with qualified counsel.
- [x] Verify retention cleanup in production by confirming the scheduled Worker removed expired synthetic submission and outbox rows.
- [x] Verify newsletter unsubscribe in production using a synthetic subscriber; the valid token returned success and the subscriber/outbox records were removed.
- [ ] Monitor Worker logs and Resend delivery status after launch; investigate persistent delivery failures.
