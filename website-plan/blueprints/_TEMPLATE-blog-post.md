# T3 · BLOG-POST TEMPLATE — anatomy for every `/blog/<slug>/` post + the `/blog/` index

> This file owns post structure, front-matter and the per-format scaffolds. It obeys `00-MASTER-PLAN.md` (slug rules
> §5, prices §3.2 only). Topics, keywords, money-page assignments and dates come from `10-CONTENT-CALENDAR.md` §2.2;
> the weekly production steps are `10-CONTENT-CALENDAR.md` §3; refresh rules §4. Schema per `04-TECHNICAL-SEO.md` §2.7.

---

## 0 · Why every post exists (the three jobs)

1. **Win an informational query** Ludhiana pet parents actually ask (keyword from `10` §2.2).
2. **Pass authority to one money page** — the BOFU link in the first half (rule `01-SITEMAP.md` §2.4).
3. **Prove expertise** (E-E-A-T) — real experience, real local detail, a real reviewer when medical.

A post that can't name its money page and its local angle doesn't get written.

---

## 1 · Front-matter (Astro content collection — every field required unless marked optional)

```yaml
title: "Dog Grooming Price List in Ludhiana (2026): Every Service, Every Size, Real Rates"   # = H1; year bumped at refresh
seoTitle: "Dog Grooming Cost in Ludhiana (2026 Guide) | PetDoorStep"   # ≤ 60 chars; drop " | PetDoorStep" if over
description: "Dog grooming in Ludhiana costs ₹599–₹2,799 at home depending on size and package. Full price breakdown and what's included."  # ≤ 155 chars, answer-first
slug: "dog-grooming-price-list-ludhiana"     # from 10 §2.2; year-free; never changes after publish
date: 2026-11-02                             # first publish
updated: 2026-11-02                          # bump on every substantive refresh (10 §4)
keywords: ["dog grooming cost in ludhiana", "dog grooming price list ludhiana", "pet grooming charges"]
funnel: "BOFU"                               # TOFU | MOFU | BOFU
format: "price-guide"                        # guide | listicle | price-guide | checklist | seasonal
moneyPage: "/pricing/"                       # primary (mandatory BOFU link, first half)
secondaryPage: "/ludhiana/dog-grooming/"     # optional — one body link
season: "Evergreen"                          # or the 10 §2.2 season band
reviewer:                                    # optional — ONLY when a real vet actually reviewed it
  name: "[FILL:VET_PARTNER_NAME]"
  credential: "BVSc & AH"
  registration: "[FILL:VET_REG_NO]"
heroImage: "./images/<slug>-hero.jpg"        # real photo; 1200×630 crop doubles as og:image
heroAlt: "Shih Tzu after a Full Groom at home in Model Town, Ludhiana"
related: ["how-often-bathe-dog-india", "full-dog-grooming-package-included"]   # 2 slugs, both live
```

---

## 2 · Block index (DOM order)

| # | Block | Rule |
|---|---|---|
| BP-0 | Breadcrumb | `Home › Blog › {short title}` — BreadcrumbList, 3 items |
| BP-1 | Header | H1 = `title`; dek (1 sentence, ≤ 25 words); byline "By [FILL:AUTHOR_NAME], PetDoorStep" + date + "Updated {updated}" when different; reviewer line only if `reviewer` set |
| BP-2 | Answer-first intro | First ≤ 100 words **answer the query directly** with a specific fact (number, age, price, month). Primary keyword in the first sentence. No throat-clearing ("In today's world…") |
| BP-3 | TL;DR box | 3–5 bullets, each a standalone fact a reader could screenshot; boxed (`mint` surface token) |
| BP-4 | Body scaffold | H2/H3 per the format scaffold in §3; one table or checklist minimum (snippet + AI-answer extraction) |
| BP-5 | BOFU contextual CTA | **Inside the first half of the body** — a sentence with a descriptive anchor to `moneyPage` (e.g. "see every size and price on our **dog grooming price list**") + a small card (service name, from-₹ from `pricing.json`, [Book on WhatsApp] with `src={slug}_page`, the `<slug>_page` pattern of `09` §2d; ≤ 40 characters in all, so shorten a long slug) |
| BP-6 | Images | 2–5 real photos; alt per `08-DESIGN-SYSTEM.md` §5.4; lazy except hero; captions where the photo proves experience ("Taken during a Full Groom in Dugri") |
| BP-7 | FAQ section | 3–5 Qs from People-Also-Ask phrasing, 40–80-word answers. Plain HTML — **no FAQPage markup on blog posts** (`04-TECHNICAL-SEO.md` §2.9 gives posts BlogPosting + BreadcrumbList only) |
| BP-8 | Expert-review box | Health/vaccination/tick/deworming posts: "Medically reviewed by {reviewer.name}, {credential}, Reg. No. {registration} on {date}." **Only if a real vet reviewed it** — otherwise omit the box and add the line "This guide is general information; for your pet's specific needs, book a vet visit." |
| BP-9 | Author box | Real person, real photo, 2 lines of genuine pet experience; links `/about/` |
| BP-10 | Related posts | The 2 `related` slugs as `BlogCard.astro` (live posts only) |
| BP-11 | End CTA band | `CtaBand.astro`; the money page's ready hero subhead (`06-CONVERSION-PLAYBOOK.md` §2.3) as support line |

---

## 3 · Format scaffolds (H2 skeletons — pick by `format`)

**price-guide** (BOFU, 1,200–1,800 words): Answer + price range (BP-2) → H2 "{Service} prices in Ludhiana by size"
(our table from `pricing.json`) → H2 "What's included at each price" → H2 "What changes the price (and what never
should)" → H2 "Market rates in Ludhiana" (competitor figures **only** with the caveat "market prices mined from SERP
snippets 2026-10; re-verify before publishing" — `06-CONVERSION-PLAYBOOK.md` §5.6) → H2 "How to avoid hidden
charges" → FAQ.

**guide** (MOFU/TOFU, 1,000–1,600 words): Answer → H2 "The short answer" (table/chart) → 3–5 H2 sections, each opening
with its conclusion → H2 "When to call a professional" (BOFU link lives here or earlier) → FAQ.

**checklist** (800–1,200 words): Answer → H2 "The checklist" (numbered, each item ≤ 2 lines) → H2 "Why each step
matters" → H2 "Printable / WhatsApp version" (lead magnet per `10-CONTENT-CALENDAR.md` where specified) → FAQ.

**listicle** (1,000–1,500 words): Answer naming the winner/criterion → H2 "Comparison table" → one H2 per option
(pros · cons · cost · who it suits) → H2 "Our recommendation" (vendor-neutral; service CTA last) → FAQ.

**seasonal** (900–1,400 words): Answer with the Ludhiana date range → H2 "{Season} in Ludhiana: what changes for your
pet" → H2 month-by-month table → H2 "Daily routine" → H2 "Warning signs — call a vet" → FAQ. Publish ahead of the
season per the `10` §2.2 timing column.

---

## 4 · Writing rules (beyond `06-CONVERSION-PLAYBOOK.md` §1 voice)

1. Every ₹ figure from `pricing.json` / `00-MASTER-PLAN.md` §3.2; medical facts verified against a vet source and,
   for health posts, reviewed by `[FILL:VET_PARTNER_NAME]` before publishing.
2. One local proof point per H2 where natural (a locality, a Ludhiana temperature, a Punjab season, a breed we groom).
3. Never claim services from the `00-MASTER-PLAN.md` §3.2 "Not offered in Phase 1" list.
4. Hinglish: max one natural phrase, in the intro or an FAQ (`03-KEYWORD-MAP.md` §5).
5. Internal links: exactly the `moneyPage` (first half) + `secondaryPage` (optional, body) + 2 related posts + relevant
   sibling posts — 3–8 total; descriptive anchors only (`02-SEO-PARAMETERS.md` P069–P071).

---

## 5 · Schema (`04-TECHNICAL-SEO.md` §2.7)

`@graph` = **BlogPosting** (`headline` = title, `description`, `datePublished` = date, `dateModified` = updated,
`author` Person = byline, `publisher` `{"@id":"https://[FILL:DOMAIN]/#business"}`, `image` = heroImage,
`mainEntityOfPage` = canonical URL; add `reviewedBy` only when `reviewer` is set) + **BreadcrumbList** (BP-0).

---

## 6 · INDEX VARIANT — `/blog/`

| Block | Spec |
|---|---|
| Head | Title `Pet Care Guides for Ludhiana Pet Parents \| PetDoorStep` (54) · Meta "Practical, vet-reviewed pet care guides for Ludhiana: grooming prices, vaccination schedules, tick season, summer walks and more." · H1 **Pet care guides for Ludhiana pet parents** |
| Intro | 2 sentences: who writes these (our groomers + partner vet), why (questions customers ask us on WhatsApp) |
| Category chips | Grooming · Health & vaccination · Ticks & seasons · Walking · Cats · Puppies — filter by anchor/tag page; zero-JS (links, not toggles) |
| Post grid | `BlogCard.astro`, newest first, 12 per page; `/blog/page/2/` etc. self-canonical per `04-TECHNICAL-SEO.md` §3 |
| Featured | Pin the current season's post (per `10` §2.2 season column) at top |
| CTA band | Default `CtaBand.astro` |
| Schema | BreadcrumbList (`Home › Blog`) |

---

## 7 · Required to ship (every post)

- [ ] Slug, keyword, funnel, money page exactly as `10-CONTENT-CALENDAR.md` §2.2 row
- [ ] `seoTitle` ≤ 60 chars; `description` ≤ 155 chars, answer-first; H1 = `title`
- [ ] First 100 words answer the query with a specific fact; TL;DR box present
- [ ] BOFU link to `moneyPage` sits in the first half with a descriptive anchor + BP-5 card
- [ ] Every ₹ figure matches `pricing.json`; competitor figures carry the re-verify caveat
- [ ] Reviewer box shown only when a real vet reviewed; otherwise the general-information line
- [ ] Real photos with compliant alts; no stock
- [ ] BlogPosting + BreadcrumbList validate with zero errors; no FAQPage markup
- [ ] Post-publish steps from `10-CONTENT-CALENDAR.md` §3 done (GSC URL inspection → request indexing; repurpose to Instagram + WhatsApp status)
