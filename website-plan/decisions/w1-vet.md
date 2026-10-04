# w1-vet — decisions log

Wave 1 · stage w1-vet · branch `wave1/w1-vet` (base `f66d994`). Scope: `/ludhiana/vet-at-home/` on the shared
`src/layouts/ServicePage.astro` — `src/pages/ludhiana/vet-at-home.astro`, `src/components/pages/vet-at-home/VisitTypes.astro`
and `EmergencyLine.astro`, `blueprints/vet-at-home.md` (§1a P040 check, §7 "As built"), this log and `requests/w1-vet.md`.
Rule order applied: 02 [Launch-blocker] > vet-at-home.md > 00 §11 > 06/07/08/04/09. Page-author notes followed:
`decisions/w1-layout.md` §2.3.

A first session built the page (`6ff3b78`) and was cut off before verifying it. This session built it, ran the gates,
checked every block against the blueprint and the template in the built HTML, reviewed it in Chromium at 360 / 768 /
1280, fixed what the gates found and wrote the records. No shared component, layout, data file, route or FAQ entry was
edited; needs in those files are in `requests/w1-vet.md`.

---

## 1 · Decisions

| # | Decision | Why |
|---|---|---|
| W1V-01 | **Hero:** `notice` = the SP-1 emergency line verbatim, paired with `subheadShort` = the subhead's first sentence (the W1L-5 + W1L-6 pattern); the full subhead shows from `md`. Nothing else in the hero is page-specific beyond the blueprint's copy values. | 02 P150 with the full notice: measured 8.0 px spare at 360×640 (blueprint §7), the same numbers `decisions/w1-layout.md` §1.2 measured. With the full subhead on phones the fold fails by 44.8 px (that table's last row). The sentence hidden below `md` repeats the price chip, "Medicines at MRP — bill shown" and the "Fixed visit fee" chip (vet-at-home.md §0 rule 2: never cut a safety word — none is). |
| W1V-02 | **SP-3 body = `VisitTypes.astro`** in the `sp3` slot: `CheckList` with the three visit types → the H3 "What a home visit can — and can't — do" as a plain `InfoTable` with `rowHeaders={false}` (two side-by-side lists, nothing sticky) → the medicine-MRP photo. From `md`: cards full width, then the table (7fr) beside the photo (5fr), aligned to the top; below `md`: DOM order, so the table is not pushed a screen down by the photo. | Template SP-3 ("Non-grooming pages replace the grid with a ✓-list per package"), the blueprint's H3 table, W1L-8 (page-specific pieces as small components in the slots). Paper band: no `onTint`. The table fits 360 without scrolling (154 + 174 px), so it is not `wide`. |
| W1V-03 | The ✓-lines are set in **sentence case** ("Full examination by a registered vet (…)"); every word is the blueprint's, only the first letter is capitalised. | The blueprint writes them lowercase after an inline ✓ in a running list; as list items each starts its own line. No wording changes — the facts stay 00 §3.2's. |
| W1V-04 | **No template SP-3 footnotes** on this page. | Footnote (a) "Everything above is included in the price — nothing on this list costs extra" would contradict the ✓-line "medicines or vaccines at printed MRP" (00 §3.2: ₹699 + MRP) — a false claim is a launch blocker (02 P042, honesty law). Footnote (b) is the grooming matting line. The blueprint's SP-3 lists neither; the template ties them to the ✓-grid. |
| W1V-05 | The vaccination card's "→ full details on `/ludhiana/dog-vaccination/`" renders as **"Full details on Dog Vaccination at Home — coming soon"** (text, slate) in the card's `cta-2` slot until that Wave-2 page is live, then as a link with the same words. | 02 P074 (no links to unpublished URLs); "Coming soon" is the wording the SP-11 `ServiceCard` already uses for that page, so the two never disagree. |
| W1V-06 | **SP-4 footer line = `EmergencyLine.astro`** in `sp4-extra` — last in the section, after the mid-page CTA and the `/pricing/` link; `role="note"`, the alert icon and alert-ink colour of the hero notice; the list is `site.emergencyVets`. | Blueprint SP-4 names it the section's "footer line". §0 rule 4 wants one value in FAQ #3 and SP-4: `site.ts` holds it and `src/lib/faq.ts` fills #3 from the same field, so the two cannot differ. `role="note"`, not `alert`: static routing text, read in place. |
| W1V-07 | **SP-5** = `{ kind: 'proof', heading: 'Real home visits' }` — nothing renders until `reviews.ts` holds ≥ 1 consented proof photo for vet-visit / vaccination / deworming. | Blueprint SP-5 "omitted until real" + W1L-11. The blueprint gives no H2 for the row and the template's ("Before & after: real Ludhiana grooms") is the grooming one; the heading mirrors dog-walking.md's "Real walk updates" and is flagged for the blueprint owner (`requests/w1-vet.md` D-1) — it ships nowhere until real photos exist. |
| W1V-08 | **SP-7** `team: 'vet'`, `variant: 'full'`, the `people.ts` MEET_VET heading and line; the card shows the name + "BVSc & AH", the Reg. No. badge and "Dogs & cats". Years, languages, the human line and the portrait are left out, never estimated. | W1L-14 and the people.ts honesty law; 02 P046 — the card renders with its `[FILL]` tokens so `check:fill` stops the launch until the vet is real (vet-at-home.md §0.3). |
| W1V-09 | **SP-12** H2 = the blueprint's own line ("Your pet deserves a calm check-up at home. Vet visits this week across Ludhiana."), not `r8()`; the support line verbatim with the fee from `flatPrice('vet-visit')`. | The blueprint's line is not the R8 pattern (page-author note, w1-layout §2.3). |
| W1V-10 | **Schema:** the Service node carries **one** Offer — "Vet Home Visit (consult)" → 699, description "medicines/vaccines at MRP" — although SP-4 shows three lines. Kept as `schema.ts` builds it. | 04 §2.2 per-page table + 00 §11 E8 ("keep the 04 §2.2 vet … Service offers"); the vaccination and deworming Offers belong to the dog-vaccination Service node in that table. 02 P087 (every Offer price visible on the page) and P049 (every visible price = pricing.json) both pass. Flagged as FYI in `requests/w1-vet.md` D-2 because the template's SP-4 line reads the other way. |
| W1V-11 | `check:prices` reads comments too: the page's only `₹` was in a frontmatter comment (the W1V-01 note) and is rewritten without the figure. | README "Checks"; nothing in the page or its components types a price — every figure is `flatPrice()` / the registries. |
| W1V-12 | The 02 P040 SERP intent check (blueprint §1a) stands as the first session wrote it; nothing on the page uses "Vets At Home" as a brand (the Civil Lines clinic's trading name): H1 generic, eyebrow names the service. | 02 P040 [Launch-blocker] needs a documented check in the blueprint; the §1a note records tool, date and the format decision. |

---

## 2 · Block-by-block verification (built HTML, `PUBLIC_PDS_PREVIEW_LIVE=wave1`)

| Block | Built from | Status |
|---|---|---|
| Head | §1 title (50) / meta (144) / H1; canonical, og:url, og:image `/og/vet-at-home.jpg`, og:title without suffix; `@graph` Service + FAQPage + BreadcrumbList | ✓ verbatim; JSON-LD parses in all three viewports |
| SP-0 | Home › Ludhiana › Vet at Home (Ludhiana plain text until `/ludhiana/`) | ✓ = BreadcrumbList |
| SP-1 | §3 eyebrow / H1 / subhead / CTAs / chips / notice / photo alt / R3 | ✓ verbatim; fold 8.0 px spare with the full notice (W1V-01) |
| SP-2 | proof line, E6 empty state, E4 CTA `Book Vet Home Visit — ₹699 + MRP` (`service_vet-visit`) + R2 | ✓ (registry) |
| SP-3 | §2 H2; 3 ✓-cards; H3 can/can't table (4 rows); MRP photo | ✓ verbatim (sentence case, W1V-03); no footnotes (W1V-04) |
| SP-4 | §2 H2; flat list (3 lines + Book); R1 + R2; mid-page CTA; `/pricing/` link; emergency footer | ✓ verbatim; `id="prices"` |
| SP-5 | proof row | omitted until real photos (W1V-07) |
| SP-6 | 4 steps (vet step 4), vet R4, "See the full process" | ✓ (content.ts) |
| SP-7 | "Meet your vet" + line; full vet card; "How we hire" | ✓ tokens rendered (W1V-08) |
| SP-8 | 4 Promise points + medical line | ✓ |
| SP-9 | §3 intro; Civil Lines · Model Town · Haibowal Kalan; 7-area closing line | ✓ (text cards until live) |
| SP-10 | vet-at-home-1…8 = FAQPage entries; #1 → `/pricing/`; #4, #5 text until live | ✓ verbatim; #3 carries the token |
| SP-11 | Dog Vaccination · Tick & Flea · Dog Walking cards; blog links once live; "Last updated" once dated | ✓ |
| SP-12 | §3 H2 + support; wa.me + tel, `ctaband_vet-at-home`; R3 | ✓ verbatim |
| SP-13 | `Book vet · ₹699` | ✓ (pricing.ts) |
| §6 ship checks | legal tokens rendered · emergency line in the fold · no 24×7 / night / online claim · one Hinglish use | ✓ (blueprint §7) |

---

## 3 · Gate results — final build of this stage

| Gate | Result | Notes |
|---|---|---|
| `check:pages -- --pages /ludhiana/vet-at-home/` | **0 FAIL · 2 WARN** | Both WARNs are P074 links to live Wave-1 routes not built in this worktree (`/ludhiana/cat-grooming/`, `/ludhiana/dog-walking/`). Every other rule passes, P161 included (`hero_vet-at-home`, `service_vet-visit`, `pricing_row`, `ctaband_vet-at-home`) |
| `check:budgets -- --pages /ludhiana/vet-at-home/` | **0 FAIL · 0 WARN** | CSS 50,653 B of 51,200 (547 B headroom — `requests/w1-vet.md` E-1); scripts 3 (analytics, JSON-LD, exit card); 2 font preloads |
| `check:prices` | **OK** | after W1V-11 |
| `test:site -- --pages /ludhiana/vet-at-home/ --port 4591` | **0 FAIL · 1 WARN** | 360 / 768 / 1280: no overflow, no console errors, no failed requests, axe clean, JSON-LD parses, CLS 0.000; **fold ok at 360×640 including the notice**; tracking ok (11 links, each logged with its `data-source`); exit card ok at 1280, absent on `/book/`. The WARN is P099 (LCP = the subhead while the hero is a placeholder; clears with the real photo, requests C-1) |

Screenshots (fold 360×640, full pages at the three widths, chunked 360 page, hero / SP-3 / SP-4 / SP-7 crops at 768
and 1280): `scratchpad/wave1/w1-vet/` of this session. Nothing needed a visual fix: the cards stack 1 / 2 + 1 / 3, the
can/can't table wraps to 3–4 lines per cell at 360 and sits beside the photo from `md`, the flat-price rows keep each
price with its "+ MRP" suffix, the two notices read as routing text.

---

## 4 · Template §4 "Required to ship" — status for this page

| Item | Status |
|---|---|
| URL = 01-SITEMAP (`/ludhiana/vet-at-home/`) | ✓ |
| All 14 blocks in §1 order, none invented, none dropped | ✓ (SP-5 renders itself once real; SP-13 is Base chrome) |
| Title 50–60 · H1 formula, unique | ✓ 50 · "Vet at Home in Ludhiana" |
| Meta 120–158, keyword + Ludhiana early, CTA + trust fact | ✓ 144 |
| Every ₹ = pricing.json (hero, subhead, lists, FAQ, schema, sticky) | ✓ `check:prices`, P049 |
| Price list is a real `<table>` with R1 + R2 | ✓ (PriceMatrix flat mode) |
| 4 trust chips + price chip; fold at 360×640 | ✓ 8.0 px spare, no P150 exception needed |
| CTA rhythm hero → after SP-2 → after prices → CtaBand; canonical `src` | ✓ P161 clean |
| 6–8 FAQs = FAQPage verbatim | ✓ 8 |
| Link quota: `/pricing/` + `/book/` + siblings + 3 areas + blog posts; nothing unpublished linked | ✓ (siblings / areas / posts render as text until live, P074) |
| Schema zero errors, no Review/AggregateRating | ✓ parses; types per 04 §2.9 (`check:pages`) — Rich Results Test is the launch audit's |
| Real photos only; hero eager + preloaded | hero / SP-3 / SP-7 photos are placeholders (requests C-1); eager + preloaded ✓ |
| ≥ 800 words, every claim true today | ✓ 1,170; §0 rules — no emergency / night / online / 24×7 claim |
| `grep "FILL:"` → only pre-launch tokens | ✓ PHONE, WHATSAPP_NUMBER, EMAIL, GBP_LINK, GOOGLE_RATING, REVIEW_COUNT, INSTAGRAM, GA4_ID, DOMAIN (site-wide) + VET_PARTNER_NAME, VET_REG_NO, EMERGENCY_VET_LIST (this page's §0) |
| 02 audit row | the launch audit's (02 §5), after the fills |
