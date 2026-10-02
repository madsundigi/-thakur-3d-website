// End-to-end tests for the booking flow (website-plan/07-BOOKING-SPEC.md, 09-ANALYTICS-TRACKING.md).
// Runs against `astro preview`. Usage: npm run build && npm run test:e2e  (screenshots → $SHOTS or ./test-results)
import { createRequire } from 'node:module';
import { execSync, spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const globalRoot = execSync('npm root -g').toString().trim();
// Uses a global Playwright (`npm i -g playwright && npx playwright install chromium`); CHROMIUM_PATH overrides the browser.
const { chromium } = createRequire(globalRoot + '/')('playwright');
const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const SHOTS = process.env.SHOTS || 'test-results';
mkdirSync(SHOTS, { recursive: true });

let passed = 0; let failed = 0;
const ok = (cond, msg) => { if (cond) { passed++; console.log(`  ✓ ${msg}`); } else { failed++; console.log(`  ✗ ${msg}`); } };

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('preview server timeout')), 30000);
  server.stdout.on('data', (d) => { if (String(d).includes(String(PORT))) { clearTimeout(t); res(); } });
});

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
const MOBILE = { viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true };

async function newPage(opts = MOBILE) {
  const ctx = await browser.newContext(opts);
  // Stub external hosts (no real WhatsApp/GA traffic from tests); fulfil so the popup keeps its wa.me URL.
  await ctx.route(/wa\.me|whatsapp\.com|googletagmanager/, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<html>stub</html>' }));
  const page = await ctx.newPage();
  const events = [];
  page.on('console', (m) => {
    if (m.type() === 'debug' && m.text().startsWith('[track]')) {
      m.args()[1]?.jsonValue().then((name) => m.args()[2]?.jsonValue().then((params) => events.push({ name, params }))).catch(() => {});
    }
  });
  return { ctx, page, events };
}
const hydrated = (page) => page.waitForSelector('astro-island:not([ssr])', { timeout: 15000 });
const next = (page) => page.click('[data-testid=next]');
const title = (page) => page.textContent('[data-testid=step-title]');

try {
  // ── (a) Fold test + full booking on a 360×640 phone ──────────────────────────────
  console.log('\n(a)+(b) Full booking on a 360×640 phone');
  {
    const { ctx, page, events } = await newPage();
    await page.goto(`${BASE}/book/`); await hydrated(page);
    const box = await page.locator('#pds-area').boundingBox();
    ok(box && box.y + box.height <= 640, `Step 1 area control visible without scrolling (bottom ${Math.round(box?.y + box?.height)}px ≤ 640)`);
    await page.screenshot({ path: `${SHOTS}/01-mobile-step1.png` });

    await next(page);
    ok((await page.textContent('body')).includes('Please choose your area so we can check coverage.'), 'Step 1 empty → verbatim area error');
    await page.selectOption('#pds-area', 'Sarabha Nagar');
    await next(page);
    ok((await title(page)) === 'Choose a service', 'Step 2 reached');
    await page.click('label[for=pds-service-full-groom]');
    ok((await page.textContent('[data-testid=price-ribbon]')).includes('from ₹1,199 — exact price after size'), 'Price ribbon before size: "from ₹1,199 — exact price after size"');
    await next(page);
    ok(await page.isChecked('#pds-pet-dog') && await page.isDisabled('#pds-pet-cat'), 'Step 3: pet type locked to Dog for Full Groom');
    await next(page);
    ok((await page.textContent('body')).includes("Pick your dog's size — a close guess is fine, the kg guide is right there."), 'Size missing → verbatim size error');
    await page.click('label[for=pds-size-medium]');
    ok((await page.textContent('[data-testid=price-ribbon]')).includes('Your price: ₹1,499 · Full Groom · Medium'), 'Ribbon after size: "Your price: ₹1,499 · Full Groom · Medium"');
    await page.click('label[for=pds-first-0]');
    await page.click('label[for=pds-coat-ticks]');
    await next(page);
    ok((await title(page)) === 'Pick a day and time', 'Step 4 reached');
    await page.click('label[for=pds-date-0]');
    const enabled = await page.$$eval('input[name=pds-window]', (els) => els.map((e, i) => (e.disabled ? -1 : i)).filter((i) => i >= 0));
    await page.click(`label[for=pds-window-${enabled[0]}]`);
    await next(page);
    ok((await title(page)) === 'Your details', 'Step 5 reached');
    await page.fill('#pds-name', 'Simran');
    await page.fill('#pds-phone', '12345');
    await next(page);
    ok((await page.textContent('body')).includes('Please enter a 10-digit mobile number starting with 6–9 (e.g. 98765 43210).'), 'Invalid phone → verbatim phone error');
    ok(await page.waitForFunction(() => document.activeElement?.id === 'pds-phone', null, { timeout: 2000 }).then(() => true, () => false), 'Focus moved to the invalid phone field');
    await page.fill('#pds-phone', '+91 98765 43210');
    await page.fill('#pds-note', 'Society gate - call on arrival.');
    await next(page);
    ok((await title(page)) === 'Check & confirm', 'Review screen reached');
    ok((await page.textContent('[data-testid=review-price]')).includes('₹1,499'), 'Review price ₹1,499 (Full Groom · Medium)');
    await page.click('label[for=pds-addon]');
    ok((await page.textContent('[data-testid=review-price]')).includes('₹1,898 (incl. Tick & Flea add-on)'), 'Tick & Flea add-on toggle → ₹1,898 (incl. Tick & Flea add-on)');
    ok(await page.isVisible('[data-testid=first-offer]'), 'First-booking FIRSTGROOM line shown for a Full Groom');
    await page.screenshot({ path: `${SHOTS}/02-mobile-review.png`, fullPage: true });

    const href = await page.getAttribute('[data-testid=confirm-whatsapp]', 'href');
    const msg = decodeURIComponent(href.split('text=')[1]);
    const ref = (msg.match(/Ref: (PDS-\d{8}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4})/) || [])[1];
    ok(href.startsWith('https://wa.me/'), 'Confirm link is a wa.me deep link');
    ok(!!ref, `Message carries a valid booking ref (${ref})`);
    const expected = [
      'Hi PetDoorStep! New booking request from the website.',
      'Service: Full Groom + Tick & Flea add-on', 'Pet: Dog', 'Size: Medium (10–25 kg)', 'Area: Sarabha Nagar, Ludhiana',
      'Name: Simran', 'Price shown: ₹1,898 (incl. Tick & Flea add-on)',
      'Note: First groom. Ticks or fleas. Society gate - call on arrival.', 'Offer: FIRSTGROOM (first groom)', 'Source: website (book_page)',
    ];
    for (const line of expected) ok(msg.includes(line), `Message line: "${line}"`);

    const popupP = page.waitForEvent('popup', { timeout: 5000 }).catch(() => null);
    await page.click('[data-testid=confirm-whatsapp]');
    const popup = await popupP;
    ok(popup && popup.url().startsWith('https://wa.me/'), 'Tapping confirm opens WhatsApp in a new tab');
    await page.waitForURL(/\/thank-you\/\?ref=/, { timeout: 6000 });
    ok(page.url().includes(`ref=${ref}`) && page.url().includes('service=full-groom'), 'Redirected to /thank-you/ with ref + service');
    ok((await page.textContent('[data-testid=ty-ref]')).includes(ref), 'Thank-you page shows the booking reference');
    ok(await page.isVisible('[data-testid=ty-offer]'), 'Thank-you page shows the FIRSTGROOM line (true for this booking)');
    ok(await page.$eval('meta[name=robots]', (m) => m.content) === 'noindex', '/thank-you/ is noindex');
    await page.screenshot({ path: `${SHOTS}/03-mobile-thank-you.png` });

    await page.waitForTimeout(300);
    const names = events.map((e) => e.name + (e.params?.step ? `:${e.params.step}` : ''));
    const want = ['booking_started', 'booking_step_completed:1', 'booking_step_completed:2', 'booking_step_completed:3',
      'booking_step_completed:4', 'booking_step_completed:5', 'booking_step_completed:6', 'booking_submitted', 'whatsapp_click', 'thank_you_view'];
    ok(JSON.stringify(names) === JSON.stringify(want), `Event order correct\n      got: ${names.join(' → ')}`);
    const sub = events.find((e) => e.name === 'booking_submitted')?.params ?? {};
    ok(sub.service === 'full-groom' && sub.size === 'medium' && sub.area === 'Sarabha Nagar' && sub.ref === ref && sub.source === 'book_page',
      'booking_submitted params: service, size, area, ref, source');
    ok(events.filter((e) => e.name === 'whatsapp_click').length === 1, 'whatsapp_click fired exactly once on confirm (no double count)');
    await ctx.close();
  }

  // ── (c) Prefill from a pricing-row link ──────────────────────────────────────────
  console.log('\n(c) Prefill ?service=full-groom&size=medium&src=pricing_row');
  {
    const { ctx, page } = await newPage();
    await page.goto(`${BASE}/book/?service=full-groom&size=medium&src=pricing_row`); await hydrated(page);
    ok((await title(page)) === 'Where should we come?', 'Prefill never skips Step 1');
    await page.selectOption('#pds-area', 'Model Town'); await next(page);
    ok(await page.isChecked('#pds-service-full-groom'), 'Full Groom preselected');
    ok((await page.textContent('[data-testid=price-ribbon]')).includes('Your price: ₹1,499 · Full Groom · Medium'), 'Medium preselected → exact price in ribbon');
    await ctx.close();
  }

  // ── (d) Outside Ludhiana → waitlist, no redirect ───────────────────────────────
  console.log('\n(d) Outside Ludhiana → waitlist');
  {
    const { ctx, page, events } = await newPage();
    await page.goto(`${BASE}/book/`); await hydrated(page);
    await page.selectOption('#pds-area', 'Outside Ludhiana'); await next(page);
    ok((await title(page)) === "We're reaching your city soon.", 'Waitlist screen replaces steps 2–5');
    await page.click('text=Join the waitlist');
    ok((await page.textContent('body')).includes('Please tell us your name.'), 'Empty waitlist → verbatim name error');
    await page.fill('#wl-name', 'Aman'); await page.fill('#wl-phone', '9876543210'); await page.fill('#wl-area', 'Khanna');
    await page.click('text=Join the waitlist');
    ok((await page.textContent('[data-testid=waitlist-done]')).includes("Done! You're on the list for Khanna."), 'Waitlist success message');
    ok(page.url().endsWith('/book/'), 'No redirect after waitlist');
    await page.waitForTimeout(200);
    ok(events.some((e) => e.name === 'out_of_area_lead' && e.params?.area_text === 'Khanna'), 'out_of_area_lead fired with area_text');
    await ctx.close();
  }

  // ── (e) JavaScript disabled → fallback links ───────────────────────────────────
  console.log('\n(e) JavaScript disabled');
  {
    const ctx = await browser.newContext({ ...MOBILE, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/book/`);
    const wa = await page.$('[data-testid=fallback-links] a[href*="wa.me"]');
    const tel = await page.$('[data-testid=fallback-links] a[href^="tel:"]');
    ok(!!wa && !!tel && await wa.isVisible(), 'WhatsApp + call fallback links visible without JS');
    await ctx.close();
  }

  // ── (f) Draft resume + edit flow ───────────────────────────────────────────────
  console.log('\n(f) Draft resume + Edit → "Save & review"');
  {
    const { ctx, page } = await newPage();
    await page.goto(`${BASE}/book/`); await hydrated(page);
    await page.selectOption('#pds-area', 'Dugri'); await next(page);
    await page.click('label[for=pds-service-cat-grooming]'); await next(page);
    await page.reload(); await hydrated(page);
    ok((await page.textContent('[data-testid=resume-banner]')).includes('Welcome back! Continue your booking — Cat Grooming in Dugri.'), 'Resume banner with service + area');
    await page.click('text=Resume');
    ok((await title(page)) === 'Tell us about your pet', 'Resume restores the furthest step');
    ok(!(await page.isVisible('#pds-size-small')), 'Size hidden for cats (flat cat price)');
    await next(page);
    await page.click('label[for=pds-date-1]'); await page.click('label[for=pds-window-0]'); await next(page);
    await page.fill('#pds-name', 'Neha'); await page.fill('#pds-phone', '9876543210'); await next(page);
    ok((await page.textContent('[data-testid=review-price]')).includes('₹899 / visit'), 'Cat Bath & Brush shows ₹899 / visit');
    await page.click('button[aria-label="Edit Service"]');
    ok((await page.textContent('[data-testid=next]')).trim() === 'Save & review', 'Edit from review → button reads "Save & review"');
    await page.click('label[for=pds-plan-cat-full]');
    await next(page);
    ok((await title(page)) === 'Check & confirm' && (await page.textContent('[data-testid=review-price]')).includes('₹1,399 / visit'), 'Save & review returns to review with the new price (₹1,399)');
    ok(!(await page.isVisible('[data-testid=first-offer]')), 'No FIRSTGROOM line for cat grooming (offer is Full Groom / Premium Spa only)');
    await ctx.close();
  }

  // ── (g) Desktop layout ─────────────────────────────────────────────────────────
  console.log('\n(g) Desktop 1280×800');
  {
    const { ctx, page } = await newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/book/`); await hydrated(page);
    ok(await page.isVisible('label[for=pds-area-chip-0]') && !(await page.isVisible('#pds-area')), 'Area renders as chips ≥ 768px (select hidden)');
    ok(!(await page.isVisible('nav[aria-label="Quick actions"]')), 'No sticky bar on /book/');
    await page.screenshot({ path: `${SHOTS}/04-desktop-book.png` });
    await page.click('label[for=pds-area-chip-0]'); await next(page);
    await page.screenshot({ path: `${SHOTS}/05-desktop-step2.png` });
    await ctx.close();
  }
  // ── (h) Mobile menu: hidden + untabbable when closed, opens on tap ─────────────────
  console.log('\n(h) Mobile menu');
  {
    const { ctx, page } = await newPage();
    await page.goto(`${BASE}/thank-you/`);
    ok(!(await page.isVisible('nav[aria-label=Mobile]')), 'Closed menu panel is hidden (no shadow bleed, not tabbable)');
    await page.click('label[for=nav-toggle] >> nth=0');
    await page.waitForTimeout(300);
    ok(await page.isVisible('nav[aria-label=Mobile]'), 'Tapping the menu icon opens the panel');
    await page.screenshot({ path: `${SHOTS}/06-mobile-menu-open.png` });
    await ctx.close();
  }
} catch (e) {
  failed++; console.error('Test crashed:', e);
} finally {
  await browser.close();
  server.kill();
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
