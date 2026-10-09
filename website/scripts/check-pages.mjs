// check:pages — static page gate over the BUILT site (reads dist/ only; run `npm run build` first).
// Rules + P-numbers: website-plan/02-SEO-PARAMETERS.md · head copy: each page's blueprint (01-SITEMAP.md Blueprint
// column) · schema matrix: 04-TECHNICAL-SEO.md §2.9 · source values: 09-ANALYTICS-TRACKING.md §2d (src/data/sources.ts).
//
//   node scripts/check-pages.mjs --pages /a/,/b/   just these pages. A link to a live Wave-1 route that is not in this
//                                                  dist is a WARN (another builder owns that page).
//   node scripts/check-pages.mjs --all             every page in dist, plus the cross-page rules: unique titles,
//                                                  descriptions and H1s, no orphan page (P068), sitemap = live routes
//                                                  = built indexable pages (P127). No flag = --all.
//   [--dist <dir>]                                 default website/dist
//
// Prints one "FAIL <path> <Pnnn> <message>" line per failure and "WARN <path> <Pnnn> <message>" lines, then a summary.
// Exit 1 on any FAIL. src/data/routes.ts is loaded with this process's environment: use the build's environment
// (e.g. PUBLIC_PDS_PREVIEW_LIVE=wave1) or route-status verdicts will not match the dist.
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  NOINDEX_PAGES, PLAN, Reporter, WEBSITE, distDir, envNote, inrDigits, isMoneyPage, listPages, loadRoutes, pageFile,
  parseArgs, read, routeSlug, siteOrigin,
} from './lib/common.mjs';
import {
  attr, byTag, closest, describe, find, findAll, hasAttr, idSet, isInside, normSpace, parseHtml, srcsetUrls, textOf,
  tokens, unknownEntities, walk,
} from './lib/html.mjs';
import { loadTs } from './lib/load-ts.mjs';
import { blueprintMap, headFor, schemaRow } from './lib/plan.mjs';

const args = parseArgs(process.argv.slice(2));
const R = new Reporter('check:pages');
const DIST = distDir(args);
if (!existsSync(DIST)) {
  console.log(`check:pages — ${DIST} does not exist: run \`npm run build\` first.`);
  process.exit(1);
}
const ALL = args.all || !args.pages.length;
const built = listPages(DIST);
const targets = ALL ? built : args.pages;
const SITE = siteOrigin(DIST);
const routes = await loadRoutes(loadTs);
const sources = await loadTs('src/data/sources.ts');
const isCanonicalSource = typeof sources.mod?.isCanonicalSource === 'function' ? sources.mod.isCanonicalSource : null;
const bpMap = blueprintMap();
const relDist = (f) => { const r = relative(WEBSITE, f); return r.startsWith('..') ? f : r; }; // website-relative, absolute when outside
const cp = (s) => [...s].length; // length in code points (02 §1: count characters, not UTF-16 units)

R.info(`${targets.length} page(s) ${ALL ? '(--all: every page in dist/)' : `(--pages ${targets.join(',')})`} · site ${SITE ?? '?'} · routes.ts: ${
  routes.ok ? `${routes.routes.filter((r) => routes.isLive(r.path)).length} live of ${routes.routes.length}` : 'not loaded'} (${envNote()})`);
if (!args.all && !args.pages.length) R.info('no --pages given: checking every page (--all)');
if (!SITE) R.fail('-', 'P124', 'cannot determine the site origin (dist/robots.txt Sitemap line, dist/sitemap-index.xml, SITE_URL)');
if (!routes.ok) R.warn('src/data/routes.ts', 'P074', `${routes.why} — route-status checks skipped`);
if (!isCanonicalSource) R.warn('src/data/sources.ts', 'P161', `${sources.why || 'no isCanonicalSource export'} — data-source checks skipped`);

// ---- helpers -----------------------------------------------------------------------------------------------------

const rawText = (n) => n.children.filter((c) => c.type === 'text').map((c) => c.value).join('');
const typesOf = (n) => [].concat(n?.['@type'] ?? []).map(String);
const squash = (s) => s.replace(/\s+/g, '');
const stripTags = (s) => normSpace(String(s ?? '').replace(/<[^>]*>/g, ' '));
const trunc = (s, n = 90) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const q = (s) => `"${trunc(s)}"`;
let placeholderHrefs = 0;

const docCache = new Map(); // dist file → { doc, ids }
function docOf(file) {
  if (!docCache.has(file)) {
    const doc = parseHtml(read(file));
    docCache.set(file, { doc, ids: idSet(doc) });
  }
  return docCache.get(file);
}

/** Every URL-bearing attribute: kind 'page' (navigable; trailing-slash + route rules) or 'resource' (a file). */
function urlRefs(doc, noindex) {
  const refs = [];
  walk(doc, (n) => {
    if (n.type !== 'element') return;
    const push = (raw, kind) => { if (raw != null && String(raw).trim() !== '') refs.push({ el: n, raw: String(raw).trim(), kind }); };
    const rel = tokens(n, 'rel');
    switch (n.tag) {
      case 'a': case 'area': push(attr(n, 'href'), 'page'); break;
      case 'form': push(attr(n, 'action'), 'page'); break;
      case 'link':
        push(attr(n, 'href'), rel.includes('canonical') || rel.includes('alternate') ? 'page' : 'resource');
        srcsetUrls(attr(n, 'imagesrcset')).forEach((u) => push(u, 'resource'));
        break;
      case 'img': case 'source':
        push(attr(n, 'src'), 'resource');
        srcsetUrls(attr(n, 'srcset')).forEach((u) => push(u, 'resource'));
        break;
      case 'script': case 'iframe': case 'video': case 'audio': case 'embed': push(attr(n, 'src'), 'resource'); break;
      case 'astro-island':
        ['component-url', 'renderer-url', 'before-hydration-url'].forEach((k) => push(attr(n, k), 'resource'));
        break;
      case 'meta': {
        const p = (attr(n, 'property') ?? attr(n, 'name') ?? '').toLowerCase();
        if (p === 'og:url' && !noindex) push(attr(n, 'content'), 'page'); // og:url of a noindex page is not a link target
        if (['og:image', 'og:image:url', 'og:image:secure_url', 'twitter:image'].includes(p)) push(attr(n, 'content'), 'resource');
        break;
      }
      default:
    }
  });
  return refs;
}

// ---- per page ----------------------------------------------------------------------------------------------------

const infos = [];
let envHinted = false;

for (const path of targets) {
  const file = pageFile(DIST, path);
  if (!existsSync(file)) {
    R.fail(path, 'P123', `not built — ${relDist(file)} is missing (run npm run build)`);
    continue;
  }
  try {
    infos.push(checkPage(path, file));
  } catch (e) {
    R.fail(path, 'GATE', `checker crashed on this page: ${e?.stack?.split('\n').slice(0, 2).join(' ') ?? e}`);
  }
}

function checkPage(path, file) {
  const { doc, ids } = docOf(file);
  const head = find(doc, (n) => n.tag === 'head') ?? doc;
  const body = find(doc, (n) => n.tag === 'body') ?? doc;
  const self = SITE ? `${SITE}${path}` : null;
  const info = { path, file, noindex: false, title: null, desc: null, h1: null, nap: null, contextual: new Set() };
  const metas = byTag(doc, 'meta');
  const metaNamed = (name) => metas.filter((m) => (attr(m, 'name') ?? '').toLowerCase() === name);
  const metaProp = (p) => metas.filter((m) => (attr(m, 'property') ?? '').toLowerCase() === p);
  const links = byTag(doc, 'link');

  if (routes.ok && routes.byPath.has(path) && !routes.isLive(path) && !envHinted) {
    envHinted = true;
    R.warn(path, 'P074', `is built but routes.ts says it is not live (${envNote()}) — run the gate with the same environment as the build, or flip the route to 'live' in the commit that builds it`);
  }

  // robots (P128) — decided first: noindex pages skip the title/meta length rules and the canonical rules.
  const robots = [...metaNamed('robots'), ...metaNamed('googlebot')];
  const robotsTokens = robots.map((m) => (attr(m, 'content') ?? '').toLowerCase().split(',').map((t) => t.trim()).filter(Boolean));
  info.noindex = robotsTokens.some((t) => t.includes('noindex') || t.includes('none'));
  if (NOINDEX_PAGES.has(path)) {
    const ok = robots.length === 1 && robotsTokens[0].length === 2 && robotsTokens[0].includes('noindex') && robotsTokens[0].includes('follow');
    if (!ok) R.fail(path, 'P128', `robots meta must be exactly "noindex, follow" (04 §3.3 + E7), got ${robots.length ? robots.map((m) => q(attr(m, 'content') ?? '')).join(' + ') : 'none'}`);
    info.noindex = true;
  } else if (info.noindex) {
    R.fail(path, 'P128', `is noindex (${robots.map((m) => attr(m, 'content')).join(' + ')}) — only /thank-you/ and the 404 page may be`);
  }

  // <html lang> (P139/P097)
  const html = find(doc, (n) => n.tag === 'html');
  if (attr(html, 'lang') !== 'en-IN') R.fail(path, 'P139', `<html lang> must be "en-IN", got ${q(attr(html, 'lang') ?? 'none')}`);

  // viewport (P109 / P141)
  const vp = metaNamed('viewport');
  const vpc = (attr(vp[0], 'content') ?? '').toLowerCase().replace(/\s+/g, '');
  if (vp.length !== 1 || !vpc.split(',').includes('width=device-width') || !vpc.split(',').includes('initial-scale=1')) {
    R.fail(path, 'P109', `needs exactly one <meta name="viewport" content="width=device-width, initial-scale=1"> (found ${vp.length}${vp.length ? `: ${q(attr(vp[0], 'content') ?? '')}` : ''})`);
  }
  if (/maximum-scale|user-scalable=(no|0)/.test(vpc)) R.fail(path, 'P141', `viewport disables zoom: ${q(attr(vp[0], 'content'))}`);

  // title (P010 / P011)
  const titles = findAll(doc, (n) => n.tag === 'title' && !isInside(n, (x) => x.tag === 'svg'));
  if (titles.length !== 1) R.fail(path, 'P010', `needs exactly one <title>, found ${titles.length}`);
  info.title = titles.length ? textOf(titles[0]) : null;
  if (info.title !== null && !info.noindex && (cp(info.title) < 50 || cp(info.title) > 60)) {
    R.fail(path, 'P011', `title is ${cp(info.title)} chars (50–60): ${q(info.title)}`);
  }

  // meta description (P018 / P019 / P024)
  const descs = metaNamed('description');
  info.desc = descs.length ? normSpace(attr(descs[0], 'content') ?? '') : null;
  if (!info.noindex) {
    if (descs.length !== 1) R.fail(path, 'P018', `needs exactly one <meta name="description">, found ${descs.length}`);
    if (info.desc !== null) {
      if (cp(info.desc) < 120 || cp(info.desc) > 158) R.fail(path, 'P019', `meta description is ${cp(info.desc)} chars (120–158): ${q(info.desc)}`);
      if (info.desc.includes('"')) R.fail(path, 'P024', `meta description contains a double quote: ${q(info.desc)}`);
      if (/[<>]/.test(info.desc)) R.fail(path, 'P024', `meta description contains markup characters: ${q(info.desc)}`);
    }
  }

  // H1 (P025 / P026)
  const h1s = byTag(doc, 'h1');
  if (h1s.length !== 1) R.fail(path, 'P025', `needs exactly one <h1>, found ${h1s.length}${h1s.length ? `: ${h1s.map((h) => q(textOf(h))).join(', ')}` : ''}`);
  info.h1 = h1s.length ? textOf(h1s[0]) : null;
  if (info.h1 !== null && (cp(info.h1) < 20 || cp(info.h1) > 70)) R.fail(path, 'P026', `H1 is ${cp(info.h1)} chars (20–70): ${q(info.h1)}`);

  // head copy = the blueprint's "## 1 · Head" lines (wording is law: copy verbatim) — unless the blueprint value itself
  // breaks a 02 launch-blocker length rule: 02 [Launch-blocker] beats the blueprint, so equality is not enforced then
  // (the built value is still held to the 02 rule above) and the conflict is reported as a WARN.
  const bp = headFor(path, bpMap);
  if (bp) {
    const where = `website-plan/${relative(PLAN, bp.file)} · ${bp.heading}`;
    const fields = [
      { key: 'title', got: info.title, want: bp.title, code: 'P012', label: 'title', rule: 'P011', ok: (s) => info.noindex || (cp(s) >= 50 && cp(s) <= 60) },
      { key: 'meta', got: info.desc, want: bp.meta, code: 'P020', label: 'meta description', rule: 'P019/P024', ok: (s) => info.noindex || (cp(s) >= 120 && cp(s) <= 158 && !s.includes('"')) },
      { key: 'h1', got: info.h1, want: bp.h1, code: 'P026', label: 'H1', rule: 'P026', ok: (s) => cp(s) >= 20 && cp(s) <= 70 },
    ];
    for (const f of fields) {
      if (!f.want || f.got === null) continue;
      const want = normSpace(f.want);
      if (!f.ok(want)) {
        R.warn(path, f.rule, `blueprint ${f.label} ${q(want)} (${cp(want)} chars, ${where}) breaks ${f.rule} — 02 launch-blocker wins over the blueprint, so the built ${f.label} is held to ${f.rule} instead of the blueprint wording`);
        continue;
      }
      if (want !== f.got) R.fail(path, f.code, `${f.label} ≠ blueprint (${where}): built ${q(f.got)} · blueprint ${q(want)}`);
    }
  }

  // canonical + og:url (P124 / P117) — indexable pages
  const canon = links.filter((l) => tokens(l, 'rel').includes('canonical'));
  const ogUrl = metaProp('og:url');
  if (!info.noindex && self) {
    if (canon.length !== 1) R.fail(path, 'P124', `needs exactly one <link rel="canonical">, found ${canon.length}`);
    const href = attr(canon[0], 'href');
    if (canon.length && href !== self) R.fail(path, 'P124', `canonical ${q(href ?? '')} ≠ absolute self URL ${q(self)}`);
    if (ogUrl.length !== 1) R.fail(path, 'P117', `needs exactly one og:url, found ${ogUrl.length}`);
    else if (attr(ogUrl[0], 'content') !== (href ?? self)) R.fail(path, 'P117', `og:url ${q(attr(ogUrl[0], 'content') ?? '')} ≠ canonical ${q(href ?? self)}`);
  } else if (canon.length && self && attr(canon[0], 'href') !== self) {
    R.fail(path, 'P124', `canonical ${q(attr(canon[0], 'href') ?? '')} on a noindex page must point at itself (${self}) or be omitted`);
  }

  // og:type (04 §4 / §2.7) — a blog post is og:type=article and carries article:published_time + article:modified_time
  // (ISO dates = its BlogPosting datePublished/dateModified); every other indexable page stays og:type=website.
  if (!info.noindex) {
    const isBlogPost = /^\/blog\/[a-z0-9-]+\/$/.test(path) && !/^\/blog\/\d+\/$/.test(path); // /blog/2/ … are paginated indices (og:type=website), not posts
    const ogType = metaProp('og:type');
    const typeVal = ogType.length ? (attr(ogType[0], 'content') ?? '') : '';
    if (ogType.length !== 1) R.fail(path, 'P117', `needs exactly one og:type, found ${ogType.length}`);
    if (isBlogPost) {
      if (typeVal !== 'article') R.fail(path, 'P117', `blog post og:type must be "article" (04 §2.7), got ${q(typeVal || 'none')}`);
      for (const prop of ['article:published_time', 'article:modified_time']) {
        const m = metaProp(prop);
        const v = m.length ? (attr(m[0], 'content') ?? '') : '';
        if (m.length !== 1) R.fail(path, 'P117', `blog post needs exactly one <meta property="${prop}">, found ${m.length}`);
        else if (!/^\d{4}-\d{2}-\d{2}/.test(v)) R.fail(path, 'P117', `${prop} ${q(v || 'empty')} is not an ISO date (04 §2.7)`);
      }
    } else if (typeVal && typeVal !== 'website') {
      R.fail(path, 'P117', `og:type must be "website" (only blog posts are "article"), got ${q(typeVal)}`);
    }
  }

  // images (P060 / P056 / P057 / P063 / P064)
  const imgs = byTag(doc, 'img');
  const heroWrap = find(doc, (n) => hasAttr(n, 'data-hero-photo'));
  const heroImgs = heroWrap ? (heroWrap.tag === 'img' ? [heroWrap] : findAll(heroWrap, (n) => n.tag === 'img')) : [];
  const heroImg = heroImgs[0] ?? null;
  if (heroWrap && !heroImg) R.fail(path, 'P063', '[data-hero-photo] contains no <img>');
  for (const img of imgs) {
    const num = (v) => /^\d+(\.\d+)?$/.test(String(v ?? '').trim());
    if (!num(attr(img, 'width')) || !num(attr(img, 'height'))) R.fail(path, 'P060', `${describe(img, ['src', 'class'])} needs numeric width and height attributes`);
    const alt = attr(img, 'alt');
    if (alt === undefined) R.fail(path, 'P056', `${describe(img, ['src', 'class'])} has no alt attribute`);
    else if (normSpace(alt) === '') {
      const decorative = attr(img, 'aria-hidden') === 'true' || ['presentation', 'none'].includes((attr(img, 'role') ?? '').toLowerCase())
        || !!closest(img, (n) => attr(n, 'aria-hidden') === 'true');
      if (!decorative) R.fail(path, 'P057', `${describe(img, ['src', 'class'])} has alt="" but is neither aria-hidden nor role="presentation"`);
    }
    const loading = (attr(img, 'loading') ?? '').toLowerCase();
    if (img === heroImg) {
      if (loading !== 'eager') R.fail(path, 'P063', `hero image must be loading="eager" (got ${q(attr(img, 'loading') ?? 'none')})`);
      if ((attr(img, 'fetchpriority') ?? '').toLowerCase() !== 'high') R.fail(path, 'P063', `hero image needs fetchpriority="high" (got ${q(attr(img, 'fetchpriority') ?? 'none')})`);
    } else if (!heroImgs.includes(img) && loading !== 'lazy') {
      R.fail(path, 'P063', `${describe(img, ['src', 'class'])} must be loading="lazy" — only the [data-hero-photo] image loads eagerly`);
    }
  }
  if (heroImg && SITE) {
    const abs = (u) => { try { return new URL(u, self).href; } catch { return u; } };
    const pic = heroImg.parent?.tag === 'picture' ? heroImg.parent : null;
    const heroUrls = new Set([attr(heroImg, 'src'), ...srcsetUrls(attr(heroImg, 'srcset')),
      ...(pic ? findAll(pic, (n) => n.tag === 'source').flatMap((s) => srcsetUrls(attr(s, 'srcset'))) : [])].filter(Boolean).map(abs));
    const preloads = links.filter((l) => tokens(l, 'rel').includes('preload') && (attr(l, 'as') ?? '').toLowerCase() === 'image');
    const match = preloads.find((l) => [attr(l, 'href'), ...srcsetUrls(attr(l, 'imagesrcset'))].filter(Boolean).map(abs).some((u) => heroUrls.has(u)));
    if (!match) R.fail(path, 'P064', `no <link rel="preload" as="image"> matches the hero image (${[...heroUrls][0] ?? '?'}) — 04 §5.2.2`);
    else if (!isInside(match, (n) => n.tag === 'head')) R.fail(path, 'P064', 'the hero image preload is outside <head>');
  }

  // fold-law markers (C3) on money pages — test:site measures them; here only their presence
  if (isMoneyPage(path)) {
    const hero = find(doc, (n) => hasAttr(n, 'data-hero'));
    if (!hero) R.warn(path, 'P150', 'money page without [data-hero] markers (contract C3) — test:site cannot verify the fold law');
    else {
      const missing = ['data-hero-h1', 'data-hero-subhead', 'data-hero-primary', 'data-hero-chip', 'data-hero-photo'].filter((a) => !find(hero, (n) => hasAttr(n, a)));
      if (missing.length) R.warn(path, 'P150', `hero lacks ${missing.map((m) => `[${m}]`).join(' ')} (contract C3)`);
    }
  }

  // links + resources (P074 / P008)
  for (const ref of urlRefs(doc, info.noindex)) checkRef(path, self, ids, ref);
  // contextual links for P068: <a> in <main>, outside header/footer/nav/aside
  const main = find(doc, (n) => n.tag === 'main');
  if (main && SITE) {
    for (const a of findAll(main, (n) => n.tag === 'a' && hasAttr(n, 'href'))) {
      if (isInside(a, (n) => ['nav', 'header', 'footer', 'aside'].includes(n.tag))) continue;
      try {
        const u = new URL(attr(a, 'href'), self);
        if (u.origin === SITE && u.pathname !== path) info.contextual.add(decodeURIComponent(u.pathname));
      } catch { /* reported by checkRef */ }
    }
  }

  // target=_blank → rel noopener (P075)
  for (const el of findAll(doc, (n) => (attr(n, 'target') ?? '').toLowerCase() === '_blank')) {
    if (!tokens(el, 'rel').includes('noopener')) R.fail(path, 'P075', `${describe(el, ['href', 'rel'])} opens a new tab without rel="noopener"`);
  }

  // tracking sources (P161 — 09 §2d / §3.2)
  if (isCanonicalSource) {
    for (const el of findAll(doc, (n) => hasAttr(n, 'data-source'))) {
      if (!isCanonicalSource(attr(el, 'data-source'))) R.fail(path, 'P161', `${describe(el, ['href', 'data-source'])}: data-source is not a canonical 09 §2d source`);
    }
    for (const a of findAll(doc, (n) => n.tag === 'a' && hasAttr(n, 'href'))) {
      const href = attr(a, 'href');
      const kind = /wa\.me|api\.whatsapp\.com/i.test(href) ? 'WhatsApp' : /^\s*tel:/i.test(href) ? 'tel:' : /instagram\.com/i.test(href) ? 'Instagram' : null;
      if (kind && !hasAttr(a, 'data-source')) R.fail(path, 'P161', `${describe(a, ['href', 'class'])} (${kind}) has no data-source — 09 §3.2 requires one on every wa.me / tel: / Instagram anchor`);
      if (SITE) {
        try {
          const u = new URL(href, self);
          if (u.origin === SITE && u.pathname === '/book/' && u.searchParams.has('src') && !isCanonicalSource(u.searchParams.get('src'))) {
            R.fail(path, 'P161', `${q(href)}: src="${u.searchParams.get('src')}" is not a canonical 09 §2d source (07 §2)`);
          }
        } catch { /* reported by checkRef */ }
      }
    }
  }

  // JSON-LD (P077 / P078 / P082 / P084 / P086 / P087)
  checkJsonLd(path, self, doc, body);

  // NAP (P088): one block per page; identity across pages is compared after the loop
  // A page may render the block more than once (e.g. /contact/ body + footer) as long as every copy is identical.
  const nap = findAll(doc, (n) => n.tag === 'address' && attr(n, 'data-testid') === 'nap');
  const napKey = (el) => `${textOf(el)} | ${findAll(el, (n) => n.tag === 'a').map((a) => attr(a, 'href')).join(' ')}`;
  if (!nap.length) R.fail(path, 'P088', 'no <address data-testid="nap"> (footer NAP, 05 §4 / 08 §4.4)');
  else if (new Set(nap.map(napKey)).size > 1) R.fail(path, 'P088', `${nap.length} NAP blocks on the page differ — every copy must be byte-identical (05 §4)`);
  else info.nap = napKey(nap[0]);

  return info;
}

function checkRef(path, self, ids, { el, raw, kind }) {
  if (/\[FILL:|%5BFILL/i.test(raw)) { placeholderHrefs++; return; } // 00 §8 tokens: the launch gate is check:fill
  if (!SITE) return;
  let u;
  try { u = new URL(raw, self); } catch { R.fail(path, 'P074', `${describe(el)}: unparseable URL ${q(raw)}`); return; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return; // mailto:, tel:, data: …
  if (u.origin !== SITE) return; // external
  const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
  const p = dec(u.pathname);
  const frag = u.hash ? dec(u.hash.slice(1)) : '';
  if (raw.startsWith('#')) {
    if (frag && !ids.has(frag)) R.fail(path, 'P074', `${describe(el)}: #${frag} matches no id on this page`);
    return;
  }
  const last = p.split('/').pop();
  const isFile = /\.[a-z0-9]+$/i.test(last);
  if (!p.endsWith('/') && !isFile) {
    R.fail(path, 'P008', `${describe(el)}: internal URL ${q(raw)} has no trailing slash (00 §5)`);
    return;
  }
  const file = p.endsWith('/') ? pageFile(DIST, p) : join(DIST, ...p.split('/').filter(Boolean));
  const exists = existsSync(file);
  const route = kind === 'page' && routes.ok ? routes.byPath.get(p) : null;
  if (route) {
    if (!routes.isLive(p)) {
      R.fail(path, 'P074', `${describe(el)} links to ${p}, whose status in routes.ts is not live (${envNote()}) — link only live pages`);
      return;
    }
    if (!exists) {
      if (!ALL) R.warn(path, 'P074', `links to ${p} (live route, wave ${route.wave ?? '?'}) which is not in this dist — fine while another builder owns it; --all must find it built`);
      else R.fail(path, 'P074', `${describe(el)} links to ${p}, which is live in routes.ts but not built (${relDist(file)} missing)`);
      return;
    }
  } else if (!exists) {
    R.fail(path, 'P074', `${describe(el)} → ${p} does not resolve to a file in dist (${relDist(file)})`);
    return;
  }
  if (frag && file.endsWith('.html') && !docOf(file).ids.has(frag)) {
    R.fail(path, 'P074', `${describe(el)}: #${frag} matches no id on ${p}`);
  }
}

function checkJsonLd(path, self, doc, body) {
  const scripts = findAll(doc, (n) => n.tag === 'script' && (attr(n, 'type') ?? '').toLowerCase().trim() === 'application/ld+json');
  const blocks = [];
  for (const s of scripts) {
    try { blocks.push(JSON.parse(rawText(s))); } catch (e) { R.fail(path, 'P087', `ld+json block does not parse: ${e.message}`); }
  }
  if (scripts.length > 1) R.warn(path, 'P077', `${scripts.length} ld+json blocks — 04 §2.0.1 wants one script holding one @graph`);
  const top = blocks.flatMap((b) => (Array.isArray(b) ? b : [b])).flatMap((b) => (Array.isArray(b?.['@graph']) ? b['@graph'] : [b]));
  const all = [];
  (function rec(v) {
    if (Array.isArray(v)) v.forEach(rec);
    else if (v && typeof v === 'object') { all.push(v); Object.values(v).forEach(rec); }
  })(blocks);

  // P086: no self-serving review markup, anywhere in the graph
  for (const n of all) {
    const t = typesOf(n);
    if (t.includes('Review') || t.includes('AggregateRating')) R.fail(path, 'P086', `ld+json contains @type ${t.join('/')} — no Review/AggregateRating markup on our own pages (04 §2.0.4)`);
    for (const k of ['aggregateRating', 'review', 'reviews']) if (Object.hasOwn(n, k)) R.fail(path, 'P086', `ld+json node ${typesOf(n).join('/') || '?'} has "${k}" — no self-serving review markup (04 §2.0.4)`);
  }

  // 04 §2.9 matrix: the page's top-level node types. The /blog/ index row (BreadcrumbList only — _TEMPLATE-blog-post.md
  // §6) is not in plan.mjs's schemaRow(), so it is supplied here; blog posts / area pages / the city hub already have rows.
  const row = path === '/blog/' ? { req: ['BreadcrumbList'], opt: [] } : schemaRow(path);
  if (!row) R.warn(path, 'P077', 'no 04-TECHNICAL-SEO §2.9 row for this page — JSON-LD types not checked');
  else {
    const present = new Set(top.flatMap(typesOf));
    const code = { BreadcrumbList: 'P084', LocalBusiness: 'P078', Service: 'P082' };
    for (const t of row.req) if (!present.has(t)) R.fail(path, code[t] ?? 'P077', `JSON-LD lacks a ${t} node (04 §2.9 for this page: ${row.req.join(' + ')})`);
    const allowed = [...row.req, ...row.opt];
    for (const n of top) {
      const t = typesOf(n);
      if (!t.some((x) => allowed.includes(x))) R.fail(path, 'P077', `unexpected top-level @type ${t.join('/') || '(none)'} (04 §2.9 allows ${allowed.join(' + ') || 'no JSON-LD'})`);
    }
  }

  // P087: every FAQ answer and Offer price in the markup is visible on the page
  const text = textOf(body, { visible: true });
  const flat = squash(text);
  const visible = (s) => { const t = stripTags(s); return !t || text.includes(t) || flat.includes(squash(t)); };
  for (const faq of all.filter((n) => typesOf(n).includes('FAQPage'))) {
    for (const qn of [].concat(faq.mainEntity ?? [])) {
      if (qn?.name && !visible(qn.name)) R.fail(path, 'P087', `FAQPage question not visible on the page: ${q(stripTags(qn.name))}`);
      const ans = [].concat(qn?.acceptedAnswer ?? []).map((a) => a?.text).filter(Boolean);
      for (const a of ans) if (!visible(a)) R.fail(path, 'P087', `FAQPage answer not visible on the page: ${q(stripTags(a))}`);
    }
  }
  for (const offer of all.filter((n) => typesOf(n).some((t) => t === 'Offer' || t === 'AggregateOffer'))) {
    const specs = [].concat(offer.priceSpecification ?? []);
    const prices = [offer.price, offer.lowPrice, offer.highPrice, ...specs.flatMap((s) => [s?.price, s?.minPrice, s?.maxPrice])]
      .filter((v) => v !== undefined && v !== null && v !== '' && Number.isFinite(Number(v)) && Number(v) > 0);
    for (const v of new Set(prices.map(Number))) {
      if (!new RegExp(`₹\\s?${inrDigits(v)}(?![\\d,])`).test(text)) {
        R.fail(path, 'P087', `Offer ${q(offer.name ?? '?')}: price ₹${inrDigits(v)} is in the markup but not visible on the page`);
      }
    }
  }

  // P084: BreadcrumbList = the visible breadcrumb (names; URLs of linked items; last item = this page)
  const bl = top.find((n) => typesOf(n).includes('BreadcrumbList'));
  const nav = find(doc, (n) => n.tag === 'nav' && (attr(n, 'aria-label') ?? '').toLowerCase() === 'breadcrumb');
  if (bl && !nav) R.fail(path, 'P084', 'BreadcrumbList in JSON-LD but no visible <nav aria-label="Breadcrumb">');
  if (nav && !bl) R.fail(path, 'P084', 'visible breadcrumb but no BreadcrumbList in JSON-LD');
  if (bl && nav) {
    const list = find(nav, (n) => n.tag === 'ol' || n.tag === 'ul');
    const lis = (list?.children ?? []).filter((c) => c.tag === 'li');
    const shown = lis.map((li) => ({ name: textOf(li), a: find(li, (n) => n.tag === 'a' && hasAttr(n, 'href')) }));
    const items = [].concat(bl.itemListElement ?? []).slice().sort((a, b) => Number(a?.position) - Number(b?.position))
      .map((it) => ({ name: normSpace(it?.name ?? it?.item?.name ?? ''), url: typeof it?.item === 'string' ? it.item : it?.item?.['@id'] ?? it?.item?.url ?? null }));
    const fmt = (xs) => xs.map((x) => x.name).join(' › ');
    if (shown.length !== items.length) R.fail(path, 'P084', `breadcrumb has ${shown.length} item(s) (${fmt(shown)}) but BreadcrumbList has ${items.length} (${fmt(items)})`);
    else {
      items.forEach((it, i) => {
        const vis = shown[i];
        if (vis.name !== it.name) R.fail(path, 'P084', `breadcrumb item ${i + 1}: visible ${q(vis.name)} ≠ BreadcrumbList ${q(it.name)}`);
        if (vis.a && SITE) {
          let href = null;
          try { href = new URL(attr(vis.a, 'href'), self).href; } catch { /* reported by checkRef */ }
          if (href && href !== it.url) R.fail(path, 'P084', `breadcrumb item ${i + 1} (${vis.name}): link ${q(href)} ≠ BreadcrumbList item ${q(it.url ?? 'none')}`);
        }
        if (i === items.length - 1 && self && it.url && it.url !== self) R.fail(path, 'P084', `BreadcrumbList last item ${q(it.url)} ≠ this page ${q(self)}`);
      });
    }
  }
}

// ---- cross-page --------------------------------------------------------------------------------------------------

// P088: NAP identical on every checked page
const naps = infos.filter((i) => i.nap !== null);
if (naps.length > 1) {
  const counts = new Map();
  naps.forEach((i) => counts.set(i.nap, (counts.get(i.nap) ?? 0) + 1));
  const ref = [...counts].sort((a, b) => b[1] - a[1])[0][0];
  const refPage = naps.find((i) => i.nap === ref).path;
  for (const i of naps) {
    if (i.nap === ref) continue;
    let k = 0;
    while (k < ref.length && ref[k] === i.nap[k]) k++;
    R.fail(i.path, 'P088', `NAP differs from ${refPage} at char ${k}: …${q(i.nap.slice(Math.max(0, k - 20), k + 40))} vs …${q(ref.slice(Math.max(0, k - 20), k + 40))}`);
  }
}

if (ALL) {
  // P010 / P018 / P027: unique titles, descriptions, H1s
  const dupes = (key, code, label) => {
    const by = new Map();
    for (const i of infos) if (i[key]) by.set(i[key], [...(by.get(i[key]) ?? []), i.path]);
    for (const [v, paths] of by) if (paths.length > 1) for (const p of paths) R.fail(p, code, `${label} ${q(v)} is also used by ${paths.filter((x) => x !== p).join(', ')}`);
  };
  dupes('title', 'P010', 'title');
  dupes('desc', 'P018', 'meta description');
  dupes('h1', 'P027', 'H1');

  // P068: every indexable page has ≥ 1 contextual inbound link from another indexable page (home is the crawl root)
  const indexable = infos.filter((i) => !i.noindex);
  const inbound = new Map(indexable.map((i) => [i.path, new Set()]));
  for (const src of indexable) for (const t of src.contextual) if (inbound.has(t)) inbound.get(t).add(src.path);
  for (const [p, from] of inbound) {
    // /blog/2/ … paginated indices are reached only via the pagination <nav> (excluded from contextual links), so they
    // are legitimately "orphan" by the <main>-link rule; the crawlable pagination control covers reachability (04 §3.6).
    if (p === '/' || /^\/blog\/\d+\/$/.test(p) || from.size) continue;
    R.fail(p, 'P068', 'orphan: no other indexable page links here from its <main> (outside header/footer/nav) — 01 §2 silo links');
  }

  // P127: sitemap URL set = live indexable routes = built indexable pages; real <lastmod> (E7, contract C6)
  await checkSitemap(indexable);
}

async function checkSitemap(indexable) {
  const idx = join(DIST, 'sitemap-index.xml');
  if (!existsSync(idx)) { R.fail('-', 'P127', 'dist/sitemap-index.xml is missing (@astrojs/sitemap, 04 §7.1)'); return; }
  const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
  const sitemap = new Map(); // path → lastmod | null
  for (const loc of locs(read(idx))) {
    let f;
    try { f = join(DIST, ...new URL(loc).pathname.split('/').filter(Boolean)); } catch { R.fail('-', 'P127', `bad sitemap URL ${q(loc)}`); continue; }
    if (!existsSync(f)) { R.fail('-', 'P127', `${loc} (listed in sitemap-index.xml) is not in dist`); continue; }
    for (const m of read(f).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc2 = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(m[1])?.[1];
      const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(m[1])?.[1] ?? null;
      let u;
      try { u = new URL(loc2); } catch { R.fail('-', 'P127', `bad sitemap URL ${q(loc2 ?? '')}`); continue; }
      if (u.origin !== SITE) R.fail(u.pathname, 'P127', `sitemap URL ${loc2} is not on the site origin ${SITE}`);
      if (sitemap.has(u.pathname)) R.fail(u.pathname, 'P127', 'listed twice in the sitemap');
      sitemap.set(u.pathname, lastmod);
    }
  }
  const live = new Set(routes.ok ? routes.routes.filter((r) => routes.isLive(r.path)).map((r) => r.path) : []);
  const builtIdx = new Set(indexable.filter((i) => i.path.endsWith('/')).map((i) => i.path));
  const allPaths = new Set([...sitemap.keys(), ...(routes.ok ? live : []), ...builtIdx]);
  for (const p of [...allPaths].sort()) {
    const s = sitemap.has(p), l = routes.ok ? live.has(p) : s, b = builtIdx.has(p);
    if (s && l && b) continue;
    const why = !b && existsSync(pageFile(DIST, p)) ? ' (built but noindex)' : '';
    R.fail(p, 'P127', `sitemap ${s ? 'yes' : 'NO'} · live in routes.ts ${l ? 'yes' : 'NO'} · built indexable ${b ? 'yes' : `NO${why}`} — the three sets must be equal`);
  }
  const lm = await loadTs('src/data/lastmod.ts');
  const LASTMOD = lm.mod?.LASTMOD;
  if (!LASTMOD || typeof LASTMOD !== 'object') {
    R.warn('-', 'P127', `<lastmod> not verified: ${lm.why || 'src/data/lastmod.ts exports no LASTMOD'} (contract C6)`);
    return;
  }
  for (const [p, got] of sitemap) {
    const want = LASTMOD[p];
    if (!want) R.fail(p, 'P127', 'no LASTMOD entry in src/data/lastmod.ts — every sitemap URL needs a real lastmod (E7)');
    else if (!got) R.fail(p, 'P127', `sitemap has no <lastmod> (E7: real lastmod = ${want} from src/data/lastmod.ts)`);
    else if (!String(got).startsWith(want)) R.fail(p, 'P127', `<lastmod>${got}</lastmod> ≠ LASTMOD ${want} (src/data/lastmod.ts)`);
  }
}

// ---- registry drift: sources.ts copies routes.ts slugs and pricing.json ids (it must stay import-free) ---------------
if (sources.mod && routes.ok) {
  const have = new Set(sources.mod.ROUTE_SLUGS ?? []);
  // Paginated blog indices (/blog/2/ …) have a numeric last segment and emit only fixed sources (blog_card/ctaband_blog),
  // never a `<slug>_page` — so their slug is not a ROUTE_SLUGS tracking slug; exclude them from the drift set.
  const want = new Set(routes.routes.filter((r) => !/^\/blog\/\d+\/$/.test(r.path)).map((r) => routeSlug(r.path)));
  for (const s of want) if (!have.has(s)) R.warn('src/data/sources.ts', 'P161', `route slug "${s}" (routes.ts) is missing from ROUTE_SLUGS — hero_${s} / ctaband_${s} / ${s}_page would be rejected`);
  for (const s of have) if (!want.has(s)) R.warn('src/data/sources.ts', 'P161', `ROUTE_SLUGS has "${s}", which is not a route in routes.ts`);
  const pricingFile = join(WEBSITE, 'src/data/pricing.json');
  if (existsSync(pricingFile)) {
    const ids = new Set(JSON.parse(read(pricingFile)).services?.map((s) => s.id) ?? []);
    const listed = new Set(sources.mod.SERVICE_IDS ?? []);
    for (const id of ids) if (!listed.has(id)) R.warn('src/data/sources.ts', 'P161', `pricing.json service "${id}" is missing from SERVICE_IDS — service_${id} would be rejected`);
    for (const id of listed) if (!ids.has(id)) R.warn('src/data/sources.ts', 'P161', `SERVICE_IDS has "${id}", which is not a pricing.json service`);
  }
}

if (unknownEntities.size) R.warn('-', '-', `unknown HTML entities left undecoded: ${[...unknownEntities].map((e) => `&${e};`).join(' ')}`);
if (placeholderHrefs) R.info(`${placeholderHrefs} URL(s) are still [FILL:*] tokens — skipped here; \`npm run check:fill\` is the launch gate for them`);
process.exit(R.finish(`${infos.length} page(s) checked`));
