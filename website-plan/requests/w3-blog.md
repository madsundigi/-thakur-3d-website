# Requests / open items — Wave 3 blog, 2026-10-09

For the owner (Sunny) and future waves. None blocks the 14 live posts.

- **Vet partner sign-off.** The four medical posts (`puppy-diet-plan-first-3-months`, `dog-deworming-schedule-india`,
  `dog-vaccination-cost-ludhiana`, `vet-home-visit-vs-clinic`) and the two Wave-1/2 health posts currently ship as
  general-information with the auto see-a-vet caveat. Once `[FILL:VET_PARTNER_NAME]` / `[FILL:VET_REG_NO]` are real, add
  a `reviewer:` block to each health post's front-matter to render the "Medically reviewed by …" box and `reviewedBy`
  schema (template BP-8). Same gate as `/ludhiana/dog-vaccination/`.
- **Competitor benchmarks re-verify.** `dog-walker-cost-india` and `dog-vaccination-cost-ludhiana` use October-2026
  SERP-mined ranges with the re-verify caveat. Re-check the live SERP before relying on the figures, and at the January
  price-refresh (10 §4), bump the year in the title + the figures.
- **Seasonal posts (weeks 15–26).** Publish ahead of each window, never after it peaks (10 §2.2 timing): pre-summer
  Feb–Mar, tick late-Mar→Apr, monsoon early-May. Each is a future ~1/week batch.
- **Real per-post share images + hero photos.** All 14 posts reuse `blog-default.jpg` for `/og/blog/<slug>.jpg` and
  render the placeholder hero. The photo shoot (08 §5.2) replaces both; regenerate a bespoke 1200×630 og crop per post.
- **Blog category/tag pages** (`/blog/<category>/`) stay Wave-3+ infra — the index chips become links when they exist
  (foundation decision D11). Not needed at 14 posts.
- **Pagination scales automatically:** `/blog/`, `/blog/2/`, `/blog/3/` … as posts grow; each new `/blog/N/` needs a
  `routes.ts` live entry + a `lastmod.ts` date in the commit that pushes the post count past that page boundary.
