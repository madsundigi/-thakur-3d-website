// check:budgets — weight + script gate over the BUILT site (reads dist/ and public/og/; run `npm run build` first).
// Budgets: 08-DESIGN-SYSTEM.md §8.1/§8.3 (the working targets) under the 04-TECHNICAL-SEO.md §1.3/§5 ceilings.
//
//   node scripts/check-budgets.mjs [--pages /a/,/b/] [--dist <dir>]      default: every page in dist
//
// Per page:  CSS (linked stylesheets + inline <style>) ≤ 51,200 B raw · no <script src>, <link rel=modulepreload> or
//            <astro-island> except on /book/ · inline <script> only type=application/ld+json or data-pds ∈
//            {analytics, exit-card, thank-you} (contract C5; on /book/ also Astro's island bootstrap) · ≤ 2 font
//            preloads, each a self-hosted WOFF2.
// Site-wide: booking-island JS reachable from /book/ ≤ 90 KB gzip -9 (08 §8.3 method; 04 §5.3 hard cap 100 KB) ·
//            fonts: ≤ 2 families, ≤ 2 WOFF2 files (tiny unicode-range glyph patches noted), ≤ 160 KB total incl.
//            inlined data: fonts, self-hosted WOFF2 only · public/og/*.{jpg,jpeg,png} ≤ 300 KB and exactly 1200×630.
// Exit 1 on any FAIL.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';
import { Reporter, WEBSITE, distDir, filePath, listFiles, listPages, pageFile, parseArgs, read, siteOrigin } from './lib/common.mjs';
import { attr, byTag, hasAttr, parseHtml, tokens } from './lib/html.mjs';

const args = parseArgs(process.argv.slice(2));
const R = new Reporter('check:budgets');
const DIST = distDir(args);
if (!existsSync(DIST)) {
  console.log(`check:budgets — ${DIST} does not exist: run \`npm run build\` first.`);
  process.exit(1);
}
const SITE = siteOrigin(DIST) ?? 'https://site.invalid';
const pages = args.pages.length ? args.pages : listPages(DIST);

const CSS_MAX = 51_200; // 08 §8.1 "≤ 50 KB compiled, pre-compression" (08 §8.3: -le 51200)
const ISLAND_GZ_MAX = 92_160; // 08 §8.1 "≤ 90 KB gzipped" (08 §8.3: gzip -9, -le 92160)
const ISLAND_HARD_CAP = 102_400; // 04 §5.1/§5.3 "≤ 100 KB compressed"
const FONT_MAX = 163_840; // 08 §8.1/§8.3 "≤ 160 KB total target"
const FONT_HARD_CAP = 204_800; // 04 §1.3 "≤ 200 KB total font payload"
const OG_MAX = 307_200; // 04 §4 "JPG, ≤ 300 KB"
const PDS_ALLOWED = new Set(['analytics', 'exit-card', 'thank-you']); // contract C5
const EXIT_ABSENT = new Set(['/book/', '/thank-you/', '/privacy-policy/', '/terms/', '/refund-policy/', '/404.html']); // 07 §2 row 7 + C4
const BOOK = '/book/';

const rawText = (n) => n.children.filter((c) => c.type === 'text').map((c) => c.value).join('');
const kb = (b) => `${(b / 1024).toFixed(1)} KB`;
const relW = (f) => { const r = relative(WEBSITE, f); return r.startsWith('..') ? f : r; }; // website-relative, absolute when outside
/** Same-origin URL → dist file (null when external or unparseable). */
function distFileOf(url, base) {
  let u;
  try { u = new URL(url, base); } catch { return null; }
  if (u.origin !== SITE) return null;
  return join(DIST, ...decodeURIComponent(u.pathname).split('/').filter(Boolean));
}

// ---- per page ----------------------------------------------------------------------------------------------------

const rows = [];
const untaggedAnalytics = [];
const islandEntries = new Set(); // dist JS files /book/ loads directly
const inlineCss = []; // inline <style> texts (for the @font-face scan)
let bookSeen = false;

for (const path of pages) {
  const file = pageFile(DIST, path);
  if (!existsSync(file)) { R.fail(path, 'P123', `not built — ${relW(file)} is missing`); continue; }
  const self = `${SITE}${path}`;
  const doc = parseHtml(read(file));
  const isBook = path === BOOK;
  if (isBook) bookSeen = true;
  const row = { path, css: 0, cssParts: [], scripts: 0, preloads: 0 };

  // CSS ≤ 51,200 B (08 §8.1)
  for (const l of byTag(doc, 'link').filter((n) => tokens(n, 'rel').includes('stylesheet'))) {
    const href = attr(l, 'href');
    const f = distFileOf(href, self);
    if (!f) { R.fail(path, 'P104', `stylesheet ${href} is not self-hosted (04 §5.2.5: one compiled stylesheet)`); continue; }
    if (!existsSync(f)) { R.fail(path, 'P104', `stylesheet ${href} is not in dist`); continue; }
    const b = statSync(f).size;
    row.css += b;
    row.cssParts.push(`${href} ${b} B`);
  }
  for (const s of byTag(doc, 'style')) {
    const t = rawText(s);
    inlineCss.push(t);
    const b = Buffer.byteLength(t);
    row.css += b;
    row.cssParts.push(`inline <style> ${b} B`);
  }
  if (row.css > CSS_MAX) R.fail(path, 'P104', `CSS is ${row.css.toLocaleString('en-IN')} B raw > ${CSS_MAX.toLocaleString('en-IN')} B (08 §8.1): ${row.cssParts.join(' + ')}`);

  // scripts: zero client JS outside /book/ (04 §5.1/§5.3); inline scripts allowlisted (contract C5)
  const hasIsland = byTag(doc, 'astro-island').length > 0;
  for (const s of byTag(doc, 'script')) {
    row.scripts++;
    const type = (attr(s, 'type') ?? '').toLowerCase().trim();
    if (hasAttr(s, 'src')) {
      const src = attr(s, 'src');
      if (!isBook) R.fail(path, 'P103', `<script src="${src}"> — client JS is allowed only on /book/ (04 §5.3)`);
      else { const f = distFileOf(src, self); if (f) islandEntries.add(f); else R.fail(path, 'P106', `third-party <script src="${src}"> in the static HTML — GA4 loads after window load only (09 §1)`); }
      continue;
    }
    if (type === 'application/ld+json') continue;
    const pds = attr(s, 'data-pds');
    if (pds !== undefined) {
      if (!PDS_ALLOWED.has(pds)) R.fail(path, 'P103', `inline <script data-pds="${pds}"> is not in the allowlist (${[...PDS_ALLOWED].join(', ')} — contract C5)`);
      else if (pds === 'exit-card' && EXIT_ABSENT.has(path)) R.fail(path, 'P107', 'the exit-card script ships on a page where the nudge is banned (07 §2 row 7, contract C4)');
      else if (pds === 'thank-you' && path !== '/thank-you/') R.fail(path, 'P103', 'the thank-you script ships outside /thank-you/');
      continue;
    }
    const text = rawText(s);
    if (text.includes('window.track')) { untaggedAnalytics.push(path); continue; } // C5 transition: treat as analytics
    if (isBook && hasIsland && /astro-island|self\.Astro|\(self\.Astro\|\|/.test(text)) continue; // Astro's island bootstrap
    R.fail(path, 'P103', `inline <script> without an allowlisted data-pds (contract C5): ${JSON.stringify(text.trim().slice(0, 70))}…`);
  }
  for (const l of byTag(doc, 'link').filter((n) => tokens(n, 'rel').includes('modulepreload'))) {
    if (!isBook) R.fail(path, 'P103', `<link rel="modulepreload" href="${attr(l, 'href')}"> — client JS is allowed only on /book/ (04 §5.3)`);
    else { const f = distFileOf(attr(l, 'href'), self); if (f) islandEntries.add(f); }
  }
  for (const island of byTag(doc, 'astro-island')) {
    if (!isBook) { R.fail(path, 'P103', `<astro-island component-url="${attr(island, 'component-url')}"> — the booking widget on /book/ is the only island (04 §5.3, 07 §8)`); continue; }
    for (const k of ['component-url', 'renderer-url', 'before-hydration-url']) {
      const f = attr(island, k) ? distFileOf(attr(island, k), self) : null;
      if (f) islandEntries.add(f);
    }
  }

  // font preloads (04 §1.3: preload both WOFF2 files; P105)
  const fontPreloads = byTag(doc, 'link').filter((n) => tokens(n, 'rel').includes('preload') && (attr(n, 'as') ?? '').toLowerCase() === 'font');
  row.preloads = fontPreloads.length;
  if (fontPreloads.length > 2) R.fail(path, 'P105', `${fontPreloads.length} font preloads — 2 WOFF2 files max (04 §1.3, 08 §8.1)`);
  for (const l of fontPreloads) {
    const href = attr(l, 'href') ?? '';
    const f = distFileOf(href, self);
    if (!f) R.fail(path, 'P105', `font preload ${href} is not self-hosted (04 §1.3)`);
    else if (!existsSync(f)) R.fail(path, 'P105', `font preload ${href} is not in dist`);
    if (!/\.woff2(\?|#|$)/i.test(href)) R.fail(path, 'P105', `font preload ${href} is not WOFF2`);
    if (!hasAttr(l, 'crossorigin')) R.fail(path, 'P105', `font preload ${href} lacks crossorigin (it would download twice)`);
  }
  rows.push(row);
}
if (untaggedAnalytics.length) {
  const per = new Map();
  untaggedAnalytics.forEach((p) => per.set(p, (per.get(p) ?? 0) + 1));
  const list = [...per].map(([p, n]) => (n > 1 ? `${p} ×${n}` : p)).join(', ');
  R.warn('-', 'P103', `untagged inline <script> containing window.track treated as analytics on ${per.size} page(s): ${list} — tag it data-pds="analytics" (or "thank-you") per contract C5`);
}

// ---- booking island (site-wide) ----------------------------------------------------------------------------------

const allJs = listFiles(DIST, (f) => /\.m?js$/.test(f));
if (!existsSync(pageFile(DIST, BOOK))) R.warn(BOOK, 'P103', 'not built — booking-island budget not measured');
else {
  if (!bookSeen) {
    const doc = parseHtml(read(pageFile(DIST, BOOK)));
    const self = `${SITE}${BOOK}`;
    for (const s of byTag(doc, 'script')) if (hasAttr(s, 'src')) { const f = distFileOf(attr(s, 'src'), self); if (f) islandEntries.add(f); }
    for (const l of byTag(doc, 'link').filter((n) => tokens(n, 'rel').includes('modulepreload'))) { const f = distFileOf(attr(l, 'href'), self); if (f) islandEntries.add(f); }
    for (const island of byTag(doc, 'astro-island')) for (const k of ['component-url', 'renderer-url', 'before-hydration-url']) { const f = attr(island, k) ? distFileOf(attr(island, k), self) : null; if (f) islandEntries.add(f); }
  }
  // follow static + dynamic imports between the chunks
  const reach = new Set();
  const queue = [...islandEntries];
  while (queue.length) {
    const f = queue.shift();
    if (reach.has(f)) continue;
    if (!existsSync(f)) { R.fail(BOOK, 'P103', `island chunk ${relW(f)} is referenced but not in dist`); continue; }
    reach.add(f);
    const code = read(f);
    const specs = [
      ...[...code.matchAll(/\b(?:import|export)\s*(?:[\w$*{}\s,]+?\s*from\s*)?["']([^"']+\.m?js)["']/g)].map((m) => m[1]),
      ...[...code.matchAll(/\bimport\(\s*["']([^"']+\.m?js)["']\s*\)/g)].map((m) => m[1]),
    ];
    for (const spec of specs) {
      const u = new URL(spec, `${SITE}${filePath(DIST, f)}`);
      if (u.origin !== SITE) continue;
      const g = join(DIST, ...decodeURIComponent(u.pathname).split('/').filter(Boolean));
      if (existsSync(g) && !reach.has(g)) queue.push(g);
    }
  }
  const files = [...reach].sort();
  const raw = files.map((f) => readFileSync(f));
  const gz = gzipSync(Buffer.concat(raw), { level: 9 }).length;
  const perFile = files.map((f, i) => `${relative(DIST, f)} ${kb(raw[i].length)} → ${kb(gzipSync(raw[i], { level: 9 }).length)} gz`);
  R.info(`booking island: ${files.length} chunk(s), ${kb(gz)} gzip -9 (budget 90 KB, 08 §8.1) — ${perFile.join(' · ')}`);
  if (gz > ISLAND_GZ_MAX) {
    R.fail(BOOK, 'P103', `booking island JS is ${kb(gz)} gzipped > 90 KB (08 §8.1)${gz > ISLAND_HARD_CAP ? ' and > the 100 KB hard cap (04 §5.3)' : ''} — 04 §5.3 pre-approves the Preact swap`);
  }
  for (const f of allJs) if (!reach.has(f)) R.warn('-', 'P103', `${relative(DIST, f)} is in dist but not loaded by /book/ — dead or misplaced client JS`);
}

// ---- fonts (site-wide) -------------------------------------------------------------------------------------------

const cssTexts = [...listFiles(DIST, (f) => f.endsWith('.css')).map((f) => ({ where: relative(DIST, f), text: read(f), base: `${SITE}${filePath(DIST, f)}` })),
  ...inlineCss.map((text) => ({ where: 'inline <style>', text, base: `${SITE}/` }))];
const faces = [];
for (const { where, text, base } of cssTexts) {
  for (const m of text.matchAll(/@font-face\s*{([^}]*)}/g)) {
    const block = m[1];
    const fam = /font-family\s*:\s*(['"]?)([^;'"]+)\1/.exec(block)?.[2]?.trim() ?? '?';
    const urls = [...block.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((x) => x[2]);
    const range = /unicode-range\s*:\s*([^;]+)/.exec(block)?.[1]?.trim() ?? null;
    faces.push({ where, fam, urls, range, base });
  }
}
const rangeSize = (r) => (r ? r.split(',').reduce((n, part) => {
  const p = part.trim().replace(/^U\+/i, '');
  if (p.includes('?')) return n + 16 ** (p.match(/\?/g).length);
  const [a, b] = p.split('-').map((h) => parseInt(h, 16));
  return n + (Number.isFinite(b) ? b - a + 1 : 1);
}, 0) : Infinity);
const families = new Set(faces.filter((f) => f.urls.length).map((f) => f.fam));
if (families.size > 2) R.fail('-', 'P105', `${families.size} web-font families (${[...families].join(', ')}) — 2 max (04 §1.3, 08 §2.1)`);
let inlineFontBytes = 0;
const primaryFiles = new Set();
const patchFiles = [];
const referenced = new Set();
for (const face of faces) {
  for (const url of face.urls) {
    if (url.startsWith('data:')) {
      if (!/^data:(font\/woff2|application\/font-woff2)/i.test(url)) R.fail('-', 'P105', `${face.where}: inlined ${face.fam} font is not WOFF2`);
      const b64 = url.split(',')[1] ?? '';
      const bytes = Buffer.from(b64, 'base64').length;
      inlineFontBytes += bytes;
      patchFiles.push(`${face.fam} ${face.range ?? ''} (inlined, ${bytes} B)`);
      continue;
    }
    const f = distFileOf(url, face.base);
    if (!f) { R.fail('-', 'P105', `${face.where}: ${face.fam} loads from another origin (${url}) — self-hosted fonts only (04 §1.3)`); continue; }
    if (!/\.woff2$/i.test(f)) R.fail('-', 'P105', `${face.where}: ${face.fam} uses ${url} — WOFF2 only (04 §1.3)`);
    referenced.add(f);
    if (rangeSize(face.range) <= 16) patchFiles.push(`${face.fam} ${face.range} (${relative(DIST, f)})`);
    else primaryFiles.add(f);
  }
}
const woff2 = listFiles(DIST, (f) => /\.woff2$/i.test(f));
const fileBytes = woff2.reduce((n, f) => n + statSync(f).size, 0);
const fontTotal = fileBytes + inlineFontBytes;
R.info(`fonts: ${families.size} famil${families.size === 1 ? 'y' : 'ies'} · ${woff2.length} WOFF2 file(s) ${kb(fileBytes)} + ${kb(inlineFontBytes)} inlined = ${kb(fontTotal)} (target 160 KB, 08 §8.1)${patchFiles.length ? ` · glyph patches: ${patchFiles.join('; ')}` : ''}`);
if (primaryFiles.size > 2) R.fail('-', 'P105', `${primaryFiles.size} WOFF2 files (${[...primaryFiles].map((f) => relative(DIST, f)).join(', ')}) — 08 §8.1 allows 2`);
if (fontTotal > FONT_MAX) R.fail('-', 'P105', `font payload ${kb(fontTotal)} > 160 KB (08 §8.1/§8.3)${fontTotal > FONT_HARD_CAP ? ' and > the 200 KB cap (04 §1.3)' : ''}`);
for (const f of woff2) if (!referenced.has(f)) R.warn('-', 'P105', `${relative(DIST, f)} is in dist but no @font-face uses it`);
for (const { where, text } of cssTexts) if (/fonts\.(googleapis|gstatic)\.com/.test(text)) R.fail('-', 'P105', `${where} references Google Fonts — self-hosted only (04 §1.3)`);

// ---- OG images (04 §4: 1200×630, ≤ 300 KB) -------------------------------------------------------------------------

const ogDir = join(WEBSITE, 'public', 'og');
const ogFiles = listFiles(ogDir, (f) => /\.(jpe?g|png)$/i.test(f));
if (!ogFiles.length) R.warn('public/og/', 'P118', 'no OG images (04 §4 lists 6 for Phase 1)');
let sharp = null;
try { sharp = createRequire(join(WEBSITE, 'package.json'))('sharp'); } catch (e) { R.warn('public/og/', 'P118', `sharp unavailable (${e.message.split('\n')[0]}) — OG dimensions not checked`); }
for (const f of ogFiles) {
  const size = statSync(f).size;
  if (size > OG_MAX) R.fail(relW(f), 'P118', `${kb(size)} > 300 KB (04 §4)`);
  if (sharp) {
    try {
      const { width, height } = await sharp(f).metadata();
      if (width !== 1200 || height !== 630) R.fail(relW(f), 'P118', `${width}×${height} — OG images must be exactly 1200×630 (04 §4)`);
    } catch (e) { R.fail(relW(f), 'P118', `unreadable image: ${e.message.split('\n')[0]}`); }
  }
}

// ---- table -------------------------------------------------------------------------------------------------------

if (rows.length) {
  const w = Math.max(...rows.map((r) => r.path.length), 4);
  console.log(`\n${'page'.padEnd(w)}  ${'CSS (B)'.padStart(9)}  scripts  font preloads`);
  for (const r of rows) console.log(`${r.path.padEnd(w)}  ${String(r.css).padStart(9)}  ${String(r.scripts).padStart(7)}  ${String(r.preloads).padStart(13)}`);
}
process.exit(R.finish(`${rows.length} page(s), ${ogFiles.length} OG image(s)`));
