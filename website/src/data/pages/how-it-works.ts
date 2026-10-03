// /how-it-works/ — the page's own copy, verbatim from website-plan/blueprints/how-it-works.md (B10: §1 head, HW-1…HW-7).
// Not here, on purpose: the 4 booking steps (src/data/content.ts `bookingSteps` = 04 §2.8, which the HowTo markup reads
// too, so text and schema cannot drift) and the 5 FAQs (src/data/faq.json via src/lib/faq.ts, one source site-wide).
// No ₹ figure is typed in this file (07 §4; npm run check:prices). Choices made while building are logged in
// website-plan/decisions/w1-hiw-faq.md.
import { faqFor } from '../../lib/faq';

export const HIW_PATH = '/how-it-works/';

/** §1 head. `npm run check:pages` holds the built title, meta description and H1 to these exact strings. */
export const HIW_HEAD = {
  title: 'How It Works – Pet Care at Home in Ludhiana | PetDoorStep',
  description:
    'How doorstep pet care works with PetDoorStep in Ludhiana: pick a service, tell us about your pet, choose a slot and confirm on WhatsApp in under 2 minutes.',
  h1: 'How PetDoorStep Works — Booked in 2 Minutes',
} as const;

/** HW-1 hero subhead. */
export const HIW_SUBHEAD = "Four steps from 'my dog needs a bath' to a calm, clean pet — without leaving home.";

/** HW-2 H2 (the steps are `bookingSteps`, rendered by StepsStrip with #step-1…#step-4 anchors). */
export const HIW_STEPS_HEADING = 'Booking takes under 2 minutes';

/** HW-3 "On the day": H2 + the 6-step timeline, in blueprint order. */
export const HIW_DAY = {
  heading: 'What happens after you book',
  steps: [
    "Within 10 minutes (9:00–19:00) we confirm your exact slot on WhatsApp, with your groomer's name and photo.",
    "We message you when we're 15 minutes away.",
    'Your groomer arrives with an ID badge and opens a sealed, sanitised kit in front of you.',
    'The groom happens in your bathroom, balcony or verandah — watch as much as you like.',
    'We clean up, and you get photos of the result.',
    'Pay by UPI or cash, at exactly the confirmed price.',
  ],
} as const;

/** HW-4 "What to prepare": H2 (the block name), the ✓ checklist and its closing line. */
export const HIW_PREP = {
  heading: 'What to prepare',
  items: [
    'A tap point and a plug point near a bathroom, balcony or verandah',
    'Let your pet play and toilet before we arrive',
    'Keep the leash and a few treats handy',
    'Tell us about anxiety, skin issues or a first groom in your booking note',
    'An adult at home for grooming and vet visits',
  ],
  line: 'We bring everything else — table, towels, warm-water gear and dryer.',
} as const;

/** HW-6: the FAQ H2 (template SP-10 pattern "{topic} — your questions") and the closing link to /faq/ — the one
 *  contextual link into /faq/ from page content (02 P068); its anchor is /faq/'s primary keyword (01-SITEMAP). */
export const HIW_FAQ = {
  heading: 'How it works — your questions',
  more: 'More questions?',
  moreLink: 'See all pet grooming at home questions',
} as const;

/** HW-7 CTA band heading. */
export const HIW_CTA_HEADING = "That's it. Book your first visit in 2 minutes.";

// HW-6 shows exactly the 5 Q&As of how-it-works.md §3, in that order. A faq.json change that adds, drops or reorders
// one fails the build here instead of silently changing the page (check the blueprint first).
const HIW_FAQ_IDS = ['how-it-works-1', 'how-it-works-2', 'how-it-works-3', 'how-it-works-4', 'how-it-works-5'];
const got = faqFor(HIW_PATH).map((e) => e.id);
if (got.join() !== HIW_FAQ_IDS.join()) {
  throw new Error(`src/data/pages/how-it-works.ts: /how-it-works/ FAQ is [${got.join(', ')}], blueprint HW-6 wants [${HIW_FAQ_IDS.join(', ')}]`);
}
