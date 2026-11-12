import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE_URL, isLive } from "@/lib/site";

// Demo mode returns an empty sitemap. Live mode lists every page with real last-modified dates.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(LAST_MODIFIED.home), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(LAST_MODIFIED.contact), changeFrequency: "yearly", priority: 0.8 },
  ];
}
