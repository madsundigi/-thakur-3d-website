// Load a TypeScript module from website/ in plain Node: bundle it (and its relative imports, JSON included) with the
// project's own esbuild (website/node_modules) into one ESM string and import that from a data: URL. Nothing is
// written to disk.
//
// `import.meta.env` is defined the way Astro's build sees it: PUBLIC_* variables from website/.env* files, overridden
// by process.env, plus MODE/PROD/DEV/SSR/BASE_URL. So a module that reads e.g. import.meta.env.PUBLIC_PDS_PREVIEW_LIVE
// behaves as it did in the build — run a gate with the same environment as `npm run build`.
//
// Never throws: a missing file or a module that fails to bundle (e.g. another builder's file mid-change) resolves to
// { mod: null, missing, why } so the caller can downgrade to a WARN.
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { isAbsolute, join, relative } from 'node:path';
import { WEBSITE } from './common.mjs';

const require = createRequire(join(WEBSITE, 'package.json'));
let esbuild = null;
const cache = new Map();

function parseDotEnv(file) {
  const out = {};
  if (!existsSync(file)) return out;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m) continue;
    let v = m[2];
    if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
    else v = v.replace(/\s+#.*$/, '');
    out[m[1]] = v;
  }
  return out;
}

/** The import.meta.env object an Astro production build would expose to a server-side module. */
export function importMetaEnv() {
  const files = ['.env', '.env.local', '.env.production', '.env.production.local'];
  const fromFiles = Object.assign({}, ...files.map((f) => parseDotEnv(join(WEBSITE, f))));
  const merged = { ...fromFiles, ...process.env };
  const pub = Object.fromEntries(Object.entries(merged).filter(([k, v]) => k.startsWith('PUBLIC_') && typeof v === 'string'));
  return { ...pub, MODE: 'production', PROD: true, DEV: false, SSR: true, BASE_URL: '/' };
}

// Vite/Astro-only specifiers never appear in the plain data modules the gates load; stub them instead of failing.
const stubPlugin = {
  name: 'pds-stub',
  setup(build) {
    build.onResolve({ filter: /^astro:|\.astro$|\?(raw|url|inline)$/ }, (args) => ({ path: args.path, namespace: 'pds-stub' }));
    build.onLoad({ filter: /.*/, namespace: 'pds-stub' }, () => ({
      contents: 'module.exports = new Proxy(function () {}, { get: (t, k) => (k === "__esModule" ? false : k === "default" ? "" : t), apply: () => undefined });',
      loader: 'js',
    }));
  },
};

/**
 * @param {string} rel path relative to website/ (e.g. 'src/data/routes.ts') or absolute
 * @returns {Promise<{ mod: object | null, missing: boolean, why: string }>}
 */
export function loadTs(rel) {
  const abs = isAbsolute(rel) ? rel : join(WEBSITE, rel);
  const name = relative(WEBSITE, abs);
  if (!cache.has(abs)) {
    cache.set(abs, (async () => {
      if (!existsSync(abs)) return { mod: null, missing: true, why: `${name} does not exist` };
      try {
        esbuild ??= require('esbuild');
        const out = await esbuild.build({
          entryPoints: [abs],
          bundle: true,
          write: false,
          format: 'esm',
          platform: 'node',
          target: 'node20',
          logLevel: 'silent',
          define: { 'import.meta.env': JSON.stringify(importMetaEnv()) },
          plugins: [stubPlugin],
        });
        const code = out.outputFiles[0].text;
        const mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
        return { mod, missing: false, why: '' };
      } catch (e) {
        const msg = String(e?.errors?.[0]?.text ?? e?.message ?? e).split('\n')[0];
        return { mod: null, missing: false, why: `${name} could not be loaded: ${msg}` };
      }
    })());
  }
  return cache.get(abs);
}
