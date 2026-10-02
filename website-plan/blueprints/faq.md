# B11 · FAQ — `/faq/` + the shared FAQ data file

> Page blueprint for the master FAQ, plus the **single FAQ data source** every page renders from. Obeys
> `00-MASTER-PLAN.md`; Hinglish policy `03-KEYWORD-MAP.md` §5. Objection answers from `06-CONVERSION-PLAYBOOK.md` §6
> are already embedded in the page blueprints referenced below.

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/faq/` | 1 | FAQPage + BreadcrumbList | blueprinted |

## 1 · Head

- **Title** (52): `Pet Grooming at Home FAQs for Ludhiana | PetDoorStep`
- **Meta** (155): `Answers to every question about pet grooming, dog walking and vet visits at home in Ludhiana — prices, safety, hygiene, timings, payment and service areas.`
- **H1:** `Pet Care at Home — Your Questions, Answered`

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

## 3 · The `/faq/` page — 27 questions in 6 categories

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

## 4 · New entries written for this page

- **faq-s1 · What does "background-verified" actually mean?** — Before their first visit, every groomer and walker submits government ID and address proof, and we call two references. They then pass a skills trial on a volunteer pet, train on our hygiene and handling standards, and complete three supervised visits before working alone. You see their name and photo on WhatsApp before they arrive.
- **faq-s2 · What safety measures do you follow inside my home?** — Your groomer wears an ID badge, opens a sealed, sanitised kit in front of you, works only in the space you choose, and cleans up before leaving. You're welcome to watch everything — that transparency is the whole point of a doorstep service.
- **faq-s3 · What happens if something goes wrong during a visit?** — We stop immediately, tell you on the spot, and help you get a vet check right away — from our partner vet or the nearest clinic. We'd always rather pause a groom than push a stressed or unwell pet.
- **faq-a1 · Do you serve outside Ludhiana?** — Not yet — we're Ludhiana-only while we get every detail right. Choose "Outside Ludhiana" in the booking form to join the waitlist: you'll be first to know when we reach your city, plus ₹200 off your first groom.
- **faq-a2 · Will you offer boarding, training or pet supplies?** — They're planned for a later phase and aren't available yet. Message us on WhatsApp to join the waitlist, and we'll tell you first when they launch.

## 5 · Blocks around the accordion

FAQ-0 breadcrumb `Home › FAQ` · FAQ-1 H1 + "Can't find your question? WhatsApp us — a real person replies within 10 minutes (9:00–19:00)." · category jump-links (anchors) · the 6 category sections · CTA band [Book on WhatsApp] + [Call [FILL:PHONE]].

## 6 · Ship checks

- [ ] `faq.json` exists; every page's FAQ renders from it (no FAQ text hard-coded in any page)
- [ ] All 27 entries present; FAQPage markup on `/faq/` lists all 27, verbatim
- [ ] CI check: ₹ figures in answers match `pricing.json`
- [ ] `faq-s3` contains no cost promise (policy gate, `safety-hygiene.md` SH-7)
