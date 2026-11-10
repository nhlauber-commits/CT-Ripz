// Turns Vite's output (dist/app.html) into the publishable pack-rip.html.
// The page is published as a sandboxed fragment, so it must keep the old shape:
// <title> and the viewport meta first, no doctype/html/head/body tags,
// and one plain <script> block with the tags alone on their own lines.
import { readFileSync, writeFileSync } from 'node:fs';

let html = readFileSync('dist/app.html', 'utf8');

// Pull out the compiled Tailwind CSS that vite-plugin-singlefile inlined.
const m = html.match(/<style rel="stylesheet" crossorigin>([\s\S]*?)<\/style>\n?/);
if (!m) throw new Error('finish: compiled Tailwind <style> not found in dist/app.html');
html = html.replace(m[0], '');

// Strip any document wrapper tags Vite may add.
html = html
  .replace(/<!doctype[^>]*>\s*/i, '')
  .replace(/<\/?(html|head|body)(\s[^>]*)?>\s*/gi, '');

// Put Tailwind right after the Google Fonts link, before the page's own <style>,
// so the page's own (unlayered) CSS still wins wherever both set a property.
const fonts = html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>\n/);
if (!fonts) throw new Error('finish: Google Fonts <link> not found');
html = html.replace(fonts[0], fonts[0] + '<style id="tw">' + m[1].trim() + '</style>\n');

if (!html.startsWith('<title>CT Ripz</title>')) throw new Error('finish: <title> must stay first');
if (!/^<script>$/m.test(html) || !/^<\/script>$/m.test(html)) throw new Error('finish: script tags must be alone on their lines');

writeFileSync('pack-rip.html', html);
console.log(`pack-rip.html written (${(html.length / 1024).toFixed(1)} KB, Tailwind ${(m[1].length / 1024).toFixed(1)} KB)`);
