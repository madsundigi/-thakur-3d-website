# 08 · DESIGN SYSTEM — tokens, components, imagery & the performance law for the Astro build

> **This file owns** the entire visual layer: design tokens (colour, type, space, radius, shadow, breakpoints, z-index, motion), every UI component's anatomy/states/responsive behaviour, imagery and iconography rules, accessibility standards and the per-page performance budget. It obeys `00-MASTER-PLAN.md` — prices/services/areas/trust facts from §3 only, URLs via `01-SITEMAP.md` only, placeholders per §8 only. Copy comes from `06-CONVERSION-PLAYBOOK.md`; booking-widget behaviour from `07-BOOKING-SPEC.md`; build mechanics (fonts loading, `astro:assets`, schema, budgets' hard ceilings) from `04-TECHNICAL-SEO.md`. A developer must be able to build every screen from this file without asking a single question.

**Single source of truth for tokens:** every value in §1–§3 lives once, in `website/src/styles/global.css` (the Tailwind v4 entry file from `04` §1.1). No component ever hard-codes a hex, px-size or shadow.
**Grep gates (launch blockers, same pattern as `07` §4's price gate):**

```bash
# 1 — no raw hex outside the token file and the icons folder:
grep -rniE '#[0-9a-f]{3,8}\b' website/src --include='*.astro' --include='*.tsx' \
  | grep -v 'styles/global.css' | grep -v 'components/icons/'        # must return nothing
# 2 — no placeholder imagery shipped:
grep -rl 'placeholder-' website/dist 2>/dev/null                     # must return nothing
```

**Cross-file reconciliation notes (recorded here so nobody "fixes" the wrong file):**
1. **Sticky-bar breakpoint & button order** — `06` §3.3 (the behaviour owner) says visible **< 768px**, order **Call | WhatsApp | Book Now**. **08 renders per `06` §3.3**, and `07` §2 row 1 now says the same (resolved in the Wave 0 build, `00` §11 2026-10-02).
2. **Fonts** — `04` §1.3 names Nunito as the *default until 08 says otherwise*. **This file says otherwise:** display = Fraunces (§2). Per `04` §1.3's own swap clause, replace the package name in the `04` §1.1 install command and §1.3 table; every loading rule in `04` §1.3 (preload, swap, fontpie, 2-file/200 KB cap) stays unchanged.
3. **Body bottom padding 64px (`04` §5.2.4) vs bar height 56px (`06` §3.3)** — not a conflict: 56px bar + 8px clearance = the reserved 64px. Both stand.
4. **Desktop WhatsApp floating button (§4.17)** is a CTA entry point with `source` value **`float_desktop`** — now row 8 of the `07` §2 table and listed in `09` §2d.
5. **Dark mode: not built.** The site ships light-only at launch; `prefers-color-scheme` is ignored (a marketing site with photo-led content; revisit only via a Decision Log entry in `00` §11).

---

## 1 · Brand palette

Identity carried from the strategy report (`../pet-care-ludhiana-strategy/`, per `00` §3.1): **teal + amber**, warm paper surfaces, deep-teal ink accents.

### 1.1 Core tokens

| Token | Hex | Role |
|---|---|---|
| `--color-brand` | `#0e7c72` | Teal — primary brand colour: links, icons, secondary buttons, focus rings on light surfaces, steps-strip numerals |
| `--color-brand-deep` | `#0a5a53` | Deep teal — hover state of teal elements, trust-chip text on mint, dark band backgrounds |
| `--color-brand-dark` | `#073e39` | Deepest teal — footer & CTA-band background, OG-image background |
| `--color-cta` | `#e98a1f` | Amber — **primary booking CTA fills only** (rule 2 below) + "Most booked" badge + review stars |
| `--color-alert` | `#e2604f` | Coral — alert/error *surfaces, borders and icons* (never small text; see `--color-alert-ink`) |
| `--color-mint` | `#e9f5f2` | Mint — tinted cards, trust chips, selected-state fills, icon circles |
| `--color-sand` | `#fbf5ea` | Sand — warm section bands, review cards, price chips, price ribbon |
| `--color-ink` | `#15242a` | Ink — all body text and headings on light surfaces; text on amber & WhatsApp-green fills |
| `--color-muted` | `#6b7f86` | Muted blue-grey — **large text (≥ 24px / ≥ 18.66px bold), icons and form-control borders only** (4.20:1 on white — fails AA for small text; small secondary text uses `--color-slate`) |
| `--color-line` | `#d7e3e0` | Line — hairline borders, dividers, table rules, disabled fills. Decorative only — never the sole boundary of a form control (1.32:1) |
| `--color-paper` | `#ffffff` | Default page background |

### 1.2 Derived tokens (added by this file; exist only to pass AA — see §1.5 for the ratios)

| Token | Hex | Why it exists |
|---|---|---|
| `--color-slate` | `#51646c` | Small secondary text (captions, meta rows, breadcrumbs, helper text). `--color-muted` fails 4.5:1; slate passes on white, sand *and* mint |
| `--color-alert-ink` | `#b03a2a` | Error/alert *text* (form errors per `07` §3, alert banners). Coral `#e2604f` is only 3.49:1 on white — fails for text |
| `--color-cta-hover` | `#d87c15` | Hover/active of amber buttons (ink text still 5.17:1) |
| `--color-wa` | `#25d366` | WhatsApp brand green — **wa.me actions only** (`06` §3.1 primary CTA, `07` §8). Always paired with ink text/glyph (8.04:1); **white on it is banned (1.98:1)** |
| `--color-wa-hover` | `#1fbd5b` | Hover of WhatsApp buttons (ink text still 6.44:1) |

### 1.3 CSS custom properties + Tailwind mapping

The project uses **Tailwind v4** (`04` §1.1), so the theme is CSS-first — there is **no `tailwind.config.js`**; this `@theme` block *is* the config. Paste into `website/src/styles/global.css`:

```css
@import "tailwindcss";
@import "@fontsource-variable/fraunces";
@import "@fontsource-variable/inter";

@theme {
  /* Kill Tailwind's default palette so only brand tokens compile (bg-red-500 etc. become unavailable — enforcement by construction) */
  --color-*: initial;

  --color-brand: #0e7c72;
  --color-brand-deep: #0a5a53;
  --color-brand-dark: #073e39;
  --color-cta: #e98a1f;
  --color-cta-hover: #d87c15;
  --color-alert: #e2604f;
  --color-alert-ink: #b03a2a;
  --color-mint: #e9f5f2;
  --color-sand: #fbf5ea;
  --color-ink: #15242a;
  --color-muted: #6b7f86;
  --color-slate: #51646c;
  --color-line: #d7e3e0;
  --color-paper: #ffffff;
  --color-wa: #25d366;
  --color-wa-hover: #1fbd5b;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-transparent: transparent;
  --color-current: currentColor;

  /* Type (families — loading rules in 04 §1.3; fallback blocks generated by fontpie) */
  --font-display: 'Fraunces Variable', 'Fraunces Fallback', Georgia, serif;
  --font-body: 'Inter Variable', 'Inter Fallback', Arial, sans-serif;

  /* Breakpoints (§3.4) — md/lg/xl equal Tailwind defaults, restated here as law; sm/2xl removed */
  --breakpoint-*: initial;
  --breakpoint-xs: 360px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* Radius (§3.2) */
  --radius-*: initial;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Shadows (§3.3) — ink-tinted, never pure black */
  --shadow-*: initial;
  --shadow-1: 0 1px 2px rgb(21 36 42 / 0.06), 0 1px 3px rgb(21 36 42 / 0.08);
  --shadow-2: 0 4px 12px rgb(21 36 42 / 0.10);
  --shadow-3: 0 12px 32px rgb(21 36 42 / 0.16);
}

:root {
  --tap-min: 44px;            /* referenced by 07 §9 — minimum interactive target */
  --bar-h: 56px;              /* sticky mobile action bar height (06 §3.3) */
  --header-h: 60px;           /* 72px at ≥1024px — set via media query below */
  --measure: 65ch;            /* max text-block width */
  --dur-1: 120ms;             /* micro transitions (hover) */
  --dur-2: 200ms;             /* panel/accordion transitions — the ceiling (§3.5) */
}
@media (min-width: 1024px) { :root { --header-h: 72px; } }

body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: var(--color-paper);
  /* Reserve sticky-bar space at first paint — CLS guard per 04 §5.2.4 (56px bar + 8px clearance) */
  padding-bottom: calc(64px + env(safe-area-inset-bottom));
}
@media (min-width: 768px) { body { padding-bottom: 0; } }
```

Usage in markup: `bg-brand`, `text-ink`, `border-line`, `bg-cta hover:bg-cta-hover`, `text-slate`, `bg-wa`, `rounded-md`, `shadow-2`, `md:grid-cols-2`, `font-display` — nothing else compiles, which is the point.

### 1.4 Usage rules (binding)

1. **Amber = booking CTAs only.** `--color-cta` fills exactly three things: primary booking buttons ("Book Now", "See price & book", sticky-bar Book button), the "Most booked" badge, and review stars. Never backgrounds, never headings, never decorative shapes. If a screen seems to need more amber, it has too many CTAs — cut one (`06` §3.1: one primary CTA per viewport).
2. **WhatsApp green = wa.me actions only** (`06` §3.1, `07` §8). Never decorations, never non-WhatsApp buttons. Always ink text/glyph on it — white on `#25d366` is banned (1.98:1).
3. **Ink on amber, ink on WA green — always.** White text on `--color-cta` (2.59:1) and on `--color-wa` (1.98:1) fails AA and is forbidden.
4. **Coral is a signal, not a paint.** Alert borders, alert icons, error-state input outlines, the disabled-window chip note in the widget. Alert *text* uses `--color-alert-ink`. Coral never appears on a page that has no alert.
5. **Surface rhythm (60-30-10):** ~60% paper/sand/mint surfaces, ~30% teal family (text accents, icons, bands), ≤10% amber + coral. Section band order on long pages: paper → sand → paper → mint (trust strip) → paper → brand-dark (CTA band) → brand-dark (footer). Two adjacent sections never share a background.
6. **Text colour is binary:** ink for primary text, slate for secondary/meta. No third grey. Muted is reserved for large numerals, icons and form borders.
7. **Links** in body copy: `--color-brand`, underlined (`text-decoration-thickness: 1.5px; text-underline-offset: 3px`), hover → `--color-brand-deep`. Links on brand-dark surfaces: mint, underlined on hover.
8. **On dark surfaces** (`brand`, `brand-deep`, `brand-dark`): text is white or mint only (see §1.5); amber appears only as the CTA button or thin accent rule on `brand-dark` (4.62:1 — passes for large text/graphics; never small text on `brand-deep`, 3.12:1).
9. **Gradients: none.** Flat fills only. Photography provides the richness.
10. **`--color-line` is decorative.** Form-control borders use `--color-muted` (4.20:1 ≥ 3:1 non-text). Disabled buttons: line fill + slate text, `cursor: not-allowed`.

### 1.5 AA contrast — verified pairs (WCAG 2.1 relative-luminance math, computed 2026-10-02; `02` P136 calls these "pre-checked" — this table is that pre-check)

**Approved text pairs (≥ 4.5:1 — any size):**

| Foreground on background | Ratio |
|---|---|
| ink `#15242a` on paper / sand / mint | 15.94 / 14.69 / 14.27 |
| slate `#51646c` on paper / sand / mint | 6.20 / 5.71 / 5.55 |
| brand `#0e7c72` on paper / sand / mint (links, icons) | 5.07 / 4.67 / 4.54 |
| brand-deep `#0a5a53` on paper / sand / mint | 8.08 / 7.44 / 7.23 |
| white on brand / brand-deep / brand-dark | 5.07 / 8.08 / 11.95 |
| mint on brand-deep / brand-dark | 7.23 / 10.70 |
| sand on brand-dark (footer body text) | 11.01 |
| ink on cta `#e98a1f` / cta-hover `#d87c15` | 6.16 / 5.17 |
| ink on wa `#25d366` / wa-hover `#1fbd5b` | 8.04 / 6.44 |
| ink on coral `#e2604f` (alert chips) | 4.57 |
| alert-ink `#b03a2a` on paper / sand (error text) | 6.03 / 5.55 |

**Approved non-text / large-text pairs (≥ 3:1):**

| Use | Pair | Ratio |
|---|---|---|
| Form-control borders, large muted numerals | muted on paper | 4.20 |
| White large text/icons on coral alert banner | white on alert | 3.49 |
| Amber accent rule / large text on footer | cta on brand-dark | 4.62 |
| WA glyph on footer | wa on brand-dark | 6.03 |
| Coral alert icon on footer | alert on brand-dark | 3.43 |
| Focus ring on light surfaces | brand on paper / sand / mint | 5.07 / 4.67 / 4.54 |
| Focus ring on teal/dark fills | white on brand | 5.07 |

**Banned pairs (each has shipped on some competitor site; never here):** white on amber (2.59) · white on WA green (1.98) · white on muted (4.20 — borderline, banned for text) · amber on paper/sand as text (2.59/2.38) · amber on brand/brand-deep as small text (1.96/3.12) · coral as small text anywhere (3.49 best case) · muted small text (4.20 < 4.5) · line as a control border (1.32).

**Review stars exception:** amber stars on white are 2.59:1 — acceptable **only because** the rating is always also present as text: the star row carries `aria-hidden="true"` plus adjacent text ("★ [FILL:GOOGLE_RATING] on Google" sitewide line, or sr-only "Rated 5 out of 5 on Google" inside review cards). A star row without its text twin is a defect.

---

## 2 · Typography

### 2.1 Families (this section activates the swap clause in `04` §1.3)

| Role | Family | Package | Weights used | Where |
|---|---|---|---|---|
| Display | **Fraunces** (variable) | `@fontsource-variable/fraunces` | 600 (default), 700 (hero H1 only) | h1, h2, CTA-band heading, blockquote pull-lines, logo wordmark |
| Body / UI | **Inter** (variable) | `@fontsource-variable/inter` | 400, 500, 600, 700 | everything else: body, h3, h4, buttons, forms, tables, nav, captions |

- Install (replaces the Nunito line in `04` §1.1): `npm install @fontsource-variable/fraunces @fontsource-variable/inter`
- **Every loading rule in `04` §1.3 applies unchanged:** import once in the base layout, preload both WOFF2 files, `font-display: swap`, metric-matched fontpie fallbacks, Latin subset only, ≤ 2 families / ≤ 2 WOFF2 files / ≤ 200 KB (§8 sets the working target at 160 KB).
- fontpie commands (serif fallback for Fraunces, sans for Inter):
  ```bash
  npx fontpie ./node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2 --name Fraunces --fallback georgia
  npx fontpie ./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 --name Inter --fallback arial
  ```
- **Pre-approved substitute:** if Fraunces' hairline serifs break up at 18px on a low-DPI budget Android (test on one sub-₹15,000 phone during Wave 0 — e.g. any Redmi/Realme in hand), swap the display family to **Lora** (`@fontsource-variable/lora`, same weights, same rules) and log it in `00` §11. That is the entire decision procedure; no other families may be introduced.

### 2.2 Type scale (mobile-first; the clamp handles 360 → 1280 fluidly)

| Token | Size | Line-height | Family / weight | Tracking | Used for |
|---|---|---|---|---|---|
| `display` | `clamp(2rem, 1.3rem + 3vw, 2.75rem)` (32→44px) | 1.12 | Fraunces 700 | −0.01em | Hero H1 only |
| `h1` | `clamp(1.75rem, 1.3rem + 2vw, 2.25rem)` (28→36px) | 1.15 | Fraunces 600 | −0.01em | Page H1 on non-hero pages (legal, blog index) |
| `h2` | `clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem)` (22→28px) | 1.2 | Fraunces 600 | 0 | Section headings |
| `h3` | `1.1875rem` (19px), `1.25rem` (20px) ≥ 1024 | 1.3 | Inter 600 | 0 | Card titles, FAQ questions, widget step titles |
| `h4` | `1rem` (16px) | 1.4 | Inter 600 | 0 | Footer column titles, table headers |
| `body` | `1rem` (16px) | 1.65 | Inter 400 | 0 | Paragraphs, FAQ answers, inputs (16px stops iOS zoom-on-focus) |
| `body-lg` | `1.125rem` (18px) | 1.6 | Inter 400 | 0 | Hero subhead (≥ md; base uses `body`, §4.6 fold law), CTA-band line |
| `small` | `0.875rem` (14px) | 1.5 | Inter 400/500 | 0 | Meta rows, captions, reassurance lines, breadcrumbs |
| `micro` | `0.8125rem` (13px) | 1.4 | Inter 600 | +0.08em, uppercase | Eyebrow lines, badge text, footer legal |
| `price` | `1.25rem` (20px) card / `1.5rem` (24px) matrix | 1.2 | Inter 700, `font-variant-numeric: tabular-nums` | 0 | Every ₹ figure |

Rules: text blocks max-width `var(--measure)` (65ch) · all prices tabular-nums so matrices align · uppercase only at `micro` with tracking (never on headings or buttons) · no italics anywhere (testimonial quotes are upright inside quotation marks) · no text over photos except the before/after corner chips and watermark (§5.3) — hero text always sits on a solid surface (`02` P136 stays trivially true) · one `h1` per page, heading levels never skip.

---

## 3 · Spacing, radius, shadow, breakpoints, motion, z-index

### 3.1 Spacing — 4px base scale

Allowed steps (px): **4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96**. Tailwind spacing utilities map 1:1 (`p-1` = 4px … `p-24` = 96px); any other value needs a comment explaining why.

| Context | Mobile (< 768) | ≥ 1024 |
|---|---|---|
| Page side gutter | 16px | 24px; content max-width **1200px**, centred |
| Section vertical padding | 48px (64px for hero) | 80px (96px for hero) |
| Card internal padding | 16px | 24px |
| Stack gap inside a card | 8–12px | 8–12px |
| Grid gap between cards | 16px | 24px |

### 3.2 Radius

`--radius-sm` 6px (inputs, chips-square) · `--radius-md` 10px (buttons, small cards) · `--radius-lg` 16px (cards, images, table wrapper) · `--radius-xl` 24px (hero image, CTA band inner) · `--radius-pill` (chips, badges, floating button). Nested elements use one step smaller than their container.

### 3.3 Shadow / elevation (ink-tinted — values in §1.3)

| Level | Token | Used on |
|---|---|---|
| 1 | `--shadow-1` | Resting cards on paper, price-matrix wrapper |
| 2 | `--shadow-2` | Card hover, sticky bar, sticky header, price ribbon |
| 3 | `--shadow-3` | Floating WhatsApp button, exit card (`07` §2 row 7; non-modal, §4.17a) |

Cards on sand/mint use `border: 1px solid var(--color-line)` instead of shadow (shadows on tinted surfaces look muddy). Never both shadow and border on the same element.

### 3.4 Breakpoints (the four, as required): **360 · 768 · 1024 · 1280**

| Name | Min-width | What changes |
|---|---|---|
| base | 0 (designed at 360; functional to 320) | 1-column, sticky bottom bar, hamburger nav, chips scroll horizontally |
| `xs` | 360px | Design reference width; rarely used in code (base *is* the 360 design) |
| `md` | 768px | Sticky bar hides (`06` §3.3) → WhatsApp float appears (§4.17); 2-column grids; hero goes 2-col; chips wrap instead of scroll |
| `lg` | 1024px | Full header nav replaces hamburger (`07` §2 row 2); 3–4-column grids; header 72px |
| `xl` | 1280px | Content hits 1200px max-width; type clamps reach their ceilings; nothing else changes |

No other media queries are permitted (except `prefers-reduced-motion`, §7.4, and the print stylesheet exclusion — there is none at launch).

### 3.5 Motion

- Transitions: `transform`, `opacity`, `background-color`, `border-color`, `box-shadow` only — never `width/height/top/left`.
- Durations: `var(--dur-1)` 120ms hover/focus · `var(--dur-2)` 200ms panels/accordion — **200ms is the ceiling sitewide**. Easing: `ease-out`.
- No keyframe animations, no scroll-triggered effects, no parallax, no auto-playing anything, no carousel (`04` §5.2.1 ban). The site feels fast by *being* fast, not by animating.
- Everything collapses to 0ms under reduced motion (§7.4).

### 3.6 Z-index scale (fixed, no ad-hoc values)

`0` content · `10` sticky table first-column · `20` dropdown panel · `30` sticky header · `40` sticky mobile bar + WhatsApp float · `50` exit card (§4.17a) + mobile nav overlay.

---

## 4 · Component inventory

Conventions: one `.astro` file per component in `src/components/` (names given per component) · **zero JS in all of them** — the only React island is the booking widget (`04` §5.3, `07` §8), and the only inline scripts are the three `data-pds` exceptions in §8.1 (one of them is the exit card's, §4.17a); nav, accordion, dropdown and table are CSS-only · every interactive target ≥ `var(--tap-min)` 44px (48px in the sticky bar per `06` §3.3) · all copy comes from `06` / page blueprints — this section specifies *form*, not words (sample strings below are from `06` and shown for fit only).

### 4.1 Buttons — `Button.astro` (variants via prop)

| Variant | Fill / border | Text | Hover | Used for |
|---|---|---|---|---|
| `primary` | `bg-cta`, radius-md | ink, Inter 600, 16px | `bg-cta-hover` + shadow-1 | Book Now, See price & book (booking-flow CTAs only, §1.4 rule 1) |
| `whatsapp` | `bg-wa`, radius-md | ink, Inter 600, 16px + WhatsApp glyph 20px left | `bg-wa-hover` | Every wa.me deep link (`06` §3.1 primary) |
| `secondary` | paper fill, 1.5px `border-brand` | brand, Inter 600, 16px | `bg-mint` | Call [FILL:PHONE], See exact prices |
| `ghost` | none | brand, underlined | brand-deep | Tertiary text actions (`06` §3.1 max 1/screen) |
| `on-dark` | transparent, 1.5px white border | white | `bg-white/10` | Secondary CTA inside CTA band / footer |

Geometry: height 48px (44px minimum honoured), padding-x 24px, icon-gap 8px; full-width on base, intrinsic ≥ `md`. Active: `translateY(1px)`. Disabled: `bg-line text-slate`, no shadow, `cursor: not-allowed`. Focus: §7.2 ring. Loading state exists only inside the widget (label swap "Opening WhatsApp…", `07` §6 — no spinner). Labels only from the `06` §3.2 bank.

### 4.2 Badges & chips — `Chip.astro`

All pill radius, Inter 600; heights: badge 24px (micro type), chip 32px, input-chip 44px (widget, `07` §3).

| Kind | Style | Content |
|---|---|---|
| Trust chip | `bg-mint text-brand-deep`, check icon 16px | The `06` §2.1 standard set, verbatim |
| Price chip | `bg-sand text-ink`, tabular-nums | `from ₹599` etc. — rendered from `pricing.json` only (`07` §4) |
| "Most booked" badge | `bg-cta text-ink` | On the Full Groom card/column (`07` §3 Step 2) |
| Verified badge | `bg-mint text-brand-deep`, shield-check icon | "Background-verified ✔" on groomer cards (`06` §4.2), links to `/safety-hygiene/` |
| Alert chip | `bg-alert text-ink` | Rare; e.g. "closed today" notices |
| Selectable chip (widget) | paper fill, 1.5px `border-muted`; **selected:** `bg-mint`, 2px `border-brand`, check icon appears | Area/size/date/window options per `07` §3; selection never shown by colour alone (check + border weight) |

### 4.3 Header + nav — `Header.astro`

- **Anatomy:** ① logo lockup (§6.5, links `/`) ② nav links per `01` §2.1 law: Home · Services (dropdown: all 7 money pages, labels = page names from `01`) · Pricing · How it works · Reviews · ③ `Book Now` primary button → `/book/?src=header` (`07` §2 row 2).
- **Spec:** `position: sticky; top: 0`, `bg-paper`, permanent 1px `border-b-line` (no scroll-triggered shadow — that needs JS), height `var(--header-h)` (60 → 72px at `lg`), z-30. Nav links: Inter 500 15px ink, hover brand underline; current page: brand + underline + `aria-current="page"`.
- **Dropdown (≥ lg):** pure CSS via `:hover` and `:focus-within` on the Services `<li>`; panel `bg-paper shadow-2 radius-md`, 8px padding, each item 44px row (icon 20px + label). No JS, keyboard-reachable by Tab into the links.
- **Mobile (< lg):** logo + `Book Now` (compact, height 40px — the one permitted sub-44px *visual*; its hit area is padded to 44px) + hamburger. Hamburger = the `04` §5.2.1 CSS checkbox pattern: hidden `<input type="checkbox" id="nav-toggle">` + `<label for="nav-toggle">` (44px, menu/x icons swap via `:checked`); panel slides from right (`transform`, 200ms), full-height, `bg-paper`, z-50, listing the same nav items as 44px rows + a `whatsapp` button at the bottom.
- **Wave gating:** the Reviews item renders only once `/reviews/` is live (Wave 2); until then the nav shows 4 links + button.
- **A11y:** `<nav aria-label="Main">` (`04` §1.7); skip link before it (§7.5).

### 4.4 Footer — `Footer.astro`

- **Spec:** `bg-brand-dark`; headings white h4-micro uppercase; links **mint**, 44px tap rows, underline on hover; body text sand; 1px dividers `white/15`. Paw motif watermark (§6.4) bottom-right at 6% white opacity.
- **Columns (4-up at `lg`, accordion-free single column stacking on base):**
  1. **Brand:** logo (mint variant) · tagline *Pet care at your doorstep* (`00` §3.1) · ★ proof line "[FILL:GOOGLE_RATING] on Google · [FILL:REVIEW_COUNT]+ Ludhiana pet parents" linking `[FILL:GBP_LINK]` (`06` §4.4) · social icons: Instagram `[FILL:INSTAGRAM]`, GBP `[FILL:GBP_LINK]` (24px, mint).
  2. **Services** (all 7, per `01` §2.5): Dog Grooming at Home → `/ludhiana/dog-grooming/` · Cat Grooming → `/ludhiana/cat-grooming/` · Dog Walking → `/ludhiana/dog-walking/` · Vet at Home → `/ludhiana/vet-at-home/` · Dog Vaccination → `/ludhiana/dog-vaccination/` · Tick & Flea Treatment → `/ludhiana/tick-flea-treatment/` · Puppy Grooming → `/ludhiana/puppy-grooming/` (Wave-2 links render only when live).
  3. **Top 5 areas** (`05` §6.7 caps footer at 5; the five named in `05` §2.4): Sarabha Nagar · BRS Nagar · Model Town · Dugri · South City → their `/ludhiana/areas/<slug>/` pages, anchor text "Pet grooming in {Area}" (`01` §2.7) — rendered only once each page is live.
  4. **Company + NAP:** Pricing · How it works · About · Contact · FAQ · Reviews · Safety & Hygiene · Offers · Join as Groomer (Wave-gated) — then the **NAP block per `05` §4, verbatim values,** inside `<address>` (not italic — reset): "PetDoorStep · Ludhiana, Punjab — doorstep service across Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar · [FILL:PHONE] · WhatsApp [FILL:WHATSAPP_NUMBER] · [FILL:EMAIL] · Mon–Sun 9:00–19:00 (last booking 17:30)". Identical crawlable HTML text on every page (`04` §1.7); no street address ever (SAB, `05` §1).
- **Legal row:** micro sand/70 — © year PetDoorStep · Privacy Policy `/privacy-policy/` · Terms `/terms/` · Refund Policy `/refund-policy/` (Wave 2).

### 4.5 Sticky mobile action bar — `StickyBar.astro` (behaviour + labels owned by `06` §3.3; this is the skin)

- **Visibility:** fixed bottom, **< 768px only**; hidden on `/thank-you/` and while the widget is open (the widget page `/book/` omits the bar entirely — its own confirm button is the action).
- **Geometry:** height 56px + `env(safe-area-inset-bottom)` padding; `bg-paper`, 1px `border-t-line`, shadow-2 (upward), z-40. Grid `1fr 1fr 1.4fr`, 8px gaps, 8px side padding; every target ≥ 48px.
- **Buttons (left → right per `06`):** **Call** — `tel:[FILL:PHONE]`, paper fill, brand icon (phone 20px) + label "Call" (13px Inter 600 brand) stacked 2px apart · **WhatsApp** — `bg-wa`, ink glyph + "WhatsApp" label, page-specific wa.me prefill (`07` §2 row 1) · **Book Now** — `bg-cta text-ink`, boldest; label on service pages carries the live from-price: "Book · from ₹1,199" (one line, 14px, price tabular-nums; from `pricing.json`).
- Events per `09-ANALYTICS-TRACKING.md` §2 (its registry wins): `call_click` / `whatsapp_click` with `source: sticky_bar`; Book Now is tracked by the widget's `booking_started` with `source: sticky_bar`. Targets per `07` §2 row 1.

### 4.6 Hero — `Hero.astro` (formula + copy owned by `06` §2)

- **Anatomy (DOM order):** ① eyebrow (micro, brand) ② H1 (`display` type) ③ subhead (body-lg, slate) ④ CTA row: `whatsapp` or `primary` + `secondary` per the page's `06` §2.3 block ⑤ trust-chip row (the `06` §2.1 set) ⑥ photo (§5) ⑦ R3 reply-time line (small, slate, under CTAs).
- **Base (< md):** single column; chips are a horizontal scroll-snap row (one line, 32px chips, `overflow-x: auto`, no scrollbar styling hacks — `scrollbar-width: none` + edge-fade mask); photo 16:10, full-bleed to gutters, radius-lg. **Fold law (`02` P150; `00` §11 E3, 2026-10-03):** at 360×640 the H1, subhead, primary CTA and ≥ 1 trust chip must be fully visible **above the sticky bar** (§4.5, 56px + safe area), and the top ≥ 160px of the hero photo must be visible above it too — verified per template in DevTools responsive mode before launch. To make that fit, below `md`: every secondary hero CTA and the eyebrow are hidden (CSS only: they stay in the DOM, so `02` P110 parity holds); the subhead uses `body` size instead of `body-lg`; the breadcrumb (§4.18) uses `py-2`. A page that still fails becomes an explicit P150 exception for Sunny to decide, logged in `00` §11. It never ships silently.
- **≥ md:** 2 columns `7fr 5fr`, photo right at 4:3, radius-xl, shadow-1; chips wrap 2×2; paw motif (§6.4) behind the photo corner at 5% brand opacity.
- Photo is the LCP: eager + `fetchpriority="high"` + preload per `04` §5.2.2; never text over it.

### 4.7 Service card — `ServiceCard.astro` (home services grid, `/ludhiana/` hub, "related services" rows)

- **Anatomy:** ① photo 4:3 (real, §5) ② h3 service name = page name from `01` ③ one-liner (small, slate, from the page's `06` subhead, ≤ 70 chars) ④ price chip `from ₹…` (from `pricing.json`) ⑤ arrow-right icon, brand.
- **Spec:** `bg-paper border-line` radius-lg, padding 16/24; the whole card is one `<a>` (h3 inside the anchor; no nested links). Hover: shadow-2 + arrow translates 4px; focus: §7.2 ring.
- **Responsive:** base 1-col (full-bleed cards) · md 2-col · lg 3-col (7 services = 3+3+1 centred, or 4+3 at xl).

### 4.8 Price matrix table — `PriceMatrix.astro` (every grooming page + `/pricing/`; data = the `06` §5.2 canonical matrix, source `pricing.json`)

- **Anatomy:** caption (sr-only: "Dog grooming prices by size, in rupees") → `<thead>` Size · Weight · Example breeds · Bath & Brush · Full Groom (+"Most booked" badge) · Premium Spa → 3 `<tbody>` rows (Small/Medium/Large with the `00` §3.2 kg guide and breed examples verbatim) → each row ends in a `Book` link → `/book/?service=<id>&size=<size>&src=pricing_row` (`07` §2 row 5) → directly under the table, reassurance lines R1 + R2 from `06` §9 (small, slate, R2 in ink 600).
- **Spec:** real `<table>` (never divs); wrapper `radius-lg border-line shadow-1 overflow-x-auto`; `min-width: 640px` on the table; **first column sticky** (`position: sticky; left: 0; background: inherit`, z-10); right-edge fade mask signals scrollability. Header row `bg-mint text-brand-deep` h4; prices `price` type tabular-nums; zebra rows `bg-sand/50`; "Full Groom" column cells `bg-sand` (hero service emphasis); row height ≥ 52px.
- **Responsive:** base = horizontal scroll (zero JS, no duplicated stacked markup — one DOM, `02` content parity) · ≥ md fits without scroll.
- Flat-price services render as a simple 2-col list under the matrix, exactly the `06` §5.2 "flat-price lines".

### 4.9 Steps strip — `StepsStrip.astro` (home, `/how-it-works/`, `/book/` thin-safe content; steps mirror `04` §2.8 HowTo verbatim)

- **Anatomy per step (4):** numbered disc (40px circle, `bg-brand`, white Inter 700 numeral) · h3 step name · one-line text (small, slate). Step names/text = `04` §2.8: Choose your service → Tell us about your pet → Pick your area and time slot → Confirm on WhatsApp.
- **Responsive:** base = vertical list, discs on a left rail joined by a 2px dashed `border-line` connector · ≥ md = 4-up row, dashed connector between discs. Anchors `#step-1`…`#step-4` on `/how-it-works/` (the HowTo schema URLs point at them).

### 4.10 Groomer profile card — `GroomerCard.astro` (content order is law from `06` §4.2)

- **Anatomy:** ① photo 1:1 radius-lg (branded apron + ID badge visible, §5) ② h3 first name (`[FILL:GROOMER_1_NAME]`… until hired) ③ verified badge (§4.2) ④ small slate: "{N} years experience · {speciality}" ⑤ small slate: "Speaks: Punjabi · Hindi · English" (only true ones) ⑥ one human line (small, ink) ⑦ "Pets groomed" counter — only once the real number exists (`06` §4.2.8).
- **Spec:** `bg-paper border-line` radius-lg, padding 16; grid: base 1-col (photo left 96px + text, horizontal card) · ≥ md vertical card in a 3-up grid. Condensed variant (service pages): items ①–④ only.

### 4.11 Review card — `ReviewCard.astro` (display rules from `06` §4.4; **no Review schema**, `04` §2.0.4)

- **Anatomy:** ① star row: 5 amber stars 16px, `aria-hidden="true"` + sr-only "Rated 5 out of 5 on Google" (§1.5 stars exception) ② quote, 2–3 lines, body ink, `-webkit-line-clamp: 4` ceiling ③ attribution (small): owner first name ink 600 · **locality in brand** · "· {Pet} ({Breed})" slate ④ service chip (§4.2 price-chip style, no price) ⑤ month-year, micro slate.
- **Spec:** `bg-sand` radius-lg padding 16/24, no shadow (border-free on paper sections; on sand sections swap card bg to paper + border-line). Seeded with `[FILL:REVIEW_1]`-style tokens until real (`00` §8).
- **Responsive:** base 1-col stack · md 2-up · lg 3-up. Never a carousel (`04` §5.2.1).

### 4.12 Before/after pair — `BeforeAfter.astro` (rules from `06` §4.3; format per §5.3)

- **Anatomy:** ① figure with two square images side by side (grid `1fr 1fr`, 8px gap), left = before, right = after ② corner chip on each image, top-left: "Before" (paper/90 bg, slate text) / "After" (`bg-cta text-ink`) ③ watermark `[FILL:DOMAIN]` bottom-right of the *after* image (white 70%, micro) ④ `<figcaption>` small slate: the mandatory `06` §4.3 format "{Pet name} · {Breed} · {Service} · {Locality}".
- **Spec:** images radius-md; static side-by-side — **no slider** (needs JS; banned). Pairs shot same angle/light (`06` §4.3). Grids of pairs: base 1-col, md 2-col. Filter chips on `/reviews/` gallery are plain anchor chips to `#shih-tzu`-style sections (CSS `:target` highlights) — the `06` §4.3 breed list, zero JS.
- **A11y:** both images get full alt text (§5.4); the caption is not a substitute.

### 4.13 FAQ accordion — `Faq.astro` (zero-JS law, `04` §5.2.1)

- **Markup:** `<details class="faq"><summary><h3>Question</h3><svg plus-icon/></summary><div>answer</div></details>` — one per Q, never nested, first item NOT pre-opened (schema parity — all answers in DOM regardless).
- **Spec:** list separated by 1px `border-line`; summary = 44px min row, h3 type, ink, `list-style: none` + `::-webkit-details-marker { display: none }`; plus icon 20px brand, rotates 45° when `[open]` (CSS only, 200ms); answer body ink on paper, padding 0 0 16px 0, max-width measure; links inside answers per §1.4 rule 7. Hover: summary text → brand. Focus: §7.2.
- Questions/answers mirror the page's FAQPage JSON-LD verbatim (`04` §2.3).

### 4.14 Area card — `AreaCard.astro` (home "Areas we serve" grid + `/ludhiana/` hub)

- **Anatomy:** ① map-pin icon 20px brand in a 36px mint circle ② h3 area name ③ one-liner (small slate) — each area's genuinely distinct line comes from its `blueprints/_TEMPLATE-area-page.md` data (e.g. landmark or "same-week slots"), never a repeated sentence ④ arrow-right.
- **Spec:** `bg-paper border-line` radius-md, padding 16, whole-card anchor; anchor text pattern "Pet grooming at home in {Area}" (`01` §2.7). Hover `bg-mint`. Grid: base 2-col (compact cards) · md 3-col · lg 5-col ×2 rows for the ten `00` §3.3 areas. Cards for not-yet-live area pages render as plain text (no link) until the page ships (`05` §6.10 staggered publishing).

### 4.15 Blog card — `BlogCard.astro` (`/blog/` index + "related posts")

- **Anatomy:** ① image 16:9 radius-md ② category chip (mint/brand-deep, from frontmatter) ③ h3 title, 2-line clamp ④ excerpt small slate, 2-line clamp ⑤ meta row micro slate: date (`updatedDate ?? publishDate`, `04` §2.7) · read-time.
- **Spec:** borderless on paper (image carries the card), 12px stack gap; whole-card anchor; hover: title underline brand. Grid: base 1-col, md 2-col, lg 3-col (pageSize 12 per `04` §3.6).

### 4.16 CTA band — `CtaBand.astro` (page-end conversion block on every money page, per `06` §3.1 "repeat at page end")

- **Anatomy:** ① h2 (Fraunces, white) — page-contextual line per blueprint, pattern `06` R8 ("Your {breed} deserves a stress-free groom at home…") ② support line (body-lg, mint) ③ CTA row: `whatsapp` button + `on-dark` secondary (Call) ④ R3 reply-time line (small, mint).
- **Spec:** full-bleed `bg-brand-dark`, section padding per §3.1, inner content max 1200px; paw motif watermark right side, 8% mint opacity, overflow hidden; text max-width measure. Base: stacked, centred; ≥ md: text left / buttons right, space-between.

### 4.17 WhatsApp floating button — `WaFloat.astro` (desktop counterpart of the sticky bar)

- **Visibility:** **≥ 768px only** (mobile already has the bar's WhatsApp button); hidden on `/book/` (collides with the widget's confirm flow) and `/thank-you/`.
- **Spec:** fixed `right: 24px; bottom: 24px`, 56px circle, `bg-wa`, **ink glyph 28px** (§1.4 rule 3), shadow-3, z-40; hover `bg-wa-hover` + `scale(1.05)` (none under reduced motion); `aria-label="Chat with PetDoorStep on WhatsApp"`.
- **Behaviour:** static `<a>` to `wa.me/[FILL:WHATSAPP_NUMBER]` with the current page's prefill from `07`; fires `whatsapp_click` with `source: float_desktop` (registry note §0.4).

### 4.17a Exit card — desktop only (behaviour + copy owned by `07` §2 row 7; `00` §11 D1, 2026-10-03)

- **What it is:** a small **non-modal** card in a bottom corner of the window, never a dialog over a dimmed page. **No backdrop, no scrim**: the page behind stays visible, scrollable and clickable.
- **Size (`02` P107, launch-blocker):** ≤ **15% of the viewport** at every size where it can appear (from 1024px wide, `07` §2 row 7). It never covers the header, the H1 or the WhatsApp float (§4.17); the two corner elements must not overlap.
- **Skin:** paper surface, `radius-lg`, `shadow-3` (§3.3), z-50 (§3.6). The booking button is the amber `primary` variant (§1.4 rule 1: a booking-flow CTA) → `/book/?src=exit_nudge`; "No thanks" is a quieter text button. Focus ring per §7.2.
- **Closing:** Esc and "No thanks". There is no overlay, so there is no overlay click.
- **Copy:** `07` §2 row 7 strings. On `/ludhiana/cat-grooming/`, `/ludhiana/dog-walking/` and `/ludhiana/vet-at-home/` a neutral variant without dog-grooming wording, worded in the Wave-1 chrome build.
- **Motion:** opacity/transform only, ≤ 200ms (§3.5); none under reduced motion (§7.4).
- **JS:** its small inline script is one of the three `data-pds` exceptions in §8.1.

### 4.18 Breadcrumb — `Breadcrumb.astro` (every page below home; trail per `01` §2.6, 3-item decision per `04` §2.4)

- **Markup:** `<nav aria-label="Breadcrumb"><ol>` — Home → Ludhiana → {Page} (areas: Home → Ludhiana → {Area}; no "Areas" level). Links slate underline-on-hover; separators chevron-right 14px muted `aria-hidden`; current item ink 500, `aria-current="page"`, not a link. "Ludhiana" stays plain text until `/ludhiana/` ships in Wave 2 (`04` §2.4) — the BreadcrumbList schema still carries its URL.
- **Spec:** small type, 12px vertical padding (8px, `py-2`, below `md`: §4.6 fold law), sits directly under the header above the hero; wraps on base (no truncation needed at 3 items).

### 4.19 Booking-widget skin (behaviour, steps, copy = `07`; these tokens close its open references)

| Widget part | Spec |
|---|---|
| Progress dots | 8px circles, 8px gap: completed/current `bg-brand` (completed ones are links per `07` §3), future `bg-line`; `aria-hidden` per `07` §9; "Step X of 5" text = small slate |
| Price ribbon | sticky under dots: `bg-sand`, 3px left border `border-cta`, radius-sm, padding 8/12, small ink with the ₹ figure Inter 700 tabular-nums |
| Step title | h3, `tabindex="-1"` focus target (`07` §9) |
| Option chips/cards | §4.2 selectable-chip spec; service cards = selectable chip at card scale (radius-md, includes list in small slate) |
| Inline errors | small `text-alert-ink`, 4px gap under field, input border flips to `border-alert` 1.5px; `role="alert"` wiring per `07` §9 |
| Confirm button | `whatsapp` variant full-width; disabled state per §4.1 during the `07` §6 double-submit guard |
| Waitlist screen | mint panel radius-lg with the `07` §3 Step-1 strings |

---

## 5 · Imagery

### 5.1 Real-photo policy (law)

1. **Own photos only:** our groomers, our customers' pets, real Ludhiana homes. Owner consent collected on WhatsApp before featuring, reply stored (`06` §4.3); gallery footer note "All photos shared with the pet parent's permission."
2. **No stock, no watermarked downloads, no AI-generated pets, ever** — a user spots fake in milliseconds (research teardown finding; `02` P052 requires ≥ 50% original per money page — we target 100%).
3. Indian context on camera: Indian homes (verandahs, balconies, society lobbies), Indian breeds (Shih Tzu, Labrador, German Shepherd, Golden Retriever, Beagle, Pomeranian, Indie), branded apron + visible ID badge, the sealed-kit ritual.
4. No human faces without explicit consent; no house numbers/nameplates in frame (`05` §2.3).
5. **Until the launch shoot delivers:** dev builds use grey 4:3/1:1 SVG placeholders named `placeholder-*.svg` — the §0 grep gate blocks shipping them. Never "temporary" stock.

### 5.2 Launch shot list — one half-day shoot, 14 shots (consent + model releases on the day; these map 1:1 to `05` §2.3's GBP day-one set where noted)

Page alt text follows this list (`00` §11 E5, 2026-10-03): a hero's alt describes the shot named here (walking = Beagle, vet = Pomeranian, cat = on a towel), per the §5.4 formula. If the real photo shows a different breed or place, update the page's alt in the same commit.

| # | Shot | Used on | Source filename (`02` P058: lowercase, hyphens, 3–6 words) |
|---|---|---|---|
| 1 | Groomer bathing a Golden Retriever in a verandah, mid-lather, calm | Home hero + `/ludhiana/dog-grooming/` hero (different crops) | `golden-retriever-bath-home-ludhiana.jpg` |
| 2 | Groomer at a society gate with branded kit bag ("arriving" shot) | `/how-it-works/`, `/about/`, GBP #12 | `groomer-arriving-doorstep-ludhiana.jpg` |
| 3 | Sealed kit opened in front of the camera — blades/towels visible | `/safety-hygiene/`, trust strips, GBP #3 | `sealed-sanitised-grooming-kit.jpg` |
| 4 | Grooming table set up on a balcony, dryer + tools laid out | Service-page body ("we bring everything" block) | `grooming-table-setup-balcony-ludhiana.jpg` |
| 5 | Cat groom, calm handling, cat on towel at home | `/ludhiana/cat-grooming/` hero | `cat-grooming-at-home-ludhiana.jpg` |
| 6 | Shih Tzu **before** full groom (square, §5.3 angle) | Gallery pair A, GBP #5 | `shih-tzu-full-groom-before-ludhiana.jpg` |
| 7 | Shih Tzu **after** full groom (same angle/light) | Gallery pair A, GBP #6 | `shih-tzu-full-groom-after-ludhiana.jpg` |
| 8 | Labrador mid-bath, happy, water running | `/pricing/` + Bath & Brush sections, blog | `labrador-bath-brush-home-ludhiana.jpg` |
| 9 | Walker with a Beagle on leash, neighbourhood park | `/ludhiana/dog-walking/` hero, GBP #9 | `dog-walker-beagle-park-ludhiana.jpg` |
| 10 | Vet examining a Pomeranian at home, vaccine cold box visible | `/ludhiana/vet-at-home/` + `/ludhiana/dog-vaccination/` heroes, GBP #10 | `vet-home-visit-pomeranian-ludhiana.jpg` |
| 11 | Nail-trim close-up, clipper + paw | Nail service row, `/ludhiana/dog-grooming/` body | `dog-nail-trim-at-home.jpg` |
| 12 | Team group shot with founder, branded tees | `/about/`, GBP #11, `[FILL:FOUNDER_PHOTO]` crop | `petdoorstep-team-founder-ludhiana.jpg` |
| 13 | Groomer on the floor with a puppy at its first groom, towel and treat in hand | Home services grid: Puppy Grooming card (`ServiceCard`, 4:3) | `puppy-first-groom-at-home-ludhiana.jpg` |
| 14 | Groomer checking a dog for ticks at home (ears and neck parted, tick tool in hand) | Home services grid: Tick & Flea card (`ServiceCard`, 4:3) | `dog-tick-check-at-home-ludhiana.jpg` |

Shot 1 doubles as the OG photo source; shots 6/7 start the before/after library — every subsequent visit adds pairs per the `05` §2.3 ongoing cadence (2 photos/visit, consent logged).

### 5.3 Before/after format (the single most persuasive grooming asset — research teardown)

- **Square pair:** both frames 1:1, source ≥ 1200×1200, subject centred, same angle/light/background within a pair; shoot before-frame first at arrival, after-frame at close-out, phone camera is fine (daylight, no flash).
- Rendered side-by-side per §4.12 (display ≈ 280–560px each); export widths `[360, 600, 900]`.
- **Caption (mandatory, `06` §4.3):** "{Pet name} · {Breed} · {Service} · {Locality}" — e.g. "Simba · Golden Retriever · Full Groom · Model Town".
- Watermark `[FILL:DOMAIN]` on the after frame only (§4.12) — pairs travel in Ludhiana pet WhatsApp groups; the watermark is the free distribution channel.
- Area pages show pairs from that locality where available (`06` §4.3).

### 5.4 Alt-text formula (`02` P056: ≤ 125 chars, truthful, no "image of…" prefix; keywords from `03-KEYWORD-MAP.md` only where the image genuinely shows them)

**Formula:** `{breed or subject} + {what is happening} + at home in {locality}, Ludhiana` — locality named only when the photo was really taken there.

| Image type | Pattern | Example |
|---|---|---|
| Hero (service) | {Breed} being {service verb} at home in {locality}, Ludhiana | "Golden Retriever being bathed at home in Sarabha Nagar, Ludhiana" |
| Before frame | {Breed} before {service} at home in {locality}, Ludhiana | "Shih Tzu before full grooming at home in Model Town, Ludhiana" |
| After frame | {Breed} after {service} at home in {locality}, Ludhiana | "Shih Tzu after full grooming at home in Model Town, Ludhiana" |
| Trust/kit | literal description, no locality keyword | "Sealed grooming blades and towels being opened in front of the pet parent" |
| Groomer/team | PetDoorStep groomer {name} in branded apron with ID badge | "PetDoorStep groomer Gurpreet in branded apron with ID badge" |
| Walking | {Breed} on a walk with PetDoorStep walker in {locality}, Ludhiana | "Beagle on a morning walk with PetDoorStep walker in Dugri, Ludhiana" |

- **Hinglish placements (law from `03` §5, these three only):** home hero alt appends "— ghar baithe pet care" (row 12) · cat-bath image alt on `/ludhiana/cat-grooming/` may use "billi ko nehlana" (row 9) · nail-trim photo alt on `/ludhiana/dog-grooming/`: "dog ke nails kaatna — nail trim at home Ludhiana" (row 13).
- Decorative images (paw motifs, dividers): `alt=""` present-and-empty (`02` P057). Icons: `aria-hidden="true"` (§6.1).

### 5.5 File naming

Pattern: `{subject-or-breed}-{service-or-action}-{qualifier}-{locality?}-ludhiana.{ext}` → 3–6 hyphenated lowercase words (`02` P058); `before`/`after` is always the qualifier slot in pairs; counters only for same-subject series (`-01`, `-02`). Rename **before** import — never `IMG_0023.jpg` in the repo.

### 5.6 Pipeline — `astro:assets` (mechanics in `04` §1.4; these are the per-component numbers)

| Component | Aspect | `widths` | `sizes` | Max weight (largest variant) |
|---|---|---|---|---|
| Hero | 16:10 base / 4:3 ≥ md | `[400, 800, 1200]` | `(max-width: 767px) 100vw, 480px` | **≤ 120 KB** (§8 — tighter than the `04`/`02` 150 KB ceiling) |
| Service / blog card | 4:3 / 16:9 | `[320, 640]` | `(max-width: 767px) 100vw, 400px` | ≤ 60 KB |
| Before/after frame | 1:1 | `[360, 600, 900]` | `(max-width: 767px) 50vw, 420px` | ≤ 80 KB |
| Groomer photo | 1:1 | `[200, 400]` | `96px` base / `280px` card | ≤ 40 KB |

All via `<Picture formats={['avif','webp']}>`, explicit width/height, lazy below fold, hero eager + preloaded — exactly `04` §1.4/§5.2. OG images are separate static 1200×630 files per the `04` §4 file list (`/og/default.png` ships today; per-page files follow); their visual template: `bg-brand-dark`, paw motif 10% mint top-right, headline Fraunces 600 white 64px (≤ 2 lines), 6px amber rule under it, bottom row = logo lockup (mint) + from-price in sand (the brand default carries the tagline instead of a price).

---

## 6 · Iconography & the paw motif

### 6.1 Icon system

- **Library: Lucide**, inlined as SVG at build (copy path data into `src/components/icons/*.astro` or use `@lucide/astro` imports — either way output is inline `<svg>`, **no icon font, no runtime JS**, per `04` §5.2.5).
- **Style overrides (sitewide):** `stroke-width="1.5"` (not Lucide's default 2 — lighter weight suits Fraunces), `stroke="currentColor"`, `fill="none"`, `viewBox="0 0 24 24"`.
- **Sizes:** 16px (inside chips/captions) · 20px (buttons, list markers) · 24px (nav, footer) · 28px (WA float glyph). Always square, `aria-hidden="true"` + text label beside it; icon-only controls get `aria-label`.
- Icons are monochrome `currentColor` — they inherit §1.5-approved text colours, so contrast holds automatically.

### 6.2 Icon map (the complete launch set — add others only via Decision Log)

| Purpose | Lucide name | Purpose | Lucide name |
|---|---|---|---|
| Call CTA | `phone` | Walking service | `footprints` |
| Trust check | `check` / `check-circle-2` | Vet/vaccination | `syringe`, `stethoscope` |
| Verified badge | `shield-check` | Tick & flea | `bug` |
| Location/areas | `map-pin` | Photo update promise | `camera` |
| Slots/dates | `calendar-days` | Spa/premium | `sparkles` |
| Hours | `clock` | Grooming | `scissors` |
| Breadcrumb/links | `chevron-right`, `arrow-right` | Dog / cat / paw | `dog`, `cat`, `paw-print` |
| FAQ open/close | `plus` (rotates 45°) | Nav toggle | `menu`, `x` |
| Alerts/errors | `alert-circle` | Social | `instagram`, `facebook` |

**WhatsApp glyph exception:** Lucide ships no brand mark for WhatsApp. Create `src/components/icons/WhatsAppIcon.astro` once: the `whatsapp.svg` path from the **simple-icons** npm package, `viewBox="0 0 24 24"`, `fill="currentColor"` (it is a filled glyph, not stroked). This file is the second permitted hex-free icon source; used in the `whatsapp` button, sticky bar, float and footer.

### 6.3 The paw brand motif (carried from the strategy report cover)

Master asset `src/components/icons/PawMark.astro` — four toe pads over one main pad, geometric and rounded, drawn once as:

```html
<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
  <ellipse cx="10"   cy="18"   rx="4.6" ry="6"/>
  <ellipse cx="19.5" cy="12.5" rx="4.6" ry="6"/>
  <ellipse cx="28.5" cy="12.5" rx="4.6" ry="6"/>
  <ellipse cx="38"   cy="18"   rx="4.6" ry="6"/>
  <path d="M24 22c-7.4 0-13 6-13 11.8 0 4 3.1 6.7 7 6.7 2.3 0 4-1 6-1s3.7 1 6 1c3.9 0 7-2.7 7-6.7C37 28 31.4 22 24 22z"/>
</svg>
```

(≤ 1 KB inline; tilt `rotate(-12deg)` when used as a watermark so it reads as a print, not a logo repeat.)

**Approved uses — exactly these five:** ① logo lockup mark (§6.5) ② CTA-band + footer watermark (6–8% opacity, one per band, right side, overflow hidden) ③ hero photo backing accent at ≥ md (5% brand) ④ list markers on the `/safety-hygiene/` Promise block (16px brand) ⑤ OG-image corner (10% mint). **Don'ts:** never tiled/patterned backgrounds, never more than one visible watermark per viewport, never recoloured outside brand/mint/white, never as a bullet in ordinary body lists, never distorted.

### 6.4 Logo lockup & favicon artwork (fulfils the `04` §1.7 artwork obligation)

- **Lockup:** paw mark white on a `--color-brand` rounded square (radius 22% of side) + wordmark **PetDoorStep** in Fraunces 600, ink, no space, no camel-colouring. Clearspace = half the mark's width all round; minimum lockup height 28px; below that, mark alone.
- **On dark surfaces:** mark square flips to mint with brand-dark paw; wordmark mint.
- **Favicon set (files per `04` §1.7):** `favicon.svg` = white paw on brand rounded square; same artwork exported to `favicon.ico`, `apple-touch-icon.png` 180×180 (8% padding), `icon-192.png`, `icon-512.png`. GBP logo 720×720 (`05` §2.3.1) = the same mark square.
- Print materials (QR review card per `05` §3.3) use these exact tokens: brand + cta + ink on paper, Fraunces headline, Inter body — no print-only colours.

---

## 7 · Accessibility (AA floor, shipped in v1 — widget specifics live in `07` §9)

1. **Contrast:** only §1.5-approved pairs; text over photos is banned (§2.2 rules) so hero contrast never depends on an image; the review-stars text-twin rule (§1.5) is mandatory.
2. **Focus visible, everywhere:** global style — `:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; border-radius: inherit; }`; on brand/deep/dark fills the outline colour flips to white (both ≥ 3:1 per §1.5). Never `outline: none` without this replacement (`07` §9). Focus is never clipped by `overflow: hidden` parents — test the price-matrix Book links and chip rows.
3. **Touch targets:** ≥ `var(--tap-min)` 44×44px for every interactive element (48px in the sticky bar per `06` §3.3); ≥ 8px between adjacent targets; the compact header Book button pads its hit area to 44px (§4.3).
4. **Reduced motion** — global, non-negotiable:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation: none !important;
       transition: none !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   Nothing on the site conveys information through motion, so this removes zero meaning.
5. **Structure:** skip link as the first focusable element ("Skip to content" → `#main`; visually hidden until focused, then a brand-filled pill top-left) · landmarks per `04` §1.7 (one `header/main/footer`, `nav aria-label="Main"`) · one `h1` per page, levels never skip · `html lang="en-IN"` (`04` §1.7) — Hinglish phrases are short inline seasoning (`06` §1.4) and stay untagged · `.sr-only` utility defined once in `global.css` (standard clip-rect pattern).
6. **Images & icons:** alt per §5.4, empty-alt decorative (`02` P057), icons `aria-hidden` with text labels (§6.1).
7. **No colour-only state:** selected chips add a check + border weight (§4.2); errors add icon + text (`07` §3); links are underlined, not just teal (§1.4 rule 7); disabled window chips keep helper text (`07` §3 Step 4).
8. **Audit gate:** every Wave-1 template passes WAVE extension with zero contrast/label/landmark errors and a full keyboard walk-through (tab order = visual order; hamburger, dropdown, accordion, widget all operable) — logged with the `02` audit.

---

## 8 · Performance budget — per page (design-side law; `04` §5 owns the build tactics and hard ceilings)

### 8.1 Budgets

| Asset | Budget (this file — the working target) | Relation to `04`/`02` ceiling | Enforced by |
|---|---|---|---|
| CSS | **≤ 50 KB** compiled single stylesheet, pre-compression (expect ~25 KB purged Tailwind; inlined into `<head>` when ≤ 10 KB gz per `04` §5.2.5) | — (08 is the owner) | CI size check below |
| JS | **0 KB of bundled JS on every page**; `/book/` booking island **≤ 90 KB gzipped** incl. React runtime. **Inline-script exceptions** (`00` §11 2026-10-03; same list as `04` §5.3): exactly three small inline scripts may ship, each tagged with a `data-pds` attribute so the CI gate can allow-list them: ① the analytics bootstrap in the base layout (`09` §3.1), ② the exit card (§4.17a, `07` §2 row 7), ③ the `/thank-you/` script (`09` §3.3). Any other inline `<script>` fails the gate | `04` §5.1/§5.3 hard cap is 100 KB — the 90 KB working budget means the cap is never grazed; breaching 90 triggers the pre-approved Preact swap (`04` §5.3) **before** shipping | `04` §5.3 grep/CI gates + `gzip -c dist/_astro/*.js \| wc -c` |
| Hero image | **≤ 120 KB** (largest served variant) | `04` §1.4 / `02` P062 ceiling is 150 KB — 08 tightens it; 120 KB is comfortably achievable at 1200w AVIF | §5.6 table + Lighthouse |
| Content images | ≤ 100 KB each; ≤ 60 KB cards; page image payload ≤ 1 MB | = `04` §1.4 | §5.6 table |
| Fonts | 2 WOFF2 files, **≤ 160 KB total target** | `04` §1.3 cap 200 KB | build output check |
| Page weight (money pages) | ≤ 1.5 MB first load | = `04` §5.1 | Lighthouse |
| Lighthouse mobile | ≥ 90 on `/` + one service page (`00` §9.8); **target 95+** | = `04` §5.1 | pre-launch run |

### 8.2 Design-side bans that make the budget automatic

No carousels/sliders (`04` §5.2.1) · no animation or icon libraries at runtime (icons inline, §6.1) · no background videos, no parallax, no scroll-jacking (§3.5) · no web-font icon sets · no third-party embeds except the click-to-load map facade (`04` §5.2.4) and the single GA4 script (`04` §5.2.6) · decorative SVGs (paw, chips) ≤ 2 KB each, inline · accordion/nav/dropdown/table/gallery are CSS-only (§4) · OG images live in `/public/og/` and are never loaded by pages themselves.

### 8.3 CI enforcement (add to the build pipeline with `04` §5.3's gates)

```bash
npm run build
# CSS ≤ 50 KB raw:
[ "$(find website/dist/_astro -name '*.css' -exec cat {} + | wc -c)" -le 51200 ] || exit 1
# Booking island ≤ 90 KB gz (only /book/ may reference client JS — 04 §5.3 already asserts that):
[ "$(find website/dist/_astro -name '*.js' -exec cat {} + | gzip -9 -c | wc -c)" -le 92160 ] || exit 1
# Fonts ≤ 160 KB:
[ "$(find website/dist -name '*.woff2' -exec cat {} + | wc -c)" -le 163840 ] || exit 1
# Hex + placeholder grep gates from §0.
```

### 8.4 Definition of done (ties into `00` §6 Wave-0 scaffold + `04` §8)

- [ ] `global.css` matches §1.3 verbatim (tokens, `@theme`, body reservation); hex grep gate passes
- [ ] Fraunces + Inter self-hosted, preloaded, fontpie fallbacks in place; zero `fonts.googleapis.com` requests (`04` §8)
- [ ] Every §4 component built as a zero-JS `.astro` file with the specified states; keyboard walk-through per §7.8 passes
- [ ] Sticky bar reserves body padding (CLS ≈ 0 verified in Lighthouse), hides ≥ 768px; WA float appears ≥ 768px
- [ ] Launch shoot done; 14 shots in `src/assets/photos/` under the §5.2 names; zero `placeholder-*` files in `dist`
- [ ] Favicon set + GBP logo exported from §6.4 artwork; OG images per §5.6 and the `04` §4 file list
- [ ] §8.1 budgets green in CI on `/` and `/ludhiana/dog-grooming/`; Lighthouse mobile ≥ 90 both

---

*Cross-references: facts `00` §3 · URLs `01-SITEMAP.md` · audit params `02-SEO-PARAMETERS.md` (P056–P066 imagery, P136 contrast, P150 fold) · keywords & Hinglish alt rows `03-KEYWORD-MAP.md` §5 · fonts/images/schema/budget ceilings `04-TECHNICAL-SEO.md` §1/§4/§5 · NAP + GBP photo cadence `05-LOCAL-SEO.md` §2.3/§4 · copy, CTA system, sticky-bar behaviour `06-CONVERSION-PLAYBOOK.md` §2–§5/§9 · widget behaviour + `--tap-min` consumer `07-BOOKING-SPEC.md` §3/§9 · event names `09-ANALYTICS-TRACKING.md` · blog cards feed `10-CONTENT-CALENDAR.md`.*
