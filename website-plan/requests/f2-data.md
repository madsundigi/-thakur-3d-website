# Requests from stage f2-data (Wave 1, shared data)

Things this stage needs from files it does not own. Decisions behind each are in `website-plan/decisions/f2-data.md`.

## A · Components and layout (component owners)

| # | File | Request | Why |
|---|---|---|---|
| A1 | `src/components/Footer.astro` lines 13, 15, 16 | Replace `r.status === 'live'` with `isLive(r.path)` for the top-5 areas, company and legal links | These three lists bypass `isLive()`, so the `PUBLIC_PDS_PREVIEW_LIVE=wave1` preview (and any future liveness rule) never reaches them. In a preview build the footer showed no legal links |
| A2 | `src/components/ServiceCard.astro` | Stop importing `SERVICE_PRICE_CHIP`: default the chip to `cardPriceChip(slug, onPage)` (pricing.ts) and take blurb/photo from `MONEY_PAGES[path].card` (services.ts) | `SERVICE_PRICE_CHIP` / `LOWEST_PRICE_CHIP` are @deprecated. Once nothing imports them, the next data owner deletes them. `Hero.astro`'s doc comment should then point at `heroPriceChip('home')` / `MONEY_PAGES[path].heroChips.price` |
| A3 | `src/components/StepsStrip.astro` | Add a `steps` prop (default `bookingSteps`) and render R4 from a prop. Pages pass `stepsFor(slug)` + `SP6_LINES[slug].r4` | Steps 3/4 and R4 are grooming-only; dog-walking and vet-at-home need their own lines (content.ts `SP6_LINES`) |
| A4 | `src/components/GroomerCard.astro` | Add `page?: MoneyPage` and show `specialityFor(person, page)` instead of `person.speciality` | Per-page speciality lines (cat: "Persian cat de-matting"; puppy: "Gentle with first-timers and nervous puppies") — people.ts `specialityOn` |
| A5 | `src/components/PromiseBand.astro` (or the about/safety pages) | A full variant that renders `promisePoints[].body` under each label | /about/ AB-4 and /safety-hygiene/ SH-2 show the full 06 §4.1 block. The prose now lives in content.ts |
| A6 | `src/layouts/Base.astro` | Default `waText` to `prefillFor(path)`, `stickyBookHref` to `stickyBookHrefFor(path)` and `stickyBookLabel` to `stickyBookLabelFor(path)` (services.ts), so no page can forget them. Emit `<meta property="og:image:alt">`: `MONEY_PAGES[path].og.alt` on money pages, else the home OG alt | 02 P158 (every wa.me link carries a page prefill), 07 §2 row 1, 02 P119 |
| A7 | `scripts/check-prices.mjs` | Remove the `TS_EXEMPT` entry for `src/data/content.ts` "label: 'On time, or ₹100 off.'" | Point 4 is now built with `inr(ON_TIME_OFF)`; the script already prints "exemption no longer needed" |

## B · Page builders (how to use the new data)

- **Money pages**: take everything from `MONEY_PAGES[path]`: hero chips (`heroChips.price` / `heroChips.trust`), the SP-4 mid-page CTA (`cta.label` / `cta.href`, `data-source={cta.source}`), SP-9 areas, the card for SP-11 siblings, `waPrefill` for every wa.me link, and `og.file` → `ogImage={'/og/' + og.file}` once the image exists. Hero primary links stay per E1/D2: `/book/?src=hero_<slug>`, and dog-walking `/book/?service=dog-walking&src=hero_dog-walking`.
- **SP-3**: `PACKAGE_TABLES['dog-grooming']` (dog page + /pricing/ PR-4, identical) and `PACKAGE_TABLES['cat-grooming']`. The last row label is `PACKAGE_DURATION_LABEL`, and the footnotes go directly under the table. There is no puppy grid: puppy SP-3 is a ✓-list.
- **Vet SP-4 footer**: write "Emergency? Nearest 24-hour hospitals: {site.emergencyVets}." Use `site.emergencyVets`, never the literal token, so the value is filled in one place (faq.ts already fills the FAQ answers from it).
- **/about/ AB-5**: `hiringSteps({ summary: true })` (4 lines). **/safety-hygiene/ SH-4** and **/join-as-groomer/ JG-4**: `hiringSteps()`. Any heading that counts steps must use `.length`; "Our 6-step process" is false while police verification is gated.
- **/about/ AB-7**: list `TEAM_LANGUAGES` (people.ts); the Service schema already follows it.
- **/terms/** (Wave 1) and **/refund-policy/** (Wave 2): use `RESCHEDULE_TEXT` verbatim (book.md ship check).
- **/pricing/**: PR-6 line `WALK_PAYMENT_LINE`; PR-8 H2 `GROOM_CLUB_HEADLINE`, pitch `GROOM_CLUB_PITCH`, button `waHref(groomClubWaText())`; PR-9 `FIRSTGROOM_LINE` + `FIRSTGROOM_TERMS`, `REFERRAL_LINE` + `REFERRAL_TERMS` (full terms inline: /offers/ is Wave 2). The OfferCatalog is built from the same `priceLines('pricing-cat-quick' | 'pricing-walking' | 'pricing-vet')` and `matrixColumns()` the page renders, so render those exact lines.
- **dog-walking SP-4**: `<PriceMatrix … r2={WALK_PAYMENT_LINE}>`.
- **/faq/**: `faqPageSections()` now returns `linkText` per category (link to `link` only while `isLive(link)`); the CTA band heading is `FAQ_CTA_HEADING`.
- **Walk/vet SP-5 proof-photo rows**: `proofPhotosFor(MONEY_PAGES[path].serviceIds)`. Render nothing while it is empty.

## C · Integrator

- C1 · Once `public/og/petdoorstep-home.jpg` and `public/images/petdoorstep-logo.png` exist, set `BUSINESS_IMAGE_PATH` / `BUSINESS_LOGO_PATH` in `src/lib/schema.ts` to them. A comment on each constant gives the target.
- C2 · A sitemap filter in `astro.config.mjs` can `import { isLive } from './src/data/routes'`. Both the extensionless and the `.ts` form were tested; the preview switch is honoured.
- C3 · Review builds: `PUBLIC_PDS_PREVIEW_LIVE=wave1 npm run build` treats every wave-1 route as live. Never set it for production. Statuses are flipped only by the integrator (routes.ts header).
- C4 · Wave 2 (not now): `areaServiceLd()` still emits the 3 dog packages (04 §2.2 last row), while `_TEMPLATE-area-page.md` §3 says offers = the Bath & Brush + Full Groom prices shown in AP-3. Reconcile when the area pages are built.

## D · Docs to sync (docs agent)

1. **00 §8**: add `LEGAL_NAME` and `FOUNDER_NAME` (People/Identity). 00 §3.2 reschedule line → `RESCHEDULE_TEXT` wording (F2-20).
2. **08 §5.2** (+ `website/src/assets/photos/README.md`): shot 13 `puppy-first-groom-at-home-ludhiana.jpg` — groomer on the floor with a Shih Tzu puppy, treat in hand — Puppy Grooming card (+ puppy hero). Shot 14 `dog-tick-check-at-home-ludhiana.jpg` — groomer doing a full-body tick check on an Indie dog at home — Tick & Flea card. Card alts per decisions §2.
3. **04 §2.2** dog-grooming offer names (F2-11); **04 §2.5** OfferCatalog names, order and Groom Club row (F2-12/13/14); **04 §4** OG alt per image (decisions §2). The OG image text must print the same words.
4. **07 §2 row 4** + **09 §2d**: `service_<id>` may carry the page slug (`service_dog-grooming`). CTA price wording rule F2-05.
5. **book.md** FAQ #3 (new wording + "Full details are on our terms page and our refund & cancellation policy page."); **how-it-works.md** FAQ #3; **contact.md** FAQ #1 (call-back sentence gone; drop its ship check); **vet-at-home.md** FAQ #3 (emergency line); **faq.md** §3/§5 (category link texts, CTA heading, home-1 links).
6. **dog-walking.md** SP-4 payment line → `WALK_PAYMENT_LINE`; **dog-walking.md** and **vet-at-home.md**: add SP-6 lines (decisions §2).
7. **pricing.md** PR-4: the grid carries "Premium Spa (dog spa at home)" too (shared table); PR-8 button prefill (size-less wording).
8. **home.md** §5 H-3 alt row → the E5 shot alts; **08 §4.4** footer service labels → the 01 page names ("Cat Grooming at Home", "Dog Vaccination at Home"), as rendered from routes.ts.
9. **join-as-groomer.md** JG-4 H2 "Our 6-step process": count from the claimable steps (police verification is gated).
