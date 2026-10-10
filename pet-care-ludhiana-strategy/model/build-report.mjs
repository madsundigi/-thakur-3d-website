#!/usr/bin/env node
// Assembles the plan: sections.json (writers' prose, token form) + tokens.json + model-output.json + assumptions.json +
// facts.json → ../LAUNCH-TO-1-CRORE.md (repo document) and, with --html <out.html>, the interactive web page.
//   node model.mjs && node tokens.mjs && node build-report.mjs [--html /path/to/page.html]
// Fails (exit 1) on any unresolved {{token}} or any [Rx-yy] citation that is not in facts.json.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.dirname(url.fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const T = read('tokens.json');
const O = read('model-output.json');
const A = read('assumptions.json');
const F = read('facts.json');
const S = read('sections.json');
const FACT = Object.fromEntries(F.facts.map((f) => [f.id, f]));

const problems = [];
const resolve = (md, where) => md.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, k) => {
  if (k in T) return T[k];
  problems.push(`${where}: unresolved token ${k}`);
  return m;
});
const checkCites = (md, where) => {
  for (const m of md.matchAll(/\[(R[1-5]-\d{2})\]/g)) if (!FACT[m[1]]) problems.push(`${where}: unknown fact ${m[1]}`);
};

// ---------- formatting helpers ----------
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const money = (n) => {
  const a = Math.abs(n), s = n < 0 ? '−' : '';
  if (a >= 1e7) return `${s}₹${(a / 1e7).toFixed(2)} Cr`;
  if (a >= 1e5) return `${s}₹${(a / 1e5).toFixed(1)} L`;
  return s + inr(a);
};
const when = (x) => (x ? `${x.label} (M${x.m})` : `not by M${O.horizon}`);
const mdTable = (head, rows) => [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');

// ---------- generated sections ----------
const runs = { conservative: O.scenarios.conservative, base: O.scenarios.base, aggressive: O.scenarios.aggressive, bootstrap: O.tiers.bootstrap };
const runLabel = { conservative: 'Conservative', base: 'Base (recommended tier)', aggressive: 'Aggressive', bootstrap: 'Base demand, bootstrap tier' };

function numbersSection() {
  const sc = mdTable(['Scenario', '₹1 Cr GMV', '₹1 Cr platform revenue', 'Monthly profit (EBITDA) turns positive', 'Peak cash need'],
    Object.entries(runs).map(([k, r]) => [runLabel[k], when(r.summary.gmv1cr), when(r.summary.revenue1cr), when(r.summary.operatingBreakeven), money(r.summary.peakCashNeed)]));
  const ms = mdTable(['Month', 'Jobs', 'GMV', 'Platform revenue', 'Cumulative GMV / revenue'],
    O.scenarios.base.summary.milestones.map((x) => [`M${x.m} · ${x.label}`, Math.round(x.jobs).toLocaleString('en-IN'), money(x.gmv), money(x.revenue), `${money(x.cumGMV)} / ${money(x.cumRevenue)}`]));
  const yr = mdTable(['Year (from launch)', 'GMV', 'Platform revenue', 'EBITDA'],
    ['year1', 'year2', 'year3'].map((y, i) => [`Year ${i + 1}`, money(O.scenarios.base.summary[y].gmv), money(O.scenarios.base.summary[y].revenue), money(O.scenarios.base.summary[y].ebitda)]));
  const se = mdTable(['What changes (base case)', '₹1 Cr GMV', '₹1 Cr revenue', 'Peak cash need'],
    [['Base case as modelled', when(O.scenarios.base.summary.gmv1cr), when(O.scenarios.base.summary.revenue1cr), money(O.scenarios.base.summary.peakCashNeed)],
      ...O.sensitivities.map((s) => [s.name, when(s.gmv1cr), when(s.revenue1cr), money(s.peakCashNeed)])]);
  return `## The numbers: scenarios, milestones and what moves them

Every figure in this plan comes from one model (\`pet-care-ludhiana-strategy/model/\`). It runs month by month from the pre-launch pilot (M0 = ${T['timeline.m0']}) through public launch (M1 = ${T['timeline.m1']}) for ${O.horizon} months. Demand follows a word-of-mouth adoption curve for each city, sized from the researched Ludhiana market with a cautious ramp. It runs below the website plan's 15 / 60 / 150 booking targets at months 3 and 6, which stay as stretch targets. Repeat customers, Groom Club members, walking plans and vet visits build on top. Commission comes from today's price list, and costs from the research. These are **planning numbers, not forecasts**: they show what has to be true, and you replace them with real data month by month.

**GMV** is everything customers pay for services booked through PetDoorStep. **Platform revenue** is what PetDoorStep keeps: commission, Groom Club fees, provider Pro fees and the supplies margin, excluding GST. **EBITDA** is monthly operating profit before tax and one-off spends (pre-launch setup, new-city setup, the app build). **Peak cash need** is the deepest your cumulative cash goes, including those one-off spends. It is the amount you must have available.

### Four scenarios

${sc}

Conservative = a smaller market (0.7× Ludhiana's 5,000 lifetime trial customers), slower word of mouth and lower repeat rates. Aggressive = a 1.3× market with faster growth. The bootstrap row keeps base-case demand but uses the low-cost spending choices throughout (see Investment).

### Base case, month by month

${ms}

${yr}

### What moves the dates

${se}

The two lines that matter most: **Ludhiana alone never reaches ₹1 crore of platform revenue inside five years**, so the second milestone depends on the Punjab expansion. And **if grooming were taxed under GST s.9(5)**, the business would not make money at today's prices. A CA must rule that out before launch (see Legal).`;
}

function appendixAssumptions() {
  const rows = Object.entries(A.sources).map(([k, v]) => [`\`${k}\``, v.replace(/\|/g, '/')]);
  const inv = [...A.investment.prelaunch, ...A.investment.perCity].map((it) => [it.item, it.tradeoff.replace(/\|/g, '/'), it.src]);
  return `## Appendix A — Assumptions and where they come from

The model's inputs live in \`model/assumptions.json\`. Change a number, then run \`node model.mjs --check && node tokens.mjs && node build-report.mjs\` and this document regenerates with the new dates.

${mdTable(['Assumption', 'Source / reasoning'], rows)}

### Investment line items: trade-offs and sources

${mdTable(['Item', 'Trade-off of the low-cost option', 'Source'], inv)}`;
}

function appendixSources(cited) {
  const ids = [...cited].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const rows = ids.map((id) => {
    const f = FACT[id];
    return [id, f.claim.replace(/\|/g, '/'), `[${f.source_name.replace(/\|/g, '/').slice(0, 60)}](${f.source_url})`, f.date, f.confidence];
  });
  return `## Appendix B — Research sources

${F.facts.length} facts were gathered on 10 Oct 2026 by five research passes (marketplace economics, supply, legal/tax, demand/marketing, payments/funding). The ${ids.length} cited in this plan are listed below. Confidence: **H** = official/primary and current; **M** = reputable secondary or slightly dated; **L** = indicative only. The legal/tax pass ran without web access, so its facts reflect established law and **must be confirmed by a CA or lawyer**. Every web source was read from search results rather than the full page. Re-verify any figure before you rely on it.

${mdTable(['Id', 'Claim', 'Source', 'Date', 'Conf.'], rows)}`;
}

// ---------- assemble markdown ----------
const order = ['summary', 'model', 'conflicts', 'next30', 'days90', 'supply', 'demand', 'ops', 'NUMBERS', 'investment', 'funding', 'legal', 'team', 'kpis', 'roadmap', 'risks', 'decisions'];
const byId = Object.fromEntries(S.sections.map((s) => [s.id, s]));
const parts = [];
const cited = new Set();
for (const id of order) {
  if (id === 'NUMBERS') { parts.push({ id: 'numbers', md: numbersSection() }); continue; }
  const s = byId[id];
  if (!s) { problems.push(`missing section ${id}`); continue; }
  let md = resolve(s.markdown.trim(), id);
  checkCites(md, id);
  for (const m of md.matchAll(/\[(R[1-5]-\d{2})\]/g)) cited.add(m[1]);
  parts.push({ id, md });
}
parts.push({ id: 'appendix-a', md: appendixAssumptions() });
parts.push({ id: 'appendix-b', md: appendixSources(cited) });

const front = `# PetDoorStep — launch to the first ₹1 crore

**Business plan, financial model and investment breakdown · Ludhiana first, then Punjab · prepared 10 Oct 2026**

What this plan covers: what to do next, from today to the first ₹1 crore, across every part of the business. That includes an investment breakdown with a low-cost alternative for every line item. It assumes PetDoorStep runs as an asset-light marketplace. Independent groomers, walkers and registered vets deliver the services, and PetDoorStep earns commission and subscriptions. Sunny works on it full-time and manages it.

Because PetDoorStep earns a commission, "₹1 crore" has two meanings, and this plan tracks both: **₹1 crore of GMV** (what customers pay for services booked through PetDoorStep) and **₹1 crore of platform revenue** (what PetDoorStep itself keeps).

The numbers come from a reproducible model in \`model/\` (\`assumptions.json\` → \`model.mjs\` → \`model-output.json\`), built on 174 researched facts (\`model/facts.json\`). Figures in **[R2-23]**-style brackets cite those facts (Appendix B). This plan supersedes the projections in the earlier strategy report.

## Contents

${parts.map((p) => {
  const title = (p.md.match(/^##\s+(.+)$/m) || [, p.id])[1];
  return `- [${title}](#${slug(title)})`;
}).join('\n')}
`;
function slug(t) { return t.toLowerCase().replace(/[₹]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); }

const markdown = [front, ...parts.map((p) => p.md)].join('\n\n---\n\n') + '\n';
fs.writeFileSync(path.join(DIR, '..', 'LAUNCH-TO-1-CRORE.md'), markdown);

if (problems.length) {
  console.error(`BUILD PROBLEMS (${problems.length}):\n  ` + problems.join('\n  '));
  process.exitCode = 1;
}
console.log(`LAUNCH-TO-1-CRORE.md: ${parts.length} sections, ${cited.size} facts cited, ${markdown.length.toLocaleString()} chars`);

// ---------- HTML page ----------
const htmlIdx = process.argv.indexOf('--html');
if (htmlIdx > 0) {
  const out = process.argv[htmlIdx + 1];
  const tpl = fs.readFileSync(path.join(DIR, 'page-template.html'), 'utf8');
  const sectionsHtml = parts.map((p) => {
    const title = (p.md.match(/^##\s+(.+)$/m) || [, p.id])[1];
    const body = mdToHtml(p.md.replace(/^##\s+.+$/m, '').trim());
    return { id: slug(title), title, html: body, key: p.id };
  });
  const data = {
    tokens: T,
    scenarios: Object.fromEntries(Object.entries(runs).map(([k, r]) => [k, {
      label: runLabel[k], summary: r.summary,
      rows: r.rows.map((x) => ({ m: x.m, label: x.label, jobs: Math.round(x.jobs), gmv: Math.round(x.gmv), revenue: Math.round(x.revenue), contribution: Math.round(x.contribution), ebitda: Math.round(x.ebitda), cumGMV: Math.round(x.cumGMV), cumRevenue: Math.round(x.cumRevenue), cumOpCash: Math.round(x.cumOpCash), groomers: x.groomers, cities: x.citiesOpen.length, repeat: Math.round(x.repeatShare * 100) })),
    }])),
    sensitivities: O.sensitivities,
    investment: { prelaunch: A.investment.prelaunch, perCity: A.investment.perCity, totals: O.investment.totals, funding: O.investment.funding },
  };
  const html = tpl
    .replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c'))
    .replace('<!--__TOC__-->', sectionsHtml.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join(''))
    .replace('<!--__SECTIONS__-->', sectionsHtml.map((s) => `<section class="doc-section" id="${s.id}" data-key="${s.key}"><h2>${inline(s.title)}</h2>${s.html}</section>`).join('\n'));
  fs.writeFileSync(out, html);
  console.log(`HTML page → ${out} (${(html.length / 1024).toFixed(0)} KB)`);
}

// ---------- tiny markdown → HTML (the subset the plan uses) ----------
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function inline(s) {
  let h = esc(s);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/\[(R[1-5]-\d{2})\](?!\()/g, (m, id) => {
    const f = FACT[id];
    return `<a class="cite" href="#src-${id.toLowerCase()}" title="${esc(f ? f.claim.slice(0, 160) : '')}">${id}</a>`;
  });
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  h = h.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:]|$)/g, '$1<em>$2</em>');
  return h;
}
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  const isTableSep = (l) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l);
  const cells = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim());
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^---+\s*$/.test(l)) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{3,4})\s+(.+)$/))) {
      const lvl = m[1].length;
      const id = slug(m[2]);
      out.push(`<h${lvl} id="${id}">${inline(m[2])}</h${lvl}>`); i++; continue;
    }
    if (l.trim().startsWith('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = cells(l);
      i += 2;
      const body = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { body.push(cells(lines[i])); i++; }
      const isSources = head[0] === 'Id' && head[1] === 'Claim';
      out.push(`<div class="table-wrap"><table${isSources ? ' class="sources"' : ''}><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr${isSources ? ` id="src-${r[0].toLowerCase()}"` : ''}>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>\s?/.test(l)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote>${mdToHtml(buf.join('\n'))}</blockquote>`); continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      // list block (supports one nested level by indentation and "- [ ]" checkboxes)
      const items = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        const line = lines[i];
        const mm = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (mm) items.push({ indent: mm[1].length, ordered: /\d/.test(mm[2]), text: mm[3] });
        else items[items.length - 1].text += ' ' + line.trim();
        i++;
      }
      out.push(renderList(items, 0, items[0].indent));
      continue;
    }
    // paragraph
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{3,4})\s/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) && !lines[i].trim().startsWith('|') && !/^>\s?/.test(lines[i]) && !/^---+\s*$/.test(lines[i])) { buf.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}
function renderList(items, start, indent) {
  const ordered = items[start].ordered;
  let html = ordered ? '<ol>' : '<ul>';
  let i = start;
  const hasChecks = items.some((x) => /^\[[ xX]\]\s/.test(x.text));
  if (hasChecks && !ordered) html = '<ul class="checklist">';
  while (i < items.length && items[i].indent >= indent) {
    const it = items[i];
    if (it.indent > indent) { i++; continue; }
    let text = it.text, check = '';
    const cm = text.match(/^\[([ xX])\]\s+(.*)$/);
    if (cm) {
      const cid = 'chk-' + slug(cm[2]).slice(0, 48);
      check = `<input type="checkbox" id="${cid}" data-chk="${cid}"${cm[1] !== ' ' ? ' checked' : ''}><label for="${cid}">`;
      text = cm[2];
    }
    let child = '';
    if (i + 1 < items.length && items[i + 1].indent > indent) child = renderList(items, i + 1, items[i + 1].indent);
    html += `<li>${check}${inline(text)}${check ? '</label>' : ''}${child}</li>`;
    i++;
    while (i < items.length && items[i].indent > indent) i++;
  }
  return html + (ordered ? '</ol>' : '</ul>');
}
