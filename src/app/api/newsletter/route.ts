import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Newsletter Subscriber: ${email}`,
          from_name: "Synerge Health Website",
          email,
        }),
      });
      const data = await res.json();
      console.log("[WEB3FORMS_RESPONSE]", data);
    } else {
      console.warn("[WEB3FORMS_MISSING_KEY] WEB3FORMS_ACCESS_KEY is not defined.");
    }

    console.log("[NEWSLETTER_SUBSCRIBE]", { email });

    return NextResponse.json({ success: true, message: "Subscribed!" });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

