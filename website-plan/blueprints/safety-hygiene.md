# B16 · SAFETY & HYGIENE — `/safety-hygiene/`

> Page blueprint — the differentiator page every "Background-verified ✔" badge links to. Obeys `00-MASTER-PLAN.md`
> §3.4; Promise copy from `06-CONVERSION-PLAYBOOK.md` §4.1. **Every SOP below is an operating commitment: publish a
> line only once the team actually does it.**

| URL | Wave | Schema | Status |
|---|---|---|---|
| `/safety-hygiene/` | 2 | BreadcrumbList | blueprinted |

## 1 · Head

- **Title** (56): `Safety & Hygiene Standards – Home Grooming | PetDoorStep`
- **Meta** (154): `How PetDoorStep keeps your pet safe at home: background-verified groomers, a fresh sealed kit for every pet, calm handling rules and registered vets only.`
- **H1:** `Our Safety & Hygiene Standards — the PetDoorStep Promise in Full`

### 1a · SERP-intent check (`02` P040) — 2026-10-08

- **Query:** no mapped primary keyword (`01` = "trust differentiator"); the page serves the informational trust
  queries `03` maps to it (#34 `how to check if a pet groomer is background-verified`, #35 `one sanitised kit per pet:
  why grooming hygiene matters`) and "is home pet grooming safe / hygienic". Checked 2026-10-08 with a US-located
  web-search tool (so no Ludhiana map pack) — re-check from an Indian connection before launch, log in `09` §7.
- **What ranks:** **informational guides and how-to/listicle blog posts** (Vetic "how to find the best dog groomer
  near you", pet-safety articles on choosing a safe/hygienic groomer, "what to ask a groomer" explainers). No
  single-operator safety-standards landing page ranks — this is open ground.
- **Intent:** MOFU reassurance — a cautious pet parent checking whether letting a stranger groom at home is safe and
  hygienic. The generic guides only tell them *what to ask*; they can't answer *for a specific provider*.
- **How this page matches:** it answers every one of those questions as a concrete, published operating protocol — the
  sealed-kit ritual (SH-3), the verification steps (SH-4), calm-handling rules (SH-5) and home-respect rules (SH-6) —
  so it ranks for the informational intent **and** converts (SH-1/SH-9 booking CTAs, SH-8 → the vet page). It is the
  target of every Wave-1 "Background-verified ✔" badge and the FAQ "Safety & trust" links, which point here once live.

## 2 · Blocks (DOM order)

**SH-0 Breadcrumb** `Home › Safety & hygiene` · **SH-1 Hero** H1 + "What we do before, during and after every visit — written down, so you can hold us to it." + [Book on WhatsApp].

**SH-2 · The PetDoorStep Promise** — full 5-point block verbatim (`06` §4.1; point 4 only after its gate).

**SH-3 · The sealed-kit routine** (H2 "A fresh, sealed kit for every pet")
1. After every visit, blades, combs and brushes are washed, disinfected with `[FILL:DISINFECTANT_PRODUCT]` (a veterinary-grade disinfectant), dried and sealed in a pouch labelled with the date.
2. Towels are hot-washed and sealed one set per pet.
3. Before touching your pet, your groomer sanitises hands and puts on a fresh apron.
4. At your door, the sealed pouch is opened **in front of you**.
5. Used tools go straight into a separate "used" bag — nothing is reused before it's cleaned again.
6. Cats get cat-only shampoo and products; dog anti-tick products are never used on cats.

**SH-4 · How we verify every groomer and walker** (H2 "Verified people, always")
① Application on WhatsApp → ② government ID + address proof checked, two references called → ③ police verification via the Punjab Police Saanjh service (`[FILL:POLICE_VERIFICATION_STATUS]` — claim this only once done for every team member) → ④ skills trial on a volunteer pet, scored on handling and hygiene → ⑤ training on our standards: calm handling, hygiene, heat safety, basic pet first aid → ⑥ three supervised visits before working solo; every visit after that is rated by the pet parent.

**SH-5 · Calm, safe handling** (H2 "How we handle your pet")
- **No sedation, ever.** We never give pets anything to calm them.
- **Stress signals we watch for:** lip-licking, yawning, trembling, a tucked tail, showing the whites of the eyes — any of these means a pause, comfort and a break.
- **Muzzles:** only with your consent, only a comfortable basket muzzle, only for reactive dogs, and never left on unattended.
- **Senior pets:** shorter sessions, a non-slip mat, gentle positioning for stiff joints.
- **Heat:** dryers on low heat with breaks; walks follow our summer rule (before 8:00 or after 19:00, April–June).
- **Health first:** open wounds, a skin infection or signs of illness mean we stop and suggest a vet visit before grooming.
- **If a pet is too stressed to continue safely, we stop** rather than force it.

**SH-6 · Respect for your home** (H2 "Guests in your home")
ID badge on arrival · shoe covers on request · we work only in the space you choose (never the kitchen or prayer room) · hair, water and mess cleaned up before we leave · photos only of your pet, only with your permission · no personal phone calls during a session.

**SH-7 · If something goes wrong** (H2)
"If anything goes wrong during a visit, we stop immediately, tell you on the spot, and help you get a vet check right away — from our partner vet or the nearest clinic." Insurance line: `[FILL:INSURANCE_STATUS]` — publish the true status (e.g. "Our visits are covered by [policy]" or omit the line until a policy exists). **Who pays for a vet check after an incident is a policy decision — held back until Sunny confirms it** (same gate as `06` §6 answer 4).

**SH-8 · Registered vets only** — "Every medical service — consultations, vaccinations, deworming, prescriptions — is done by a registered veterinarian. No exceptions." → `/ludhiana/vet-at-home/`.

**SH-9 · CTA band** — "Standards you can see at your own door. Book your first visit." + [Book on WhatsApp].

## 3 · Images (real, consented)

Sealed kit pouch with date label · ID badge close-up · groomer sanitising hands at a doorway · basket muzzle (if used).
Alts describe exactly what's shown, e.g. "Sealed, dated grooming-kit pouch opened at a home in Ludhiana".

## 4 · Ship checks

- [ ] Every SOP line is true in daily operations on publish day (walk through it with the team)
- [ ] `[FILL:DISINFECTANT_PRODUCT]`, `[FILL:POLICE_VERIFICATION_STATUS]`, `[FILL:INSURANCE_STATUS]` resolved or their lines omitted
- [ ] No incident-cost promise until the policy gate is cleared

## 5 · As built (stage w2-trust-a, 2026-10-08 — `website/src/pages/safety-hygiene.astro`)

Built on the shared layout + components; copy in `src/data/pages/safety-hygiene.ts`. The Promise (SH-2) and the
verification steps (SH-4) render from the shared `src/data/content.ts`, so this page, `/about/` and the FAQ cannot
drift. Decisions: `decisions/w2-trust-a.md`. The route stays `planned` until the integrator flips it live
(`requests/w2-trust-a.md` A1); until then the nav/footer "Safety & Hygiene" items, `PromiseBand`'s "Read the full
Promise" link and the `Chip verified` badge target all stay hidden, and every Wave-1 "Background-verified ✔" badge /
FAQ "Safety & trust" link keeps its safety-page reference as plain text. Zero client JS.

- **Head:** title 56 / meta 154 / H1 64 verbatim (§1). JSON-LD one `@graph` = **BreadcrumbList only** (`04` §2.9).
- **SH-0:** `Home › Safety & Hygiene` (labels from `routes.ts` — "Safety & Hygiene", the page name, not the blueprint's lowercase "hygiene"; the schema BreadcrumbList mirrors the visible crumb, `02` P084).
- **SH-1:** text-only `Hero` (H1 + subhead verbatim) + **[Book on WhatsApp]** → the booking form `/book/?src=hero_safety-hygiene` (amber, `06` §3.1 / `00` §11 E1 — not a wa.me link), `trustChips={[]}`, R3 kept. `test:site` WARNs "no `[data-hero-chip]`" exactly as the chip-less `/how-it-works/` hero does (HF-03) — not a miss.
- **SH-2:** `PromiseBand variant="full"` — the 4 un-gated points (point 4 "On time, or ₹100 off" waits for its `00` §3.4 gate in `content.ts`). No `medical` flag: SH-8 carries the registered-vet line (decision TR-07).
- **SH-3:** H2 "A fresh, sealed kit for every pet" + the 6-step ritual verbatim; step 1 names `[FILL:DISINFECTANT_PRODUCT]` (a veterinary-grade disinfectant). Numbered mint discs.
- **SH-4:** H2 "Verified people, always" + the verification steps from `hiringSteps()` — **5 of 6**: the Punjab Police Saanjh step is gated by `content.ts policy.policeVerified` (false) and drops out until the `[FILL:POLICE_VERIFICATION_STATUS]` gate clears, so the list is numbered from the result, never hard-coded to six (decision TR-05).
- **SH-5:** H2 "How we handle your pet" + the 6 bold-lead rules verbatim + the closing "If a pet is too stressed to continue safely, we stop rather than force it." in brand-deep.
- **SH-6:** H2 "Guests in your home" + the 6 commitments as a 2-column ✓-list (the blueprint's `·` line).
- **SH-7:** H2 "If something goes wrong" + the response commitment verbatim, then the insurance line = `[FILL:INSURANCE_STATUS]` (filled, or the line dropped, at launch). The "who pays for a vet check after an incident" promise is **held back** behind its policy gate (same as `06` §6 answer 4) — not written on the page (decision TR-08).
- **SH-8:** H2 "Registered vets only" + the line verbatim + "See how a vet-at-home visit works" → `/ludhiana/vet-at-home/` (live).
- **SH-9:** CTA band, heading verbatim, **[Book on WhatsApp]** → wa.me with the page's booking prefill + **[Call `[FILL:PHONE]`]**, both `data-source="ctaband_safety-hygiene"`, R3.
- **Images (§3):** none render — real, consented safety photos (sealed pouch, ID badge, hand-sanitising, basket muzzle) do not exist yet (honesty law, `08` §5.1). They are added to the `08` §5.2 shot list and dropped in once shot + consented (request C2).
- **Gates (build env `PUBLIC_PDS_PREVIEW_LIVE=wave1`):** `check:prices` OK · `check:budgets` 0 FAIL/0 WARN (CSS 44,177 B) · `test:site` 0 FAIL, 1 WARN (the chip-less-hero P150, as `/how-it-works/`) · `check:pages` only the by-design self-canonical P074 (route `planned` pre-merge — clears at the integrator's flip, A1).
