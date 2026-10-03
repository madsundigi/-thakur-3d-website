# B07 · BOOK + THANK-YOU — `/book/` and `/thank-you/`

> Page blueprint for the booking page (widget host) and the confirmation page. The widget itself — steps, fields,
> validation, pricing, WhatsApp payload, lead storage, events — is owned by `07-BOOKING-SPEC.md`; this file owns the
> page around it. Keywords from `03-KEYWORD-MAP.md` §2.10; microcopy from `06-CONVERSION-PLAYBOOK.md` §9.

| URL | Wave | Indexing | Schema | Status |
|---|---|---|---|---|
| `/book/` | 1 | indexable (thin-safe content below the widget) | BreadcrumbList | blueprinted |
| `/thank-you/` | 1 | `noindex, follow` (`04-TECHNICAL-SEO.md` §3.3); excluded from sitemap | none | blueprinted |

---

## A · `/book/`

### A1 · Head

- **Title** (51): `Book Dog Grooming at Home in Ludhiana | PetDoorStep`
- **Meta** (150): `Book dog grooming at home in Ludhiana, plus cat grooming, walking or a vet visit. Fixed prices, no advance payment — confirm on WhatsApp in 2 minutes.`
- **H1:** `Book Dog Grooming & Pet Care at Home in Ludhiana`

### A2 · Keyword → block assignment

| Keyword (03 §2.10) | Lands in |
|---|---|
| book dog grooming at home ludhiana (P) | Title · H1 |
| book pet grooming online ludhiana · dog grooming appointment | BK-4 body |
| pet grooming booking whatsapp | BK-4 H2 **"Confirm on WhatsApp — here's what happens next"** |
| book dog walker · book vet home visit | widget service-card labels (`07` §3 Step 2) |
| same day slot · how fast do you confirm · reschedule or cancel | FAQ #1–#3 |
| grooming karwani hai (Hinglish) | BK-1 microcopy line (the page's one Hinglish use) |

### A3 · Blocks (DOM order)

| # | Block | Spec |
|---|---|---|
| BK-0 | Breadcrumb | `Home › Book` |
| BK-1 | Compact header (no hero photo — the widget must sit above the fold) | H1 · R5: "Takes about 60 seconds. No app, no login, no payment now." · microcopy: "Grooming karwani hai? 2 minute mein book karo." |
| BK-2 | **Booking widget** | `<BookingWidget client:visible />` per `07-BOOKING-SPEC.md` §8; reads `service`, `size`, `src` query params (§2); default `src=book_page`. Step 1 must render within the first 360×640 viewport |
| BK-3 | Reassurance row | R1 · R2 · R3 · R7 (`06` §9), one line each with icon |
| BK-4 | **What happens next** | H2 per A2 · 4 numbered steps: ① "WhatsApp opens with your booking pre-filled — just press send." ② "We confirm your exact slot within 10 minutes (9:00–19:00), with your groomer's name and photo." ③ "Your background-verified groomer arrives with a sealed, sanitised kit." ④ "Pay by UPI or cash after the service — and get a photo update." Body line: "Prefer to book pet grooming online without WhatsApp? Call [FILL:PHONE] and we'll set up your dog grooming appointment on the phone." |
| BK-5 | Promise band | 5-icon strip (`06` §4.1) |
| BK-6 | FAQ (4 Q&As, A4) | Plain accordion (BreadcrumbList is this page's only schema — `04` §2.9) |
| BK-7 | No-JS fallback | Always-present links: `wa.me/[FILL:WHATSAPP_NUMBER]` (generic prefill) + `tel:[FILL:PHONE]` — visible text, not hidden |

Sticky bar: hidden while the widget is open (`06` §3.3); exit-intent nudge never on this page (`07` §2 row 7).

### A4 · FAQ (4 Q&As)

1. **Can I get a slot today?** — Often, yes. Booking before 15:00 lets you pick today; we then confirm the earliest free slot on WhatsApp within 10 minutes. Grooming and vet visits run 9:00–19:00 (last booking 17:30); dog walks start from 6:00.
2. **How fast do you confirm my booking?** — Within 10 minutes between 9:00 and 19:00 — a real person replies on WhatsApp with your exact slot and your groomer's name and photo. Bookings sent after 19:00 are confirmed first thing from 9:00.
3. **Can I reschedule or cancel?** — Yes, free until 2 hours before your confirmed slot — just reply on WhatsApp. Since we never take advance payment, there's nothing to refund. Full terms are on our refund & cancellation policy page.
4. **Do I need to pay anything now?** — No. Booking is free and no payment is taken online. You pay by UPI or cash after the service, at exactly the price confirmed on WhatsApp.

---

## B · `/thank-you/`

### B1 · Head

- **Title** (50): `Booking Request Received – Thank You | PetDoorStep`
- `<meta name="robots" content="noindex, follow">` (`02` P128, `00` §11 E7) · no canonical needed · excluded from `@astrojs/sitemap` (only live routes are listed, `04` §7.1)

### B2 · Content (DOM order)

| # | Block | Spec |
|---|---|---|
| TY-1 | Headline | T1 verbatim: "Done! Your booking request is on WhatsApp. 🐾" |
| TY-2 | Reference | "Your booking reference: **{ref}**" — `ref` read from the query string (format `PDS-<YYYYMMDD>-<4 chars>`, `07` §5); if absent, hide this line (never show "undefined") |
| TY-3 | Body | T2 verbatim (confirm within 10 minutes; save our number [FILL:WHATSAPP_NUMBER]) + [Save our number] → `tel:[FILL:WHATSAPP_NUMBER]` |
| TY-4 | First-timer line | T3 verbatim, shown only when the widget flagged a first booking on this device (`07` §5) |
| TY-5 | What's next | 3 steps: slot confirmed on WhatsApp → groomer's name & photo → pay after the service |
| TY-6 | Didn't open? | E4 verbatim (WhatsApp didn't open → message [FILL:WHATSAPP_NUMBER] or call [FILL:PHONE]) |
| TY-7 | Cross-sell | Groom Club one-liner (`06` §7.3) → `/offers/` · "While you wait:" links to `/how-it-works/` and `/safety-hygiene/` |

- **Events:** a 3-line inline script fires `thank_you_view` with `{ ref, service }` (`09-ANALYTICS-TRACKING.md` §2a, §3.3) — no other events, no personal data.
- **Chrome:** sticky bar hidden; header/footer normal.

### B3 · Ship checks (both pages)

- [ ] `/book/` widget Step 1 visible at 360×640 without scrolling; works with `?service=full-groom&size=medium&src=pricing_row`
- [ ] JS disabled: BK-7 links still visible and working
- [ ] `/thank-you/` is `noindex, follow`, absent from the sitemap, and fires `thank_you_view` exactly once per load with a `ref`
- [ ] Reschedule wording identical on `/book/` FAQ #3, `/refund-policy/` and `00-MASTER-PLAN.md` §3.2
