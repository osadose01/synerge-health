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

    // Send automated personalized welcome email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Synerge Health <hello@synergehealth.com>",
          to: [email],
          subject: "Welcome to Synerge Health Insights",
          html: `
            <div style="background-color: #060B09; color: #F2F6F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 48px 20px; text-align: left;">
              <div style="max-width: 580px; margin: 0 auto; background: #0D1815; border: 1px solid rgba(43,224,176,0.18); border-radius: 16px; padding: 40px;">
                <div style="margin-bottom: 28px; display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 22px; font-weight: 700; color: #F2F6F4; letter-spacing: -0.02em;">Synerge Health</span>
                </div>
                <p style="font-size: 15px; color: #F2F6F4; margin-bottom: 16px; font-weight: 500;">Hi there,</p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 16px;">
                  Thanks for subscribing to Synerge Health Insights! I&rsquo;m thrilled to have you join our community of healthcare innovators, investors, and founders.
                </p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 20px;">
                  We built Synerge Health to solve Africa&rsquo;s toughest healthcare challenges through venture creation. As a subscriber, you&rsquo;ll get exclusive access to:
                </p>
                <ul style="font-size: 14px; line-height: 1.8; color: #C2D1CB; margin-bottom: 28px; padding-left: 20px;">
                  <li style="margin-bottom: 8px;"><strong style="color: #2BE0B0;">Deep-Dive Research:</strong> Analysis on unit economics, healthtech logistics, and clinical AI across emerging markets.</li>
                  <li style="margin-bottom: 8px;"><strong style="color: #2BE0B0;">Studio Dispatch:</strong> First-look updates on new digital health companies co-founded in our studio.</li>
                  <li style="margin-bottom: 8px;"><strong style="color: #2BE0B0;">Ecosystem Intelligence:</strong> Curated interviews with healthcare leaders and venture capital partners.</li>
                </ul>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 32px;">
                  Have a specific topic or research thesis you&rsquo;d like us to explore? Just reply directly to this email &mdash; I personally read every message!
                </p>
                <div style="border-top: 1px solid rgba(43,224,176,0.12); padding-top: 24px; margin-top: 24px;">
                  <p style="font-size: 14px; color: #F2F6F4; font-weight: 600; margin: 0 0 4px 0;">The Synerge Health Team</p>
                  <p style="font-size: 12px; color: #8FA39A; margin: 0 0 16px 0;">Africa&rsquo;s Digital Health Venture Studio</p>
                  <p style="font-size: 11px; color: #4A6358; margin: 0; line-height: 1.5;">
                    &copy; ${new Date().getFullYear()} Synerge Health Inc. All rights reserved.<br/>
                    <a href="https://synergehealth.com" style="color: #2BE0B0; text-decoration: none;">synergehealth.com</a> &bull; Lagos &bull; Nairobi &bull; London
                  </p>
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




