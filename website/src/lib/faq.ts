// FAQ access — the ONE way pages, Faq.astro and the FAQPage JSON-LD read src/data/faq.json (blueprints/faq.md §2).
// The data is validated when this module loads, so a malformed entry fails `astro build` instead of shipping.
// faq.json is frozen: answer text changes go through a decision log entry, never a quiet edit.
import data from '../data/faq.json';
import { RESCHEDULE_TEXT } from '../data/content';
import { isLive } from '../data/routes';
import { site } from '../data/site';
import { DOG_GROOM_IDS, flatPrice, fromPrice, planPrice } from './pricing';

export type FaqCategory = 'booking' | 'grooming' | 'walking' | 'vet' | 'safety' | 'areas' | 'careers';

/** An in-answer link: `text` is an exact substring of the answer; it renders as a link only while `href` is live. */
export interface FaqLink { text: string; href: string }

export interface FaqEntry {
  id: string; // `{source-blueprint}-{n}`, or `faq-s1`… for entries written for /faq/ (faq.md §4)
  category: FaqCategory;
  q: string;
  a: string; // verbatim from the source blueprint — also the FAQPage `acceptedAnswer.text`
  pages: string[]; // every page that renders this entry (source page first; "/faq/" when faq.md §3 lists it)
  links?: FaqLink[];
}

/** The /faq/ page sections — faq.md §3, in its order (H2 label, category link target, entry ids). */
export interface FaqSection { category: FaqCategory; heading: string; link: string; ids: string[] }

export const FAQ_SECTIONS: readonly FaqSection[] = [
  { category: 'booking', heading: 'Booking & prices', link: '/pricing/',
    ids: ['home-4', 'home-5', 'pricing-2', 'pricing-3', 'book-1', 'book-3', 'pricing-5'] },
  { category: 'grooming', heading: 'Grooming', link: '/ludhiana/dog-grooming/',
    ids: ['dog-grooming-1', 'dog-grooming-4', 'dog-grooming-6', 'dog-grooming-8', 'cat-grooming-2', 'puppy-grooming-1'] },
  { category: 'walking', heading: 'Dog walking', link: '/ludhiana/dog-walking/',
    ids: ['dog-walking-1', 'dog-walking-2', 'dog-walking-4'] },
  { category: 'vet', heading: 'Vet & vaccination', link: '/ludhiana/vet-at-home/',
    ids: ['vet-at-home-1', 'vet-at-home-3', 'vet-at-home-8', 'dog-vaccination-3', 'dog-vaccination-4'] },
  { category: 'safety', heading: 'Safety & trust', link: '/safety-hygiene/',
    ids: ['faq-s1', 'faq-s2', 'faq-s3', 'home-2'] },
  { category: 'areas', heading: "Service areas & what's next", link: '/contact/',
    ids: ['home-1', 'faq-a1', 'faq-a2'] },
];

/** The one-line link under each /faq/ category H2 (faq.md §3: "Each category is an H2 with a one-line link to its
 *  money page"); its target is that section's `link`, and it renders only while the target is live. */
export const FAQ_PAGE_CATEGORY_LINKS: Readonly<Partial<Record<FaqCategory, string>>> = {
  booking: 'Compare every service on the full price list',
  grooming: `Dog grooming at home in Ludhiana — from ${fromPrice(DOG_GROOM_IDS)}`,
  walking: `Daily dog walks in Ludhiana — ${planPrice('dog-walking', 'walk-1x')}/month`,
  vet: `Vet home visits in Ludhiana — ${flatPrice('vet-visit')} per visit`,
  safety: 'Read our full safety & hygiene standards',
  areas: 'Ask about your area — WhatsApp, call or email us',
};

/** Heading of the /faq/ closing CTA band (faq.md §5: [Book on WhatsApp] + [Call [FILL:PHONE]]). */
export const FAQ_CTA_HEADING = 'Got your answer? Book your first visit in 2 minutes.';

const CATEGORIES: readonly FaqCategory[] = ['booking', 'grooming', 'walking', 'vet', 'safety', 'areas', 'careers'];

/** [FILL:*] tokens an answer may carry, filled from src/data/site.ts so each real-world value is typed in one place
 *  (faq.json is frozen). While site.ts still holds the token the answer shows it — the launch gate catches it. */
const ANSWER_FILLS: Readonly<Record<string, string>> = { '[FILL:EMERGENCY_VET_LIST]': site.emergencyVets };
const fillTokens = (text: string): string =>
  Object.entries(ANSWER_FILLS).reduce((t, [token, value]) => t.split(token).join(value), text);

export const faqEntries: readonly FaqEntry[] = (data as FaqEntry[]).map((e) => ({ ...e, a: fillTokens(e.a) }));
const byId = new Map(faqEntries.map((e) => [e.id, e]));

// ---- build-time validation ---------------------------------------------------------------------------------------
(function validate() {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const e of faqEntries) {
    if (seen.has(e.id)) problems.push(`duplicate id ${e.id}`);
    seen.add(e.id);
    if (!/^[a-z]+(-[a-z]+)*-([0-9]+|[a-z][0-9]+)$/.test(e.id)) problems.push(`${e.id}: id must be {source-blueprint}-{n}`);
    if (!CATEGORIES.includes(e.category)) problems.push(`${e.id}: unknown category "${e.category}"`);
    if (!e.q?.trim() || !e.a?.trim()) problems.push(`${e.id}: empty q or a`);
    if (!e.pages?.length) problems.push(`${e.id}: no pages`);
    for (const p of e.pages ?? []) if (!/^\/([a-z0-9-]+\/)*$/.test(p)) problems.push(`${e.id}: page "${p}" must be a trailing-slash path`);
    for (const l of e.links ?? []) {
      if (!e.a.includes(l.text)) problems.push(`${e.id}: link text "${l.text}" is not in the answer`);
      if (!/^\/([a-z0-9-]+\/)*$/.test(l.href)) problems.push(`${e.id}: link href "${l.href}" must be a trailing-slash path`);
    }
  }
  const listed = new Set<string>();
  for (const s of FAQ_SECTIONS) {
    for (const id of s.ids) {
      listed.add(id);
      const e = byId.get(id);
      if (!e) problems.push(`/faq/ section "${s.heading}": unknown id ${id}`);
      else if (!e.pages.includes('/faq/')) problems.push(`${id}: listed on /faq/ but its pages lack "/faq/"`);
      else if (e.category !== s.category) problems.push(`${id}: category "${e.category}" ≠ /faq/ section "${s.category}"`);
    }
  }
  for (const e of faqEntries) if (e.pages.includes('/faq/') && !listed.has(e.id)) problems.push(`${e.id}: has "/faq/" but no /faq/ section lists it`);
  for (const s of FAQ_SECTIONS) {
    const text = FAQ_PAGE_CATEGORY_LINKS[s.category];
    if (!text?.trim() || text.length > 80) problems.push(`/faq/ section "${s.heading}": FAQ_PAGE_CATEGORY_LINKS needs a one-line link text (≤ 80 chars)`);
  }
  // One reschedule wording everywhere (book.md / how-it-works.md ship checks; 00 §3.2).
  for (const id of ['book-3', 'how-it-works-3']) {
    if (!byId.get(id)?.a.includes(RESCHEDULE_TEXT)) problems.push(`${id}: answer must contain RESCHEDULE_TEXT (src/data/content.ts) verbatim`);
  }
  if (problems.length) throw new Error(`src/data/faq.json is invalid:\n  ${problems.join('\n  ')}`);
})();

// ---- queries -----------------------------------------------------------------------------------------------------

/** Entries for a page, in file order (= the source blueprint's FAQ order). `/faq/` returns the faq.md §3 order. */
export function faqFor(page: string): FaqEntry[] {
  if (page === '/faq/') return faqPageEntries();
  return faqEntries.filter((e) => e.pages.includes(page));
}

/** Entries by id, in the order given. Throws on an unknown id (a typo must fail the build, not drop a question). */
export function faqByIds(ids: readonly string[]): FaqEntry[] {
  return ids.map((id) => {
    const e = byId.get(id);
    if (!e) throw new Error(`faqByIds: unknown FAQ id "${id}" (src/data/faq.json)`);
    return e;
  });
}

/** The /faq/ page: its sections with entries resolved (faq.md §3) and the category's one-line link text
 *  (`linkText`, from FAQ_PAGE_CATEGORY_LINKS — render it as a link to `link` only while isLive(link)). */
export function faqPageSections(): (FaqSection & { entries: FaqEntry[]; linkText: string })[] {
  return FAQ_SECTIONS.map((s) => ({ ...s, entries: faqByIds(s.ids), linkText: FAQ_PAGE_CATEGORY_LINKS[s.category] ?? '' }));
}

/** Every /faq/ entry, flattened in section order — what the /faq/ FAQPage markup lists. */
export function faqPageEntries(): FaqEntry[] {
  return FAQ_SECTIONS.flatMap((s) => faqByIds(s.ids));
}

/** Answer split into text/link segments. A link renders only when its target is live and is not the current page. */
export type AnswerPart = { text: string; href?: string };

export function answerParts(entry: FaqEntry, currentPage?: string): AnswerPart[] {
  const live = (entry.links ?? []).filter((l) => isLive(l.href) && l.href !== currentPage);
  if (!live.length) return [{ text: entry.a }];
  // Place each link at its first occurrence; skip one that would overlap an earlier link.
  const spans = live
    .map((l) => ({ ...l, start: entry.a.indexOf(l.text) }))
    .sort((x, y) => x.start - y.start);
  const parts: AnswerPart[] = [];
  let at = 0;
  for (const s of spans) {
    if (s.start < at) continue;
    if (s.start > at) parts.push({ text: entry.a.slice(at, s.start) });
    parts.push({ text: s.text, href: s.href });
    at = s.start + s.text.length;
  }
  if (at < entry.a.length) parts.push({ text: entry.a.slice(at) });
  return parts;
}
