// Readers for the plan documents the gates enforce (website-plan/ is law): the page → blueprint map of
// 01-SITEMAP.md §1, each blueprint's head lines (Title / Meta / H1), and the 04-TECHNICAL-SEO.md §2.9 schema matrix.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PLAN } from './common.mjs';

const SITEMAP = join(PLAN, '01-SITEMAP.md');

/**
 * Page path → blueprint file, from the Blueprint column of 01-SITEMAP.md §1 (a row's first `/path/` cell and its
 * `blueprints/<name>.md` or "in `<name>.md`" cell). Template rows (`_TEMPLATE-*.md`) have no fixed head → skipped.
 * @returns {Map<string, string>} path → absolute blueprint path
 */
export function blueprintMap() {
  const map = new Map();
  if (!existsSync(SITEMAP)) return map;
  for (const line of readFileSync(SITEMAP, 'utf8').split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    const path = /^`(\/[^`]*)`$/.exec(cells[0] ?? '')?.[1];
    if (!path) continue;
    const bp = cells.slice(1).map((c) => /`(?:blueprints\/)?([\w-]+\.md)`/.exec(c)?.[1]).find(Boolean);
    if (!bp || bp.startsWith('_TEMPLATE')) continue;
    const file = join(PLAN, 'blueprints', bp);
    if (existsSync(file)) map.set(path === '/404' ? '/404.html' : path, file);
  }
  return map;
}

/**
 * Head blocks of a blueprint: every heading whose text contains "Head" ("## 1 · Head", "### A1 · Head" …), with the
 * `- **Title** (n): `…``, `- **Meta** (n): `…`` and `- **H1:** `…`` values under it, and the page path named in the
 * nearest enclosing higher-level heading (book.md: "## A · `/book/`" / "## B · `/thank-you/`").
 */
export function headBlocks(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const blocks = [];
  const headings = []; // stack of { level, text }
  let cur = null;
  for (const line of lines) {
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      while (headings.length && headings[headings.length - 1].level >= level) headings.pop();
      cur = null;
      if (/\bHead\b/.test(h[2])) {
        const owner = [...headings].reverse().map((x) => /`(\/[^`]*)`/.exec(x.text)?.[1]).find(Boolean) ?? null;
        cur = { owner, title: null, meta: null, h1: null, heading: h[2].trim() };
        blocks.push(cur);
      }
      headings.push({ level, text: h[2] });
      continue;
    }
    if (!cur) continue;
    const m = /^\s*[-*]\s*\*\*\s*(Title|Meta|H1)\s*:?\s*\*\*[^`\n]*`([^`]+)`/i.exec(line);
    if (m) {
      const key = m[1].toLowerCase() === 'h1' ? 'h1' : m[1].toLowerCase();
      if (cur[key] === null) cur[key] = m[2];
    }
  }
  return blocks;
}

/** The head block for one page: the only block of its blueprint, or the one whose section names the page. */
export function headFor(path, map = blueprintMap()) {
  const file = map.get(path);
  if (!file) return null;
  const blocks = headBlocks(file).filter((b) => b.title || b.meta || b.h1);
  const pick = blocks.length === 1 ? blocks[0] : blocks.find((b) => b.owner === path);
  return pick ? { ...pick, file } : null;
}

/**
 * 04-TECHNICAL-SEO.md §2.9 schema-per-page matrix (binding): the top-level `@graph` node types a page must carry
 * (`req`) and may carry (`opt`). Returns null for a page the matrix has no row for.
 */
export function schemaRow(path) {
  const R = (req, opt = []) => ({ req, opt });
  if (path === '/') return R(['WebSite', 'LocalBusiness', 'FAQPage']);
  if (path === '/contact/') return R(['LocalBusiness', 'BreadcrumbList', 'ContactPage']);
  if (path === '/ludhiana/') return R(['BreadcrumbList', 'WebPage']);
  if (/^\/ludhiana\/areas\/[a-z0-9-]+\/$/.test(path)) return R(['Service', 'BreadcrumbList']);
  if (/^\/ludhiana\/[a-z0-9-]+\/$/.test(path)) return R(['Service', 'FAQPage', 'BreadcrumbList']);
  if (path === '/pricing/') return R(['OfferCatalog', 'FAQPage', 'BreadcrumbList']);
  if (path === '/how-it-works/') return R(['HowTo', 'BreadcrumbList']);
  if (path === '/about/') return R(['AboutPage', 'BreadcrumbList']);
  if (path === '/faq/') return R(['FAQPage', 'BreadcrumbList']);
  if (/^\/blog\/\d+\/$/.test(path)) return R(['BreadcrumbList']); // paginated index page (/blog/2/ …) — 04 §3.6
  if (/^\/blog\/[a-z0-9-]+\/$/.test(path) && !/^\/blog\/\d+\/$/.test(path)) return R(['BlogPosting', 'BreadcrumbList']);
  if (path === '/offers/') return R(['BreadcrumbList', 'OfferCatalog']);
  if (path === '/join-as-groomer/') return R(['BreadcrumbList'], ['JobPosting']);
  if (['/reviews/', '/safety-hygiene/', '/book/', '/privacy-policy/', '/terms/', '/refund-policy/'].includes(path)) return R(['BreadcrumbList']);
  if (path === '/thank-you/' || path === '/404.html') return R([]);
  return null;
}
