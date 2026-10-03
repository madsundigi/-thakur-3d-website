// Stand-in module for Vite/Astro-only imports (astro:*, *.astro, ?raw / ?url / ?inline) when scripts/lib/load-ts.mjs
// bundles a plain data module for the gates: any property is this proxy again, calls return undefined, default is ''.
module.exports = new Proxy(function stub() {}, {
  get: (target, key) => (key === '__esModule' ? false : key === 'default' ? '' : target),
  apply: () => undefined,
});
