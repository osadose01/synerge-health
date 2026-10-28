import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { subscribeToNewsletter } from "@/lib/server/form-submissions";

export const POST: APIRoute = ({ request }) => subscribeToNewsletter(request, env);
