import { Resend } from "resend";
import { z } from "zod";
import { renderWelcomeEmailHtml, stripHtmlToPlainText } from "./emailTemplates";

type Environment = CloudflareEnv;
type DeliveryEnvironment = Pick<CloudflareEnv, "FORM_DB" | "RESEND_API_KEY" | "FORM_FROM_EMAIL">;
type FormType = "application" | "contact" | "investor";

const MAX_BODY_BYTES = 16_384;
const MAX_ATTEMPTS = 8;
const RETRY_DELAYS_SECONDS = [60, 300, 1_800, 7_200, 43_200];

const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));
const text = (max: number) => z.string().trim().max(max);
const httpsUrl = z.url({
  protocol: /^https?$/,
  error: "Enter a valid HTTP or HTTPS URL.",
}).max(500);

function getFieldErrors(error: z.ZodError) {
  const fields: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string") continue;
    fields[field] = [...(fields[field] ?? []), issue.message];
  }
  return fields;
}

const formSchemas = {
  application: z.object({
    name: text(120).min(1),
    email: emailSchema,
    startup: text(160),
    stage: z.enum(["Idea", "Validation", "MVP", "Revenue"]),
    problem: text(4_000).min(1),
    solution: text(4_000),
    pitchDeck: z.union([httpsUrl, z.literal("")]),
    website_url: z.string().optional(),
  }).strict(),
  contact: z.object({
    name: text(120).min(1),
    email: emailSchema,
    subject: text(200),
    message: text(4_000).min(1),
    website_url: z.string().optional(),
  }).strict(),
  investor: z.object({
    name: text(120).min(1),
    email: emailSchema,
    organization: text(200),
    investorType: z.enum([
      "Venture Capital",
      "Angel Investor",
      "Family Office",
      "DFI / Impact",
      "Corporate / Healthcare",
    ]),
    checkSize: z.union([
      z.enum(["$50k - $250k", "$250k - $1M", "$1M - $5M", "$5M+"]),
      z.literal(""),
    ]),
    message: text(4_000),
    website_url: z.string().optional(),
  }).strict(),
} satisfies Record<FormType, z.ZodType>;

type OutboxRow = {
  id: string;
  recipient: string;
  reply_to: string | null;
  subject: string;
  body_text: string;
  attempts: number;
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getRetentionSeconds(type: FormType) {
  return type === "application" || type === "investor"
    ? 365 * 24 * 60 * 60
    : 180 * 24 * 60 * 60;
}

function getRecipient(type: FormType, env: Environment) {
  if (type === "application") return env.FORM_APPLICATION_TO;
  if (type === "investor") return env.FORM_INVESTOR_TO;
  return env.FORM_CONTACT_TO;
}

function formatSubmission(type: FormType, payload: Record<string, string>) {
  const labels: Record<FormType, string> = {
    application: "Founder application",
    contact: "Contact message",
    investor: "Investor enquiry",
  };
  const fields = Object.entries(payload)
    .map(([key, value]) => `${key}: ${value || "(not provided)"}`)
    .join("\n");

  return {
    subject: `[Synerge Health] ${labels[type]}`,
    body: `${labels[type]} received through synergehealth.com.\n\n${fields}`,
  };
}

async function checkRateLimit(request: Request, env: Environment) {
  const clientIp = request.headers.get("CF-Connecting-IP") ?? "local-development";
  try {
    const result = await env.FORM_RATE_LIMITER.limit({ key: clientIp });
    return result.success;
  } catch (error) {
    console.error("Form rate limiter unavailable", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return null;
  }
}

async function readJson(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return { error: jsonResponse({ error: "Content-Type must be application/json." }, 415) };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return { error: jsonResponse({ error: "Submission is too large." }, 413) };
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return { error: jsonResponse({ error: "Submission is too large." }, 413) };
  }

  try {
    return { data: JSON.parse(raw) as unknown };
  } catch {
    return { error: jsonResponse({ error: "Request body must be valid JSON." }, 400) };
  }
}

export async function submitForm(
  request: Request,
  env: Environment,
  type: FormType,
): Promise<Response> {
  const rateLimited = await checkRateLimit(request, env);
  if (rateLimited === null) {
    return jsonResponse({ error: "Submissions are temporarily unavailable. Please try again." }, 503);
  }
  if (!rateLimited) {
    return jsonResponse({ error: "Too many attempts. Please wait and try again." }, 429);
  }

  const body = await readJson(request);
  if (body.error) return body.error;

  const result = formSchemas[type].safeParse(body.data);
  if (!result.success) {
    return jsonResponse(
      { error: "Please check the submitted fields.", fields: getFieldErrors(result.error) },
      422,
    );
  }

  const payload = result.data as Record<string, string>;

  // Honeypot check: drop bot submissions silently
  if (payload.website_url && payload.website_url.trim().length > 0) {
    return jsonResponse(
      { success: true, message: "Your submission has been received and queued." },
      202,
    );
  }

  const { website_url: _discarded, ...cleanPayload } = payload;
  const id = crypto.randomUUID();
  const jobId = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1_000);
  const expiresAt = now + getRetentionSeconds(type);
  const notification = formatSubmission(type, cleanPayload);

  try {
    await env.FORM_DB.batch([
      env.FORM_DB.prepare(
        `INSERT INTO form_submissions
          (id, form_type, email, payload_json, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).bind(id, type, cleanPayload.email, JSON.stringify(cleanPayload), now, expiresAt),
      env.FORM_DB.prepare(
        `INSERT INTO form_email_outbox
          (id, submission_id, recipient, reply_to, subject, body_text, created_at, expires_at, next_attempt_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        jobId,
        id,
        getRecipient(type, env),
        payload.email,
        notification.subject,
        notification.body,
        now,
        expiresAt,
        now,
      ),
    ]);
  } catch (error) {
    console.error("Form submission persistence failed", {
      type,
      error: error instanceof Error ? error.name : "unknown",
    });
    return jsonResponse({ error: "We could not save your submission. Please try again." }, 503);
  }

  return jsonResponse(
    { success: true, message: "Your submission has been received and queued." },
    202,
  );
}

const newsletterSchema = z
  .object({
    email: emailSchema,
    company: z.string().optional(),
    turnstileToken: z.string().optional(),
  })
  .strict();

export async function verifyTurnstileToken(
  token: string | undefined | null,
  clientIp: string,
  secretKey: string | undefined,
): Promise<boolean> {
  if (!secretKey) {
    return true;
  }
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (clientIp && clientIp !== "local-development") {
      formData.append("remoteip", clientIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch (error) {
    console.error("Turnstile verification failed", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return false;
  }
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function subscribeToNewsletter(request: Request, env: Environment) {
  const rateLimited = await checkRateLimit(request, env);
  if (rateLimited === null) {
    return jsonResponse({ error: "Subscriptions are temporarily unavailable. Please try again." }, 503);
  }
  if (!rateLimited) {
    return jsonResponse({ error: "Too many attempts. Please wait and try again." }, 429);
  }

  const body = await readJson(request);
  if (body.error) return body.error;
  const parsed = newsletterSchema.safeParse(body.data);
  if (!parsed.success) {
    return jsonResponse({ error: "Enter a valid email address." }, 422);
  }

  // Honeypot check: bots fill hidden fields
  if (parsed.data.company && parsed.data.company.trim().length > 0) {
    return jsonResponse(
      { success: true, message: "You are subscribed. An unsubscribe link is queued for your email." },
      202,
    );
  }

  // Cloudflare Turnstile verification
  if (env.TURNSTILE_SECRET_KEY) {
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "";
    const isHuman = await verifyTurnstileToken(
      parsed.data.turnstileToken,
      clientIp,
      env.TURNSTILE_SECRET_KEY,
    );
    if (!isHuman) {
      return jsonResponse(
        { error: "Security check failed. Please refresh and try again." },
        403,
      );
    }
  }

  const id = crypto.randomUUID();
  const notificationId = crypto.randomUUID();
  const welcomeId = crypto.randomUUID();
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const now = Math.floor(Date.now() / 1_000);
  const unsubscribeUrl = new URL("/unsubscribe", env.PUBLIC_SITE_URL);
  unsubscribeUrl.searchParams.set("id", id);
  unsubscribeUrl.searchParams.set("token", token);
  const welcomeHtml = renderWelcomeEmailHtml({
    siteUrl: env.PUBLIC_SITE_URL,
    unsubscribeUrl: unsubscribeUrl.toString(),
  });

  try {
    const results = await env.FORM_DB.batch([
      env.FORM_DB.prepare(
        `INSERT OR IGNORE INTO newsletter_subscribers
          (id, email, unsubscribe_token_hash, subscribed_at)
         VALUES (?, ?, ?, ?)`,
      ).bind(id, parsed.data.email, tokenHash, now),
      env.FORM_DB.prepare(
        `INSERT INTO form_email_outbox
          (id, subscriber_id, recipient, subject, body_text, created_at, next_attempt_at)
         SELECT ?, id, ?, ?, ?, ?, ? FROM newsletter_subscribers WHERE id = ?`,
      ).bind(
        notificationId,
        env.FORM_NEWSLETTER_TO,
        "[Synerge Health] Newsletter subscription",
        `New newsletter subscription: ${parsed.data.email}`,
        now,
        now,
        id,
      ),
      env.FORM_DB.prepare(
        `INSERT INTO form_email_outbox
          (id, subscriber_id, recipient, subject, body_text, created_at, next_attempt_at)
         SELECT ?, id, email, ?, ?, ?, ? FROM newsletter_subscribers WHERE id = ?`,
      ).bind(
        welcomeId,
        "[Synerge Health] Welcome to Dispatch",
        welcomeHtml,
        now,
        now,
        id,
      ),
    ]);

    if (results[0]?.meta.changes === 0) {
      return jsonResponse({ success: true, message: "This email is already subscribed." }, 200);
    }
  } catch (error) {
    console.error("Newsletter subscription persistence failed", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return jsonResponse({ error: "We could not save your subscription. Please try again." }, 503);
  }

  return jsonResponse(
    { success: true, message: "You are subscribed. An unsubscribe link is queued for your email." },
    202,
  );
}

export async function unsubscribeFromNewsletter(request: Request, env: Environment) {
  const formData = await request.formData();
  const id = formData.get("id");
  const token = formData.get("token");
  if (typeof id !== "string" || typeof token !== "string" || !id || !token || token.length > 128) {
    return Response.redirect(new URL("/unsubscribe?status=invalid", request.url), 303);
  }

  const tokenHash = await hashToken(token);
  try {
    const result = await env.FORM_DB.prepare(
      "DELETE FROM newsletter_subscribers WHERE id = ? AND unsubscribe_token_hash = ?",
    ).bind(id, tokenHash).run();
    const status = result.meta.changes > 0 ? "success" : "invalid";
    return Response.redirect(new URL(`/unsubscribe?status=${status}`, request.url), 303);
  } catch (error) {
    console.error("Newsletter unsubscribe failed", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return Response.redirect(new URL("/unsubscribe?status=error", request.url), 303);
  }
}

async function deliverPendingEmails(env: DeliveryEnvironment) {
  const now = Math.floor(Date.now() / 1_000);
  const { results } = await env.FORM_DB.prepare(
    `SELECT id FROM form_email_outbox
     WHERE delivery_status = 'pending'
       AND next_attempt_at <= ?
       AND (lease_until IS NULL OR lease_until < ?)
     ORDER BY created_at
     LIMIT 20`,
  ).bind(now, now).all<{ id: string }>();

  for (const job of results) {
    const claimed = await env.FORM_DB.prepare(
      `UPDATE form_email_outbox
       SET lease_until = ?, attempts = attempts + 1
       WHERE id = ?
         AND delivery_status = 'pending'
         AND next_attempt_at <= ?
         AND (lease_until IS NULL OR lease_until < ?)
       RETURNING id, recipient, reply_to, subject, body_text, attempts`,
    ).bind(now + 120, job.id, now, now).first<OutboxRow>();

    if (!claimed) continue;

    if (!env.RESEND_API_KEY || !env.FORM_FROM_EMAIL) {
      await recordDeliveryFailure(env, claimed, now, "mail_configuration_missing");
      continue;
    }

    try {
      const resend = new Resend(env.RESEND_API_KEY);
      const isHtml =
        claimed.body_text?.trim().startsWith("<!doctype") ||
        claimed.body_text?.trim().startsWith("<html");

      const { error } = await resend.emails.send({
        from: env.FORM_FROM_EMAIL,
        to: claimed.recipient,
        replyTo: claimed.reply_to ?? undefined,
        subject: claimed.subject,
        text: isHtml ? stripHtmlToPlainText(claimed.body_text) : claimed.body_text,
        html: isHtml ? claimed.body_text : undefined,
      });
      if (error) throw new Error("resend_rejected");

      await env.FORM_DB.prepare(
        `UPDATE form_email_outbox
         SET delivery_status = 'sent', sent_at = ?, lease_until = NULL,
             recipient = NULL, reply_to = NULL, subject = NULL, body_text = NULL,
             last_error_code = NULL
         WHERE id = ?`,
      ).bind(now, claimed.id).run();
    } catch (error) {
      await recordDeliveryFailure(
        env,
        claimed,
        now,
        error instanceof Error && error.message === "resend_rejected"
          ? "resend_rejected"
          : "resend_unavailable",
      );
    }
  }
}

async function recordDeliveryFailure(
  env: DeliveryEnvironment,
  job: OutboxRow,
  now: number,
  errorCode: string,
) {
  const exhausted = job.attempts >= MAX_ATTEMPTS;
  const retryDelay = RETRY_DELAYS_SECONDS[Math.min(job.attempts - 1, RETRY_DELAYS_SECONDS.length - 1)];
  await env.FORM_DB.prepare(
    `UPDATE form_email_outbox
     SET delivery_status = ?, next_attempt_at = ?, lease_until = NULL, last_error_code = ?
     WHERE id = ?`,
  ).bind(
    exhausted ? "failed" : "pending",
    now + retryDelay,
    errorCode,
    job.id,
  ).run();

  const configuration = errorCode === "mail_configuration_missing"
    ? {
        resendApiKeyConfigured: Boolean(env.RESEND_API_KEY),
        fromEmailConfigured: Boolean(env.FORM_FROM_EMAIL),
      }
    : {};
  console.error("FORM_EMAIL_DELIVERY_FAILED", {
    event: "FORM_EMAIL_DELIVERY_FAILED",
    permanent: exhausted,
    jobId: job.id,
    attempt: job.attempts,
    errorCode,
    ...configuration,
  });
}

export async function runScheduledFormMaintenance(env: DeliveryEnvironment) {
  await deliverPendingEmails(env);
  const now = Math.floor(Date.now() / 1_000);
  await env.FORM_DB.batch([
    env.FORM_DB.prepare(
      `DELETE FROM form_email_outbox
       WHERE expires_at IS NOT NULL AND expires_at <= ?`,
    ).bind(now),
    env.FORM_DB.prepare("DELETE FROM form_submissions WHERE expires_at <= ?").bind(now),
  ]);
}
