# B01 · HOME — `/`

> Page blueprint (custom anatomy — not the service template). Obeys `00-MASTER-PLAN.md`; keywords from
> `03-KEYWORD-MAP.md` §2.1; hero copy from `06-CONVERSION-PLAYBOOK.md` §2.3; components `08-DESIGN-SYSTEM.md` §4.
> Job: route every visitor to the right service in one scroll, and prove trust before they ask.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/` | 1 | WebSite + LocalBusiness + FAQPage (`04-TECHNICAL-SEO.md` §2.1, §2.6, §2.3) | blueprinted |

## 1 · Head

- **Title** (53): `PetDoorStep — Pet Grooming & Care at Home in Ludhiana` (brand-led home title per `02-SEO-PARAMETERS.md` P014)
- **Meta** (150): `Pet grooming at home in Ludhiana — dog & cat grooming, walking and vet visits. Grooming from ₹599, verified groomers, sanitised kit. Book on WhatsApp.`
- **H1:** `Pet Grooming & Pet Care at Home in Ludhiana`
- Canonical `https://[FILL:DOMAIN]/` · og:image = brand template 1200×630 (`04-TECHNICAL-SEO.md` §4)

## 2 · Keyword → block assignment

| Keyword (03 §2.1) | Role | Lands in |
|---|---|---|
| pet grooming at home ludhiana | P | Title · H1 · H-1 subhead |
| pet care services ludhiana | S | H-3 H2 **"All pet care services in Ludhiana — one verified team"** |
| doorstep pet care ludhiana | S | H-1 eyebrow · hero alt |
| pet grooming home service ludhiana · dog and cat grooming at home | S/L | H-3 intro line |
| pet grooming price list ludhiana | L | H-5 link anchor "see our full pet grooming price list" |
| online pet grooming booking ludhiana | L | H-4 support line |
| pet spa ludhiana | L | H-3 Premium Spa mention on the dog-grooming card |
| which areas do you cover · is home grooming safe · best pet grooming service · pet grooming near me | L | H-11 FAQ #1–#4, #6 |
| ghar baithe pet care (Hinglish) | — | H-1 support line + hero alt (the page's one Hinglish use) |

## 3 · Blocks (DOM order — binding)

| # | Block | Spec |
|---|---|---|
| H-1 | **Hero** (`Hero.astro`) | Eyebrow *Pet care at your doorstep* · H1 above · subhead (`06` §2.3): "Grooming, walking and vet visits at your door — background-verified professionals, sealed sanitised kit, fixed prices from ₹299. Serving Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana." · support line *Ghar baithe pet care — Ludhiana mein!* · CTAs [Book on WhatsApp] → `/book/?src=hero_home` + [Call [FILL:PHONE]] · chips `from ₹299` + standard 4 trust chips · R3 reply line · photo: groomer + Golden Retriever on a Ludhiana verandah (LCP: eager, preloaded) |
| H-2 | **Social proof** | Proof line "★ [FILL:GOOGLE_RATING] on Google · [FILL:REVIEW_COUNT]+ Ludhiana pet parents" → `[FILL:GBP_LINK]` + 3 `ReviewCard`s (mixed services, mixed localities). Pre-launch: E6 empty-state string (`06` §9). No review schema |
| H-3 | **Services grid** | H2 per §2 · intro "Dog and cat grooming at home, daily walks and vet visits — every pet grooming home service in Ludhiana, booked in one place." · 7 `ServiceCard`s in this order: Dog Grooming (`from ₹599`; one-liner mentions "Premium Spa — a pet spa at home") · Cat Grooming (`from ₹899`) · Dog Walking (`₹2,999/month`) · Vet at Home (`₹699`) · Dog Vaccination (`₹199 + MRP`) · Tick & Flea (`₹699 · ₹399 add-on`) · Puppy Grooming (`₹699 flat`). Wave-2 pages render as non-linked "Coming soon" cards until live (P074) |
| H-4 | **How it works** | `StepsStrip.astro`, the 4 site-wide steps (`04` §2.8) · support line "Online pet grooming booking in Ludhiana that ends on WhatsApp — no app, no login, no payment now." · link "See the full process" → `/how-it-works/` |
| H-5 | **Price teaser** | H2 **"Fixed prices — on the website, not at your door"** · 3 tiles: Bath & Brush from ₹599 · Full Groom from ₹1,199 · Vet visit ₹699 · R1 + R2 · link "see our full pet grooming price list" → `/pricing/` |
| H-6 | **The PetDoorStep Promise** | 5-icon strip verbatim from `06` §4.1 (point 4 only after its policy gate) · link "Read the full Promise" → `/safety-hygiene/` |
| H-7 | **Before/after strip** | 3 `BeforeAfter` pairs across breeds; rendered only with ≥ 3 real pairs, else omitted |
| H-8 | **Meet your groomers** | 3 condensed `GroomerCard`s (`06` §4.2) + supporting line + link "How we hire" → `/about/` |
| H-9 | **Areas we serve** | H2 **"Doorstep pet care across Ludhiana"** · 10 `AreaCard`s (`00` §3.3); each links its area page only once that page is live (plain text before — staggered publishing, `05-LOCAL-SEO.md` §6.10). Line: "Not listed? We cover all of Ludhiana — no travel charge." |
| H-10 | **Offers teaser** | Two tiles: "New here? **₹200 off your first groom** + a free nail-trim visit — code **FIRSTGROOM**" · "**Groom Club** — 15% off every monthly Full Groom" → both `/offers/` |
| H-11 | **FAQ** (6 Q&As, §4) | `Faq.astro`; FAQPage markup mirrors verbatim |
| H-12 | **Final CTA band** | "Your pet deserves stress-free care at home. Slots this week across Ludhiana." + [Book on WhatsApp] + [Call [FILL:PHONE]] |
| — | Sticky bar / float | Global (`06` §3.3): `Call · WhatsApp · Book Now` |

## 4 · FAQ (H-11 — 6 Q&As)

1. **Which areas of Ludhiana do you cover?** — All of Ludhiana, with no travel charge. Our most-booked areas are Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan and Kitchlu Nagar — but if you're anywhere in the city, we'll come to you.
2. **Is home pet grooming safe and hygienic?** — Yes. Every groomer is background-verified (ID and references checked), and every pet gets a fresh, sealed, sanitised kit opened in front of you — nothing used on another pet touches yours. Your pet is the only pet in the room, and you can watch the whole session.
3. **Why choose PetDoorStep over a salon or a freelance groomer?** — No car ride, no cages and no waiting room — and unlike most freelancers, fixed published prices, verified people, a sealed kit for every pet and a photo update after every visit. Same professional result, without the stress or the bargaining.
4. **How do I book, and do I pay in advance?** — Pick your service, pet size, area and a time window on our website — it takes about a minute — and confirm on WhatsApp. We confirm the exact slot within 10 minutes (9:00–19:00). No advance payment: pay by UPI or cash after the service.
5. **Are your prices really fixed?** — Yes. The price on this website is the price you pay, confirmed on WhatsApp before we arrive — no doorstep bargaining. The only possible addition is a clearly flagged add-on, like de-matting for a severely matted coat, and we tell you before we start, never after.
6. **Searching for "pet grooming near me" — how soon can you come?** — Most Ludhiana areas get same-week slots, and booking before 15:00 often gets you a slot the same day. Grooming and vet visits run 9:00–19:00 every day; dog walks start as early as 6:00.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| H-1 hero | Groomer with a Golden Retriever on a Ludhiana verandah, owner smiling | ghar baithe pet care — doorstep pet grooming at home in Ludhiana |
| H-3 cards | One real photo per service (shot list `08` §5.2; Puppy Grooming card = shot 13 `puppy-first-groom-at-home-ludhiana.jpg`, Tick & Flea card = shot 14 `dog-tick-check-at-home-ludhiana.jpg`) | "{Service} at home in Ludhiana" |
| H-8 | Groomer portraits | "{First name}, background-verified PetDoorStep groomer" |

## 6 · Ship checks

- [ ] Title/meta/H1 exactly as §1; FAQ markup mirrors §4 word-for-word
- [ ] LocalBusiness block = `04-TECHNICAL-SEO.md` §2.1 verbatim (same `@id` as `/contact/`); no aggregateRating
- [ ] Wave-2 service cards and unpublished area cards are unlinked (zero internal 404s — P074)
- [ ] Fold test at 360×640: H1, subhead, primary CTA, ≥ 1 chip visible
- [ ] Lighthouse mobile ≥ 90 (`00-MASTER-PLAN.md` §9.8)
