import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Sitemap statique : les 6 pages du portfolio.
// (Les articles s'ouvrent en modal sur /blog, ils n'ont pas d'URL propre.)
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/projets", "/blog", "/contact"];
  const lastModified = new Date();
  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
