// /ludhiana/dog-walking/ page copy — website-plan/blueprints/dog-walking.md (B04) on _TEMPLATE-service-page.md. Strings
// are the blueprint's wording verbatim (§1 head, §3 blocks, §5 alts); the two the blueprint leaves open (the SP-9
// anchor prefix, the SP-10 H2) are written to 06 voice and logged in website-plan/decisions/w1-walk.md. No rupee
// figure is typed here: every amount renders from src/data/pricing.json through src/lib/pricing.ts (07 §4;
// `npm run check:prices`). Shared copy stays in its shared home and is read by the layout: chips, body CTA, areas, OG
// image and the wa.me prefill (MONEY_PAGES, services.ts), the FAQ (faq.json), WALK_PAYMENT_LINE / steps / R-lines
// (content.ts), the SP-7 copy (people.ts MEET_WALKERS).
import { planPrice } from '../../lib/pricing';
import { site } from '../site';

export const WALK_PATH = '/ludhiana/dog-walking/' as const;

const walk1 = planPrice('dog-walking', 'walk-1x');
const walk2 = planPrice('dog-walking', 'walk-2x');
const trial = planPrice('dog-walking', 'walk-trial');

/** §1 Head, verbatim. The H1 is the fold-law cut "Dog Walker in Ludhiana" (00 §11 E3; decisions/w1-layout.md §1;
 *  decisions/w1-walk.md W1W-02) — the monthly price stays in the title, the meta and SP-4. */
export const HEAD = {
  title: `Dog Walker in Ludhiana – ${walk1}/Month | PetDoorStep`,
  description:
    `Background-verified, fixed daily dog walker in Ludhiana. ${walk1}/month (1 walk/day), GPS + photo after every walk. ` +
    `Trial week ${trial}. Book on WhatsApp.`,
  h1: 'Dog Walker in Ludhiana',
} as const;

/** SP-1 (§3; 06 §2.3): eyebrow, subhead, the primary label and the §5 hero alt (08 §5.2 shot 9: Beagle, park). The
 *  primary's target is the layout's (/book/?service=dog-walking&src=hero_dog-walking, Trial Week preselected — D2). */
export const HERO = {
  eyebrow: 'Daily dog walking',
  subhead:
    'The same fixed, verified walker every day, with GPS route and photo update after every walk. ' +
    `Try a full week for ${trial} before you commit.`,
  primaryLabel: `Start ${trial} Trial Week`,
  photo: {
    name: 'dog-walker-beagle-park-ludhiana.jpg',
    alt: 'Beagle on a leash walk with a PetDoorStep dog walker in a neighbourhood park in Ludhiana',
  },
} as const;

/** Section headings (§2 keyword table, §3). SP-10's H2 follows the template pattern "<Service> … — your questions"
 *  and carries the §2 secondary "dog walking ludhiana" (the blueprint names no FAQ H2 — W1W-09). */
export const HEADINGS = {
  sp3: 'What every walk includes',
  rules: 'Every walk, the same rules',
  sp4: 'Dog walking charges in Ludhiana — fixed monthly plans',
  windows: 'Ludhiana walk windows by season',
  sp5: 'Real walk updates',
  sp7: 'Background-verified, fixed walker',
  sp7Cards: 'Meet your walkers',
  sp10: 'Dog walking in Ludhiana — your questions',
} as const;

/** SP-3 lead-in (§3) — the §2 "dog walking ludhiana" slot. */
export const SP3_LEAD = 'Dog walking in Ludhiana, done like a routine your dog can trust.';

/** SP-3 ✓-lists (§3): one CheckList card per 00 §3.2 plan, in the blueprint's order, lines verbatim. */
export const PLAN_CARDS = [
  {
    title: '1 walk/day',
    priceText: `${walk1}/month`,
    items: [
      '~30-minute walk every day',
      'the same fixed walker',
      'GPS route shared after the walk',
      'photo update + short walk note (pee/poop/water/mood) on WhatsApp',
      'water carried on every walk',
    ],
  },
  {
    title: '2 walks/day',
    priceText: `${walk2}/month`,
    items: ['everything above, morning and evening (~30 min each)'],
  },
  {
    title: 'Trial Week',
    priceText: trial,
    items: ['meet-and-greet with your walker first', '7 walks (1/day, ~30 min)', 'full updates — no commitment after'],
  },
] as const;

/** SP-3 H3 "Every walk, the same rules" (§3), the five rules verbatim. */
export const WALK_RULES = [
  'leash on at all times (double-clip lead, never off-leash near roads)',
  '5-second back-of-hand tarmac test before setting off',
  'routes planned around known stray hotspots',
  'towel-dry paws and belly after rain',
  'walker never leaves your dog unattended',
] as const;

/** SP-3 photo (§5 Images): a phone showing a real walk update (route + photo). Named to the photos README pattern;
 *  not yet on the 08 §5.2 shot list (requests/w1-walk.md). Renders the grey placeholder until the file exists. */
export const UPDATE_PHOTO = {
  name: 'walk-update-whatsapp-gps-route-ludhiana.jpg',
  alt: 'WhatsApp walk update with GPS route and photo from a dog walker in Ludhiana',
} as const;

/** SP-4 H3 table (§3), verbatim. The windows are the 00 §3.1 walk hours + the Apr–Jun heat rule — the same values as
 *  site.ts hours.walks and the SP-6 step-3 line (content.ts); checked below (ship check §6 item 1). */
export const WALK_WINDOWS = {
  rowHeader: 'Months',
  columns: ['Walk windows', 'Why'],
  rows: [
    { label: 'Apr–Jun', cells: ['Before 8:00 or after 19:00 only', '38–45°C days; midday tarmac burns paws, heatstroke risk'] },
    { label: 'Jul–Sep', cells: ['6:00–9:30 · 17:30–20:30, shortened between showers', 'Monsoon: paws and belly towel-dried after every walk (fungal risk)'] },
    { label: 'Oct–Mar', cells: ['6:00–9:30 · 17:30–20:30', 'Comfortable months; full-length walks'] },
    { label: 'Dec–Jan fog days', cells: ['Morning walks move later (8:00–9:30)', 'Visibility and road safety'] },
  ],
} as const;

/** SP-9 (§3): the intro verbatim ("dog walking service near me" slot); the AreaCard anchor reads "Dog walking in
 *  {Area}" — walks start at the doorstep, they do not happen "at home" (W1W-08). */
export const SP9 = {
  intro: 'Searching for a dog walking service near me in Ludhiana? Our walkers know these neighbourhoods best:',
  prefix: 'Dog walking in',
} as const;

/** SP-11 supporting posts (§3; 10-CONTENT-CALENDAR weeks 6 and 20) — the layout renders them only once live (P074). */
export const POSTS = [
  { label: 'How Much Does a Dog Walker Cost Per Month in India?', href: '/blog/dog-walker-cost-india/' },
  { label: 'Dog Walking in Ludhiana Summers', href: '/blog/dog-walking-summer-timings-ludhiana/' },
] as const;

/** SP-12 (§3), verbatim — not the R8 pattern, so the line is passed as written, not through r8(). */
export const SP12 = {
  heading: 'Your Labrador deserves a daily walk with a familiar face. Trial Week slots open this week across Ludhiana.',
  support: `${trial} for 7 walks · then ${walk1}/month · no advance payment.`,
} as const;

// ── Build-time checks ─────────────────────────────────────────────────────────────────────────────────────────────
// 02 P011 / P019 / P024 / P026 lengths (code points, like check:pages), and the walk windows against the one source of
// the walk hours (00 §3.1 → site.ts): every time token in hours.walks must appear in the table.
(function validate() {
  const cp = (s: string) => [...s].length;
  const problems: string[] = [];
  if (cp(HEAD.title) < 50 || cp(HEAD.title) > 60) problems.push(`title is ${cp(HEAD.title)} chars (50–60, P011)`);
  if (cp(HEAD.description) < 120 || cp(HEAD.description) > 158 || HEAD.description.includes('"')) {
    problems.push(`meta is ${cp(HEAD.description)} chars (120–158, no ", P019/P024)`);
  }
  if (cp(HEAD.h1) < 20 || cp(HEAD.h1) > 70) problems.push(`H1 is ${cp(HEAD.h1)} chars (20–70, P026)`);
  if (cp(HERO.eyebrow) > 30) problems.push(`eyebrow is ${cp(HERO.eyebrow)} chars (≤ 30, template SP-1)`);
  for (const alt of [HERO.photo.alt, UPDATE_PHOTO.alt]) if (cp(alt) > 125) problems.push(`alt over 125 chars (P056): ${alt}`);
  const tableText = WALK_WINDOWS.rows.map((r) => r.cells.join(' ')).join(' ');
  const times = site.hours.walks.match(/\d{1,2}:\d{2}(?:–\d{1,2}:\d{2})?/g) ?? [];
  for (const t of times) if (!tableText.includes(t)) problems.push(`walk windows table lacks "${t}" from site.hours.walks (00 §3.1)`);
  if (problems.length) throw new Error(`src/data/pages/dog-walking.ts is invalid:\n  ${problems.join('\n  ')}`);
})();
