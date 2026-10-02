# PetDoorStep website

Doorstep pet care in Ludhiana. This Astro site is built from the plan in [`../website-plan/`](../website-plan/00-MASTER-PLAN.md). When the code and the plan disagree, the plan wins. Fix the code, or log the change in `00-MASTER-PLAN.md` §11.

## Status (Wave 0)

| Built | Spec |
|---|---|
| Astro scaffold, sitemap, robots, favicons, OG image | `04-TECHNICAL-SEO.md` §1 |
| Design system (tokens, fonts, type scale) | `08-DESIGN-SYSTEM.md` §1–§2 |
| Header, footer (NAP), sticky mobile bar, WhatsApp float, breadcrumb, FAQ, promise band | `08` §4 |
| Booking widget (the only JavaScript on the site) | `07-BOOKING-SPEC.md` |
| `/book/`, `/thank-you/`, 404 | `blueprints/book.md`, `04` §1.6 |

The Wave 1 content pages are next. See `00-MASTER-PLAN.md` §6.

## Run it

```bash
cd website
npm install
npm run dev        # http://localhost:4321/book/
npm run build      # static site → dist/
npm run preview    # serve dist/ locally
```

Requires Node 20 or newer.

## Checks

| Command | What it checks |
|---|---|
| `npm run check:prices` | No hard-coded ₹ prices in components. Every price comes from `src/data/pricing.json`, and FAQ prices must match it. |
| `npm run check:fill` | Lists every `[FILL:*]` placeholder still in the code. It fails until all are filled, so it serves as the **launch gate**. |
| `npm run build && npm run test:e2e` | Runs the full booking flow in a real browser: 55 checks covering mobile and desktop, validation, the WhatsApp message, the thank-you page, the waitlist, no-JS fallbacks and analytics events. It needs a global Playwright (`npm i -g playwright && npx playwright install chromium`), or set `CHROMIUM_PATH`. Screenshots go to `$SHOTS` (default `test-results/`). |

## Where things live

| You want to change… | Edit |
|---|---|
| Phone, WhatsApp, email, Instagram, hours, rating | `src/data/site.ts` |
| Any price or plan | `src/data/pricing.json` (only this file; every page reads it) |
| Which pages are linked in the nav and footer | `src/data/routes.ts`. A page is linked only once its `status` is `'live'`. |
| FAQ questions | `src/data/faq.json` |
| Promise and guarantee wording, booking reassurance copy | `src/data/content.ts`. Guarantees stay off until `policy.*` is set to `true`. |
| FIRSTGROOM offer | `src/data/offers.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (`@theme` block) |

## Filling the placeholders (before launch)

Send these values, or paste them in yourself. Most go in `src/data/site.ts`; the lead-storage keys go in `src/lib/leads.ts`.

| Token | What it is | Example |
|---|---|---|
| `[FILL:DOMAIN]` | The bought domain. Also set `SITE_URL` in Cloudflare. | `https://petdoorstep.in` |
| `[FILL:PHONE]` | Calling number, as shown on the site | `+91 98XXX XXXXX` |
| `[FILL:WHATSAPP_NUMBER]` | WhatsApp Business number, digits only | `9198XXXXXXXX` |
| `[FILL:EMAIL]` | Contact email | `hello@petdoorstep.in` |
| `[FILL:INSTAGRAM]` | Instagram handle | `petdoorstep` |
| `[FILL:GBP_LINK]` | Google Business Profile share link | `https://g.page/r/…` |
| `[FILL:GOOGLE_RATING]` / `[FILL:REVIEW_COUNT]` | Real figures from GBP. Never invent them. | `4.9` / `25` |
| `[FILL:GA4_ID]` | GA4 measurement ID | `G-XXXXXXXXXX` |
| `[FILL:SHEETS_WEBHOOK]` | Apps Script web-app URL (`07-BOOKING-SPEC.md` §5) | `https://script.google.com/macros/s/…/exec` |
| `[FILL:WEB3FORMS_KEY]` | Backup lead-email key from web3forms.com | `xxxxxxxx-xxxx-…` |

Until a token is filled, the site degrades safely. Lead storage falls back to the next method, and finally to a queue in the browser. Analytics stays off. The WhatsApp message itself always carries the full booking.

## Deploy (Cloudflare Pages)

1. Push this repository to GitHub. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
2. Use these build settings:
   - Root directory: `website`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: `SITE_URL=https://petdoorstep.in` and `NODE_VERSION=22`
3. Add the custom domain under **Custom domains**. HTTPS is automatic.
4. Preview deployments (non-production branches) are set to `noindex` automatically.
