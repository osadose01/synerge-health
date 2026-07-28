import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organization, investorType, checkSize, message } = body;

    if (!name || !email || !investorType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

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

    console.log("[INVESTOR_ENQUIRY_SUBMISSION]", { name, email, organization, investorType, checkSize, message });

    return NextResponse.json({ success: true, message: "Enquiry sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}
