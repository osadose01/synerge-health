/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  FORM_DB: D1Database;
  FORM_RATE_LIMITER: RateLimit;
  RESEND_API_KEY?: string;
  FORM_FROM_EMAIL: string;
  FORM_APPLICATION_TO: string;
  FORM_CONTACT_TO: string;
  FORM_INVESTOR_TO: string;
  FORM_NEWSLETTER_TO: string;
  PUBLIC_SITE_URL: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
}

type CloudflareRuntime = import("@astrojs/cloudflare").Runtime;

declare namespace Cloudflare {
  interface Env extends CloudflareEnv {}
}

declare namespace App {
  interface Locals extends CloudflareRuntime {}
}
