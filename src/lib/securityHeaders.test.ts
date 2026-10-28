import assert from "node:assert/strict";
import { test } from "node:test";
import { SECURITY_HEADERS, withSecurityHeaders } from "./securityHeaders";

test("security headers are added without changing response content or status", async () => {
  const response = new Response("created", {
    status: 201,
    headers: {
      "X-Existing-Header": "preserved",
      "Content-Security-Policy": "script-src 'self' 'sha256-test'",
    },
  });

  const secured = withSecurityHeaders(response);

  assert.equal(secured.status, 201);
  assert.equal(secured.headers.get("X-Existing-Header"), "preserved");
  const csp = secured.headers.get("Content-Security-Policy") ?? "";
  assert.match(csp, /script-src 'self' 'sha256-test'/);
  assert.ok(csp.includes(SECURITY_HEADERS["Content-Security-Policy"]));
  assert.ok(!SECURITY_HEADERS["Content-Security-Policy"].includes("unsafe-inline"));
  assert.equal(await secured.text(), "created");
});
