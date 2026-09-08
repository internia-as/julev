import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/translate", priority: 0.9 },
    { path: "/divvun", priority: 0.9 },
    { path: "/grammar-checker", priority: 0.8 },
    { path: "/app", priority: 0.6 },
    { path: "/statistics", priority: 0.5 },
    { path: "/about", priority: 0.5 },
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}