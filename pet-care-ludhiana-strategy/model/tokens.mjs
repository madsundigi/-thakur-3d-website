#!/usr/bin/env node
// Turns model-output.json + assumptions.json into tokens.json: every number the written plan quotes, pre-formatted,
// keyed by a stable name. The plan's prose uses {{token}} placeholders; build-report.mjs resolves them, so the
// document can never drift from the model. Run after `node model.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const O = JSON.parse(fs.readFileSync(path.join(DIR, 'model-output.json'), 'utf8'));
const A = JSON.parse(fs.readFileSync(path.join(DIR, 'assumptions.json'), 'utf8'));
const T = {};

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const money = (n) => {
  const a = Math.abs(n), s = n < 0 ? '−' : '';
  if (a >= 1e7) return `${s}₹${(a / 1e7).toFixed(2)} crore`;
  if (a >= 1e5) return `${s}₹${(a / 1e5).toFixed(1)} lakh`;
  return s + inr(a);
};
const pct = (x, d = 0) => `${(x * 100).toFixed(d)}%`;
const when = (x) => (x ? `${x.label} (month ${x.m})` : `not within ${O.horizon} months`);
const whenShort = (x) => (x ? x.label : `beyond ${O.horizon} months`);
const int = (n) => Math.round(n).toLocaleString('en-IN');

const runs = { ...O.scenarios, bootstrap: O.tiers.bootstrap };
for (const [k, r] of Object.entries(runs)) {
  const s = r.summary;
  T[`${k}.gmv1cr`] = when(s.gmv1cr);
  T[`${k}.gmv1cr.short`] = whenShort(s.gmv1cr);
  T[`${k}.rev1cr`] = when(s.revenue1cr);
  T[`${k}.rev1cr.short`] = whenShort(s.revenue1cr);
  T[`${k}.contribPositive`] = when(s.contributionPositive);
  T[`${k}.ebitdaPositive`] = when(s.operatingBreakeven);
  T[`${k}.payback`] = when(s.paybackMonth);
  T[`${k}.peakCash`] = money(s.peakCashNeed);
  T[`${k}.peakCashMonth`] = when(s.peakCashMonth);
  T[`${k}.gstReg`] = when(s.gstRegisteredFrom);
  T[`${k}.app`] = when(s.appBuilt);
  T[`${k}.cities`] = s.citiesOpened.filter((c) => c.m > 1).map((c) => `${c.city} (${c.label})`).join(', ') || 'none';
  for (const c of s.citiesOpened) T[`${k}.city.${c.city.split(' ')[0].toLowerCase()}`] = `${c.label} (month ${c.m})`;
  for (const y of ['year1', 'year2', 'year3']) {
    T[`${k}.${y}.gmv`] = money(s[y].gmv);
    T[`${k}.${y}.rev`] = money(s[y].revenue);
    T[`${k}.${y}.ebitda`] = money(s[y].ebitda);
  }
  for (const ms of s.milestones) {
    const p = `${k}.m${ms.m}`;
    T[`${p}.label`] = ms.label;
    T[`${p}.jobs`] = int(ms.jobs);
    T[`${p}.new`] = int(ms.newCustomers);
    T[`${p}.repeat`] = pct(ms.repeatShare);
    T[`${p}.gmv`] = money(ms.gmv);
    T[`${p}.rev`] = money(ms.revenue);
    T[`${p}.ebitda`] = money(ms.ebitda);
    T[`${p}.cumGmv`] = money(ms.cumGMV);
    T[`${p}.cumRev`] = money(ms.cumRevenue);
    T[`${p}.groomers`] = int(ms.groomers);
    T[`${p}.walkers`] = int(ms.walkers);
    T[`${p}.vets`] = int(ms.vets);
    T[`${p}.groomerNet`] = inr(Math.round(ms.groomerNet / 100) * 100);
    T[`${p}.cities`] = String(ms.cities);
    T[`${p}.opsStaff`] = String(ms.opsStaff);
  }
}
// Ludhiana-only and other sensitivities
for (const [i, s] of O.sensitivities.entries()) {
  const key = `sens.${i}`;
  T[`${key}.name`] = s.name;
  T[`${key}.gmv1cr`] = whenShort(s.gmv1cr);
  T[`${key}.rev1cr`] = whenShort(s.revenue1cr);
  T[`${key}.peakCash`] = money(s.peakCashNeed);
}
const ludOnly = O.sensitivities.find((s) => s.name.startsWith('Ludhiana only'));
T['ludhianaOnly.gmv1cr'] = whenShort(ludOnly.gmv1cr);
T['ludhianaOnly.rev1cr'] = whenShort(ludOnly.revenue1cr);
T['ludhianaOnly.peakCash'] = money(ludOnly.peakCashNeed);
const s95 = O.sensitivities.find((s) => s.name.includes('9(5)'));
T['gst95.peakCash'] = money(s95.peakCashNeed);
T['gst95.ebitdaPositive'] = whenShort(s95.operatingBreakeven);

// prices & unit economics (base)
const P = O.scenarios.base.prices;
T['price.aov'] = inr(P.groomAOV);
T['price.memberJob'] = inr(P.memberJob);
T['price.healthFee'] = inr(P.healthFeePerJob);
T['price.walkAvg'] = inr(P.walkMonthly);

// assumptions people will quote
const tk = A.take.groomByAge;
T['a.take.launch'] = pct(tk[0][1]);
T['a.take.std'] = pct(tk[1][1]);
T['a.take.mature'] = pct(tk[2][1]);
T['a.take.stdFrom'] = `month ${tk[1][0] + 1}`;
T['a.take.matureFrom'] = `month ${tk[2][0] + 1}`;
T['a.take.cap'] = inr(A.take.groomCap);
T['a.take.walk'] = pct(A.take.walk);
T['a.vetFee'] = inr(A.mix.health.find((h) => h.id === 'vet-visit').flatFee);
T['a.vaccFee'] = inr(A.mix.health.find((h) => h.id === 'vaccination').flatFee);
T['a.dewormTake'] = pct(A.take.healthPct);
T['a.clubFee'] = `${inr(A.offers.groomClubFeeYear)}/year`;
T['a.proFee'] = `${inr(A.offers.proFee)}/month`;
T['a.proStart'] = `month ${A.offers.proStartMonth}`;
T['a.tam'] = int(A.demand.ludhianaTAM);
T['a.repeatStart'] = pct(A.demand.repeatRate.start);
T['a.repeatMature'] = pct(A.demand.repeatRate.mature);
T['a.cac.meta'] = inr(A.demand.cac.metaAds);
T['a.cac.rwa'] = inr(A.demand.cac.rwaFlyers);
T['a.cac.vet'] = inr(A.demand.cac.vetPetshop);
T['a.cac.influencer'] = inr(A.demand.cac.influencer);
T['a.cac.gbp'] = inr(A.demand.cac.gbpSeo);
T['a.referralShare'] = pct(A.demand.referralShareOfNew);
T['a.consumables'] = inr(A.supply.consumablesPerJob);
T['a.travel'] = inr(A.supply.travelPerJob);
T['a.minGroomerNet'] = inr(A.supply.minGroomerNet);
T['a.guarantee'] = `${inr(A.supply.launchGuarantee.monthly)}/month for ${A.supply.launchGuarantee.providers} groomers × ${A.supply.launchGuarantee.months} months`;
T['a.opsHire1'] = int(A.costs.opsHires[0].atJobs);
T['a.opsHire2'] = int(A.costs.opsHires[1].atJobs);
T['a.opsSalary'] = inr(A.costs.opsSalary);
T['a.gstThreshold'] = money(A.tax.gstThreshold);
T['a.levy'] = pct(A.tax.aggregatorLevyPct);
T['a.founder.rec'] = A.tiers.recommended.founderDraw.filter(([, v]) => v > 0).map(([m, v]) => `${inr(v)}/month from month ${m}`).join(', ');
T['a.founder.boot'] = A.tiers.bootstrap.founderDraw.filter(([, v]) => v > 0).map(([m, v]) => `${inr(v)}/month from month ${m}`).join(', ');
T['a.app.rec'] = money(A.tiers.recommended.appCost);
T['a.app.boot'] = money(A.tiers.bootstrap.appCost);
T['a.appTrigger'] = int(A.tech.appTriggerRepeaters);
T['a.cityLead.rec'] = `${inr(A.tiers.recommended.cityLead.salary)}/month salary`;
T['a.cityLead.boot'] = `${inr(A.tiers.bootstrap.cityLead.retainer)}/month + ${pct(A.tiers.bootstrap.cityLead.revShare)} of city revenue`;
T['a.mktFixed.rec'] = `${inr(A.tiers.recommended.marketingFixedPerCity)}/month`;
T['a.mktFixed.boot'] = `${inr(A.tiers.bootstrap.marketingFixedPerCity)}/month`;
T['a.adsStart.rec'] = `month ${A.tiers.recommended.adsStartMonth}`;
T['a.adsStart.boot'] = `month ${A.tiers.bootstrap.adsStartMonth}`;

// investment
const I = O.investment;
T['inv.prelaunch.std'] = money(I.totals.prelaunch.standard);
T['inv.prelaunch.low'] = money(I.totals.prelaunch.lowcost);
T['inv.perCity.std'] = money(I.totals.perCity.standard);
T['inv.perCity.low'] = money(I.totals.perCity.lowcost);
for (const t of ['recommended', 'bootstrap']) {
  const f = I.funding[t];
  const k = t === 'recommended' ? 'rec' : 'boot';
  T[`inv.${k}.burn6`] = money(f.burnM1toM6);
  T[`inv.${k}.peak`] = money(f.peakCashNeed);
  T[`inv.${k}.raise`] = money(f.recommendedRaise);
}
T['timeline.m0'] = O.scenarios.base.rows[0].label;
T['timeline.m1'] = O.scenarios.base.rows[1].label;


// unit economics of single jobs (today's prices, standard take, provider bears GST on commission once registered)
const PR = JSON.parse(fs.readFileSync(path.join(DIR, A.pricingPath), 'utf8'));
const svc = (id) => PR.services.find((x) => x.id === id).pricing;
const std = A.take.groomByAge[1][1], mat = A.take.groomByAge[2][1], cap = A.take.groomCap, g = A.tax.gstRate;
const job = (key, price, t) => {
  const raw = price * t, comm = Math.min(raw, cap), gst = comm * g;
  T[`ue.${key}.price`] = inr(price);
  T[`ue.${key}.commRaw`] = inr(raw);
  T[`ue.${key}.comm`] = inr(comm);
  T[`ue.${key}.gst`] = inr(gst);
  T[`ue.${key}.provider`] = inr(price - comm);
  T[`ue.${key}.providerNet`] = inr(price - comm - gst - A.supply.consumablesPerJob - A.supply.travelPerJob);
  T[`ue.${key}.effTake`] = pct(comm / price, 1);
};
job('mfg', svc('full-groom').medium, std);
job('lspa', svc('premium-spa').large, mat);
job('sbb', svc('bath-brush').small, std);
const w1 = PR.services.find((x) => x.id === 'dog-walking').pricing.plans.find((x) => x.id === 'walk-1x').price;
T['ue.walk.price'] = inr(w1);
T['ue.walk.comm'] = inr(w1 * A.take.walk);
T['ue.walk.perWalk'] = inr((w1 * (1 - A.take.walk)) / 30);
const vf = A.mix.health.find((h) => h.id === 'vet-visit').flatFee;
T['ue.vet.price'] = inr(svc('vet-visit').price);
T['ue.vet.fee'] = inr(vf);
T['ue.vet.vetGets'] = inr(svc('vet-visit').price - vf);
T['ue.consumables'] = inr(A.supply.consumablesPerJob);
T['ue.travel'] = inr(A.supply.travelPerJob);
// hire / gate months (base)
const rowsB = O.scenarios.base.rows;
const firstM = (pred) => { const r = rowsB.find(pred); return r ? `${r.label} (month ${r.m})` : `not within ${O.horizon} months`; };
T['base.opsHire1'] = firstM((r) => r.opsStaff >= 1);
T['base.opsHire2'] = firstM((r) => r.opsStaff >= 2);
T['base.jobs600'] = firstM((r) => r.m >= 1 && (r.cities.find((c) => c.city === 'Ludhiana')?.jobs ?? 0) >= 600);
T['base.groomers10'] = firstM((r) => r.groomers >= 10);
T['base.repeat40'] = firstM((r) => r.m >= 1 && r.repeatShare >= 0.4);

fs.writeFileSync(path.join(DIR, 'tokens.json'), JSON.stringify(T, null, 1));
console.log(`${Object.keys(T).length} tokens`);
