# f2-components — requests to other agents, the orchestrator and Sunny

From stage f2-components (branch `wave1/f2-components`). Numbers come from
`website-plan/decisions/f2-components.md` §1. Each request names its owner.

## Chrome agent (Breadcrumb padding, StickyBar, Button, WaFloat)

| # | Request | Why / numbers |
|---|---|---|
| R-C1 | **Breadcrumb.astro: `py-3` → `py-2`** on the `<nav>` (E3). Only that class. I left the line alone, and my change in that file is a separate `::before` hit-area rule plus a `bc-link` class on the `<a>`. | It gives 8px of fold room on every money page. Dog/cat spare goes from 1.8px to 9.8px. Walking/vet still fail (+61.9 / +62.2). |
| R-C2 | **StickyBar: add `data-sticky-bar`** to the `<nav>` (contract C3). Note for the tests: the bar's 1px `border-t` puts its visible top at **583**, not 584, at 640px. Either measure the element's real top or move the border inside the 56px. | The fold tables use the stricter 583. |
| R-C3 | **StickyBar Book label wraps on dog-walking.** "Trial week ₹699 · Book" breaks onto 2 lines in the 1.4fr cell at 360px (seen in the fold screenshots). Consider a shorter label or a smaller step in the bar's type. | 08 §4.5 asks for "one line". |
| R-C4 | **WaFloat sits outside any landmark** (axe best-practice `region`, ≥ md on every page). Put it inside a landmark (e.g. an `<aside aria-label>`) or after the footer content. | axe run on the fold pages at 1280. |
| R-B1 | **Button.astro: pass through extra attributes** (`...rest`, at least `data-*`) onto the `<a>`. Then Hero can put `data-hero-primary` on the link itself. Today it's on a flex wrapper with the identical box. | Contract C3. The wrapper's rect equals the button's rect, so measurements work either way. |

## Gates / tests agent

| # | Request | Why |
|---|---|---|
| R-G1 | Hero hooks: `data-hero`, `data-hero-h1`, `data-hero-subhead`, `data-hero-primary` (wrapper, see R-B1), `data-hero-photo`, `data-hero-notice`. `data-hero-chip` sits on each chip `<li>` with the value `"price"` or `"trust"`. The price chip always comes first in the DOM. Below md the eyebrow and the secondary CTA are `display:none`. | Contract C3. |
| R-G2 | **e2e.mjs leaves a preview server running.** Under Astro 7, `astro preview` backgrounds itself when stdout isn't a TTY, with a per-project lock in `website/.astro/preview.json`. So `server.kill()` only kills the launcher. After a full 55/55 run I had to stop pid 20241 (port 4416) by hand. Add `npx astro preview stop` to the `finally` block, run from `website/`. | Leftover servers block the next run's port and lock. |
| R-G3 | Fold test: use the real bar top (583) or `≤ 584 − 1`. Also decide how strictly "≥ 1 trust chip fully visible" applies **horizontally**: as built, the first trust chip is clipped at 360 on every page (decisions §1.4). | Avoids a test that passes on paper but fails on review. |

## Data agent (`src/data/services.ts`, contract C1)

| # | Request | Why |
|---|---|---|
| R-D1 | Contract C1 is implemented as specified (`InfoTable table={PACKAGE_TABLES[…]}`). For the cat table, both columns may use `serviceId: 'cat-grooming'` (no badge). Per-column overrides then go by position: `columnNotes={[catBathPrice, catFullPrice]}`. The featured column is read from the pricing.json `badge`, so C1 needs no `featured` field. | Avoids duplicating "Most booked" in two sources. |
| R-D2 | `SERVICE_PRICE_CHIP` and `LOWEST_PRICE_CHIP` in `src/data/content.ts` are now **unused** by every component. ServiceCard uses `cardPriceChip()` (verified identical strings for all 7 money pages) and Hero callers use `heroPriceChip()`. They can be retired once nothing else imports them. | One price source (07 §4). |
| R-D3 | When `MONEY_PAGES[path].card = { blurb, photo }` lands, I or the layout agent can make ServiceCard's `blurb`/`photo` default to it. Today they stay required props. | Instruction 5: registry defaults wired later. |

## Layout / page builders (E4 and the pages)

| # | Note | |
|---|---|---|
| R-L1 | Vet-at-home: pass the SP-1 emergency line as `notice` (verbatim). It renders under the CTAs below md and under R3 from md. | vet-at-home.md SP-1 + ship check "Emergency line visible in SP-1 on a 360px screen". It currently fails the fold (exception, below). |
| R-L2 | /pricing/ PR-1: `<Hero compact … />` with no photo. | |
| R-L3 | SP-11 cards: pass `onPage` (`'vet-at-home'` or the page path) on every ServiceCard. The Tick & Flea chip then reads correctly per host page. | `cardPriceChip()` |
| R-L4 | SP-6 / H-4: put the R4 / support line and the "See the full process" link (only `isLive('/how-it-works/')`) inside `<StepsStrip>…</StepsStrip>` as children. Pass `headingId` if a page has two strips. | |
| R-L5 | Breadcrumb stays above the hero on money pages. Every pixel it takes counts against the fold: don't add margin between the breadcrumb and the hero. | Fold law. |

## Orchestrator → Sunny (decisions needed)

| # | Decision | Options (all measured — decisions §1.3/§1.4) |
|---|---|---|
| S-1 | **home fails P150 by 44.4px** | (a) Subhead: delete the closing sentence "Serving Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana." and "sanitised" → PASS, 8.3px spare. (b) Hide the Hinglish support line below md and shorten the closing sentence to "Serving all of Ludhiana." → PASS, 10.0. (c) Accept an exception. |
| S-2 | **dog-walking fails by 69.9 (61.9 after R-C1)** | (a) H1 "Dog Walker in Ludhiana" (drop " — Daily Walks from ₹2,999/month") → PASS, 1.8 / 9.8. (b) H1 "Dog Walker in Ludhiana — ₹2,999/month" plus the subhead cut to its first sentence → PASS only after R-C1 (0.3px, too thin). (c) Accept an exception. |
| S-3 | **vet-at-home fails by 70.2 (62.2 after R-C1)** with the mandatory emergency notice in the fold | Only fix found: subhead = first sentence AND notice cut to 2 lines (≈ 80 characters, e.g. "Not for emergencies — for accidents, poisoning or seizures, see a 24-hour vet.") → PASS, 2.6 / 10.6. That drops "heavy bleeding" from the safety line. **Recommendation: accept a P150 exception for vet-at-home and keep the full emergency line.** |
| O-1 | **First trust chip clipped at 360 on all pages** (E3 "≥ 1 trust chip fully visible", read horizontally) | (a) Ship the measured CSS-only fix: below md, show trust chip 1 before the price chip (flex `order`, DOM unchanged). Trust chip 1 becomes fully visible everywhere and the price chip is clipped instead; its figure is already in each subhead or H1. This reverses SP-1 rule 5's order on phones. (b) Keep SP-1 order and read E3 vertically. The leading words "✓ Background-verified…" stay readable. |
