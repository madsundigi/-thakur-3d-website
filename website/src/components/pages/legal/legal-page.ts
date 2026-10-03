// Helpers shared by /privacy-policy/ and /terms/ (website-plan/blueprints/privacy-policy.md B19, terms.md B20).
// Every fact the two pages print comes from src/data/legal.ts, site.ts, content.ts, offers.ts or the pricing helpers;
// these functions only shape it. The page copy makes claims about that data ("two cookies", "Google Signals is
// switched off", "every rule once"), so each claim is checked here and the BUILD FAILS when the data stops matching
// the sentence: a wrong legal statement must never ship (00 §9 item 7, a lawyer signs off what renders).
import { isFilled, site } from '../../../data/site';

/** One entry of the on-page contents list = one H2 section (id = the fragment the list links to). */
export interface TocEntry {
  id: string;
  label: string;
}

export function check(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`legal pages: ${msg} — update the page copy (src/pages/privacy-policy.astro / terms.astro) together with the data.`);
}

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
/** 2 → "two" (numbers up to ten are written as words in body copy). */
export const numberWord = (n: number): string => WORDS[n] ?? String(n);

/** ["a", "b", "c"] → "a, b and c" (the house style has no serial comma). */
export function listText(items: readonly string[], last = 'and'): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${last} ${items[items.length - 1]}`;
}

/** tel: href for a contact value from legal.ts / site.ts. An unfilled [FILL:*] token passes through, so the launch
 *  gate (`npm run check:fill`) still finds it in the built page (same rule as site.ts telHref). */
export const telFor = (value: string): string => (isFilled(value) ? `tel:${value.replace(/[^\d+]/g, '')}` : `tel:${value}`);

/** A value that is a web address (e.g. IDENTITY.DPB_COMPLAINT_LINK once filled) renders as a link; a token or plain
 *  text renders as text. */
export const isUrl = (value: string): boolean => /^https?:\/\/\S+$/.test(value);

/** Real-world values a legal.ts string may carry as a token, filled from src/data/site.ts so each value is typed in
 *  one place — the same fill src/lib/faq.ts applies to faq.json (SERVICE_RULES `not-emergency` names the 24-hour
 *  hospitals that vet-at-home.md §0 rule 4 lists). While site.ts still holds the token, the token shows. */
const SITE_FILLS: Readonly<Record<string, string>> = { '[FILL:EMERGENCY_VET_LIST]': site.emergencyVets };
export const fillSiteTokens = (text: string): string =>
  Object.entries(SITE_FILLS).reduce((t, [token, value]) => t.split(token).join(value), text);
