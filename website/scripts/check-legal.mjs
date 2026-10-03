// check:legal — the privacy policy must describe what the code really stores and sends (01-SITEMAP: "/privacy-policy/
// mentions lead data, WhatsApp, analytics"; 09-ANALYTICS-TRACKING §9; 02 P051). Source of the policy's lists:
// src/data/legal.ts (contract C8: STORAGE_KEYS {key, store, purpose, lifetime}[], LEAD_COLUMNS, GA4_EVENTS, PROCESSORS).
//
//   node scripts/check-legal.mjs           code ↔ legal.ts
//   node scripts/check-legal.mjs --dist    … plus the built dist/privacy-policy/index.html names every storage key
//                                          and every PROCESSORS name
//
// 1. every 'pds_*' storage-key literal under src/ is listed in legal.ts STORAGE_KEYS (listed-but-unused → WARN)
// 2. src/lib/leads.ts LEAD_COLUMNS equals legal.ts LEAD_COLUMNS, in order (the sheet column order is law, 07 §10)
// 3. src/lib/analytics.ts GA4_EVENTS equals legal.ts GA4_EVENTS (as a set); every event the code fires is in it
//    (2–3: a missing export → the list is scanned from the source instead, with a WARN)
// legal.ts missing → WARN and exit 0 until contract C8 lands. Exit 1 on any FAIL.
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { Reporter, WEBSITE, distDir, listFiles, pageFile, parseArgs, read } from './lib/common.mjs';
import { find, parseHtml, textOf } from './lib/html.mjs';
import { loadTs } from './lib/load-ts.mjs';

const args = parseArgs(process.argv.slice(2));
const R = new Reporter('check:legal');
const withDist = Object.hasOwn(args.values, 'dist') || args.flags.has('dist');
const rel = (f) => relative(WEBSITE, f).split(sep).join('/');
const LEGAL = 'src/data/legal.ts';

const legal = await loadTs(LEGAL);
if (!legal.mod) {
  R.warn(LEGAL, 'P051', `${legal.why} — contract C8 not merged yet; legal checks skipped`);
  R.finish();
  process.exit(0);
}
const { STORAGE_KEYS, LEAD_COLUMNS, GA4_EVENTS, PROCESSORS } = legal.mod;
const shapeOk = (v, name) => {
  if (Array.isArray(v)) return true;
  R.fail(LEGAL, 'P051', `must export ${name} as an array (contract C8)`);
  return false;
};

// ---- 1 · storage keys ----------------------------------------------------------------------------------------------

const srcFiles = listFiles(join(WEBSITE, 'src'), (f) => /\.(ts|tsx|astro|js|mjs|jsx)$/.test(f) && rel(f) !== LEGAL);
const used = new Map(); // key → [{ at, store }]
const scanned = new Map(); // file → lines (reused by the event scan)
for (const f of srcFiles) {
  const lines = read(f).split('\n');
  scanned.set(f, lines);
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comment lines are prose, not keys
    const at = `${rel(f)}:${i + 1}`;
    for (const m of line.matchAll(/(['"`])(pds_[A-Za-z0-9_]+)\1/g)) {
      const store = /sessionStorage/.test(line) && !/localStorage/.test(line) ? 'session' : /localStorage/.test(line) && !/sessionStorage/.test(line) ? 'local' : null;
      const refs = used.get(m[2]) ?? [];
      if (!refs.some((r) => r.at === at)) used.set(m[2], [...refs, { at, store }]);
    }
    if (/(['"`])pds_[A-Za-z0-9_]*\$\{|(['"])pds_[A-Za-z0-9_]*\2\s*\+/.test(line)) R.warn(at, 'P051', 'storage key built at runtime — list every key it can produce in legal.ts STORAGE_KEYS');
  });
}
if (shapeOk(STORAGE_KEYS, 'STORAGE_KEYS')) {
  const listed = new Map();
  for (const k of STORAGE_KEYS) {
    const missing = ['key', 'store', 'purpose', 'lifetime'].filter((x) => !String(k?.[x] ?? '').trim());
    if (missing.length) R.fail(LEGAL, 'P051', `STORAGE_KEYS entry ${JSON.stringify(k?.key ?? k)} lacks ${missing.join(', ')} (contract C8 {key, store, purpose, lifetime})`);
    if (k?.key) listed.set(k.key, k);
  }
  for (const [key, refs] of [...used].sort()) {
    const entry = listed.get(key);
    if (!entry) { R.fail(refs[0].at, 'P051', `storage key "${key}" is not listed in ${LEGAL} STORAGE_KEYS — the privacy policy must name it${refs.length > 1 ? ` (also ${refs.slice(1).map((r) => r.at).join(', ')})` : ''}`); continue; }
    const declared = String(entry.store ?? '').toLowerCase().replace(/storage$/, '');
    for (const r of refs) if (r.store && ['local', 'session'].includes(declared) && r.store !== declared) R.warn(r.at, 'P051', `"${key}" is used with ${r.store}Storage here but STORAGE_KEYS says ${entry.store}`);
  }
  for (const key of listed.keys()) if (!used.has(key)) R.warn(LEGAL, 'P051', `STORAGE_KEYS lists "${key}" but no file under src/ uses it`);
  R.info(`storage keys: ${used.size} used in src/ · ${listed.size} listed in legal.ts`);
}

// ---- 2 · lead columns ------------------------------------------------------------------------------------------------

/** Column names from leads.ts source: a LEAD_COLUMNS array literal, else the keys of bookingPayload()'s return object. */
function scanLeadColumns(src) {
  const arr = /LEAD_COLUMNS\s*(?::[^=]+)?=\s*\[([\s\S]*?)\]/.exec(src);
  if (arr) return [...arr[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((m) => m[1]);
  const fn = src.indexOf('function bookingPayload');
  if (fn < 0) return null;
  const ret = src.indexOf('return {', fn);
  if (ret < 0) return null;
  let depth = 0;
  let end = -1;
  for (let i = src.indexOf('{', ret); i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) { end = i; break; }
  }
  if (end < 0) return null;
  const body = src.slice(src.indexOf('{', ret) + 1, end);
  return [...body.matchAll(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:/gm)].map((m) => m[1]);
}

if (shapeOk(LEAD_COLUMNS, 'LEAD_COLUMNS')) {
  const leads = await loadTs('src/lib/leads.ts');
  let cols = null;
  let how = 'LEAD_COLUMNS export';
  if (Array.isArray(leads.mod?.LEAD_COLUMNS)) cols = leads.mod.LEAD_COLUMNS;
  else {
    how = 'source scan';
    R.warn('src/lib/leads.ts', 'P051', `no LEAD_COLUMNS export (${leads.why || 'contract C8 pending'}) — columns scanned from the source instead`);
    if (existsSync(join(WEBSITE, 'src/lib/leads.ts'))) cols = scanLeadColumns(read(join(WEBSITE, 'src/lib/leads.ts')));
  }
  if (!cols?.length) R.warn('src/lib/leads.ts', 'P051', 'could not determine the lead columns — LEAD_COLUMNS not compared');
  else if (JSON.stringify(cols) !== JSON.stringify(LEAD_COLUMNS)) {
    const missing = cols.filter((c) => !LEAD_COLUMNS.includes(c));
    const extra = LEAD_COLUMNS.filter((c) => !cols.includes(c));
    const k = cols.findIndex((c, i) => c !== LEAD_COLUMNS[i]);
    R.fail(LEGAL, 'P051', `LEAD_COLUMNS ≠ src/lib/leads.ts (${how})${missing.length ? ` · missing in legal.ts: ${missing.join(', ')}` : ''}${extra.length ? ` · not in leads.ts: ${extra.join(', ')}` : ''}${!missing.length && !extra.length ? ` · order differs from #${k + 1} (${cols[k]} vs ${LEAD_COLUMNS[k]})` : ''}`);
  } else R.info(`lead columns: ${cols.length} — legal.ts matches leads.ts (${how})`);
}

// ---- 3 · GA4 events --------------------------------------------------------------------------------------------------

const fired = new Map(); // event → first place it is fired
for (const [f, lines] of scanned) {
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/\b(?:window\.)?track\(\s*['"]([a-z][a-z0-9_]*)['"]|data-track=["']([a-z][a-z0-9_]*)["']/g)) {
      const name = m[1] ?? m[2];
      if (!fired.has(name)) fired.set(name, `${rel(f)}:${i + 1}`);
    }
  });
}
if (shapeOk(GA4_EVENTS, 'GA4_EVENTS')) {
  const legalSet = new Set(GA4_EVENTS);
  const an = await loadTs('src/lib/analytics.ts');
  if (Array.isArray(an.mod?.GA4_EVENTS)) {
    const codeSet = new Set(an.mod.GA4_EVENTS);
    for (const e of codeSet) if (!legalSet.has(e)) R.fail(LEGAL, 'P051', `GA4_EVENTS lacks "${e}" (in src/lib/analytics.ts GA4_EVENTS)`);
    for (const e of legalSet) if (!codeSet.has(e)) R.fail(LEGAL, 'P051', `GA4_EVENTS has "${e}", which src/lib/analytics.ts GA4_EVENTS does not`);
    for (const [e, at] of fired) if (!codeSet.has(e)) R.fail(at, 'P051', `fires "${e}", which is not in src/lib/analytics.ts GA4_EVENTS (09 §2 registry)`);
  } else {
    R.warn('src/lib/analytics.ts', 'P051', `no GA4_EVENTS export (${an.why || 'contract C8 pending'}) — events scanned from track()/data-track calls instead`);
    for (const [e, at] of fired) if (!legalSet.has(e)) R.fail(at, 'P051', `fires "${e}", which legal.ts GA4_EVENTS does not list`);
    for (const e of legalSet) if (!fired.has(e)) R.warn(LEGAL, 'P051', `GA4_EVENTS lists "${e}" but no track()/data-track call fires it (fine for GA4-automatic events such as page_view/scroll)`);
  }
  R.info(`GA4 events: ${fired.size} fired in src/ · ${legalSet.size} listed in legal.ts`);
}

// ---- 4 · the built privacy policy names every key and processor ------------------------------------------------------

if (withDist) {
  const file = pageFile(distDir({ values: { dist: args.values.dist } }), '/privacy-policy/');
  if (!existsSync(file)) R.warn('/privacy-policy/', 'P051', `not built (${rel(file)} missing) — mention checks skipped`);
  else {
    const doc = parseHtml(read(file));
    const text = textOf(find(doc, (n) => n.tag === 'main') ?? doc);
    const lower = text.toLowerCase();
    for (const k of Array.isArray(STORAGE_KEYS) ? STORAGE_KEYS : []) if (k?.key && !text.includes(k.key)) R.fail('/privacy-policy/', 'P051', `does not mention storage key ${k.key}`);
    if (shapeOk(PROCESSORS, 'PROCESSORS')) {
      for (const p of PROCESSORS) if (p?.name && !lower.includes(String(p.name).toLowerCase())) R.fail('/privacy-policy/', 'P051', `does not name processor "${p.name}"`);
    }
  }
}

process.exit(R.finish());
