// JSON-LD builders — patterns from website-plan/04-TECHNICAL-SEO.md §2. No Review/AggregateRating, ever (§2.0.4).

export interface Crumb { label: string; path: string }

export function breadcrumbLd(items: Crumb[], site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: new URL(it.path, site).href,
    })),
  };
}
