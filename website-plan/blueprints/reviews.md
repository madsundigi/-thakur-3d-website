# B15 · REVIEWS — `/reviews/`

> Page blueprint (custom anatomy). Display rules from `06-CONVERSION-PLAYBOOK.md` §4.4; review engine from
> `05-LOCAL-SEO.md` §3. **Google is the source of truth** — this page curates real Google reviews and sends people to
> Google to verify them. **No Review / AggregateRating markup anywhere** (`04-TECHNICAL-SEO.md` §2.0.4).

| URL | Wave | Schema | Status |
|---|---|---|---|
| `/reviews/` | 2 — publish only once ≥ 10 real Google reviews exist | BreadcrumbList only | blueprinted |

**Until this page is live,** the header-nav "Reviews" item is not rendered at all (`08` §4.3 live-only nav), so the nav
never points at a missing page; the footer ★ line links `[FILL:GBP_LINK]` meanwhile.

## 1 · Head

- **Title** (53): `Reviews – What Ludhiana Pet Parents Say | PetDoorStep`
- **Meta** (147): `Real Google reviews from Ludhiana pet parents who book PetDoorStep for grooming, walking and vet visits at home — with locality, breed and service.`
- **H1:** `What Ludhiana Pet Parents Say About PetDoorStep`

### 1a · SERP-intent check (`02` P040) — 2026-10-08

- **Query:** `petdoorstep reviews` (01-SITEMAP primary = the brand review term) + the generic `pet grooming reviews
  ludhiana`. Checked 2026-10-08 with a US-located web-search tool, so the Ludhiana map pack and ads were not visible —
  re-check from a phone in Ludhiana before launch and log in `09` §7 (same caveat as the Wave-1 notes).
- **What ranks:** for a brand review term with no established brand yet, nothing self-hosted ranks — review intent for
  grooming in Ludhiana is served by **Google Maps / Business Profile listings** (Heads Up For Tails Gurdev Nagar 4.6★,
  Zigly Sarabha Nagar 4.8★) and **directory/aggregator pages** (Justdial, Salonist). No independent operator ranks with
  its own on-site review page; reviews live on GBP and the directories.
- **Intent:** trust / verification — a visitor cross-checking proof before booking. The win is a verifiable Google
  rating, not a self-hosted wall of testimonials.
- **How this page matches:** it curates real Google reviews and **sends people to Google to verify them** (the proof
  bar + the E6 empty state both link the GBP), carries **BreadcrumbList only — zero Review/AggregateRating markup**
  (`04` §2.0.4, `02` P086), and never shows a rating Google doesn't back. That is the opposite of thePetNest's
  un-checkable self-hosted counts — exactly the differentiator §3 calls for. The page publishes only once ≥ 10 real
  Google reviews exist (§4).

## 2 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| RV-0 | Breadcrumb | `Home › Reviews` |
| RV-1 | Header | H1 · line "Every review here is a real Google review — tap through and check." |
| RV-2 | **Proof bar** | "★ [FILL:GOOGLE_RATING] on Google · [FILL:REVIEW_COUNT]+ reviews" (values from the single reviews data file, refreshed monthly per `09-ANALYTICS-TRACKING.md` §8) · [See all reviews on Google] → `[FILL:GBP_LINK]` · [Write a review] → `[FILL:GBP_REVIEW_LINK]` |
| RV-3 | **Filters** (zero-JS anchor chips) | By service: Dog grooming · Cat grooming · Walking · Vet & vaccination · By area: the localities that have ≥ 2 reviews. Each chip jumps to a section heading |
| RV-4 | **Review cards** | 12–24 curated `ReviewCard`s, grouped by service: quote **verbatim from Google** (trim only with "…", never reword) · first name · locality · pet + breed · service · ★ row · month-year · "Google review" label. Mix of short and detailed; never only 5-star-sounding ones — include a 4-star with its owner reply where one exists |
| RV-5 | **Before & after** | 4–6 `BeforeAfter` pairs (consented, `06` §4.3) linking to the matching service page |
| RV-6 | **Video testimonials** | Phase 2 slot — not rendered in Phase 1 |
| RV-7 | **Not happy?** (H2) | "Had a not-so-great experience? Tell us on WhatsApp — a real person reads every message and replies within 10 minutes (9:00–19:00). We'd rather fix it than lose your trust." + [WhatsApp us] |
| RV-8 | CTA band | "Join them — book your first visit in 2 minutes." + [Book on WhatsApp] |

## 3 · Rules

- Quoting public Google reviews is allowed; still ask permission when featuring a pet's photo (`06` §4.3).
- Never display a rating or count Google doesn't show; numbers live in one data file (`06` §4.4).
- Never incentivise reviews, never write them, never filter out negative ones from the Google count (`05-LOCAL-SEO.md` §3.6).
- Refresh monthly: add new reviews, rotate cards so each locality and service stays represented.

## 4 · Ship checks

- [ ] ≥ 10 real Google reviews exist; every card quoted verbatim with a matching Google review
- [ ] Zero Review/AggregateRating markup (validate with the Rich Results Test — expect none)
- [ ] `/reviews/` set to `live` in `website/src/data/routes.ts` on publish day (this makes the nav + footer links appear)

## 5 · As built (stage w2-trust-a, 2026-10-08 — `website/src/pages/reviews.astro`)

Built on the shared layout + components; copy in `src/data/pages/reviews.ts`, the dormant grouped-card renderer in
`src/components/pages/reviews/ReviewWall.astro`. Decisions: `decisions/w2-trust-a.md`. The route stays `planned` until
the integrator flips it live (`requests/w2-trust-a.md` A1); until then the nav "Reviews" item, the footer ★ line and
this page's own sitemap entry do not appear. Zero client JS.

- **Head:** title 53 / meta 147 / H1 47 verbatim (§1). JSON-LD one `@graph` = **BreadcrumbList only** (`schemaGraphLd({ type: 'breadcrumb-only' })`, `04` §2.9); crawl confirms zero `Review`/`AggregateRating`/`aggregateRating` on the page (`02` P086, `04` §2.0.4).
- **RV-0:** `Home › Reviews` (labels from `routes.ts`; the schema BreadcrumbList mirrors the two visible crumbs).
- **RV-1:** a plain page header — `h1.t-h1` + the RV-1 line (no hero, no CTA: RV-1 names none). Same pattern as `/faq/` FAQ-1.
- **RV-2:** the shared ★ proof line (`PROOF_LINE`, `reviews.ts` = `06` §4.4 "…`[FILL:REVIEW_COUNT]`+ Ludhiana pet parents", **not** the blueprint's paraphrase "+ reviews" — decision TR-02, keeps it byte-identical with the footer and honours RV-2's "the single reviews data file") linked to `site.gbpLink`, then two buttons: **[See all reviews on Google]** → `site.gbpLink` (`[FILL:GBP_LINK]`) and **[Write a review]** → `[FILL:GBP_REVIEW_LINK]` (held in `reviews.ts`; request B1 moves it to `site.ts`). Both GBP links are external, new-tab; no `data-source` (not wa.me/tel/ig).
- **RV-3 + RV-4:** **dormant** — `reviews.ts` holds only `[FILL:REVIEW_n]` seeds, so `reviewsReady()` is false and the **E6 empty state** (`REVIEWS_EMPTY_STATE`, with its `[FILL:GBP_LINK]` URL as the live GBP link) renders in their place (exactly the brief: "the empty state + the GBP link"). When real Google reviews are collected, `ReviewWall.astro` mounts the cards **grouped by service** in the RV-3 order (Dog grooming · Cat grooming · Walking · Vet & vaccination, `REVIEW_SERVICE_FILTERS`) with zero-JS anchor chips jumping to each service section and to the first card of every locality with ≥ 2 reviews (decision TR-03). No fabricated review ever ships (`02` P055).
- **RV-5 (before/after) + RV-6 (video):** render nothing — `reviews.ts beforeAfterPairs` is empty (real, consented pairs only, `06` §4.3) and video is a Phase-2 slot. Both appear by themselves once their media exists.
- **RV-7:** H2 "Not happy?" + the quote verbatim ("Had a not-so-great experience? …") + **[WhatsApp us]** → a *feedback* wa.me prefill (`REVIEWS_FEEDBACK_PREFILL`, new copy — RV-7 words none), `data-source="reviews_page"`.
- **RV-8:** CTA band, heading verbatim, **[Book on WhatsApp]** → wa.me with the booking prefill naming this page (`REVIEWS_BOOK_PREFILL`) + **[Call `[FILL:PHONE]`]** → `telHref()`, both `data-source="ctaband_reviews"`, R3 reply line. The page chrome (sticky bar, float, header) carries the same booking prefill via `Base waText`.
- **Gates (build env `PUBLIC_PDS_PREVIEW_LIVE=wave1`):** `check:prices` OK · `check:budgets` 0 FAIL/0 WARN (CSS 42,962 B) · `test:site` 0 FAIL (overflow/console/http/axe/ld+json/CLS 0 at 360/768/1280; 11 tracked wa.me/tel links) · `check:pages` only the by-design self-canonical P074 (the route is `planned` pre-merge — clears when the integrator flips it live, A1). Nothing else FAILs.
