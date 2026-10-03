// Astro config — spec: website-plan/04-TECHNICAL-SEO.md §1.2, sitemap per §7.1 + decision E7.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { isLive, routes } from './src/data/routes.ts';
import { LASTMOD } from './src/data/lastmod.ts';
import * as pricing from './src/lib/pricing.ts';
import { site } from './src/data/site.ts';
import { staleOgImages } from './scripts/make-assets.mjs';

// [FILL:DOMAIN] — planned domain until Sunny buys and confirms it (00-MASTER-PLAN §2 D5).
// Override per environment with SITE_URL; the launch gate (npm run check:fill) flags this line.
const SITE = process.env.SITE_URL || 'https://petdoorstep.in';

// The sitemap lists live routes only (src/data/routes.ts status 'live'; never /thank-you/), each with its real
// last-edit date from src/data/lastmod.ts (04 §7.1). A live route without a valid date stops every build and dev
// start right here: a missing or invented <lastmod> never ships. (@astrojs/sitemap swallows errors thrown inside
// serialize(), so the check cannot live there.)
const DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const undated = routes.filter((r) => r.status === 'live' && !DATE.test(LASTMOD[r.path] ?? ''));
if (undated.length) {
  throw new Error(
    `src/data/lastmod.ts: live route(s) without a 'YYYY-MM-DD' last-edit date: ${undated.map((r) => r.path).join(', ')}`,
  );
}
const pathOf = (url) => new URL(url).pathname;

// The 04 §4 share images print prices. If pricing.json (or their wording) changed since they were rendered, a
// WhatsApp preview would show a wrong price: `astro build` stops; dev and preview only warn.
const staleOg = staleOgImages(pricing, site);
if (staleOg.length) {
  const msg = `public/og/: ${staleOg.join(', ')} out of date with src/data/pricing.json — run: node scripts/make-assets.mjs`;
  if (process.argv.includes('build')) throw new Error(msg);
  console.warn(`[og] ${msg}`);
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always', // 00 §5: every URL ends in /
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => pathOf(page) !== '/thank-you/' && isLive(pathOf(page)),
      serialize(item) {
        item.lastmod = LASTMOD[pathOf(item.url)];
        return item;
      },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    // `astro preview` must fail when its port is taken, never drift to another port (parallel runs, e2e).
    preview: { strictPort: true },
  },
});
