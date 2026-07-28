import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Contact Message: ${subject || name}`,
          from_name: "Synerge Health Website",
          name,
          email,
          message,
        }),
      });
    }

    // Send automated confirmation email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Synerge Health <hello@synergehealth.com>",
          to: [email],
          subject: "We've received your message — Synerge Health",
          html: `
            <div style="background-color: #060B09; color: #F2F6F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; text-align: left;">
              <div style="max-width: 560px; margin: 0 auto; background: #0D1815; border: 1px solid rgba(43,224,176,0.15); border-radius: 16px; padding: 36px;">
                <div style="margin-bottom: 24px;">
                  <span style="font-size: 20px; font-weight: 700; color: #F2F6F4; letter-spacing: -0.02em;">Synerge Health</span>
                </div>
                <h1 style="font-size: 22px; font-weight: 600; color: #F2F6F4; margin-bottom: 16px;">We've received your message, ${name}</h1>
                <p style="font-size: 14px; line-height: 1.7; color: #8FA39A; margin-bottom: 24px;">
                  Thank you for reaching out to Synerge Health. Our venture team has received your enquiry regarding <strong>"${subject || 'General Enquiry'}"</strong> and will follow up with you shortly.
                </p>
                <div style="background: rgba(43,224,176,0.04); border-left: 3px solid #2BE0B0; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                  <p style="font-size: 13px; color: #8FA39A; margin: 0; font-style: italic;">"${message.slice(0, 140)}${message.length > 140 ? '...' : ''}"</p>
                </div>
                <div style="border-top: 1px solid rgba(43,224,176,0.1); padding-top: 20px; margin-top: 24px; font-size: 12px; color: #4A6358;">
                  © ${new Date().getFullYear()} Synerge Health Inc. All rights reserved.<br/>
                  Africa’s Digital Health Venture Studio • <a href="https://synergehealth.com" style="color: #2BE0B0; text-decoration: none;">synergehealth.com</a>
                </div>
              </div>
            </div>
          `,
        });
      } catch (resendErr) {
        console.error("[RESEND_CONTACT_ERROR]", resendErr);
      }
    }

    console.log("[CONTACT_FORM_SUBMISSION]", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

