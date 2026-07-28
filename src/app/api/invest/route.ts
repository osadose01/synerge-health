import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organization, investorType, checkSize, message } = body;

    if (!name || !email || !investorType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Investor Enquiry: ${name} (${organization || investorType})`,
          from_name: "Synerge Health Website",
          name,
          email,
          organization,
          investorType,
          checkSize,
          message,
        }),
      });
    }

    // Send automated personalized receipt email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Synerge Health <hello@synergehealth.com>",
          to: [email],
          subject: `Investor Enquiry Received — Synerge Health`,
          html: `
            <div style="background-color: #060B09; color: #F2F6F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 48px 20px; text-align: left;">
              <div style="max-width: 580px; margin: 0 auto; background: #0D1815; border: 1px solid rgba(43,224,176,0.18); border-radius: 16px; padding: 40px;">
                <div style="margin-bottom: 28px;">
                  <span style="font-size: 22px; font-weight: 700; color: #F2F6F4; letter-spacing: -0.02em;">Synerge Health</span>
                </div>
                <p style="font-size: 15px; color: #F2F6F4; margin-bottom: 16px; font-weight: 500;">Dear ${name},</p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 16px;">
                  Thank you for expressing interest in the <strong style="color: #2BE0B0;">Synerge Health Investor Hub</strong> on behalf of <strong style="color: #F2F6F4;">${organization || 'your firm'}</strong>.
                </p>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 20px;">
                  Synerge Health is building Africa&rsquo;s leading digital health venture studio &mdash; institutionalizing company creation, capital deployment, and scaling across emerging markets.
                </p>
                <div style="background: rgba(43,224,176,0.05); border: 1px solid rgba(43,224,176,0.12); padding: 20px; border-radius: 12px; margin-bottom: 28px;">
                  <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #2BE0B0; margin: 0 0 10px 0;">Investor Relations Brief</h4>
                  <p style="font-size: 13.5px; line-height: 1.7; color: #A5B8B0; margin: 0;">
                    Our Partner & Investor Relations team has received your investor criteria (${investorType}${checkSize ? ` &bull; Check Size: ${checkSize}` : ''}). We will share our Confidential Studio Memorandum, Portfolio Metrics, and LP Co-investment Pipeline with you shortly.
                  </p>
                </div>
                <p style="font-size: 14px; line-height: 1.75; color: #C2D1CB; margin-bottom: 32px;">
                  Should you wish to schedule an immediate introductory briefing with our managing partners, please feel free to reply directly to this email.
                </p>
                <div style="border-top: 1px solid rgba(43,224,176,0.12); padding-top: 24px; margin-top: 24px;">
                  <p style="font-size: 14px; color: #F2F6F4; font-weight: 600; margin: 0 0 4px 0;">Best regards,</p>
                  <p style="font-size: 14px; color: #2BE0B0; font-weight: 500; margin: 0 0 2px 0;">Synerge Health Leadership & Partner Relations</p>
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
        console.error("[RESEND_INVEST_ERROR]", resendErr);
      }
    }

    console.log("[INVESTOR_ENQUIRY_SUBMISSION]", { name, email, organization, investorType, checkSize, message });

    return NextResponse.json({ success: true, message: "Enquiry sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}


