import type { MetadataRoute } from "next";
import { SITE_URL, isLive } from "@/lib/site";

// Demo: crawling is allowed so the page-level noindex can be read, and no sitemap is listed.
// Live: crawling allowed and the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isLive ? { sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL } : {}),
  };
}
