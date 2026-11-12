// The launch switch. Everything about indexing is driven from these two values.
// demo (default): noindex, nofollow, no sitemap, concept footer line shown.
// live: index, follow, sitemap listed, concept footer line hidden.

export const SITE_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

export const isLive = SITE_MODE === "live";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://www.woodramiah.com"
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;

// Real last-modified dates for the sitemap. Update when a page's content changes.
export const LAST_MODIFIED = {
  home: "2026-11-12",
  contact: "2026-11-12",
} as const;
