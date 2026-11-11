// The CT Ripz logo: a legendary card pulled from a pack, tilted, with a second card behind it.
// Built from the same colour tokens as the real cards. detail adds the engraved lines for large
// sizes (the Home hero); leave it off for small sizes (the top bar) so the icon stays clear.
function star(cx, cy, n, R, r) {
  let p = ''
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n - Math.PI / 2,
      q = i % 2 ? r : R
    p += (i ? 'L' : 'M') + (cx + q * Math.cos(a)).toFixed(1) + ' ' + (cy + q * Math.sin(a)).toFixed(1)
  }
  return p + 'Z'
}
let RAYS = ''
for (let i = 0; i < 24; i++) {
  const a = (i * Math.PI) / 12
  RAYS += `M${(50 + 19 * Math.cos(a)).toFixed(1)} ${(60 + 19 * Math.sin(a)).toFixed(1)}L${(50 + 31 * Math.cos(a)).toFixed(1)} ${(60 + 31 * Math.sin(a)).toFixed(1)}`
}
const s = (name) => ({ stroke: `var(--${name})` })

export default function Logo({ size = 24, detail = false, className = 'logo' }) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 100 120" aria-hidden="true">
      <g transform="rotate(4 50 60)">
        <rect x="29" y="13" width="58" height="82" rx="5" style={{ fill: 'var(--navy-raise)', ...s('gold-lo') }} strokeWidth={detail ? 1.5 : 3} />
      </g>
      <g transform="rotate(-8 50 60)">
        <rect x="18" y="17" width="60" height="86" rx="5.5" fill="url(#lg-frame)" style={s('gold-lo')} strokeWidth="1" />
        {detail ? (
          <>
            <rect x="22.5" y="21.5" width="51" height="77" rx="3" style={{ fill: 'var(--navy-deep)' }} />
            <rect x="25" y="24" width="46" height="72" rx="2" fill="none" style={s('gold-lo')} strokeWidth=".7" />
            <path d={RAYS} fill="none" style={s('gold-lo')} strokeWidth=".7" />
            <circle cx="50" cy="60" r="19" fill="none" style={s('gold')} strokeWidth=".8" />
            <circle cx="50" cy="60" r="31" fill="none" style={s('gold-lo')} strokeWidth=".6" />
            <path d="M28 88H68" style={s('gold-lo')} strokeWidth=".7" />
            <text x="48" y="94.5" textAnchor="middle" style={{ fill: 'var(--gold)', font: '800 7px var(--display)', letterSpacing: '.12em' }}>
              CT
            </text>
            <path d={star(50, 60, 5, 15, 6.2)} style={{ fill: 'var(--gold-hi)', ...s('gold-lo') }} strokeWidth=".8" />
          </>
        ) : (
          <>
            <rect x="24" y="23" width="48" height="74" rx="3" style={{ fill: 'var(--navy-deep)' }} />
            <path d={star(50, 61, 5, 19, 8)} style={{ fill: 'var(--gold-hi)' }} />
          </>
        )}
        <path d="M52 17H72.5A5.5 5.5 0 0 1 78 22.5V31H58A6 6 0 0 1 52 25Z" fill="url(#lg-tab)" style={s('gold-lo')} strokeWidth=".8" />
      </g>
    </svg>
  )
}
