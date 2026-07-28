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

    // Send automated personalized confirmation email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { data, error } = await resend.emails.send({
          from: "Synerge Health <hello@synergehealth.com>",
          to: [email],
          subject: `We've received your note, ${name}`,
          html: `
            <div style="background-color: #060B09; color: #F2F6F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 48px 20px; text-align: left;">
              <div style="max-width: 580px; margin: 0 auto; background: #0D1815; border: 1px solid rgba(43,224,176,0.18); border-radius: 16px; padding: 40px;">
                <div style="margin-bottom: 28px;">
                  <span style="font-size: 22px; font-weight: 700; color: #F2F6F4; letter-spacing: -0.02em;">Synerge Health</span>
                </div>
                <p style="font-size: 15px; color: #F2F6F4; margin-bottom: 16px; font-weight: 500;">Hi ${name},</p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 16px;">
                  Thank you for reaching out to Synerge Health! I wanted to personally confirm that we&rsquo;ve received your message regarding <strong style="color: #2BE0B0;">"${subject || 'General Enquiry'}"</strong>.
                </p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 20px;">
                  Here is a copy of what you submitted:
                </p>
                <div style="background: rgba(43,224,176,0.05); border-left: 3px solid #2BE0B0; padding: 18px; border-radius: 8px; margin-bottom: 28px;">
                  <p style="font-size: 13.5px; color: #A5B8B0; margin: 0; line-height: 1.6; font-style: italic;">&ldquo;${message}&rdquo;</p>
                </div>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 32px;">
                  Our team reviews every inbound inquiry carefully and will follow up with you within 24 to 48 business hours. If you have any urgent details to add, feel free to reply directly to this thread.
                </p>
                <div style="border-top: 1px solid rgba(43,224,176,0.12); padding-top: 24px; margin-top: 24px;">
                  <p style="font-size: 14px; color: #F2F6F4; font-weight: 600; margin: 0 0 4px 0;">Warm regards,</p>
                  <p style="font-size: 14px; color: #2BE0B0; font-weight: 500; margin: 0 0 2px 0;">The Synerge Health Team</p>
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
        if (error) console.error("[RESEND_CONTACT_ERROR]", error);
        else console.log("[RESEND_CONTACT_SUCCESS]", data);
      } catch (resendErr) {
        console.error("[RESEND_CONTACT_EXCEPT]", resendErr);
      }
    } else {
      console.warn("[RESEND_MISSING_KEY] RESEND_API_KEY is missing in process.env");
    }

    console.log("[CONTACT_FORM_SUBMISSION]", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}


