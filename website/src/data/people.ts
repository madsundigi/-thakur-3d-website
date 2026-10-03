// Team profiles rendered by GroomerCard.astro — content order is law from 06-CONVERSION-PLAYBOOK §4.2 (08 §4.10).
//
// HONESTY LAW (blueprints/about.md AB-6, _TEMPLATE-service-page.md SP-7): a card exists only for a person already on
// the team — never publish a card for someone not yet hired. Unknown real-world facts are [FILL:*] tokens (00 §8) or
// are simply left out; they are never estimated. When someone joins: replace their name token, then add years /
// speciality / languages / line / photo — every one of them true. `count` only once the real number exists (06 §4.2.8).
// Speciality examples from 06 §4.2: "Shih Tzu & Lhasa coats" · "anxious and senior dogs" · "Persian cat de-matting".

import type { MoneyPage } from '../lib/pricing';

export type PersonRole = 'groomer' | 'walker' | 'vet';
export type Language = 'Punjabi' | 'Hindi' | 'English';

/** What the team as a whole speaks — the about.md AB-7 line ("Our team speaks Punjabi, Hindi and English") and the
 *  Service schema's availableLanguage (04 §2.2, built from this list in src/lib/schema.ts). List only what the team
 *  truly covers today; remove a language here and both the page line and the markup follow. */
export const TEAM_LANGUAGES: readonly Language[] = ['Punjabi', 'Hindi', 'English'];

export interface Person {
  id: string; // stable key, e.g. "groomer-1"
  role: PersonRole;
  name: string; // first name (vet: full name) — [FILL:*] token until the person is on the team
  photo?: string; // Photo.astro asset name once shot (1:1, branded apron + ID badge visible — 06 §4.2.1)
  years?: number; // real number only (06 §4.2.4)
  speciality?: string; // one line (06 §4.2.5)
  /** A money page's own speciality line for this person, shown instead of `speciality` on that page's SP-7 cards —
   *  only when it is true of them. Blueprint examples: cat-grooming "Persian cat de-matting" (cat-grooming.md SP-7),
   *  puppy-grooming "Gentle with first-timers and nervous puppies" (puppy-grooming.md SP-7). Read it via specialityFor(). */
  specialityOn?: Partial<Record<MoneyPage, string>>;
  languages?: Language[]; // only the ones they truly speak (06 §4.2.6)
  line?: string; // one human line, ≤ 20 words (06 §4.2.7)
  count?: number; // pets groomed (groomer) / walks done (walker) — only once real (06 §4.2.8)
  credentials?: string; // vet only — "BVSc & AH" (vet-at-home.md §0.1, SP-7)
  regNo?: string; // vet only — state veterinary council registration number
}

export const groomers: Person[] = [
  { id: 'groomer-1', role: 'groomer', name: '[FILL:GROOMER_1_NAME]' },
  { id: 'groomer-2', role: 'groomer', name: '[FILL:GROOMER_2_NAME]' },
  { id: 'groomer-3', role: 'groomer', name: '[FILL:GROOMER_3_NAME]' },
];

export const walkers: Person[] = [
  { id: 'walker-1', role: 'walker', name: '[FILL:WALKER_1_NAME]' },
  { id: 'walker-2', role: 'walker', name: '[FILL:WALKER_2_NAME]' },
];

// The partner vet must be real before /ludhiana/vet-at-home/ ships (vet-at-home.md §0.3 — no anonymous vet).
// Credentials = the qualification the page requires (§0.1); species = the visit covers dogs and cats (FAQ #5).
export const vets: Person[] = [
  {
    id: 'vet-1',
    role: 'vet',
    name: '[FILL:VET_PARTNER_NAME]',
    credentials: 'BVSc & AH',
    regNo: '[FILL:VET_REG_NO]',
    speciality: 'Dogs & cats',
  },
];

/** Everyone, in the order /about/ "Meet the team" lists them (AB-6: groomers, walkers, then the vet card). */
export const team: Person[] = [...groomers, ...walkers, ...vets];

/** True while the person's name is still a [FILL:*] token (they are not on the team yet). */
export const isPlaceholder = (p: Person): boolean => p.name.includes('[FILL:');

/** The speciality line a card shows on `page` (a money-page slug): that page's override, else the general one. */
export const specialityFor = (p: Person, page?: MoneyPage): string | undefined =>
  (page ? p.specialityOn?.[page] : undefined) ?? p.speciality;

/** Photo alt text — blueprint wording (dog-grooming.md §4 SP-7, home.md H-8, about.md AB-6, vet-at-home.md §5). */
export function personAlt(p: Person): string {
  if (p.role === 'vet') return `${p.name}, registered veterinarian for PetDoorStep in Ludhiana`;
  return `${p.name}, background-verified PetDoorStep ${p.role}`;
}

// Block titles + supporting lines (06 §4.2; template SP-7; dog-walking.md SP-7; vet-at-home.md SP-7) — verbatim.
export const MEET_GROOMERS = {
  title: 'Meet your groomers',
  line: 'No gig marketplace, no strangers — the same small, verified Ludhiana team every time.',
} as const;
export const MEET_WALKERS = {
  title: 'Meet your walkers',
  line: 'Every walker is ID- and reference-checked, trained in leash handling and heat safety, and meets your dog before the first walk.',
} as const;
export const MEET_VET = {
  title: 'Meet your vet',
  line: 'Registered veterinarians only — every medical service, no exceptions.',
} as const;
