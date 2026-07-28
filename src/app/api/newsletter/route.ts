import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("[WEB3FORMS_MISSING_KEY] WEB3FORMS_ACCESS_KEY is missing.");
      return NextResponse.json(
        { error: "Form service key is missing" },
        { status: 500 }
      );
    }

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

    if (!data.success) {
      console.error("[WEB3FORMS_ERROR]", data);
      return NextResponse.json(
        { error: data.message || "Failed to submit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Subscribed!" });
  } catch (err) {
    console.error("[NEWSLETTER_ERROR]", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}


