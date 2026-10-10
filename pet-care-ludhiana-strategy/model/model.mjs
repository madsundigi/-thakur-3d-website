#!/usr/bin/env node
// PetDoorStep — launch → first ₹1 crore. Deterministic, zero-dependency month-by-month model of the managed
// marketplace (independent providers deliver and are the legal supplier; PetDoorStep earns commission + subscriptions).
//
//   node model.mjs            → writes model-output.json (scenarios × tiers + sensitivities + investment tables)
//   node model.mjs --check    → also runs the integrity assertions and exits non-zero on any failure
//
// Inputs: assumptions.json (every number has a source in `sources`, research ids → facts.json) + the live price list
// ../../website/src/data/pricing.json (AOV and commission per job are computed from it, never typed in).
// Nothing here touches the website build.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const A = JSON.parse(fs.readFileSync(path.join(DIR, 'assumptions.json'), 'utf8'));
const PRICING = JSON.parse(fs.readFileSync(path.join(DIR, A.pricingPath), 'utf8'));
const CRORE = 1e7;
const LAKH = 1e5;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ---------- prices (from pricing.json) ----------
function servicePrice(id) {
  for (const s of PRICING.services) {
    if (s.id === id) return s.pricing;
    if (s.pricing.type === 'plans') {
      const plan = s.pricing.plans.find((x) => x.id === id);
      if (plan) return { type: 'flat', price: plan.price };
    }
  }
  throw new Error(`unknown service id ${id}`);
}
// a mix → weighted "atoms" {share, price} (by_size services expand into S/M/L)
function atoms(mix, size, k) {
  const out = [];
  for (const m of mix) {
    const p = servicePrice(m.id);
    if (p.type === 'by_size') for (const z of ['small', 'medium', 'large']) out.push({ id: `${m.id}:${z}`, share: m.share * size[z], price: p[z] * k });
    else out.push({ id: m.id, share: m.share, price: p.price * k });
  }
  return out;
}
const avg = (at) => at.reduce((t, a) => t + a.share * a.price, 0);

function prices(sc) {
  const size = A.demand.sizeSplit;
  const k = sc.priceMult ?? 1;
  const groom = atoms(A.mix.groom, size, k);
  const groomedShare = A.mix.groom.filter((m) => ['full-groom', 'bath-brush', 'premium-spa'].includes(m.id)).reduce((t, m) => t + m.share, 0);
  const addonPerJob = A.mix.tickAddonAttach * groomedShare * servicePrice('tick-flea').addonPrice * k;
  const member = atoms([{ id: 'full-groom', share: 1 }], size, k * (1 - A.offers.groomClubPercent / 100));
  const health = A.mix.health.map((m) => ({ ...m, price: servicePrice(m.id).price * k }));
  const walk = atoms(A.mix.walk, size, k);
  return {
    groomAtoms: groom, memberAtoms: member, addonPerJob,
    groomAOV: avg(groom) + addonPerJob,
    groomAOVExAddon: avg(groom),
    fullGroom: avg(atoms([{ id: 'full-groom', share: 1 }], size, k)),
    memberJob: avg(member),
    health,
    healthAOV: health.reduce((t, m) => t + m.share * m.price, 0),
    healthFeePerJob: health.reduce((t, h) => t + h.share * (h.flatFee ?? h.price * A.take.healthPct), 0),
    walkMonthly: avg(walk),
    walkTrial: servicePrice('walk-trial').price * k,
  };
}
// commission per job at take t with a per-job cap (₹) — the cap blunts the incentive to take big jobs off-platform
const commissionPerJob = (at, t, cap) => at.reduce((s, a) => s + a.share * Math.min(a.price * t, cap), 0);

// ---------- helpers ----------
const calLabel = (m) => {
  const idx = A.timeline.startMonthIndex + m; // M0 = startMonthIndex (0 = Jan) of startYear
  return `${MONTHS[idx % 12]} ${A.timeline.startYear + Math.floor(idx / 12)}`;
};
const calMonth = (m) => (A.timeline.startMonthIndex + m) % 12;
const step = (table, x) => { let v = table[0][1]; for (const [from, val] of table) if (x >= from) v = val; return v; };
const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));

// ---------- one run (scenario × tier) ----------
function run(scName, over = {}) {
  const sc = { ...A.scenarios[scName], ...over };
  const tierName = sc.tier ?? 'recommended';
  const TR = A.tiers[tierName];
  const H = A.timeline.horizon;
  const P = prices(sc);
  const D = A.demand, T = A.take, O = A.offers, C = A.costs, X = A.expansion, S = A.supply, TX = A.tax, PAY = A.payments;
  const takeDelta = sc.takeDelta ?? 0;

  const cities = X.cities.map((c, i) => ({
    ...c, idx: i, open: i === 0 ? 1 : null,
    tam: D.ludhianaTAM * sc.tamMult * c.sizeFactor,
    cum: 0, repeaters: 0, walkActive: 0, newPrev: 0, gateStreak: 0,
  }));

  const prelaunchCost = A.investment.prelaunch.reduce((t, it) => t + (tierName === 'bootstrap' ? it.lowcost : it.standard), 0);
  const rows = [];
  let cumGMV = 0, cumRev = 0, cumOpCash = 0;
  let appBuilt = false, gstFrom = sc.gstVoluntary ? 0 : null, fyRev = 0, splitPayFrom = null;

  for (let m = 0; m <= H; m++) {
    const season = A.seasonality[calMonth(m)];
    if (calMonth(m) === 3) fyRev = 0; // Indian FY starts in April
    const gstOn = gstFrom !== null && m >= gstFrom;
    const r = { m, label: calLabel(m), cities: [] };
    let jobs = 0, groomJobs = 0, memberJobs = 0, healthJobs = 0, walkPlans = 0, walkTrials = 0, newCust = 0, gmv = 0;
    let groomGMV = 0, groomComm = 0, commission = 0, subs = 0, promo = 0, marketing = 0, groomers = 0, walkers = 0, vets = 0;
    let members = 0, repeatJobs = 0, cityLeadCost = 0, cityLeads = 0, citySetup = 0, healthMRP = 0;

    if (m === 0) {
      // M0 = pre-launch pilot in Ludhiana (friends/family/RWA) to earn the first reviews; the platform tops up the
      // provider for the pilot discount (counted in the pre-launch investment line "pilot grooms"), so GMV is list price.
      const pj = D.pilotJobs;
      groomJobs = pj; jobs = pj; newCust = pj;
      groomGMV = gmv = pj * P.fullGroom;
      groomComm = commission = pj * commissionPerJob(atoms([{ id: 'full-groom', share: 1 }], A.demand.sizeSplit, sc.priceMult ?? 1), T.groomByAge[0][1], T.groomCap);
      groomers = S.minGroomersAtLaunch; vets = 1;
      marketing = TR.marketingFixedPerCity;
      cities[0].cum = pj; cities[0].newPrev = pj; cities[0].repeaters = pj * D.repeatRate.start;
    } else {
      for (const c of cities) {
        if (c.open === null || m < c.open) continue;
        const age = m - c.open; // 0 in the opening month
        const adsOn = m >= (sc.adsStartMonth ?? TR.adsStartMonth);
        const p = D.bassP * sc.pMult * (adsOn ? D.adsPMult : 1) * (c.idx > 0 && age < X.launchBoostMonths ? X.launchBoostP : 1);
        const q = D.bassQ * sc.qMult;
        const nNew = (p + q * c.cum / c.tam) * Math.max(0, c.tam - c.cum) * lerp(1, season, D.seasonOnNew);
        const rr = lerp(D.repeatRate.start, D.repeatRate.mature * sc.repeatMult, age / D.repeatRate.rampMonths);
        c.repeaters = c.repeaters * (1 - D.repeaterChurn) + c.newPrev * rr;
        const memberShare = age < O.groomClubStartAge ? 0 : lerp(O.groomClubAdoption.start, O.groomClubAdoption.mature, (age - O.groomClubStartAge) / O.groomClubAdoption.rampMonths);
        const mem = c.repeaters * memberShare;
        const cMemberJobs = mem * O.memberFrequency * season;
        const cRepeatNonMember = (c.repeaters - mem) * D.repeatFrequency * season;
        const cGroom = nNew + cMemberJobs + cRepeatNonMember;
        const cHealth = cGroom * lerp(D.healthRatio.start, D.healthRatio.mature, age / 12);
        const cTrials = nNew * D.walkTrialShareOfNew;
        c.walkActive = c.walkActive * (1 - D.walkChurn) + cTrials * D.walkTrialConversion;
        c.cum += nNew; c.newPrev = nNew;

        // GMV (service value only — vaccines/medicines at MRP are the vet's own sale, tracked as pass-through)
        const cGroomGMV = (nNew + cRepeatNonMember) * P.groomAOV + cMemberJobs * P.memberJob;
        const cWalkGMV = c.walkActive * P.walkMonthly + cTrials * P.walkTrial;
        const cGMV = cGroomGMV + cHealth * P.healthAOV + cWalkGMV;

        // commission: capped % on grooming (launch rate for the first months of each city), flat fees on vet work,
        // a low % on walking (walkers' economics, R1/R2)
        const t = step(T.groomByAge, age) + takeDelta;
        const cGroomComm = (nNew + cRepeatNonMember) * (commissionPerJob(P.groomAtoms, t, T.groomCap) + P.addonPerJob * t)
          + cMemberJobs * commissionPerJob(P.memberAtoms, t, T.groomCap);
        const cComm = cGroomComm + cHealth * P.healthFeePerJob + cWalkGMV * (T.walk + takeDelta);
        const cSubs = mem * (O.groomClubFeeYear / 12) / (gstOn ? 1 + TX.gstRate : 1);

        // platform-funded promotions
        const firstGroom = nNew * O.firstGroomUptake * (O.firstGroomOff + O.freeNailVisitUse * O.freeNailVisitProviderPay);
        const referral = nNew * D.referralShareOfNew * (O.referralYou + O.referralFriend);
        const memberNail = mem * O.memberNailVisitUse * O.memberNailPlatformCost;
        const late = (cGroom + cHealth) * O.lateRate * O.onTimeOff * O.lateCostPlatformShare;
        const launchOffer = (c.idx > 0 && age < X.launchBoostMonths) ? nNew * X.launchOfferCostPerNew : 0;
        const cPromo = firstGroom + referral + memberNail + late + launchOffer;

        // marketing: blended channel CAC on non-referral new customers + a fixed floor per open city
        const mix = adsOn ? D.channelMixWithAds : D.channelMix;
        const cac = Object.entries(mix).reduce((s2, [ch, share]) => s2 + share * D.cac[ch], 0);
        const cMkt = nNew * (1 - D.referralShareOfNew) * cac + TR.marketingFixedPerCity
          + (c.idx > 0 && age < X.launchBoostMonths ? TR.cityLaunchMarketingPerMonth : 0);

        // supply needed
        const cGroomers = Math.max(S.minGroomersAtLaunch, Math.ceil(cGroom / (S.groomerJobsPerDay * S.workDays * S.targetUtilisation)));
        const cWalkers = c.walkActive > 0.5 ? Math.ceil(c.walkActive / S.plansPerWalker) : 0;
        const cVets = Math.max(1, Math.ceil(cHealth / S.vetVisitsPerMonth));

        groomJobs += cGroom; memberJobs += cMemberJobs; repeatJobs += cMemberJobs + cRepeatNonMember; healthJobs += cHealth;
        walkPlans += c.walkActive; walkTrials += cTrials; newCust += nNew; gmv += cGMV; groomGMV += cGroomGMV;
        groomComm += cGroomComm; commission += cComm; subs += cSubs; promo += cPromo; marketing += cMkt;
        groomers += cGroomers; walkers += cWalkers; vets += cVets; members += mem; healthMRP += cHealth * A.mix.healthMRPPerJob;
        const cJobs = cGroom + cHealth + c.walkActive; // doc 11 T1: a walking plan = 1 booking/month
        jobs += cJobs;
        if (c.idx > 0) {
          cityLeads += 1;
          cityLeadCost += TR.cityLead.mode === 'salary' ? TR.cityLead.salary : TR.cityLead.retainer + TR.cityLead.revShare * (cComm + cSubs);
          if (age === 0) citySetup += A.investment.perCity.reduce((s2, it) => s2 + (tierName === 'bootstrap' ? it.lowcost : it.standard), 0);
        }
        r.cities.push({ city: c.name, age, newCustomers: nNew, jobs: cJobs, gmv: cGMV, revenue: cComm + cSubs,
          repeatShare: cGroom > 0 ? (cMemberJobs + cRepeatNonMember) / cGroom : 0, contribution: cComm + cSubs - cPromo - cMkt });
      }
    }

    // provider-side revenue lines
    const pro = m >= O.proStartMonth ? Math.round(groomers * O.proAdoption) * O.proFee : 0;
    const supplies = m >= O.suppliesStartMonth ? groomJobs * O.suppliesAttach * S.consumablesPerJob * O.suppliesMargin : 0;
    const revenue = commission + subs + pro + supplies; // "platform revenue" = the ₹1 Cr net milestone (ex-GST)

    // provider earnings sanity (average groomer, after commission + GST on commission once registered, consumables, travel)
    const groomerJobsEach = groomers ? groomJobs / groomers : 0;
    const groomerNet = groomers ? (groomGMV - groomComm * (gstOn ? 1 + TX.gstRate : 1)) / groomers
      - groomerJobsEach * (S.consumablesPerJob + S.travelPerJob) - (m >= O.proStartMonth ? O.proAdoption * O.proFee : 0) : 0;
    // cold-start: the recommended tier guarantees the 2 core launch groomers a minimum net for the first months
    const G = S.launchGuarantee;
    const incentives = TR.launchGuarantee && m >= 1 && m <= G.months ? Math.max(0, G.monthly - groomerNet) * Math.min(G.providers, groomers) : 0;

    // payments: providers are paid directly by customers (UPI/cash) at launch → no gateway cost; commission is settled
    // weekly by providers. From PAY.splitAtJobs, customers pay through an RBI-authorised PA split product.
    const splitAt = sc.splitAtJobs ?? PAY.splitAtJobs;
    if (splitPayFrom === null && splitAt != null && jobs >= splitAt) splitPayFrom = m + 1;
    const split = splitPayFrom !== null && m >= splitPayFrom;
    const payment = split ? gmv * PAY.digitalShare * PAY.splitFeePct + (groomers + walkers + vets) * PAY.payoutsPerProviderPerMonth * PAY.payoutFee : 0;
    // statutory / contingent
    const levy = m >= TX.aggregatorLevyFromMonth ? (sc.levyOnGMV ? gmv : revenue) * TX.aggregatorLevyPct : 0;
    const taxRisk = sc.gst95 ? groomGMV * TX.gstRate / (1 + TX.gstRate) : 0; // s.9(5) downside: platform pays GST on grooming GMV
    const contribution = revenue - promo - incentives - payment - levy - taxRisk - marketing;

    // fixed costs
    const founder = step(TR.founderDraw, m);
    const opsStaff = C.opsHires.reduce((n, h) => n + (jobs >= h.atJobs ? 1 : 0), 0);
    const staff = opsStaff * C.opsSalary + cityLeadCost;
    const tools = step(TR.tools, m) + cityLeads * C.toolsPerExtraCity;
    const accounting = C.accounting + (gstOn ? C.accountingGST : 0);
    const insurance = calMonth(m) === calMonth(TR.insuranceFromMonth) && m >= TR.insuranceFromMonth ? C.insuranceAnnual * (1 + cityLeads * 0.5) : 0;
    const fixed = founder + staff + tools + accounting + insurance + C.misc;
    const ebitda = contribution - fixed;

    let capex = m === 0 ? prelaunchCost : 0;
    capex += citySetup;
    const activeRepeaters = cities.reduce((t, c) => t + (c.open !== null && m >= c.open ? c.repeaters : 0), 0);
    if (appBuilt === false && activeRepeaters >= A.tech.appTriggerRepeaters) { capex += TR.appCost; appBuilt = m; }
    const opCash = ebitda - capex;
    cumGMV += gmv; cumRev += revenue; cumOpCash += opCash; fyRev += revenue;
    if (gstFrom === null && fyRev > TX.gstThreshold) gstFrom = m + 1; // registration trigger: platform's own FY turnover

    // expansion gate (doc 11 §1: T1 volume, T3 contribution, T5 repeat — T2/T4 are people/reviews, assumed to follow)
    if (m >= 1 && sc.expand !== false) {
      const last = cities.filter((c) => c.open !== null).at(-1);
      const lc = r.cities.find((x) => x.city === last.name);
      const pass = last.idx === 0
        ? lc && lc.jobs >= X.gate.jobs && lc.repeatShare >= X.gate.repeat && lc.contribution > 0 && m >= X.gate.minMonth
        : lc && lc.jobs >= X.gate.jobs * last.sizeFactor * X.gate.nextCityShare && lc.contribution > 0 && m - last.open >= X.gate.minGapMonths;
      last.gateStreak = pass ? last.gateStreak + 1 : 0;
      const next = cities.find((c) => c.open === null);
      if (next && last.gateStreak >= X.gate.consecutive) next.open = m + X.cloneMonths;
    }

    Object.assign(r, {
      newCustomers: newCust, groomJobs, memberJobs, repeatJobs, healthJobs, walkPlans, walkTrials, jobs,
      repeatShare: groomJobs > 0 ? repeatJobs / groomJobs : 0,
      gmv, groomGMV, healthMRPpassThrough: healthMRP,
      commission, subscriptions: subs, providerFees: pro, supplies, revenue, takeRate: gmv ? revenue / gmv : 0,
      promo, incentives, payment, levy, taxRisk, marketing, contribution,
      founder, staff, opsStaff, tools, accounting, insurance, fixed, ebitda, capex, opCash,
      cumGMV, cumRevenue: cumRev, cumOpCash, members, groomers, walkers, vets,
      groomerNetEarnings: groomerNet, groomerJobsEach, gstRegistered: gstOn, splitPayments: split,
      citiesOpen: cities.filter((c) => c.open !== null && m >= c.open).map((c) => c.name),
    });
    rows.push(r);
  }

  const first = (pred) => { const x = rows.find(pred); return x ? { m: x.m, label: x.label } : null; };
  const minCum = Math.min(0, ...rows.map((x) => x.cumOpCash));
  const sum = (from, to, k) => rows.slice(from, to + 1).reduce((t, x) => t + x[k], 0);
  return {
    scenario: scName, tier: tierName, overrides: over,
    prices: { groomAOV: P.groomAOV, groomAOVExAddon: P.groomAOVExAddon, addonPerJob: P.addonPerJob, fullGroom: P.fullGroom, memberJob: P.memberJob, healthAOV: P.healthAOV, healthFeePerJob: P.healthFeePerJob, walkMonthly: P.walkMonthly, walkTrial: P.walkTrial },
    summary: {
      gmv1cr: first((x) => x.cumGMV >= CRORE),
      revenue1cr: first((x) => x.cumRevenue >= CRORE),
      contributionPositive: first((x) => x.m >= 1 && x.contribution > 0 && rows.slice(x.m, x.m + 3).every((y) => y.contribution > 0)),
      operatingBreakeven: first((x) => x.m >= 1 && x.ebitda > 0 && rows.slice(x.m, x.m + 3).every((y) => y.ebitda > 0)),
      paybackMonth: first((x) => x.m >= 1 && rows.slice(x.m).every((y) => y.cumOpCash >= 0)),
      peakCashNeed: -minCum,
      peakCashMonth: minCum < 0 ? first((x) => x.cumOpCash === minCum) : null,
      prelaunchCost,
      burnM1toM6: -Math.min(0, sum(1, 6, 'opCash')),
      gstRegisteredFrom: gstFrom === null ? null : { m: gstFrom, label: calLabel(gstFrom) },
      splitPaymentsFrom: splitPayFrom === null ? null : { m: splitPayFrom, label: calLabel(splitPayFrom) },
      citiesOpened: cities.filter((c) => c.open !== null && c.open <= H).map((c) => ({ city: c.name, m: c.open, label: calLabel(c.open) })),
      appBuilt: appBuilt === false ? null : { m: appBuilt, label: calLabel(appBuilt) },
      year1: { gmv: sum(1, 12, 'gmv'), revenue: sum(1, 12, 'revenue'), ebitda: sum(1, 12, 'ebitda') },
      year2: { gmv: sum(13, 24, 'gmv'), revenue: sum(13, 24, 'revenue'), ebitda: sum(13, 24, 'ebitda') },
      year3: { gmv: sum(25, 36, 'gmv'), revenue: sum(25, 36, 'revenue'), ebitda: sum(25, 36, 'ebitda') },
      milestones: [1, 3, 6, 12, 18, 24, 36, 48, 60].filter((m) => m <= H).map((m) => snap(rows[m])),
    },
    rows,
  };
}
const snap = (r) => ({ m: r.m, label: r.label, jobs: r.jobs, members: r.members, takeRate: r.takeRate, newCustomers: r.newCustomers, repeatShare: r.repeatShare, gmv: r.gmv, revenue: r.revenue, contribution: r.contribution, ebitda: r.ebitda, cumGMV: r.cumGMV, cumRevenue: r.cumRevenue, cumOpCash: r.cumOpCash, groomers: r.groomers, walkers: r.walkers, vets: r.vets, groomerNet: r.groomerNetEarnings, cities: r.citiesOpen.length, opsStaff: r.opsStaff });

// ---------- build ----------
const runs = {
  conservative: run('conservative'),
  base: run('base'),
  aggressive: run('aggressive'),
};
const tiers = { bootstrap: run('base', { tier: 'bootstrap' }), recommended: runs.base };
const sens = A.sensitivities.map((s) => {
  const o = run('base', s.over);
  return { name: s.name, note: s.note ?? '', over: s.over, gmv1cr: o.summary.gmv1cr, revenue1cr: o.summary.revenue1cr, peakCashNeed: o.summary.peakCashNeed, operatingBreakeven: o.summary.operatingBreakeven };
});
const inv = A.investment;
const tot = (arr, k) => arr.reduce((t, it) => t + it[k], 0);
const investment = {
  prelaunch: inv.prelaunch, perCity: inv.perCity,
  totals: {
    prelaunch: { standard: tot(inv.prelaunch, 'standard'), lowcost: tot(inv.prelaunch, 'lowcost') },
    perCity: { standard: tot(inv.perCity, 'standard'), lowcost: tot(inv.perCity, 'lowcost') },
  },
  funding: Object.fromEntries(Object.entries(tiers).map(([k, v]) => [k, {
    prelaunch: v.summary.prelaunchCost, burnM1toM6: v.summary.burnM1toM6, peakCashNeed: v.summary.peakCashNeed,
    peakCashMonth: v.summary.peakCashMonth, recommendedRaise: Math.ceil(v.summary.peakCashNeed * (1 + A.funding.buffer) / 50000) * 50000,
  }])),
};
const strip = (o) => ({ ...o, rows: o.rows.map(({ cities, ...rest }) => ({ ...rest, cities })) });
const out = {
  generated: A.meta.asOf, crore: CRORE, horizon: A.timeline.horizon,
  scenarios: Object.fromEntries(Object.entries(runs).map(([k, v]) => [k, strip(v)])),
  tiers: { bootstrap: strip(tiers.bootstrap) },
  sensitivities: sens,
  investment,
};
fs.writeFileSync(path.join(DIR, 'model-output.json'), JSON.stringify(out, (k, v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v), 1));

// ---------- console summary ----------
const fm = (x) => (x == null ? 'not by M' + A.timeline.horizon : `M${x.m} ${x.label}`);
const L = (n) => `₹${(n / LAKH).toFixed(2)}L`;
const line = (k, v) => {
  const s = v.summary;
  console.log(`${k.padEnd(22)} AOV ₹${v.prices.groomAOV.toFixed(0)} | ₹1Cr GMV ${fm(s.gmv1cr)} | ₹1Cr revenue ${fm(s.revenue1cr)} | contrib+ ${fm(s.contributionPositive)} | EBITDA+ ${fm(s.operatingBreakeven)} | peak cash ${L(s.peakCashNeed)} | GST reg ${fm(s.gstRegisteredFrom)} | split-pay ${fm(s.splitPaymentsFrom)} | cities ${s.citiesOpened.map((c) => `${c.city.split(' ')[0]}@M${c.m}`).join(',')}`);
};
for (const [k, v] of Object.entries(runs)) line(k, v);
line('base · bootstrap tier', tiers.bootstrap);
for (const ms of runs.base.summary.milestones) {
  console.log(`  base M${ms.m} ${ms.label}: jobs ${ms.jobs.toFixed(0)} new ${ms.newCustomers.toFixed(0)} repeat ${(ms.repeatShare * 100).toFixed(0)}% GMV ${L(ms.gmv)} rev ${L(ms.revenue)} contrib ${L(ms.contribution)} EBITDA ${L(ms.ebitda)} groomers ${ms.groomers} net/groomer ₹${ms.groomerNet.toFixed(0)} cumCash ${L(ms.cumOpCash)} cities ${ms.cities}`);
}
for (const s of sens) console.log(`  sens ${s.name.padEnd(34)} GMV ${fm(s.gmv1cr)} | rev ${fm(s.revenue1cr)} | peak ${L(s.peakCashNeed)} | EBITDA+ ${fm(s.operatingBreakeven)}`);
console.log(`  investment: pre-launch standard ${L(investment.totals.prelaunch.standard)} / low-cost ${L(investment.totals.prelaunch.lowcost)}; per city ${L(investment.totals.perCity.standard)} / ${L(investment.totals.perCity.lowcost)}; raise (rec) ${L(investment.funding.recommended.recommendedRaise)} / (boot) ${L(investment.funding.bootstrap.recommendedRaise)}`);

// ---------- --check ----------
if (process.argv.includes('--check')) {
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  for (const [k, v] of Object.entries({ ...runs, bootstrap: tiers.bootstrap })) {
    let g = 0, rv = 0, oc = 0;
    for (const r of v.rows) {
      g += r.gmv; rv += r.revenue; oc += r.opCash;
      ok(Math.abs(g - r.cumGMV) < 1, `${k} M${r.m}: cumGMV ≠ Σ gmv`);
      ok(Math.abs(rv - r.cumRevenue) < 1, `${k} M${r.m}: cumRevenue ≠ Σ revenue`);
      ok(Math.abs(oc - r.cumOpCash) < 1, `${k} M${r.m}: cumOpCash ≠ Σ opCash`);
      ok(r.revenue <= r.gmv, `${k} M${r.m}: revenue > GMV`);
      ok(r.groomers * A.supply.groomerJobsPerDay * A.supply.workDays >= r.groomJobs, `${k} M${r.m}: groomer capacity < groom jobs`);
      ok(Math.abs(r.contribution - (r.revenue - r.promo - r.incentives - r.payment - r.levy - r.taxRisk - r.marketing)) < 1e-6, `${k} M${r.m}: contribution identity`);
      ok(Math.abs(r.ebitda - (r.contribution - r.fixed)) < 1e-6, `${k} M${r.m}: EBITDA identity`);
      ok(Math.abs(r.opCash - (r.ebitda - r.capex)) < 1e-6, `${k} M${r.m}: cash identity`);
      ok(r.cities.reduce((t, c) => t + c.gmv, 0) - r.gmv < 1 || r.m === 0, `${k} M${r.m}: city GMV ≠ total`);
    }
    const s = v.summary;
    if (s.gmv1cr) ok(v.rows[s.gmv1cr.m].cumGMV >= CRORE && (s.gmv1cr.m === 0 || v.rows[s.gmv1cr.m - 1].cumGMV < CRORE), `${k}: gmv1cr not the first crossing`);
    if (s.revenue1cr) {
      ok(v.rows[s.revenue1cr.m].cumRevenue >= CRORE && v.rows[s.revenue1cr.m - 1].cumRevenue < CRORE, `${k}: revenue1cr not the first crossing`);
      ok(s.gmv1cr && s.gmv1cr.m <= s.revenue1cr.m, `${k}: revenue crossed ₹1 Cr before GMV`);
    }
    ok(Math.abs(s.peakCashNeed + Math.min(0, ...v.rows.map((r) => r.cumOpCash))) < 1, `${k}: peak cash ≠ −min cumulative cash`);
    const bad = v.rows.filter((r) => r.m >= 4 && r.groomerNetEarnings < A.supply.minGroomerNet);
    if (bad.length) console.log(`  ⚠ ${k}: avg groomer net < ₹${A.supply.minGroomerNet} in ${bad.length} month(s) from M4 (first ${bad[0].label}: ₹${bad[0].groomerNetEarnings.toFixed(0)})`);
  }
  const order = ['conservative', 'base', 'aggressive'];
  const mOf = (x) => (x ? x.m : Infinity);
  for (let i = 0; i < 2; i++) {
    const a = runs[order[i]].summary, b = runs[order[i + 1]].summary;
    ok(mOf(a.gmv1cr) >= mOf(b.gmv1cr), `order: ${order[i]} hits ₹1 Cr GMV before ${order[i + 1]}`);
    ok(mOf(a.revenue1cr) >= mOf(b.revenue1cr), `order: ${order[i]} hits ₹1 Cr revenue before ${order[i + 1]}`);
  }
  // AOV recomputed independently from pricing.json for the base mix (no price multiplier)
  const size = A.demand.sizeSplit;
  let hand = 0;
  for (const g of A.mix.groom) {
    const p = servicePrice(g.id);
    hand += g.share * (p.type === 'by_size' ? size.small * p.small + size.medium * p.medium + size.large * p.large : p.price);
  }
  const pb = runs.base.prices;
  ok(Math.abs(hand - pb.groomAOVExAddon) < 0.01, `AOV hand-check ${hand} ≠ ${pb.groomAOVExAddon}`);
  console.log(`  AOV check: groom mix ₹${hand.toFixed(2)} (hand) = ₹${pb.groomAOVExAddon.toFixed(2)} (model) + tick add-on ₹${pb.addonPerJob.toFixed(2)} = ₹${pb.groomAOV.toFixed(2)}; member job ₹${pb.memberJob.toFixed(2)}; vet-line service AOV ₹${pb.healthAOV.toFixed(2)} (platform fee ₹${pb.healthFeePerJob.toFixed(2)}/job); walk plan ₹${pb.walkMonthly.toFixed(2)}/mo`);
  if (fails.length) { console.error(`CHECK FAILED (${fails.length}):\n  ` + fails.slice(0, 30).join('\n  ')); process.exit(1); }
  console.log('CHECK OK');
}
