import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { submitForm } from "@/lib/server/form-submissions";

export const POST: APIRoute = ({ request }) => submitForm(request, env, "investor");
