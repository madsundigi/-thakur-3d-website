// Launch gate (00-MASTER-PLAN §8): every [FILL:*] token must be replaced before go-live.
// Also gate 08-DESIGN-SYSTEM §0/§5.1 rule 5: no grey `placeholder-*` dev image may ship.
// Scans the built site (dist/) if present, else src/. Exit 1 while any token or placeholder image remains.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = existsSync('dist') ? 'dist' : 'src';
const counts = new Map();
// Placeholder image paths (`placeholder-hero.svg`, hashed `/_astro/placeholder-hero.Bx12.svg`, `_image?href=…`).
const IMG = /[^\s"'()<>,=]*placeholder-[^\s"'()<>,]*?\.(?:svg|png|jpe?g|webp|avif|gif)\b/gi;
const imgRefs = new Map(); // file → Set(paths)
const imgFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (/^placeholder-/.test(name)) imgFiles.push(p);
    const text = /\.(html|xml|txt|js|css|json|ts|tsx|astro|mjs|md|mdx)$/.test(name) ? readFileSync(p, 'utf8') : null;
    if (text === null) continue;
    for (const m of text.matchAll(/\[FILL:([A-Z0-9_{}]+)\]/g)) counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
    // dist: the built HTML/CSS that browsers load · src: anything that would end up there.
    if (root === 'dist' ? /\.(html|css)$/.test(name) : /\.(astro|ts|tsx|json|css|md|mdx)$/.test(name)) {
      for (const m of text.matchAll(IMG)) {
        if (!imgRefs.has(p)) imgRefs.set(p, new Set());
        imgRefs.get(p).add(m[0]);
      }
    }
  }
};
walk(root);

let failed = false;
if (counts.size) {
  failed = true;
  console.log(`check:fill — ${counts.size} placeholder token(s) still in ${root}/ (fill them in src/data/site.ts, src/lib/leads.ts, astro.config.mjs):`);
  for (const [k, n] of [...counts].sort()) console.log(`  [FILL:${k}]  ×${n}`);
}
if (imgRefs.size || imgFiles.length) {
  failed = true;
  const refs = [...imgRefs.values()].reduce((n, s) => n + s.size, 0);
  console.log(`check:fill — placeholder images still in ${root}/ (08-DESIGN-SYSTEM §5.1 rule 5: replace with real photos from the launch shoot):`);
  for (const [file, paths] of [...imgRefs].sort()) for (const path of [...paths].sort()) console.log(`  ${file}  →  ${path}`);
  for (const file of imgFiles.sort()) console.log(`  file: ${file}`);
  console.log(`  (${refs} reference(s), ${imgFiles.length} file(s))`);
}
if (!failed) { console.log(`check:fill — ${root}/ is clean: no [FILL:*] tokens, no placeholder images. Ready for launch on this gate.`); process.exit(0); }
process.exit(1);
