// Launch gate (00-MASTER-PLAN §8): every [FILL:*] token must be replaced before go-live.
// Scans the built site (dist/) if present, else src/. Exit 1 while any token remains.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = existsSync('dist') ? 'dist' : 'src';
const counts = new Map();
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|xml|txt|js|css|json|ts|tsx|astro|mjs)$/.test(name)) {
      for (const m of readFileSync(p, 'utf8').matchAll(/\[FILL:([A-Z0-9_{}]+)\]/g)) counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
    }
  }
};
walk(root);
if (!counts.size) { console.log(`check:fill — ${root}/ is clean. Ready for launch on this gate.`); process.exit(0); }
console.log(`check:fill — ${counts.size} placeholder token(s) still in ${root}/ (fill them in src/data/site.ts, src/lib/leads.ts, astro.config.mjs):`);
for (const [k, n] of [...counts].sort()) console.log(`  [FILL:${k}]  ×${n}`);
process.exit(1);
