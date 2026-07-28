import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY || "",
    WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY || "",
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      "",
  },
};

export default nextConfig;

