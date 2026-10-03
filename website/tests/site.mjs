// test:site — real-browser gate over the built site: astro preview + Playwright Chromium + axe-core.
//
//   npm run build && npm run test:site -- --pages /a/,/b/ [--port N]      no --pages = every page in dist; port 4411
//
// Spawns `astro preview` itself and always kills it. Needs a global Playwright (`npm i -g playwright`); CHROMIUM_PATH
// overrides the browser. Screenshots (full page per viewport + the 360×640 fold) → $SHOTS (default test-results/site/).
//
// Every page at 360×640, 768×1024 and 1280×800, after document.fonts.ready:
//   P113 no horizontal overflow · zero console errors / uncaught errors · no same-origin 4xx · axe-core serious +
//   critical violations = 0 · every ld+json parses · P101 CLS ≤ 0.1 (layout-shift entries, load + 1 s) · P099 the LCP
//   element sits inside [data-hero-photo] when the page has one.
// At 360×640 only:
//   P150 fold law (decision E3, markers per contract C3): [data-hero-h1], [data-hero-subhead], [data-hero-primary] and
//   ≥ 1 [data-hero-chip] fully visible above the top of [data-sticky-bar]; money pages (/ludhiana/<service>/) also show
//   the top ≥ 160 px of [data-hero-photo] above it, plus [data-hero-notice] when present.
//   P161 click tracking: every wa.me / tel: / Instagram anchor (synthetic click, navigation prevented) fires its
//   "[track]" console.debug event (whatsapp_click / call_click / ig_click) with the anchor's data-source.
// At 1280×800 (Playwright clock):
//   P107 exit card (contract C4, decision D1): opens on a top-edge mouseout only after ≥ 20 s, as a non-modal
//   <dialog id="exit-card"> ≤ 15 % of the viewport with a /book/?src=exit_nudge CTA; [data-exit-dismiss] closes it;
//   it stays closed after a reload (sessionStorage pds_exit_shown); it never shows after a booking
//   (localStorage pds_last_booking) or below 1024 px; it is absent on /book/, /thank-you/, legal pages and the 404.
//   Card not built yet → WARN.
// Prints a summary table; exit 1 on any FAIL.
import { execSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { isAbsolute, join } from 'node:path';
import { Reporter, WEBSITE, isMoneyPage, listPages, pageFile, parseArgs } from '../scripts/lib/common.mjs';

const args = parseArgs(process.argv.slice(2));
const PORT = Number(args.values.port) || Number(process.env.SITE_PORT) || 4411;
const BASE = `http://localhost:${PORT}`;
const DIST = join(WEBSITE, 'dist');
const SHOTS = (() => { const s = process.env.SHOTS || 'test-results/site'; return isAbsolute(s) ? s : join(WEBSITE, s); })();
const AXE = join(WEBSITE, 'node_modules', 'axe-core', 'axe.min.js');
const R = new Reporter('test:site');

const VIEWPORTS = [
  { name: '360x640', width: 360, height: 640, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: '768x1024', width: 768, height: 1024, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  { name: '1280x800', width: 1280, height: 800, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];
// 07 §2 row 7 ("any page except /book/, /thank-you/, legal pages") + contract C4 (… and the 404).
const EXIT_ABSENT = new Set(['/book/', '/thank-you/', '/privacy-policy/', '/terms/', '/refund-policy/', '/404.html']);

if (!existsSync(DIST)) { console.log('test:site — dist/ does not exist: run `npm run build` first.'); process.exit(1); }
if (!existsSync(AXE)) { console.log(`test:site — ${AXE} missing (axe-core is a devDependency): run npm install.`); process.exit(1); }
const pages = [];
for (const p of args.pages.length ? args.pages : listPages(DIST)) {
  if (existsSync(pageFile(DIST, p))) pages.push(p);
  else R.fail(p, 'P123', 'not built — nothing to test (run npm run build)');
}
mkdirSync(SHOTS, { recursive: true });

const slugOf = (p) => (p === '/' ? 'home' : p.replace(/\.html$/, '').split('/').filter(Boolean).join('-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = []; // summary table

// In-page observers, installed before any page script: CLS and the LCP entry. Every layout shift counts: the test
// never interacts before measuring, and Chromium's mobile emulation flags load-time shifts as hadRecentInput, so the
// field-data filter (!hadRecentInput) would hide real shifts at 360×640.
const OBSERVERS = `(() => {
  const d = (n) => !n || !n.nodeName ? '?' : n.nodeName.toLowerCase() + (n.id ? '#' + n.id : '') + (typeof n.className === 'string' && n.className.trim() ? '.' + n.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
  window.__pds = { cls: 0, shifts: [], lcp: null };
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__pds.cls += e.value; window.__pds.shifts.push({ v: e.value, nodes: (e.sources || []).map((s) => d(s.node)) }); } }).observe({ type: 'layout-shift', buffered: true }); } catch (e) {}
  try { new PerformanceObserver((l) => { const es = l.getEntries(); if (es.length) window.__pds.lcp = es[es.length - 1]; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
})();`;

// ---- preview server + browser ------------------------------------------------------------------------------------

let server = null;
let browser = null;
const stopServer = () => { if (server && server.exitCode === null) { try { server.kill('SIGTERM'); } catch { /* gone */ } } };
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { stopServer(); process.exit(130); });
process.on('exit', stopServer);

/** The astro CLI entry from its package.json `bin` (Astro 7: bin/astro.mjs; older releases: astro.js). */
function astroCli() {
  const dir = join(WEBSITE, 'node_modules', 'astro');
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin?.astro;
  const cli = [bin && join(dir, bin), join(dir, 'astro.js')].find((f) => f && existsSync(f));
  if (!cli) throw new Error(`cannot find the astro CLI in ${dir}`);
  return cli;
}

async function startServer() {
  // --ignore-lock keeps it a foreground child we can kill: without it, Astro 7 auto-backgrounds `preview` when it
  // detects an agent/CI shell, and the detached server outlives this test.
  server = spawn(process.execPath, [astroCli(), 'preview', '--port', String(PORT), '--ignore-lock'], {
    cwd: WEBSITE, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  });
  await new Promise((resolve, reject) => {
    let out = '';
    const t = setTimeout(() => reject(new Error(`astro preview did not report ${BASE}/ within 30 s:\n${out.slice(-800)}`)), 30_000);
    const onData = (d) => {
      out += String(d).replace(/\x1b\[[0-9;]*m/g, ''); // strip ANSI colours (Vite bolds the port)
      if (out.includes(`http://localhost:${PORT}/`)) { clearTimeout(t); resolve(); }
    };
    server.stdout.on('data', onData);
    server.stderr.on('data', onData);
    server.on('exit', (code) => { clearTimeout(t); reject(new Error(`astro preview exited (${code}) before serving:\n${out.slice(-800)}`)); });
  });
}

async function newContext(vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor, isMobile: vp.isMobile, hasTouch: vp.hasTouch,
  });
  // No real third-party traffic from tests (wa.me, GA, Instagram): stub every other origin.
  await ctx.route((url) => url.origin !== BASE, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>stub</title>' }));
  return ctx;
}

// ---- one page × one viewport -------------------------------------------------------------------------------------

async function runView(path, vp) {
  const tag = `${vp.name}`;
  const row = { page: path, vp: vp.name, overflow: 'ok', console: 'ok', http: 'ok', axe: 'ok', ldjson: 'ok', cls: '', lcp: '—', fold: '—', track: '—' };
  const fail = (key, code, msg) => { row[key] = 'FAIL'; R.fail(path, code, `@${tag} ${msg}`); };
  const warn = (key, code, msg) => { if (row[key] !== 'FAIL') row[key] = 'WARN'; R.warn(path, code, `@${tag} ${msg}`); };
  const ctx = await newContext(vp);
  await ctx.addInitScript(OBSERVERS);
  const page = await ctx.newPage();
  page.setDefaultTimeout(15_000);
  ctx.on('page', (p) => { p.close().catch(() => {}); }); // popups (target=_blank) never stay open
  const errors = [];
  const bad = [];
  const events = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
    if (m.type() === 'debug' && m.text().startsWith('[track]')) {
      events.push(Promise.all([m.args()[1]?.jsonValue(), m.args()[2]?.jsonValue()]).then(([name, params]) => ({ name, params })).catch(() => ({ name: '?', params: {} })));
    }
  });
  page.on('pageerror', (e) => errors.push(`uncaught: ${e.message}`));
  page.on('response', (r) => {
    let u;
    try { u = new URL(r.url()); } catch { return; }
    if (u.origin !== BASE || r.status() < 400) return;
    if (path === '/404.html' && r.request().isNavigationRequest()) return; // the 404 page may be served as a 404
    bad.push(`${r.status()} ${u.pathname}`);
  });
  try {
    await page.goto(BASE + path, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.waitForTimeout(1000); // CLS window: load + 1 s

    // P113 — horizontal overflow
    const ov = await page.evaluate((vw) => {
      const d = (el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.classList.length ? `.${[...el.classList].slice(0, 3).join('.')}` : '');
      const sw = Math.max(document.documentElement.scrollWidth, document.body ? document.body.scrollWidth : 0);
      const found = [];
      if (sw > vw) {
        // fixed-position boxes never scroll the page, and a box clipped by a narrower overflow container is contained
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (!r.width || r.right <= vw + 1) continue;
          let skip = false;
          for (let p = el; p && p !== document.body; p = p.parentElement) {
            const cs = getComputedStyle(p);
            if (cs.position === 'fixed') { skip = true; break; }
            if (p !== el && /(auto|scroll|hidden|clip)/.test(cs.overflowX) && p.getBoundingClientRect().right <= vw + 1) { skip = true; break; }
          }
          if (!skip) found.push({ what: d(el), right: Math.round(r.right) });
        }
      }
      const culprits = found.sort((a, b) => b.right - a.right).slice(0, 4).map((c) => `${c.what} (right ${c.right}px)`);
      return { sw, culprits };
    }, vp.width);
    if (ov.sw > vp.width) fail('overflow', 'P113', `page is ${ov.sw}px wide in a ${vp.width}px viewport — ${ov.culprits.join(', ') || 'culprit not isolated'}`);

    // P101 CLS · P099 LCP inside the hero photo
    const perf = await page.evaluate(() => {
      const d = (n) => !n || !n.tagName ? null : n.tagName.toLowerCase() + (n.id ? `#${n.id}` : '') + (n.classList?.length ? `.${[...n.classList].slice(0, 2).join('.')}` : '');
      const p = window.__pds || { cls: 0, shifts: [] };
      const hero = document.querySelector('[data-hero-photo]');
      const img = hero ? (hero.tagName === 'IMG' ? hero : hero.querySelector('img')) : null;
      const el = p.lcp ? p.lcp.element : null;
      return {
        cls: p.cls, shifts: [...p.shifts].sort((a, b) => b.v - a.v).slice(0, 3),
        hasHero: !!hero, lcp: d(el), inHero: !!(hero && el && (hero === el || hero.contains(el))),
        placeholder: !!img && /\/placeholders\/placeholder-/.test(img.currentSrc || img.src),
      };
    });
    row.cls = perf.cls.toFixed(3);
    if (perf.cls > 0.1) fail('cls', 'P101', `CLS ${perf.cls.toFixed(3)} > 0.1 — largest shifts: ${perf.shifts.map((s) => `${s.v.toFixed(3)} [${s.nodes.join(', ')}]`).join('; ')}`);
    if (perf.hasHero) {
      row.lcp = 'ok';
      const msg = `LCP element is ${perf.lcp ?? 'unknown'}, not inside [data-hero-photo] (04 §5.2.2: the hero photo is the LCP)`;
      // Chrome drops low-entropy images (a flat grey dev placeholder) from LCP, so only a real photo can be judged.
      if (!perf.inHero && perf.placeholder) warn('lcp', 'P099', `${msg} — the hero is still a dev placeholder, which Chrome ignores for LCP; re-check with the real photo`);
      else if (!perf.inHero) fail('lcp', 'P099', msg);
    }

    // ld+json parses
    const ld = await page.$$eval('script[type="application/ld+json"]', (ss) => ss.map((s) => { try { JSON.parse(s.textContent); return null; } catch (e) { return e.message; } }));
    ld.filter(Boolean).forEach((m) => fail('ldjson', 'P087', `ld+json does not parse: ${m}`));

    // P150 fold law (360×640)
    if (vp.width === 360) {
      const money = isMoneyPage(path);
      const fold = await page.evaluate((isMoney) => {
        const hero = document.querySelector('[data-hero]');
        if (!hero) return { hero: false };
        const vw = innerWidth;
        let bar = document.querySelector('[data-sticky-bar]');
        const legacy = !bar;
        if (!bar) bar = document.querySelector('nav[aria-label="Quick actions"]');
        const barBox = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect() : null;
        const limit = barBox && barBox.height > 0 ? barBox.top : innerHeight;
        const box = (el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), h: Math.round(r.height), w: Math.round(r.width) }; };
        const full = (b) => b.w > 0 && b.h > 0 && b.top >= 0 && b.bottom <= limit && b.left >= 0 && b.right <= vw;
        const pick = (s) => (hero.matches(s) ? hero : hero.querySelector(s));
        const items = [];
        for (const [key, sel] of [['H1', '[data-hero-h1]'], ['subhead', '[data-hero-subhead]'], ['primary CTA', '[data-hero-primary]']]) {
          const el = pick(sel);
          items.push({ key, sel, present: !!el, ok: !!el && full(box(el)), box: el ? box(el) : null });
        }
        const chips = [...hero.querySelectorAll('[data-hero-chip]')];
        items.push({ key: 'trust chip', sel: '[data-hero-chip]', present: chips.length > 0, ok: chips.some((c) => full(box(c))), box: chips[0] ? box(chips[0]) : null, optional: !isMoney });
        if (isMoney) {
          const ph = pick('[data-hero-photo]');
          const b = ph ? box(ph) : null;
          items.push({ key: 'photo (top 160 px)', sel: '[data-hero-photo]', present: !!ph, ok: !!b && b.top >= 0 && b.h >= 160 && b.top + 160 <= limit, box: b });
        }
        const notice = document.querySelector('[data-hero-notice]');
        if (notice) items.push({ key: 'notice', sel: '[data-hero-notice]', present: true, ok: full(box(notice)), box: box(notice) });
        return { hero: true, limit: Math.round(limit), barFound: !!bar, legacy: legacy && !!bar, items };
      }, money);
      if (!fold.hero) {
        if (money) warn('fold', 'P150', 'money page without [data-hero] (contract C3) — fold law not verified');
      } else {
        row.fold = 'ok';
        const where = fold.barFound ? `the sticky bar (top ${fold.limit}px)` : `the viewport bottom (${fold.limit}px)`;
        if (fold.legacy) warn('fold', 'P150', 'sticky bar has no [data-sticky-bar] (contract C3) — measured nav[aria-label="Quick actions"] instead');
        for (const it of fold.items) {
          if (!it.present) {
            if (it.optional) warn('fold', 'P150', `no ${it.sel} on this hero — the "≥ 1 trust chip" item is not checked`);
            else fail('fold', 'P150', `${it.key}: no ${it.sel} element (contract C3)`);
          } else if (!it.ok) {
            const b = it.box;
            fail('fold', 'P150', `${it.key} not fully visible above ${where} at 360×640 — box top ${b.top} bottom ${b.bottom} left ${b.left} right ${b.right}${it.key.startsWith('photo') ? ` (needs top + 160 ≤ ${fold.limit})` : ''}`);
          }
        }
      }
      await page.screenshot({ path: join(SHOTS, `${slugOf(path)}-360x640-fold.png`) });
    }

    // axe-core: serious + critical = 0
    await page.addScriptTag({ path: AXE });
    const violations = await page.evaluate(async () => {
      const r = await window.axe.run(document, { resultTypes: ['violations'] });
      return r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => ({ id: v.id, impact: v.impact, help: v.help, count: v.nodes.length, nodes: v.nodes.slice(0, 4).map((n) => n.target.join(' ')) }));
    });
    for (const v of violations) fail('axe', 'AXE', `${v.impact} ${v.id}: ${v.help} — ${v.count} node(s): ${v.nodes.join(' | ')}`);

    // P161 click tracking (360×640): synthetic clicks, default action (navigation / popup) prevented
    if (vp.width === 360) {
      events.length = 0;
      const anchors = await page.evaluate(() => {
        window.addEventListener('click', (e) => { const a = e.target && e.target.closest ? e.target.closest('a') : null; if (a) e.preventDefault(); }, true);
        const list = [];
        for (const a of document.querySelectorAll('a[href]')) {
          const href = a.getAttribute('href') || '';
          const kind = /wa\.me|api\.whatsapp\.com/i.test(href) ? 'whatsapp_click' : /^\s*tel:/i.test(href) ? 'call_click' : /instagram\.com/i.test(href) ? 'ig_click' : null;
          if (!kind) continue;
          list.push({ href: href.slice(0, 48), kind, source: a.getAttribute('data-source'), off: a.hasAttribute('data-track-off'), custom: a.getAttribute('data-track') });
          a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
        return list;
      });
      const expected = anchors.filter((a) => !a.off).map((a) => ({ ...a, name: a.custom || a.kind, want: a.source || 'unlabelled' }));
      for (let t = 0; t < 60 && events.length < expected.length; t++) await sleep(50);
      await sleep(100);
      const got = await Promise.all(events);
      row.track = expected.length ? `ok ${expected.length}` : '—';
      expected.forEach((e, i) => {
        const g = got[i];
        if (!e.source) fail('track', 'P161', `${e.href}… has no data-source — its ${e.name} event is "unlabelled" (09 §3.4.6)`);
        else if (!g || g.name !== e.name || g.params?.source !== e.want) {
          fail('track', 'P161', `${e.href}… (data-source="${e.source}") → expected [track] ${e.name} {source: ${e.want}}, got ${g ? `${g.name} {source: ${g.params?.source}}` : 'nothing'}`);
        }
      });
      if (got.length > expected.length) fail('track', 'P161', `${got.length - expected.length} unexpected [track] event(s): ${got.slice(expected.length).map((g) => g.name).join(', ')}`);
    }

    await page.screenshot({ path: join(SHOTS, `${slugOf(path)}-${vp.name}.png`), fullPage: true });
  } catch (e) {
    fail('console', 'CRASH', `test crashed: ${String(e?.message ?? e).split('\n')[0]}`);
  } finally {
    if (errors.length) fail('console', 'CONSOLE', `${errors.length} console error(s): ${errors.slice(0, 3).map((x) => JSON.stringify(x.slice(0, 160))).join(' · ')}`);
    if (bad.length) fail('http', 'HTTP', `same-origin 4xx: ${[...new Set(bad)].slice(0, 6).join(', ')}`);
    await ctx.close();
    rows.push(row);
  }
}

// ---- exit card (contract C4) -------------------------------------------------------------------------------------

const DESKTOP = VIEWPORTS[2];
const exitState = (page) => page.evaluate(() => {
  const d = document.getElementById('exit-card');
  if (!d) return null;
  const r = d.getBoundingClientRect();
  let modal = false;
  try { modal = d.matches(':modal'); } catch { /* old engine */ }
  let flag = null;
  try { flag = sessionStorage.getItem('pds_exit_shown'); } catch { flag = 'unreadable'; }
  return {
    tag: d.tagName, testid: d.getAttribute('data-testid'), open: d.tagName === 'DIALOG' ? d.open : getComputedStyle(d).display !== 'none',
    modal, area: r.width * r.height, vw: innerWidth, vh: innerHeight, flag, now: Date.now(),
    ctas: [...d.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
  };
});
// C4 trigger: a document mouseout with relatedTarget null and clientY <= 0 (the pointer left through the top edge).
const exitTrigger = (page) => page.evaluate(() => {
  document.documentElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, cancelable: true, view: window, clientX: 640, clientY: 0, relatedTarget: null }));
});

/** Returns the table cell: ok / FAIL / WARN / absent. */
async function exitTest(path, { extras = false } = {}) {
  let cell = 'ok';
  const fail = (msg) => { cell = 'FAIL'; R.fail(path, 'P107', `@1280x800 exit card: ${msg}`); };
  const ctx = await newContext(DESKTOP);
  const page = await ctx.newPage();
  page.setDefaultTimeout(15_000);
  ctx.on('page', (p) => { p.close().catch(() => {}); });
  try {
    if (EXIT_ABSENT.has(path)) {
      await page.goto(BASE + path, { waitUntil: 'load' });
      if (await page.$('#exit-card, [data-testid="exit-card"]')) fail('present — it must be absent on /book/, /thank-you/, legal pages and the 404 (07 §2 row 7, C4)');
      return cell === 'ok' ? 'absent' : cell;
    }
    await page.clock.install();
    await page.goto(BASE + path, { waitUntil: 'load' });
    let s = await exitState(page);
    if (!s) { R.warn(path, 'P107', '@1280x800 #exit-card is not in the DOM yet (contract C4 pending) — exit-nudge test skipped'); return 'WARN'; }
    if (s.tag !== 'DIALOG' || s.testid !== 'exit-card') fail(`#exit-card is <${s.tag.toLowerCase()} data-testid="${s.testid}"> — C4 wants <dialog id="exit-card" data-testid="exit-card">`);
    if (s.open) fail('open on page load');
    await page.clock.runFor(5_000);
    await exitTrigger(page);
    await page.clock.runFor(100);
    s = await exitState(page);
    if (s.open) fail('opened after 5 s on the page — it must wait ≥ 20 s (07 §2 row 7)');
    await page.clock.fastForward(16_000); // 21.1 s on the page
    await exitTrigger(page);
    await page.clock.runFor(100);
    s = await exitState(page);
    if (!s.open) { fail('did not open on a top-edge mouseout after 21 s (C4 trigger: document mouseout, relatedTarget null, clientY ≤ 0)'); return cell; }
    if (s.modal) fail('opened as a modal (showModal) — D1 wants a non-modal .show() corner card');
    const pct = (100 * s.area) / (s.vw * s.vh);
    if (pct > 15) fail(`covers ${pct.toFixed(1)} % of the viewport — ≤ 15 % (P107, D1)`);
    if (!s.ctas.some((h) => /^\/book\/\?(?:[^#]*&)?src=exit_nudge(?:&|#|$)/.test(h))) fail(`no CTA to /book/?src=exit_nudge (links: ${s.ctas.join(', ') || 'none'})`);
    if (s.flag !== '1') fail(`sessionStorage pds_exit_shown is ${JSON.stringify(s.flag)} after showing — C4 sets '1'`);
    await page.screenshot({ path: join(SHOTS, `${slugOf(path)}-1280x800-exit-card.png`) });
    const dismiss = await page.$('#exit-card [data-exit-dismiss]');
    if (!dismiss) fail('no [data-exit-dismiss] button');
    else {
      await dismiss.click();
      await page.clock.runFor(100);
      if ((await exitState(page)).open) fail('still open after clicking [data-exit-dismiss]');
    }
    await page.reload({ waitUntil: 'load' });
    const t0 = (await exitState(page))?.now ?? 0;
    await page.clock.fastForward(21_000);
    await exitTrigger(page);
    await page.clock.runFor(100);
    s = await exitState(page);
    if (s && s.now - t0 < 20_000) R.warn(path, 'P107', '@1280x800 the fake clock did not survive the reload — the once-per-session check is inconclusive');
    else if (s?.open) fail('shown again after a reload in the same session (sessionStorage pds_exit_shown)');
    if (extras) {
      // a booking on this device (localStorage pds_last_booking) suppresses it; so does a < 1024 px viewport
      for (const [label, vp, init] of [
        ['after a booking (pds_last_booking set)', DESKTOP, () => { try { localStorage.setItem('pds_last_booking', '{"ref":"PDS-20261003-TEST","ts":0}'); } catch { /* private mode */ } }],
        ['at 768 px', { ...DESKTOP, name: '768x1024', width: 768, height: 1024 }, null],
      ]) {
        const c2 = await newContext(vp);
        try {
          if (init) await c2.addInitScript(init);
          const p2 = await c2.newPage();
          await p2.clock.install();
          await p2.goto(BASE + path, { waitUntil: 'load' });
          await p2.clock.fastForward(21_000);
          await exitTrigger(p2);
          await p2.clock.runFor(100);
          if ((await exitState(p2))?.open) fail(`shown ${label} — C4 forbids it`);
        } finally {
          await c2.close();
        }
      }
    }
    return cell;
  } catch (e) {
    fail(`test crashed: ${String(e?.message ?? e).split('\n')[0]}`);
    return cell;
  } finally {
    await ctx.close();
  }
}

// ---- run ---------------------------------------------------------------------------------------------------------

const exitCells = new Map();
try {
  if (!pages.length) throw new Error('no built page to test');
  await startServer();
  const { chromium } = createRequire(`${execSync('npm root -g').toString().trim()}/`)('playwright');
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox', '--disable-background-networking'] });
  R.info(`${pages.length} page(s) × ${VIEWPORTS.length} viewports on ${BASE} · screenshots → ${SHOTS}`);
  let extrasDone = false;
  for (const path of pages) {
    for (const vp of VIEWPORTS) await runView(path, vp);
    const wantExtras = !extrasDone && !EXIT_ABSENT.has(path);
    exitCells.set(path, await exitTest(path, { extras: wantExtras }));
    if (wantExtras && exitCells.get(path) !== 'WARN') extrasDone = true;
  }
  if (!pages.includes('/book/') && existsSync(pageFile(DIST, '/book/'))) exitCells.set('/book/ (exit check only)', await exitTest('/book/'));
} catch (e) {
  R.fail('-', 'CRASH', String(e?.message ?? e));
} finally {
  if (browser) await browser.close().catch(() => {});
  stopServer();
}

// ---- summary table -----------------------------------------------------------------------------------------------

const cols = ['overflow', 'console', 'http', 'axe', 'ldjson', 'cls', 'lcp', 'fold', 'track'];
const head = ['page', 'viewport', ...cols, 'exit card'];
const table = rows.map((r, i) => {
  const firstOfPage = i === 0 || rows[i - 1].page !== r.page;
  return [firstOfPage ? r.page : '', r.vp, ...cols.map((c) => r[c] || '—'), r.vp === '1280x800' ? (exitCells.get(r.page) ?? '—') : ''];
});
for (const [p, c] of exitCells) if (!rows.some((r) => r.page === p)) table.push([p, '1280x800', ...cols.map(() => ''), c]);
const widths = head.map((h, i) => Math.max(h.length, ...table.map((t) => String(t[i]).length)));
const line = (cells) => cells.map((c, i) => String(c).padEnd(widths[i])).join('  ');
console.log(`\n${line(head)}\n${widths.map((w) => '-'.repeat(w)).join('  ')}`);
for (const t of table) console.log(line(t));
process.exit(R.finish(`${pages.length} page(s), ${rows.length} page × viewport run(s)`));
