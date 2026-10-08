// Blog content collection (Astro 7 content layer). One entry per Markdown post in src/content/blog/<slug>.md.
// The front-matter contract is website-plan/blueprints/_TEMPLATE-blog-post.md §1, mirrored in src/content/blog/README.md
// (read that file before authoring a post). Schema per 04-TECHNICAL-SEO.md §2.7 (BlogPosting) and §3 (head lengths).
//
// The foundation ships with ZERO posts: getCollection('blog') returns [] and /blog/ renders its empty state. The post
// author drops <slug>.md files here; a file that breaks this schema fails `astro build` instead of shipping.
// README.md is documentation, not a post, so the glob excludes it.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** The six /blog/ index categories (_TEMPLATE-blog-post.md §6) — the BlogCard chip label (08-DESIGN-SYSTEM §4.15). */
export const BLOG_CATEGORIES = [
  'Grooming',
  'Health & vaccination',
  'Ticks & seasons',
  'Walking',
  'Cats',
  'Puppies',
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/blog' }),
  schema: z.object({
    // Head (04 §3 lengths; _TEMPLATE-blog-post.md §1/§7).
    title: z.string().min(1).max(110), // = H1; BlogPosting headline (04 §2.7 caps it at 110)
    seoTitle: z.string().min(1).max(60), // <title>, ≤ 60 chars (drop " | PetDoorStep" if over)
    description: z.string().min(120).max(158), // meta description, answer-first (check:pages P019 holds it to 120–158)
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase-hyphenated, year-free (00 §5)'),
    // Dates (04 §2.7). `date` = first publish; `updated` bumps on a substantive refresh (10 §4).
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Targeting + routing (10-CONTENT-CALENDAR §2.2 row; 01-SITEMAP §2.4).
    keywords: z.array(z.string().min(1)).min(1),
    funnel: z.enum(['TOFU', 'MOFU', 'BOFU']),
    format: z.enum(['guide', 'listicle', 'price-guide', 'checklist', 'seasonal']),
    category: z.enum(BLOG_CATEGORIES), // BlogCard chip + /blog/ index filter
    moneyPage: z.string().startsWith('/'), // mandatory BOFU link (first half of the body, BP-5)
    secondaryPage: z.string().startsWith('/').optional(), // one optional body link
    season: z.string().default('Evergreen'),
    // E-E-A-T. `reviewer` ONLY when a real vet reviewed the post (BP-8) — otherwise omit it entirely.
    reviewer: z
      .object({
        name: z.string().min(1),
        credential: z.string().min(1),
        registration: z.string().min(1),
      })
      .optional(),
    // Hero photo — the 08 §5.2 planned filename in src/assets/photos/ (same system every page uses; a missing file
    // renders the dev placeholder until the shoot). The 1200×630 og:image is derived as /og/blog/<slug>.jpg (04 §2.7),
    // added to public/og/blog/ by the post author; the build fails if that crop is missing.
    heroImage: z.string().min(1),
    heroAlt: z.string().min(1).max(125), // 08 §5.4 alt (no "image of"; ≤ 125 chars)
    // BP-10 related posts — up to 2 slugs; each renders a BlogCard only while that post is live (routes.ts).
    related: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(2).default([]),
  }),
});

export const collections = { blog };
