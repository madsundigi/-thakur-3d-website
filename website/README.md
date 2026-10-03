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
| `npm run check:pages` | The page gate. It reads the built `dist/` and checks the SEO launch rules of `02-SEO-PARAMETERS.md` page by page (details below). |
| `npm run check:budgets` | Weight and script budgets from `08-DESIGN-SYSTEM.md` §8: CSS, JavaScript, fonts and OG images. |
| `npm run check:legal` | The privacy policy lists match the code: storage keys, lead columns, GA4 events and processors. |
| `npm run test:site` | The browser gate. It opens every page at three screen sizes and checks layout, errors, accessibility, the fold, tracking and the exit card. |

Build first (`npm run build`), then run the gates. Each one prints one line per problem, then a summary, and exits with 1 if anything failed:

```
FAIL <page or file> <Pnnn> <message>     must be fixed (Pnnn = the 02-SEO-PARAMETERS.md parameter)
WARN <page or file> <Pnnn> <message>     worth a look; does not fail the run
```

A WARN also covers a check that cannot run yet because another builder's file has not landed (for example `src/data/legal.ts` or the exit card). The gate never crashes on a missing file.

Run the gates with the same environment as the build. `check:pages` reads `src/data/routes.ts` with your `PUBLIC_*` variables, so a build made with `PUBLIC_PDS_PREVIEW_LIVE=wave1` must be checked with it too.

### `check:pages`

```bash
npm run check:pages -- --pages /book/,/thank-you/,/404.html   # just these pages
npm run check:pages -- --all                                   # every page, plus the cross-page rules
npm run check:pages -- --all --dist ../some/other/dist         # another build folder
```

Without a flag it checks every page (`--all`). With `--pages`, a link to a live Wave-1 page that is not in your `dist/` is only a WARN, because another builder may own that page. `--all` turns it into a FAIL.

| Rule | Parameter |
|---|---|
| Title 50–60 characters, meta description 120–158 characters with no `"`. Characters are counted after decoding entities. Both are skipped on noindex pages. | P011, P019, P024 |
| Exactly one H1 of 20–70 characters | P025, P026 |
| Title, meta and H1 equal the "Head" lines of the page's blueprint (found through the Blueprint column of `01-SITEMAP.md`). If a blueprint value itself breaks a 02 length rule, the 02 rule wins and you get a WARN. | P012, P020, P026 |
| Canonical and `og:url` are the absolute self URL with a trailing slash | P124, P117 |
| Only `/thank-you/` and the 404 page are noindex, and they say exactly `noindex, follow` | P128 |
| Every `<img>` has width, height and alt. `alt=""` is allowed only when the image is `aria-hidden` or `role="presentation"`. | P060, P056, P057 |
| The hero image (`[data-hero-photo] img`) is `loading="eager"`, `fetchpriority="high"` and preloaded in `<head>`. Every other image is `loading="lazy"`. | P063, P064 |
| Every internal link and file resolves in `dist/`. Links need a trailing slash and `#fragments` must exist on the target page. No link may point at a route that is not live in `routes.ts`. | P074, P008 |
| No `Review` or `AggregateRating` in the JSON-LD. The `@type`s match the `04-TECHNICAL-SEO.md` §2.9 matrix for the page. | P086, P077, P078, P082, P084 |
| Every FAQ question and answer, and every Offer price, in the JSON-LD is visible on the page | P087 |
| The BreadcrumbList names and URLs equal the visible breadcrumb | P084 |
| The footer NAP (`<address data-testid="nap">`) is identical on every checked page | P088 |
| A viewport meta tag that allows zoom, and `<html lang="en-IN">` | P109, P141, P139 |
| Every `target="_blank"` link has `rel="noopener"` | P075 |
| Every `wa.me`, `tel:` and Instagram link, every `data-source` and every `/book/?src=` value is a canonical source from `src/data/sources.ts` (`09-ANALYTICS-TRACKING.md` §2d) | P161 |
| `--all` only: titles, descriptions and H1s are unique. Every indexable page except home has a link from another page's `<main>`, outside header, footer and nav. The sitemap, the live routes and the built indexable pages are the same set, with the real `<lastmod>` from `src/data/lastmod.ts`. | P010, P018, P027, P068, P127 |

### `check:budgets`

```bash
npm run check:budgets                      # every page in dist/
npm run check:budgets -- --pages /book/    # just these pages (the site-wide checks always run)
```

- **CSS** per page: linked stylesheets plus inline `<style>`, at most 51,200 bytes raw.
- **JavaScript**: no `<script src>`, `<link rel="modulepreload">` or island except on `/book/`. An inline `<script>` must be JSON-LD or carry `data-pds="analytics"`, `"exit-card"` or `"thank-you"`. An untagged script that contains `window.track` is treated as analytics and gives a WARN until it is tagged.
- **Booking island**: every chunk `/book/` loads, gzipped together (`gzip -9`), at most 90 KB. The hard cap in `04` §5.3 is 100 KB.
- **Fonts**: at most 2 families and 2 WOFF2 files, at most 160 KB in total (inlined fonts included), self-hosted WOFF2 only, at most 2 font preloads per page. The tiny ₹-only subsets are inlined into the CSS, and they are listed but not counted as files.
- **OG images** in `public/og/`: exactly 1200×630 and at most 300 KB.

### `check:legal`

```bash
npm run check:legal                 # the code against src/data/legal.ts
npm run check:legal -- --dist       # also checks the built /privacy-policy/ page
```

- Every `'pds_…'` storage key under `src/` is listed in `STORAGE_KEYS`. A listed key that the code no longer uses gives a WARN.
- `LEAD_COLUMNS` in `src/lib/leads.ts` equals the one in `legal.ts`, in the same order. `GA4_EVENTS` in `src/lib/analytics.ts` equals the one in `legal.ts`, and every event the code fires is in it. If an export is missing, the list is read from the source code instead, with a WARN.
- With `--dist`, the built privacy policy names every storage key and every processor.
- Until `src/data/legal.ts` exists, the gate prints one WARN and passes.

### `test:site`

```bash
npm run build && npm run test:site -- --pages /book/,/thank-you/ --port 4411
```

It starts `astro preview` itself (default port 4411) and always stops it. It needs the same global Playwright as `test:e2e`. Screenshots go to `$SHOTS` (default `test-results/site/`): one full page per screen size, plus the 360×640 fold.

- **At 360×640, 768×1024 and 1280×800**: no sideways scroll, no console errors, no failed same-origin requests, no serious or critical axe-core issues, every JSON-LD block parses, and layout shift (CLS) is at most 0.1. When the page has a hero photo, the largest paint (LCP) must be that photo. While the hero is still a grey placeholder this is a WARN, because Chrome ignores placeholder images for LCP.
- **The fold at 360×640** (`[data-hero]` pages): the H1, the subhead, the primary button and one trust chip sit fully above the sticky bar. On `/ludhiana/<service>/` pages, the top 160 px of the hero photo (and the vet emergency notice, if there is one) must be visible too.
- **Tracking at 360×640**: every WhatsApp, call and Instagram link is clicked (navigation is blocked). Each click must log its `[track]` event with the link's `data-source`.
- **Exit card at 1280×800**: the test fast-forwards a fake clock. The card must open only after 20 seconds and only when the mouse leaves through the top edge. It must not be modal, must cover at most 15% of the screen, must link to `/book/?src=exit_nudge`, must close with its dismiss button and must stay closed after a reload. It never shows after a booking, below 1024 px, or on `/book/`, `/thank-you/`, legal pages and the 404. If the card is not built yet, this is a WARN.

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
