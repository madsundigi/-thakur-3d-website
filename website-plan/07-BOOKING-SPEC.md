# 07 · BOOKING SPEC — the widget, WhatsApp handoff, lead storage & events

> This file owns the entire booking funnel — every CTA entry point, the 5-step widget, price computation, lead storage, the WhatsApp payload and booking analytics events. It obeys `00-MASTER-PLAN.md` (§3 facts are the only source of prices/services/areas, §5 URL rules, §8 placeholder policy). URLs come only from `01-SITEMAP.md`. A developer must be able to build everything below without asking a single question.

Related files: copy voice → `06-CONVERSION-PLAYBOOK.md` · UI tokens/components → `08-DESIGN-SYSTEM.md` · event registry → `09-ANALYTICS-TRACKING.md` · schema/noindex rules → `04-TECHNICAL-SEO.md` · page blueprint for `/book/` → `blueprints/book.md`.

---

## 1 · Principles (from the world-class teardown — see research notes; patterns from Groomit, Barkbus, Rover, Urban Company, Booksy)

1. **Price before contact.** The visitor sees an exact ₹ price (or honest "₹X + MRP" line) *before* we ask for their name or number. Groomit's "price in 60 seconds" and Barkbus's all-in pricing beat every "request a callback" competitor. No Ludhiana competitor publishes prices (market observation mined from SERP snippets 2026-10; re-verify before publishing any competitor claim).
2. **3–5 fields per step, 3–5 steps total.** Form research: progress indicators cut abandonment 20–25%; chips/selects beat typing; easiest questions first, phone number last. Our widget: 5 steps, max 5 inputs each, progress dots always visible.
3. **Progress dots, not "step 1 of 9".** Five dots + text "Step X of 5" (labels: Area · Service · Pet · Time · Contact).
4. **Honesty about confirmation (the Urban Company lesson: never fail the user late).** We do not fake live slot availability. Every schedule screen carries this exact line: **"Your slot is confirmed on WhatsApp within 10 minutes (9:00–19:00)."** Outside those hours the line becomes: **"Received after 7 pm? We confirm by 9:15 next morning."**
5. **No advance payment.** Shown on the review screen and in the prefilled message area, verbatim: **"No advance payment. Pay by cash or UPI after the service."** This single line is a conversion weapon in the Indian market.
6. **Never a dead end.** Out-of-area visitors become waitlist leads (§3, Step 1). Storage failure never blocks the WhatsApp handoff (§5). JS-disabled visitors still get static wa.me + tel links (§6).
7. **Price stays visible.** Once computable, a pinned price ribbon follows the user through every remaining step.

---

## 2 · Entry points

Every route into the widget carries a `source` value (query param `src` on links; constant for the page itself). `source` is stored with the lead and sent with events (§7).

| # | Entry point | Where it appears | Visible copy (verbatim) | Behaviour | `source` value |
|---|---|---|---|---|---|
| 1 | Sticky bottom bar (mobile only, <768px — per `06` §3.3 / `08` §4.5) | Every page except `/book/` (widget page) and `/thank-you/` | 3 buttons, left → right: `Call` · `WhatsApp` · `Book Now` (largest, right). On service pages the Book button shows the live from-price, e.g. `Full Groom from ₹1,199 · Book` | `Book Now` → `/book/?src=sticky_bar` (plus `&service=<id>` on service pages). WhatsApp = static wa.me link with page-specific prefill. Call = `tel:[FILL:PHONE]` | `sticky_bar` |
| 2 | Header `Book Now` button (every width: in the full nav from 1024px, compact beside the menu button below that — `08` §4.3) | Site-wide header per `01-SITEMAP.md` §2 nav | `Book Now` | → `/book/?src=header` | `header` |
| 3 | Hero CTAs | `/` and every money page hero | Labels come from the page's blueprint / `06` §2.3 ready hero (bank `06` §3.2): e.g. `Book on WhatsApp` (home, dog grooming, cat grooming), `Book Vet on WhatsApp`, `Start ₹699 Trial Week` (dog walking). A page whose blueprint names none uses `See prices & book` / `WhatsApp us` | **Primary → `/book/?src=hero_<page-slug>` on every page** (home = `hero_home`, e.g. `hero_dog-grooming`; `00` §11 E1), rendered amber even when its label says "WhatsApp" (`08` §1.4 rule 2). Dog walking adds the service: `/book/?service=dog-walking&src=hero_dog-walking`, so Trial Week, the default plan (§3 Step 2), is preselected (`00` §11 D2). Secondary = the blueprint's secondary: `tel:` Call, the in-page `#prices` anchor, or wa.me with the page prefill. Below `md` the secondary is hidden (`08` §4.6 fold law, E3) | `hero_<page-slug>` |
| 4 | Service-page body CTAs | On each `/ludhiana/<service>/` page: the CTA row after the social-proof strip (template SP-2, `00` §11 E4) and the mid-page CTA after the price matrix (SP-4). The page-end CTA is the SP-12 `CtaBand` (wa.me, source `ctaband_<slug>`, `09` §2d) | `Book <Service> — from ₹<price>`: ₹<price> is the price of the service or plan the link preselects, or the page's lowest price when it preselects nothing (`00` §11 E2; every figure from `pricing.json`) | → `/book/?service=<id>&src=service_<id>`. With nothing preselected: `/book/?src=service_<page-slug>` | `service_<id>` |
| 5 | Pricing table rows | `/pricing/` — each service×size cell row ends in a `Book` link | `Book` | → `/book/?service=<id>&size=<small\|medium\|large>&src=pricing_row` — preselects service and size; user still starts at Step 1 (area) | `pricing_row` |
| 6 | `/book/` page itself | Direct visits, GBP link, Instagram bio | Page H1 per `blueprints/book.md` | Widget mounts `client:visible` at top of content | `book_page` |
| 7 | Exit card (desktop only, once per session; `00` §11 D1, 2026-10-03) | Any page except `/book/`, `/thank-you/`, legal pages | Headline: `Before you go — your dog's grooming price in 10 seconds.` Body: `See the exact ₹ price for your pet's size and book in under a minute. Slot confirmed on WhatsApp within 10 minutes.` Buttons: `See prices & book` / `No thanks`. On `/ludhiana/cat-grooming/`, `/ludhiana/dog-walking/` and `/ludhiana/vet-at-home/` a neutral variant without dog-grooming wording (worded in the Wave-1 chrome build; the strings live with the component) | A small **non-modal corner card** (skin `08` §4.17a): no backdrop, the page stays usable, ≤ 15% of the viewport (`02` P107). Shown on `mouseleave` through the top viewport edge, only if: viewport ≥1024px AND `(pointer:fine)` AND ≥20s on page AND `sessionStorage.pds_exit_shown` unset AND no booking submitted on this device (`localStorage.pds_last_booking` unset). Sets `pds_exit_shown=1` on show (shown once per session whether dismissed or clicked). CTA → `/book/?src=exit_nudge`. Esc and `No thanks` close it (there is no overlay, so no overlay click) | `exit_nudge` |
| 8 | Desktop WhatsApp float (`08` §4.17) | Every page ≥768px except `/book/` and `/thank-you/` | WhatsApp glyph, label `Chat on WhatsApp` | Static wa.me link with page prefill (no widget) | `float_desktop` |

**Prefill query params accepted by the widget:** `service` (must match a `pricing.json` service id), `size` (`small|medium|large`), `src`. Invalid values are silently ignored. Prefills select the matching card/chip but never skip a step.

**Page-specific WhatsApp prefills** (sticky bar, desktop float, hero and `CtaBand` wa.me CTAs) live in `website/src/data/services.ts`: `MONEY_PAGES[].waPrefill` for each money page and `PAGE_PREFILL` for other pages. A page with neither uses `WA_DEFAULT_TEXT` from `src/data/site.ts`.

---

## 3 · THE WIDGET — 5 steps + review

Global behaviour:

- Progress: 5 dots + visually-hidden/adjacent text `Step X of 5`. Dot labels: `Area · Service · Pet · Time · Contact`. Completed dots are tappable (go back); future dots are not.
- `Back` button on steps 2–5 and review; always preserves all entered data.
- `Next` is always tappable; tapping with invalid input shows inline error text under the field (never `alert()`), moves focus to the first invalid field, and announces the error (§9).
- Price ribbon: pinned directly under the dots from the moment a service is selected. Text patterns: size-priced service before size is known → `from ₹1,199 — exact price after size`; after size known → `Your price: ₹1,499 · Full Groom · Medium`; flat services show their §4 price string immediately.
- One step = one screen on a 360px phone; controls are chips/cards ≥44×44px (per `08-DESIGN-SYSTEM.md`).
- When a step is re-entered via a review-screen `Edit` link, the `Next` button label changes to `Save & review` and returns directly to the review screen.

### Step 1 — Area

| Field | Input type | Options / rules |
|---|---|---|
| Your area | `<select>` (native dropdown; renders as chips on ≥768px) | Exactly, in this order: `Sarabha Nagar` · `BRS Nagar` · `Model Town` · `Civil Lines` · `Dugri` · `Pakhowal Road` · `South City` · `Ferozepur Road` · `Haibowal Kalan` · `Kitchlu Nagar` · `Other area in Ludhiana` · `Outside Ludhiana` (source: `00-MASTER-PLAN.md` §3.3; the 10 names also come from `pricing.json → areas` so widget and area pages never drift) |
| Your area name (conditional) | text, required, max 60 chars | Shown only when `Other area in Ludhiana` is selected. Label: `Your area` · placeholder: `e.g. Jamalpur, Dugri Phase 2, Gill Road` |

- Microcopy under the dropdown: `We serve all of Ludhiana. These areas get priority same-day slots.`
- Validation: an option must be chosen. Error (verbatim): **"Please choose your area so we can check coverage."** Conditional field empty → **"Please tell us your area or city."**
- First interaction with this step fires `booking_started` (§7), once per session.

**Outside-Ludhiana path (waitlist capture — never a dead end):** selecting `Outside Ludhiana` replaces steps 2–5 with a single waitlist screen.

- Headline: `We're reaching your city soon.`
- Body: `PetDoorStep currently serves Ludhiana. Leave your number and we'll message you on WhatsApp the day we start in your area — no spam, promise.`
- Fields: `Your name` (text, required, max 60) · `Mobile number` (same validation as Step 5) · `Your area / city` (text, required, max 60, placeholder `e.g. Khanna, Jalandhar, Phagwara`).
- Button: `Join the waitlist`.
- On submit: store lead with `lead_type=waitlist` (§5a, same pipeline), fire `out_of_area_lead` (§7), show inline success state (no redirect): `Done! You're on the list for {area}. We'll WhatsApp you when we launch there.` plus a secondary link `Just visiting? Book for a Ludhiana address →` which returns to Step 1 with the area cleared.
- Errors: name/phone/area use the same verbatim messages as Step 5 / above.

### Step 2 — Service

Service cards in a 2-column grid (1-column <360px), each card: service name, from-₹ price chip, 2-line include list, radio behaviour (tap selects). **All labels, prices and includes render from `src/data/pricing.json` (§4) — no ₹ literal is ever hard-coded in a component.**

Card order and price chips (chip text derived from `pricing.json` by the rules in §4):

| Order | Card (label from pricing.json) | Price chip | Notes on card |
|---|---|---|---|
| 1 | Full Groom — badge `Most booked` | `from ₹1,199` | ✓ Everything in Bath & Brush ✓ Haircut & styling ✓ Paw + sanitary trim |
| 2 | Bath & Brush | `from ₹599` | ✓ Bath, blow-dry, brush-out ✓ Nail trim + ear clean |
| 3 | Premium Spa Groom | `from ₹1,799` | ✓ Everything in Full Groom ✓ De-shed/de-mat, masque, perfume |
| 4 | Puppy Intro Groom (under 6 months) | `₹699` | ✓ Gentle first-time groom |
| 5 | Cat Grooming | `from ₹899` | Selecting expands 2 radio pills: `Bath & Brush ₹899` (default) / `Full Groom ₹1,399`. ✓ Calm-handling trained |
| 6 | Dog Walking | `from ₹699 (trial week)` | Selecting expands 3 radio pills: `Trial Week ₹699` (default) / `1 walk/day ₹2,999/month` / `2 walks/day ₹4,999/month`. ✓ Fixed walker ✓ GPS + photo update |
| 7 | Vet Home Visit | `₹699 + medicines at MRP` | ✓ Registered veterinarians only |
| 8 | Vaccination at Home | `₹199 + vaccine MRP` | ✓ With reminder calendar |
| 9 | Tick & Flea Treatment | `₹699` | ✓ Also available as ₹399 add-on with any groom |
| 10 | Deworming Visit | `₹499` | ✓ Standard dewormer included |
| 11 | Nail Trim + Ear Clean visit | `₹299` | ✓ 20-minute quick visit |

- Groom Club (subscription, `00` §3.2) is **not** a widget card — a text link under the grid: `Want 15% off every month? See Groom Club →` → `/offers/`.
- Validation: one card selected. Error (verbatim): **"Please pick a service to continue."**
- Selecting a card sets the pet-type constraint for Step 3 (from `pricing.json → service.pet`): `dog` locks Dog, `cat` locks Cat, `both` leaves the toggle free.

### Step 3 — Pet

| Field | Input type | Options / rules |
|---|---|---|
| Pet type | 2-chip toggle | `Dog` / `Cat`. Locked (pre-selected, other chip disabled with reduced opacity) when the chosen service's `pet` is `dog` or `cat`. Free choice for `both` services |
| Size | 3 radio cards | `Small — under 10 kg (Shih Tzu, Pomeranian, Pug)` · `Medium — 10–25 kg (Beagle, Cocker Spaniel, Indie)` · `Large — over 25 kg (Labrador, German Shepherd, Golden Retriever)`. Kg guide is LAW from `00` §3.2. **Hidden** when pet type = Cat (cat prices are flat) and when service = Puppy Intro Groom (flat ₹699). Shown for all other services even when price is flat (helps the groomer pack the right kit) |
| Under-6-months confirmation (conditional) | checkbox, required | Only when service = Puppy Intro Groom. Label: `My puppy is under 6 months old` |
| Breed | text, optional, max 40 chars | Label: `Breed (optional)` · placeholder: `e.g. Shih Tzu, Labrador, Indie` |
| First groom with us? | 2 radio chips, required for grooming services only | `Yes, first time` / `Groomed before`. Shown only for: bath-brush, full-groom, premium-spa, puppy-intro, cat-grooming. Hidden otherwise |
| Coat condition | checkboxes, optional, 0–3 of | `Matting / tangles` · `Ticks or fleas` · `Heavy shedding`. Shown only for the same five grooming services |

- Validation: pet type required → error **"Is it a dog or a cat? Tap one."** Size required (when shown) → **"Pick your dog's size — a close guess is fine, the kg guide is right there."** Puppy checkbox unchecked → **"Puppy Intro Groom is for puppies under 6 months. Please tick to confirm, or pick Bath & Brush instead."** Breed too long → **"Breed looks too long — 40 characters max."**
- Logic hooks: `Ticks or fleas` checked + service is a dog groom (bath-brush/full-groom/premium-spa) → review screen shows the add-on toggle (§3 Review). `Matting / tangles` checked + service is bath-brush or full-groom → review screen shows the Premium-Spa suggestion (§3 Review). No new prices are invented — everything maps to `00` §3.2.

### Step 4 — Schedule

| Field | Input type | Options / rules |
|---|---|---|
| Date | horizontal strip of 7 date chips | Next 7 days. **Today is included only if the device time is before 15:00**; otherwise the strip starts tomorrow (still 7 chips). Chip format: `Today` / `Tomorrow` / `Sat 04 Oct`. Walking plans relabel the field `Start date` and **always start tomorrow** (the first walk follows a meet-and-greet) |
| Time window | 3 radio chips | `Morning 9–12` · `Afternoon 12–3` · `Evening 3–6` (fits service hours Mon–Sun 9:00–19:00, last booking 17:30, per `00` §3.1). When `Today` is selected, a window is disabled (greyed, not removed) if the current time is past that window's start (past 9:00 disables Morning, past 12:00 disables Afternoon; Evening stays because Today itself disappears at 15:00). Disabled-chip helper text: `Too soon for today — pick another window or day.` **Dog walking uses its own windows** matching the walk hours in `00` §3.2: `Morning walks 6:00–9:30` · `Evening walks 17:30–20:30`; the twice-daily plan shows one fixed chip `Morning + evening walks` |

- Honesty line, always visible on this step (verbatim): **"Your slot is confirmed on WhatsApp within 10 minutes (9:00–19:00)."** After 19:00 it becomes **"Received after 7 pm? We confirm by 9:15 next morning."**; before 09:00, **"Received before 9 am? We confirm by 9:15 this morning."**
- Validation: date required → **"Please pick a day for the visit."** Window required → **"Please pick a time window."** If a selected window becomes invalid (user left the tab open past the cutoff), on Next show: **"That window just closed for today — please pick another."**

### Step 5 — Contact

| Field | Input type | Options / rules |
|---|---|---|
| Your name | text, required, max 60, `autocomplete="name"` | — |
| Mobile number | `type="tel"`, `inputmode="numeric"`, `autocomplete="tel"`, max 16 raw chars (fits `+91 98765 43210`) | Normalise before validating: strip spaces/dashes/parentheses; strip leading `+91` or `91` (when 12 digits) or `0` (when 11 digits). Then must match **`^[6-9]\d{9}$`** |
| Anything we should know? | textarea, optional, max 300 chars, 3 rows | Placeholder: `Skin issues, anxious pet, gate / society entry instructions…` |
| WhatsApp consent | checkbox, **checked by default**, required | Label (verbatim): `Confirm my booking on WhatsApp at this number. We never spam or share your number.` Right after the label text, a link `Privacy policy` → `/privacy-policy/` (`00` §11 D4): opens in a new tab (`target="_blank" rel="noopener"`) so the booking stays open, and sits outside the `<label>` so tapping it never toggles the box. It renders once `/privacy-policy/` is `live` in `src/data/routes.ts` (`02` P074: no links to unpublished pages) |

- Errors (verbatim): empty name → **"Please tell us your name."** · name >60 → **"Name looks too long — 60 characters max."** · invalid mobile → **"Please enter a 10-digit mobile number starting with 6–9 (e.g. 98765 43210)."** · consent unchecked → **"We confirm every booking on WhatsApp — please tick to allow WhatsApp contact."** · note >300 → **"Note is too long — 300 characters max."**
- `Next` label on this step: `Review booking →`.

### Review screen (after Step 5, before handoff)

- Heading: `Check & confirm`.
- Summary rows, each with an `Edit` link that jumps to its step (and returns via `Save & review`): Area · Service (+plan) · Pet (type, size, breed, first-groom, coat flags) · Date & window · Name & mobile · Note.
- Price line (verbatim pattern): `Your price: {price_shown}` + sub-line `Fixed price — no doorstep bargaining, nothing extra at the door.` (trust fact, `00` §3.4). For `flat_plus` services the price line shows the full string, e.g. `Your price: ₹699 + medicines/vaccines at MRP`.
- Conditional add-on toggle (only when Step-3 `Ticks or fleas` is checked and service is a dog groom): `Add Tick & Flea Treatment +₹399` — toggling on adds ₹399 to the computed price and appends the add-on to the WhatsApp message.
- Conditional suggestion (only when `Matting / tangles` is checked and service is bath-brush or full-groom): one-tap switch card `Heavy matting? Premium Spa Groom includes de-matting — switch for ₹{spa price for chosen size}?` with buttons `Switch` / `Keep my choice`.
- Reassurance block (verbatim): `No advance payment. Pay by cash or UPI after the service.` + `Your slot is confirmed on WhatsApp within 10 minutes (9:00–19:00).`
- Primary button: `Confirm on WhatsApp →` (WhatsApp green per `08-DESIGN-SYSTEM.md`). Beneath it: `Prefer a call? [FILL:PHONE]` as a `tel:` link (fires `call_click`, source `review_screen`).

---

## 4 · Price computation — single source of truth

**File: `src/data/pricing.json`.** It mirrors `00-MASTER-PLAN.md` §3.2 exactly — if §3.2 changes, this file changes in the same commit, nothing else does. The widget, `/pricing/`, every service page and every price chip import from this file at build time (Astro) or bundle time (widget island). **Launch gate (adds to `00` §9.5): `grep -rn "₹[0-9]" website/src --include='*.astro' --include='*.tsx'` must return zero hits outside `pricing.json`-derived formatters.**

```json
{
  "currency": "INR",
  "updated": "2026-10-02",
  "pricesConfirmed": false,
  "areas": ["Sarabha Nagar", "BRS Nagar", "Model Town", "Civil Lines", "Dugri",
            "Pakhowal Road", "South City", "Ferozepur Road", "Haibowal Kalan", "Kitchlu Nagar"],
  "sizeGuide": {
    "small":  { "label": "Small",  "kg": "under 10 kg", "examples": ["Shih Tzu", "Pomeranian", "Pug"] },
    "medium": { "label": "Medium", "kg": "10–25 kg",    "examples": ["Beagle", "Cocker Spaniel", "Indie"] },
    "large":  { "label": "Large",  "kg": "over 25 kg",  "examples": ["Labrador", "German Shepherd", "Golden Retriever"] }
  },
  "services": [
    { "id": "full-groom", "label": "Full Groom", "pet": "dog", "badge": "Most booked",
      "pricing": { "type": "by_size", "small": 1199, "medium": 1499, "large": 1899 },
      "includes": ["Everything in Bath & Brush", "Haircut & styling", "Paw + sanitary trim"] },
    { "id": "bath-brush", "label": "Bath & Brush", "pet": "dog",
      "pricing": { "type": "by_size", "small": 599, "medium": 799, "large": 999 },
      "includes": ["Bath, blow-dry, brush-out", "Nail trim + ear clean"] },
    { "id": "premium-spa", "label": "Premium Spa Groom", "pet": "dog",
      "pricing": { "type": "by_size", "small": 1799, "medium": 2199, "large": 2799 },
      "includes": ["Everything in Full Groom", "De-shed / de-mat", "Conditioning masque + perfume"] },
    { "id": "puppy-intro", "label": "Puppy Intro Groom", "pet": "dog", "constraint": "under 6 months",
      "pricing": { "type": "flat", "price": 699 },
      "includes": ["Gentle first-time groom"] },
    { "id": "cat-grooming", "label": "Cat Grooming", "pet": "cat",
      "pricing": { "type": "plans", "plans": [
        { "id": "cat-bath-brush", "label": "Bath & Brush", "price": 899, "per": "visit" },
        { "id": "cat-full", "label": "Full Groom", "price": 1399, "per": "visit" } ] },
      "includes": ["Calm-handling trained groomer"] },
    { "id": "dog-walking", "label": "Dog Walking", "pet": "dog",
      "pricing": { "type": "plans", "plans": [
        { "id": "walk-trial", "label": "Trial Week", "price": 699, "per": "week" },
        { "id": "walk-1x", "label": "1 walk/day", "price": 2999, "per": "month" },
        { "id": "walk-2x", "label": "2 walks/day", "price": 4999, "per": "month" } ] },
      "includes": ["Fixed walker", "GPS + photo update after every walk"] },
    { "id": "vet-visit", "label": "Vet Home Visit", "pet": "both",
      "pricing": { "type": "flat_plus", "price": 699, "plus": "medicines/vaccines at MRP" },
      "includes": ["Registered veterinarians only"] },
    { "id": "vaccination", "label": "Vaccination at Home", "pet": "both",
      "pricing": { "type": "flat_plus", "price": 199, "plus": "vaccine at MRP" },
      "includes": ["With reminder calendar"] },
    { "id": "tick-flea", "label": "Tick & Flea Treatment", "pet": "both",
      "pricing": { "type": "flat", "price": 699, "addonPrice": 399 },
      "includes": ["Standalone ₹699 · add-on ₹399 with any groom"] },
    { "id": "deworming", "label": "Deworming Visit", "pet": "both",
      "pricing": { "type": "flat", "price": 499 },
      "includes": ["Standard dewormer included"] },
    { "id": "nail-ear", "label": "Nail Trim + Ear Clean visit", "pet": "both",
      "pricing": { "type": "flat", "price": 299 },
      "includes": ["20-minute quick visit"] }
  ],
  "groomClub": { "label": "Groom Club",
    "benefit": "1 Full Groom/month at 15% off + free nail-trim visit + priority slots", "url": "/offers/" }
}
```

`pricesConfirmed` stays `false` until Sunny confirms §3.2 (pre-launch checklist item 5); while false, dev/staging builds print a console warning — it does not change the UI.

**Chip + price_shown derivation rules (pure function `formatPrice(service, size?, plan?, addon?)`):**

| `pricing.type` | Card chip | `price_shown` after selections |
|---|---|---|
| `by_size` | `from ₹{small}` | `₹{price for chosen size}` (+ `₹399` if tick-flea add-on toggled → `₹{sum} (incl. Tick & Flea add-on)`) |
| `flat` | `₹{price}` | `₹{price}` |
| `flat_plus` | `₹{price} + {plus}` | `₹{price} + {plus}` (this is the "range" presentation — never a fake exact total) |
| `plans` | `from ₹{min plan price}` (+ ` (trial week)` for dog-walking) | `₹{plan price} / {per}` e.g. `₹2,999 / month` |

Number formatting: Indian grouping with comma (`1899` → `₹1,899`) via `toLocaleString('en-IN')`.

---

## 5 · Submission pipeline (runs on `Confirm on WhatsApp →` tap, in this order)

0. **Double-submit guard** (§6) → build payload.
1. **(b) Booking reference, client-side:** `PDS-<YYYYMMDD>-<4 chars>` — date = booking creation date (device), 4 chars drawn from alphabet `23456789ABCDEFGHJKMNPQRSTUVWXYZ` (no 0/O/1/I ambiguity) via `crypto.getRandomValues`. Example: `PDS-20261002-K4T9`. Stored in the draft; the same ref is reused if the user re-taps (no duplicate refs for one booking).
2. **Fire events** `booking_submitted` + `whatsapp_click` (§7) — before storage, so slow networks never lose the event.
3. **(a) Store the lead — fire-and-forget, never blocks the user.**
   - **Primary: Google Sheets via Apps Script Web-App POST** to `[FILL:SHEETS_WEBHOOK]` (the secret deployment URL `https://script.google.com/macros/s/<token>/exec` — the token in the URL is the credential; it only ever lives in one place in the codebase, `src/lib/leads.ts`).
   - Client call: `fetch(SHEETS_WEBHOOK, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })` — `text/plain` + `no-cors` avoids the CORS preflight Apps Script can't answer; the response is opaque, so a resolved promise counts as success.
   - **Retry once:** on rejection (network error), wait 2 s, retry once.
   - **Fallback: Web3Forms (free)** — if both Sheets attempts reject, `POST https://api.web3forms.com/submit` (JSON, normal CORS) with `access_key: [FILL:WEB3FORMS_KEY]` (key generated at web3forms.com for `[FILL:EMAIL]`), `subject: "PetDoorStep lead {ref}"` and the full payload — the lead arrives as an email.
   - If that also fails, append the payload to `localStorage.pds_unsent_leads` (array, cap 10) and retry the whole chain on next page load. **Under no circumstance is the WhatsApp handoff delayed or blocked by storage** — the lead also exists inside the WhatsApp message itself.

   **Sheet columns (header row, exact order):**
   `ts · ref · lead_type · source · page_url · service_id · service_label · plan · addon_tick_flea · pet_type · size · breed · first_groom · coat_matting · coat_ticks · coat_shedding · area · date_pref · window_pref · name · phone · note · price_shown · consent_whatsapp · ua`
   (`lead_type` = `booking` | `waitlist`; waitlist rows fill only ts/ref/lead_type/source/area/name/phone and leave the rest empty.)

   **Apps Script `doPost` outline** (bound to the sheet, tab name `leads`):

   ```js
   const COLS = ['ref','lead_type','source','page_url','service_id','service_label','plan',
     'addon_tick_flea','pet_type','size','breed','first_groom','coat_matting','coat_ticks',
     'coat_shedding','area','date_pref','window_pref','name','phone','note','price_shown',
     'consent_whatsapp','ua'];
   function doPost(e) {
     const lock = LockService.getScriptLock(); lock.waitLock(5000);
     try {
       const d = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('leads');
       sheet.appendRow([new Date()].concat(COLS.map(c => String(d[c] ?? '').slice(0, 300))));
       return ContentService.createTextOutput('{"ok":true}')
         .setMimeType(ContentService.MimeType.JSON);
     } finally { lock.releaseLock(); }
   }
   ```

   **Deploy steps:** ① `sheets.new` → name it `PetDoorStep Leads`, rename tab to `leads`, paste the header row above. ② Extensions → Apps Script → paste script → save. ③ Deploy → New deployment → type **Web app** → Execute as: **Me** → Who has access: **Anyone** → Deploy. ④ Copy the Web app URL → that is `[FILL:SHEETS_WEBHOOK]`. ⑤ Test: `curl -L -X POST '<url>' -H 'Content-Type: text/plain' -d '{"ref":"PDS-TEST-0000","lead_type":"test"}'` → a row appears. ⑥ Future script edits: Deploy → Manage deployments → Edit → New version (URL stays stable).

4. **(c) Open WhatsApp.** Deep link `https://wa.me/[FILL:WHATSAPP_NUMBER]?text=<encodeURIComponent(message)>` ( `[FILL:WHATSAPP_NUMBER]` digits only, no `+`, e.g. `91XXXXXXXXXX`). Rendered as a real `<a target="_blank" rel="noopener">` so it works even if JS dies after render. **Exact message template** (built with `encodeURIComponent`; `{line}` omitted entirely when its value is empty):

   ```
   Hi PetDoorStep! New booking request from the website.

   Ref: {ref}
   Service: {service_label}{plan: " — " + plan_label}{addon: " + Tick & Flea add-on"}
   Pet: {pet_type_label}{breed: " (" + breed + ")"}
   Size: {size_label + " (" + kg_guide + ")"}
   Area: {area}, Ludhiana
   Date: {date_label}, {window_label}
   Name: {name}
   Price shown: {price_shown}
   Note: {first_groom=="Yes, first time" ? "First groom. " : ""}{coat flags joined ", "}{". " + user note}
   Offer: FIRSTGROOM (first groom)   ← only when the FIRSTGROOM offer applies (06 §7.1: first booking on this device + Full Groom or Premium Spa)
   Source: website ({source})
   ```

   Worked example:

   ```
   Hi PetDoorStep! New booking request from the website.

   Ref: PDS-20261002-K4T9
   Service: Full Groom + Tick & Flea add-on
   Pet: Dog (German Shepherd)
   Size: Large (over 25 kg)
   Area: Sarabha Nagar, Ludhiana
   Date: Sat 04 Oct, Morning 9–12
   Name: Simran
   Price shown: ₹2,298 (incl. Tick & Flea add-on)
   Note: First groom. Ticks or fleas. Society gate - call on arrival.
   Source: website (pricing_row)
   ```

   Hard cap on composed message: 1,500 characters (note is truncated first).

5. **(d) Redirect.** 1,200 ms after the WhatsApp tab/app opens, `location.assign('/thank-you/?ref={ref}&service={service_id}')`. `/thank-you/` is `noindex` (`00` §5), reads `ref` from the query string, displays it (`Your booking reference: PDS-…`) with the "confirmed within 10 minutes" line, and fires the thank-you conversion event exactly as defined in `09-ANALYTICS-TRACKING.md` (`thank_you_view` + GA4 key-event mapping). Mark `localStorage.pds_last_booking = {ref, ts}` and clear the draft.

---

## 6 · State & edge cases

| Case | Behaviour |
|---|---|
| **Draft resume** | Entire widget state serialises to `localStorage.pds_booking_draft_v1` (`{state, savedAt, ref?}`) on every change, wrapped in try/catch (private-mode safe). On widget mount, a draft younger than **48 h** and not submitted shows a banner above Step 1: `Welcome back! Continue your booking — {service_label} in {area}.` with buttons `Resume` (restores to furthest completed step) / `Start fresh` (clears draft). Older or submitted drafts are deleted silently |
| **Double-submit guard** | On Confirm tap: button disabled + label `Opening WhatsApp…` for 3 s; the ref is created once and reused on any re-tap; storage POST is sent at most twice total (initial + 1 retry) per ref |
| **JS disabled / island failed** | `/book/` contains a `<noscript>` block (and the same block is server-rendered below the widget mount until hydration): `Book directly on WhatsApp:` + static `wa.me/[FILL:WHATSAPP_NUMBER]?text=` prefill `Hi PetDoorStep! I want to book a service. My area: ___ . My pet: ___` + `tel:[FILL:PHONE]` link + link to `/pricing/`. Independent of the widget, header and footer always carry static wa.me and tel links on every page (zero-JS anchors) |
| **WhatsApp not installed** | Handled natively by `wa.me`: on phones it opens the app or the install/web page; on desktop it falls through to WhatsApp Web. No custom detection code. The review screen's `tel:` line is the human fallback |
| **Out-of-area lead** | Waitlist path (§3 Step 1): stored with `lead_type=waitlist`, fires `out_of_area_lead`, inline success, no `/thank-you/` redirect |
| **Abusive input** | Hard caps enforced on input and re-checked before compose: name 60 · breed 40 · note 300 · waitlist area 60 · phone 16 raw chars. Control characters stripped; message always built via `encodeURIComponent`; Apps Script re-truncates every cell to 300 chars server-side. No HTML is ever rendered from user input |
| **Clock edge** | `Today` chip and window cutoffs (§3 Step 4) are recomputed on step entry and on Next-validation, so a stale open tab cannot submit an impossible window |
| **Slow network** | Events and storage are fire-and-forget with `keepalive: true`; WhatsApp opens immediately — the lead is never lost because the message itself contains everything |

---

## 7 · Analytics events

Canonical registry lives in `09-ANALYTICS-TRACKING.md` — the two tables must stay byte-identical; on conflict, 09 wins and this file is updated in the same commit. All events go to GA4 via the shared `track(name, params)` helper (defined in 09).

| Event | Fired when | Params |
|---|---|---|
| `booking_started` | First interaction with Step 1 (area select focus/change), once per session | `source`, `page_path` |
| `booking_step_completed` | Each successful Next (steps 1–5) and reaching the review screen (`step: 6, step_name: "review"`) | `step` (1–6), `step_name` (`area·service·pet·schedule·contact·review`) |
| `booking_submitted` | `Confirm on WhatsApp →` tap, before storage | `service`, `size`, `area`, `price_shown`, `ref`, `source` |
| `whatsapp_click` | Any `wa.me` anchor click site-wide, including the confirm button | `source` (entry-point value from §2, or `confirm_button`) |
| `call_click` | Any `tel:` anchor click site-wide | `source` |
| `out_of_area_lead` | Waitlist submit succeeds validation | `area_text`, `source` |
| `thank_you_view` | `/thank-you/` page load with a `ref` param (GA4 key event — backup conversion) | `ref`, `service` |

*Param hygiene (`00` §11 E10, mirrored under the `09` §2a table): `area` and `area_text` are sent with every digit removed and cut to 30 characters, so a phone or house number typed into an area field never reaches GA4.*

---

## 8 · Component architecture

- **Exactly one React island on the whole site: `<BookingWidget />`** at `src/components/booking/BookingWidget.tsx`. Mounted `client:visible` on `/book/`; if later embedded elsewhere (e.g. home hero per the research pattern), mounted `client:idle` there. Everything else on the site is zero-JS Astro (D1, `00` §2) except three small inline vanilla scripts, each tagged with a `data-pds` attribute (`08` §8.1, `04` §5.3): the analytics bootstrap with the `track()` helper (`09` §3.1), the exit card (§2 row 7) and the `/thank-you/` script (`09` §3.3).
- Internal files (all under `src/components/booking/`): `BookingWidget.tsx` (reducer + step router) · `steps/StepArea.tsx` · `steps/StepService.tsx` · `steps/StepPet.tsx` · `steps/StepSchedule.tsx` · `steps/StepContact.tsx` · `steps/Review.tsx` · `steps/Waitlist.tsx` · `ProgressDots.tsx` · `PriceRibbon.tsx`. Pure logic in `src/lib/`: `pricing.ts` (`formatPrice`, imports `src/data/pricing.json`) · `leads.ts` (payload build, Sheets/Web3Forms chain, `[FILL:SHEETS_WEBHOOK]` constant) · `whatsapp.ts` (message composer + `wa.me` URL) · `validate.ts` (regexes, caps, verbatim error strings exported as constants so copy lives in one file).
- State: one `useReducer`; shape `{ step, area, areaOther, serviceId, planId, addonTickFlea, petType, size, puppyConfirmed, breed, firstGroom, coat: {matting, ticks, shedding}, date, window, name, phone, note, consent, ref }`. Persisted per §6.
- Sticky bar, header button, hero/service/pricing CTAs are plain `<a>` elements (no JS beyond the global `track()` click listener).
- Styling: Tailwind with tokens from `08-DESIGN-SYSTEM.md`; WhatsApp-green only on wa.me actions.

---

## 9 · Accessibility (ships with v1, not later)

- Every input has a programmatic `<label>`; chip/card groups are `<fieldset>` + `<legend>` (legend may be visually styled as the question text).
- On step change, focus moves to the step's `<h2 tabindex="-1">`; document title is not changed (single page).
- Errors: rendered inline under the field, linked via `aria-describedby`, container has `role="alert"` (polite live region) so screen readers announce them; first invalid field receives focus on failed Next.
- All interactive targets ≥44×44 px (`08-DESIGN-SYSTEM.md` token `--tap-min`); chips have visible focus rings (never `outline: none` without replacement).
- Progress dots are `aria-hidden="true"`; the adjacent text `Step X of 5 — {step name}` is the accessible progress announcement inside an `aria-live="polite"` region.
- Disabled window chips keep `aria-disabled="true"` with the helper text as their accessible description (they remain perceivable, not removed).
- Exit card (non-modal, `00` §11 D1): `role="dialog"` labelled by its headline (`aria-labelledby`), **without** `aria-modal`. Focus is not trapped and not moved when the card appears (its trigger is a mouse gesture); its buttons are reachable with Tab; Esc closes it; if focus was inside the card when it closes, focus returns to the element focused before.
- Colour contrast ≥4.5:1 for text per `08-DESIGN-SYSTEM.md`; price ribbon text never conveys state by colour alone (text changes too).

---

## 10 · Phase-2 upgrade path (do not build now — triggers per `00` §2 D2)

| Upgrade | What it adds | What it touches |
|---|---|---|
| Real slot inventory | Backend (or Google Calendar API) exposes true availability; Step 4 date strip + windows read from it; honesty line becomes `Slot locked instantly` | Only `StepSchedule.tsx` + a new `src/lib/slots.ts`; the step's UI contract (date strip + 3 windows) is already shaped for it |
| Razorpay deposit | Optional ₹199 slot-lock deposit after review; UPI/cards | New step between Review and handoff; `leads.ts` gains a payment status column (appended, never reordered) |
| Groomer assignment | Named groomer (photo, verification badge) shown on review + in WhatsApp message `Groomer: Gurpreet (verified)` | `Review.tsx` + message composer; profile data in a new `groomers.json` |
| Admin view | Sheet replaced/augmented by a small dashboard over the same lead schema | Zero widget changes — the §5a column list is the API contract |

**What never changes in Phase 2:** the `/book/` URL and all §2 entry points · Steps 1–3 structure and field set · `pricing.json` as the single price source · the §7 event names and params (dashboards keep working) · WhatsApp as the confirmation channel · the booking-ref format `PDS-<date>-<4 chars>` · the sheet column order (new columns append only).
