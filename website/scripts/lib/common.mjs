// Shared plumbing for the build gates: paths, CLI flags, the FAIL/WARN reporter, page path ↔ dist file mapping,
// the site origin and the route registry. Gates resolve every path from this file's location, so they run from any cwd.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WEBSITE = fileURLToPath(new URL('../../', import.meta.url)).replace(/[\\/]$/, '');
export const REPO = join(WEBSITE, '..');
export const PLAN = join(REPO, 'website-plan');

/** Pages that must be `noindex, follow` (04 §3.3 + decision E7) — and the only ones allowed to be noindex (P128). */
export const NOINDEX_PAGES = new Set(['/thank-you/', '/404.html']);

/** Money pages for the P150 fold law: /ludhiana/<service>/ (one segment; areas and the hub are not money pages). */
export const isMoneyPage = (path) => /^\/ludhiana\/[a-z0-9-]+\/$/.test(path) && !path.startsWith('/ludhiana/areas/');

// ---- CLI ---------------------------------------------------------------------------------------------------------

/** `--pages /a/,/b/` (or `--pages=/a/`), `--all`, `--dist <dir>`, `--port <n>`, any other `--flag`. */
export function parseArgs(argv) {
  const out = { pages: [], all: false, flags: new Set(), values: {} };
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    let v;
    const eq = a.indexOf('=');
    if (a.startsWith('--') && eq > -1) { v = a.slice(eq + 1); a = a.slice(0, eq); }
    // A value-taking flag never swallows the next --flag (so `check:legal --dist` works as a bare switch).
    const take = () => (v !== undefined ? v : argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[++i] : undefined);
    if (a === '--pages' || a === '--page') out.pages.push(...String(take() ?? '').split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--all') out.all = true;
    else if (a === '--dist' || a === '--port' || a === '--shots') out.values[a.slice(2)] = take();
    else if (a.startsWith('--')) out.flags.add(a.slice(2));
    else out.pages.push(...a.split(',').map((s) => s.trim()).filter(Boolean));
  }
  out.pages = [...new Set(out.pages.map(normPagePath))];
  return out;
}

/** '/book' → '/book/', 'book' → '/book/', '/404' or '/404/' → '/404.html', '/index.html' → '/'. */
export function normPagePath(p) {
  let s = String(p).trim();
  if (!s.startsWith('/')) s = `/${s}`;
  if (s === '/404' || s === '/404/') return '/404.html';
  if (s.endsWith('/index.html')) return s.slice(0, -'index.html'.length);
  if (!s.endsWith('/') && !/\.[a-z0-9]+$/i.test(s.split('/').pop())) s += '/';
  return s;
}

// ---- reporter ------------------------------------------------------------------------------------------------------

export class Reporter {
  constructor(name) { this.name = name; this.fails = []; this.warns = []; this.seen = new Set(); }
  #line(level, path, code, msg) {
    const line = `${level} ${path || '-'} ${code || '-'} ${msg}`;
    if (this.seen.has(line)) return; // the same finding twice (e.g. one link repeated) prints once
    this.seen.add(line);
    (level === 'FAIL' ? this.fails : this.warns).push(line);
    console.log(line);
  }
  fail(path, code, msg) { this.#line('FAIL', path, code, msg); }
  warn(path, code, msg) { this.#line('WARN', path, code, msg); }
  info(msg) { console.log(`${this.name} — ${msg}`); }
  /** Prints the summary and returns the process exit code (1 on any FAIL). */
  finish(extra = '') {
    const verdict = this.fails.length ? 'FAILED' : 'passed';
    console.log(`\n${this.name} ${verdict}: ${this.fails.length} FAIL, ${this.warns.length} WARN${extra ? ` · ${extra}` : ''}`);
    return this.fails.length ? 1 : 0;
  }
}

// ---- dist pages --------------------------------------------------------------------------------------------------

export function distDir(args) {
  const d = args?.values?.dist;
  return d ? (d.startsWith('/') ? d : join(process.cwd(), d)) : join(WEBSITE, 'dist');
}

/** Page path → its HTML file in dist. */
export function pageFile(dist, path) {
  if (path.endsWith('/')) return join(dist, ...path.split('/').filter(Boolean), 'index.html');
  return join(dist, ...path.split('/').filter(Boolean));
}

/** HTML file → page path ('book/index.html' → '/book/', '404.html' → '/404.html'). */
export function filePath(dist, file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

export function listFiles(dir, test = () => true, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) listFiles(p, test, out);
    else if (test(p)) out.push(p);
  }
  return out;
}

/** Every built page path, sorted ('/' first). */
export function listPages(dist) {
  return listFiles(dist, (p) => p.endsWith('.html')).map((f) => filePath(dist, f)).sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}

export const read = (file) => readFileSync(file, 'utf8');

/**
 * The site origin the build used (`site` in astro.config.mjs): read back from the built robots.txt / sitemap, else
 * SITE_URL, else the config's default — so canonical/og:url/sitemap checks compare against what the build emitted.
 */
export function siteOrigin(dist) {
  const tryUrl = (s) => { try { return new URL(s).origin; } catch { return null; } };
  const robots = join(dist, 'robots.txt');
  if (existsSync(robots)) {
    const m = /^Sitemap:\s*(\S+)/im.exec(read(robots));
    if (m && tryUrl(m[1])) return tryUrl(m[1]);
  }
  const idx = join(dist, 'sitemap-index.xml');
  if (existsSync(idx)) {
    const m = /<loc>\s*([^<\s]+)\s*<\/loc>/.exec(read(idx));
    if (m && tryUrl(m[1])) return tryUrl(m[1]);
  }
  if (process.env.SITE_URL && tryUrl(process.env.SITE_URL)) return tryUrl(process.env.SITE_URL);
  const cfg = join(WEBSITE, 'astro.config.mjs');
  if (existsSync(cfg)) {
    const m = /SITE_URL\s*\|\|\s*['"]([^'"]+)['"]/.exec(read(cfg));
    if (m && tryUrl(m[1])) return tryUrl(m[1]);
  }
  return null;
}

// ---- routes (src/data/routes.ts via load-ts) ----------------------------------------------------------------------

/**
 * The route registry as the build saw it. Uses the module's own isLive() when it exports one (so env-driven
 * overrides such as PUBLIC_PDS_PREVIEW_LIVE=wave1 apply), else `status === 'live'`.
 * @returns {Promise<{ ok: boolean, why: string, routes: object[], byPath: Map, isLive: (p: string) => boolean }>}
 */
export async function loadRoutes(loadTs) {
  const { mod, why } = await loadTs('src/data/routes.ts');
  if (!mod || !Array.isArray(mod.routes)) {
    return { ok: false, why: why || 'src/data/routes.ts exports no `routes` array', routes: [], byPath: new Map(), isLive: () => true };
  }
  const byPath = new Map(mod.routes.map((r) => [r.path, r]));
  const isLive = typeof mod.isLive === 'function' ? (p) => !!mod.isLive(p) : (p) => byPath.get(p)?.status === 'live';
  return { ok: true, why: '', routes: mod.routes, byPath, isLive };
}

export const envNote = () => `PUBLIC_PDS_PREVIEW_LIVE=${process.env.PUBLIC_PDS_PREVIEW_LIVE ?? 'unset'}`;

/** Route slug as used by 09 §2d sources: last path segment, '/' → 'home'. */
export const routeSlug = (path) => (path === '/' ? 'home' : path.split('/').filter(Boolean).pop());

/** Indian-grouped rupee figure, as the site prints it (07 §4: toLocaleString('en-IN')). */
export const inrDigits = (n) => Number(n).toLocaleString('en-IN');
