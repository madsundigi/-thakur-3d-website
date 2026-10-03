// /about/ copy — website-plan/blueprints/about.md §2 (B08), verbatim. Honesty rule (about.md header): personal facts
// about the founder or the team are [FILL:*] tokens Sunny writes (00-MASTER-PLAN §8); everything else is ready copy.
// The founder's name and the registered business name live in src/data/site.ts (founderName, legalName) and the team
// languages in src/data/people.ts (TEAM_LANGUAGES), so each real-world value is filled in one place. No ₹ figure here.

/** AB-1 hero photo: 08-DESIGN-SYSTEM §5.2 shot 12, whose crop is the about.md [FILL:FOUNDER_PHOTO] (the founder with
 *  their own pet, at home). Photo.astro renders the grey dev placeholder until the file is in src/assets/photos/. */
export const FOUNDER_PHOTO = 'petdoorstep-team-founder-ludhiana.jpg';

/** AB-1 alt (about.md §3). When the real photo lands, describe what it really shows (08 §5.2 / §5.4). */
export const founderPhotoAlt = (founder: string): string =>
  `${founder}, founder of PetDoorStep, with their dog at home in Ludhiana`;

/** AB-1 subhead. */
export const ABOUT_SUBHEAD = "Pet care at your doorstep — built in Ludhiana, for Ludhiana's pet parents.";

/** AB-2 "Our story". FOUNDER_STORY_DETAILS = 2–3 true sentences: Sunny's own pet moment that sparked the idea. */
export const STORY = {
  heading: 'Why we started PetDoorStep',
  p1: 'PetDoorStep started with a very Ludhiana problem. Getting a dog groomed meant a car ride, a crowded salon, or a freelancer who might not turn up — and nobody could tell you the price until they saw your dog.',
  founderDetails: '[FILL:FOUNDER_STORY_DETAILS]',
  p2: "So we built the service we wanted for our own pets: verified people who come to your home, a fresh sealed kit for every pet, every price published on the website, and a photo after every visit. We started in Ludhiana because it's home — we know the lanes, the 45-degree summers and the tick season — and we'd rather be the best in one city than average in ten.",
} as const;

/** AB-2 closing line (small, slate) — names the founder and the registered business name (02 P047). */
export const storyClosing = (founder: string, legalName: string): string =>
  `PetDoorStep was founded in Ludhiana by ${founder}. Registered business name: ${legalName}.`;

/** AB-3 mission — one line, large type. */
export const MISSION = 'Make professional pet care as easy as ordering at home — and as trustworthy as family.';

/** AB-5 "How we hire": the 4-line summary comes from hiringSteps({ summary: true }) in src/data/content.ts; each link
 *  renders only while its page is live (src/data/routes.ts). */
export const HIRING = {
  heading: 'How we hire',
  links: [
    { text: 'Our full safety standards', href: '/safety-hygiene/' },
    { text: 'Join the team', href: '/join-as-groomer/' },
  ],
} as const;

/** AB-6 — rendered only for people already on the team (src/data/people.ts); omitted while there are none. */
export const TEAM_HEADING = 'Meet the team';

/** AB-7 "Proudly Ludhiana". `languages` = TEAM_LANGUAGES joined as prose ("Punjabi, Hindi and English"). */
export const LUDHIANA = {
  heading: 'Proudly Ludhiana',
  line: (languages: string): string =>
    `We serve every corner of Ludhiana — from Sarabha Nagar and Model Town to Dugri, South City and Haibowal Kalan. Our team speaks ${languages}, and plans every visit around Ludhiana's seasons: early walks in May, tick checks in the monsoon, and gentle winter grooms when the fog rolls in.`,
} as const;

/** "Punjabi, Hindi and English" — the AB-7 languages line lists only what the team truly speaks (people.ts). */
export function languagesProse(list: readonly string[]): string {
  if (!list.length) throw new Error('about: TEAM_LANGUAGES is empty — AB-7 must name at least one language the team speaks');
  return list.length === 1 ? list[0] : `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
}

/** AB-9 CTA band heading. */
export const CTA_HEADING = 'Meet us at your doorstep. Book your first visit in 2 minutes.';
