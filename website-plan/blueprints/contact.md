# B09 · CONTACT — `/contact/`

> Page blueprint (custom anatomy). NAP values come **only** from the canonical block in `05-LOCAL-SEO.md` §4
> (character-for-character). Hours from `00-MASTER-PLAN.md` §3.1. Zero-JS page — no form to build.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/contact/` | 1 | LocalBusiness (same `@id` as home) + ContactPage + BreadcrumbList (`04-TECHNICAL-SEO.md` §2.9) | blueprinted |

## 1 · Head

- **Title** (55): `Contact Us – WhatsApp or Call in Ludhiana | PetDoorStep`
- **Meta** (146): `Contact PetDoorStep in Ludhiana on WhatsApp or phone, 9:00–19:00 every day. We reply within 10 minutes and serve all of Ludhiana at your doorstep.`
- **H1:** `Contact PetDoorStep`

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| CO-0 | Breadcrumb | `Home › Contact` |
| CO-1 | Header | H1 · line "A real person replies within 10 minutes, 9:00–19:00, every day." |
| CO-2 | **Contact cards** (H2 "Pet grooming contact number — Ludhiana") | ① **WhatsApp** (primary, green): `[FILL:WHATSAPP_NUMBER]` → `wa.me/[FILL:WHATSAPP_NUMBER]?text=Hi%20PetDoorStep%2C%20I%20have%20a%20question` · ② **Call**: `[FILL:PHONE]` → `tel:` · ③ **Email**: `[FILL:EMAIL]` → `mailto:` — "replies within one working day" · ④ **Instagram**: `[FILL:INSTAGRAM]` |
| CO-3 | **NAP block** | Visible version of `05` §4: Name · Phone · WhatsApp · Email · Website · "Doorstep service — we come to you. There is no walk-in centre." · Service area line. **Never show `[FILL:BASE_ADDRESS]`** (service-area business) |
| CO-4 | **Hours** (H2) | Table: Grooming & vet visits — Mon–Sun 9:00–19:00 (last booking 17:30) · Dog walks — 6:00–9:30 and 17:30–20:30 (Apr–Jun: before 8:00 / after 19:00) · WhatsApp replies — 9:00–19:00; messages after 19:00 are answered from 9:00 |
| CO-5 | **Where we come** (H2) | "All of Ludhiana — no travel charge." + the 10 `00` §3.3 areas, each linked to its area page once live (plain text before) |
| CO-6 | Quick links | "Ready to book?" → `/book/` · "Prices" → `/pricing/` · "How it works" → `/how-it-works/` |
| CO-7 | FAQ (3 Q&As, plain HTML — no FAQPage on this page) | see §3 |

## 3 · FAQ

1. **What's the fastest way to reach you?** — WhatsApp. A real person replies within 10 minutes between 9:00 and 19:00, every day. Calls work too — if we miss your call during a visit, we call back within 30 minutes.
2. **Do you have a shop or clinic I can visit?** — No — PetDoorStep is a doorstep service, so there's no walk-in centre. Our groomers, walkers and vet come to your home anywhere in Ludhiana, with everything they need.
3. **Is there an emergency number?** — We're not an emergency service. If your pet is injured, bleeding heavily, having seizures, struggling to breathe or may have eaten poison, go straight to the nearest 24-hour veterinary hospital: [FILL:EMERGENCY_VET_LIST].

## 4 · Ship checks

- [ ] NAP text identical to `05-LOCAL-SEO.md` §4 and the footer (P094-family consistency); base address never rendered
- [ ] LocalBusiness block identical to home's (same `@id`); ContactPage `mainEntity` → `#business`
- [ ] Emergency list verified by phone (same token as `vet-at-home.md` §0)
- [ ] Call-back promise (FAQ #1, 30 minutes) staffed before publishing — otherwise drop that sentence
