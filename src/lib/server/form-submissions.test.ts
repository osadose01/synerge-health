import assert from "node:assert/strict";
import { test } from "node:test";
import {
  runScheduledFormMaintenance,
  submitForm,
  subscribeToNewsletter,
} from "./form-submissions";

type Environment = Parameters<typeof submitForm>[1];

function makeEnvironment({
  rateLimitSuccess = true,
  batchResults = [],
}: {
  rateLimitSuccess?: boolean;
  batchResults?: Array<{ meta: { changes: number } }>;
} = {}) {
  const statements: Array<{ sql: string; values: unknown[] }> = [];
  let batchCalls = 0;

  const environment = {
    FORM_RATE_LIMITER: {
      limit: async () => ({ success: rateLimitSuccess }),
    },
    FORM_DB: {
      prepare(sql: string) {
        return {
          bind(...values: unknown[]) {
            const statement = { sql, values };
            statements.push(statement);
            return statement;
          },
        };
      },
      async batch() {
        batchCalls += 1;
        return batchResults;
      },
    },
    FORM_APPLICATION_TO: "careers@synergehealth.com",
    FORM_CONTACT_TO: "hello@synergehealth.com",
    FORM_INVESTOR_TO: "investors@synergehealth.com",
    FORM_NEWSLETTER_TO: "hello@synergehealth.com",
    PUBLIC_SITE_URL: "https://synergehealth.com",
  };

  return {
    env: environment as unknown as Environment,
    statements,
    getBatchCalls: () => batchCalls,
  };
}

function jsonRequest(body: unknown, path = "/api/contact") {
  return new Request(`https://synergehealth.com${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

test("form validation returns field details without writing to D1", async () => {
  const { env, getBatchCalls } = makeEnvironment();
  const response = await submitForm(
    jsonRequest({
      name: "A".repeat(121),
      email: "founder@example.com",
      subject: "",
      message: "A question",
    }),
    env,
    "contact",
  );

  assert.equal(response.status, 422);
  const body = await response.json() as { fields: Record<string, string[]> };
  assert.ok(body.fields.name?.length);
  assert.equal(getBatchCalls(), 0);
});

test("valid form submissions persist normalized email and queue notification", async () => {
  const { env, statements, getBatchCalls } = makeEnvironment();
  const response = await submitForm(
    jsonRequest({
      name: "Founder",
      email: " Founder@Example.com ",
      subject: "Partnership",
      message: "I would like to discuss a healthtech idea.",
    }),
    env,
    "contact",
  );

  assert.equal(response.status, 202);
  assert.equal(getBatchCalls(), 1);
  assert.equal(statements.length, 2);
  assert.equal(statements[0]?.values[2], "founder@example.com");
  assert.match(statements[1]?.sql ?? "", /INSERT INTO form_email_outbox/);
});

test("investor enquiries can omit the optional investment range", async () => {
  const { env, getBatchCalls } = makeEnvironment();
  const response = await submitForm(
    jsonRequest({
      name: "Investor",
      email: "investor@example.com",
      organization: "",
      investorType: "Venture Capital",
      checkSize: "",
      message: "",
    }, "/api/invest"),
    env,
    "investor",
  );

  assert.equal(response.status, 202);
  assert.equal(getBatchCalls(), 1);
});

test("rate-limited form submissions do not reach persistence", async () => {
  const { env, getBatchCalls } = makeEnvironment({ rateLimitSuccess: false });
  const response = await submitForm(jsonRequest({}), env, "contact");

  assert.equal(response.status, 429);
  assert.equal(getBatchCalls(), 0);
});

test("form submissions with honeypot filled return silent success without writing to D1", async () => {
  const { env, getBatchCalls } = makeEnvironment();
  const response = await submitForm(
    jsonRequest(
      {
        name: "Bot Spammer",
        email: "bot@example.com",
        subject: "Buy crypto",
        message: "Spam message",
        website_url: "https://spam.com",
      },
      "/api/contact",
    ),
    env,
    "contact",
  );

  assert.equal(response.status, 202);
  assert.equal(getBatchCalls(), 0);
});

test("duplicate newsletter addresses return a distinct success response", async () => {
  const { env, getBatchCalls } = makeEnvironment({
    batchResults: [{ meta: { changes: 0 } }],
  });
  const response = await subscribeToNewsletter(
    jsonRequest({ email: "reader@example.com" }, "/api/newsletter"),
    env,
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true,
    message: "This email is already subscribed.",
  });
  assert.equal(getBatchCalls(), 1);
});

test("newsletter honeypot triggers silent success without writing to database", async () => {
  const { env, getBatchCalls } = makeEnvironment();
  const response = await subscribeToNewsletter(
    jsonRequest(
      { email: "spambot@example.com", company: "Bot Corp" },
      "/api/newsletter",
    ),
    env,
  );

  assert.equal(response.status, 202);
  assert.equal(getBatchCalls(), 0);
});

test("newsletter rejects missing turnstile token when TURNSTILE_SECRET_KEY is configured", async () => {
  const { env, getBatchCalls } = makeEnvironment();
  env.TURNSTILE_SECRET_KEY = "test-secret";

  const response = await subscribeToNewsletter(
    jsonRequest(
      { email: "user@example.com", turnstileToken: "" },
      "/api/newsletter",
    ),
    env,
  );

  assert.equal(response.status, 403);
  assert.equal(getBatchCalls(), 0);
});

test("exhausted email delivery is marked failed and emits a permanent-failure event", async () => {
  const transitions: Array<{ sql: string; values: unknown[] }> = [];
  const events: unknown[][] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => events.push(args);

  try {
    const env = {
      FORM_DB: {
        prepare(sql: string) {
          return {
            bind(...values: unknown[]) {
              if (sql.startsWith("SELECT id FROM form_email_outbox")) {
                return { all: async () => ({ results: [{ id: "job-1" }] }) };
              }
              if (sql.includes("RETURNING id, recipient")) {
                return {
                  first: async () => ({
                    id: "job-1",
                    recipient: "hello@synergehealth.com",
                    reply_to: null,
                    subject: "A message",
                    body_text: "Message body",
                    attempts: 8,
                  }),
                };
              }
              return {
                run: async () => {
                  transitions.push({ sql, values });
                  return { meta: { changes: 1 } };
                },
              };
            },
          };
        },
        async batch() {
          return [];
        },
      },
      RESEND_API_KEY: "test-secret",
    } as unknown as Environment;

    await runScheduledFormMaintenance(env);
  } finally {
    console.error = originalError;
  }

  const failureTransition = transitions.find(({ sql }) => sql.includes("SET delivery_status"));
  assert.equal(failureTransition?.values[0], "failed");
  assert.equal(failureTransition?.values[2], "mail_configuration_missing");
  assert.equal(events[0]?.[0], "FORM_EMAIL_DELIVERY_FAILED");
  assert.deepEqual(events[0]?.[1], {
    event: "FORM_EMAIL_DELIVERY_FAILED",
    permanent: true,
    jobId: "job-1",
    attempt: 8,
    errorCode: "mail_configuration_missing",
    resendApiKeyConfigured: true,
    fromEmailConfigured: false,
  });
});
