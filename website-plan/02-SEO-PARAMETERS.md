# 02 · SEO PARAMETERS — the master on-page checklist & audit gate

> This file owns the on-page SEO parameter checklist (**P001–P168**), the Quick-20 re-audit subset, the per-page audit template, and the free-tool verification map. It obeys `00-MASTER-PLAN.md`: every URL comes from `01-SITEMAP.md`, every price/area/trust fact from `00-MASTER-PLAN.md` §3, keywords from `03-KEYWORD-MAP.md`. No page ships while any **[Launch-blocker]** fails.

---

## 1 · How to use this file

1. **When building a page:** open its blueprint (`blueprints/<page>.md`), build it, then walk this checklist top to bottom and record results in the audit template (§5).
2. **Ship gate:** a page moves from `built` → `audited` in `01-SITEMAP.md` only when **100% of its applicable [Launch-blocker] parameters pass**. It may go live with open [Important] items, but each must have an owner and a fix date ≤ 14 days after go-live. [Nice-to-have] items batch into the monthly routine (`05-LOCAL-SEO.md` + `09-ANALYTICS-TRACKING.md`).
3. **"Applicable" rule:** a parameter that cannot apply to a page type is marked `N/A` in the audit, never skipped silently (e.g. P046 vet-reviewer applies only to vet/vaccination/deworming/tick content; P157 booking-form items apply only where the widget is embedded).
4. **Placeholder rule (00 §8):** a page may be *built* containing `[FILL:*]` tokens, but can never pass audit for go-live until `grep -r "FILL:" website/` returns zero hits for that page's source.
5. **Re-audits:** full checklist on first audit and after any template change; the **Quick-20** (§4) monthly and after any content edit.
6. **Severity census:** 168 parameters = **60 [Launch-blocker] · 96 [Important] · 12 [Nice-to-have]**.
7. **Verified thresholds (current as of 2026-10):** Title 50–60 chars · Meta description 120–158 chars · LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 (p75 field data; INP replaced FID in March 2024). Competitor price figures, wherever cited as market context, carry the caveat: *mined from SERP snippets 2026-10; re-verify before publishing*.

---

## 2 · The checklist (P001–P168)

### A · URL & slugs (P001–P009)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P001 | URL from locked sitemap only | The page's URL appears character-for-character in `01-SITEMAP.md` §1. Research/competitor-style combined slugs (e.g. `/dog-grooming-at-home-ludhiana/`) are **forbidden** — those keywords map onto the locked geo-silo URL (`/ludhiana/dog-grooming/`). Zero invented URLs. | [Launch-blocker] |
| P002 | HTTPS-only | Page served over HTTPS with valid certificate; every `http://` request 301s to `https://`; DevTools Console shows zero mixed-content warnings. | [Launch-blocker] |
| P003 | Lowercase path | URL path contains zero uppercase characters; any uppercase variant 301s to the lowercase URL. | [Launch-blocker] |
| P004 | Hyphen word separators | Multi-word slug segments use `-` only; zero underscores, spaces, `%20`, or camelCase anywhere in the path. | [Launch-blocker] |
| P005 | Geo-silo structure intact | Every local money/area page carries the city as a path directory (`/ludhiana/…`) and the service keyword exactly once in the final slug segment (`dog-grooming`, `areas/sarabha-nagar`). City never duplicated in the slug (`/ludhiana/dog-grooming-ludhiana/` = fail). | [Launch-blocker] |
| P006 | Depth ≤ 3 directories, URL ≤ 75 chars | Path depth maximum 3 (`/ludhiana/areas/model-town/` = 3 = deepest allowed); full URL incl. domain ≤ 75 characters. | [Important] |
| P007 | No stop words, dates, or prices in slug | Slug contains none of: a/the/of/and/for/in (unless meaning-critical), no years, no ₹ figures. Slug never needs renaming when content updates. | [Important] |
| P008 | Trailing slash enforced | Astro config sets `trailingSlash: 'always'` (per 00 §5); every internal URL ends in `/`; non-slash variant 301s to the slash form. | [Important] |
| P009 | No dynamic parameters on indexable URLs | Canonical indexable URLs contain no `?id=`, `?ref=`, or session IDs; `utm_*` parameters never appear in internal links (campaign tagging is for external/ads links only). | [Important] |

### B · Title tag (P010–P017)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P010 | Title present & unique site-wide | Exactly one `<title>` per page; zero duplicate titles across all 44 planned URLs (verify in crawl report). | [Launch-blocker] |
| P011 | Length 50–60 characters | Title is 50–60 chars (lowest Google-rewrite band), hard ceiling 65, ≈ 580–600 px render width. Example that passes (58 chars): `Dog Grooming at Home in Ludhiana – From ₹599 \| PetDoorStep`. | [Launch-blocker] |
| P012 | Primary keyword first | The page's primary keyword from `03-KEYWORD-MAP.md` starts the title or appears within the first 30 characters. | [Launch-blocker] |
| P013 | Geo term in every local title | "Ludhiana" (or the area name + Ludhiana) appears in the title of every service/area/hub page. Area example (52 chars): `Dog Groomer in Sarabha Nagar, Ludhiana \| PetDoorStep`. | [Launch-blocker] |
| P014 | Brand suffix pattern | `\| PetDoorStep` is the final segment on every page except home; home may lead with brand: `PetDoorStep — Pet Grooming & Care at Home in Ludhiana` (53 chars). | [Important] |
| P015 | Title–H1 intent match | Title and H1 target the same query (same primary keyword, wording may differ); divergent intent = fail (it triggers Google rewrites). | [Important] |
| P016 | No stuffing, caps, emoji | At most 3 segments in the fixed pattern `{keyword phrase} – {one hook} \| PetDoorStep` (one en dash, one pipe; home is brand-led: `PetDoorStep — {keyword phrase}`); no comma-separated keyword lists, no ALL-CAPS words, no emoji/★/✓. | [Launch-blocker] |
| P017 | One concrete click-trigger | Title contains exactly one truthful differentiator where it fits in budget: a §3.2 from-price (`From ₹599`), "at Home", or "Verified Groomers". Never two. | [Important] |

### C · Meta description (P018–P024)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P018 | Present & unique per page | Exactly one `<meta name="description">` per indexable page; zero duplicates site-wide. | [Launch-blocker] |
| P019 | Length 120–158 characters | Full value proposition inside the first 120 chars (mobile cutoff ~130); total ≤ 158. Passing example (149 chars): `Doorstep dog grooming in Ludhiana from ₹599. Background-verified groomers, fresh sanitised kit, fixed prices. Book your slot on WhatsApp in 2 minutes.` | [Important] |
| P020 | Keyword + city in first 100 chars | Primary keyword and "Ludhiana" (or area) both appear within the first 100 characters (Google bolds query matches → CTR). | [Important] |
| P021 | One CTA + one differentiator | Contains exactly one action phrase ("Book on WhatsApp" / "See fixed prices") and at least one §3.4 trust fact (background-verified, sanitised kit, fixed prices). | [Important] |
| P022 | No bait — every claim on-page | Every price, service, and area named in the description is verifiable on the page itself. | [Important] |
| P023 | One truthful number | At least one concrete figure from §3.2/§3.1 where truthful: `From ₹599`, `Mon–Sun 9am–7pm`. Counts/review numbers only once real. | [Nice-to-have] |
| P024 | No double quotes or HTML | Zero `"` characters (they truncate snippets — use `'` or none) and zero markup characters in the description value. | [Important] |

### D · Headings (P025–P032)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P025 | Exactly one H1 | Rendered DOM contains exactly one `<h1>`; the logo/hero wordmark is not an h-tag. | [Launch-blocker] |
| P026 | H1 keyword + length | Primary keyword within the H1's first 5 words; H1 length 20–70 chars. Example: `Dog Grooming at Home in Ludhiana` (32 chars). | [Launch-blocker] |
| P027 | H1 unique site-wide | No two pages share an H1 (prevents cannibalisation between the 10 area pages — each H1 names its own area). | [Launch-blocker] |
| P028 | Correct outline order | H1 precedes all other headings in DOM order; hierarchy never skips a level (H2→H4 = fail); H3s only inside an H2 section. | [Important] |
| P029 | H2s = query-shaped section labels | Every H2 is a scannable sub-topic carrying a secondary keyword or entity from the page's brief ("Dog Grooming Price List in Ludhiana", "What's Included in a Full Groom"). | [Important] |
| P030 | ≥ 2 question-form headings per money page | At least 2 H2/H3s phrased as real user questions (PAA-shaped): "How much does dog grooming cost in Ludhiana?", "Is home grooming safe for my Shih Tzu?" | [Important] |
| P031 | Headings are real text | All H1–H3 content is selectable HTML text — never an image, SVG, or CSS background. | [Launch-blocker] |
| P032 | No style-only h-tags; sane density | Prices, buttons, card labels are not wrapped in h-tags; roughly one H2 per 150–300 words; no two consecutive headings without body text between them. | [Important] |

### E · Keyword & semantic coverage (P033–P041)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P033 | One primary keyword per page, map-enforced | Page's primary keyword is the one recorded in `03-KEYWORD-MAP.md`; no two pages share a primary (cannibalisation check against the map before writing). | [Launch-blocker] |
| P034 | Primary keyword in first 100 words | Exact or close variant appears in the opening paragraph. | [Important] |
| P035 | Natural density ≈ 0.5–1.5% | Primary keyword frequency between 0.5% and 1.5% of body words; copy reads naturally when spoken aloud (density check catches stuffing, not a quota). | [Important] |
| P036 | Secondary keywords mapped to sections | 3–8 secondary/long-tail variants from `03-KEYWORD-MAP.md`, each assigned to a specific H2/H3 section — recorded in the page blueprint before writing. | [Important] |
| P037 | Semantic entity coverage ≥ 8 | Money page names ≥ 8 topic entities: breeds (Shih Tzu, Labrador, German Shepherd, Golden Retriever, Beagle, Pomeranian, Indie; Persian cat on cat pages), tools (trimmer, de-shedding rake), conditions (ticks, matting), and §3.3 localities. | [Important] |
| P038 | Hinglish variant coverage | 2–4 natural Hinglish query forms in body/FAQ text ("dog grooming ghar pe", "dog ko nehlana") — present, unforced, never stuffed. | [Important] |
| P039 | "Near me" via geo-context | Near-me intent served by locality names, "Areas we serve" block, and LocalBusiness schema; the literal phrase "near me" appears ≤ 1 time in copy. | [Important] |
| P040 | SERP intent verified before writing | Documented check (screenshot or note in the blueprint) of what Google ranks for the primary keyword — local pack / service pages / listicles — and the page matches that format. | [Launch-blocker] |
| P041 | Anti-doorway uniqueness on area pages | Each `/ludhiana/areas/*` page has ≥ 60% unique body copy (unique intro, landmarks, testimonial, FAQs); shared template boilerplate < 40% (compare any two area pages with a diff tool). | [Launch-blocker] |

### F · Content quality & E-E-A-T (P042–P055)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P042 | People-first test | Page fully answers price + process + trust + how-to-book without requiring a call; it would be useful if Google didn't exist (Google helpful-content self-assessment, answered in the audit notes). | [Launch-blocker] |
| P043 | ≥ 3 unique elements vs top-3 competitors | Page contains at least 3 elements the current top-3 ranking pages lack (e.g. real ₹ price table, locality detail, process photos, groomer profiles) — listed in the audit notes. | [Important] |
| P044 | Depth minimums per template | Service pages ≥ 800 words · area pages ≥ 600 · blog posts ≥ 1,000 · pillar guides ≥ 1,500. Depth from answering more real questions, never padding. | [Important] |
| P045 | First-hand experience markers | ≥ 2 first-person process details per money page: real kit/groomer photos, actual case notes ("We groomed a matted Pomeranian in Dugri last week — 90 minutes, zero sedation"). Published only once true; `[FILL:CASE_NOTE_1]` until then. | [Important] |
| P046 | Named vet for YMYL-adjacent content | Every vet/vaccination/deworming/tick-disease page shows `[FILL:VET_PARTNER_NAME]` as author or medical reviewer with their VCI registration number and a linked bio. | [Launch-blocker] |
| P047 | Real About page, footer-linked | `/about/` (per `blueprints/about.md`) names the founder, the groomer verification process, and the registered business name; linked from every page's footer. | [Launch-blocker] |
| P048 | ≥ 3 contact methods | `/contact/` and footer expose clickable `tel:` `[FILL:PHONE]`, WhatsApp `[FILL:WHATSAPP_NUMBER]`, email `[FILL:EMAIL]`, plus service hours Mon–Sun 9:00–19:00. | [Launch-blocker] |
| P049 | Price truth — §3.2 is the only source | Every ₹ figure equals `00-MASTER-PLAN.md` §3.2 exactly (Bath & Brush ₹599/₹799/₹999 · Full Groom ₹1,199/₹1,499/₹1,899 · Premium Spa ₹1,799/₹2,199/₹2,799 · and so on); zero diff vs `/pricing/` and the booking widget. Competitor prices only as context with caveat: *mined from SERP snippets 2026-10; re-verify before publishing*. | [Launch-blocker] |
| P050 | Health claims cite authority | Every medical claim (tick fever, vaccine schedules, deworming intervals) links out to WSAVA, VCI, or a peer-reviewed/government source. | [Important] |
| P051 | Legal pages live & linked | `/privacy-policy/`, `/terms/` (Wave 1) and `/refund-policy/` (Wave 2) exist, match what we honour, and are footer-linked site-wide. | [Launch-blocker] |
| P052 | Original photography ≥ 50% | At least half the images on each money page are original (real PetDoorStep groomers, pets, Ludhiana homes), not stock — counted per page. | [Important] |
| P053 | Readability | Average sentence ≤ 20 words; paragraphs ≤ 4 lines on a 360 px screen; reading level Grade 7–9; prices/inclusions/areas in tables or bullets. | [Important] |
| P054 | Proofread, zero boilerplate | Zero spelling/grammar errors on money pages; zero generic filler ("In today's fast-paced world…"); every locality claim verified on a map. | [Important] |
| P055 | Testimonial authenticity | Every testimonial carries a real first name + locality + pet name/breed and exists as a verifiable review; fabricated reviews never ship — use `[FILL:REVIEW_1]`…`[FILL:REVIEW_5]` until the 5 seed reviews (00 §9.6) are collected. | [Launch-blocker] |

### G · Images & media (P056–P066)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P056 | Descriptive alt text | Every informative image has alt ≤ 125 chars describing content, locality/keyword only where truthful ("Golden Retriever being bathed at home in BRS Nagar, Ludhiana"); no "image of…" prefix. | [Launch-blocker] |
| P057 | Empty alt on decorative images | Dividers, backgrounds, icons carry `alt=""` (present and empty, never missing). | [Important] |
| P058 | Descriptive file names | Lowercase, hyphenated, 3–6 words: `shih-tzu-full-groom-ludhiana.webp`; zero `IMG_0023.jpg`-style names. | [Important] |
| P059 | Modern formats | Photos served as WebP or AVIF with fallback via Astro's `<Image>` component (automatic `<picture>` output). | [Important] |
| P060 | Explicit dimensions | Every `<img>` has `width` and `height` attributes so the browser reserves space (CLS protection). | [Launch-blocker] |
| P061 | Responsive srcset | Every content image ships ≥ 3 widths via `srcset`; the largest variant ≤ 2× its rendered display size. | [Important] |
| P062 | Image weight budget | Hero ≤ 150 KB · each content image ≤ 100 KB · total image payload per page ≤ 1 MB (check Network tab, disk cache off). | [Important] |
| P063 | Lazy-load below fold only | `loading="lazy"` on all below-fold images; the hero/LCP image is eager with `fetchpriority="high"` — lazy hero = automatic fail. | [Launch-blocker] |
| P064 | LCP image preloaded | `<link rel="preload" as="image">` for the hero on home/service/area/book templates. | [Important] |
| P065 | No text baked into images | Prices, phone numbers, and offers always exist as HTML text; a graphic may repeat but never replace them. | [Important] |
| P066 | Visual variety | Each area page uses a distinct hero image or crop; grooming service pages carry ≥ 3 before/after pairs named consistently (`beagle-grooming-before-ludhiana.webp`). | [Nice-to-have] |

### H · Internal links (P067–P076)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P067 | Crawl depth ≤ 3 | Every indexable page reachable in ≤ 3 clicks from home; money pages in ≤ 2 (they are in the header Services dropdown per `01-SITEMAP.md` §2.1). | [Launch-blocker] |
| P068 | Zero orphan pages | Every indexable page has ≥ 1 contextual (in-body, non-nav) internal inbound link — verified in a crawl report. | [Launch-blocker] |
| P069 | Descriptive anchor text | Zero "click here/read more/learn more" contextual anchors; anchors name the target ("dog grooming prices in Ludhiana"). | [Important] |
| P070 | Silo linking pattern implemented | The page implements `01-SITEMAP.md` §2 exactly: money page → `/pricing/` + `/book/` + 2–3 sibling services + 3 nearest area pages + 1–2 blog posts; area page → all 4+ core money pages + `/book/`; blog post → its calendar-named money page(s) with a BOFU anchor in the first half. | [Launch-blocker] |
| P071 | 3–10 in-body links per page | Contextual links (excluding header/footer/nav) count between 3 and 10. | [Important] |
| P072 | Blog→service conversion links | Every post links to ≥ 2 service pages within the first two mobile screens and carries one service CTA block. | [Important] |
| P073 | Breadcrumbs everywhere below home | Visible trail matching the URL (`Home › Ludhiana › Dog Grooming`), marked up with BreadcrumbList schema. | [Important] |
| P074 | Zero broken/redirecting internal links | Crawl shows zero internal 404s and zero internal links pointing at 301s — always link the final URL. | [Launch-blocker] |
| P075 | Outbound rel hygiene | External links carry `rel="noopener"`; any paid/affiliate link `rel="sponsored"`; editorial citations (P050) stay followed. | [Important] |
| P076 | Link volume & anchor diversity | Total links per page ≤ 150; footer links top 5 areas only (not all 10 from every page); the same exact-match anchor ≤ 60% of links to any one target. | [Nice-to-have] |

### I · Structured data / JSON-LD (P077–P087)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P077 | JSON-LD only | All structured data as JSON-LD blocks (in `<head>` or end of `<body>`); no microdata/RDFa mixing. Full schema specs live in `04-TECHNICAL-SEO.md`. | [Important] |
| P078 | LocalBusiness on home + contact | LocalBusiness block per the `04-TECHNICAL-SEO.md` spec with name "PetDoorStep", `telephone` `[FILL:PHONE]`, `url`, `image` (absolute URLs) — SAB form: service area declared, street address withheld, matching the GBP setting in `05-LOCAL-SEO.md`. | [Launch-blocker] |
| P079 | geo + areaServed | `geo` holds Ludhiana base coordinates; `areaServed` lists City "Ludhiana" plus the 10 §3.3 localities as `Place` names. | [Important] |
| P080 | Hours + priceRange | `openingHoursSpecification` = Mon–Sun 09:00–19:00; `priceRange` = "₹₹". | [Important] |
| P081 | sameAs profiles | `sameAs` array lists `[FILL:GBP_LINK]`, `[FILL:INSTAGRAM]`, and other live profiles — added only once each is live. | [Important] |
| P082 | Service schema per money page | `Service` with `serviceType`, `provider` → the business `@id`, `areaServed`, and `offers` (`priceCurrency: "INR"`, prices via `priceSpecification` equal to §3.2). | [Important] |
| P083 | Single @id entity graph | One canonical `"@id": "https://[FILL:DOMAIN]/#business"` reused by every page's schema so all pages reference one entity. | [Important] |
| P084 | BreadcrumbList schema | Present on every non-home page and identical to the visible breadcrumb (pairs with P073). | [Important] |
| P085 | FAQPage markup = machine-readability only | FAQ rich results no longer show in Search (restricted Aug 2023, removed per Google's 2026 docs). Optional concise FAQPage markup is allowed for machine readability; never promised as a SERP feature. | [Nice-to-have] |
| P086 | No self-serving review stars | Zero `aggregateRating`/`Review` markup for PetDoorStep on its own pages (blocked for LocalBusiness self-reviews since Sept 2019; spam risk). Testimonials render as plain content. | [Launch-blocker] |
| P087 | Validates clean & matches visible content | Every template passes Google Rich Results Test and validator.schema.org with zero errors, and every price/hour/FAQ in markup is visible on the page (mismatch = manual-action risk). | [Launch-blocker] |

### J · Local on-page signals (P088–P098)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P088 | NAP block in site-wide footer | Crawlable HTML text on every page: "PetDoorStep · Doorstep pet care across Ludhiana, Punjab 141001 · `[FILL:PHONE]`" — identical byte-for-byte site-wide (SAB: no street address published, per 00 §3.1). | [Launch-blocker] |
| P089 | NAP = GBP, character-for-character | Name, phone format, and service-area wording identical across site footer, schema, and Google Business Profile (checked side-by-side at launch and quarterly). | [Launch-blocker] |
| P090 | Clickable tel: + WhatsApp deep links | Phone wrapped as `tel:+91…`; WhatsApp as `https://wa.me/91XXXXXXXXXX?text=` with the pre-filled payload defined in `07-BOOKING-SPEC.md`. | [Launch-blocker] |
| P091 | City in title + H1 + first paragraph | Every local landing page names its geo target (Ludhiana, or area + Ludhiana) in all three positions. | [Launch-blocker] |
| P092 | Dedicated page per service × city | Each service ranks from its own locked URL (`/ludhiana/dog-grooming/` etc.); no multi-service mashup pages targeting several primaries. | [Launch-blocker] |
| P093 | Locality-unique blocks on area pages | Each area page names ≥ 3 real local landmarks/societies, one travel/arrival note, one area testimonial (`[FILL:REVIEW_*]` until real), and 2 area-specific FAQs (pairs with P041). | [Launch-blocker] |
| P094 | "Areas we serve" block | Service pages carry a block naming all 10 §3.3 localities: Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar — each linked once its page is live. | [Important] |
| P095 | Local proof elements | Ludhiana-specific review quotes, visit counts, recognisably local photos — numbers published only once true, `[FILL:VISIT_COUNT]` until then. | [Important] |
| P096 | Coverage statement | Explicit sentence near the booking CTA: "We serve all of Ludhiana — the 10 areas above get priority slots. Arrival window confirmed on WhatsApp." | [Nice-to-have] |
| P097 | Locale signals | `<html lang="en-IN">`, ₹ symbol (never "Rs." in copy), +91 phone format, IST hours. | [Important] |
| P098 | Map embed, facade-loaded | `/contact/` and area pages embed a Google Map of the service area as click-to-load facade (zero iframe cost at first paint, protects LCP). | [Important] |

### K · Page experience & Core Web Vitals (P099–P108)

*Field data at p75 is what counts; thresholds current as of 2026.*

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P099 | **LCP ≤ 2.5 s** | Largest Contentful Paint ≤ 2.5 s at p75 (needs-improvement 2.5–4.0 s; poor > 4.0 s). Lab via Lighthouse pre-launch; CrUX/GSC once traffic exists. | [Launch-blocker] |
| P100 | **INP ≤ 200 ms** | Interaction to Next Paint ≤ 200 ms at p75 (needs-improvement 200–500 ms; poor > 500 ms) — specifically test every step tap of the booking widget. | [Launch-blocker] |
| P101 | **CLS ≤ 0.1** | Cumulative Layout Shift ≤ 0.1 at p75 (needs-improvement 0.1–0.25) — space reserved for images (P060), fonts (P105), map facades (P098), sticky bar (P108). | [Launch-blocker] |
| P102 | TTFB ≤ 800 ms | Server/CDN response ≤ 800 ms at p75; static Astro on Cloudflare Pages should measure < 200 ms. | [Important] |
| P103 | Page weight & JS budget | First-load HTML+CSS+JS+images+fonts ≤ 1.5 MB on money pages; compressed JS ≤ 100 KB (Astro default = zero JS; islands only for the booking widget). | [Important] |
| P104 | No render-blocking resources | Critical CSS inlined or one small stylesheet; zero render-blocking third-party scripts in `<head>`; fonts load with `font-display: swap`. | [Important] |
| P105 | Font strategy | Self-hosted WOFF2 only, ≤ 2 families and ≤ 4 weights total (tokens in `08-DESIGN-SYSTEM.md`), primary font preloaded, metrics-adjusted fallback (`size-adjust`) to kill font CLS. | [Important] |
| P106 | Third-party script budget | ≤ 3 third-party scripts site-wide (GA4 + at most 2 more), all deferred; no chat widget costing > 100 ms main-thread. | [Important] |
| P107 | No intrusive interstitials | Zero full-screen popups on landing from search; any banner dismissible and ≤ 15% of viewport. | [Launch-blocker] |
| P108 | Lighthouse mobile ≥ 90 + stable sticky bar | Performance ≥ 90 (mobile) on home, service, area, and `/book/` templates (mirrors 00 §9.8); the sticky WhatsApp/call bar reserves its space at first paint (zero shift contribution). | [Important] |

### L · Mobile (P109–P116)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P109 | Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page. | [Launch-blocker] |
| P110 | Mobile–desktop parity | Identical content, links, and schema on mobile and desktop DOM (Google indexes mobile only). | [Launch-blocker] |
| P111 | Legible base typography | Body font ≥ 16 px with line-height ≥ 1.4; no text requires zoom. | [Important] |
| P112 | Tap targets | All buttons/links ≥ 48×48 CSS px with ≥ 8 px spacing between adjacent targets. | [Important] |
| P113 | No horizontal scroll at 360 px | Layout fully contained at 360 px width (Chrome device emulation); no element wider than the viewport. | [Launch-blocker] |
| P114 | CTA above the fold + sticky | Primary WhatsApp/booking CTA visible without scrolling on mobile and repeated in the sticky bottom bar on service/area pages. | [Important] |
| P115 | tel:/wa.me device-tested | Click-to-call and click-to-WhatsApp verified on one real Android and one real iPhone before each page goes live. | [Launch-blocker] |
| P116 | Mobile-optimised form inputs | `type="tel"` (numeric keypad) for phone, `type="email"` for email, `autocomplete` attributes set, no field needing precision typing (spec in `07-BOOKING-SPEC.md`). | [Important] |

### M · Social / OG meta (P117–P122)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P117 | Core OG tags unique per page | `og:title` (≤ 60 chars), `og:description` (100–200 chars), `og:type`, and `og:url` exactly equal to the rel=canonical URL — on every indexable page. | [Important] |
| P118 | og:image spec | One branded 1200×630 px (1.91:1) image per key page, ≤ 600 KB (the size WhatsApp previews render most reliably), absolute URL. | [Important] |
| P119 | og:image dimensions + alt declared | `og:image:width`, `og:image:height`, `og:image:alt` present (prevents blank first-share previews). | [Nice-to-have] |
| P120 | Twitter card | `twitter:card = summary_large_image` with clean OG fallback. | [Nice-to-have] |
| P121 | Locale + site name | `og:locale = en_IN`, `og:site_name = PetDoorStep`. | [Nice-to-have] |
| P122 | WhatsApp preview tested | Because booking flows through WhatsApp, every money page's link preview is tested by sending the URL in a real WhatsApp chat before go-live. | [Important] |

### N · Crawling / indexing / canonicals (P123–P134)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P123 | 200 + publicly reachable | Page returns HTTP 200 to Googlebot; GSC URL Inspection shows "URL is available to Google". | [Launch-blocker] |
| P124 | Self-referencing canonical | One `rel=canonical` per page: absolute URL in final form (https, lowercase, trailing slash) pointing at itself. | [Launch-blocker] |
| P125 | One canonical origin | www/non-www and http/https variants all 301 to the single chosen origin `https://[FILL:DOMAIN]/`. | [Launch-blocker] |
| P126 | Valid robots.txt | Allows all content paths, references the sitemap URL, blocks only true non-content; tested in GSC robots tester. | [Launch-blocker] |
| P127 | Clean XML sitemap | Auto-generated via `@astrojs/sitemap` at build; contains only indexable 200 canonical URLs (no `/thank-you/`, no 404s); real `<lastmod>`; submitted in GSC. | [Launch-blocker] |
| P128 | Meta robots correct per template | `/thank-you/` is `noindex,follow` (00 §5); every money/area/content page has **no** noindex; verified per template, not per assumption. | [Launch-blocker] |
| P129 | No stray indexable duplicates | Staging/preview deployments behind auth or `noindex`; no parameterised or print variants indexable. | [Launch-blocker] |
| P130 | Real 404 page | Invalid URLs return HTTP 404 (never soft-404/200) with a friendly page linking home + top services (per `01-SITEMAP.md`). | [Important] |
| P131 | Single-hop 301s | Zero redirect chains > 1 hop; zero 302s for permanent moves. | [Important] |
| P132 | Favicon + touch icons | Valid favicon (SVG + ICO, ≥ 48×48 — shows in mobile SERPs), `apple-touch-icon`, web manifest. | [Important] |
| P133 | All SEO copy in static HTML | Every heading, paragraph, FAQ answer, and price present in the HTML at load (Astro SSG default); accordion/tab content in the DOM, merely visually collapsed. | [Launch-blocker] |
| P134 | GSC + Bing verified at launch | Both properties verified; sitemap submitted; indexing manually requested for all Wave-1 money pages on day one. | [Launch-blocker] |

### O · Accessibility affecting SEO (P135–P142)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P135 | Semantic landmarks | Exactly one `<main>`; `<header>`, `<footer>`, `<nav aria-label="Main">` present; sections are semantic elements, not div-soup. | [Important] |
| P136 | Colour contrast | ≥ 4.5:1 for body text, ≥ 3:1 for large text — including text over hero images and on buttons (tokens in `08-DESIGN-SYSTEM.md` are pre-checked). | [Important] |
| P137 | Keyboard-operable booking flow | Entire multi-step form completable by keyboard only; visible focus states; logical tab order. | [Important] |
| P138 | Programmatic form labels | Every input has `<label for>` (placeholder-only = fail); errors announced via `aria-live`. | [Important] |
| P139 | lang attributes | `<html lang="en-IN">`; any full Punjabi/Hindi sentence wrapped in its own `lang` attribute. | [Important] |
| P140 | Accessible accordions | FAQ accordions use `<button aria-expanded>` with answer content in the DOM (crawlable + announced — pairs with P133). | [Important] |
| P141 | Zoom never disabled | Viewport meta contains no `maximum-scale` or `user-scalable=no`. | [Important] |
| P142 | Motion & media courtesy | Skip-to-content link is first focusable element; animations respect `prefers-reduced-motion`; zero autoplaying media with sound. | [Nice-to-have] |

### P · Freshness & maintenance (P143–P149)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P143 | Visible "Last updated" date | True dateModified shown on money + vet pages and mirrored in schema; changed only on material content updates. | [Important] |
| P144 | Quarterly fact refresh | Every 90 days: verify prices, areas, hours against `00-MASTER-PLAN.md` §3 and log the check in the 00 §11 Decision Log. | [Important] |
| P145 | Blog cadence held | Publishing matches `10-CONTENT-CALENDAR.md` (2 posts in Wave 2, then 1/week in Wave 3); every post keyword-mapped in `03-KEYWORD-MAP.md` before writing. | [Important] |
| P146 | Monthly link-health crawl | Monthly crawl shows zero broken internal links sustained; dead external links fixed or removed. | [Important] |
| P147 | GSC triage ritual | Coverage, enhancement, and CWV reports reviewed weekly for the first 90 days, then monthly (ritual defined in `09-ANALYTICS-TRACKING.md`). | [Important] |
| P148 | Seasonal refreshes | Tick/flea pages refreshed each May (pre-monsoon); winter-coat grooming content each October–November; Diwali noise-anxiety post annually. | [Nice-to-have] |
| P149 | Re-validate after template changes | Any layout/template deploy re-runs Rich Results Test on affected templates; pages with 6-month GSC click decline get a documented refresh. | [Important] |

### Q · Conversion-adjacent elements (P150–P162)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P150 | Above-the-fold completeness | First mobile viewport of every money page contains all five: benefit H1, subheadline, primary CTA, one §3.4 trust badge, hero image — zero scrolling needed. | [Launch-blocker] |
| P151 | Single primary CTA | One dominant action per page ("Book on WhatsApp"); call and view-prices are visually subordinate (smaller/outline style per `08-DESIGN-SYSTEM.md`). | [Important] |
| P152 | Benefit-led CTA copy | Button text states the gain per `06-CONVERSION-PLAYBOOK.md`: "Get My Pet's Slot" / "See Fixed Prices" — never "Submit". | [Important] |
| P153 | CTA rhythm | CTA block appears after hero, after the price table, after testimonials, and at page end (≈ every 1.5–2 mobile screens). | [Important] |
| P154 | Sticky mobile action bar | Persistent bottom bar with WhatsApp + Call on all service/area pages (space reserved — pairs with P108). | [Important] |
| P155 | Trust strip at first CTA | 3–4 §3.4 proof points adjacent to the hero CTA: "Background-verified groomers · Fresh sanitised kit · Fixed prices · Photo update after every visit". | [Important] |
| P156 | Transparent HTML price table | Prices by size (Small < 10 kg · Medium 10–25 kg · Large > 25 kg) as a real HTML table from §3.2, with a "Fixed prices — no doorstep bargaining" note. | [Important] |
| P157 | Multi-step form best practices | Per `07-BOOKING-SPEC.md`: step 1 asks the easiest question (pet type), progress indicator visible, ≤ 3 fields per step, phone captured by step 2, summary screen before WhatsApp handoff. | [Important] |
| P158 | Pre-filled WhatsApp context | Every `wa.me` link passes service + area + source page in the prefilled message (payload format in `07-BOOKING-SPEC.md`) so chats open qualified. | [Important] |
| P159 | Social proof module | ≥ 3 testimonials with name + locality + pet breed per money page (plain content, stars as visuals only — see P086); links to GBP reviews via `[FILL:GBP_LINK]`. | [Important] |
| P160 | Objection-handling FAQ | 5–8 FAQs above the footer on every money page covering: price, safety, kit hygiene, time taken, anxious/aggressive pets, payment methods (UPI/cash/card). | [Important] |
| P161 | Conversion events wired | WhatsApp clicks, `tel:` clicks, each form step, and form completion all fire GA4 events from day one, per `09-ANALYTICS-TRACKING.md` — measurability is a build requirement. | [Launch-blocker] |
| P162 | Risk reversal + response promise | Re-do-if-unhappy promise, vaccinated-staff note, and an explicit reply SLA near the CTA ("We confirm your slot within 15 minutes, 9am–7pm") — published only once operationally true. | [Nice-to-have] |

### R · AI search / answer-engine extraction (P163–P168)

| # | Parameter | Pass criterion (measurable) | Severity |
|---|---|---|---|
| P163 | Answer-first section openers | Every H2 section opens with a direct 40–80-word answer ("A full groom at home in Ludhiana costs ₹1,199–₹1,899 depending on your dog's size…"), details after. | [Important] |
| P164 | Key facts in the first 30% | Prices, areas, and USPs appear in the top 30% of the page by word count (most LLM citations point there). | [Important] |
| P165 | Extractable data structures | Prices, service inclusions, and area lists rendered as HTML tables/ULs — the formats snippets and AI answers lift. | [Important] |
| P166 | Entity-name consistency | "PetDoorStep" spelled identically (one word, three capitals) across site, schema, GBP, and socials — zero variants like "Pet DoorStep" / "petdoorstep" in prose. | [Important] |
| P167 | PAA-shaped Q&A on page | People-Also-Ask questions harvested for each primary keyword; the top 3–5 answered with verbatim question phrasing in H2/H3 + FAQ (pairs with P030). | [Important] |
| P168 | Citable extras | Publish `/llms.txt` summarising business, services, areas, §3.2 prices; later one original data asset (e.g. "Ludhiana Pet Care Price Index" from own booking data). | [Nice-to-have] |

---

## 3 · Final count

**Total: 168 unique parameters (P001–P168) across 18 categories — 60 [Launch-blocker] · 96 [Important] · 12 [Nice-to-have].** A page is shippable only when all applicable Launch-blockers pass (00 §6 definition of "done").

---

## 4 · Quick-20 — fast re-audit subset

Run monthly on live pages and after any content edit (full checklist only on first audit and template changes):

| Order | Param | One-line check |
|---|---|---|
| 1 | P001 | URL matches `01-SITEMAP.md` exactly |
| 2 | P011 | Title 50–60 chars |
| 3 | P018 | Meta description present, unique, 120–158 chars |
| 4 | P026 | Single H1 with primary keyword up front |
| 5 | P033 | Primary keyword still matches `03-KEYWORD-MAP.md`, no cannibal page |
| 6 | P041 | Area-page copy ≥ 60% unique |
| 7 | P049 | Every ₹ figure equals 00 §3.2 — site-wide identical |
| 8 | P056 | Alt text present and truthful on informative images |
| 9 | P060 | width/height on every img |
| 10 | P063 | Hero eager + fetchpriority; below-fold lazy |
| 11 | P068 | No orphan pages |
| 12 | P074 | Zero broken/redirecting internal links |
| 13 | P087 | Schema validates clean, matches visible content |
| 14 | P089 | Footer NAP = GBP character-for-character |
| 15 | P091 | City in title + H1 + first paragraph |
| 16 | P099 | LCP ≤ 2.5 s |
| 17 | P101 | CLS ≤ 0.1 |
| 18 | P124 | Self-referencing canonical in final URL form |
| 19 | P150 | Above-fold five elements present on mobile |
| 20 | P161 | GA4 conversion events firing |

---

## 5 · Per-page audit table — copy-paste template

Copy the block below into the audit log (one block per page per audit). Example values shown in the first data row — replace them.

```markdown
### Audit — /ludhiana/dog-grooming/ — 2026-10-15

| Field | Value |
|---|---|
| Page URL | /ludhiana/dog-grooming/ |
| Sitemap status before → after | built → audited |
| Audit date | 2026-10-15 |
| Auditor | Sunny |
| Audit type | Full (168) / Quick-20 |
| Launch-blockers | 58/60 applicable PASS — **FAIL** |
| Important | 84/96 applicable pass (≥90% target) |
| Nice-to-have | 7/12 applicable pass |
| Lab CWV (Lighthouse mobile) | LCP 2.1 s · INP n/a (lab: TBT 40 ms) · CLS 0.04 |
| Title / meta in use | "Dog Grooming at Home in Ludhiana – From ₹599 | PetDoorStep" / 149-char description |
| Verdict | FAIL — cannot go live until all blockers pass |

| Failing param | Severity | What failed (measured) | Action | Owner | Due |
|---|---|---|---|---|---|
| P063 | Launch-blocker | Hero image has loading="lazy" | Set eager + fetchpriority="high", re-run Lighthouse | Dev | 2026-10-16 |
| P055 | Launch-blocker | Testimonials still [FILL:REVIEW_1..3] | Collect 3 seed reviews per 05-LOCAL-SEO.md | Sunny | 2026-10-20 |
| P064 | Important | No preload for hero | Add <link rel="preload" as="image"> to service template | Dev | 2026-10-18 |

Re-audit due: 2026-10-21
```

---

## 6 · Verification tooling (all free)

| Tool (free) | Where | Verifies parameters |
|---|---|---|
| **Lighthouse** (Chrome DevTools → Lighthouse tab, Mobile + Performance/SEO/Accessibility/Best-practices) | Built into Chrome | P099–P108 (lab), P109–P113, P132, P135–P141, score gate in P108 |
| **PageSpeed Insights** (pagespeed.web.dev) | Browser | Same as Lighthouse + real CrUX field data for P099–P102 once traffic exists |
| **GSC URL Inspection** (search.google.com/search-console) | Browser | P123–P129, P133 (rendered HTML view), P134; Coverage + CWV reports for P147 |
| **Google Rich Results Test** (search.google.com/test/rich-results) + **validator.schema.org** | Browser | P077–P087, re-validation in P149 |
| **Screaming Frog SEO Spider — free tier (≤ 500 URLs; site is ~55)** | Desktop app | P003–P009 duplicates, P010/P013 title audit, P018 meta, P025–P027 H1s, P067–P076 depth/orphans/broken links, P124 canonicals, P131 redirect chains |
| **Chrome device emulation** (DevTools → Toggle device toolbar, 360×800) | Built into Chrome | P113, P111–P114, P150 above-fold check |
| **DevTools Network tab** (cache disabled) + **Coverage tab** | Built into Chrome | P062, P103–P106 weight/JS budgets, P002 mixed content |
| **WAVE extension** (wave.webaim.org) | Browser extension | P056–P057 alts, P135–P141 contrast/labels/landmarks |
| **Hemingway Editor** (hemingwayapp.com, free web version) | Browser | P053 grade level & sentence length |
| **Real WhatsApp chat to self** | Phone | P090, P115, P122 preview, P158 prefill payload |
| **Manual view-source + Ctrl+F** | Browser | P011/P019 char counts (count in any editor), P016, P024, P034, P088 NAP identity, P128 noindex, P133 content-in-HTML |
| **`grep -r "FILL:" website/`** | Terminal | 00 §8 launch gate — must return zero before any page goes live |
| **Google Maps (free)** | Browser | P054/P093 locality-claim verification (landmarks, societies exist) |

Manual char-count rule: paste title/meta into any editor's character counter — never eyeball. Field CWV (P099–P101) only becomes authoritative once CrUX has 28 days of data; until then the Lighthouse lab numbers + P108's ≥ 90 score are the proxy gate.

**Cross-references:** URLs → `01-SITEMAP.md` · keywords → `03-KEYWORD-MAP.md` · schema specs & CWV budgets → `04-TECHNICAL-SEO.md` · GBP/NAP/reviews → `05-LOCAL-SEO.md` · CTA/copy rules → `06-CONVERSION-PLAYBOOK.md` · booking payloads → `07-BOOKING-SPEC.md` · tokens/components → `08-DESIGN-SYSTEM.md` · events/rituals → `09-ANALYTICS-TRACKING.md` · blog cadence → `10-CONTENT-CALENDAR.md`.
