# Wood & Ramiah, LLC: Implementation Kickstart

Concept site for Wood & Ramiah, LLC (23087 Three Notch Road, California, MD 20619), built by Lee Enterprises Unlimited as a spec demo for Joann Wood and Hadley Ramiah.

## The plan

- **One goal:** every action leads to "Request a Consultation", which opens the Matter Planner. Calling (301) 737-8882 is the always-visible second path.
- **Design direction, "Three Notch Ledger":** cream deed paper, bond-white sheets with a ruled hairline, navy ink from the firm's own monogram. Calm, exact, warm.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4. Framer Motion for the hero signature line and the Plan Check sheet only. `lucide-react` icons. `@vercel/analytics`.
- **Content lives in data files:** `lib/business.ts`, `lib/reviews.ts`, `lib/plan-check.ts`, `lib/faq.ts`. Components never hard-code facts.
- **Images:** only the firm's own photos (Kalnasy Photography). `scripts/optimize-images.mjs` converts `public/images/raw/*` to `.webp` in `public/images/`.
- **Launch switch:** `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and `NEXT_PUBLIC_SITE_URL` drive robots meta, robots.txt, sitemap and the concept footer line.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `paper` | `#F6F3EC` | Page background (deed paper) |
| `bond` | `#FFFFFF` | Cards / sheets |
| `rule` | `#E2DCCF` | 1px sheet borders |
| `navy` | `#192451` | Accent: primary button, wordmark, numbers, active states, signature line, toggles, two navy bands |
| `ink` | `#151A2D` | Text |
| `muted` | `#565D70` | Muted text |
| `pewter` | `#8C91A1` | Hairline rules, small caps labels on navy only |

- **Fonts:** Cormorant Garamond (500, 600, 700, italic 500) for display at 28px and up. Source Sans 3 (400, 600) for body: 18px desktop, 17px mobile, never under 17px.
- **Sheet:** 1px `rule` border, 2px radius, a 1px pewter hairline 12px inside the top edge, shadow `0 1px 2px rgba(21,26,45,0.06)`.
- **Clause label:** small caps, 0.14em tracking, a short pewter rule before it. "ARTICLE I · REAL ESTATE".
- **Spacing:** 8px grid. Section padding 112 to 128px desktop, 72px mobile. Text max 64ch.
- **Motion:** two places only. Hero signature line (0.9s draw, seal presses in 0.3s). Plan Check items write on (200ms fade, 300ms hairline). Reduced motion: everything simply present.

## Page map

Nav · Hero · Navy differentiator band · Plan Check (`#estate-planning`) · Closing roadmap (`#real-estate`) · Services bento · Attorneys (`#attorneys`) · Office and team (`#team`) · Seminar band · Reviews (`#reviews`) · FAQ (`#faq`) · Final CTA (navy over photo 02) · Footer. Plus `/contact` and a real 404.

## Build checklist

- [ ] Phase 1: scaffold, design tokens, fonts, the SVG monogram, nav, hero with the signature line, footer
- [ ] Phase 2: differentiator band, Plan Check (all five questions, the live sheet, readout lines, print stylesheet, mobile drawer)
- [ ] Phase 3: closing roadmap with the wire fraud sheet, services bento
- [ ] Phase 4: attorney profiles, the office and team strip, seminar band, reviews wall, FAQ, final call-to-action
- [ ] Phase 5: Matter Planner modal, every button wired with the right pre-selects, mobile sticky bar, `/contact` page
- [ ] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD (validated), robots and sitemap, `llms.txt`, OG image, favicon, 404, image optimisation, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse on a production build, both modes, mobile and desktop
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [ ] Hero sells the job; signature line draws once; seal presses in; headline and primary button visible at 375px without scrolling
- [ ] Plan Check adds and removes the right items, readout changes with count, prints cleanly, works with mouse, touch and keyboard
- [ ] "General information, not legal advice" line and the required website notice present; Matter Planner checkbox blocks submit
- [ ] Every "Request a Consultation" opens the Matter Planner with the right pre-selects; phone and directions work; no `sms:` links
- [ ] Every "only this business" item is on the page
- [ ] Zero em dashes, zero "--", zero stock or AI images, zero invented facts, zero "specialist", "expert" or "best"
- [ ] Draft copy labelled or commented
- [ ] Two fonts, three colours plus text, motion in two sections only
- [ ] 375px: no overflow, burger, sticky bar, Plan Check drawer
- [ ] Footer on both pages with photo credit; concept line in demo mode only; demo `noindex, nofollow`; live `index, follow` + sitemap
- [ ] OG image and favicon are the firm's own
- [ ] Lighthouse SEO 100 live mode; other categories 90+; demo mode only fails the indexing audit
- [ ] One h1 per page; titles and descriptions unique and right length; JSON-LD validates and claims nothing untrue
