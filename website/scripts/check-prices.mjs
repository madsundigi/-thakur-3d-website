// Price gates (07-BOOKING-SPEC §4): (1) no ₹ literal in .astro/.tsx components — prices come from pricing.json;
// (2) every ₹ figure inside faq.json answers matches a price in pricing.json (or a defined offer).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

let failed = false;
const walk = (dir, out = []) => {
  for (const n of readdirSync(dir)) { const p = join(dir, n); statSync(p).isDirectory() ? walk(p, out) : out.push(p); }
  return out;
};
for (const f of walk('src').filter((f) => /\.(astro|tsx)$/.test(f))) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (/₹\s?\d/.test(line)) { failed = true; console.log(`₹ literal in component: ${f}:${i + 1}: ${line.trim()}`); }
  });
}
const pricing = JSON.parse(readFileSync('src/data/pricing.json', 'utf8'));
const allowed = new Set();
for (const s of pricing.services) {
  const p = s.pricing;
  if (p.type === 'by_size') [p.small, p.medium, p.large].forEach((v) => allowed.add(v));
  if (p.type === 'flat' || p.type === 'flat_plus') { allowed.add(p.price); if (p.addonPrice) allowed.add(p.addonPrice); }
  if (p.type === 'plans') p.plans.forEach((x) => allowed.add(x.price));
}
allowed.add(200); // FIRSTGROOM (src/data/offers.ts)
for (const e of JSON.parse(readFileSync('src/data/faq.json', 'utf8'))) {
  for (const m of e.a.matchAll(/₹\s?([\d,]+)/g)) {
    const v = Number(m[1].replace(/,/g, ''));
    if (!allowed.has(v)) { failed = true; console.log(`FAQ ${e.id}: ₹${m[1]} is not a price in pricing.json`); }
  }
}
console.log(failed ? 'check:prices — FAILED' : 'check:prices — OK (no ₹ literals in components; FAQ prices match pricing.json)');
process.exit(failed ? 1 : 0);
