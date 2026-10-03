// Home page (`/`) copy — website-plan/blueprints/home.md (B01), verbatim. The page and its block components
// (src/components/pages/home/) render these strings; shared copy (R1–R3, trust chips, offers, team lines, the Promise,
// FAQ answers) stays in its shared data file and is imported where it is used.
// Rules: prices only through src/lib/pricing.ts helpers (07 §4 — no ₹ figure is typed in this file; npm run
// check:prices) · every headline/line is the blueprint's or a decision logged in website-plan/decisions/w1-home.md.
import { groomers, isPlaceholder, type Person } from '../people';
import { beforeAfterPairs, type BeforeAfterPair } from '../reviews';
import { site } from '../site';
import { DOG_GROOM_IDS, flatPrice, fromPrice, lowestFixedPrice } from '../../lib/pricing';

/** home.md §1 Head. og:image is the brand default (petdoorstep-home.jpg); its alt is the 04 §4 file-list alt. */
export const HOME_HEAD = {
  title: 'PetDoorStep — Pet Grooming & Care at Home in Ludhiana',
  description:
    `Pet grooming at home in Ludhiana — dog & cat grooming, walking and vet visits. Grooming from ${fromPrice(DOG_GROOM_IDS)}, ` +
    'verified groomers, sanitised kit. Book on WhatsApp.',
  ogImageAlt: 'PetDoorStep — pet care at your doorstep in Ludhiana',
} as const;

/**
 * H-1 hero (home.md §3 H-1, 06 §2.3). The subhead is the 06 §2.3 line minus its closing sentence ("Serving Sarabha
 * Nagar, BRS Nagar, Model Town & all of Ludhiana.") and the word "sanitised": the measured fold-law fix (02 P150,
 * decision E3 — decisions/w1-home.md W1H-01). The areas stay covered by H-9 and the FAQ.
 */
export const HOME_HERO = {
  eyebrow: site.tagline,
  h1: 'Pet Grooming & Pet Care at Home in Ludhiana',
  subhead: `Grooming, walking and vet visits at your door — background-verified professionals, sealed kit, fixed prices from ${lowestFixedPrice()}.`,
  hinglish: site.taglineHinglish,
  primaryLabel: 'Book on WhatsApp',
  /** 08 §5.2 shot 1 (home hero crop); alt = home.md §5 verbatim (03 §5 row 12 Hinglish + "doorstep pet care"). */
  photo: {
    name: 'golden-retriever-bath-home-ludhiana.jpg',
    alt: 'ghar baithe pet care — doorstep pet grooming at home in Ludhiana',
  },
} as const;

/** H-2 social proof. Proof line, cards and the E6 empty state come from src/data/reviews.ts. */
export const HOME_PROOF = { heading: 'What Ludhiana pet parents say' } as const;

/** H-3 services grid (home.md §2 + §3 H-3). Cards = MONEY_PAGES card data (src/data/services.ts). */
export const HOME_SERVICES = {
  heading: 'All pet care services in Ludhiana — one verified team',
  intro: 'Dog and cat grooming at home, daily walks and vet visits — every pet grooming home service in Ludhiana, booked in one place.',
} as const;

/** H-4 how it works: StepsStrip (the 4 site-wide 04 §2.8 steps) + support line + link. */
export const HOME_STEPS = {
  heading: 'How it works — booked in under 2 minutes',
  support: 'Online pet grooming booking in Ludhiana that ends on WhatsApp — no app, no login, no payment now.',
  link: 'See the full process',
} as const;

/** H-5 price teaser: 3 tiles + R1/R2 + the /pricing/ link (anchor text = the 03 §2.1 long-tail). */
export const HOME_PRICES = {
  heading: 'Fixed prices — on the website, not at your door',
  tiles: [
    { label: 'Bath & Brush', price: `from ${fromPrice('bath-brush')}` },
    { label: 'Full Groom', price: `from ${fromPrice('full-groom')}` },
    { label: 'Vet visit', price: flatPrice('vet-visit') },
  ],
  link: 'See our full pet grooming price list',
} as const;

/** H-7 before/after strip — rendered only with ≥ 3 real, consented pairs (src/data/reviews.ts). SP-5 wording. */
export const HOME_GALLERY = {
  heading: 'Before & after: real Ludhiana grooms',
  note: "All photos shared with the pet parent's permission.",
  min: 3,
} as const;

/** H-7: three real, consented pairs across breeds — one pair per breed first (file order), then any other pair.
 *  Empty until reviews.ts holds ≥ 3 pairs: the page then omits H-7 (home.md H-7). */
export function homeGalleryPairs(): BeforeAfterPair[] {
  if (beforeAfterPairs.length < HOME_GALLERY.min) return [];
  const breeds = new Set<string>();
  const firstPerBreed = beforeAfterPairs.filter((p) => !breeds.has(p.breed) && !!breeds.add(p.breed));
  return [...firstPerBreed, ...beforeAfterPairs.filter((p) => !firstPerBreed.includes(p))].slice(0, HOME_GALLERY.min);
}

/** H-8 meet your groomers: block title + line from people.ts (06 §4.2); the link to /about/ (template SP-7). */
export const HOME_TEAM = { hireLink: 'How we hire', max: 3 } as const;

/** H-8: groomers already on the team, in people.ts order, at most 3. A card exists only for a real person — a
 *  [FILL:GROOMER_n_NAME] slot is nobody yet (people.ts honesty law, about.md AB-6). */
export function homeGroomers(): Person[] {
  return groomers.filter((p) => !isPlaceholder(p)).slice(0, HOME_TEAM.max);
}

/** H-9 areas grid. Cards = AREA_SLUGS / AREA_LINES (src/data/content.ts). */
export const HOME_AREAS = {
  heading: 'Doorstep pet care across Ludhiana',
  line: 'Not listed? We cover all of Ludhiana — no travel charge.',
} as const;

/** H-10 offers teaser — the /offers/ page name (01-SITEMAP) as the H2; the tiles use the content.ts offer copy. */
export const HOME_OFFERS = { heading: 'Offers & Groom Club' } as const;

/** H-11 FAQ — faqFor('/') (faq.json home-1 … home-6 = home.md §4). */
export const HOME_FAQ = { heading: 'Pet grooming at home — your questions' } as const;

/** H-12 final CTA band. */
export const HOME_CTA = {
  heading: 'Your pet deserves stress-free care at home. Slots this week across Ludhiana.',
  primaryLabel: 'Book on WhatsApp',
} as const;
