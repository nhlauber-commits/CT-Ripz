// Node version of check.sh, so the check runs on any laptop (check.sh needs a Mac).
// Usage: npm run check   (checks pack-rip.html, the built file)
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const page = readFileSync('pack-rip.html', 'utf8');
const fail = (msg) => { console.log('FAIL: ' + msg); process.exit(1); };

const lines = page.split('\n');
const a = lines.indexOf('<script>'), b = lines.indexOf('</script>', a + 1);
if (a < 0 || b < 0) fail('no <script> block found (tags must be alone on their lines)');
const js = lines.slice(a + 1, b).join('\n');

if (/<!doctype|<html[ >]|<head[ >]|<body[ >]/i.test(page)) fail('page must not contain doctype/html/head/body tags');
const ext = [...page.matchAll(/(src|href)="(https?:\/\/[^"]+)/g)].map((x) => x[2])
  .filter((u) => !/fonts\.googleapis\.com|cdnjs\.cloudflare\.com/.test(u));
if (ext.length) fail('external resource outside the allowed hosts: ' + ext.join(', '));
if (/url\(["']?https?:\/\//.test(page)) fail('external url() in CSS');

try { new Function('var document,localStorage,matchMedia,window,navigator;' + js); console.log('syntax OK'); }
catch (e) { fail('syntax ' + e); }

const artJs = js.split(/.*=== state ===.*/)[0];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(artJs + '\n;this.T=T;this.art=art;', ctx);
const { T, art } = ctx;
let bad = 0, bytes = 0; const want = '40/28/18/10/4';
if (T.length !== 8) { console.log('FAIL: expected 8 themes, got ' + T.length); bad++; }
for (const t of T) {
  const n = [0, 0, 0, 0, 0]; t.cards.forEach((c) => n[c.ri]++);
  if (t.cards.length !== 100 || n.join('/') !== want) { console.log(`FAIL: ${t.id} has ${t.cards.length} cards split ${n.join('/')}`); bad++; }
  if (new Set(t.cards.map((c) => c.n)).size !== 100) { console.log('FAIL: duplicate names in ' + t.id); bad++; }
  const seen = new Set();
  for (const c of t.cards) {
    try {
      const s = art(c); bytes += s.length; seen.add(s.replace(/a\d+_\d+/g, ''));
      if (typeof s !== 'string' || s.indexOf('<svg') !== 0) { console.log(`FAIL: art(${c.n}) is not an svg string`); bad++; }
      else if (/NaN|undefined/.test(s)) { console.log('FAIL: NaN/undefined in art for ' + c.n); bad++; }
    } catch (e) { console.log(`FAIL: art(${c.n}) threw ${e}`); bad++; }
  }
  if (seen.size < 100) { console.log(`FAIL: ${t.id} has only ${seen.size} distinct card images`); bad++; }
}
const avg = Math.round(bytes / 800); console.log('avg svg bytes per card: ' + avg);
if (avg > 16000) { console.log('FAIL: average card svg over 16000 bytes'); bad++; }
if (bad) process.exit(1);
console.log('CHECK OK');
