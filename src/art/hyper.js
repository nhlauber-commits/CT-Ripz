// Hyperprint's own ornaments, made in code: print grain, halftone dots, the starburst and the coin.
// Rendered once in App inside the shared <defs>. Colours come from the CSS tokens.
let pts = ''
for (let i = 0; i < 40; i++) {
  const r = i % 2 ? 80 : 104, t = (i * Math.PI) / 20
  pts += (r * Math.cos(t)).toFixed(1) + ',' + (r * Math.sin(t)).toFixed(1) + ' '
}

export const HYPER_DEFS = `
<filter id="fx-grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="11" stitchTiles="stitch"/>
  <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 -.25"/>
</filter>
<pattern id="pt-dots" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
  <circle cx="2.5" cy="2.5" r="1.1" style="fill:var(--ink)"/>
</pattern>
<symbol id="burst" viewBox="-110 -110 220 220"><polygon points="${pts}" fill="currentColor"/></symbol>
<symbol id="coin" viewBox="0 0 28 28">
  <circle cx="14" cy="14" r="12" fill="currentColor" style="stroke:var(--ink)" stroke-width="2"/>
  <circle cx="14" cy="14" r="8.6" fill="none" style="stroke:var(--ink)" stroke-width="1.2" stroke-dasharray="1.6 1.6"/>
  <path d="M14 7.4l1.9 4.3 4.7.4-3.6 3.1 1.1 4.6L14 17.3l-4.1 2.5 1.1-4.6-3.6-3.1 4.7-.4z" style="fill:var(--ink)"/>
</symbol>`
