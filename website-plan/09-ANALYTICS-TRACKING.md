# 09 · ANALYTICS & TRACKING — GA4 events, GSC, rank log and the monthly KPI ritual

> **This file owns** the entire measurement system: the GA4 setup, the **canonical event registry** (mirrored byte-identical in `07-BOOKING-SPEC.md` §7), the Astro implementation of tracking, UTM conventions, Phase-1 call tracking, Google Search Console rituals, free rank tracking and the monthly KPI report. It obeys `00-MASTER-PLAN.md` — business facts from §3 only, URLs from `01-SITEMAP.md` only, placeholders per §8. **No paid tools anywhere in Phase 1.**

Related files: event producers + `src` entry-point values → `07-BOOKING-SPEC.md` · GA4 script-loading budget, sitemap + GSC verification mechanics → `04-TECHNICAL-SEO.md` · GBP setup, UTM-tagged GBP links, review engine → `05-LOCAL-SEO.md` · tracked keywords source → `03-KEYWORD-MAP.md` · blog cadence → `10-CONTENT-CALENDAR.md` · expansion trigger metrics consumed from this file → `11-EXPANSION-PLAYBOOK.md`.

**New `[FILL]` token defined by this file** (add to `00-MASTER-PLAN.md` §8 list on next edit): `[FILL:GA4_ID]` — the GA4 web-stream Measurement ID, format `G-XXXXXXXXXX`.

---

## 1 · Stack — three free tools, nothing else

| Tool | What it answers | Cost | Setup owner |
|---|---|---|---|
| **GA4** (Google Analytics 4) | What visitors do on the site: sessions, sources, the booking funnel, conversions | Free | Wave 0 (`00` §6) |
| **Google Search Console** | How Google sees the site: indexing, queries, positions, CTR, CWV | Free | Wave 0, mechanics in `04-TECHNICAL-SEO.md` §7 |
| **GBP Performance** (Google Business Profile dashboard) | Profile searches, calls, website clicks, booking-link clicks | Free | `05-LOCAL-SEO.md` §1 |

**GA4 property setup (once, Wave 0):**

1. analytics.google.com → Create property `PetDoorStep` · time zone **India (GMT+5:30)** · currency **INR**.
2. Create one **Web** data stream for `https://[FILL:DOMAIN]` → copy the Measurement ID → that is `[FILL:GA4_ID]`.
3. Stream → **Enhanced measurement**: `Page views` **ON** · `Scrolls` **ON** (fires `scroll` at 90% depth) · `Outbound clicks` **OFF** (we fire named events instead — a generic `click` event would double-count `whatsapp_click`/`ig_click`) · `Site search`, `Video engagement`, `File downloads` **OFF** (features don't exist on the site).
4. Admin → Data settings → Data retention → **14 months**.
5. Admin → Data collection → **Google Signals OFF** (privacy, §9). Do **not** link Google Ads Phase 1.
6. Link GSC ↔ GA4 (Admin → Product links → Search Console) after `04-TECHNICAL-SEO.md` §7 verification.

**Script loading:** gtag is the **only third-party script on the site** (`04-TECHNICAL-SEO.md` §5 cap). It loads **after the window `load` event** via the §3 snippet — inline `dataLayer` stub first, library injected post-load with `fetchpriority="low"`, so it never competes with LCP. *Optional, not default:* `@astrojs/partytown` can move gtag to a web worker; only consider it if the CWV budget in `04-TECHNICAL-SEO.md` is actually breached by gtag (unlikely at one script), and log the addition in `00` §11 Decision Log first.

*Optional free redundancy:* Cloudflare Pages' built-in Web Analytics (cookie-less) may be toggled on at the host for a second opinion on traffic; it feeds no report in this file and needs no code.

---

## 2 · Event dictionary — the canonical registry

### 2a · Booking-funnel events (producer: booking widget + site anchors, per `07-BOOKING-SPEC.md`)

**Byte-identical rule:** the table below and `07-BOOKING-SPEC.md` §7 must stay byte-identical; on conflict **this file wins** and 07 is updated in the same commit. Section references *inside* table rows (`§2`, `Step 1`) point at sections of `07-BOOKING-SPEC.md`.

| Event | Fired when | Params |
|---|---|---|
| `booking_started` | First interaction with Step 1 (area select focus/change), once per session | `source`, `page_path` |
| `booking_step_completed` | Each successful Next (steps 1–5) and reaching the review screen (`step: 6, step_name: "review"`) | `step` (1–6), `step_name` (`area·service·pet·schedule·contact·review`) |
| `booking_submitted` | `Confirm on WhatsApp →` tap, before storage | `service`, `size`, `area`, `price_shown`, `ref`, `source` |
| `whatsapp_click` | Any `wa.me` anchor click site-wide, including the confirm button | `source` (entry-point value from §2, or `confirm_button`) |
| `call_click` | Any `tel:` anchor click site-wide | `source` |
| `out_of_area_lead` | Waitlist submit succeeds validation | `area_text`, `source` |
| `thank_you_view` | `/thank-you/` page load with a `ref` param (GA4 key event — backup conversion) | `ref`, `service` |

*Param hygiene (`00` §11 E10, mirrored under the `07` §7 table): `area` and `area_text` are sent with every digit removed and cut to 30 characters, so a phone or house number typed into an area field never reaches GA4.*

### 2b · Site-wide events (producer: GA4 automatic + the §3 shared snippet)

| Event | Fired when | Params |
|---|---|---|
| `page_view` | Every page load (automatic via `gtag('config', …)`) | `page_location`, `page_title`, `page_referrer` (GA4 automatic) |
| `scroll` | Visitor reaches 90% page depth, once per page (GA4 Enhanced measurement — no custom code) | `percent_scrolled` (automatic, always `90`) |
| `ig_click` | Any outbound click to `instagram.com` (footer social icon, `/about/`, `/reviews/`) | `source` |

### 2c · Key events (GA4's name for conversions) — mark in Admin → Key events

| Key event | Role | Note |
|---|---|---|
| `booking_submitted` | **PRIMARY conversion** — the number every report and target in §8 means by "bookings" | A WhatsApp handoff = a booking *request*, not a completed job (honest definition; completed jobs come from the leads sheet, §5) |
| `whatsapp_click` | Secondary conversion | Fires on *all* wa.me anchors, including confirm — so never sum it with `booking_submitted`; report them as separate columns |
| `call_click` | Secondary conversion | Phase-1 call-tracking proxy (§5) |
| `out_of_area_lead` | Secondary conversion | Feeds the expansion triggers in `11-EXPANSION-PLAYBOOK.md` |
| `thank_you_view` | Backup conversion | Per `07-BOOKING-SPEC.md` §5d — catches bookings where the pre-handoff event was lost on a slow network; use for reconciliation only, never add to `booking_submitted` |

Marking steps: GA4 Admin → Events → "Create key event" → type each name above exactly (do this day 1; the toggle also appears next to each event after it first fires).

### 2d · Param registration (custom dimensions — GA4 shows unregistered params nowhere)

Admin → Custom definitions → Create custom dimension, all **Event** scope, dimension name = param name:

`source` · `step` · `step_name` · `service` · `size` · `area` · `price_shown` · `ref` · `area_text`

(9 of the 50 allowed. `page_path` is **not** registered — GA4's built-in `page_location` covers it. `percent_scrolled` is built-in.)

**Canonical `source` values** (`00` §11, 2026-10-03) — the only values that may appear in a `source` param (and in a `src` query param):

| Kind | Values | Where |
|---|---|---|
| Fixed (12) | `sticky_bar` · `header` · `pricing_row` · `book_page` · `exit_nudge` · `float_desktop` · `confirm_button` · `review_screen` · `footer` · `noscript_block` · `not_found` · `groomclub` | `07` §2 rows 1, 2, 5, 6, 7, 8 · widget confirm button and the review-screen `tel:` link (`07` §3) · site footer · `/book/` no-JS block (`07` §6) · 404 page CTAs · every "Join Groom Club" CTA (`06` §7.3, `pricing.md` PR-8, `offers.md` OF-4) |
| Pattern `hero_<slug>` | e.g. `hero_home`, `hero_dog-grooming`, `hero_pricing` | Hero CTAs (`07` §2 row 3) |
| Pattern `service_<id>` | e.g. `service_full-groom`, `service_dog-walking` | Body CTA rows of a money page (`07` §2 row 4): `<id>` is the preselected `pricing.json` service id, or the page slug when the link preselects nothing |
| Pattern `ctaband_<slug>` | e.g. `ctaband_dog-grooming`, `ctaband_about` | The page-end `CtaBand` (template SP-12 and every blueprint's final CTA band) |
| Pattern `<slug>_page` | e.g. `contact_page`, `about_page`, `reviews_page`, `offers_page`, `privacy-policy_page`, `sarabha-nagar_page`, `<post-slug>_page` | Any other in-page anchor on that page: contact cards, legal-page contact lines, an area page's booking widget, a blog post's in-body CTA |

`<slug>` is the page's last URL segment (`home` for `/`). Anything else = a bug; the §3 snippet stamps `unlabelled` so misses are findable in GA4. The widget ignores a `src` longer than 40 characters or with characters outside `[a-z0-9_-]` (`BookingWidget.tsx` `SRC_PATTERN`), so shorten the slug part of a long value.

**Funnel report (build once, Explore → Funnel exploration, name `Booking funnel`):** steps = ① `booking_started` ② `booking_step_completed` where `step=1` ③ `step=2` ④ `step=3` ⑤ `step=4` ⑥ `step=5` ⑦ `step=6` ⑧ `booking_submitted`; breakdown dimension `source`. This is where the §8 funnel % is read.

---

## 3 · Astro implementation — one snippet, data-attributes, one helper

### 3.1 The shared analytics snippet (the whole implementation)

Lives **once**, at the end of `<body>` in the site-wide base layout (`src/layouts/Base.astro` — naming per `08-DESIGN-SYSTEM.md`). ≈1.4 KB. It is one of exactly three inline scripts on the site, each tagged with a `data-pds` attribute so the CI gate can allow-list them: this bootstrap, the exit card (`07-BOOKING-SPEC.md` §2 row 7, §8) and the `/thank-you/` script (§3.3). Same list in `08` §8.1 and `04` §5.3.

```html
<script is:inline>
/* PetDoorStep analytics bootstrap — the ONLY third-party script (04-TECHNICAL-SEO §5). */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', '[FILL:GA4_ID]');

var PDS_LIVE = location.hostname === '[FILL:DOMAIN]';

/* track(): THE event helper (07-BOOKING-SPEC §7 points here). Safe pre-load: events
   queue into dataLayer and flush when gtag.js arrives. Never throws. */
window.track = function (name, params) {
  try {
    var p = Object.assign({ page_path: location.pathname }, params || {});
    if (!PDS_LIVE) { console.debug('[track]', name, p); } // dev/preview: log, send nothing
    gtag('event', name, p);
  } catch (e) { /* analytics must never break the page */ }
};

/* Load gtag.js AFTER window load (04-TECHNICAL-SEO §5: third-party waits for load). */
if (PDS_LIVE) window.addEventListener('load', function () {
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=[FILL:GA4_ID]';
  s.async = true; s.fetchPriority = 'low';
  document.head.appendChild(s);
});

/* Delegated CTA tracking — zero per-button JS anywhere else. */
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a, [data-track]') : null;
  if (!a || a.hasAttribute('data-track-off')) return;
  var src = a.getAttribute('data-source') || 'unlabelled';
  if (a.hasAttribute('data-track')) { window.track(a.getAttribute('data-track'), { source: src }); return; }
  var href = a.getAttribute('href') || '';
  if (href.indexOf('wa.me') > -1 || href.indexOf('api.whatsapp.com') > -1) window.track('whatsapp_click', { source: src });
  else if (href.indexOf('tel:') === 0) window.track('call_click', { source: src });
  else if (href.indexOf('instagram.com') > -1) window.track('ig_click', { source: src });
});
</script>
```

Behaviour notes:

- **Dev/preview hygiene:** on any hostname other than `[FILL:DOMAIN]` (localhost, `*.pages.dev` previews) the library never loads and `track()` only `console.debug`s — GA4 data stays clean with zero filter configuration.
- `page_view` comes from the `gtag('config', …)` line; `scroll` comes from Enhanced measurement (§1). Neither needs code here.

### 3.2 Data-attribute contract for CTAs (static Astro markup)

| Attribute | Put it on | Value |
|---|---|---|
| `data-source="…"` | **Every** `wa.me`, `tel:` and Instagram anchor | One §2d canonical source value, e.g. `data-source="sticky_bar"`, `data-source="hero_dog-grooming"`, `data-source="footer"` |
| `data-track="…"` | An anchor needing a custom event the href rules can't infer (rare; `ig_click` is auto-detected, so Phase 1 ships none) | An event name from §2 — never an unregistered name |
| `data-track-off` | Anchors that must NOT auto-fire | **Exactly one in Phase 1: the widget's `Confirm on WhatsApp →` anchor** — the widget fires `booking_submitted` + `whatsapp_click` itself (`07-BOOKING-SPEC.md` §5 step 2); without this attribute the delegated listener would double-count `whatsapp_click` |

Worked examples:

```html
<a href="https://wa.me/[FILL:WHATSAPP_NUMBER]?text=…" data-source="sticky_bar">WhatsApp</a>
<a href="tel:[FILL:PHONE]" data-source="footer">Call [FILL:PHONE]</a>
<a href="https://instagram.com/[FILL:INSTAGRAM]" data-source="footer" rel="noopener" target="_blank">Instagram</a>
```

### 3.3 Island usage (the booking widget — the only React island, `07-BOOKING-SPEC.md` §8)

`src/lib/analytics.ts` — imported by `BookingWidget.tsx`; never imports gtag directly:

```ts
// src/lib/analytics.ts — safe wrapper over the window.track helper from the base layout.
type Params = Record<string, string | number | boolean>;
export const track = (name: string, params?: Params): void => {
  if (typeof window !== 'undefined' && typeof (window as any).track === 'function') {
    (window as any).track(name, params);
  }
};
```

The widget calls `track('booking_started', …)`, `track('booking_step_completed', …)`, `track('booking_submitted', …)`, `track('whatsapp_click', { source: 'confirm_button' })`, `track('out_of_area_lead', …)` exactly per §2a. `/thank-you/` fires `track('thank_you_view', { ref, service })` from a 3-line inline script that reads the query string (`07-BOOKING-SPEC.md` §5d).

### 3.4 QA checklist (run before launch and after any snippet edit)

1. GA4 Admin → DebugView; open the site with `?debug_mode=1` appended (or Chrome GA Debugger extension).
2. Tap every CTA type once: sticky bar WhatsApp/Call/Book, header Book, a hero CTA, a pricing-row Book, footer Instagram.
3. Run one full booking on a phone → verify the §2a sequence arrives in order with correct `source`, `step_name`, `price_shown`, and that `whatsapp_click` fired **once** (not twice) on confirm.
4. Submit one `Outside Ludhiana` waitlist → `out_of_area_lead` with `area_text`.
5. Land on `/thank-you/?ref=PDS-TEST-0000&service=full-groom` → `thank_you_view`.
6. Search DebugView for `source: unlabelled` — each hit is a missing `data-source`; fix before launch.

---

## 4 · UTM conventions — external links only

Rules: **all values lowercase**, hyphen-separated, no spaces. UTMs go **only on links that live outside the site** (GBP, Instagram, WhatsApp broadcasts, print). **Never UTM an internal link** (it resets the session's true source). The booking widget's `src` param (`07-BOOKING-SPEC.md` §2) is a separate, lead-level system: **external links never carry `src`** — a GBP visitor who books is `source=book_page` in the leads sheet while GA4 attributes the session to `gbp / organic`. Both are correct; they answer different questions.

| Placement | Link target (locked URLs only) | `utm_source` | `utm_medium` | `utm_campaign` |
|---|---|---|---|---|
| GBP website field | `https://[FILL:DOMAIN]/` | `gbp` | `organic` | `profile` |
| GBP appointment/booking link | `https://[FILL:DOMAIN]/book/` | `gbp` | `organic` | `appointment_link` |
| GBP posts (per `05-LOCAL-SEO.md` §2 templates) | post-specific locked URL | `gbp` | `organic` | `post_<topic>` (`post_groomclub`, `post_beforeafter`, `post_tickseason`, `post_vetathome`, `post_area`) |
| Instagram bio link | `https://[FILL:DOMAIN]/book/` | `instagram` | `social` | `ig_bio` |
| Instagram story/post swipe-links | page being promoted | `instagram` | `social` | `ig_<topic>_<yyyymm>` e.g. `ig_groomclub_202611` |
| WhatsApp status / broadcast list (broadcasts go only to customers who replied YES, `00` §11 D4) | `/offers/` (or the promoted page) | `whatsapp` | `social` | `wa_status_<yyyymm>` |
| Flyers + QR codes (society notice boards, vet partners, pet shops) | `https://[FILL:DOMAIN]/` (QR encodes the full UTM URL) | `flyer` | `offline` | `flyer_<area-slug>_<yyyymm>` e.g. `flyer_sarabha-nagar_202611` |

Worked example (flyer QR target):
`https://[FILL:DOMAIN]/?utm_source=flyer&utm_medium=offline&utm_campaign=flyer_sarabha-nagar_202611`

Exceptions: the QR **review** card (`05-LOCAL-SEO.md` §3.3) targets the `/review` 301 redirect straight to Google — it leaves the site, so **no UTM**. `wa.me` deep links out of the site are not UTM-able (not our pages); WhatsApp arrivals are measured by `whatsapp_click` on our side instead.

Where read: GA4 Reports → Acquisition → Traffic acquisition (session source/medium) + Explore filtered by `session campaign`. GBP values must match `05-LOCAL-SEO.md` exactly — on conflict, this table wins and 05 is updated in the same commit.

---

## 5 · Call tracking — Phase-1 approach (zero cost, zero NAP risk)

**One number only: `[FILL:PHONE]`, everywhere.** Dynamic number insertion and per-channel numbers are explicitly rejected for Phase 1: NAP consistency is a citation-level ranking signal (`05-LOCAL-SEO.md` §4) and a second published number would fracture it. Measurement is triangulated instead:

1. **`call_click` events** (§2a) — every `tel:` tap on the site, segmented by `source`. This is the proxy for site-driven calls. (Desktop visitors who dial a number they read on screen are invisible — accept the undercount; it is directionally stable.)
2. **GBP Performance → Calls** — taps on the call button on the Business Profile (counted by Google, independent of the site).
3. **"How did you hear about us?" — WhatsApp conversation SOP.** Every booking is confirmed on WhatsApp (`07-BOOKING-SPEC.md`), so the operator asks one question **after** the slot is confirmed, verbatim:

   > *Last question — PetDoorStep ke baare mein aapko kahan se pata chala? 1️⃣ Google search · 2️⃣ Google Maps · 3️⃣ Instagram · 4️⃣ Friend/family · 5️⃣ Flyer/QR · 6️⃣ Other*

   Log the reply in the leads sheet (`PetDoorStep Leads`, `07-BOOKING-SPEC.md` §5a) in a new column **`heard_from`**, appended after `ua` (07 §10 allows append-only column additions; never reorder). Allowed values: `google_search` · `google_maps` · `instagram` · `referral` · `flyer_qr` · `other`. Also append a `status` column (`confirmed` / `done` / `cancelled`), operator-maintained — it turns booking *requests* into counted completed jobs for §8. Then an `opt_in` column: the date the customer replied YES to the opt-in ask (`06` §9 W6). Reminders, review requests, rebooking nudges, offers and broadcasts go only to rows with a date there; clear it the day the customer asks to stop (`00` §11 D4). The column list lives in `website/src/data/legal.ts` (`LEAD_COLUMNS` + `OPERATOR_COLUMNS`), which the privacy policy renders.
4. Phone-call bookings (no form) get a manual row in the same sheet with `source=phone_direct`, plus the same `heard_from` question asked on the call.

Monthly: tally `heard_from` into the §8 report. **Phase-2 upgrade path:** a separate virtual/SIM number printed **only on flyers** (never on the website, GBP or citations) would give true offline call attribution — Decision-Log item, not now.

---

## 6 · Google Search Console — setup + the weekly 15 minutes

**Setup (Wave 0; step-by-step mechanics live in `04-TECHNICAL-SEO.md` §7):** Domain property for `[FILL:DOMAIN]` via DNS TXT (covers www/non-www, http/https) → submit `https://[FILL:DOMAIN]/sitemap-index.xml` → "Import from GSC" into Bing Webmaster Tools → link GSC ↔ GA4 (§1.6). Every new page gets Request Indexing on publish day.

**Weekly checks — first 90 days (then fold into the monthly routine, per `04-TECHNICAL-SEO.md` §7.7). 15 minutes, same day each week:**

| # | Check | Where | Act when… |
|---|---|---|---|
| 1 | Coverage: every live `01-SITEMAP.md` URL indexed; no new "Crawled — currently not indexed" / "Duplicate" | Indexing → Pages | A Wave-1/2 URL missing → Request Indexing; a thin-content verdict on an area page → deepen it per `blueprints/_TEMPLATE-area-page.md` before re-requesting |
| 2 | New queries: scan last 7 days vs previous 7 for queries we don't target yet | Performance → Queries (compare mode) | A recurring new query → add as candidate row to `03-KEYWORD-MAP.md` (log in `00` §11) |
| 3 | CTR outliers: position ≤ 10 **and** CTR < 2% | Performance → Queries, sort by impressions | Rewrite that page's title/meta using the `03-KEYWORD-MAP.md` §3 formulas; note the change date to compare after 2 weeks |
| 4 | Sitemap status "Success"; CWV report has no new "Poor" URLs | Indexing → Sitemaps · Experience → CWV | Fix per `04-TECHNICAL-SEO.md` budgets |
| 5 | Manual actions + Security issues both read "No issues" | Security & Manual actions | Anything else = drop everything, fix first |

Record position data for the §7 rank log from Performance → Query filter (exact query) → Average position for the matching page — this is the authoritative number once impressions exist.

---

## 7 · Rank tracking without paid tools — 15 keywords, fortnightly

### 7.1 The tracked set (primaries from `03-KEYWORD-MAP.md` §2 + the highest-value secondaries; wording is canonical from 03)

| # | Keyword | Target URL (locked) | Live from |
|---|---|---|---|
| 1 | pet grooming at home ludhiana | `/` | Wave 1 |
| 2 | dog grooming at home ludhiana | `/ludhiana/dog-grooming/` | Wave 1 |
| 3 | cat grooming ludhiana | `/ludhiana/cat-grooming/` | Wave 1 |
| 4 | dog walker ludhiana | `/ludhiana/dog-walking/` | Wave 1 |
| 5 | vet at home ludhiana | `/ludhiana/vet-at-home/` | Wave 1 |
| 6 | dog grooming price ludhiana | `/pricing/` | Wave 1 |
| 7 | book dog grooming at home ludhiana | `/book/` | Wave 1 |
| 8 | pet grooming ludhiana | `/` | Wave 1 |
| 9 | dog grooming ludhiana | `/ludhiana/dog-grooming/` | Wave 1 |
| 10 | dog groomer near me (checked from Ludhiana — map-pack keyword) | GBP + `/ludhiana/dog-grooming/` | Wave 1 + GBP live |
| 11 | dog vaccination at home ludhiana | `/ludhiana/dog-vaccination/` | Wave 2 |
| 12 | tick treatment for dogs ludhiana | `/ludhiana/tick-flea-treatment/` | Wave 2 |
| 13 | puppy grooming at home ludhiana | `/ludhiana/puppy-grooming/` | Wave 2 |
| 14 | pet care services in ludhiana | `/ludhiana/` | Wave 2 |
| 15 | pet grooming sarabha nagar ludhiana | `/ludhiana/areas/sarabha-nagar/` | Wave 2 |

(Wave-2 keywords are logged as `np` — no page — until their URL ships; the baseline for every keyword is recorded the day its page goes live.)

### 7.2 Method (both numbers, in this order)

1. **GSC position (the recorded number):** Performance → + New → Query → exact keyword → read "Average position" for the target URL, last 28 days. No impressions yet → record `nd` (no data).
2. **Live SERP spot-check (reality + map pack):** on the ops phone **physically in Ludhiana** — Chrome incognito, signed out of Google. Confirm the location chip at the bottom of the results says Ludhiana ("Update location" if not). Search the keyword; count organic results top-down ignoring ads and the map pack; record the integer position of our URL, `>30` if absent from three pages. Separately note `MP` if PetDoorStep appears in the 3-pack. When out of town: desktop Chrome incognito + DevTools device emulation (mobile) + Sensors → Location override `30.9010, 75.8573` — treat as approximate (Google weighs IP); the GSC number remains authoritative.

Cell format in the log: `GSC / spot-check` plus `MP` flag — e.g. `8.2 / 7 MP`. Not found: `nd / >30`.

### 7.3 The log — `website-plan/tracking/RANK-LOG.md` (create on first check by pasting this template; one new date column per fortnight, newest right)

```markdown
# RANK LOG — PetDoorStep (method & keyword set: 09-ANALYTICS-TRACKING.md §7)
Cadence: 1st + 15th of each month (or next working day). Cell = GSC avg / spot-check, MP = in map pack, nd = no GSC data, np = page not live, >30 = not in top 30.

| # | Keyword | Target URL | {YYYY-MM-DD} | {YYYY-MM-DD} |
|---|---|---|---|---|
| 1 | pet grooming at home ludhiana | / | | |
| 2 | dog grooming at home ludhiana | /ludhiana/dog-grooming/ | | |
| 3 | cat grooming ludhiana | /ludhiana/cat-grooming/ | | |
| 4 | dog walker ludhiana | /ludhiana/dog-walking/ | | |
| 5 | vet at home ludhiana | /ludhiana/vet-at-home/ | | |
| 6 | dog grooming price ludhiana | /pricing/ | | |
| 7 | book dog grooming at home ludhiana | /book/ | | |
| 8 | pet grooming ludhiana | / | | |
| 9 | dog grooming ludhiana | /ludhiana/dog-grooming/ | | |
| 10 | dog groomer near me | GBP + /ludhiana/dog-grooming/ | | |
| 11 | dog vaccination at home ludhiana | /ludhiana/dog-vaccination/ | | |
| 12 | tick treatment for dogs ludhiana | /ludhiana/tick-flea-treatment/ | | |
| 13 | puppy grooming at home ludhiana | /ludhiana/puppy-grooming/ | | |
| 14 | pet care services in ludhiana | /ludhiana/ | | |
| 15 | pet grooming sarabha nagar ludhiana | /ludhiana/areas/sarabha-nagar/ | | |

Notes: {date} — {SERP shifts worth logging in 00 §11, e.g. "new aggregator page for kw 2"}
```

**Cadence: fortnightly** (1st + 15th), ~30 minutes. If a markdown log feels heavy on the phone, the identical table may live as a `ranks` tab in the `PetDoorStep Leads` sheet — pick one home and stick to it.

---

## 8 · KPI monthly report — template + targets

Run on the first working day of each month, ~45 minutes. Lives in `website-plan/tracking/KPI-LOG.md`, newest month on top (create the file by pasting the template on first run). `L` = launch month, so `L+1` is the first full month live.

### 8.1 Template (copy per month, fill every cell — `n/a` is allowed, blank is not)

```markdown
## KPI — {YYYY-MM} (month L+{n})

| Metric | Where to pull it | This month | Last month |
|---|---|---|---|
| Sessions | GA4 → Reports → Acquisition → Traffic acquisition | | |
| Sessions by channel (top 3) | same report, session source/medium | | |
| Blog sessions | GA4 → Pages & screens, filter path begins /blog/ | | |
| booking_started | GA4 → Explore → "Booking funnel" (09 §2d) | | |
| booking_submitted (bookings) | same funnel, final step | | |
| Funnel % started→submitted | computed | | |
| Jobs completed | leads sheet, status = done (09 §5) | | |
| whatsapp_click / call_click | GA4 → Reports → Engagement → Events | | |
| out_of_area_lead (+ top cities) | same + leads sheet lead_type=waitlist | | |
| GBP: searches · calls · website clicks · booking clicks | GBP dashboard → Performance | | |
| Reviews: new / total / avg rating | GBP → Reviews (engine: 05-LOCAL-SEO §3) | | |
| Rankings: keywords in top 10 / top 3 / MP appearances | RANK-LOG.md latest column (09 §7) | | |
| heard_from tally | leads sheet column (09 §5) | | |
| Leads by area (top 5) | leads sheet `area` column | | |
| Future-locality trigger: any non-launch locality with 3+ completed bookings? | leads sheet (03-KEYWORD-MAP §4 trigger) | | |

**3 actions for next month (max 3, each with an owner and a file reference):**
1. …
2. …
3. …
```

### 8.2 Targets — **targets, not forecasts.** They exist to force the 3-actions decision, and they gate the `11-EXPANSION-PLAYBOOK.md` triggers; missing one is information, not failure.

| Metric | L+1 | L+3 | L+6 |
|---|---|---|---|
| Sessions | 300 | 1,200 | 3,000 |
| Blog sessions | 20 | 150 | 700 |
| booking_started | 50 | 180 | 420 |
| **booking_submitted (bookings)** | **15** | **60** | **150** |
| Funnel % started→submitted | 30% | 33% | 36% |
| whatsapp_click | 40 | 150 | 350 |
| call_click | 10 | 35 | 80 |
| GBP interactions (calls + website + booking clicks) | 60 | 180 | 400 |
| Reviews (cumulative / avg rating) | 6 / ≥4.8 | 25 / ≥4.8 | 60 / ≥4.8 (velocity per `05-LOCAL-SEO.md` §3.5) |
| Tracked keywords (of 15): top 10 · top 3 | baseline logged | 4 · 1 | 8 · 3 |
| Map pack | GBP live & clean | 1 keyword-area combo | regular for "near me" checks in core areas |

---

## 9 · Privacy — honest, minimal, Indian-law aware

1. **What we run:** GA4 only. No remarketing, no Google Ads link, **Google Signals OFF**, no audience export, no heatmaps/session recording — locked for Phase 1; any change is a `00` §11 Decision-Log entry first.
2. **IP handling:** GA4 does not log or store IP addresses (IP masking is default, built-in — the old `anonymize_ip` flag is a Universal-Analytics relic and is deliberately absent from the §3 snippet). State this plainly in the policy rather than claiming a config we didn't write.
3. **Personal data:** collected only via the booking form with the required WhatsApp-consent checkbox (`07-BOOKING-SPEC.md` §3 Step 5, which links to `/privacy-policy/`), stored in the private leads sheet (07 §5a), and used **only to handle that booking** — a legitimate use under the DPDP Act 2023, s.7(a) (`00` §11 D4). Reminders, review requests, rebooking nudges and offers go only to customers who replied YES on WhatsApp (`opt_in`, §5). Deletion on request via `[FILL:EMAIL]` or WhatsApp — aligned with the DPDP Act 2023 (purpose limitation, consent for anything else, erasure). The legal pages say this in full: `blueprints/privacy-policy.md`, data in `website/src/data/legal.ts`; a lawyer reviews them before launch (`00` §9 item 7).
4. **No cookie banner Phase 1:** the site sets only GA4 first-party cookies (`_ga`, `_ga_<id>`, live domain only) and the booking form's own `pds_*` keys in `localStorage`/`sessionStorage` (full list: `STORAGE_KEYS` in `legal.ts`); we target India, not the EU/UK. Revisit only if meaningful EU traffic appears in GA4 geography reports (Decision-Log item). Whether GA4 cookies need consent under the DPDP Act is on the lawyer's review list (`privacy-policy.md` ship checks).
5. **Paste-ready copy for `/privacy-policy/` (Analytics section — the page `01-SITEMAP.md` requires to mention lead data, WhatsApp and analytics).** Updated for `00` §11 D4 (2026-10-03). `website/src/data/legal.ts` carries these three paragraphs verbatim as `CONSENT_TEXT`, with `{whatsapp}`/`{email}` slots that the page fills from `src/data/site.ts`; keep the two identical. They render in `blueprints/privacy-policy.md` PP-4 and PP-7:

   > **Analytics.** We use Google Analytics 4 to understand how visitors use this website — pages viewed, buttons tapped, and how people found us. Google Analytics does not log or store your IP address, and we have switched off all advertising and remarketing features. We look at this data only in aggregate (for example, "how many people visited the pricing page"), never to identify you.
   >
   > **Bookings & WhatsApp.** When you book, we store the details you enter (name, mobile number, area, pet details, preferred date and time, and any note) in our private records and use them only to handle that booking — confirming it on WhatsApp, as you agree on the booking form, arranging the visit and answering your messages about it. We never sell or share your number.
   >
   > **Reminders, reviews & offers.** We send reminders, review requests, rebooking messages and offers on WhatsApp only after you reply YES, and they stop as soon as you tell us. To see, correct or delete your data, WhatsApp us on [FILL:WHATSAPP_NUMBER] or email [FILL:EMAIL] — we action deletion requests within 7 days.

6. `/thank-you/` is `noindex, follow` (`00` §5, `04` §3.3) and fires only `thank_you_view` — the `ref` param contains no personal data (format `PDS-<date>-<4 chars>`, 07 §5.1), so it is safe to send to GA4.
