// Last MATERIAL edit date of every live page (04-TECHNICAL-SEO §7.1) → <lastmod> in the XML sitemap (astro.config.mjs).
// Rules: one 'YYYY-MM-DD' per live route in src/data/routes.ts — the build fails when a live route has none. Change a
// date only when the page's content really changes (prices, copy, FAQs); never stamp today's date on an unchanged page
// (fake freshness trains Google to ignore our lastmod). The visible "Last updated" line (02 P143) uses the same date.
export const LASTMOD: Record<string, string> = {
  '/book/': '2026-10-02',
};
