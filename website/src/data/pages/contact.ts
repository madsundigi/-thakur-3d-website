// /contact/ copy — website-plan/blueprints/contact.md §2 (B09), verbatim. Contact values come from src/data/site.ts and
// the NAP block from Nap.astro (05-LOCAL-SEO §4, byte-identical to the footer) — never typed here. Hours: 00 §3.1.
// No call-back promise anywhere: calls are not staffed for call-backs (00 §3.1, §11 D3).
import { site } from '../site';

/** CO-1 line under the H1 (confirmed fact, 00 §3.1, §11 D3). */
export const REPLY_LINE = 'A real person replies on WhatsApp within 10 minutes, 9:00–19:00, every day.';

/** CO-2 contact cards. Values and hrefs are built in the page from site.ts; the WhatsApp prefill is
 *  PAGE_PREFILL['/contact/'] in src/data/services.ts ("Hi PetDoorStep, I have a question", CO-2 verbatim). */
export const CARDS = {
  heading: 'WhatsApp, call or email PetDoorStep',
  whatsapp: 'WhatsApp',
  call: 'Call',
  email: 'Email',
  /** CO-2 ③ "replies within one working day", set as its own sentence under the address. */
  emailNote: 'Replies within one working day.',
  instagram: 'Instagram',
} as const;

/** CO-3: the NAP block itself is <Nap />; these are the two contact.md CO-3 items Nap does not print. */
export const DOORSTEP_LINE = 'Doorstep service — we come to you. There is no walk-in centre.';
export const WEBSITE_LABEL = 'Website';

/** CO-4 "Hours" (H2) table, contact.md wording. The visits row is site.hours.visits itself (the NAP hours); the walk
 *  and reply rows keep the blueprint's wording, and every time in them must exist in site.hours, so a change to
 *  00 §3.1 hours that skips this table fails the build. */
export const HOURS = {
  heading: 'Hours',
  caption: 'PetDoorStep hours',
  rowHeader: 'Service',
  column: 'Hours',
  rows: [
    { label: 'Grooming & vet visits', value: site.hours.visits },
    { label: 'Dog walks', value: '6:00–9:30 and 17:30–20:30 (Apr–Jun: before 8:00 / after 19:00)', source: site.hours.walks },
    { label: 'WhatsApp replies', value: '9:00–19:00; messages after 19:00 are answered from 9:00', source: site.hours.replies },
  ],
} as const;
for (const row of HOURS.rows) {
  if (!('source' in row)) continue;
  const missing = (row.value.match(/\d{1,2}:\d{2}(?:–\d{1,2}:\d{2})?/g) ?? []).filter((t) => !row.source.includes(t));
  if (missing.length) {
    throw new Error(`contact: hours row "${row.label}" shows ${missing.join(', ')}, which src/data/site.ts hours ("${row.source}") do not — update both (00 §3.1)`);
  }
}

/** CO-5 "Where we come" (H2): the line, then the 10 00 §3.3 areas, each linked once its area page is live. */
export const AREAS = {
  heading: 'Where we come',
  line: 'All of Ludhiana — no travel charge.',
} as const;

/** CO-6 quick links (contact.md order), then the in-body /privacy-policy/ link (02 P068: that page's contextual
 *  inbound link; decisions/w1-about-contact.md). `/book/` carries ?src=contact_page in the page (07 §2, 09 §2d). */
export const QUICK_LINKS = [
  { text: 'Ready to book?', href: '/book/' },
  { text: 'Prices', href: '/pricing/' },
  { text: 'How it works', href: '/how-it-works/' },
  { text: 'Privacy Policy', href: '/privacy-policy/' },
] as const;
export const QUICK_LINKS_LABEL = 'Quick links';

/** CO-7 FAQ (contact.md §3 via faq.json, plain HTML — no FAQPage on this page). The blueprint names no heading; this
 *  follows the template SP-10 pattern "{topic} — your questions". */
export const FAQ_HEADING = 'Contacting PetDoorStep — your questions';
