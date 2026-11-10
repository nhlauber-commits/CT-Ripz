#!/bin/sh
# Structural check for pack-rip.html. Run from the repo root: sh check.sh
set -e
JSC=/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
TMP=$(mktemp -d)
sed -n '/^<script>$/,/^<\/script>$/p' pack-rip.html | sed '1d;$d' > "$TMP/full.js"
[ -s "$TMP/full.js" ] || { echo "FAIL: no <script> block found (tags must be alone on their lines)"; exit 1; }
if grep -n -i -E '<!doctype|<html[ >]|<head[ >]|<body[ >]' pack-rip.html; then echo "FAIL: page must not contain doctype/html/head/body tags"; exit 1; fi
if grep -n -o -E '(src|href)="https?://[^"]+' pack-rip.html | grep -v -E 'fonts\.googleapis\.com|cdnjs\.cloudflare\.com'; then echo "FAIL: external resource outside the allowed hosts"; exit 1; fi
if grep -n -E 'url\(["'"'"']?https?://' pack-rip.html; then echo "FAIL: external url() in CSS"; exit 1; fi
(echo 'var document,localStorage,matchMedia,window,navigator;'; cat "$TMP/full.js") > "$TMP/syn.js"
"$JSC" -e "try{new Function(readFile('$TMP/syn.js'));print('syntax OK')}catch(e){print('FAIL: syntax '+e);quit(1)}"
sed '/=== state ===/,$d' "$TMP/full.js" > "$TMP/art.js"
cat >> "$TMP/art.js" <<'JS'
let bad=0,bytes=0;const want='40/28/18/10/4';
if(T.length!==8){print('FAIL: expected 8 themes, got '+T.length);bad++}
T.forEach(t=>{const n=[0,0,0,0,0];t.cards.forEach(c=>n[c.ri]++);
  if(t.cards.length!==100||n.join('/')!==want){print('FAIL: '+t.id+' has '+t.cards.length+' cards split '+n.join('/'));bad++}
  if(new Set(t.cards.map(c=>c.n)).size!==100){print('FAIL: duplicate names in '+t.id);bad++}
  const seen=new Set();
  t.cards.forEach(c=>{try{const s=art(c);bytes+=s.length;seen.add(s.replace(/a\d+_\d+/g,''));
    if(typeof s!=='string'||s.indexOf('<svg')!==0){print('FAIL: art('+c.n+') is not an svg string');bad++}
    else if(/NaN|undefined/.test(s)){print('FAIL: NaN/undefined in art for '+c.n);bad++}}
   catch(e){print('FAIL: art('+c.n+') threw '+e);bad++}});
  if(seen.size<100){print('FAIL: '+t.id+' has only '+seen.size+' distinct card images');bad++}});
const avg=Math.round(bytes/800);print('avg svg bytes per card: '+avg);
if(avg>16000){print('FAIL: average card svg over 16000 bytes (binder shows 100 at once)');bad++}
if(bad)quit(1);print('CHECK OK');
JS
"$JSC" "$TMP/art.js"
