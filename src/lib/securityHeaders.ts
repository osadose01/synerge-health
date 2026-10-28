export const SECURITY_HEADERS = {
  // Astro supplies per-page script/style hashes; this policy adds the shared resource restrictions.
  "Content-Security-Policy":
    "img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://cloudflareinsights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
} as const;

export function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (name === "Content-Security-Policy") {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
