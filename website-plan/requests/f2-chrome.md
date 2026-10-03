# f2-chrome — requests & wiring notes for the other Wave-1 agents and the integrator

Everything below is either in a file f2-chrome does not own, or wiring that has to wait for a module another agent is
creating (`src/data/services.ts`, `sources.ts`, `legal.ts`, `promisePoints[].body`). Branch `wave1/f2-chrome`.

## A · Wiring the shared layout (all page builders)

1. **`<Base>` props (C9)** — `title`, `description`, `path` (must equal the page's own URL; the build fails otherwise),
   `ogImage?`, `ogImageAlt?`, `noindex?`, `waText?`, `stickyBookHref?`, `stickyBookLabel?`, `jsonLd?`, `hideStickyBar?`,
   `hideWaFloat?`, `exitCard?` and `<Fragment slot="head">…</Fragment>`. Don't pass `exitCard` unless a page needs to
   differ from the C4 default (Base picks 'neutral' for cat-grooming / dog-walking / vet-at-home / dog-vaccination,
   'grooming' elsewhere, nothing on /book/, /thank-you/, legal pages and the 404).
2. **Money pages, C1 wiring** (once `src/data/services.ts` lands):
   `<Base … ogImage={MONEY_PAGES[path].og.file} ogImageAlt={MONEY_PAGES[path].og.alt} stickyBookHref={stickyBookHrefFor(path)} stickyBookLabel={…}>`,
   plus `waText` = the page's WhatsApp prefill (`prefillFor(path)` if that is what it returns). Base does not import
   `services.ts`, so pages pass these. `ogImage` accepts `'dog-grooming.jpg'` or `'/og/dog-grooming.jpg'`; **the build
   fails if the file is not in `public/og/`.**
3. **Share images that exist** (`04` §4 Phase-1 set, 1200 × 630): `petdoorstep-home.jpg` (default), `dog-grooming.jpg`,
   `cat-grooming.jpg`, `dog-walking.jpg`, `vet-at-home.jpg`, `blog-default.jpg`. Wave-2 money pages
   (dog-vaccination, tick-flea-treatment, puppy-grooming) should use `petdoorstep-home.jpg` for now — or ask
   f2-chrome / the integrator to add a line to `ogSpecs()` in `scripts/make-assets.mjs` and re-run it.
   Suggested `og.alt` text (build the prices with the `pricing.ts` helpers — no ₹ literals in `.ts`):
   - dog-grooming.jpg → `PetDoorStep — dog grooming at your home in Ludhiana, from ₹599` (`04` §4 example; `heroPriceChip('dog-grooming')`)
   - cat-grooming.jpg → `PetDoorStep — cat grooming at your home in Ludhiana, from ₹899` (`heroPriceChip('cat-grooming')`)
   - dog-walking.jpg → `PetDoorStep — dog walking at your home in Ludhiana, from ₹2,999/month` (`'from ' + cardPriceChip('dog-walking')`)
   - vet-at-home.jpg → `PetDoorStep — vet visits at your home in Ludhiana, ₹699 visit` (`heroPriceChip('vet-at-home')`)
   - blog-default.jpg → `PetDoorStep — pet care tips for Ludhiana`
4. **Every `<Button>` with a `wa.me`, `tel:` or `instagram.com` href needs `source`** (a `09` §2d value: `hero_<slug>`,
   `service_<id>`, `footer`, `contact_page`, `about_page`, `reviews_page`, …) — the build fails without it. This includes
   the `primary`/`secondary` objects passed to `Hero` and `CtaBand`.
5. **`/contact/`** renders `<Nap source="contact_page" tone="light" />` — never retype the NAP; the text must stay
   byte-identical to the footer (E9). Any visible WhatsApp number elsewhere: `whatsappDisplay(site.whatsapp)` from
   `src/lib/format.ts`.
6. **`/about/` (AB-4) and `/safety-hygiene/` (SH-2)** render `<PromiseBand variant="full" />` (`medical` where needed);
   every other page keeps the default strip. The full variant shows each point's `body` once content.ts has it (below).
7. **Legal pages and the `/about/` story** wrap their long-form text in `<div class="prose">…</div>` (headings, p, ul/ol,
   tables and links styled; utilities still win inside it).

## B · Requests to other files' owners

1. **`src/data/content.ts`** — add `body` (the `06` §4.1 prose, verbatim, after each bold label) to every
   `promisePoints` entry and to its type (`body?: string`). PromiseBand already reads it.
2. **`src/lib/schema.ts`** — set `BUSINESS_IMAGE_PATH = '/og/petdoorstep-home.jpg'` and
   `BUSINESS_LOGO_PATH = '/images/petdoorstep-logo.png'` (both now exist, the `04` §2.1 paths). Then delete
   `website/public/og/default.png` (nothing else references it; `make-assets.mjs` no longer renders it).
3. **`src/components/Breadcrumb.astro`** — fold law below md: change the nav's `py-3` to `py-2 md:py-3`.
4. **`scripts/check-fill.mjs`** — also scan `dist/_redirects`: it carries `[FILL:GBP_REVIEW_LINK]` (the `/review`
   redirect, `05` §3.1) and its extension-less name is skipped by the current filter. `grep -r "FILL:" website/` (the
   `00` §8 gate) already catches it.

## C · Integrator

1. **Every route flipped to `status: 'live'` in `routes.ts` needs a date in `src/data/lastmod.ts`** (`'YYYY-MM-DD'`, the
   last material content edit — never today's date by default). `astro build` and `astro dev` stop with
   "live route(s) without a 'YYYY-MM-DD' last-edit date: …" until it is there. Only live routes reach the sitemap.
2. If `pricing.json` (or the tagline/city in `site.ts`) changes, run `node scripts/make-assets.mjs` before building:
   `astro build` fails while any share image still shows old text ("public/og/: … out of date").
3. `astro preview` under an agent: Astro 7 backgrounds it as a daemon (`astro preview stop` ends it). Use
   `--ignore-lock` to keep it in the foreground; `npm run test:e2e` now does this itself.
4. Spec edits on next pass (files f2-chrome does not own): `07` §2 row 7 + §9 and `08` §3.3/§3.6 still describe the
   exit nudge as a modal with overlay click / `aria-modal` / focus trap — update to D1 (non-modal corner card, neutral
   variant on cat/walking/vet pages). `02` P088's sample NAP string should become the `05` §4 wording (E9). The README
   could mention `scripts/make-assets.mjs` (favicons, logo, share images).
