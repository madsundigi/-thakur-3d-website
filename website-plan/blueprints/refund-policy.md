# B21 · REFUND & CANCELLATION POLICY — `/refund-policy/`

> Page blueprint (**as built**, Wave 2 · w2-trust-b · 2026-10-08). 01-SITEMAP §1 legal row: "Must match what we
> honour (reschedule/refund rules)". No pre-existing blueprint — this page is defined here and built **exactly like
> the Wave-1 legal pages** (`/privacy-policy/` B19, `/terms/` B20): shared legal shell, facts from `src/data/legal.ts`
> + `src/data/content.ts`, legal unknowns stay `[FILL:*]` (00 §8, E12), a lawyer reviews the rendered page before
> launch (00 §9 item 7, D4). Indexable, BreadcrumbList only (04 §2.9). Zero client JS. No Hinglish. P040 N/A (legal).

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/refund-policy/` | 2 | BreadcrumbList | as built |

## 1 · Head

- **Title** (55): `Refund & Cancellation Policy for Pet Care | PetDoorStep`
- **Meta** (157): `How payment, rescheduling, cancelling and refunds work at PetDoorStep in Ludhiana: no advance payment, free changes until 2 hours before your confirmed slot.`
- **H1:** `Refund and Cancellation Policy`

## 2 · Blocks (DOM order)

**RF-0** Breadcrumb `Home › Refund Policy` · **RF-1** header: H1 · "Effective from {POLICY_EFFECTIVE_DATE}." ·
"Last updated: {POLICY_EFFECTIVE_DATE}" · intro (no advance payment → nothing to pay upfront and, in the usual case,
nothing to refund; links to `/terms/` while live) · the on-page "On this page" contents list.

**RF-2 · How and when you pay** (H2) — `SERVICE_RULES` verbatim: `pay-after` (no advance; UPI/cash after the service;
monthly walking at month-end), `add-ons-first` (nothing added at your door; quoted on WhatsApp before we start),
`mrp` (medicines/vaccines at printed MRP, bill shown).

**RF-3 · Rescheduling and cancelling** (H2) — `RESCHEDULE_TEXT` (content.ts, the one site-wide wording of the 00 §3.2
rule: free until 2 h before, nothing to refund) + the two `/terms/` TM-7 bullets `[FILL:LATE_CANCEL_RULE]` /
`[FILL:NO_SHOW_RULE]` + the rain/fog walk line.

**RF-4 · Refunds** (H2) — honest: no advance payment, deposit or joining fee, so normally nothing to refund; if a
paid service was not right we put it right (redo / adjust the bill); nothing limits your `Consumer Protection Act,
2019` rights (`LAW.CONSUMER_ACT`); monthly walking is paid for walks actually done, so no advance to return.

**RF-5 · If something goes wrong** (H2) — `SERVICE_RULES` `stop-safely` verbatim + the TM-10 wording (we stop, help
you get a vet check) + the Grievance Officer line (`IDENTITY.GRIEVANCE_OFFICER_NAME` / `_EMAIL` / `_PHONE`, all
`[FILL:*]`) + a WhatsApp link (`source="refund-policy_page"`).

**RF-6 · Changes to this policy** (H2) — effective-date note + contact line (WhatsApp `source="refund-policy_page"`,
email, and a `/privacy-policy/` link while live).

## 3 · As built

- **Shell** — `LegalPage.astro` / `ContactLink.astro` could **not** be reused: their `path` prop is typed
  `'/privacy-policy/' | '/terms/'` and this wave may not edit shared components. So `refund-policy.astro` inlines the
  identical shell (Base + `<Breadcrumb>` + the 808px reading column + the legal header block + the "On this page"
  contents nav) and reuses the path-agnostic `LegalSection`; contact anchors are inlined (`waHref` + `data-source`,
  `telFor`, `mailto:`). A **request** (`requests/w2-trust-b.md`) asks the integrator to widen those two unions to
  include `/refund-policy/` so a later refactor can adopt them.
- **Data** — every fact from `legal.ts` (`SERVICE_RULES`, `IDENTITY`, `LAW`) and `content.ts` (`RESCHEDULE_TEXT`),
  rendered in `<div class="prose">`. "Last updated"/"Effective from" from `IDENTITY.POLICY_EFFECTIVE_DATE`. No ₹ typed.
- **WhatsApp prefill** — `services.ts PAGE_PREFILL` has no `/refund-policy/` entry (shared data file, not editable
  this wave), so `prefillFor('/refund-policy/')` falls back to the booking default. The page defines a local prefill
  `"Hi PetDoorStep, I have a question about your Refund Policy: ___"` (mirrors the /terms/ wording) and passes it to
  Base's `waText` and its own contact links. Request filed to add the entry upstream.
- **Schema** — `schemaGraphLd({ type: 'breadcrumb-only', crumbs })` = BreadcrumbList (matrix row already present in
  `check-pages` schemaRow and `schema.ts`). Base already lists `/refund-policy/` in `NO_EXIT_CARD` (no exit card).
- **This page is the target of the book / FAQ refund references** — those links render once the integrator flips
  the route live (`routes.ts` already has the `/refund-policy/` planned row + `sources.ts` has the `refund-policy`
  slug; `lastmod.ts` entry to be added at flip, 2026-10-08).

## 4 · Ship checks

- [x] Built exactly like `/privacy-policy/` + `/terms/` (shared legal shell markup, `prose`, 808px column).
- [x] reschedule/refund facts = `legal.ts` + `content.ts RESCHEDULE_TEXT` (00 §3.2: free until 2 h before, no advance
  so nothing to refund) — no invented facts.
- [x] `check:legal --dist` still green (refund-policy introduces no `pds_*` key and no `track()` event).
- [x] "Last updated" from `POLICY_EFFECTIVE_DATE`; BreadcrumbList schema; no Hinglish; legal unknowns stay `[FILL:*]`.
- [ ] **Lawyer review before launch** (00 §9 item 7, D4) — see the review points in `decisions/w2-trust-b.md`.
