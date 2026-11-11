// The Vault's own ornaments, made in code: guilloche rosette, corner flourish, coin, foil gradient.
// Rendered once in App inside the shared <defs>. Colours come from the CSS tokens.

// Guilloche: interlaced sine bands round a centre, like the rosette on a banknote.
function rosettePaths() {
  const bands = [{ R: 262, a: 20, n: 16, k: 6 }, { R: 206, a: 34, n: 11, k: 8 }, { R: 140, a: 30, n: 8, k: 7 }, { R: 78, a: 22, n: 6, k: 6 }, { R: 34, a: 12, n: 5, k: 4 }]
  let d = ''
  for (const b of bands) {
    for (let j = 0; j < b.k; j++) {
      const ph = (j * 2 * Math.PI) / b.k
      let p = ''
      for (let i = 0; i <= 360; i++) {
        const t = (i * Math.PI) / 180, r = b.R + b.a * Math.sin(b.n * t + ph)
        p += (i ? 'L' : 'M') + (r * Math.cos(t)).toFixed(1) + ' ' + (r * Math.sin(t)).toFixed(1)
      }
      d += `<path d="${p}Z"/>`
    }
  }
  return d + '<circle r="292"/><circle r="288" stroke-dasharray="1 3"/><circle r="236"/><circle r="172"/><circle r="106"/><circle r="52"/>'
}

export const VAULT_DEFS = `
<filter id="fx-fibre" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency=".9 .035" numOctaves="2" seed="7" stitchTiles="stitch"/>
  <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 -.08"/>
</filter>
<linearGradient id="lg-foil" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" style="stop-color:var(--gold-hi)"/><stop offset=".38" style="stop-color:var(--legendary)"/>
  <stop offset=".62" style="stop-color:var(--flame)"/><stop offset=".8" style="stop-color:var(--gold-hi)"/><stop offset="1" style="stop-color:var(--gold-lo)"/>
</linearGradient>
<pattern id="pt-engrave" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
  <line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" stroke-width=".5"/>
</pattern>
<symbol id="rosette" viewBox="-300 -300 600 600"><g fill="none" stroke="currentColor" stroke-width=".7">${rosettePaths()}</g></symbol>
<symbol id="corner" viewBox="0 0 72 72">
  <g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
    <path d="M1 70V14C1 6.8 6.8 1 14 1h56"/>
    <path d="M7 62V19C7 12.4 12.4 7 19 7h43" stroke-width=".7"/>
    <path d="M13 44c0-12 7-19 16-19 7 0 12 4.6 12 10.4 0 4.8-3.6 8.2-8 8.2-3.6 0-6.2-2.4-6.2-5.6 0-2.6 1.9-4.4 4.2-4.4"/>
    <path d="M44 13c-12 0-19 7-19 16 0 7 4.6 12 10.4 12" stroke-width=".7"/>
    <path d="M13 44c0 6 3 10 8 12M44 13c6 0 10 3 12 8" stroke-width=".7"/>
    <path d="M18 18l5-5 5 5-5 5z"/><path d="M23 15.4V20.6M20.4 18h5.2" stroke-width=".6"/>
    <path d="M48 4.5c3 2.4 6 2.4 9 0M4.5 48c2.4 3 2.4 6 0 9" stroke-width=".7"/>
  </g>
</symbol>
<symbol id="coin" viewBox="0 0 28 28">
  <g fill="none" stroke="currentColor"><circle cx="14" cy="14" r="12.2" stroke-width="1.6"/><circle cx="14" cy="14" r="9" stroke-width=".7" stroke-dasharray="1 1.4"/>
  <path d="M14 7.2l1.9 4.5 4.9.4-3.7 3.2 1.1 4.8L14 17.6l-4.2 2.5 1.1-4.8-3.7-3.2 4.9-.4z" fill="currentColor" stroke="none"/></g>
</symbol>`
