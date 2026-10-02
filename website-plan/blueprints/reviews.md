# B15 · REVIEWS — `/reviews/`

> Page blueprint (custom anatomy). Display rules from `06-CONVERSION-PLAYBOOK.md` §4.4; review engine from
> `05-LOCAL-SEO.md` §3. **Google is the source of truth** — this page curates real Google reviews and sends people to
> Google to verify them. **No Review / AggregateRating markup anywhere** (`04-TECHNICAL-SEO.md` §2.0.4).

| URL | Wave | Schema | Status |
|---|---|---|---|
| `/reviews/` | 2 — publish only once ≥ 10 real Google reviews exist | BreadcrumbList only | blueprinted |

**Until this page is live,** the header-nav "Reviews" item (`01-SITEMAP.md` §2.1) links to `[FILL:GBP_LINK]` in a new
tab, so the nav never points at a missing page.

## 1 · Head

- **Title** (53): `Reviews – What Ludhiana Pet Parents Say | PetDoorStep`
- **Meta** (147): `Real Google reviews from Ludhiana pet parents who book PetDoorStep for grooming, walking and vet visits at home — with locality, breed and service.`
- **H1:** `What Ludhiana Pet Parents Say About PetDoorStep`

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
- [ ] Nav "Reviews" switched from `[FILL:GBP_LINK]` to `/reviews/` on publish day
