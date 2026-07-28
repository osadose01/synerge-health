import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synergehealth.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/founders",
    "/investors",
    "/contact",
    "/insights",
    "/events",
    "/careers",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
