import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, startup, stage, problem, solution, pitchDeck } = body;

    if (!name || !email || !stage || !problem) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Founder Application: ${name} (${startup || "Pre-product"})`,
          from_name: "Synerge Health Website",
          name,
          email,
          startup,
          stage,
          problem,
          solution,
          pitchDeck,
        }),
      });
    }

    console.log("[APPLICATION_SUBMISSION]", { name, email, startup, stage, problem, solution, pitchDeck });

    return NextResponse.json({ success: true, message: "Application received!" });
  } catch {
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}
