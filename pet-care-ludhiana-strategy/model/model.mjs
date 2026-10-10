#!/usr/bin/env node
// PetDoorStep — launch → first ₹1 crore. Deterministic, zero-dependency month-by-month model of the managed
// marketplace (independent providers deliver; the platform earns commission + subscriptions).
//
//   node model.mjs            → writes model-output.json (3 scenarios + sensitivities + investment tiers)
//   node model.mjs --check    → also runs the integrity assertions and exits non-zero on any failure
//
// Inputs: assumptions.json (every number carries a source in `sources`) + the live price list
// ../../website/src/data/pricing.json (AOV is computed from it, never typed in). Nothing here touches the website build.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const A = JSON.parse(fs.readFileSync(path.join(DIR, 'assumptions.json'), 'utf8'));
const PRICING = JSON.parse(fs.readFileSync(path.join(DIR, A.pricingPath), 'utf8'));
const CRORE = 1e7;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ---------- prices (from pricing.json) ----------
function priceOf(id, sizeSplit) {
  for (const s of PRICING.services) {
    if (s.id === id) {
      const p = s.pricing;
      if (p.type === 'by_size') return sizeSplit.small * p.small + sizeSplit.medium * p.medium + sizeSplit.large * p.large;
      if (p.type === 'flat' || p.type === 'flat_plus') return p.price;
      throw new Error(`priceOf: ${id} needs a plan id`);
    }
    if (s.pricing.type === 'plans') {
      const plan = s.pricing.plans.find((x) => x.id === id);
      if (plan) return plan.price;
    }
  }
  if (id === 'tick-addon') return PRICING.services.find((s) => s.id === 'tick-flea').pricing.addonPrice;
  throw new Error(`priceOf: unknown id ${id}`);
}
const mixAvg = (mix, size) => mix.reduce((t, m) => t + m.share * priceOf(m.id, size), 0);
const mixShare = (mix) => mix.reduce((t, m) => t + m.share, 0);

function prices(sc) {
  const size = A.demand.sizeSplit;
  const k = sc.priceMult ?? 1;
  const groomBase = mixAvg(A.mix.groom, size);
  const addon = A.mix.tickAddonAttach * priceOf('tick-addon', size) *
    A.mix.groom.filter((m) => ['full-groom', 'bath-brush', 'premium-spa'].includes(m.id)).reduce((t, m) => t + m.share, 0);
  const fullGroom = priceOf('full-groom', size);
  const health = A.mix.health.map((m) => ({ ...m, price: priceOf(m.id, size) * k }));
  const walk = A.mix.walk.reduce((t, m) => t + m.share * priceOf(m.id, size), 0);
  return {
    groomAOV: (groomBase + addon) * k,
    groomAOVExAddon: groomBase * k,
    fullGroom: fullGroom * k,
    memberJob: fullGroom * k * (1 - A.offers.groomClubPercent / 100),
    health,
    healthAOV: health.reduce((t, m) => t + m.share * m.price, 0),
    walkMonthly: walk * k,
    walkTrial: priceOf('walk-trial', size) * k,
  };
}

// ---------- helpers ----------
const calLabel = (m) => {
  const idx = A.timeline.startMonthIndex + m; // M0 = startMonthIndex (0 = Jan) of startYear
  return `${MONTHS[idx % 12]} ${A.timeline.startYear + Math.floor(idx / 12)}`;
};
const calMonth = (m) => (A.timeline.startMonthIndex + m) % 12;
const step = (table, x) => { let v = table[0][1]; for (const [from, val] of table) if (x >= from) v = val; return v; };
const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

// ---------- one scenario run ----------
function run(scName, over = {}) {
  const base = A.scenarios[scName];
  const sc = { ...base, ...over };
  const H = A.timeline.horizon;
  const P = prices(sc);
  const D = A.demand, T = A.take, O = A.offers, C = A.costs, X = A.expansion, S = A.supply;

  // cities: Ludhiana open at M1 (public launch); the others open when the gate passes
  const cities = X.cities.map((c, i) => ({
    ...c, idx: i, open: i === 0 ? 1 : null,
    tam: D.ludhianaTAM * sc.tamMult * c.sizeFactor,
    cum: 0, repeaters: 0, members: 0, walkActive: 0, newPrev: 0, gateStreak: 0,
  }));

  const rows = [];
  let cumGMV = 0, cumRev = 0, cumOpCash = 0, cash = sc.startingCash ?? A.funding.startingCash;
  let appBuilt = false, lastOpen = 1;
  const prelaunch = A.investment.tierForScenario[scName] ?? 'recommended';
  const prelaunchCost = A.investment.prelaunch.reduce((t, it) => t + (prelaunch === 'bootstrap' ? it.lowcost : it.standard), 0);

  for (let m = 0; m <= H; m++) {
    const season = A.seasonality[calMonth(m)];
    const r = { m, label: calLabel(m), cities: [] };
    let jobs = 0, groomJobs = 0, memberJobs = 0, healthJobs = 0, walkPlans = 0, walkTrials = 0, newCust = 0, gmv = 0;
    let commission = 0, subs = 0, proFees = 0, promo = 0, marketing = 0, groomers = 0, walkers = 0, vets = 0;
    let members = 0, repeatJobs = 0, cityLeads = 0, citySetup = 0, providerPayout = 0, healthMRPpassThrough = 0;

    // M0 = prelaunch pilot in Ludhiana only
    if (m === 0) {
      const pj = D.pilotJobs;
      groomJobs = pj; jobs = pj; newCust = pj;
      gmv = pj * P.fullGroom * (1 - D.pilotDiscount);
      commission = gmv * T.groomLaunch;
      promo = 0; // the pilot discount is shared pro rata (lower GMV), not platform-funded
      groomers = S.minGroomersAtLaunch; vets = 1;
      marketing = C.marketingFixedPerCity;
      cities[0].cum = pj; cities[0].newPrev = pj;
      cities[0].repeaters = pj * D.repeatRate.start;
    } else {
      for (const c of cities) {
        if (c.open === null || m < c.open) continue;
        const age = m - c.open; // 0 in the opening month
        const adsOn = m >= sc.adsStartMonth;
        const p = D.bassP * sc.pMult * (adsOn ? D.adsPMult : 1) * (c.idx > 0 && age < X.launchBoostMonths ? X.launchBoostP : 1);
        const q = D.bassQ * sc.qMult;
        const raw = (p + q * c.cum / c.tam) * Math.max(0, c.tam - c.cum);
        const nNew = raw * lerp(1, season, D.seasonOnNew);
        // repeaters: last month's new customers who come back (repeat probability ramps with age of the city)
        const rr = lerp(D.repeatRate.start, D.repeatRate.mature * sc.repeatMult, age / D.repeatRate.rampMonths);
        c.repeaters = c.repeaters * (1 - D.repeaterChurn) + c.newPrev * rr;
        const memberShare = age < O.groomClubStartAge ? 0 : lerp(O.groomClubAdoption.start, O.groomClubAdoption.mature, (age - O.groomClubStartAge) / O.groomClubAdoption.rampMonths);
        const mem = c.repeaters * memberShare;
        const nonMem = c.repeaters - mem;
        const cMemberJobs = mem * O.memberFrequency * season;
        const cRepeatNonMember = nonMem * D.repeatFrequency * season;
        const cGroom = nNew + cMemberJobs + cRepeatNonMember;
        const cHealth = cGroom * lerp(D.healthRatio.start, D.healthRatio.mature, age / 12);
        // walking: trials from a share of new customers, a share convert to monthly plans
        const cTrials = nNew * D.walkTrialShareOfNew;
        c.walkActive = c.walkActive * (1 - D.walkChurn) + cTrials * D.walkTrialConversion;
        c.cum += nNew; c.newPrev = nNew; c.members = mem;

        const cGMV = nNew * P.groomAOV + cRepeatNonMember * P.groomAOV + cMemberJobs * P.memberJob
          + cHealth * P.healthAOV + c.walkActive * P.walkMonthly + cTrials * P.walkTrial;
        // take rates (by month since the city opened)
        const tGroom = step(T.groomByAge, age) + (sc.takeDelta ?? 0);
        const groomGMV = (nNew + cRepeatNonMember) * P.groomAOV + cMemberJobs * P.memberJob;
        const healthFees = cHealth * P.health.reduce((t, h) => t + h.share * (h.flatFee ?? h.price * T.healthPct), 0);
        const walkGMV = c.walkActive * P.walkMonthly + cTrials * P.walkTrial;
        const cComm = groomGMV * tGroom + healthFees + walkGMV * (T.walk + (sc.takeDelta ?? 0));
        const cSubs = mem * (O.groomClubFee / (A.tax.subscriptionInclGST ? 1 + A.tax.gstRate : 1));

        // platform-funded promotions
        const firstGroomCost = nNew * O.firstGroomUptake * (O.firstGroomOff + O.freeNailVisitUse * O.freeNailVisitProviderPay);
        const referralCost = nNew * D.referralShareOfNew * (O.referralYou + O.referralFriend);
        const memberNailCost = mem * O.memberNailVisitUse * O.freeNailVisitProviderPay;
        const lateCost = (cGroom + cHealth) * O.lateRate * O.onTimeOff;
        const launchOfferCost = (c.idx > 0 && age < X.launchBoostMonths) ? nNew * X.launchOfferCostPerNew : 0;
        const cPromo = firstGroomCost + referralCost + memberNailCost + lateCost + launchOfferCost;

        // marketing: channel CAC on non-referral new customers + a fixed floor per open city
        const nonRef = nNew * (1 - D.referralShareOfNew);
        const mix = adsOn ? D.channelMixWithAds : D.channelMix;
        const cac = Object.entries(mix).reduce((t, [ch, share]) => t + share * D.cac[ch], 0);
        const cMkt = nonRef * cac + C.marketingFixedPerCity + (c.idx > 0 && age < X.launchBoostMonths ? X.launchMarketingPerMonth : 0);

        // supply needed
        const cGroomers = Math.max(S.minGroomersAtLaunch, Math.ceil((cGroom + cHealth * S.healthDoneByGroomersShare) / (S.groomerJobsPerDay * S.workDays * S.targetUtilisation)));
        const cWalkers = c.walkActive > 0.5 ? Math.ceil(c.walkActive / S.plansPerWalker) : 0;
        const cVets = Math.max(1, Math.ceil(cHealth * (1 - S.healthDoneByGroomersShare) / S.vetVisitsPerMonth));

        groomJobs += cGroom; memberJobs += cMemberJobs; repeatJobs += cMemberJobs + cRepeatNonMember; healthJobs += cHealth;
        walkPlans += c.walkActive; walkTrials += cTrials; newCust += nNew; gmv += cGMV; commission += cComm; subs += cSubs;
        promo += cPromo; marketing += cMkt; groomers += cGroomers; walkers += cWalkers; vets += cVets; members += mem;
        healthMRPpassThrough += cHealth * A.mix.healthMRPPerJob;
        const cJobs = cGroom + cHealth + c.walkActive; // T1 definition: a walking plan = 1 booking/month
        jobs += cJobs;
        if (c.idx > 0) cityLeads += 1;
        if (c.idx > 0 && age === 0) citySetup += (A.investment.tierForScenario[scName] === 'bootstrap' ? X.citySetupLowcost : X.citySetup);
        r.cities.push({ city: c.name, age, newCustomers: nNew, jobs: cJobs, gmv: cGMV, commission: cComm + cSubs,
          repeatShare: cGroom > 0 ? (cMemberJobs + cRepeatNonMember) / cGroom : 0, contribution: cComm + cSubs - cPromo - cMkt });
      }
      // provider subscriptions ("Pro")
      if (m >= A.offers.proStartMonth) proFees = Math.round(groomers * A.offers.proAdoption) * A.offers.proFee;
    }

    // provider earnings sanity (average groomer)
    const groomGMVTotal = gmv - walkPlans * P.walkMonthly - walkTrials * P.walkTrial - healthJobs * P.healthAOV * (1 - S.healthDoneByGroomersShare);
    const groomerJobsEach = groomers ? (groomJobs + healthJobs * S.healthDoneByGroomersShare) / groomers : 0;
    const groomerGross = groomers ? groomGMVTotal / groomers : 0;
    const tNow = (m === 0 ? T.groomLaunch : step(T.groomByAge, m - 1)) + (sc.takeDelta ?? 0);
    const groomerNet = groomerGross * (1 - tNow * (1 + A.tax.gstRate)) - groomerJobsEach * (S.consumablesPerJob + S.travelPerJob);
    // cold-start: guarantee the core launch groomers a minimum monthly net for the first months (platform tops up)
    const G = S.launchGuarantee;
    const incentives = (m >= 1 && m <= G.months) ? Math.max(0, G.monthly - groomerNet) * Math.min(G.providers, groomers) : 0;

    // ---------- costs ----------
    const payment = gmv * C.paymentCostPctOfGMV + (groomers + walkers + vets) * C.payoutsPerProviderPerMonth * C.payoutFee;
    const revenue = commission + subs + proFees;
    const contribution = revenue - promo - incentives - payment - marketing;
    const founder = step(sc.founderDraw ?? C.founderDraw, m);
    const opsStaff = C.opsHires.reduce((n, h) => n + (jobs >= h.atJobs ? 1 : 0), 0);
    const staff = opsStaff * C.opsSalary + cityLeads * X.cityLeadSalary;
    const tools = step(C.tools, m) + cityLeads * C.toolsPerExtraCity;
    const insurance = (m % 12 === 0) ? C.insuranceAnnual * (1 + cityLeads * 0.5) : 0;
    const fixed = founder + staff + tools + C.accounting + insurance + C.misc;
    const ebitda = contribution - fixed;
    let capex = 0;
    if (m === 0) capex += prelaunchCost;
    capex += citySetup;
    // custom app: built once active repeat customers pass the Phase-2 trigger (strategy report: 500–1,000 repeat customers)
    const activeRepeaters = cities.reduce((t, c) => t + (c.open !== null && m >= c.open ? c.repeaters : 0), 0);
    if (!appBuilt && A.tech.buildApp && activeRepeaters >= A.tech.appTriggerRepeaters) { capex += A.tech.appCost; appBuilt = m; }
    const opCash = ebitda - capex;
    cumGMV += gmv; cumRev += revenue; cumOpCash += opCash; cash += opCash;

    providerPayout = gmv - revenue + proFees; // what flows to providers (before their own costs/GST on commission)

    // ---------- expansion gate (doc 11 §1 T1/T3/T5, modelled; T2/T4 are assumed met if the numbers are) ----------
    const lud = r.cities.find((x) => x.city === cities[0].name);
    if (m >= 1) {
      const lastOpenCity = cities.filter((c) => c.open !== null).at(-1);
      const lc = r.cities.find((x) => x.city === lastOpenCity.name);
      const gateBase = lastOpenCity.idx === 0
        ? (lc && lc.jobs >= X.gate.jobs && lc.repeatShare >= X.gate.repeat && lc.contribution > 0 && m >= X.gate.minMonth)
        : (lc && lc.jobs >= X.gate.jobs * lastOpenCity.sizeFactor * X.gate.nextCityShare && lc.contribution > 0 && m - lastOpenCity.open >= X.gate.minGapMonths);
      lastOpenCity.gateStreak = gateBase ? lastOpenCity.gateStreak + 1 : 0;
      const next = cities.find((c) => c.open === null);
      if (next && lastOpenCity.gateStreak >= X.gate.consecutive && sc.expand !== false) {
        next.open = m + X.cloneMonths; // 10–12 week clone → opens ~3 months later
        lastOpen = next.open;
      }
    }

    Object.assign(r, {
      newCustomers: newCust, groomJobs, memberJobs, repeatJobs, healthJobs, walkPlans, walkTrials, jobs,
      repeatShare: groomJobs > 0 ? repeatJobs / groomJobs : 0,
      gmv, healthMRPpassThrough, commission, subscriptions: subs, providerFees: proFees, revenue, providerPayout,
      promo, incentives, payment, marketing, contribution, founder, staff, opsStaff, tools, insurance, fixed, ebitda, capex, opCash,
      cumGMV, cumRevenue: cumRev, cumOpCash, cash, members, groomers, walkers, vets,
      groomerNetEarnings: groomerNet, groomerJobsEach, citiesOpen: cities.filter((c) => c.open !== null && m >= c.open).map((c) => c.name),
      gstIfPrincipal: (gmv - healthJobs * P.healthAOV) * A.tax.gstRate / (1 + A.tax.gstRate), // risk line: GST on full non-vet GMV
    });
    rows.push(r);
    if (m >= H) break;
  }

  const first = (pred) => { const r = rows.find(pred); return r ? { m: r.m, label: r.label } : null; };
  const minCum = rows.reduce((mn, r) => Math.min(mn, r.cumOpCash), 0);
  const ludhianaPeak = Math.max(...rows.map((r) => (r.cities.find((c) => c.city === cities[0].name)?.jobs ?? 0)));
  return {
    scenario: scName, overrides: over, prices: P,
    summary: {
      gmv1cr: first((r) => r.cumGMV >= CRORE),
      revenue1cr: first((r) => r.cumRevenue >= CRORE),
      contributionBreakeven: first((r) => r.m >= 1 && r.contribution > 0),
      operatingBreakeven: first((r) => r.m >= 3 && r.ebitda > 0 && rows.slice(r.m, r.m + 3).every((x) => x.ebitda > 0)),
      cashPositive: first((r) => r.m >= 1 && r.cumOpCash >= 0 && rows.slice(r.m).every((x) => x.cumOpCash >= 0)),
      peakCashNeed: -minCum,
      peakCashMonth: first((r) => r.cumOpCash === minCum),
      prelaunchTier: prelaunch, prelaunchCost,
      citiesOpened: cities.filter((c) => c.open !== null).map((c) => ({ city: c.name, open: c.open, label: calLabel(c.open) })),
      appBuiltMonth: appBuilt === false ? null : { m: appBuilt, label: calLabel(appBuilt) },
      ludhianaPeakJobs: ludhianaPeak,
      at24: pick(rows[24]), at36: pick(rows[36]), atEnd: pick(rows.at(-1)),
    },
    rows,
  };
}
const pick = (r) => r && ({ m: r.m, label: r.label, jobs: r.jobs, gmv: r.gmv, revenue: r.revenue, ebitda: r.ebitda, cumGMV: r.cumGMV, cumRevenue: r.cumRevenue, groomers: r.groomers, cities: r.citiesOpen.length });

// ---------- investment tiers ----------
function investment() {
  const sum = (arr, k) => arr.reduce((t, it) => t + it[k], 0);
  const I = A.investment;
  return {
    prelaunch: I.prelaunch, firstSixMonths: I.firstSixMonths, perCity: I.perCity,
    totals: {
      prelaunch: { standard: sum(I.prelaunch, 'standard'), lowcost: sum(I.prelaunch, 'lowcost') },
      firstSixMonths: { standard: sum(I.firstSixMonths, 'standard'), lowcost: sum(I.firstSixMonths, 'lowcost') },
      perCity: { standard: sum(I.perCity, 'standard'), lowcost: sum(I.perCity, 'lowcost') },
    },
  };
}

// ---------- build ----------
const scenarios = Object.fromEntries(Object.keys(A.scenarios).map((s) => [s, run(s)]));
const sens = A.sensitivities.map((s) => {
  const o = run('base', s.over);
  return { name: s.name, over: s.over, gmv1cr: o.summary.gmv1cr, revenue1cr: o.summary.revenue1cr, peakCashNeed: o.summary.peakCashNeed, operatingBreakeven: o.summary.operatingBreakeven };
});
const out = {
  generated: A.meta.asOf, crore: CRORE, horizon: A.timeline.horizon,
  scenarios: Object.fromEntries(Object.entries(scenarios).map(([k, v]) => [k, v])),
  sensitivities: sens,
  investment: investment(),
};
fs.writeFileSync(path.join(DIR, 'model-output.json'), JSON.stringify(out, (k, v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v), 1));

const fmt = (x) => (x == null ? '—' : `M${x.m} (${x.label})`);
const L = (n) => `₹${(n / 1e5).toFixed(2)} L`;
for (const [k, v] of Object.entries(scenarios)) {
  const s = v.summary;
  console.log(`${k.padEnd(13)} AOV ₹${v.prices.groomAOV.toFixed(0)} | ₹1Cr GMV ${fmt(s.gmv1cr)} | ₹1Cr revenue ${fmt(s.revenue1cr)} | contrib BE ${fmt(s.contributionBreakeven)} | op BE ${fmt(s.operatingBreakeven)} | peak cash ${L(s.peakCashNeed)} @ ${fmt(s.peakCashMonth)} | cities ${s.citiesOpened.map((c) => `${c.city}@M${c.open}`).join(', ')}`);
}
for (const m of [1, 3, 6, 12, 18, 24, 36]) {
  const r = scenarios.base.rows[m];
  if (r) console.log(`  base M${m} ${r.label}: jobs ${r.jobs.toFixed(0)} (groom ${r.groomJobs.toFixed(0)}, repeat ${(r.repeatShare * 100).toFixed(0)}%) GMV ${L(r.gmv)} rev ${L(r.revenue)} contrib ${L(r.contribution)} EBITDA ${L(r.ebitda)} groomers ${r.groomers} net/groomer ₹${r.groomerNetEarnings.toFixed(0)} cash ${L(r.cumOpCash)}`);
}

// ---------- --check ----------
if (process.argv.includes('--check')) {
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  for (const [k, v] of Object.entries(scenarios)) {
    let g = 0, rv = 0, oc = 0;
    for (const r of v.rows) {
      g += r.gmv; rv += r.revenue; oc += r.opCash;
      ok(Math.abs(g - r.cumGMV) < 1, `${k} M${r.m}: cumGMV ≠ Σ gmv`);
      ok(Math.abs(rv - r.cumRevenue) < 1, `${k} M${r.m}: cumRevenue ≠ Σ revenue`);
      ok(Math.abs(oc - r.cumOpCash) < 1, `${k} M${r.m}: cumOpCash ≠ Σ opCash`);
      ok(r.revenue <= r.gmv + 1e-6, `${k} M${r.m}: revenue > GMV`);
      ok(r.groomers * A.supply.groomerJobsPerDay * A.supply.workDays >= r.groomJobs - 1e-6, `${k} M${r.m}: groomer capacity < groom jobs`);
      ok(Math.abs(r.contribution - (r.revenue - r.promo - r.incentives - r.payment - r.marketing)) < 1e-6, `${k} M${r.m}: contribution identity`);
      ok(Math.abs(r.ebitda - (r.contribution - r.fixed)) < 1e-6, `${k} M${r.m}: EBITDA identity`);
    }
    const s = v.summary;
    if (s.gmv1cr) {
      ok(v.rows[s.gmv1cr.m].cumGMV >= CRORE && (s.gmv1cr.m === 0 || v.rows[s.gmv1cr.m - 1].cumGMV < CRORE), `${k}: gmv1cr not first crossing`);
    }
    if (s.revenue1cr) {
      ok(v.rows[s.revenue1cr.m].cumRevenue >= CRORE && v.rows[s.revenue1cr.m - 1].cumRevenue < CRORE, `${k}: revenue1cr not first crossing`);
      ok(!s.gmv1cr || s.gmv1cr.m <= s.revenue1cr.m, `${k}: revenue crossed before GMV`);
    }
    ok(Math.abs(s.peakCashNeed + Math.min(0, ...v.rows.map((r) => r.cumOpCash))) < 1, `${k}: peak cash ≠ min cumulative cash`);
    // provider-earnings sanity after the first 6 months in Ludhiana-only months
    const bad = v.rows.filter((r) => r.m >= 6 && r.groomerNetEarnings < A.supply.minGroomerNet);
    if (bad.length) console.log(`  ⚠ ${k}: avg groomer net < ₹${A.supply.minGroomerNet} in ${bad.length} months from M6 (first ${bad[0].label}: ₹${bad[0].groomerNetEarnings.toFixed(0)})`);
  }
  const order = ['conservative', 'base', 'aggressive'];
  const mOf = (x) => (x ? x.m : Infinity);
  for (let i = 0; i < order.length - 1; i++) {
    const a = scenarios[order[i]].summary, b = scenarios[order[i + 1]].summary;
    ok(mOf(a.gmv1cr) >= mOf(b.gmv1cr), `scenario order: ${order[i]} reaches ₹1Cr GMV before ${order[i + 1]}`);
    ok(mOf(a.revenue1cr) >= mOf(b.revenue1cr), `scenario order: ${order[i]} reaches ₹1Cr revenue before ${order[i + 1]}`);
  }
  // AOV recomputed by hand from pricing.json for the base mix
  const p = scenarios.base.prices;
  console.log(`  AOV check: groom mix ₹${p.groomAOVExAddon.toFixed(2)} + tick add-on ₹${(p.groomAOV - p.groomAOVExAddon).toFixed(2)} = ₹${p.groomAOV.toFixed(2)}; member job ₹${p.memberJob.toFixed(2)}; health ₹${p.healthAOV.toFixed(2)}; walk plan ₹${p.walkMonthly.toFixed(2)}/mo`);
  if (fails.length) { console.error(`CHECK FAILED (${fails.length}):\n  ` + fails.slice(0, 30).join('\n  ')); process.exit(1); }
  console.log('CHECK OK');
}
