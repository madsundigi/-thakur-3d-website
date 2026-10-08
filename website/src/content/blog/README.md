# Blog posts — front-matter contract

One Markdown file per post lives here as `src/content/blog/<slug>.md`. The schema is enforced at build time by
`src/content/config.ts`; a file that breaks it fails `astro build`. Anatomy, voice and the per-format body scaffolds
are in `website-plan/blueprints/_TEMPLATE-blog-post.md` (read it before writing). Prices come only from
`pricing.json` (never typed), and medical facts are reviewer-gated per the template.

This file is documentation, not a post — the collection glob excludes `README.md`, so it never renders.

## Required front-matter

```yaml
---
title: "Dog Grooming Price List in Ludhiana (2026): Every Service, Every Size, Real Rates"  # = H1; ≤ 110 chars
seoTitle: "Dog Grooming Cost in Ludhiana (2026 Guide) | PetDoorStep"  # <title>; ≤ 60 chars (drop " | PetDoorStep" if over)
description: "Dog grooming at home in Ludhiana — a full price breakdown by size and package, what each groom includes, and how to avoid doorstep surprises."  # meta; 120–158 chars, answer-first
slug: "dog-grooming-price-list-ludhiana"   # lowercase-hyphenated, year-free; the /blog/<slug>/ URL; never changes after publish
date: 2026-11-02                            # first publish (YYYY-MM-DD)
updated: 2026-11-05                         # optional; bump on every substantive refresh
keywords: ["dog grooming cost in ludhiana", "dog grooming price list ludhiana"]  # ≥ 1
funnel: "BOFU"                              # TOFU | MOFU | BOFU
format: "price-guide"                       # guide | listicle | price-guide | checklist | seasonal
category: "Grooming"                        # one of the six index categories (see below)
moneyPage: "/pricing/"                      # mandatory BOFU link (descriptive anchor in the first half of the body)
secondaryPage: "/ludhiana/dog-grooming/"    # optional; one body link
season: "Evergreen"                         # or the 10 §2.2 season band
heroImage: "dog-grooming-price-list-ludhiana.jpg"  # 08 §5.2 filename in src/assets/photos/ (renders a placeholder until the shoot)
heroAlt: "Shih Tzu after a Full Groom at home in Model Town, Ludhiana"  # ≤ 125 chars, no "image of"
related: ["puppy-vaccination-schedule-india"]  # up to 2 live post slugs → BlogCards (BP-10)
---
```

### Optional — only when a real vet reviewed the post (BP-8)

```yaml
reviewer:
  name: "Dr. …"           # the real reviewer's published name
  credential: "BVSc & AH"
  registration: "…"        # their veterinary council registration number
```

Omit the whole `reviewer:` block when no vet reviewed it. When present, the post renders the "Medically reviewed by …"
box and adds `reviewedBy` to the BlogPosting JSON-LD. When absent, add the general-information line from the template.

## Field notes

| Field | Rule |
|---|---|
| `title` | = the H1. ≤ 110 chars (BlogPosting `headline` cap, 04 §2.7). |
| `seoTitle` | the `<title>`. ≤ 60 chars (check:pages holds it to 50–60). |
| `description` | answer-first meta, 120–158 chars; no double quotes. |
| `slug` | lowercase-hyphenated, year-free; matches the `/blog/<slug>/` URL and the routes.ts entry. |
| `date` / `updated` | ISO `YYYY-MM-DD`. `dateModified` falls back to `date` when `updated` is omitted. |
| `category` | exactly one of: `Grooming`, `Health & vaccination`, `Ticks & seasons`, `Walking`, `Cats`, `Puppies`. |
| `moneyPage` | site-absolute path; the BP-5 BOFU link + card. |
| `heroImage` | a filename in `src/assets/photos/`. The 1200×630 og:image is derived as `/og/blog/<slug>.jpg` — add that crop to `public/og/blog/`, or the build fails. |
| `related` | up to 2 slugs; a card shows only while that post's route is live. |

## og:image

The post's share image is `/og/blog/<slug>.jpg` (04 §2.7, 1200×630 ≤ 300 KB). Add it to `public/og/blog/` before the
post ships; `og:type` is set to `article` with `article:published_time` / `article:modified_time` automatically.

## Before a post goes live

Add the post's row to `src/data/lastmod.ts` (its real publish date) and flip its route in `src/data/routes.ts` to
`live` in the same commit — that is what makes `/blog/` link it and the sitemap list it.
