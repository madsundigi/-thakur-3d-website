# Master On-Page SEO Parameter List (2025–2026)

**Project:** PetDoorStep — doorstep pet-care services, Ludhiana (Punjab, India) — Astro static site
**Compiled:** 2026-10-02 | **Total parameters: 182** (numbered sequentially across 18 categories)
**Verified current thresholds:** Title ≈50–60 chars (580–600 px) · Meta description ≈120–158 chars · LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1 (all three unchanged and still official as of 2026; INP replaced FID on 2024-03-12)

**Severity legend:**
- **[Launch-blocker]** — do not publish a page that fails this.
- **[Important]** — fix within the first 2 weeks post-launch; measurable ranking/conversion impact.
- **[Nice-to-have]** — incremental gain; batch into monthly maintenance.

**How to use:** every page in the Phase-1 sitemap gets scored against this list before publish. A page passes QA when 100% of Launch-blockers and ≥90% of Important items pass. Each parameter is written as: *short name — measurable pass criterion — severity*.

---

## Category 1 — URL & Slugs

1. **HTTPS-only URL** — page served over HTTPS with valid cert; HTTP 301s to HTTPS; zero mixed-content warnings in DevTools — [Launch-blocker]
2. **Lowercase slug** — URL contains zero uppercase characters (uppercase variants 301 to lowercase) — [Launch-blocker]
3. **Hyphen word separators** — words separated by `-` only; no underscores, spaces, `%20`, or camelCase — [Launch-blocker]
4. **Slug length ≤ 5 words / full URL ≤ ~75 chars** — slug is 3–5 descriptive words; total URL ideally 50–60 chars, hard ceiling 75 (e.g. `/dog-grooming-ludhiana/`) — [Important]
5. **Primary keyword in slug** — exact or close variant of the page's primary keyword appears once in the slug (e.g. `pet-grooming-at-home-ludhiana`) — [Launch-blocker]
6. **Locality token in slug for local pages** — every city/locality landing page slug ends with the geo term (`-ludhiana`, `-sarabha-nagar-ludhiana`) — [Launch-blocker]
7. **No stop words / filler in slug** — remove a, the, of, and, for unless needed for meaning (`/dog-walking-ludhiana` not `/the-best-dog-walking-services-in-the-city-of-ludhiana`) — [Important]
8. **No dynamic parameters on indexable pages** — canonical indexable URLs contain no `?id=`, `?ref=`, session IDs; tracking params (`utm_*`) never internally linked — [Important]
9. **Logical folder hierarchy ≤ 3 levels** — URL depth max 3 directories (`/services/dog-grooming-ludhiana/`), mirrors site architecture, no orphan folder names — [Important]
10. **Stable, dateless, future-proof slugs** — no years/dates/prices in service-page slugs (blog posts may use none either); slug never needs to change when content updates — [Important]
11. **Consistent trailing-slash policy** — pick one form (with or without trailing slash); the other 301s to it site-wide (Astro default: trailing slash — configure `trailingSlash` explicitly) — [Important]
12. **No keyword repetition in URL path** — same keyword never appears twice in one URL (`/grooming/dog-grooming-ludhiana/` is fine; `/ludhiana/dog-grooming-ludhiana/` is not) — [Nice-to-have]

---

## Category 2 — Title Tags

13. **Title tag present and unique site-wide** — every indexable page has exactly one `<title>`; zero duplicates across the site (crawl check with Screaming Frog/Sitebulb) — [Launch-blocker]
14. **Title length 50–60 characters** — 51–60 chars has the lowest Google-rewrite rate; max 580–600 px render width; never over 65 chars — [Launch-blocker]
15. **Primary keyword in first 5 words of title** — the money keyword starts the title or appears within the first ~30 chars (`Dog Grooming at Home in Ludhiana | PetDoorStep`) — [Launch-blocker]
16. **Locality in title for local pages** — "Ludhiana" (or the locality) appears in the title of every service/area page — [Launch-blocker]
17. **Brand suffix pattern** — `| PetDoorStep` appended consistently (brand last, keyword first); homepage may lead with brand — [Important]
18. **Title matches H1 intent (not necessarily verbatim)** — title and H1 target the same query; wide divergence triggers Google rewrites (76% of titles get rewritten when misaligned) — [Important]
19. **No keyword stuffing / no repeated separator segments** — max 2 segments, one separator type (prefer `|` or `-`, used once); no comma-stuffed keyword lists — [Launch-blocker]
20. **Click-trigger element in title** — one concrete differentiator or number where natural: price-from, "At Home", "Same-Day", "Verified Groomers" (e.g. `Dog Grooming at Home, Ludhiana – From ₹599`) — [Important]
21. **No ALL-CAPS, emoji, or clickbait symbols in title** — title case or sentence case only; emojis/★/✓ get stripped or trigger rewrites — [Important]
22. **Title written for the dominant intent** — transactional pages use service+city+modifier ("at home", "near me" synonyms, price); informational pages use question/how-to phrasing — [Important]

---

## Category 3 — Meta Description

23. **Meta description present and unique per page** — one `<meta name="description">` per indexable page; zero duplicates site-wide — [Launch-blocker]
24. **Length 120–158 characters** — fully visible on desktop ≤158 chars and front-loaded so first 120 chars (mobile cutoff ~130) carry the complete value proposition — [Important]
25. **Primary keyword within first 100 characters** — keyword (and city for local pages) appears early; Google bolds query matches, raising CTR — [Important]
26. **Active-voice CTA in description** — contains one action phrase ("Book a slot on WhatsApp", "See fixed prices") and one differentiator (background-verified, sanitised kit) — [Important]
27. **Description matches page content (no bait)** — every claim in the description is verifiable on the page (prices, services, areas) — else Google rewrites it — [Important]
28. **Number/price/proof element included** — at least one concrete figure where truthful: "From ₹599", "500+ pets groomed", "7 days a week" (specifics lift CTR up to ~12%) — [Nice-to-have]
29. **No double quotes or HTML in description** — straight double quotes truncate the snippet; use single quotes or none; no markup characters — [Important]
30. **Locality + "at home/doorstep" phrasing on local pages** — description names the city/locality and the doorstep modality, mirroring high-intent queries — [Important]

---

## Category 4 — Headings (H1–H6)

31. **Exactly one H1 per page** — a single `<h1>` in the rendered DOM; not duplicated by a logo or hero element styled as h1 — [Launch-blocker]
32. **H1 contains primary keyword near the start** — keyword within the first 5 words; H1 length 20–70 chars — [Launch-blocker]
33. **H1 unique site-wide and distinct from other pages** — no two pages share an H1 (prevents cannibalisation between locality pages) — [Launch-blocker]
34. **H1 appears before any H2 in DOM order** — no heading precedes the H1 — [Important]
35. **No skipped heading levels** — hierarchy never jumps (H2→H4); H3 only inside an H2 section, etc. — [Important]
36. **H2s as query-shaped section labels** — each H2 is a scannable sub-topic or question containing a secondary keyword/entity ("Dog Grooming Price List in Ludhiana", "How Home Grooming Works") — [Important]
37. **Headings are real text, not images/SVG** — all H1–H3 content is selectable HTML text — [Launch-blocker]
38. **No heading tags used for styling** — prices, buttons, card labels are not wrapped in h-tags; headings only mark document structure — [Important]
39. **Heading density proportional to content** — roughly one H2 per 150–300 words; a 1,500-word page has 5–8 H2s; no stacked consecutive headings with no body text between — [Nice-to-have]
40. **Question-form H2/H3s for PAA & AI targeting** — at least 2–3 headings per money page phrased as the actual questions users ask ("How much does dog grooming cost in Ludhiana?") — [Important]

---

## Category 5 — Keyword Placement & Semantic Coverage

41. **One primary keyword per page (keyword map enforced)** — every page has a documented primary keyword; no two pages target the same primary (cannibalisation check in the keyword-map file) — [Launch-blocker]
42. **Primary keyword in first 100 words** — exact or close variant appears in the opening paragraph — [Important]
43. **Primary keyword in ≥1 H2 and in the last section** — reinforced mid-body and near the close, naturally — [Nice-to-have]
44. **Keyword density kept natural (≈0.5–1.5%)** — no mechanical repetition; reads naturally aloud; TF check only to catch stuffing, not to hit a quota — [Important]
45. **Secondary keywords mapped to sections** — 3–8 secondary/long-tail variants each assigned to a specific H2/H3 section in the content brief — [Important]
46. **Semantic entity coverage** — page mentions the entities Google associates with the topic: breeds (Shih Tzu, Labrador, Persian cat), tools (trimmer, de-shedding), conditions (ticks, matting), locality names — checked against top-3 SERP competitors — [Important]
47. **Hinglish/vernacular variant coverage** — Hinglish query forms users actually type ("dog grooming ghar pe", "pet groomer near me Ludhiana", "dog ko nehlana") appear naturally in body/FAQ text, not stuffed — [Important]
48. **"Near me" intent handled via geo-context, not literal stuffing** — serve near-me queries with locality names, service-area lists, map and LocalBusiness schema; never write "near me" more than once in copy — [Important]
49. **Synonym/variant usage in subheads and alt text** — groom/grooming/bathing/spa variants distributed across subheads, captions, alt text — [Nice-to-have]
50. **Search-intent match verified against live SERP** — before writing, confirm what Google ranks for the primary keyword (local pack? listicles? service pages?) and match that format — [Launch-blocker]
51. **No doorway-page duplication across locality pages** — each locality page has ≥60% unique body copy (unique intro, locality landmarks, testimonials, FAQs); template boilerplate <40% — [Launch-blocker]
52. **Anchor-context keywords** — the sentence surrounding each internal link mentions the target page's topic (Google reads link context, not just anchor) — [Nice-to-have]

---

## Category 6 — Content Quality & E-E-A-T

53. **People-first content test passes** — page answers the visitor's job-to-be-done (price, process, trust, booking) without requiring a call; would stand alone if Google didn't exist (Google Helpful Content self-assessment) — [Launch-blocker]
54. **Unique value vs top-3 competitors** — page contains ≥3 elements the ranking competitors lack (e.g. real price table, locality-specific detail, process photos, groomer profiles) — [Important]
55. **Minimum content depth per template** — service pages ≥800 words, locality pages ≥600, pillar guides ≥1,500, blog posts ≥1,000; never padded — depth must come from answering more questions — [Important]
56. **First-hand experience markers** — first-person process descriptions, real photos of PetDoorStep groomers/kits/vans, actual case notes ("We groomed 40+ Shih Tzus in Sarabha Nagar last quarter") — [Important]
57. **Named author/reviewer with credentials for YMYL-adjacent content** — vet-related pages (vaccination, deworming, tick-borne disease) show a named veterinarian as author or medical reviewer with RCVS/VCI registration number — [Launch-blocker]
58. **Author bio block + author page** — byline links to an author page listing qualifications, photo, experience, and social/professional profiles; marked up with Person schema — [Important]
59. **About page with real team, story, and verifiable details** — named founders, groomer verification process, registered business name; linked from every page footer — [Launch-blocker]
60. **Contact page with ≥3 contact methods** — phone (tel: link), WhatsApp, email, physical/registered address, service hours — [Launch-blocker]
61. **Transparent pricing on-page** — actual price tables (₹ ranges by breed size/coat), not "contact for quote"; matches the Rs.500–3,500 benchmarks; updated date shown — [Important]
62. **Citations to authoritative sources** — health claims (tick fever, vaccination schedules) cite WSAVA, AVMA, Indian veterinary bodies, or peer-reviewed sources via outbound links — [Important]
63. **Policies published** — privacy policy, terms of service, cancellation/refund policy pages exist and are footer-linked — [Launch-blocker]
64. **Original photography ratio** — ≥50% of images on money pages are original (real groomers, real pets, real Ludhiana locations), not stock — [Important]
65. **Readability for a broad audience** — short sentences (avg ≤20 words), short paragraphs (≤3–4 lines mobile), Grade 7–9 reading level, bullets/tables for scannable data — [Important]
66. **Zero spelling/grammar errors on money pages** — proofread pass; sloppy text is a quality-rater trust negative — [Important]
67. **No AI-boilerplate tells** — no generic filler ("In today's fast-paced world…"), no hallucinated facts; every locality claim verified on a map — [Important]
68. **Review/testimonial authenticity** — testimonials carry real first names + locality + pet name/breed; never fabricated; ideally screenshot-linked to Google reviews — [Important]

---

## Category 7 — Images & Media

69. **Descriptive alt text on all informative images** — alt describes image content in ≤125 chars, includes keyword/locality only where truthful ("Golden Retriever being bathed at home in BRS Nagar, Ludhiana"); no "image of…" prefix — [Launch-blocker]
70. **Empty alt on decorative images** — `alt=""` (not missing) on dividers, backgrounds, icons — [Important]
71. **Descriptive hyphenated file names** — `dog-grooming-at-home-ludhiana.webp`, lowercase, 3–6 words; no `IMG_0023.jpg` — [Important]
72. **Modern format (WebP/AVIF) with fallback** — photos served as WebP (≈30% smaller than JPEG) or AVIF via `<picture>`; Astro `<Image>` component handles this — [Important]
73. **Explicit width & height attributes on every img** — intrinsic dimensions set so the browser reserves space (prevents CLS) — [Launch-blocker]
74. **Responsive srcset/sizes** — every content image ships ≥3 widths via `srcset`; largest variant ≤ 2× display size — [Important]
75. **Image weight budget** — hero ≤ 150 KB, content images ≤ 100 KB, total image payload per page ≤ 1 MB — [Important]
76. **Lazy-load below-the-fold only** — `loading="lazy"` on below-fold images; **never** on the LCP/hero image (hero gets `fetchpriority="high"` + eager) — [Launch-blocker]
77. **LCP image preloaded** — `<link rel="preload" as="image">` (or priority hint) for the hero on key templates — [Important]
78. **Captions where they add context** — figure captions with locality/service context on process and before-after photos (captions are heavily read and indexed) — [Nice-to-have]
79. **ImageObject/photo schema on key images** — logo and primary business images referenced in LocalBusiness schema `image` property as absolute URLs — [Important]
80. **Before/after photo pairs on grooming pages** — ≥3 pairs per grooming service page; named consistently (`shih-tzu-grooming-before-ludhiana.webp`) — [Nice-to-have]
81. **Video embedded with facade pattern** — any YouTube embed uses a click-to-load facade (no third-party iframe cost at load); VideoObject schema if the video is primary content — [Nice-to-have]
82. **No text baked into images** — prices, phone numbers, offers always in HTML text, never only inside a graphic — [Important]
83. **Unique images across locality pages** — locality pages do not all reuse the identical hero; at minimum alternate crops/photos per locality — [Nice-to-have]

---

## Category 8 — Internal Linking

84. **Every page ≤ 3 clicks from homepage** — crawl depth of all indexable pages ≤3 (money pages ≤2) — [Launch-blocker]
85. **Zero orphan pages** — every indexable page has ≥1 contextual (non-nav) internal inbound link — [Launch-blocker]
86. **Descriptive anchor text** — no "click here/read more/learn more" anchors on contextual links; anchors name the target topic ("dog grooming prices in Ludhiana") — [Important]
87. **Anchor diversity per target** — same exact-match anchor used for ≤60% of links to any one page; mix exact, partial, and natural phrasing — [Nice-to-have]
88. **Hub-and-spoke silo linking** — service pillar page links to all its locality/child pages; every child links back to the pillar and to 2–3 siblings — [Important]
89. **Money pages receive the most internal links** — top booking pages (grooming, vet-at-home) have the highest count of inbound internal links on the site (verify in crawl report) — [Important]
90. **Contextual in-body links, not just nav/footer** — each page has 3–10 in-content links; body links carry more weight than template links — [Important]
91. **Blog→service conversion links** — every informational post links to ≥2 relevant service pages within the first two screens, with a service CTA block — [Important]
92. **Breadcrumbs on all non-home pages** — visible breadcrumb trail matching URL hierarchy, marked up with BreadcrumbList schema — [Important]
93. **No broken internal links or internal redirects** — crawl shows zero 404s and zero internal links pointing at 301s (link the final URL) — [Launch-blocker]
94. **Outbound link hygiene** — external links open with `rel="noopener"`; sponsored/affiliate links use `rel="sponsored"`; UGC uses `rel="ugc"`; editorial citations stay followed — [Important]
95. **Reasonable link volume per page** — total links per page ≤ ~150; contextual outbound 2–5; avoid mega-footers linking every locality from every page (link top 8–10 only) — [Nice-to-have]
96. **Related-services block** — every service page ends with a 3-card "Also available at your doorstep" cross-sell linking sibling services — [Nice-to-have]

---

## Category 9 — Structured Data / Schema (JSON-LD)

97. **JSON-LD format only** — all structured data as JSON-LD in `<head>` or end of `<body>`; no microdata mixing; Google's preferred format — [Important]
98. **LocalBusiness subtype on homepage + contact** — `@type` uses the most specific applicable subtype (e.g. `PetGrooming`/`PetStore` subtype where valid, else `LocalBusiness`) with name, address, telephone, image, url — all four required props present — [Launch-blocker]
99. **geo coordinates + areaServed** — `geo` (lat/long for Ludhiana base) and `areaServed` listing City "Ludhiana" plus target localities as `Place`/`AdministrativeArea` names — [Important]
100. **openingHoursSpecification + priceRange** — real service hours and `priceRange` ("₹₹") in LocalBusiness schema — [Important]
101. **sameAs profile links** — schema `sameAs` array lists Google Business Profile, Instagram, Facebook, Justdial/Sulekha listings once live — [Important]
102. **Service schema per service page** — `Service` type with `serviceType`, `provider` (→ LocalBusiness `@id`), `areaServed`, and `offers` (price/priceCurrency INR, price ranges via `priceSpecification`) — [Important]
103. **Entity linking via @id graph** — one canonical `@id` for the Organization/LocalBusiness reused across all pages' schema (`"@id": "https://domain/#business"`) so all pages reference one entity — [Important]
104. **BreadcrumbList schema** — on every non-home page, matching the visible breadcrumb — [Important]
105. **FAQPage markup used for AI/entity clarity, not rich results** — FAQ rich results no longer show (restricted to gov/health in Aug 2023; fully removed from Search per Google's 2026 doc update) — keep concise on-page Q&A + optional FAQPage markup for machine readability; never expect stars/accordions in SERP — [Nice-to-have]
106. **No self-serving review stars** — do NOT mark up aggregateRating/Review for PetDoorStep on PetDoorStep's own site expecting rich results (blocked for LocalBusiness self-reviews since Sept 2019); show testimonials as plain content instead — [Important]
107. **Article/BlogPosting schema on posts** — headline, image, author (Person with url), datePublished, dateModified on every blog post — [Important]
108. **WebSite schema on homepage** — `WebSite` with name (enables sitename in SERP); add `potentialAction` SearchAction only if on-site search exists — [Nice-to-have]
109. **Zero errors in Rich Results Test / Schema validator** — every template validates clean in Google Rich Results Test and validator.schema.org before launch — [Launch-blocker]
110. **Schema matches visible content** — every price, hour, rating, FAQ in markup is visible on the page (mismatch = spammy structured data manual-action risk) — [Launch-blocker]

---

## Category 10 — Local On-Page Signals

111. **NAP in site-wide footer** — business name, full address (with PIN code), phone identical on every page, in crawlable HTML text — [Launch-blocker]
112. **NAP exactly matches Google Business Profile** — character-for-character consistency (same spelling, abbreviations, phone format) between site, GBP, and schema — [Launch-blocker]
113. **Clickable tel: and WhatsApp links** — phone wrapped in `tel:+91…`; WhatsApp deep link `https://wa.me/91XXXXXXXXXX?text=` with pre-filled service context — [Launch-blocker]
114. **Embedded Google Map on contact + locality pages** — lazy-loaded embed (facade/click-to-load to protect LCP) of the GBP listing or service-area center — [Important]
115. **City + locality in title, H1, first paragraph** — every local landing page names its geo target in all three positions — [Launch-blocker]
116. **Dedicated page per primary service × city** — each Phase-1 service has its own Ludhiana page (pages rank, businesses don't); later each priority locality gets a page — [Launch-blocker]
117. **Locality-unique content blocks** — each area page includes landmarks, society/colony names, travel-time notes, area-specific testimonials and FAQs (anti-doorway requirement; ≥60% unique) — [Launch-blocker]
118. **Service-area list block** — "Areas we serve" section naming Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar — linked to their pages when they exist — [Important]
119. **Local proof elements** — Ludhiana-specific reviews, counts ("1,200+ home visits in Ludhiana"), photos recognisably local — [Important]
120. **Driving/visit context for a service-area business** — since service is at the customer's home, state coverage radius and arrival windows explicitly ("We reach anywhere in Ludhiana within 45 min") — [Nice-to-have]
121. **Local business citations linked** — footer or contact page links out to GBP ("Find us on Google") and other live profiles; consistent with `sameAs` — [Nice-to-have]
122. **Vernacular/locale signals** — `lang="en-IN"` on `<html>`, INR symbols, Indian phone formats, IST hours — [Important]

---

## Category 11 — Page Experience & Core Web Vitals

*(Field data at the 75th percentile is what counts; thresholds verified current for 2026.)*

123. **LCP ≤ 2.5 s** — Largest Contentful Paint at p75 (needs-improvement 2.5–4.0 s; poor >4.0 s); test lab + CrUX once traffic exists — [Launch-blocker]
124. **INP ≤ 200 ms** — Interaction to Next Paint at p75 (needs-improvement 200–500 ms; poor >500 ms); watch the multi-step booking form interactions — [Launch-blocker]
125. **CLS ≤ 0.1** — Cumulative Layout Shift at p75 (needs-improvement 0.1–0.25); reserve space for images, embeds, fonts, sticky CTA — [Launch-blocker]
126. **TTFB ≤ 800 ms** — server/CDN response at p75 (static Astro on a CDN should hit <200 ms) — [Important]
127. **Total page weight budget** — HTML+CSS+JS+images+fonts ≤ 1.5 MB on money pages at first load; JS bundle ≤ 100 KB compressed (Astro islands: ship zero JS where possible) — [Important]
128. **Render-blocking resources minimised** — critical CSS inlined or small single stylesheet; no render-blocking third-party scripts in `<head>`; fonts loaded with `font-display: swap` — [Important]
129. **Font strategy** — self-hosted WOFF2, ≤2 families / ≤4 weights total, preloaded primary font, metrics-adjusted fallback to prevent CLS — [Important]
130. **Third-party script budget** — ≤3 third-party scripts site-wide (analytics + 1–2 max); each loaded deferred/partytown; no chat widget that costs >100 ms main-thread — [Important]
131. **Compression & caching** — Brotli/gzip on all text assets; static assets served with long-lived immutable cache headers via CDN — [Important]
132. **No intrusive interstitials** — no full-screen popups on landing from search (exception: legally required notices); use dismissible banners ≤15% viewport — [Launch-blocker]
133. **PageSpeed Insights mobile score ≥ 90 on key templates** — lab proxy target for home, service, locality, booking templates before launch — [Important]
134. **No layout shift from the sticky CTA/booking bar** — sticky WhatsApp/booking bar reserves its space at first paint — [Important]

---

## Category 12 — Mobile

135. **Responsive viewport meta** — `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page — [Launch-blocker]
136. **Mobile-first content parity** — identical content, links, schema on mobile and desktop (Google indexes mobile only) — [Launch-blocker]
137. **Base font ≥ 16 px, line-height ≥ 1.2** — body text legible without zoom — [Important]
138. **Tap targets ≥ 48×48 CSS px with ≥ 8 px spacing** — all buttons/links meet size; adjacent targets don't overlap — [Important]
139. **No horizontal scroll at 360 px width** — layout contained at smallest common viewport; content not wider than screen — [Launch-blocker]
140. **Thumb-reachable primary CTA** — booking/WhatsApp CTA visible without scrolling on mobile and repeated as a sticky bottom bar — [Important]
141. **Click-to-call & click-to-WhatsApp functional on device** — tel:/wa.me links tested on Android + iOS — [Launch-blocker]
142. **Forms mobile-optimised** — correct input types (`tel`, `email`), autocomplete attributes, numeric keypad for phone, no field requires precision typing — [Important]
143. **No mobile-only interstitials/app banners blocking content** — nothing covers content on first interaction — [Important]

---

## Category 13 — Social / OG / Twitter Meta

144. **og:title, og:description, og:url, og:type on all pages** — unique per page; og:title ≤ 60 chars (Facebook truncates ~70), og:description 100–200 chars — [Important]
145. **og:image 1200×630 (1.91:1)** — one branded share image per key page, <1 MB JPG/PNG, absolute URL — [Important]
146. **og:image:width/height + og:image:alt declared** — prevents first-share blank previews and aids accessibility — [Nice-to-have]
147. **twitter:card = summary_large_image** — plus twitter:title/description or clean OG fallback — [Nice-to-have]
148. **og:locale = en_IN** — locale declared; siteName via og:site_name "PetDoorStep" — [Nice-to-have]
149. **Branded share-image templates per page type** — service pages show service+price+brand; blog shows title overlay — designed once, generated per page at build — [Nice-to-have]
150. **WhatsApp share preview validated** — since booking flows through WhatsApp, every money page's link preview tested in WhatsApp (uses OG tags; image <600 KB renders most reliably) — [Important]
151. **Canonical URL in og:url matches rel=canonical** — no mismatch between social URL and canonical — [Nice-to-have]

---

## Category 14 — Crawling / Indexing / Canonical / Robots

152. **Page returns HTTP 200 and is publicly reachable** — Google's minimum technical requirement: Googlebot not blocked, 200 status, indexable content — [Launch-blocker]
153. **Self-referencing rel=canonical on every indexable page** — absolute URL, matching the final (https, lowercase, trailing-slash) form — [Launch-blocker]
154. **One canonical version of the site** — non-www/www and http/https variants all 301 to the single chosen origin — [Launch-blocker]
155. **robots.txt valid and non-blocking** — allows all content paths; references sitemap; blocks only true non-content (e.g. `/api/`); tested in Search Console — [Launch-blocker]
156. **XML sitemap complete and clean** — auto-generated at build (`@astrojs/sitemap`); contains only indexable 200 canonical URLs; submitted to GSC; `<lastmod>` real — [Launch-blocker]
157. **Meta robots correct per template** — indexable pages have no stray `noindex`; thank-you/booking-confirmation, internal search, tag archives set `noindex,follow` — [Launch-blocker]
158. **No duplicate-content URL variants indexable** — parameterised, print, staging URLs blocked or canonicalised; staging domain behind auth/noindex — [Launch-blocker]
159. **Custom 404 with navigation** — invalid URLs return real HTTP 404 (not soft-404/200) with links to services/home — [Important]
160. **Redirects are single-hop 301s** — no chains >1 hop, no 302 for permanent moves — [Important]
161. **Favicon + touch icons** — valid favicon.ico/SVG ≥48×48 multiple sizes (shows in mobile SERPs), apple-touch-icon, web manifest — [Important]
162. **hreflang deferred but architecture ready** — single en-IN site now (no hreflang needed); URL plan reserves `/pa/` or subfolder pattern for future Punjabi content without restructure — [Nice-to-have]
163. **Structured, crawlable HTML (no content behind JS interaction)** — all SEO copy present in static HTML (Astro SSG default); accordions/tabs content in DOM at load — [Launch-blocker]
164. **GSC + Bing Webmaster verified at launch** — properties verified, sitemap submitted, indexing requested for money pages day one — [Launch-blocker]

---

## Category 15 — Accessibility that Affects SEO

165. **Semantic landmarks** — one `<main>`, `<header>`, `<footer>`, `<nav>` with aria-label; sections use semantic elements, not div-soup — [Important]
166. **Descriptive link text (a11y+SEO dual check)** — screen-reader link list makes sense out of context; no bare URLs or "here" — [Important]
167. **Colour contrast ≥ 4.5:1 body / 3:1 large text** — WCAG AA on all text incl. text over hero images and buttons — [Important]
168. **Keyboard-navigable booking flow** — entire multi-step form operable via keyboard; visible focus states; logical tab order — [Important]
169. **Form labels programmatically associated** — every input has `<label for>` (not placeholder-only); error messages announced (`aria-live`) — [Important]
170. **lang attribute set** — `<html lang="en-IN">`; any Punjabi/Hindi snippets wrapped with their own lang attribute — [Important]
171. **Skip-to-content link** — first focusable element skips nav — [Nice-to-have]
172. **No autoplaying media with sound; animations respect prefers-reduced-motion** — [Nice-to-have]
173. **Accessible accordions/tabs** — FAQ accordions use button + aria-expanded with content in DOM (crawlable and announced) — [Important]
174. **Zoom not disabled** — no `maximum-scale=1`/`user-scalable=no` in viewport meta — [Important]

---

## Category 16 — Freshness & Maintenance

175. **Visible "Last updated" date on money + YMYL pages** — true dateModified shown and mirrored in schema; only updated when content materially changes — [Important]
176. **Quarterly price/fact refresh cycle** — calendar task: verify prices, areas, hours, vaccination schedules every 90 days; log in a changelog — [Important]
177. **Blog publishing cadence** — ≥2 posts/month for the first 6 months targeting informational keywords; each mapped in the keyword file before writing — [Important]
178. **Content decay review at 6 months** — pages with declining GSC clicks/impressions get a documented refresh (new sections, updated data, new images) — [Nice-to-have]
179. **Broken-link & 404 monitor** — monthly crawl; zero broken internal links sustained; external dead links fixed/removed — [Important]
180. **Seasonal content updates** — tick/flea pages refreshed pre-monsoon (May–June), winter-coat grooming pre-November; festival-season (Diwali noise anxiety) posts updated annually — [Nice-to-have]
181. **GSC error triage weekly** — Coverage/enhancement/CWV reports reviewed weekly during first 90 days, then monthly — [Important]
182. **Schema re-validation after every template change** — any layout deploy re-runs Rich Results Test on affected templates — [Important]

---

## Category 17 — Conversion-Adjacent On-Page Elements

183. **Above-the-fold completeness** — on every money page, first viewport (mobile) contains: benefit headline, subheadline, primary CTA, trust badge, hero image — all without scrolling (80% of users weight above-fold content) — [Launch-blocker]
184. **Single primary CTA per page** — one dominant action ("Book on WhatsApp"); secondary actions (call, view prices) visually subordinate — [Important]
185. **Benefit-led CTA copy** — button text states the gain ("Get My Pet's Slot", "See Fixed Prices") not "Submit"; first-person variants tested — [Important]
186. **CTA repetition rhythm** — CTA block appears after hero, after price table, after testimonials, and at page end (~every 1.5–2 screens) — [Important]
187. **Sticky mobile action bar** — persistent bottom bar with WhatsApp + Call on all service/locality pages (space reserved, see #134) — [Important]
188. **Trust strip near first CTA** — 3–4 proof points adjacent to hero CTA: "Background-verified groomers · Sanitised kit per pet · Fixed prices · On-time or ₹100 off" (trust signals near CTA lift conversions 15–25%) — [Important]
189. **Price table with fixed transparent prices** — HTML table (also an SEO snippet asset) by pet size/coat; "no hidden charges" note — [Important]
190. **Multi-step booking form best practices** — step 1 asks the easiest question (pet type), progress indicator, ≤3 fields visible per step, phone captured by step 2, summary before WhatsApp handoff — [Important]
191. **WhatsApp deep link with pre-filled context** — `wa.me` links pass service + locality + source page in the prefilled message so chats open qualified — [Important]
192. **Response-time promise** — explicit SLA near CTA ("We confirm your slot within 15 minutes, 9am–9pm") — [Nice-to-have]
193. **Social proof module** — ≥3 testimonials with name+locality+pet, star visuals as plain content (not self-serving schema, see #106), link to GBP reviews — [Important]
194. **Risk reversal / guarantee block** — satisfaction re-do promise, vaccinated-staff note, what-if-my-pet-is-anxious reassurance — [Nice-to-have]
195. **Objection-handling FAQ above footer** — 5–8 FAQs per money page covering price, safety, kit hygiene, time taken, aggressive pets, payment methods — [Important]
196. **Exit-path capture for not-ready visitors** — secondary soft CTA ("Save our price list on WhatsApp" / grooming-reminder opt-in) without intrusive popups (see #132) — [Nice-to-have]
197. **Analytics events on every conversion action** — WhatsApp clicks, tel: clicks, form steps, form completion all fire GA4 events from day one (conversion measurability is an on-page build requirement) — [Launch-blocker]

---

## Category 18 — AI Search / Answer-Engine Extraction (GEO) — *added category*

198. **Answer-first section openers** — every H2 section opens with a direct 40–80-word answer ("Dog grooming at home in Ludhiana costs ₹799–₹2,499 depending on…"), details after (extraction systems lift clean leading passages) — [Important]
199. **Key facts in the first 30% of the page** — prices, areas, USPs appear early (≈44% of verified LLM citations point to the first 30% of content) — [Important]
200. **"X is Y" definitional sentences** — service pages contain one crisp definition sentence per core concept for snippet/AI lifting — [Nice-to-have]
201. **Scannable data structures** — prices, service inclusions, area lists as HTML tables/ULs (most-extracted formats for featured snippets and AI answers) — [Important]
202. **Consistent entity naming** — "PetDoorStep" spelled identically everywhere (site, schema, GBP, socials) so engines consolidate the entity — [Important]
203. **Question-phrased content matching PAA** — harvest People-Also-Ask for each primary keyword; answer verbatim-phrased questions on-page — [Important]
204. **llms.txt (optional, emerging)** — publish `/llms.txt` summarising the business, services, areas, prices; low effort, unproven but zero-risk — [Nice-to-have]
205. **Citable original data** — publish at least one unique data asset (e.g. "Ludhiana Pet Care Price Index 2026" from own booking data) that AI engines and journalists can cite — [Nice-to-have]

---

## Final count & QA summary

- **Parameters: 205 total** (target was 130+; numbered 1–205 across 18 categories).
- **Launch-blockers: 43** — these form the pre-publish QA gate for every page.
- **Important: 118** — fix within 14 days of a page going live.
- **Nice-to-have: 44** — monthly batch work.

### Verified 2025–2026 threshold cheat-sheet (sources below)
| Item | Current value |
|---|---|
| Title tag | 50–60 chars (51–60 = lowest rewrite rate; ~600 px) |
| Meta description | 120–158 chars (mobile cutoff ~130) |
| H1 | exactly one; 20–70 chars; keyword near start |
| URL slug | 3–5 words, lowercase, hyphens |
| Alt text | ≤125 chars, descriptive |
| OG image | 1200×630 px, <1 MB |
| LCP / INP / CLS | ≤2.5 s / ≤200 ms / ≤0.1 at p75 (unchanged; INP replaced FID Mar 2024) |
| TTFB | ≤800 ms (static+CDN target <200 ms) |
| Tap targets | ≥48×48 CSS px, ≥8 px gap; base font 16 px |
| Crawl depth | ≤3 clicks from home |
| FAQ rich results | no longer shown (2023 restriction → full removal per 2026 doc update); markup harmless but earns nothing |
| Self-serving review stars | not shown for LocalBusiness self-markup since Sept 2019 |

### Primary sources consulted
- Google Search Essentials & technical requirements (developers.google.com/search/docs/essentials/technical)
- Google Search Central: title links, snippets, structured data policies; HowTo/FAQ changes (developers.google.com/search/blog/2023/08/howto-faq-changes); review rich results policy (2019/09 blog)
- web.dev / CrUX Core Web Vitals thresholds (LCP 2.5 s, INP 200 ms, CLS 0.1 — confirmed unchanged 2026)
- Zyppy title-rewrite study; Search Engine Land meta description guide (2025)
- Semrush / eseospace / wscubetech on-page checklists (2026 editions)
- Whitespark & Localo local-SEO on-page guidance; seeders.com map-embed guidance
- linkboss/loganix internal-linking standards (2026): depth ≤3, orphan elimination, anchor diversity
- alttextify / superblog image-SEO (2025–26): WebP, ≤125-char alt, lazy-load rules
- Exploding Topics / Azuro Digital LLM-optimization guides (2026); Kevin Indig citation-position analysis (Feb 2026)
- seo-day.de wiki (above-the-fold, headings, mobile technical); apexure above-fold CRO data
