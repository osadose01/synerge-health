import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log("Astro API [contact] received:", data);
    return new Response(
      JSON.stringify({ success: true, message: "Message received" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid submission data" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
