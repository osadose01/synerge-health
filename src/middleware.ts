import { defineMiddleware } from "astro:middleware";
import { withSecurityHeaders } from "./lib/securityHeaders";

export const onRequest = defineMiddleware(async (_context, next) =>
  withSecurityHeaders(await next()),
);
