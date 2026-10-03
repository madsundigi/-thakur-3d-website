// Brand assets, rendered with Chromium from the 08-DESIGN-SYSTEM tokens and fonts:
//   · favicons — favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png (08 §6.4)
//   · /images/petdoorstep-logo.png — 720×720 mark square: GBP logo (05 §2.3.1) + LocalBusiness `logo` (04 §2.1)
//   · the 04-TECHNICAL-SEO §4 share-image set in /og/ — 1200×630 JPG ≤ 300 KB, 08 §5.6 template
// Run: node scripts/make-assets.mjs   (from website/ or anywhere — paths resolve from this file; needs a global
// Playwright, CHROMIUM_PATH overrides the browser; sharp + esbuild come from node_modules)
//
// Share images carry prices, so they read them through src/lib/pricing.ts (the pricing.json helpers — never a typed
// figure) and stamp what they say into a JPEG comment. astro.config.mjs compares that stamp with ogSpecs() on every
// build: change a price in pricing.json and the build fails until this script has been re-run.
import { existsSync, mkdirSync, openSync, readSync, closeSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const OG_DIR = join(ROOT, 'public', 'og');

/** What each 04 §4 share image says. `p` = the src/lib/pricing.ts module (prices only through its helpers),
 *  `site` = src/data/site.ts `site` (tagline + city, 00 §3.1). */
export function ogSpecs(p, site) {
  const atHome = `at your home in ${site.city}`; // 04 §4: service name + "at your home in Ludhiana" + from-price
  return [
    { file: 'petdoorstep-home.jpg', headline: [site.tagline], price: `${site.city} · ${p.heroPriceChip('home')}` },
    { file: 'dog-grooming.jpg', headline: ['Dog grooming', atHome], price: p.heroPriceChip('dog-grooming') },
    { file: 'cat-grooming.jpg', headline: ['Cat grooming', atHome], price: p.heroPriceChip('cat-grooming') },
    { file: 'dog-walking.jpg', headline: ['Dog walking', atHome], price: `from ${p.cardPriceChip('dog-walking')}` },
    { file: 'vet-at-home.jpg', headline: ['Vet visits', atHome], price: p.heroPriceChip('vet-at-home') },
    { file: 'blog-default.jpg', headline: [`Pet care tips for ${site.city}`], price: '' },
  ];
}

const STAMP = 'pds-og ';
const stampOf = (spec) => STAMP + JSON.stringify({ headline: spec.headline, price: spec.price });

/** The text stamp in a JPEG's comment (COM) segment, or null. Reads only the header bytes. */
function readStamp(file) {
  if (!existsSync(file)) return null;
  const buf = Buffer.alloc(4096);
  const fd = openSync(file, 'r');
  const n = readSync(fd, buf, 0, buf.length, 0);
  closeSync(fd);
  for (let i = 2; i + 4 <= n && buf[i] === 0xff; ) {
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker === 0xfe) return buf.toString('utf8', i + 4, Math.min(n, i + 2 + len));
    if (marker === 0xda) break; // start of scan — no more header segments
    i += 2 + len;
  }
  return null;
}

/** Share images whose stamp no longer matches ogSpecs() (prices or wording changed since the last render). */
export function staleOgImages(pricing, site, dir = OG_DIR) {
  return ogSpecs(pricing, site).filter((s) => readStamp(join(dir, s.file)) !== stampOf(s)).map((s) => s.file);
}

const isMain = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isMain) await main();

async function main() {
  const { createRequire } = await import('node:module');
  const { execSync } = await import('node:child_process');
  const { build } = await import('esbuild');
  const sharp = (await import('sharp')).default;
  // Playwright is installed globally (`npm i -g playwright && npx playwright install chromium`), not a dependency.
  const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');

  // src/lib/pricing.ts (+ its pricing.json) and src/data/site.ts, bundled, so this script prints what the site prints.
  const bundled = await build({
    stdin: { contents: "export * from './src/lib/pricing.ts'; export { site } from './src/data/site.ts';", resolveDir: ROOT, loader: 'ts' },
    bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
  });
  const pricing = await import(/* @vite-ignore */ `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
  const { site } = pricing;

  // Tokens + fonts straight from the site (08 §1.3 / §2.1): the latin files plus the ₹-only subsets.
  const css = readFileSync(join(ROOT, 'src/styles/global.css'), 'utf8');
  const color = Object.fromEntries([...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{3,8})\s*;/gi)].map((m) => [m[1], m[2]]));
  const font = (f) => readFileSync(join(ROOT, 'src/assets/fonts', f)).toString('base64');
  const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
  const face = (family, file, range) =>
    `@font-face{font-family:${family};src:url(data:font/woff2;base64,${font(file)}) format('woff2');font-weight:100 900;unicode-range:${range}}`;
  const fontCss = [
    face('F', 'fraunces-latin-wght-normal.woff2', LATIN), face('F', 'fraunces-rupee-wght-normal.woff2', 'U+20B9'),
    face('I', 'inter-latin-wght-normal.woff2', LATIN), face('I', 'inter-rupee-wght-normal.woff2', 'U+20B9'),
  ].join('');

  const favicon = readFileSync(join(ROOT, 'public/favicon.svg'), 'utf8');
  const pawShapes = favicon.match(/<g[^>]*>([\s\S]*)<\/g>/)[1]; // the 08 §6.3 paw: 4 toe pads + main pad (48×48)

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // ── Favicons + logo: white paw on a brand square (08 §6.4) ────────────────────────────────────────────────────
  async function png(size, pad, out) {
    await page.setViewportSize({ width: size, height: size });
    const inner = Math.round(size * (1 - pad * 2));
    await page.setContent(`<html><body style="margin:0;background:${color.brand};display:grid;place-items:center;width:${size}px;height:${size}px">
      <div style="width:${inner}px;height:${inner}px">${favicon.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`);
    const buf = await page.screenshot({ type: 'png', omitBackground: false });
    if (out) writeFileSync(join(ROOT, out), buf);
    return buf;
  }
  await png(180, 0.08, 'public/apple-touch-icon.png');
  await png(192, 0, 'public/icon-192.png');
  await png(512, 0, 'public/icon-512.png');
  const ico32 = await png(32, 0, null);
  // ICO container with one embedded 32x32 PNG
  const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); entry.writeUInt8(32, 1); entry.writeUInt8(0, 2); entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4); entry.writeUInt16LE(32, 6); entry.writeUInt32LE(ico32.length, 8); entry.writeUInt32LE(22, 12);
  writeFileSync(join(ROOT, 'public/favicon.ico'), Buffer.concat([header, entry, ico32]));
  // Square, full-bleed (survives GBP's circle crop), well above Google's 112 px logo minimum.
  mkdirSync(join(ROOT, 'public/images'), { recursive: true });
  await png(720, 0.1, 'public/images/petdoorstep-logo.png');

  // ── Share images (08 §5.6 template) ─────────────────────────────────────────────────────────────────────────
  // brand-dark ground · paw at 10% mint, top-right (08 §6.3 use ⑤) · Fraunces 600 white 64px headline, ≤ 2 lines ·
  // 6px amber rule · bottom row: lockup in mint (§6.4 dark variant) + from-price in sand.
  await page.setViewportSize({ width: 1200, height: 630 });
  const og = (s) => `<html><head><style>${fontCss}
    *{box-sizing:border-box}
    body{margin:0;width:1200px;height:630px;background:${color['brand-dark']};position:relative;overflow:hidden;font-family:I,Arial,sans-serif}
    .paw{position:absolute;right:-28px;top:-40px;width:380px;height:380px;color:${color.mint};opacity:.10;transform:rotate(-12deg)}
    .copy{position:absolute;left:80px;right:220px;top:56px;bottom:168px;display:flex;flex-direction:column;justify-content:center}
    h1{margin:0;font-family:F,Georgia,serif;font-weight:600;font-size:64px;line-height:1.12;letter-spacing:-0.01em;color:${color.white}}
    .rule{width:120px;height:6px;margin-top:32px;background:${color.cta}}
    .row{position:absolute;left:80px;right:80px;bottom:72px;height:64px;display:flex;align-items:center;justify-content:space-between}
    .lockup{display:flex;align-items:center;gap:18px}
    .mark{width:64px;height:64px;border-radius:14px;background:${color.mint};color:${color['brand-dark']};display:grid;place-items:center}
    .word{font-family:F,Georgia,serif;font-weight:600;font-size:44px;line-height:1;color:${color.mint}}
    .price{font-weight:600;font-size:36px;line-height:1;color:${color.sand};font-variant-numeric:tabular-nums}
  </style></head><body>
    <svg class="paw" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">${pawShapes}</svg>
    <div class="copy"><h1>${s.headline.join('<br>')}</h1><div class="rule"></div></div>
    <div class="row">
      <div class="lockup"><span class="mark"><svg viewBox="0 0 48 48" width="46" height="46" fill="currentColor">${pawShapes}</svg></span><span class="word">PetDoorStep</span></div>
      <div class="price">${s.price}</div>
    </div>
  </body></html>`;

  mkdirSync(OG_DIR, { recursive: true });
  for (const spec of ogSpecs(pricing, site)) {
    await page.setContent(og(spec));
    await page.evaluate(() => document.fonts.ready);
    const lines = await page.evaluate(() => Math.round(document.querySelector('h1').getBoundingClientRect().height / (64 * 1.12)));
    if (lines > 2) throw new Error(`${spec.file}: headline runs to ${lines} lines (08 §5.6 allows 2)`);
    const jpg = await sharp(await page.screenshot({ type: 'png' }))
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer();
    const text = Buffer.from(stampOf(spec), 'utf8');
    const com = Buffer.alloc(4); com.writeUInt16BE(0xfffe, 0); com.writeUInt16BE(text.length + 2, 2);
    let at = 2; // after SOI and the APPn (JFIF) segments, so strict JFIF readers still see APP0 first
    while (jpg[at] === 0xff && jpg[at + 1] >= 0xe0 && jpg[at + 1] <= 0xef) at += 2 + jpg.readUInt16BE(at + 2);
    const out = Buffer.concat([jpg.subarray(0, at), com, text, jpg.subarray(at)]);
    if (out.length > 300 * 1024) throw new Error(`${spec.file}: ${Math.round(out.length / 1024)} KB — 04 §4 caps share images at 300 KB`);
    writeFileSync(join(OG_DIR, spec.file), out);
    console.log(`og/${spec.file}  ${Math.round(out.length / 1024)} KB  "${spec.headline.join(' / ')}"  ${spec.price}`);
  }
  await browser.close();
  console.log('assets written');
}
