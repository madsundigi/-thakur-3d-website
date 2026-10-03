// Minimal, dependency-free HTML parser for the build gates (scripts/check-*.mjs). It is built for Astro's own output
// (well-formed, explicit end tags), not as a general HTML5 parser: raw-text elements (script, style) and RCDATA
// (title, textarea) are honoured, void elements and `/>` self-closing are handled, a few optional end tags close
// implicitly (li, p, option, dt/dd, tr, td/th), stray end tags are ignored, and entities are decoded.
//
// Nodes: { type: 'root' | 'element' | 'text', tag, attrs, children, parent, value }. Tag and attribute names are
// lower-cased; attribute values and text are entity-decoded; a bare attribute has the value ''.

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style']);
const RCDATA = new Set(['title', 'textarea']);
// A start tag of the key closes an open element listed in the value (only the innermost open element is checked).
const IMPLIED_END = {
  li: ['li'], p: ['p'], option: ['option'], dt: ['dt', 'dd'], dd: ['dt', 'dd'], tr: ['tr', 'td', 'th'], td: ['td', 'th'], th: ['td', 'th'],
};
// Block-level elements: text extraction puts a space at their edges so "<p>a</p><p>b</p>" reads "a b".
const BLOCK = new Set([
  'address', 'article', 'aside', 'blockquote', 'body', 'br', 'caption', 'dd', 'details', 'dialog', 'div', 'dl', 'dt',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr',
  'html', 'legend', 'li', 'main', 'nav', 'ol', 'option', 'p', 'pre', 'section', 'select', 'summary', 'table', 'tbody',
  'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'ul',
]);

const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ensp: ' ', emsp: ' ', thinsp: ' ',
  zwj: '‍', zwnj: '‌', shy: '­', ndash: '–', mdash: '—', hellip: '…', lsquo: '‘', rsquo: '’', sbquo: '‚',
  ldquo: '“', rdquo: '”', bdquo: '„', laquo: '«', raquo: '»', lsaquo: '‹', rsaquo: '›', middot: '·', bull: '•',
  copy: '©', reg: '®', trade: '™', deg: '°', times: '×', divide: '÷', minus: '−', plusmn: '±', rarr: '→', larr: '←',
  uarr: '↑', darr: '↓', harr: '↔', check: '✓', starf: '★', star: '☆', hearts: '♥', euro: '€', pound: '£', yen: '¥',
  cent: '¢', sect: '§', para: '¶', frac12: '½', frac14: '¼', frac34: '¾', prime: '′', Prime: '″', dagger: '†',
  Dagger: '‡', permil: '‰', iexcl: '¡', iquest: '¿', num: '#', excl: '!', percnt: '%', lpar: '(', rpar: ')',
  comma: ',', period: '.', colon: ':', semi: ';', quest: '?', commat: '@', lsqb: '[', rsqb: ']', lowbar: '_',
  grave: '`', lcub: '{', rcub: '}', verbar: '|', vert: '|', sol: '/', bsol: '\\', ast: '*', plus: '+', equals: '=',
  dollar: '$', Hat: '^', tilde: '~', NewLine: '\n', Tab: '\t',
};

/** Named entities seen but not in the table above (left undecoded) — a gate may warn about them. */
export const unknownEntities = new Set();

export function decodeEntities(s) {
  if (!s || s.indexOf('&') === -1) return s;
  return s.replace(/&(#\d+|#[xX][\da-fA-F]+|[A-Za-z][A-Za-z0-9]*);/g, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) && cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : m;
    }
    if (Object.hasOwn(NAMED, e)) return NAMED[e];
    unknownEntities.add(e);
    return m;
  });
}

const START = /<([a-zA-Z][^\s/>]*)/y;
const END = /<\/([a-zA-Z][^\s/>]*)[^>]*>/y;
const ATTR = /[\s/]*([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/y;
const TAG_CLOSE = /\s*(\/?)>/y;

export function parseHtml(html) {
  const lower = html.toLowerCase();
  const root = { type: 'root', tag: '#root', attrs: {}, children: [], parent: null };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  const text = (raw, decode = true) => {
    if (!raw) return;
    const parent = top();
    parent.children.push({ type: 'text', value: decode ? decodeEntities(raw) : raw, parent });
  };
  const n = html.length;
  let i = 0;
  while (i < n) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { text(html.slice(i)); break; }
    if (lt > i) text(html.slice(i, lt));
    i = lt;
    if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i + 4); i = e === -1 ? n : e + 3; continue; }
    if (html[i + 1] === '!' || html[i + 1] === '?') { const e = html.indexOf('>', i); i = e === -1 ? n : e + 1; continue; }
    if (html[i + 1] === '/') {
      END.lastIndex = i;
      const m = END.exec(html);
      if (!m) { text('<'); i++; continue; }
      i = END.lastIndex;
      const tag = m[1].toLowerCase();
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].tag === tag) { stack.length = k; break; }
      }
      continue;
    }
    START.lastIndex = i;
    const m = START.exec(html);
    if (!m) { text('<'); i++; continue; }
    const tag = m[1].toLowerCase();
    let j = START.lastIndex;
    const attrs = {};
    let selfClose = false;
    for (;;) {
      TAG_CLOSE.lastIndex = j;
      const c = TAG_CLOSE.exec(html);
      if (c) { selfClose = c[1] === '/'; j = TAG_CLOSE.lastIndex; break; }
      ATTR.lastIndex = j;
      const a = ATTR.exec(html);
      if (!a || ATTR.lastIndex === j) { j = html.indexOf('>', j); j = j === -1 ? n : j + 1; break; }
      j = ATTR.lastIndex;
      const name = a[1].toLowerCase();
      if (!Object.hasOwn(attrs, name)) attrs[name] = decodeEntities(a[2] ?? a[3] ?? a[4] ?? '');
    }
    i = j;
    const implied = IMPLIED_END[tag];
    if (implied && implied.includes(top().tag)) stack.pop();
    const parent = top();
    const el = { type: 'element', tag, attrs, children: [], parent, offset: lt };
    parent.children.push(el);
    if (VOID.has(tag) || selfClose) continue;
    if (RAW.has(tag) || RCDATA.has(tag)) {
      const e = lower.indexOf(`</${tag}`, i);
      const body = html.slice(i, e === -1 ? n : e);
      if (body) el.children.push({ type: 'text', value: RAW.has(tag) ? body : decodeEntities(body), parent: el });
      if (e === -1) { i = n; } else { const gt = html.indexOf('>', e); i = gt === -1 ? n : gt + 1; }
      continue;
    }
    stack.push(el);
  }
  return root;
}

// ---- queries ---------------------------------------------------------------------------------------------------------

/** Depth-first, document order. */
export function walk(node, fn) {
  if (node.type !== 'text') fn(node);
  if (node.children) for (const c of node.children) if (c.type !== 'text') walk(c, fn);
}

export function findAll(root, pred) {
  const out = [];
  walk(root, (n) => { if (n.type === 'element' && pred(n)) out.push(n); });
  return out;
}

export function find(root, pred) {
  let hit = null;
  const rec = (n) => {
    if (hit) return;
    if (n.type === 'element' && pred(n)) { hit = n; return; }
    if (n.children) for (const c of n.children) if (c.type !== 'text') rec(c);
  };
  rec(root);
  return hit;
}

export const byTag = (root, tag) => findAll(root, (n) => n.tag === tag);
export const attr = (node, name) => (node && Object.hasOwn(node.attrs, name) ? node.attrs[name] : undefined);
export const hasAttr = (node, name) => !!node && Object.hasOwn(node.attrs, name);
/** Whitespace-separated, lower-cased tokens of an attribute (rel, class). */
export const tokens = (node, name) => (attr(node, name) ?? '').toLowerCase().split(/\s+/).filter(Boolean);

/** The node itself or its nearest ancestor matching pred. */
export function closest(node, pred) {
  for (let n = node; n && n.type === 'element'; n = n.parent) if (pred(n)) return n;
  return null;
}

export const isInside = (node, pred) => !!closest(node.parent, pred);

/** Every id (plus <a name>) in the document — fragment targets. */
export function idSet(root) {
  const ids = new Set();
  walk(root, (n) => {
    if (n.type !== 'element') return;
    if (n.attrs.id) ids.add(n.attrs.id);
    if (n.tag === 'a' && n.attrs.name) ids.add(n.attrs.name);
  });
  return ids;
}

export const normSpace = (s) => String(s ?? '').replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();

const SKIP_ALWAYS = new Set(['script', 'style', 'template']);
const SKIP_VISIBLE = new Set(['script', 'style', 'template', 'noscript']);

/**
 * Text content, whitespace-normalised. `visible: true` also drops <noscript> and [hidden] subtrees (what a JS-enabled
 * visitor can read without CSS knowledge). Block elements are separated by a space; inline ones are not.
 */
export function textOf(node, { visible = false } = {}) {
  const skip = visible ? SKIP_VISIBLE : SKIP_ALWAYS;
  const out = [];
  const rec = (n) => {
    if (n.type === 'text') { out.push(n.value); return; }
    if (n.type === 'element') {
      if (skip.has(n.tag) || (visible && hasAttr(n, 'hidden'))) return;
      const block = BLOCK.has(n.tag);
      if (block) out.push(' ');
      for (const c of n.children) rec(c);
      if (block) out.push(' ');
      return;
    }
    for (const c of n.children) rec(c);
  };
  rec(node);
  return normSpace(out.join(''));
}

/** URLs of a srcset value ("a.avif 400w, b.avif 800w" → ["a.avif", "b.avif"]). */
export const srcsetUrls = (v) => String(v ?? '').split(',').map((c) => c.trim().split(/\s+/)[0]).filter(Boolean);

/** Short, single-line description of an element for messages: <a href="…" data-source="…">. */
export function describe(el, keys = ['id', 'href', 'src', 'data-source', 'rel', 'target', 'class']) {
  const bits = keys.filter((k) => hasAttr(el, k)).map((k) => {
    const v = String(el.attrs[k]);
    return `${k}="${v.length > 60 ? `${v.slice(0, 57)}…` : v}"`;
  });
  return `<${el.tag}${bits.length ? ` ${bits.join(' ')}` : ''}>`;
}
