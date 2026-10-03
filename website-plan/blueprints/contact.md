# B09 · CONTACT — `/contact/`

> Page blueprint (custom anatomy). NAP values come **only** from the canonical block in `05-LOCAL-SEO.md` §4
> (character-for-character). Hours from `00-MASTER-PLAN.md` §3.1. Zero-JS page — no form to build.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/contact/` | 1 | LocalBusiness (same `@id` as home) + ContactPage + BreadcrumbList (`04-TECHNICAL-SEO.md` §2.9) | blueprinted |

## 1 · Head

Primary keyword (`01-SITEMAP.md`): *pet grooming contact number ludhiana*, in the natural form "Pet Grooming Contact
Number in Ludhiana" (`00` §11 E11). It starts the title and the H1 (`02` P012, P026), and the H1 is the title minus
the brand suffix (P015).

- **Title** (53): `Pet Grooming Contact Number in Ludhiana | PetDoorStep` (no hook: none fits under 60 chars, P017)
- **Meta** (143): `Pet grooming contact number in Ludhiana: a real person replies on WhatsApp within 10 minutes, 9:00–19:00 daily. Fixed prices. Book on WhatsApp.`
- **H1:** `Pet Grooming Contact Number in Ludhiana` (39 chars)

**SERP-intent check (`02` P040, 2026-10-03).** A web search for `pet grooming contact number ludhiana` returns
directories and aggregator city pages, not one business's own contact page. That means JustDial category pages (Pet
Grooming Services, Dog Grooming Services At Home, locality variants such as Urban Estate Phase 2), the myfurries and
petgroomly Ludhiana templates, urbanpetsgrooming.in's Ludhiana page, Pupkitt's listicle "5 Best Pet Grooming Service
Providers In Ludhiana" and a scraped business list (rentechdigital). What a searcher takes away is a phone number from
one of those listings. `dog grooming at home Ludhiana phone number WhatsApp contact us` looks the same: JustDial, Mr n
Mrs Pet's Ludhiana page (phone + WhatsApp), PetPro's Instagram. The intent is transactional: a number to call or
WhatsApp now, plus the hours and whether the area is covered. The page matches that format and answers faster than a
directory. The keyword H1 is followed directly by the CO-1 reply line and the CO-2 cards, so the WhatsApp number, phone,
email and Instagram are tappable text in the first screens. Then come the crawlable NAP (byte-identical to the footer
and to the LocalBusiness `telephone`/`email`), the hours table and the 10 areas — the same facts the directory snippets
show — with no form and no call-back promise. Winning the map pack is the GBP's job (`05`); this page supports it with
NAP consistency. Limits of this check: the search tool is US-located and returns organic links only, so the local pack
and the google.co.in order were not visible. Re-check the query on a phone in Ludhiana (incognito) before launch.

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| CO-0 | Breadcrumb | `Home › Contact` |
| CO-1 | Header | H1 · line "A real person replies on WhatsApp within 10 minutes, 9:00–19:00, every day." (confirmed fact, `00` §3.1, D3) |
| CO-2 | **Contact cards** (H2 "WhatsApp, call or email PetDoorStep") | ① **WhatsApp** (primary, green): `[FILL:WHATSAPP_NUMBER]` → `wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20have%20a%20question` · ② **Call**: `[FILL:PHONE]` → `tel:` · ③ **Email**: `[FILL:EMAIL]` → `mailto:` — "replies within one working day" · ④ **Instagram**: `[FILL:INSTAGRAM]` |
| CO-3 | **NAP block** | Visible version of `05` §4: Name · Phone · WhatsApp · Email · Website · "Doorstep service — we come to you. There is no walk-in centre." · Service area line. **Never show `[FILL:BASE_ADDRESS]`** (service-area business) |
| CO-4 | **Hours** (H2) | Table: Grooming & vet visits — Mon–Sun 9:00–19:00 (last booking 17:30) · Dog walks — 6:00–9:30 and 17:30–20:30 (Apr–Jun: before 8:00 / after 19:00) · WhatsApp replies — 9:00–19:00; messages after 19:00 are answered from 9:00 |
| CO-5 | **Where we come** (H2) | "All of Ludhiana — no travel charge." + the 10 `00` §3.3 areas, each linked to its area page once live (plain text before) |
| CO-6 | Quick links | "Ready to book?" → `/book/` · "Prices" → `/pricing/` · "How it works" → `/how-it-works/` |
| CO-7 | FAQ (3 Q&As, plain HTML — no FAQPage on this page) | see §3 |

## 3 · FAQ

1. **What's the fastest way to reach you?** — WhatsApp. A real person replies within 10 minutes between 9:00 and 19:00, every day.
2. **Do you have a shop or clinic I can visit?** — No — PetDoorStep is a doorstep service, so there's no walk-in centre. Our groomers, walkers and vet come to your home anywhere in Ludhiana, with everything they need.
3. **Is there an emergency number?** — We're not an emergency service. If your pet is injured, bleeding heavily, having seizures, struggling to breathe or may have eaten poison, go straight to the nearest 24-hour veterinary hospital: [FILL:EMERGENCY_VET_LIST].

## 4 · Ship checks

- [ ] NAP text identical to `05-LOCAL-SEO.md` §4 and the footer (P094-family consistency); base address never rendered
- [ ] LocalBusiness block identical to home's (same `@id`); ContactPage `mainEntity` → `#business`
- [ ] Emergency list verified by phone (same token as `vet-at-home.md` §0)
- [ ] No call-back promise anywhere on the page: calls are not staffed for call-backs (`00` §3.1, §11 D3, 2026-10-03)
- [ ] Title, meta and H1 exactly as §1 (P010–P027 counted: title 53, meta 143 with no double quotes, H1 39); the
      H1 appears on no other page (P027)
- [ ] No map at launch: `02` P098 (Important) is deferred (`00` §11 E8). Record it in the page audit as an open
      Important item with an owner and a fix date (`02` §1.2)
