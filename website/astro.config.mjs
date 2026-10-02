// Astro config — spec: website-plan/04-TECHNICAL-SEO.md §1.2
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// [FILL:DOMAIN] — planned domain until Sunny buys and confirms it (00-MASTER-PLAN §2 D5).
// Override per environment with SITE_URL; the launch gate (npm run check:fill) flags this line.
const SITE = process.env.SITE_URL || 'https://petdoorstep.in';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always', // 00 §5: every URL ends in /
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/'),
    }),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
