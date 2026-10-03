# B11 · FAQ — `/faq/` + the shared FAQ data file

> Page blueprint for the master FAQ, plus the **single FAQ data source** every page renders from. Obeys
> `00-MASTER-PLAN.md`; Hinglish policy `03-KEYWORD-MAP.md` §5. Objection answers from `06-CONVERSION-PLAYBOOK.md` §6
> are already embedded in the page blueprints referenced below.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/faq/` | 1 | FAQPage + BreadcrumbList | blueprinted |

## 1 · Head

Primary keyword (`01-SITEMAP.md`): *pet grooming at home questions*. It starts the title (`02` P012) and is the H1's
first five words, verbatim (`02` P026 + the `00` §11 H1 rule).

- **Title** (59): `Pet Grooming at Home Questions – Ludhiana FAQ | PetDoorStep`
- **Meta** (155): `Answers to every question about pet grooming, dog walking and vet visits at home in Ludhiana — prices, safety, hygiene, timings, payment and service areas.`
- **H1:** `Pet Grooming at Home Questions, Answered` (40 chars)

> 2026-10-03 (stage w1-hiw-faq): the earlier title `Pet Grooming at Home FAQs for Ludhiana | PetDoorStep` and H1
> `Pet Care at Home — Your Questions, Answered` did not contain the primary keyword, so `02` P012/P026
> (launch-blockers) won over the blueprint wording — the same fix E11 made for `/contact/`. Meta unchanged.
> Log: `decisions/w1-hiw-faq.md`.

## 1a · SERP intent check (`02` P040) — 2026-10-03

- **Query.** *pet grooming at home questions* (the `01-SITEMAP.md` primary) and *pet grooming at home questions
  ludhiana*.
- **What ranks** (web search on 2026-10-03 with a US-located search tool — not a google.co.in SERP; re-check from an
  Indian connection, incognito, before launch): no local pack, mixed intent. (a) **DIY grooming guides** (ASPCA
  "At-Home Pet Grooming: Top Tips and Recommendations" and similar how-tos); (b) **single-provider "common questions"
  pages** (e.g. Gloria's Mobile Grooming "Common Questions": which pets, how long a groom takes, where in the home it
  happens); (c) directory stubs (salonist.io "Pet Grooming At Home in Delhi", a Mohali mobile-grooming listing). No
  Ludhiana provider FAQ ranks.
- **How this page matches.** Format (b), the one a service business can win: Q&A grouped by topic — 6 category H2s,
  28 question H3s answered answer-first — covering what the ranking FAQ pages answer (cost, duration, what's needed at
  home, payment, safety) plus what none of them has: fixed ₹ prices, the Ludhiana areas, the 10-minute WhatsApp
  reply. Intent (a) is DIY and belongs to the blog (`03` §6), not this page.

## 2 · One source for every FAQ — `src/data/faq.json`

Every FAQ on the site (service pages, home, pricing, book, contact, how-it-works, this page) renders from one file, so
an answer can never differ between pages, and FAQPage markup is generated from the same entries as the visible text.

```json
[
  {
    "id": "dog-grooming-1",
    "category": "grooming",
    "q": "How much does dog grooming at home cost in Ludhiana?",
    "a": "Fixed prices by size: Bath & Brush ₹599–₹999, Full Groom ₹1,199–₹1,899, Premium Spa Groom ₹1,799–₹2,799. …",
    "pages": ["/ludhiana/dog-grooming/", "/faq/"]
  }
]
```

Rules: `id` = `{source-blueprint}-{number}` (e.g. `cat-grooming-2`, `home-4`); `a` text copied **verbatim** from the
source blueprint; ₹ figures inside answers are checked against `pricing.json` in CI (any mismatch fails the build).
Pages with FAQPage markup (`04-TECHNICAL-SEO.md` §2.9) generate it from their entries; others render plain HTML.

## 3 · The `/faq/` page — 28 questions in 6 categories

Each category is an H2 with a one-line link to its money page; each question an H3 in a `Faq.astro` accordion.

| Category (H2) | Entries (ids → source blueprint FAQ) | Category link |
|---|---|---|
| **Booking & prices** | `home-4` book & pay · `home-5` fixed prices · `pricing-2` travel charge · `pricing-3` what could change · `book-1` slot today · `book-3` reschedule · `pricing-5` *Grooming ka rate kya hai?* | `/pricing/` |
| **Grooming** | `dog-grooming-1` cost · `dog-grooming-4` large/anxious dogs · `dog-grooming-6` what you need at home · `dog-grooming-8` *Cash ya UPI?* · `cat-grooming-2` cats that hate handling · `puppy-grooming-1` first bath age | `/ludhiana/dog-grooming/` |
| **Dog walking** | `dog-walking-1` cost · `dog-walking-2` same walker · `dog-walking-4` summer timings | `/ludhiana/dog-walking/` |
| **Vet & vaccination** | `vet-at-home-1` what ₹699 includes · `vet-at-home-3` emergencies · `vet-at-home-8` *Ghar pe dog ka doctor?* · `dog-vaccination-3` puppy schedule · `dog-vaccination-4` rabies | `/ludhiana/vet-at-home/` |
| **Safety & trust** | `faq-s1` · `faq-s2` · `faq-s3` (written in §4) · `home-2` is home grooming hygienic | `/safety-hygiene/` |
| **Service areas & what's next** | `home-1` areas · `faq-a1` · `faq-a2` (written in §4) | `/contact/` |

Dog-grooming entries 1–8 are the 8 Q&As in `_TEMPLATE-service-page.md` SP-10 (worked example), numbered in that order.
Hinglish on this page: 3 entries (`pricing-5`, `dog-grooming-8`, `vet-at-home-8`), each already approved on its source page.

**One-line category links and anchors** (as built; the link texts live in `src/lib/faq.ts` `FAQ_PAGE_CATEGORY_LINKS`,
written in stage f2-data, prices rendered from `pricing.json`). Each link renders only while its target is live
(`src/data/routes.ts`), so the Safety & trust link appears once `/safety-hygiene/` ships (Wave 2). The anchor is the
category H2's `id`, the target of the jump-links (§5).

| Category | Anchor | One-line link text |
|---|---|---|
| Booking & prices | `#booking-and-prices` | Compare every service on the full price list |
| Grooming | `#grooming` | Dog grooming at home in Ludhiana — from ₹599 |
| Dog walking | `#dog-walking` | Daily dog walks in Ludhiana — ₹2,999/month |
| Vet & vaccination | `#vet-and-vaccination` | Vet home visits in Ludhiana — ₹699 per visit |
| Safety & trust | `#safety-and-trust` | Read our full safety & hygiene standards |
| Service areas & what's next | `#service-areas` | Ask about your area — WhatsApp, call or email us |

In-answer links (`faq.json` `links`, each rendered only while its target is live): `home-1` links its 10 locality names
to their area pages (Wave 2) · `book-3` "terms page" → `/terms/`, "refund & cancellation policy page" →
`/refund-policy/` (Wave 2) · `dog-grooming-1` and `vet-at-home-1` → `/pricing/` · `puppy-grooming-1` →
`/ludhiana/dog-vaccination/` (Wave 2) · `dog-vaccination-3` → its blog post (Wave 3).

## 4 · New entries written for this page

- **faq-s1 · What does "background-verified" actually mean?** — Before their first visit, every groomer and walker submits government ID and address proof, and we call two references. They then pass a skills trial on a volunteer pet, train on our hygiene and handling standards, and complete three supervised visits before working alone. You see their name and photo on WhatsApp before they arrive.
- **faq-s2 · What safety measures do you follow inside my home?** — Your groomer wears an ID badge, opens a sealed, sanitised kit in front of you, works only in the space you choose, and cleans up before leaving. You're welcome to watch everything — that transparency is the whole point of a doorstep service.
- **faq-s3 · What happens if something goes wrong during a visit?** — We stop immediately, tell you on the spot, and help you get a vet check right away — from our partner vet or the nearest clinic. We'd always rather pause a groom than push a stressed or unwell pet.
- **faq-a1 · Do you serve outside Ludhiana?** — Not yet — we're Ludhiana-only while we get every detail right. Choose "Outside Ludhiana" in the booking form to join the waitlist: you'll be first to know when we reach your city, plus ₹200 off your first groom.
- **faq-a2 · Will you offer boarding, training or pet supplies?** — They're planned for a later phase and aren't available yet. Message us on WhatsApp to join the waitlist, and we'll tell you first when they launch.

## 5 · Blocks around the accordion

FAQ-0 breadcrumb `Home › FAQ` · FAQ-1 H1 + "Can't find your question? WhatsApp us — a real person replies within 10 minutes (9:00–19:00)." · category jump-links (anchors) · the 6 category sections · CTA band [Book on WhatsApp] + [Call [FILL:PHONE]].

As built (2026-10-03, stage w1-hiw-faq):

- **FAQ-1** is a plain page header (no hero photo, `h1` type). "WhatsApp us" is a `wa.me` link carrying the `/faq/`
  prefill `PAGE_PREFILL['/faq/']` ("Hi PetDoorStep, I have a question that isn't on your FAQ page: ___"),
  `data-source="faq_page"` (`09` §2d `<slug>_page`). The sticky bar and desktop float use the same prefill.
- **Jump-links**: `<nav aria-label="FAQ categories">`, one link per category H2 (anchors in §3), labels = the H2s.
  Wrapping pill links up to `lg`; from `lg` a sticky column beside the questions. Zero JS.
- **Category sections**: `Faq.astro` per category — H2 = the §3 category, its one-line link under it, questions as
  H3 accordions (`<details>`, all closed).
- **CTA band**: H2 "Got your answer? Book your first visit in 2 minutes." (`FAQ_CTA_HEADING`, echoing
  `how-it-works.md` HW-7 and `about.md` AB-9) · [Book on WhatsApp] → `wa.me` with the booking prefill every other
  non-money page uses, naming this page: "Hi PetDoorStep! I want to book a service (from your FAQ page). My area: ___ .
  My pet: ___" · [Call [FILL:PHONE]] → `tel:` · both `data-source="ctaband_faq"` · R3 reply line.
- **JSON-LD**: one `@graph` = FAQPage (all 28 entries, in §3 order, verbatim) + BreadcrumbList (`04` §2.9).

## 6 · Ship checks (verified 2026-10-03, stage w1-hiw-faq — `decisions/w1-hiw-faq.md` §3)

- [x] `faq.json` exists; every page's FAQ renders from it (no FAQ text hard-coded in any page) — these two pages; site-wide at the `--all` audit
- [x] All 28 entries present; FAQPage markup on `/faq/` lists all 28, verbatim
- [x] CI check: ₹ figures in answers match `pricing.json`
- [x] `faq-s3` contains no cost promise (policy gate, `safety-hygiene.md` SH-7)
- [x] Title and H1 exactly as §1 (title 59, meta 155 with no double quotes, H1 40); both carry *pet grooming at home
      questions* verbatim (`02` P012/P026); the H1 appears on no other page (P027)
- [x] Every jump-link resolves to a category H2 on the page; category links render only for live targets (P074)
- [x] At least one other indexable page links here from its `<main>` (`02` P068): `/how-it-works/` HW-6 does
