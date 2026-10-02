// Renders favicon PNGs, favicon.ico and the default OG image (1200x630) with the preinstalled Chromium.
// Run: NODE_PATH="$(npm root -g)" node scripts/make-assets.mjs   (artwork per 08-DESIGN-SYSTEM §6.4)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
// Playwright is preinstalled globally in this environment (not a project dependency).
const globalRoot = execSync('npm root -g').toString().trim();
// Uses a global Playwright (`npm i -g playwright && npx playwright install chromium`); CHROMIUM_PATH overrides the browser.
const { chromium } = createRequire(globalRoot + '/')('playwright');
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg', 'utf8');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage();

async function png(size, pad, out) {
  await page.setViewportSize({ width: size, height: size });
  const inner = Math.round(size * (1 - pad * 2));
  await page.setContent(`<html><body style="margin:0;background:#0e7c72;display:grid;place-items:center;width:${size}px;height:${size}px">
    <div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`);
  const buf = await page.screenshot({ type: 'png', omitBackground: false });
  if (out) writeFileSync(out, buf);
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
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, ico32]));

// OG image — brand-dark background, paw corner at 10% mint (08 §6.3 use 5), wordmark + tagline.
const paw = svg.match(/<g[\s\S]*<\/g>/)[0].replace('fill="#ffffff"', 'fill="#e9f5f2"').replace('translate(8 8)', '');
const fraunces = readFileSync('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2').toString('base64');
const inter = readFileSync('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2').toString('base64');
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<html><head><style>
  @font-face{font-family:F;src:url(data:font/woff2;base64,${fraunces}) format('woff2');font-weight:100 900}
  @font-face{font-family:I;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
  body{margin:0;width:1200px;height:630px;background:#073e39;color:#fff;font-family:I;position:relative;overflow:hidden}
  .wrap{position:absolute;left:80px;top:150px;right:80px}
  h1{font-family:F;font-weight:600;font-size:96px;margin:0;letter-spacing:-1px}
  p{font-size:40px;color:#e9f5f2;margin:20px 0 0}
  .rule{width:120px;height:8px;background:#e98a1f;border-radius:4px;margin-top:36px}
  .city{font-size:30px;color:#fbf5ea;margin-top:28px}
  svg{position:absolute;right:-40px;bottom:-60px;width:440px;height:440px;opacity:.10;transform:rotate(-12deg)}
</style></head><body>
  <svg viewBox="0 0 48 48">${paw}</svg>
  <div class="wrap"><h1>PetDoorStep</h1><p>Pet care at your doorstep</p><div class="rule"></div>
  <div class="city">Grooming · Walking · Vet visits — Ludhiana</div></div>
</body></html>`);
await page.evaluate(() => document.fonts.ready);
writeFileSync('public/og/default.png', await page.screenshot({ type: 'png' }));
await browser.close();
console.log('assets written');
