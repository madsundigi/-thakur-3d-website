// Price gates (07-BOOKING-SPEC §4): (1) no ₹ literal in .astro/.tsx components — prices come from pricing.json;
// (2) no hard-coded ₹ amount in .ts/.js copy under src/ (comments ignored; pricing.json and lib/pricing.ts, the
// formatter, are the only places a rupee figure may be typed); (3) every ₹ figure inside faq.json questions and
// answers matches a price in pricing.json (or a defined offer amount in src/data/offers.ts: FIRSTGROOM, REFERRAL).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

let failed = false;
const walk = (dir, out = []) => {
  for (const n of readdirSync(dir)) { const p = join(dir, n); statSync(p).isDirectory() ? walk(p, out) : out.push(p); }
  return out;
};
const rel = (f) => f.split(sep).join('/');
const files = walk('src');

// ---- 1 · components (.astro / .tsx): any ₹+digit on any line ----------------------------------------------------
for (const f of files.filter((f) => /\.(astro|tsx)$/.test(f))) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (/₹\s?\d/.test(line)) { failed = true; console.log(`₹ literal in component: ${f}:${i + 1}: ${line.trim()}`); }
  });
}

// ---- 2 · .ts/.js copy files: ₹+digit outside comments -----------------------------------------------------------
// Blank out // and /* */ comments (keeping string, template and regex literals, and line numbers, intact).
function stripComments(src) {
  const out = src.split('');
  const tpl = []; // brace depth at each open `${`
  let i = 0;
  let state = 'code'; // code | sq | dq | tpl | line | block | regex | regexClass
  let prev = ''; // last significant code char, for the regex-vs-division heuristic
  const blank = (a, b) => { for (let k = a; k < b; k++) if (out[k] !== '\n') out[k] = ' '; };
  while (i < src.length) {
    const c = src[i], d = src[i + 1];
    switch (state) {
      case 'code':
        if (c === '/' && d === '/') { const e = src.indexOf('\n', i); const end = e < 0 ? src.length : e; blank(i, end); i = end; continue; }
        if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); const end = e < 0 ? src.length : e + 2; blank(i, end); i = end; continue; }
        if (c === "'") state = 'sq';
        else if (c === '"') state = 'dq';
        else if (c === '`') state = 'tpl';
        else if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || /\b(return|typeof|case|in|of)\s*$/.test(src.slice(Math.max(0, i - 8), i)))) state = 'regex';
        else if (c === '{' && tpl.length) tpl[tpl.length - 1]++;
        else if (c === '}' && tpl.length) { if (tpl[tpl.length - 1] === 0) { tpl.pop(); state = 'tpl'; } else tpl[tpl.length - 1]--; }
        if (!/\s/.test(c)) prev = c;
        break;
      case 'sq': if (c === '\\') i++; else if (c === "'" || c === '\n') { state = 'code'; prev = "'"; } break;
      case 'dq': if (c === '\\') i++; else if (c === '"' || c === '\n') { state = 'code'; prev = '"'; } break;
      case 'tpl':
        if (c === '\\') i++;
        else if (c === '`') { state = 'code'; prev = '`'; }
        else if (c === '$' && d === '{') { tpl.push(0); state = 'code'; prev = '{'; i++; }
        break;
      case 'regex': if (c === '\\') i++; else if (c === '[') state = 'regexClass'; else if (c === '/' || c === '\n') { state = 'code'; prev = ')'; } break;
      case 'regexClass': if (c === '\\') i++; else if (c === ']') state = 'regex'; break;
    }
    i++;
  }
  return out.join('');
}

// Reviewed exceptions, matched on exact line text. Each names why it is not a price and how to remove it.
const TS_EXEMPT = [];
const exemptUsed = new Set();
const TS_SKIP = new Set(['src/lib/pricing.ts']); // the ₹ formatter itself
for (const f of files.filter((f) => /\.(ts|mts|js|mjs)$/.test(f) && !/\.d\.ts$/.test(f) && !TS_SKIP.has(rel(f)))) {
  const raw = readFileSync(f, 'utf8').split('\n');
  stripComments(raw.join('\n')).split('\n').forEach((line, i) => {
    if (!/₹\s?\d/.test(line)) return;
    const ex = TS_EXEMPT.find((x) => x.file === rel(f) && raw[i].includes(x.text));
    if (ex) { exemptUsed.add(ex); return; }
    failed = true;
    console.log(`₹ literal in .ts copy: ${f}:${i + 1}: ${raw[i].trim()}  → render it from pricing.json/offers.ts with inr()`);
  });
}
for (const ex of TS_EXEMPT) if (!exemptUsed.has(ex)) console.log(`note: exemption no longer needed — remove it from scripts/check-prices.mjs: ${ex.file} "${ex.text}"`);

// ---- 3 · faq.json ₹ figures must be real prices -------------------------------------------------------------------
const pricing = JSON.parse(readFileSync('src/data/pricing.json', 'utf8'));
const allowed = new Set();
for (const s of pricing.services) {
  const p = s.pricing;
  if (p.type === 'by_size') [p.small, p.medium, p.large].forEach((v) => allowed.add(v));
  if (p.type === 'flat' || p.type === 'flat_plus') { allowed.add(p.price); if (p.addonPrice) allowed.add(p.addonPrice); }
  if (p.type === 'plans') p.plans.forEach((x) => allowed.add(x.price));
}
// Defined offer amounts (src/data/offers.ts) — FIRSTGROOM's ₹200 `off:` and REFERRAL's ₹150 `youGet:` / `friendGets:`.
const offersSrc = readFileSync('src/data/offers.ts', 'utf8');
const offerAmount = (key, name) => {
  const hits = [...offersSrc.matchAll(new RegExp(`\\b${key}:\\s*(\\d+)`, 'g'))].map((m) => Number(m[1]));
  if (!hits.length) { failed = true; console.log(`check:prices — could not read the ${name} amount (\`${key}:\`) from src/data/offers.ts`); }
  return hits;
};
[...offerAmount('off', 'FIRSTGROOM'), ...offerAmount('youGet', 'REFERRAL'), ...offerAmount('friendGets', 'REFERRAL')]
  .forEach((v) => allowed.add(v));

for (const e of JSON.parse(readFileSync('src/data/faq.json', 'utf8'))) {
  for (const [field, text] of [['q', e.q], ['a', e.a]]) {
    for (const m of String(text ?? '').matchAll(/₹\s?([\d,]+)/g)) {
      const v = Number(m[1].replace(/,/g, ''));
      if (!allowed.has(v)) { failed = true; console.log(`FAQ ${e.id} (${field}): ₹${m[1]} is not a price in pricing.json`); }
    }
  }
}
console.log(failed
  ? 'check:prices — FAILED'
  : 'check:prices — OK (no ₹ literals in components or .ts copy; FAQ prices match pricing.json)');
process.exit(failed ? 1 : 0);
