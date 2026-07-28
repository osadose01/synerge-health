import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

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

    console.log("[CONTACT_FORM_SUBMISSION]", { name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
