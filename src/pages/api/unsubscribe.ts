import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { unsubscribeFromNewsletter } from "@/lib/server/form-submissions";

export const POST: APIRoute = ({ request }) => unsubscribeFromNewsletter(request, env);
