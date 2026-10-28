export interface WelcomeEmailOptions {
  siteUrl?: string;
  unsubscribeUrl: string;
}

export function renderWelcomeEmailHtml(options: WelcomeEmailOptions): string {
  const siteUrl = options.siteUrl || "https://synergehealth.com";
  const insightsUrl = `${siteUrl.replace(/\/$/, "")}/insights`;
  const logoUrl = `${siteUrl.replace(/\/$/, "")}/brand/logo-primary.png`;
  const privacyUrl = `${siteUrl.replace(/\/$/, "")}/privacy`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>Welcome to Synerge Health Dispatch</title>
</head>
<body style="margin:0;padding:0;background-color:#0D1815;-webkit-font-smoothing:antialiased;">
  <!-- Preheader preview text -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0D1815;">
    You are now subscribed to Synerge Health Dispatch. Healthtech venture building, digital infrastructure, and studio insights.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D1815;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#060B09;border:1px solid rgba(43,224,176,0.18);border-radius:16px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.6);">
          
          <!-- Brand Header -->
          <tr>
            <td style="background-color:#060B09;padding:32px 36px 28px 36px;border-top:3px solid #2BE0B0;border-bottom:1px solid rgba(43,224,176,0.12);">
              <a href="${siteUrl}" style="text-decoration:none;display:inline-block;" target="_blank" rel="noopener noreferrer">
                <img src="${logoUrl}" width="224" height="32" alt="Synerge Health" style="display:block;border:0;outline:none;width:224px;height:32px;">
              </a>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:40px 36px 24px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#F8FAFC;font-size:15px;line-height:1.7;">
              
              <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#2BE0B0;font-weight:bold;margin-bottom:12px;">
                CONFIRMED SUBSCRIPTION
              </div>

              <h1 style="margin:0 0 20px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:1.3;color:#F8FAFC;letter-spacing:-0.3px;">
                Welcome to Dispatch
              </h1>

              <p style="margin:0 0 18px 0;color:#C2D1CB;font-size:15px;">
                You are now subscribed to <strong style="color:#F8FAFC;">Synerge Health Dispatch</strong>.
              </p>

              <p style="margin:0 0 24px 0;color:#8FA39A;font-size:14px;line-height:1.7;">
                We share periodic briefings on healthtech venture building, digital health infrastructure, clinical diagnostics, and pharmacy systems designed specifically for emerging markets across Africa.
              </p>

              <!-- Call to Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 32px 0;">
                <tr>
                  <td align="center" style="border-radius:999px;background-color:#2BE0B0;">
                    <a href="${insightsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;font-family:'Courier New',Courier,monospace;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#060B09;text-decoration:none;border-radius:999px;background-color:#2BE0B0;">
                      EXPLORE LATEST INSIGHTS &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <div style="border-top:1px solid rgba(43,224,176,0.12);padding-top:24px;margin-top:28px;">
                <p style="margin:0 0 4px 0;color:#F8FAFC;font-size:14px;font-weight:600;">
                  The Synerge Health Team
                </p>
                <p style="margin:0;color:#8FA39A;font-size:13px;">
                  Africa&rsquo;s Healthtech Venture Studio
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#020504;padding:24px 36px;border-top:1px solid rgba(43,224,176,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8FA39A;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 8px 0;color:#8FA39A;">
                      &copy; ${new Date().getFullYear()} Synerge Health. All rights reserved.
                    </p>
                    <p style="margin:0;">
                      <a href="${siteUrl}" style="color:#2BE0B0;text-decoration:none;" target="_blank" rel="noopener noreferrer">synergehealth.com</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${privacyUrl}" style="color:#8FA39A;text-decoration:underline;" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${options.unsubscribeUrl}" style="color:#8FA39A;text-decoration:underline;" target="_blank" rel="noopener noreferrer">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWelcomeEmailText(options: WelcomeEmailOptions): string {
  const siteUrl = options.siteUrl || "https://synergehealth.com";
  return `Welcome to Synerge Health Dispatch

You are now subscribed to Synerge Health Dispatch. We share periodic briefings on healthtech venture building, digital infrastructure, clinical diagnostics, and pharmacy systems for African markets.

Explore our latest insights: ${siteUrl.replace(/\/$/, "")}/insights

The Synerge Health Team
Africa's Healthtech Venture Studio
https://synergehealth.com

To unsubscribe, visit:
${options.unsubscribeUrl}
`;
}

export function stripHtmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/&rarr;/g, "->")
    .replace(/&copy;/g, "©")
    .replace(/&rsquo;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
