# Requests / hand-off — Wave 2 FOUNDATION (`wave2/w2-foundation`)

What other builders and the integrator need to do with this stage's output. The pages are built and gate-green on the
branch with their routes **planned**; they go live when flipped (see below).

## For the integrator — exactly what to flip

1. **Routes → `live`** in `src/data/routes.ts` (in the commit that merges each piece, 05 §6.10 staggered publishing):
   - `/ludhiana/` (the hub — flip it first: every money-page breadcrumb starts linking "Ludhiana" the day it ships).
   - each `/ludhiana/areas/<slug>/` — **only after that area's §0 publish gate passes** (≥ 600 words / < 40 % shared,
     ≥ 2 real local proofs, `LANDMARKS_<SLUG>` + `PINCODES_<SLUG>` filled). Stagger: 3–4 proven pages first, then one
     every 2–4 weeks. Never all ten at once.
   - `/blog/` (the index) when the first posts land.
   - `/blog/dog-grooming-price-list-ludhiana/` and `/blog/puppy-vaccination-schedule-india/` — only once their `.md`
     files exist in `src/content/blog/` (the content builder owns them) and each has its `/og/blog/<slug>.jpg` crop.
2. **lastmod** is already set for all of the above in `src/data/lastmod.ts` (2026-10-08). Bump a date only when a page's
   content really changes; a blog post uses its real publish date.
3. **Wave-1 audit fix delivered:** the hub links every service + every area (fixes the Wave-1 hub-orphan). No further
   action beyond flipping `/ludhiana/` live.
4. **`Base.astro` was extended** (optional `ogType` + article-time props, backward-compatible — see decisions D5). Worth
   a glance since it is a shared Wave-1 layout; Wave-1 output is byte-identical (verified) and e2e stays 55/55.

## For Sunny (local facts — launch gate `check:fill`)

- `LANDMARKS_<SLUG>` × 10 — 2–3 real street landmarks our team uses for directions in each area (AP-2). Never guess.
- `PINCODES_<SLUG>` × 10 — the India-Post pin codes each area covers (AP-5). From India Post's lookup, never memory.
- `AUTHOR_NAME` (already in 00 §8) — the blog byline ("By {AUTHOR_NAME}, PetDoorStep") + BlogPosting author.
- Real local **reviews** per area (AP-4) and **before/after** pairs are still needed to pass each area's §0 gate.

## For the blog-post builder (owns `src/content/blog/*.md`)

- Follow the front-matter contract in `src/content/blog/README.md` (enforced by `src/content.config.ts`). Note the two
  additions to `_TEMPLATE-blog-post.md` §1: a required `category` field (one of the six §6 topics) and `heroImage` as a
  `src/assets/photos/` filename (not `./images/...`); `description` is 120–158 chars.
- Add each post's 1200×630 og crop to `public/og/blog/<slug>.jpg` (the build fails without it).
- `src/data/blog.ts` (`getBlogPosts` / `relatedPosts`) and `BlogCard.astro` render the listing + related rows
  automatically — nothing to wire. `related:` slugs render as cards only while those posts' routes are live.
- The Astro "collection blog is empty" build WARN disappears when the first `.md` lands.

## For the other Wave-2 page builders — what you can rely on

- The **preview switch** `PUBLIC_PDS_PREVIEW_LIVE=wave2` makes every wave ≤ 2 route count as live, so cross-links to
  your pages (and ours) render during review. `wave1` is unchanged.
- `isLive()` already gates links to the hub, the areas and the blog, so your pages linking them need no special-casing.
- `src/data/areas.ts` holds the per-area data layer (adjacency, anchor lines, road flag); `src/data/content.ts`
  `AREA_LINES` is unchanged.
- `src/data/sources.ts` now accepts `blog_page`, `hero_<post-slug>`, `ctaband_<post-slug>`, `<post-slug>_page` and the
  `blog_card` fixed source.

## Open follow-ups (not blockers for this stage)

- When the hub ships, append its keyword table to `03-KEYWORD-MAP.md` §2 (template §3 note, for P033's no-cannibal audit).
- Category **filter/tag pages** (`/blog/<category>/`) are Wave 3; the index chips become links then (decisions D11).
- Blog `/blog/page/2/` pagination is a Wave-3 concern (only needed past 12 posts; the index slices to 12 today).
