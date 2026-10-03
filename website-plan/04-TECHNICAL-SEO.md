# 04 · TECHNICAL SEO — the Astro build spec

> This file owns schema specs, Core Web Vitals budgets, robots/sitemap/canonicals and OG meta for the PetDoorStep site. It obeys `00-MASTER-PLAN.md` (facts from §3, URLs from §5 / `01-SITEMAP.md`, placeholders per §8). Audit criteria live in `02-SEO-PARAMETERS.md`; this file is the build-time implementation of them.

**Domain note:** every absolute URL below uses `https://[FILL:DOMAIN]`. When the domain is purchased (Wave 0), replace the token everywhere — the `grep -r "FILL:" website/` launch gate catches stragglers.

---

## 1 · Astro scaffold requirements

### 1.1 Project creation (Wave 0, per 00 §2 D1/D7)

Run from the repo root (the Astro project lives in `website/`; the root Vite/Three.js skeleton stays untouched):

```bash
npm create astro@latest website -- --template minimal --typescript strict --no-git
cd website
npx astro add sitemap react   # answer yes to all prompts
npm install tailwindcss @tailwindcss/vite
npm install @fontsource-variable/nunito @fontsource-variable/inter
```

Notes:
- **Tailwind v4** via the `@tailwindcss/vite` plugin (the old `@astrojs/tailwind` integration is deprecated). Import Tailwind once in the global stylesheet: `@import "tailwindcss";` in `src/styles/global.css`.
- **React integration exists for exactly one island**: the booking widget (`07-BOOKING-SPEC.md`). No other component may import React (see §5.3).

### 1.2 `astro.config.mjs` — exact baseline

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://[FILL:DOMAIN]',        // REQUIRED for sitemap + canonical generation
  trailingSlash: 'always',              // 00 §5: every URL ends in /
  build: { format: 'directory' },       // /pricing/ → /pricing/index.html
  integrations: [
    sitemap({
      // §7.1 (00 §11 E7): only routes marked 'live' in src/data/routes.ts, so /thank-you/, the 404 page and
      // unbuilt pages never appear; each with its real lastmod, never the build date. Helper names are illustrative.
      filter: (page) => isLiveUrl(page),
      serialize: (item) => withRealLastmod(item),
    }),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
```

`trailingSlash: 'always'` makes Astro throw in dev when an internal link misses the slash — leave it on; it is the enforcement mechanism for 00 §5. The host must also 301 `/pricing` → `/pricing/` (Cloudflare Pages does this automatically for `build.format: 'directory'` output; verify once with `curl -I`).

### 1.3 Self-hosted fonts (@fontsource)

Families are owned by `08-DESIGN-SYSTEM.md` (teal + amber identity). **Default pairing until 08 says otherwise** — if 08 names different families, swap the package names but keep every loading rule below unchanged:

| Role | Family | Package | Weights used |
|---|---|---|---|
| Headings / display | Nunito (variable) | `@fontsource-variable/nunito` | one variable file covers 400–900 |
| Body / UI | Inter (variable) | `@fontsource-variable/inter` | one variable file covers 400–700 |

Rules (map to `02-SEO-PARAMETERS.md` #128/#129):
1. Import once in the base layout: `import '@fontsource-variable/nunito'; import '@fontsource-variable/inter';` — never from a CDN, never Google Fonts `<link>`.
2. **Preload both WOFF2 files** in `<head>` of the base layout:
   ```html
   <link rel="preload" href="/_astro/nunito-latin-wght-normal.<hash>.woff2" as="font" type="font/woff2" crossorigin />
   <link rel="preload" href="/_astro/inter-latin-wght-normal.<hash>.woff2" as="font" type="font/woff2" crossorigin />
   ```
   In practice: import the woff2 URL (`import nunitoWoff2 from '@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2?url'`) and interpolate it, so the hash is handled by the bundler.
3. `font-display: swap` — @fontsource ships this by default; verify in the built CSS.
4. **Metric-matched fallbacks to kill font CLS**: run `npx fontpie ./node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2 --name Nunito` (and same for Inter) and paste the generated `@font-face` fallback blocks (with `size-adjust`, `ascent-override`, `descent-override` against Arial) into `global.css`. Font stacks become `'Nunito Variable', 'Nunito Fallback', Arial, sans-serif` etc.
5. Hard cap: **2 families, ≤2 WOFF2 files, ≤200 KB total font payload.** Latin subset only (no latin-ext needed for English + romanised Hinglish).

### 1.4 Images (astro:assets)

Every content image goes through `astro:assets` — no raw `<img>` to `/public/` except the OG share images and favicons.

```astro
---
import { Picture } from 'astro:assets';
import hero from '../assets/dog-grooming-at-home-ludhiana-hero.jpg';
---
<Picture
  src={hero}
  formats={['avif', 'webp']}
  fallbackFormat="jpg"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 800px"
  width={1200} height={900}
  alt="Golden Retriever being bathed at home in Sarabha Nagar, Ludhiana"
  loading="lazy" decoding="async"
/>
```

Rules (map to `02` #69–#77):
- **AVIF first, WebP fallback, original-format last** via `<Picture formats={['avif','webp']}>`.
- **Explicit `width`/`height` on every image** — `astro:assets` infers them from the source file; never remove them (CLS guard, `02` #73).
- Hero/LCP image per template: `loading="eager"`, `fetchpriority="high"`, **plus** a `<link rel="preload" as="image">` in `<head>` using `getImage()` to resolve the optimized URL (see §5.2 snippet).
- All other images: `loading="lazy"`.
- Source files named descriptively per `02` #71 (`shih-tzu-full-groom-before-ludhiana.jpg`), lowercase, hyphens.
- Weight budgets: hero ≤150 KB, content image ≤100 KB, page image payload ≤1 MB.

### 1.5 `robots.txt` — exact file content

Static file at `website/public/robots.txt`. Ship exactly this:

```
User-agent: *
Allow: /
Disallow: /thank-you/

Sitemap: https://[FILL:DOMAIN]/sitemap-index.xml
```

Mechanism note (so nobody "fixes" it wrongly later): `/thank-you/` carries `noindex, follow` meta (§3.3) **and** is excluded from the sitemap (§7.1). The `Disallow` line saves crawl budget; the noindex is the real de-indexer. If GSC ever reports */thank-you/ "Indexed, though blocked by robots.txt"* (possible if someone external links to it), delete the `Disallow` line and let Googlebot read the `noindex` — then re-add nothing.

### 1.6 404 page

`src/pages/404.astro`, built to `/404.html` — Cloudflare Pages serves it with a real **HTTP 404 status** automatically (verify with `curl -I https://[FILL:DOMAIN]/no-such-page/` → `404`). Page spec (copy is final, ready to paste):

- H1: `This page wandered off the leash`
- Body: `The page you're looking for doesn't exist or has moved. No worries — everything PetDoorStep does in Ludhiana is one tap away:`
- Link list (plain `<ul>`): Dog Grooming at Home → `/ludhiana/dog-grooming/` · Cat Grooming at Home → `/ludhiana/cat-grooming/` · Dog Walking → `/ludhiana/dog-walking/` · Vet at Home → `/ludhiana/vet-at-home/` · Price List → `/pricing/` · Book a Service → `/book/`
- Primary CTA button: `Book on WhatsApp` → `wa.me` deep link per `07-BOOKING-SPEC.md`.
- Meta: `<meta name="robots" content="noindex, follow">` (§3.3, `00` §11 E7), title `Page not found | PetDoorStep`.
- Uses the standard layout (header/footer/NAP intact) — a lost visitor is still a lead.

### 1.7 Other scaffold obligations

- `<html lang="en-IN">` in the base layout (`02` #122/#170).
- `<meta name="viewport" content="width=device-width, initial-scale=1">` — never add `maximum-scale`/`user-scalable=no` (`02` #174).
- Favicon set in `/public/`: `favicon.svg` (master), `favicon.ico`, `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` + `site.webmanifest`. Artwork per `08-DESIGN-SYSTEM.md`.
- Semantic landmarks in the base layout: one `<header>`, one `<main>`, one `<footer>`, `<nav aria-label="Main">` (`02` #165).
- Site-wide footer NAP block per `05-LOCAL-SEO.md` — crawlable HTML text, identical on every page.
- Non-production builds (Cloudflare Pages preview deploys): in the base layout, inject `<meta name="robots" content="noindex">` when `import.meta.env.CF_PAGES_BRANCH && import.meta.env.CF_PAGES_BRANCH !== 'main'` — staging must never index (`02` #158).

---

## 2 · JSON-LD structured data — copy-paste blocks

### 2.0 Global rules

1. **JSON-LD only**, one `<script type="application/ld+json">` per page containing a single `@graph`, rendered in `<head>` by a shared `<SchemaGraph>` Astro component. Props: `type` (`home | service | pricing | howto | blog | breadcrumb-only`), plus per-page data. No microdata, ever.
2. **One entity, one `@id`:** the business node is always `https://[FILL:DOMAIN]/#business`. Every `provider`, `publisher`, `brand` reference points at that `@id` — never a second inline copy of the business.
3. **Schema mirrors visible content, exactly** (`02` #110). Every price, hour, FAQ answer and breadcrumb in markup appears as readable text on the same page. Prices come from 00 §3.2 only; if 00 changes, schema and page change in the same commit.
4. **Self-serving stars — Google's current rule:** since Sept 2019 (still in force in Google's Review Snippet docs as of 2026), `Review`/`aggregateRating` markup about the business itself on its own `LocalBusiness`/`Organization` earns **no stars and never will**. Do **NOT** mark up PetDoorStep testimonials with `Review`/`aggregateRating` anywhere on the site. Testimonials render as plain HTML content (name + locality + pet, per `06-CONVERSION-PLAYBOOK.md`), ideally quoting Google reviews verbatim with a link to `[FILL:GBP_LINK]`.
5. **FAQ & HowTo rich results no longer display** for ordinary sites (FAQ restricted Aug 2023, HowTo removed Sept 2023). We ship both markups anyway — they cost nothing and feed AI/answer-engine extraction — but expect **zero** visual SERP treatment. Never pad FAQs to chase stars. One Q&A may be marked up both on its source page and on `/faq/`, since both pages show it visibly (one `faq.json` entry, `blueprints/faq.md` §2) — accepted (`00` §11 E8, 2026-10-03).
6. **Validation gate (launch-blocker, `02` #109):** every template passes Google Rich Results Test *and* validator.schema.org with zero errors before launch, and re-validates after any template change (`02` #182).

### 2.1 (a) LocalBusiness — service-area business (home + `/contact/`)

No `streetAddress` — PetDoorStep is a SAB with a hidden base (00 §3.1); publishing a street address the GBP hides would create a NAP mismatch (`05-LOCAL-SEO.md` §1). `PostalAddress` stops at city level.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://[FILL:DOMAIN]/#business",
  "name": "PetDoorStep",
  "slogan": "Pet care at your doorstep",
  "description": "Doorstep pet care in Ludhiana, Punjab: dog and cat grooming at home, dog walking, vet-at-home visits, vaccination and tick & flea treatment. Background-verified groomers, fresh sanitised kit for every pet, fixed transparent prices.",
  "url": "https://[FILL:DOMAIN]/",
  "telephone": "[FILL:PHONE]",
  "email": "[FILL:EMAIL]",
  "image": "https://[FILL:DOMAIN]/og/petdoorstep-home.jpg",
  "logo": "https://[FILL:DOMAIN]/images/petdoorstep-logo.png",
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ludhiana",
    "addressRegion": "Punjab",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 30.9010, "longitude": 75.8573 },
  "areaServed": [
    { "@type": "City", "name": "Ludhiana" },
    { "@type": "Place", "name": "Sarabha Nagar, Ludhiana" },
    { "@type": "Place", "name": "BRS Nagar, Ludhiana" },
    { "@type": "Place", "name": "Model Town, Ludhiana" },
    { "@type": "Place", "name": "Civil Lines, Ludhiana" },
    { "@type": "Place", "name": "Dugri, Ludhiana" },
    { "@type": "Place", "name": "Pakhowal Road, Ludhiana" },
    { "@type": "Place", "name": "South City, Ludhiana" },
    { "@type": "Place", "name": "Ferozepur Road, Ludhiana" },
    { "@type": "Place", "name": "Haibowal Kalan, Ludhiana" },
    { "@type": "Place", "name": "Kitchlu Nagar, Ludhiana" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "[FILL:INSTAGRAM]",
    "[FILL:GBP_LINK]"
  ]
}
```

`image` is the brand OG file from the §4 list and `logo` the 512 px mark square (`08` §6.4), both shipped files. Maintenance: when Justdial/Sulekha/Facebook profiles go live (`05-LOCAL-SEO.md` §6), append their URLs to `sameAs`. `geo` is the Ludhiana city-centre coordinate — update to the (hidden) base locality's coordinate once GBP is verified, matching GBP exactly.

### 2.2 (b) Service — worked example for `/ludhiana/dog-grooming/`

Same pattern for every money page (swap `name`, `serviceType`, `url`, `offers` rows from 00 §3.2). Offers below are the three dog-grooming packages; the visible price table on the page must show the same nine prices.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/#service",
  "name": "Dog Grooming at Home in Ludhiana",
  "serviceType": "Dog grooming at home",
  "url": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/",
  "provider": { "@id": "https://[FILL:DOMAIN]/#business" },
  "areaServed": { "@type": "City", "name": "Ludhiana" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://[FILL:DOMAIN]/book/",
    "availableLanguage": ["en", "hi", "pa"]
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Bath & Brush — bath, blow-dry, brush-out, nail trim, ear clean",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 599,
        "maxPrice": 999,
        "priceCurrency": "INR"
      },
      "description": "Small dog (under 10 kg) ₹599 · Medium (10–25 kg) ₹799 · Large (over 25 kg) ₹999",
      "availability": "https://schema.org/InStock",
      "url": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/"
    },
    {
      "@type": "Offer",
      "name": "Full Groom — Bath & Brush plus haircut/styling, paw & sanitary trim",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 1199,
        "maxPrice": 1899,
        "priceCurrency": "INR"
      },
      "description": "Small dog ₹1,199 · Medium ₹1,499 · Large ₹1,899",
      "availability": "https://schema.org/InStock",
      "url": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/"
    },
    {
      "@type": "Offer",
      "name": "Premium Spa Groom — Full Groom plus de-shed/de-mat, conditioning masque, perfume",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": 1799,
        "maxPrice": 2799,
        "priceCurrency": "INR"
      },
      "description": "Small dog ₹1,799 · Medium ₹2,199 · Large ₹2,799",
      "availability": "https://schema.org/InStock",
      "url": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/"
    }
  ]
}
```

Per-page `offers` mapping for the other money pages (all rows from 00 §3.2 — copy the structure above; the vet and cat rows stay as they are, `00` §11 E8):

| Page | Offer rows (name → min/max or flat INR) |
|---|---|
| `/ludhiana/cat-grooming/` | Cat Bath & Brush → 899 flat · Cat Full Groom → 1399 flat |
| `/ludhiana/dog-walking/` | 1 walk/day monthly → 2999 · 2 walks/day monthly → 4999 · Walking Trial Week → 699 |
| `/ludhiana/vet-at-home/` | Vet Home Visit (consult) → 699 (description: "medicines/vaccines at MRP") |
| `/ludhiana/dog-vaccination/` | Vaccination at Home → 199 (description: "₹199 service fee + vaccine at MRP") · Deworming Visit → 499 |
| `/ludhiana/tick-flea-treatment/` | Add-on with any groom → 399 · Standalone visit → 699 |
| `/ludhiana/puppy-grooming/` | Puppy Intro Groom (under 6 months) → 699 flat |
| Area pages (`/ludhiana/areas/*/`) | Same `Service` type, `name` = "Pet Grooming at Home in {Area}, Ludhiana", `areaServed` = that one `Place`, `offers` = the three dog-grooming packages |

### 2.3 (c) FAQPage — worked example (`/ludhiana/dog-grooming/`)

Only questions that are visibly answered on the page, verbatim. Every money page gets 5–8 FAQs (`02` #195); mark up all of them. Example with four:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does dog grooming at home cost in Ludhiana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixed prices by size: Bath & Brush ₹599–₹999, Full Groom ₹1,199–₹1,899, Premium Spa Groom ₹1,799–₹2,799. Small is under 10 kg, Medium 10–25 kg, Large over 25 kg. No doorstep bargaining — the price you see is the price you pay."
      }
    },
    {
      "@type": "Question",
      "name": "Which areas of Ludhiana do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We groom pets at home across Ludhiana, including Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan and Kitchlu Nagar."
      }
    },
    {
      "@type": "Question",
      "name": "Is the grooming kit hygienic and safe for my dog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every visit uses a fresh sanitised kit — sealed blades and towels opened in front of you — and all our groomers are background-verified and trained, with ID and reference checks."
      }
    },
    {
      "@type": "Question",
      "name": "Can you groom large or anxious dogs like Labradors and German Shepherds at home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our groomers handle Labradors, German Shepherds, Golden Retrievers and Indies regularly. Grooming happens at your home with you nearby, which keeps most anxious dogs calmer than a salon visit."
      }
    }
  ]
}
```

### 2.4 (d) BreadcrumbList — worked example (Home › Ludhiana › Dog Grooming)

On every page below home, matching the visible breadcrumb trail (`01-SITEMAP.md` §2.6). Position 2 links `/ludhiana/` even before that hub page ships in Wave 2 — the visible breadcrumb's middle item stays plain text (no `<a>`) until `/ludhiana/` is live, but the schema `item` URL is stable from day one.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[FILL:DOMAIN]/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ludhiana",
      "item": "https://[FILL:DOMAIN]/ludhiana/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Dog Grooming at Home",
      "item": "https://[FILL:DOMAIN]/ludhiana/dog-grooming/"
    }
  ]
}
```

Area-page variant: 3 items, `Home › Ludhiana › Sarabha Nagar`. There is no "Areas" level (no `/ludhiana/areas/` page exists), so the visible breadcrumb and the schema both skip it and every item is a real page (`01` §2.6, `08` §4.18).

### 2.5 (e) OfferCatalog — `/pricing/`

Every row of 00 §3.2 appears (schema must mirror the visible full price table). **Each Offer `name` is the label the visitor sees on `/pricing/`** (`blueprints/pricing.md` §3 + §5: "names identical to the table labels" — `pricing.md` §5 wins over the older names here, `00` §11 E6, 2026-10-03). Context the label leaves out (dog vs cat, monthly, "+ MRP") goes in `description`, never in the number.

```json
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://[FILL:DOMAIN]/pricing/#catalog",
  "name": "PetDoorStep Ludhiana — Doorstep Pet Care Price List",
  "url": "https://[FILL:DOMAIN]/pricing/",
  "provider": { "@id": "https://[FILL:DOMAIN]/#business" },
  "itemListElement": [
    { "@type": "Offer", "name": "Bath & Brush", "description": "Dog grooming. Small ₹599 · Medium ₹799 · Large ₹999. Bath, blow-dry, brush-out, nail trim, ear clean.", "priceCurrency": "INR", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 599, "maxPrice": 999, "priceCurrency": "INR" } },
    { "@type": "Offer", "name": "Full Groom", "description": "Dog grooming. Small ₹1,199 · Medium ₹1,499 · Large ₹1,899. Bath & Brush plus haircut/styling, paw & sanitary trim.", "priceCurrency": "INR", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 1199, "maxPrice": 1899, "priceCurrency": "INR" } },
    { "@type": "Offer", "name": "Premium Spa", "description": "Dog grooming. Small ₹1,799 · Medium ₹2,199 · Large ₹2,799. Full Groom plus de-shed/de-mat, conditioning masque, perfume.", "priceCurrency": "INR", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 1799, "maxPrice": 2799, "priceCurrency": "INR" } },
    { "@type": "Offer", "name": "Cat Bath & Brush", "price": "899", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Cat Full Groom", "price": "1399", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Puppy Intro Groom (8 weeks–6 months)", "price": "699", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Nail Trim + Ear Clean visit", "price": "299", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Tick & Flea add-on", "description": "With any groom.", "price": "399", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Tick & Flea standalone", "description": "Standalone visit.", "price": "699", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "1 walk/day", "description": "Dog walking, monthly plan. Fixed walker, GPS + photo update after every walk.", "price": "2999", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "2 walks/day", "description": "Dog walking, monthly plan.", "price": "4999", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Trial Week (7 walks)", "description": "Dog walking.", "price": "699", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Vet visit", "description": "Registered veterinarians only. Medicines at MRP.", "price": "699", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Vaccination", "description": "₹199 service fee + vaccine at MRP, with reminder calendar.", "price": "199", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Deworming", "description": "Dewormer included.", "price": "499", "priceCurrency": "INR" },
    { "@type": "Offer", "name": "Groom Club", "description": "1 Full Groom per month at 15% off + free nail-trim visit + priority slots. Price depends on dog size — see Full Groom rates." }
  ]
}
```

Order follows the page (PR-3 matrix → PR-5 → PR-6 → PR-7 → PR-8). If a `/pricing/` label changes, change the `name` here in the same commit.

No rich result is expected from OfferCatalog — it exists for entity/AI clarity and to bind the price list to the `#business` node. The `/pricing/` page also carries FAQPage (pattern §2.3) and BreadcrumbList (`Home › Pricing`).

### 2.6 (f) WebSite + Organization — home page `@graph`

`LocalBusiness` **is** a schema.org subtype of `Organization`, so the `#business` node doubles as the Organization — never add a second Organization node. Home's single script contains:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://[FILL:DOMAIN]/#website",
      "url": "https://[FILL:DOMAIN]/",
      "name": "PetDoorStep",
      "inLanguage": "en-IN",
      "publisher": { "@id": "https://[FILL:DOMAIN]/#business" }
    },
    { "COMMENT": "…the full LocalBusiness block from §2.1 goes here, with its @id https://[FILL:DOMAIN]/#business…" },
    { "COMMENT": "…plus home's FAQPage block (per 01-SITEMAP.md home schema column) and nothing else…" }
  ]
}
```

No `potentialAction`/`SearchAction` — the site has no internal search. (Remove this restriction only if search ships; `02` #108.)

### 2.7 (g) Article (BlogPosting) — blog post template

Rendered by the blog layout; `{…}` values are injected from the post's frontmatter at build time (they are Astro template expressions, not hand-edits). Frontmatter contract for every post: `title`, `description`, `publishDate`, `updatedDate`, `heroImage`, `author`, `vetReviewed` (boolean).

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://[FILL:DOMAIN]/blog/{slug}/#article",
  "mainEntityOfPage": "https://[FILL:DOMAIN]/blog/{slug}/",
  "headline": "{frontmatter.title — max 110 chars}",
  "description": "{frontmatter.description}",
  "image": "https://[FILL:DOMAIN]/og/blog/{slug}.jpg",
  "author": {
    "@type": "Person",
    "name": "{frontmatter.author — a real named person, default the founder}",
    "url": "https://[FILL:DOMAIN]/about/"
  },
  "publisher": { "@id": "https://[FILL:DOMAIN]/#business" },
  "datePublished": "{frontmatter.publishDate — ISO 8601, e.g. 2026-11-05}",
  "dateModified": "{frontmatter.updatedDate ?? frontmatter.publishDate}",
  "inLanguage": "en-IN"
}
```

YMYL rule (`02` #57): any post touching vaccination, deworming, tick-borne disease or other medical topics adds
`"reviewedBy": { "@type": "Person", "name": "[FILL:VET_PARTNER_NAME]", "jobTitle": "Veterinarian" }`
and shows the matching visible "Medically reviewed by…" byline. `author.url` points at `/about/` until dedicated author pages exist (revisit at Wave 3).

### 2.8 (h) HowTo — `/how-it-works/`

Steps mirror the visible 4-step section and `07-BOOKING-SPEC.md`. (HowTo rich results are gone from Google Search — markup kept for answer-engine extraction only.)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to book doorstep pet care in Ludhiana with PetDoorStep",
  "description": "Book dog or cat grooming, dog walking or a vet visit at your home in Ludhiana in under two minutes, confirmed on WhatsApp.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Choose your service",
      "text": "Pick what your pet needs: grooming, walking, vet visit, vaccination or tick & flea treatment. Fixed prices are shown upfront.",
      "url": "https://[FILL:DOMAIN]/how-it-works/#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Tell us about your pet",
      "text": "Select dog or cat and the size — Small under 10 kg, Medium 10–25 kg, Large over 25 kg — so we quote the exact price, not an estimate.",
      "url": "https://[FILL:DOMAIN]/how-it-works/#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Pick your area and time slot",
      "text": "Choose your Ludhiana locality and a convenient slot between 9:00 am and 7:00 pm, any day of the week.",
      "url": "https://[FILL:DOMAIN]/how-it-works/#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Confirm on WhatsApp",
      "text": "Your booking opens in WhatsApp with all details pre-filled. Send it, and our team confirms your slot. A background-verified groomer arrives at your doorstep with a fresh sanitised kit.",
      "url": "https://[FILL:DOMAIN]/how-it-works/#step-4"
    }
  ]
}
```

### 2.9 Schema-per-page matrix (binding; matches `01-SITEMAP.md` schema column)

| Page(s) | Blocks in the `@graph` |
|---|---|
| `/` | WebSite + LocalBusiness + FAQPage |
| `/contact/` | LocalBusiness (same `@id`, same block) + BreadcrumbList + ContactPage (`"@type": "ContactPage"` wrapping `mainEntity: {"@id": "…#business"}`) |
| All `/ludhiana/<service>/` | Service + FAQPage + BreadcrumbList |
| `/ludhiana/areas/<area>/` | Service (area variant) + BreadcrumbList |
| `/ludhiana/` (Wave 2) | BreadcrumbList + reference to `#business` via a `WebPage` node with `about: {"@id": "…#business"}` |
| `/pricing/` | OfferCatalog + FAQPage + BreadcrumbList |
| `/how-it-works/` | HowTo + BreadcrumbList |
| `/about/` | AboutPage (`mainEntity` → `#business`) + BreadcrumbList |
| `/faq/` | FAQPage + BreadcrumbList |
| `/blog/<slug>/` | BlogPosting + BreadcrumbList |
| `/reviews/`, `/safety-hygiene/`, `/offers/`, `/book/`, legal pages | BreadcrumbList only (`/offers/` adds OfferCatalog scoped to live offers; `/reviews/` gets **no** Review markup — §2.0 rule 4) |
| `/join-as-groomer/` | BreadcrumbList; add JobPosting per live role only (with real `validThrough`, `baseSalary` when a role opens) |
| `/thank-you/`, `/404` | none |

---

## 3 · Canonical & indexing rules

1. **Self-referencing canonical on every indexable page** — emitted by the base layout, never hand-written per page:
   ```astro
   <link rel="canonical" href={new URL(Astro.url.pathname, Astro.site).href} />
   ```
   Output is always the final form: `https`, lowercase, trailing slash. `og:url` uses the identical value (§4).
2. **One origin.** `http://` → `https://` and `www.` → apex both 301 at the host/DNS level (Cloudflare rules), single hop. Decide apex vs `www` once at domain purchase — **apex** (`https://[FILL:DOMAIN]`) is the pick; `www` 301s to it.
3. **Noindex pages emit `noindex, follow`** (`00` §11 E7): `/thank-you/` (`<meta name="robots" content="noindex, follow">` in its head + excluded from sitemap + robots `Disallow`, §1.5) and the 404 page (§1.6; never in the sitemap). `/thank-you/` is the only noindexed real page; preview deploys are handled by rule 7.
4. **No parameterised or duplicate paths.** The static build has no query-string routing; `utm_*` params may arrive from GBP/ads but are never used in internal links (`02` #8) and the canonical strips them automatically (it is built from `pathname` only). No print pages, no tag archives, no date archives — they don't exist in the build.
5. **Uppercase and non-slash variants:** host serves the canonical form; Cloudflare Pages 308s `/Pricing` style miscapitalisations to 404 — add a lowercase-redirect rule only if real inbound links with uppercase appear in GSC (don't pre-build it).
6. **Blog pagination** (`/blog/` index, Wave 2):
   - Use Astro `paginate()` with `pageSize: 12` → URLs `/blog/`, `/blog/2/`, `/blog/3/` … (trailing slash, no `?page=`).
   - Every paginated page is **indexable and self-canonical** (`/blog/2/` canonicals to `/blog/2/`, never to `/blog/`).
   - Titles: `Pet Care Blog | PetDoorStep` for page 1; `Pet Care Blog — Page 2 | PetDoorStep` for page N. Meta description on page N appends ` (page 2)` to page 1's description.
   - Visible prev/next links in a `<nav aria-label="Pagination">`; no `rel=prev/next` head tags needed (Google ignores them).
   - Only `/blog/` (page 1) appears in nav/footer; deeper pages are reached by pagination links only.
7. **Preview/staging deployments** are noindexed via the `CF_PAGES_BRANCH` check (§1.7) — never via robots.txt (a robots-blocked page can still be indexed from external links; the meta tag cannot be ignored once crawled).

---

## 4 · OG / Twitter meta spec

Emitted by the base layout from the same two values every page already defines (`title`, `description` — written per `03-KEYWORD-MAP.md` / page blueprints). No page defines separate social copy; reuse keeps snippets and shares consistent.

```html
<!-- Per page, in <head>; values shown for /ludhiana/dog-grooming/ once its own OG file exists -->
<meta property="og:type" content="website" />            <!-- "article" on /blog/<slug>/ -->
<meta property="og:site_name" content="PetDoorStep" />
<meta property="og:locale" content="en_IN" />
<meta property="og:url" content="https://[FILL:DOMAIN]/ludhiana/dog-grooming/" />  <!-- === rel=canonical -->
<meta property="og:title" content="Dog Grooming at Home in Ludhiana – From ₹599" /> <!-- page <title> minus " | PetDoorStep" -->
<meta property="og:description" content="…the page's meta description verbatim…" />
<meta property="og:image" content="https://[FILL:DOMAIN]/og/dog-grooming.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="PetDoorStep — dog grooming at your home in Ludhiana, from ₹599" />
<meta name="twitter:card" content="summary_large_image" />
```

**Rules (every page):**
- `og:title` = the page's `<title>` **without the trailing ` | PetDoorStep`** (home's brand-led title has no suffix and is used as is). It is therefore ≤ 60 chars (`02` P117).
- `og:description` = the meta description verbatim · `og:url` = the canonical (§3.1).
- `og:image` = the page's own file from the list below, else `/og/petdoorstep-home.jpg`. `og:image:width`/`og:image:height` = 1200/630, and **`og:image:alt` is always present** (`02` P119): the alt listed for that file.

**OG file list** (files live in `website/public/og/`, rendered by `website/scripts/make-assets.mjs` from the `08` §5.6 template; the build fails if a page points at a missing file or a file whose price text is stale):

| File | Status | Used by | `og:image:alt` |
|---|---|---|---|
| `petdoorstep-home.jpg` | **ships** | every page without its own file; also the LocalBusiness `image` (§2.1) | `PetDoorStep — pet care at your doorstep in Ludhiana` |
| `dog-grooming.jpg` | **ships** | `/ludhiana/dog-grooming/` | `PetDoorStep — dog grooming at your home in Ludhiana, from ₹599` |
| `cat-grooming.jpg` | **ships** | `/ludhiana/cat-grooming/` | `PetDoorStep — cat grooming at your home in Ludhiana, from ₹899` |
| `dog-walking.jpg` | **ships** | `/ludhiana/dog-walking/` | `PetDoorStep — a daily dog walker in Ludhiana, from ₹2,999 a month` |
| `vet-at-home.jpg` | **ships** | `/ludhiana/vet-at-home/` | `PetDoorStep — a registered vet at your home in Ludhiana, ₹699 visit` |
| `blog-default.jpg` | **ships** (used from Wave 2, with `/blog/`) | `/blog/` and posts without their own image | `PetDoorStep — pet care tips for Ludhiana` |
| `blog/<slug>.jpg` | Wave 3 | that post (§2.7 BlogPosting `image`) | the post's hero alt |

Prices inside an alt come from `pricing.json` at build (the ₹-literal gate, `07` §4, applies to these strings too).

**og:image production spec:**
- Dimensions **1200×630** (1.91:1), PNG or JPG, **≤ 300 KB** (WhatsApp renders previews most reliably under ~600 KB; we stay well under). Absolute URLs, files live in `website/public/og/`.
- Branded template designed once per `08-DESIGN-SYSTEM.md` §5.6 (teal background, amber accent, logo, headline area): service name + "at your home in Ludhiana" + from-price from 00 §3.2 on service files. No per-page generation yet. Wave 2+: generate per-page images at build with `astro-og-canvas` using the same template.
- **WhatsApp preview test is a launch gate** (`02` #150): paste every Wave-1 URL into a WhatsApp chat on a real phone; image, title and description must render. WhatsApp caches previews — bust with `?v=2` on the og:image URL if a template changes.

---

## 5 · Core Web Vitals budget & the Astro tactics that guarantee it

### 5.1 Budgets (p75 field targets; lab-tested pre-launch per 00 §9.8)

| Metric | Budget | Guaranteed by |
|---|---|---|
| LCP | ≤ 2.5 s (lab target ≤ 1.8 s) | static HTML on CDN, preloaded hero, no render-blocking JS |
| INP | ≤ 200 ms | near-zero JS; booking island is the only interactive surface — test its step transitions |
| CLS | ≤ 0.1 (target ≈ 0) | explicit image dimensions, metric-matched font fallbacks, reserved sticky-bar space |
| TTFB | ≤ 800 ms (expect < 200 ms) | Cloudflare Pages edge in India |
| Page weight (money pages) | ≤ 1.5 MB total; images ≤ 1 MB; fonts ≤ 200 KB | §1.3–§1.4 budgets |
| JS | **0 KB on every page except `/book/`**; `/book/` ≤ 100 KB compressed | §5.3 |
| Lighthouse mobile | ≥ 90 on home + one service page (00 §9.8); target 95+ | all of the above |

### 5.2 Tactics (each one is a build requirement, not a suggestion)

1. **Zero-JS pages.** All pages render as pure static HTML/CSS. FAQ accordions use `<details>/<summary>` (crawlable, keyboard-accessible, no JS). Mobile nav uses the CSS checkbox/`:has()` pattern or `<details>`. No carousel anywhere (design rule, see `08-DESIGN-SYSTEM.md`).
2. **Preloaded hero image** on every money-page template:
   ```astro
   ---
   import { getImage } from 'astro:assets';
   import heroSrc from '../assets/dog-grooming-at-home-ludhiana-hero.jpg';
   const hero = await getImage({ src: heroSrc, format: 'avif', width: 800 });
   ---
   <link rel="preload" as="image" href={hero.src} imagesizes="100vw" fetchpriority="high" />
   ```
   Hero `<Picture>` itself: `loading="eager" fetchpriority="high"`, never lazy (`02` #76–77).
3. **Fonts:** `font-display: swap` + fontpie metric fallbacks + preload, per §1.3 — this is the complete font-CLS story.
4. **No layout shift:** every `<img>`/`<Picture>` has width+height (§1.4); the sticky mobile CTA bar reserves its height with `padding-bottom: calc(64px + env(safe-area-inset-bottom))` on `<body>` at first paint (`02` #134); map embeds are click-to-load facades with a fixed-ratio placeholder (`02` #114); no content injected above existing content, ever.
5. **CSS:** single compiled Tailwind stylesheet, inlined into `<head>` when ≤ 10 KB compressed (Astro `inlineStylesheets: 'auto'` default handles this); no `@import` chains; no icon font — inline SVG icons only.
6. **Third-party scripts:** exactly one — GA4, loaded with `defer` after window `load` via the pattern in `09-ANALYTICS-TRACKING.md`. No chat widgets, no heatmaps, no pixel tags at launch. Any future addition must fit the ≤3 scripts cap (`02` #130) and be approved in the Decision Log.
7. **Compression/caching:** Brotli + immutable cache headers are Cloudflare Pages defaults for hashed `/_astro/*` assets; verify once with `curl -I` (expect `content-encoding: br`, `cache-control: …immutable`).

### 5.3 JS budget enforcement

- The **booking widget is the only React island**, loaded **only** on `/book/` with `client:load` (it is the page's purpose — no lazy hydration games there). Budget: ≤ 100 KB compressed including React runtime; if the widget outgrows this, swap React for Preact via `@astrojs/preact` (API-compatible) before shipping — decision pre-approved here.
- Every other page's CTA is a plain `<a>` to `/book/` or a `wa.me` deep link (`07-BOOKING-SPEC.md`) — zero hydration.
- CI check: after `npm run build`, `find dist -name '*.js' -path '*astro*'` must show client JS referenced only by `book/index.html`. Grep gate: `grep -rl 'client:' src/pages src/layouts src/components | grep -v Booking` must return nothing.
- **Inline-script exceptions** (`00` §11 2026-10-03; same list as `08` §8.1 and `09` §3.1): exactly three small inline vanilla `<script>`s may ship, none of them an island, each tagged with a `data-pds` attribute so the CI gate can allow-list them: ① the analytics bootstrap with the WhatsApp/tel click tracking (`09` §3.1), ② the exit card (`07` §2 row 7), ③ the `/thank-you/` script (`09` §3.3). Any other inline `<script>` fails the gate.

---

## 6 · Redirects, 404 policy & future hreflang

### 6.1 Redirect policy

- **Single-hop 301s only** (`02` #160). No 302 for anything permanent. No chains — when a redirect target itself moves, edit the original rule to point at the final URL.
- Internal links always point at final URLs — a crawl (Screaming Frog, monthly per `02` #179) must show **zero** internal links hitting 3xx/4xx.
- Mechanism: `website/public/_redirects` (Cloudflare Pages format). Initial file content:
  ```
  # PetDoorStep redirects — 301s only, single hop. Add retired URLs here, never delete pages silently.
  /index.html  /  301
  /home        /  301
  /home/       /  301
  ```
- **URL retirement rule:** 00 §5 forbids URL changes, so this file should stay near-empty. If a page is ever merged/retired (requires a Decision Log entry), add its 301 to the closest surviving page the same day, keep it forever, and remove the old URL from the sitemap (automatic at next build).
- Host-level: `http→https` and `www→apex` 301s configured in Cloudflare (Bulk Redirect / redirect rule), not in `_redirects`.

### 6.2 404 policy

- Invalid URLs return a **real HTTP 404** with the page specced in §1.6 — never a 200 "soft 404", never a blanket redirect to home.
- Monthly: GSC Coverage → "Not found (404)" review; genuinely mistyped inbound links with real traffic get a `_redirects` entry; noise is left as 404 (that is the correct status).

### 6.3 Future hreflang stub — `/hi/`

Not shipped now (D3: English + Hinglish only until Punjab expansion). The architecture reserves the `/hi/` prefix so Hindi versions mirror every URL 1:1 (`/hi/ludhiana/dog-grooming/`) with zero English-URL changes. When `/hi/` launches (trigger in `11-EXPANSION-PLAYBOOK.md`), the base layout adds, on every page that has a Hindi twin:

```html
<!-- hreflang stub — ACTIVATE ONLY at /hi/ launch; both pages must exist and cross-reference -->
<link rel="alternate" hreflang="en-IN" href="https://[FILL:DOMAIN]/ludhiana/dog-grooming/" />
<link rel="alternate" hreflang="hi-IN" href="https://[FILL:DOMAIN]/hi/ludhiana/dog-grooming/" />
<link rel="alternate" hreflang="x-default" href="https://[FILL:DOMAIN]/ludhiana/dog-grooming/" />
```

Rules recorded now so launch day is mechanical: hreflang must be **bidirectional** (the `/hi/` page carries the identical 3-line set), every URL absolute and self-inclusive, `x-default` always the English page, and the `@astrojs/sitemap` `i18n` option set to emit the same alternates in the sitemap. Until then: no hreflang tags at all (a single-language site needs none), and nothing may squat on the `/hi/` path.

---

## 7 · XML sitemap + Google Search Console

### 7.1 Generation (build-time, automatic)

- `@astrojs/sitemap` (configured in §1.2) emits `/sitemap-index.xml` → `/sitemap-0.xml` at every build. **It lists only routes marked `live` in `src/data/routes.ts`** (`00` §11 E7, 2026-10-03): `/thank-you/`, the 404 page, non-page assets and every page not yet built never appear. Result: only indexable, 200, canonical, trailing-slash URLs — exactly the `01-SITEMAP.md` inventory as pages go live.
- `robots.txt` already points at `https://[FILL:DOMAIN]/sitemap-index.xml` (§1.5).
- **lastmod (E7):** every listed route carries its **real** last-material-edit date — the same date as its visible "Last updated" line where the page shows one (`02` P143); blog posts use `updatedDate ?? publishDate`. The date is kept by hand with the route (in `src/data/routes.ts` or a build-time map read next to it) and wired through the integration's `serialize` hook. Never emit the build date or today's date for an unchanged page — fake freshness trains Google to ignore our lastmod. A route with no recorded date gets no `<lastmod>` rather than a made-up one.
- Post-build sanity check (CI step): `grep -c '<loc>' dist/sitemap-0.xml` equals the number of live routes; `grep -E 'thank-you|404' dist/sitemap-0.xml` returns nothing.

### 7.2 GSC + Bing submission (Wave 0/launch day, step-by-step)

1. Create GSC **Domain property** for `[FILL:DOMAIN]` (covers http/https/www/apex in one property). Verify via **DNS TXT record** at the registrar/Cloudflare — not the HTML-file method (survives rebuilds).
2. Submit `https://[FILL:DOMAIN]/sitemap-index.xml` under Indexing → Sitemaps. Status must read "Success" within 48 h; if "Couldn't fetch", check robots.txt deploy and retry.
3. **URL Inspection → Request Indexing** for all 14 Wave-1 URLs (list in 00 §6 Wave 1) on launch day, money pages first (`/`, `/ludhiana/dog-grooming/`, `/ludhiana/cat-grooming/`, `/ludhiana/dog-walking/`, `/ludhiana/vet-at-home/`, `/pricing/`, `/book/`).
4. Settings → verify Googlebot sees mobile (smartphone agent) rendering of one money page via Live Test; confirm content parity.
5. **Bing Webmaster Tools:** use "Import from GSC" (one click, inherits verification + sitemap). Covers Bing + Copilot local surfaces (`05-LOCAL-SEO.md` §6 lists Bing Places separately).
6. Link GSC to the GA4 property (`09-ANALYTICS-TRACKING.md`).
7. Ongoing triage (owner: whoever runs the monthly routine in `05-LOCAL-SEO.md` §9): GSC Coverage + Core Web Vitals + Sitemaps reports **weekly for the first 90 days**, then monthly. Every new page (Wave 2 area pages, weekly blog posts) gets a Request Indexing on publish day.

---

## 8 · Definition of done (ties back to the audit file)

The scaffold task in 00 §6 Wave 0 is complete when all of these pass on the deployed preview:

- [ ] `astro.config.mjs` matches §1.2 (site, trailingSlash, sitemap filter, react, tailwind)
- [ ] robots.txt byte-identical to §1.5 (with real domain)
- [ ] Fonts self-hosted, preloaded, swap + fontpie fallbacks (§1.3); zero requests to fonts.googleapis.com in DevTools
- [ ] 404 page live with §1.6 copy and real 404 status
- [ ] `<SchemaGraph>` component renders §2 blocks per the §2.9 matrix; Rich Results Test + validator.schema.org: zero errors on every template
- [ ] Canonicals self-referencing and equal to `og:url` on every page (§3/§4)
- [ ] OG images per the §4 file list (all six ship; regenerate with `node scripts/make-assets.mjs` after any price change); `og:title` without the brand suffix and `og:image:alt` on every page; WhatsApp preview verified on a real phone (§4)
- [ ] Lighthouse mobile ≥ 90 on `/` and `/ludhiana/dog-grooming/`; zero client JS outside `/book/` (§5)
- [ ] `_redirects` in place; http/www variants 301 single-hop (§6)
- [ ] Sitemap live, GSC + Bing verified, Wave-1 URLs submitted (§7)
- [ ] Full-page audit against `02-SEO-PARAMETERS.md` launch-blockers passes for every Wave-1 page
