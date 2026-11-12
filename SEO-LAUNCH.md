# SEO launch checklist: woodramiah.com

The site ships in **demo mode** (noindex, no sitemap, concept footer line). Launch day flips one switch.

## 1. Flip the switch

- [ ] In Vercel, Project Settings, Environment Variables (Production):
  - `NEXT_PUBLIC_SITE_MODE=live`
  - `NEXT_PUBLIC_SITE_URL=https://www.woodramiah.com`
- [ ] Redeploy (these are read at build time).
- [ ] Add `woodramiah.com` and `www.woodramiah.com` to the Vercel project. Make `www` primary and redirect the bare domain to it.

## 2. Confirm it took

- [ ] View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`.
- [ ] Canonicals read `https://www.woodramiah.com` and `https://www.woodramiah.com/contact`.
- [ ] `https://www.woodramiah.com/robots.txt` lists `Sitemap: https://www.woodramiah.com/sitemap.xml`.
- [ ] `https://www.woodramiah.com/sitemap.xml` lists both pages.
- [ ] The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
- [ ] Paste the home URL into the Rich Results Test and the Schema Markup Validator. Expect LegalService, FAQPage, Service and (on /contact) BreadcrumbList with no errors.
- [ ] Share the link in a message to yourself and check the preview card.

## 3. Stop the two copies competing

The old WordPress site is served in full on both joannwoodlaw.com and woodramiah.com.

- [ ] Point joannwoodlaw.com at Vercel (or keep it at the old host) and **301 redirect every URL** to its woodramiah.com equivalent:
  - `joannwoodlaw.com/` to `https://www.woodramiah.com/`
  - Practice pages (real estate, estate planning, probate) to `/#real-estate`, `/#estate-planning`, `/#probate`. Fragments are dropped by crawlers, so these effectively land on `/`. That is fine.
  - Staff and attorney pages (including the old `jennifer-brien` slug) to `/#team` or `/#attorneys`
  - Contact page to `/contact`
  - Everything else (news, events, 2012 posts) to `/`
- [ ] Use a single wildcard rule as the fallback so nothing on the old domain returns 200.
- [ ] Take the old WordPress install offline once the redirects are verified.

## 4. Tell the search engines

- [ ] Google Search Console: add a Domain property for `woodramiah.com`, submit `sitemap.xml`, request indexing for `/` and `/contact`.
- [ ] Add joannwoodlaw.com as a property too and use the Change of Address tool to point it at woodramiah.com.
- [ ] Bing Webmaster Tools: import from Search Console, submit the sitemap.

## 5. Google Business Profile

- [ ] Website field: `https://www.woodramiah.com`.
- [ ] Name, address and phone exactly as on the site: Wood & Ramiah, LLC · 23087 Three Notch Road, California, MD 20619 · (301) 737-8882.
- [ ] Hours: Monday to Friday, 9 AM to 5 PM.
- [ ] Replace the reviews link in `lib/business.ts` (`reviewsUrl`) with the profile's place link.

## 6. Replace every DRAFT and Sample item

Search the repo for `DRAFT`, `Sample` and `TODO`. Each needs the firm's confirmation or real content:

- Testimonial approval under the Maryland Attorneys' Rules of Professional Conduct (`lib/reviews.ts`)
- Staff role titles for Robyn Hammett and Janice Knott (`lib/business.ts`)
- Next Estate Planning Basics seminar date (`lib/business.ts`)
- Wire policy wording (`components/sections/Closing.tsx`)
- Settlement location and post-settlement wording (`components/sections/Closing.tsx`)
- Towns and counties served (`lib/business.ts`)
- Trust funding and deed wording (`lib/plan-check.ts`, `components/sections/Differentiator.tsx`)
- "Most of us grew up here" line (`components/sections/Office.tsx`)
- Review count and rating, refreshed on launch day (`lib/business.ts`)
- Intake email (none is shown today)
- Whether the office line accepts texts (no `sms:` links until confirmed)
- Where Matter Planner submissions go, and the reply method and timing (`components/MatterPlanner/PlannerForm.tsx`)
- Whether to embed the Qualia instant closing quote widget for real estate requests
- A vector (SVG) logo file from the firm

## 7. Update dates

- [ ] Update `LAST_MODIFIED` in `lib/site.ts` whenever page content changes, so the sitemap stays honest.
