# Requests from stage w2-trust-b (Wave 2 · trust pages B)

Things this stage needs from files it does not own. The decisions behind each are in
`website-plan/decisions/w2-trust-b.md`; the lawyer review points for /refund-policy/ are its §3.

## A · Integrator (merge commit)

| # | File | Request | Why |
|---|---|---|---|
| A1 | `src/data/routes.ts` | Flip `/offers/`, `/join-as-groomer/` and `/refund-policy/` from `'planned'` to `'live'` in the commit that merges `wave2/w2-trust-b` | The only `check:pages` FAILs today are each page's **self-canonical P074** (`<link rel=canonical>` / `og:url` → itself, route not live). They clear when the routes go live. Also switches on the in-body links that point here (A3) |
| A2 | `src/data/lastmod.ts` | Add `'/offers/': '2026-10-08'`, `'/join-as-groomer/': '2026-10-08'`, `'/refund-policy/': '2026-10-08'` | E7 / contract C6: the moment the routes are live, `check:pages --all` FAILs P127 ("no LASTMOD entry") and the build throws (`astro.config.mjs` live-route date guard). Date = this stage's build date; bump only on a material edit |
| A3 | — (verify, no edit) | **P068 inbound links already exist once the routes flip** — nothing to add: `/offers/` is linked contextually by the site-wide Groom Club CTAs → `/offers/` (sources.ts `groomclub`, Wave-1 contract C2) on `/pricing/` PR-8/PR-9 and the home H-10 tile; `/join-as-groomer/` by `/about/` AB-5 (`HIRING.links` "Join the team" → `/join-as-groomer/`, `isLive`-guarded); `/refund-policy/` by `/book/` and the FAQ refund answers (book-3 / how-it-works-3) once live. Confirm each resolves on the merged dist (`check:pages --all`) | 02 P068 (no orphan); the links are already written in those pages behind `isLive()` |
| A4 | `01-SITEMAP.md` / `00` §6 Wave-2 tracker | Tick `/offers/` and `/join-as-groomer/` as built; `/refund-policy/` as built **pending lawyer sign-off** (folds into the w1-legal review, D4). The `/refund-policy/` 01-SITEMAP row keeps `Blueprint` = "—" (no spec blueprint); `blueprints/refund-policy.md` is the as-built record | — |

## B · Shared-components owner (`src/components/pages/legal/`) — not blocking

| # | File | Request | Why |
|---|---|---|---|
| B1 | `LegalPage.astro`, `ContactLink.astro` | Widen the `path` prop union (today `'/privacy-policy/'` or `'/terms/'`) to also include `'/refund-policy/'` | `/refund-policy/` is built like the Wave-1 legal pages but could not reuse `LegalPage` / `ContactLink` because of the narrow union, so it inlines an identical shell + contact anchors (decision T2B-14). Widening lets a later refactor adopt the shared shell. Runtime is already fine (`routeLabel('/refund-policy/')`, `schemaGraphLd` breadcrumb-only, Base `NO_EXIT_CARD` all handle the path); only the TS types are narrow |

## C · Data owner (`src/data/services.ts`) — not blocking

| # | Request | Why |
|---|---|---|
| C1 | Add `PAGE_PREFILL` entries for the three pages: `/offers/` → a booking prefill (or leave to `WA_DEFAULT_TEXT`); `/join-as-groomer/` → the apply prefill `"Hi PetDoorStep, I want to apply as a groomer, walker or vet. Name:  Experience (years):  Area: "`; `/refund-policy/` → `"Hi PetDoorStep, I have a question about your Refund Policy: ___"` | `prefillFor()` falls back to the booking default for all three, so the header/sticky/float WhatsApp on the recruitment and legal pages currently says "I want to book a service". The pages pass their own correct prefill to `Base.waText` and to their in-page CTAs (so this is cosmetic for the chrome only), but one source is cleaner. No gate depends on it |

## D · Docs to sync (docs agent)

1. **`00-MASTER-PLAN.md` §11** — add a row when the integrator merges: "Wave-2 trust pages B built (offers B18,
   join-as-groomer B17, refund-policy B21 as-built); JG-4 process count is `hiringSteps().length` (5 while police
   verification is gated); /refund-policy/ lawyer review folds into w1-legal §3."
2. **`blueprints/join-as-groomer.md`** — JG-4 wording: the heading is "Our **5**-step process" today, recounting to 6
   automatically when `policy.policeVerified` flips true (decision T2B-10). Recorded in the blueprint's §4 As-built.
3. **`02` audit** — P040 SERP intent recorded for `/offers/` (offers.md §5) and `/join-as-groomer/` (join-as-groomer.md
   §5); P040 N/A for `/refund-policy/` (legal). P021 (CTA in meta): /offers/ meta leads with the ₹200-off offer (CTA-
   like); /join meta ends "Apply on WhatsApp in 2 minutes." (CTA present); /refund-policy/ N/A (legal).
4. **`00` §8** — the tokens this stage renders are already registered: `PAY_RANGES`, `VET_PARTNER_TERMS` (People),
   `SEASONAL_OFFER` (Offers), and the legal `IDENTITY.*` / `WHATSAPP_NUMBER` / `EMAIL`. No new token introduced.

## E · Sunny + lawyer / owner

- E1 · **/refund-policy/ review** — review the rendered page (preview build, `PUBLIC_PDS_PREVIEW_LIVE=wave1`) against
  `decisions/w2-trust-b.md` §3; it shares the `IDENTITY.*` tokens with the privacy/terms pages, so fill them once
  (w1-legal §3 / its requests C5).
- E2 · **`[FILL:PAY_RANGES]`** (join JG-2 tile 2) — publish the per-groom and monthly-walker pay, or the ship-check
  alternative "shared on your first call" (never a vague income promise). SERP benchmark (join-as-groomer.md §5): a
  nearby Amritsar groomer role listed ₹20,000–₹35,000/month, 1+ yr experience.
- E3 · **`[FILL:VET_PARTNER_TERMS]`** (join JG-3 Partner-vet card) — the partner-vet engagement terms.
- E4 · **`[FILL:SEASONAL_OFFER]`** — only when a real, dated offer is live: add it to the /offers/ OF-5 section and
  pass `live.seasonal` to the OfferCatalog (the page and schema both omit it until then). Give name, exact saving,
  start/end dates and terms (06 §7.4 honesty rules).
