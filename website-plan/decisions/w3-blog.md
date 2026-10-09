# Decisions — Wave 3 (first 12 blog posts + /blog/ pagination), 2026-10-09

Folded into `00-MASTER-PLAN.md §11` (rows W3-1…W3-5). Kept here as build provenance.

- **Scope.** Sunny chose "all 12 shippable + pagination": calendar weeks 3–14 (3 seasonal timely + 9 evergreen), 14
  posts total. Weeks 15–26 (summer/tick/monsoon) held for their seasons — publishing them in October reads as stale.
- **W3-1 · Pagination `/blog/2/`** (04 §3.6), not `/blog/page/2/`. `src/pages/blog/[page].astro` (manual
  `getStaticPaths`, pages 2…N only; page 1 stays `/blog/`); visible prev/next `<nav>`, no `rel=prev/next`; self-canonical
  per page. Gate edits: `scripts/lib/plan.mjs` `/blog/\d+/`→BreadcrumbList row; `scripts/check-pages.mjs` exempts
  `/blog/\d+/` from P068 (orphan), the P161 drift set, and the P117 og:type classifier. `/blog/2/` is a live route +
  lastmod (P127). `PAGE_SIZE` lives inside `getStaticPaths` (Astro runs it isolated).
- **W3-2 · Dates.** All 12 dated 2026-10-09 (published today). Newest-first → 12 new on page 1, 2 originals on `/blog/2/`.
- **W3-3 · Index honesty.** Dropped the "vet-reviewed" / "partner vet" claims from `/blog/` (no vet signed).
- **W3-4 · Cannibalization.** `dog-vaccination-cost-ludhiana` = informational cost guide (keeps transactional terms on
  `/ludhiana/dog-vaccination/`); `dog-walker-cost-india` national-framed; `full-dog-grooming-package-included` keeps the
  transactional keyword in the body. Mirrors W2-6.
- **W3-5 · Stale docs overridden** (built reality wins): `10 §3 step 7` FAQPage, `10 §4` front-matter fields, the
  `/blog/page/2/` references. Blog og images reuse `blog-default.jpg` until the shoot (W2-5).
- **Production.** A `wave3-blog-posts` workflow: 1 competitor-research agent (WebSearch-refreshed dog-walker +
  vaccination benchmarks, caveated) → 12 parallel writers, each returning one post's Markdown (validated for head
  lengths, the single TL;DR class, the first-half BOFU link, the `/blog/` link, prices vs pricing.json). Integration,
  gates, audit, docs, push, preview by the main session.
