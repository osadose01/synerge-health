import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Newsletter Subscriber: ${email}`,
          from_name: "Synerge Health Website",
          email,
        }),
      });
    }

    // Send automated welcome email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Synerge Health <hello@synergehealth.com>",
          to: [email],
          subject: "Welcome to Synerge Health Insights",
          html: `
            <div style="background-color: #060B09; color: #F2F6F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; text-align: left;">
              <div style="max-width: 560px; margin: 0 auto; background: #0D1815; border: 1px solid rgba(43,224,176,0.15); border-radius: 16px; padding: 36px;">
                <div style="margin-bottom: 24px;">
                  <span style="font-size: 20px; font-weight: 700; color: #F2F6F4; letter-spacing: -0.02em;">Synerge Health</span>
                </div>
                <h1 style="font-size: 22px; font-weight: 600; color: #F2F6F4; margin-bottom: 16px;">Welcome to Synerge Health Insights</h1>
                <p style="font-size: 14px; line-height: 1.7; color: #8FA39A; margin-bottom: 24px;">
                  Thank you for subscribing! You are now connected to Africa’s digital health venture studio. We will deliver curated healthtech analysis, venture insights, and studio updates straight to your inbox.
                </p>
                <div style="border-top: 1px solid rgba(43,224,176,0.1); pt: 20px; margin-top: 24px; font-size: 12px; color: #4A6358;">
                  © ${new Date().getFullYear()} Synerge Health Inc. All rights reserved.<br/>
                  Africa’s Digital Health Venture Studio • <a href="https://synergehealth.com" style="color: #2BE0B0; text-decoration: none;">synergehealth.com</a>
                </div>
              </div>
            </div>
          `,
        });
      } catch (resendErr) {
        console.error("[RESEND_NEWSLETTER_ERROR]", resendErr);
      }
    }

    return NextResponse.json({ success: true, message: "Subscribed!" });
  } catch (err) {
    console.error("[NEWSLETTER_ERROR]", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}



