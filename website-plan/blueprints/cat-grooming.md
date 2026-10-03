# B03 · CAT GROOMING — `/ludhiana/cat-grooming/`

> Page blueprint. Inherits `_TEMPLATE-service-page.md` (block order, rules, defaults); this file supplies this page's
> values. Obeys `00-MASTER-PLAN.md`; keywords from `03-KEYWORD-MAP.md` §2.3.
> **SEO note:** research found **no dedicated Ludhiana cat-grooming page anywhere** — the easiest #1 on the site. Depth wins it.

| URL | Wave | Template | Schema `@graph` | Status |
|---|---|---|---|---|
| `/ludhiana/cat-grooming/` | 1 | T1 — all 14 blocks | Service + FAQPage + BreadcrumbList | blueprinted |

## 1 · Head

- **Title** (58): `Cat Grooming at Home in Ludhiana – From ₹899 | PetDoorStep`
- **Meta** (156): `Stress-free cat grooming at home in Ludhiana — no scary salon trips. Bath & Brush ₹899, Full Groom ₹1,399. Calm-handling trained groomers. Book on WhatsApp.`
- **H1:** `Cat Grooming at Home in Ludhiana`

## 2 · Keyword → block assignment

| Keyword (03 §2.3) | Role | Lands in |
|---|---|---|
| cat grooming ludhiana | P | Title · H1 · SP-1 subhead |
| cat grooming at home ludhiana | S | Title (contained) · SP-1 eyebrow *Cat grooming at home* |
| cat bathing service at home | S | SP-3 H2: **"Cat Bath & Brush — ₹899, everything included"** |
| cat groomer ludhiana | S | SP-7 supporting line |
| cat grooming near me | S | SP-9 intro line |
| why do cats hate salons / stress-free cat grooming | L | SP-7 H2 **"Why home beats the salon for cats"** (§3) |
| persian cat grooming at home | L | SP-4 H3 **"Persian & long-hair coat care"** (§3) |
| cat grooming price / charges ludhiana | L | SP-4 H2: **"Cat grooming price in Ludhiana — one flat price"** |
| cat matted fur removal · cat nail clipping | L | SP-3 rows · FAQ #3 |
| flea treatment for cats at home | L | FAQ #5 → `/ludhiana/tick-flea-treatment/` |
| how often should a persian cat be groomed | L | FAQ #4 → week-16 blog post |
| billi ko nehlana (Hinglish) | L | FAQ #8 + cat-bath photo alt |

## 3 · Block values

- **SP-1 Hero** (`06-CONVERSION-PLAYBOOK.md` §2.3): eyebrow *Cat grooming at home* · H1 above · subhead "Calm-handling trained groomers for your cat — no car ride, no strange salon smells. Bath & Brush ₹899 · Full Groom ₹1,399, flat price for all cats." · CTAs [Book on WhatsApp] → `/book/?src=hero_cat-grooming` (`00` §11 E1; amber, `08` §1.4) + [Call [FILL:PHONE]] · chips `from ₹899` + standard set with chip 4 swapped to `✔ Calm-handling trained for cats`.
- **SP-3 Package table** (inclusions from `00-MASTER-PLAN.md` §3.2 cat row):

  | Included | Cat Bath & Brush ₹899 | Cat Full Groom ₹1,399 |
  |---|---|---|
  | Lukewarm bath, cat-safe shampoo | ✓ | ✓ |
  | Gentle towel + blow-dry | ✓ | ✓ |
  | Brush-out & loose-coat removal | ✓ | ✓ |
  | Nail trim | ✓ | ✓ |
  | Ear & eye (tear-stain) clean | ✓ | ✓ |
  | De-matting | — | ✓ |
  | Hygiene trim | — | ✓ |
  | Comfort trim (Persians, on request) | — | ✓ |
  | Typical duration | ~45–60 min | ~60–90 min |

  Footnotes: template (a) + "Tight mats close to the skin are clipped, never pulled — we show you before we start."
- **SP-4 Prices** — flat-price list (no size matrix): `Cat Bath & Brush ₹899 · Cat Full Groom ₹1,399 — any breed, any coat` · `Flea treatment add-on ₹399 (cat-safe products)` · `Nail Trim + Ear Clean visit ₹299`. R1 + R2 beneath. Then **H3 "Persian & long-hair coat care"**:

  | Cat | At home, daily | With us | Rhythm |
  |---|---|---|---|
  | Persian / Himalayan | 5-minute comb, face & eye wipe | Full Groom (de-mat + comfort trim in summer) | every 4–8 weeks |
  | Long-haired mixed breed | 3–4 combs a week | Bath & Brush, Full Groom if mats form | every 6–8 weeks |
  | Short-haired & Indie cats | Weekly brush | Bath & Brush or just nails + ears (₹299 visit) | every 6–8 weeks |
- **SP-5** — Persian before/after pairs when ≥ 2 exist; else omitted (template rule).
- **SP-7** — H2 **"Why home beats the salon for cats"**, then 3 points before the groomer cards:
  1. "**No carrier, no car.** For most cats the journey is the worst part of grooming — at home it doesn't exist."
  2. "**No dog smells, no barking.** Your cat stays in its own territory, which keeps stress (and scratches) down."
  3. "**One groomer, your room, breaks allowed.** We pause whenever your cat needs to — nobody is waiting for the table."
  Supporting line: "Your cat groomer in Ludhiana is calm-handling trained and background-verified." Cards show cat specialities (e.g. "Persian cat de-matting").
- **SP-9 Areas** — Civil Lines · Kitchlu Nagar · Sarabha Nagar; intro "Looking for cat grooming near me? We visit homes across Ludhiana — these areas book cat grooming most:"
- **SP-11 Related** — Dog Grooming (`from ₹599`) · Tick & Flea Treatment (`₹699 · ₹399 add-on`). Blog link (once live): week-16 *How Often Should a Persian Cat Be Groomed in India?* → `/blog/persian-cat-grooming-schedule-india/`.
- **SP-12** — "Your Persian deserves a calm, stress-free groom at home. Slots this week across Ludhiana." Support: "Flat ₹899 · no advance payment · photo update after the groom."
- **SP-13** — sticky label `Book · from ₹899`.

## 4 · FAQ (SP-10 — 8 Q&As, mirrored verbatim in FAQPage markup)

1. **How much does cat grooming at home cost in Ludhiana?** — One flat price for every cat, any breed or coat: Bath & Brush ₹899, Full Groom ₹1,399. There's no travel charge in Ludhiana and no advance payment — pay by UPI or cash after the session. The price is confirmed on WhatsApp before we arrive.
2. **How do you groom a cat that hates being handled?** — At home most cats are far calmer — no carrier, no car, no dog smells. Our groomers use low-stress handling: nails first, a gentle towel-wrap hold and short breaks, with you nearby. We never sedate. If your cat is too stressed to continue safely, we stop rather than force it.
3. **My Persian has hard mats — can you remove them without shaving?** — Small mats can be worked out with de-matting tools during a Full Groom. Tight mats close to the skin are painful to comb out, so they're clipped — never pulled, which can tear skin. We show you the mats before starting and leave you a 5-minute daily combing routine so they don't return.
4. **How often should a Persian cat be groomed?** — A Persian needs a 5-minute comb every day at home and a professional groom every 4–8 weeks, with a bath as part of that groom. Short-haired and Indie cats need far less: a brush-out, nail trim and ear check every 6–8 weeks keeps them comfortable.
5. **Can you treat my cat for fleas?** — Yes, with cat-safe products only. Many dog anti-tick products contain permethrin, which is toxic to cats, so we never use them on cats. Add flea treatment to any groom for ₹399 or book it standalone for ₹699; for skin wounds or heavy infestations we'll suggest a ₹699 vet home visit.
6. **Is it hygienic if you groomed a dog before my cat?** — Yes. Every pet gets a fresh, sealed, sanitised kit opened in front of you — blades, combs and towels never move from one pet to another — and cats get cat-only shampoo. Your groomer is background-verified, and our full protocol is published on the safety page.
7. **How long does a cat groom take?** — Bath & Brush takes about 45–60 minutes and a Full Groom 60–90 minutes. We build in breaks whenever your cat needs one, so we never rush — calm beats quick with cats.
8. **Billi ko ghar pe nehlana hai — kaise book karein?** — Bilkul! Book on WhatsApp in under 2 minutes: choose Cat Grooming, pick your area and a time window, and we confirm the exact slot within 10 minutes (9:00–19:00). Flat ₹899 for Bath & Brush — pay by UPI or cash after the groom.

In-answer links: #4 → week-16 post (once live) · #5 → `/ludhiana/tick-flea-treatment/` + `/ludhiana/vet-at-home/` · #6 → `/safety-hygiene/`.

## 5 · Images

| Slot | Shot | Alt text |
|---|---|---|
| Hero | Calm-handling cat groom, the cat sitting on a towel at home (`08` §5.2 shot 5, `cat-grooming-at-home-ludhiana.jpg`) | Cat sitting calmly on a towel during cat grooming at home in Ludhiana (name the breed, e.g. Persian, once the photo shows it) |
| SP-3 | Cat in a shallow lukewarm bath, groomer's hands steadying it | billi ko nehlana — gentle cat bath at home in Ludhiana |
| SP-5 | Persian before/after (data file) | Persian cat before/after full groom at home in {Area}, Ludhiana |

## 6 · Page-specific ship checks

- [ ] Permethrin warning present in FAQ #5 (cat safety — non-negotiable)
- [ ] Every price is a flat cat price; no size matrix rendered on this page
- [ ] Exactly 2 Hinglish uses (FAQ #8 + SP-3 alt)
