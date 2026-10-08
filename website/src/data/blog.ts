// Blog post index helper — the ONE way pages read the `blog` content collection (src/content.config.ts).
// getBlogPosts() returns every post newest-first with a computed read-time and the display date (updated ?? published,
// 04-TECHNICAL-SEO §2.7), so /blog/ (listing) and the related-posts row render from one shape. With zero posts it
// returns [] and the index shows its empty state.
import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogListItem {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  /** ISO 'YYYY-MM-DD' — the date the card shows: updated when set, else published. */
  date: string;
  /** ISO publish date. */
  published: string;
  /** ISO updated date (only when the front-matter set `updated`). */
  updated?: string;
  /** Whole-minute read estimate from the body word count (÷ 200). */
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  entry: CollectionEntry<'blog'>;
}

const iso = (d: Date): string => d.toISOString().slice(0, 10);
const words = (body: string): number => (body?.trim() ? body.trim().split(/\s+/).length : 0);
export const readMinutes = (body: string): number => Math.max(1, Math.round(words(body) / 200));

/** Every post, newest-first by display date. */
export async function getBlogPosts(): Promise<BlogListItem[]> {
  const entries = await getCollection('blog');
  return entries
    .map((e): BlogListItem => {
      const d = e.data;
      const published = iso(d.date);
      const updated = d.updated ? iso(d.updated) : undefined;
      return {
        slug: d.slug,
        title: d.title,
        seoTitle: d.seoTitle,
        description: d.description,
        category: d.category,
        published,
        updated,
        date: updated ?? published,
        readMinutes: readMinutes(e.body ?? ''),
        heroImage: d.heroImage,
        heroAlt: d.heroAlt,
        entry: e,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** The posts whose slugs are in `slugs`, in that order — for the BP-10 related row (the page filters to live ones). */
export async function relatedPosts(slugs: readonly string[]): Promise<BlogListItem[]> {
  if (!slugs.length) return [];
  const bySlug = new Map((await getBlogPosts()).map((p) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is BlogListItem => !!p);
}
