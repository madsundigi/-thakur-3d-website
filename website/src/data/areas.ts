// Per-area page data — the genuinely-local layer for every /ludhiana/areas/<slug>/ page, from
// website-plan/blueprints/_TEMPLATE-area-page.md §4 (the per-area table) and §6.7 adjacency map. The brand-level copy
// (hero one-liner, meta local line) lives in src/data/content.ts AREA_LINES; this file adds what the area template
// needs beyond it, with ONE rule: never invent a local fact. `anchorLine`/`housing` are safe truths drawn from the §4
// research column; the exact street landmarks and pin codes a page needs are [FILL:LANDMARKS_<SLUG>] /
// [FILL:PINCODES_<SLUG>] tokens (00 §8), filled from Sunny's local knowledge + India Post before the page goes live.
//
// `adjacent` = the fixed AP-9 adjacency trio (05 §6.7). `alsoServing` = the future localities a page also targets
// (plain text, no links). `road` localities take "on" in the SERP title (03 §3); the H1 stays "in" to match the
// Service-node name (04 §2.0.3).
import { AREA_SLUGS, AREA_LINES } from './content';

export interface AreaPageData {
  slug: string;
  /** Safe, true locality fact for the AP-2 intro (from the §4 "known anchors (verified in research)" column). */
  anchorLine: string;
  /** A true line about the housing mix / who books here (AP-2 ingredient 1). */
  housing: string;
  /** The three adjacency-map slugs linked in AP-9 (05 §6.7 / template §4). */
  adjacent: readonly string[];
  /** Future localities this page also targets (template §4 "Also serving") — plain text, no links. */
  alsoServing: readonly string[];
  /** Road locality → "on {Area}" in the title (03 §3). Default false ("in {Area}"). */
  road?: boolean;
}

export const AREAS: Readonly<Record<string, AreaPageData>> = {
  'sarabha-nagar': {
    anchorLine: "Ludhiana's highest pet-spend neighbourhood, around the B-Block and Kipps market side",
    housing: 'big double-coated dogs in kothis with a shaded verandah and a garden tap a few steps away',
    adjacent: ['brs-nagar', 'kitchlu-nagar', 'pakhowal-road'],
    alsoServing: [],
  },
  'brs-nagar': {
    anchorLine: 'one of the city’s largest residential pockets, with kothis and societies across every block',
    housing: 'a mix of independent kothis and gated apartment societies',
    adjacent: ['sarabha-nagar', 'ferozepur-road', 'south-city'],
    alsoServing: [],
  },
  'model-town': {
    anchorLine: "Ludhiana's pet-parent hub — the densest cluster of pet families in the city",
    housing: 'busy homes that want a salon-quality groom without the salon queue',
    adjacent: ['civil-lines', 'dugri', 'kitchlu-nagar'],
    alsoServing: [],
  },
  'civil-lines': {
    anchorLine: 'a calm, established part of town beside Tagore Nagar',
    housing: 'professional households that book flexible, unhurried slots',
    adjacent: ['model-town', 'kitchlu-nagar', 'haibowal-kalan'],
    alsoServing: ['Shastri Nagar', 'Moti Nagar', 'Tagore Nagar'],
  },
  dugri: {
    anchorLine: 'a large residential catchment spanning Phases 1, 2 and 3',
    housing: 'family homes across all three phases',
    adjacent: ['model-town', 'south-city', 'pakhowal-road'],
    alsoServing: ['Urban Estate Phase 2'],
  },
  'pakhowal-road': {
    anchorLine: 'an affluent corridor of homes and condos along the whole Pakhowal Road stretch',
    housing: 'kothis and apartments all along the corridor',
    adjacent: ['sarabha-nagar', 'south-city', 'dugri'],
    alsoServing: [],
    road: true,
  },
  'south-city': {
    anchorLine: 'a gated-society catchment just off Pakhowal Road',
    housing: 'gated societies where our team arrives gate-pass ready',
    adjacent: ['dugri', 'pakhowal-road', 'brs-nagar'],
    alsoServing: ['Basant Avenue'],
  },
  'ferozepur-road': {
    anchorLine: 'a long arterial corridor of condos and kothis, with Gurdev Nagar adjoining',
    housing: 'condos and independent homes along Ferozepur Road',
    adjacent: ['brs-nagar', 'sarabha-nagar', 'south-city'],
    alsoServing: ['Gurdev Nagar'],
    road: true,
  },
  'haibowal-kalan': {
    anchorLine: 'a growing residential area on the Jassian Road side and beyond',
    housing: 'independent homes on the Jassian Road side',
    adjacent: ['civil-lines', 'kitchlu-nagar', 'ferozepur-road'],
    alsoServing: ['Salem Tabri'],
  },
  'kitchlu-nagar': {
    anchorLine: 'the leafy pocket next to PAU Gate, with many PAU-campus households',
    housing: 'homes near PAU Gate and the campus',
    adjacent: ['sarabha-nagar', 'civil-lines', 'model-town'],
    alsoServing: [],
  },
};

/** SLUG token suffix for a [FILL:*] name: 'sarabha-nagar' → 'SARABHA_NAGAR' (00 §8; check:fill matches [A-Z0-9_]). */
export const slugToken = (slug: string): string => slug.toUpperCase().replace(/-/g, '_');

/** The AreaPageData for a slug, or a build error (keeps the data + routes in lock-step). */
export function requireArea(slug: string): AreaPageData {
  const a = AREAS[slug];
  if (!a) throw new Error(`areas.ts: no data for area "${slug}"`);
  return a;
}

// Build-time validation: one AREAS entry per AREA_SLUGS, 3 real adjacency slugs each, no self-reference.
(function validate() {
  const problems: string[] = [];
  const known = new Set(AREA_SLUGS);
  for (const slug of AREA_SLUGS) {
    const a = AREAS[slug];
    if (!a) { problems.push(`${slug}: no AREAS entry`); continue; }
    if (!AREA_LINES[slug]) problems.push(`${slug}: no AREA_LINES entry (src/data/content.ts)`);
    if (a.adjacent.length !== 3) problems.push(`${slug}: AP-9 needs exactly 3 adjacency slugs`);
    for (const adj of a.adjacent) {
      if (!known.has(adj)) problems.push(`${slug}: adjacency slug "${adj}" is not an area`);
      if (adj === slug) problems.push(`${slug}: lists itself as adjacent`);
    }
  }
  for (const slug of Object.keys(AREAS)) if (!known.has(slug)) problems.push(`AREAS has "${slug}", not in AREA_SLUGS`);
  if (problems.length) throw new Error(`src/data/areas.ts is invalid:\n  ${problems.join('\n  ')}`);
})();
