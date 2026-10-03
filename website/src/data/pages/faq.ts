// /faq/ — the page's own strings and wiring, per website-plan/blueprints/faq.md (B11: §1 head, §3 sections, §5 blocks).
// Everything else comes from the shared FAQ source (src/data/faq.json via src/lib/faq.ts): the 28 questions and
// answers, the 6 category H2s and their one-line links (faqPageSections, FAQ_PAGE_CATEGORY_LINKS) and the CTA band
// heading (FAQ_CTA_HEADING). No ₹ figure is typed in this file (07 §4; npm run check:prices). Choices made while
// building are logged in website-plan/decisions/w1-hiw-faq.md.
import { faqPageEntries, faqPageSections, type FaqCategory } from '../../lib/faq';
import { routeLabel } from '../routes';
import { prefillFor } from '../services';

export const FAQ_PATH = '/faq/';

/** §1 head. Title and H1 carry the primary keyword "pet grooming at home questions" (01-SITEMAP) verbatim — 02 P012 /
 *  P026. `npm run check:pages` holds the built title, meta description and H1 to these exact strings. */
export const FAQ_HEAD = {
  title: 'Pet Grooming at Home Questions – Ludhiana FAQ | PetDoorStep',
  description:
    'Answers to every question about pet grooming, dog walking and vet visits at home in Ludhiana — prices, safety, hygiene, timings, payment and service areas.',
  h1: 'Pet Grooming at Home Questions, Answered',
} as const;

/** FAQ-1 line, split around its "WhatsApp us" link (a wa.me link with the /faq/ prefill, source faq_page). */
export const FAQ_INTRO = {
  before: "Can't find your question? ",
  link: 'WhatsApp us',
  after: ' — a real person replies within 10 minutes (9:00–19:00).',
} as const;

/** Jump-link anchor per category = the id of that category's H2 (faq.md §3). Short, readable, stable URLs to share. */
export const FAQ_ANCHORS: Readonly<Partial<Record<FaqCategory, string>>> = {
  booking: 'booking-and-prices',
  grooming: 'grooming',
  walking: 'dog-walking',
  vet: 'vet-and-vaccination',
  safety: 'safety-and-trust',
  areas: 'service-areas',
};

/**
 * CTA band [Book on WhatsApp] prefill. PAGE_PREFILL['/faq/'] (src/data/services.ts) is question-shaped ("…a question
 * that isn't on your FAQ page") — right for FAQ-1's "WhatsApp us" link, the sticky bar and the float, wrong for a
 * booking button under "Got your answer? Book your first visit…". So the band uses the booking shape every other
 * non-money page uses ("Hi PetDoorStep! I want to book a service (from your … page). My area: ___ . My pet: ___",
 * logged in decisions/f2-data.md §2), naming this page. It is derived from services.ts, so it cannot drift from it.
 * Requested: services.ts to own this string (website-plan/requests/w1-hiw-faq.md).
 */
const fromPage = (path: string): string => `(from your ${routeLabel(path)} page)`;
const BOOKING_SHAPE = prefillFor('/how-it-works/');
if (!BOOKING_SHAPE.includes(fromPage('/how-it-works/'))) {
  throw new Error(`src/data/pages/faq.ts: the booking prefill shape changed in services.ts ("${BOOKING_SHAPE}") — update FAQ_BOOK_PREFILL`);
}
export const FAQ_BOOK_PREFILL = BOOKING_SHAPE.replace(fromPage('/how-it-works/'), fromPage(FAQ_PATH));

/** The 6 category sections (faq.md §3 order) with their anchors. */
export const FAQ_PAGE = faqPageSections().map((s) => {
  const anchor = FAQ_ANCHORS[s.category];
  if (!anchor) throw new Error(`src/data/pages/faq.ts: /faq/ category "${s.category}" has no jump-link anchor in FAQ_ANCHORS`);
  return { ...s, anchor };
});

// faq.md §3: 28 questions in 6 categories, every anchor unique. A faq.json change that breaks it fails the build here.
const total = faqPageEntries().length;
const anchors = new Set(FAQ_PAGE.map((s) => s.anchor));
if (FAQ_PAGE.length !== 6 || total !== 28 || anchors.size !== FAQ_PAGE.length) {
  throw new Error(`src/data/pages/faq.ts: /faq/ has ${total} questions in ${FAQ_PAGE.length} categories (${anchors.size} anchors) — faq.md §3 wants 28 in 6`);
}
