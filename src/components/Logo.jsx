// The logo: a legendary card pulled from a pack. `detail` adds engraving for large sizes.
export default function Logo({ detail = false }) {
  return (
    <svg viewBox="0 0 64 80" aria-hidden="true">
      <g transform="rotate(7 32 44)">
        <rect x="15" y="9" width="38" height="56" rx="3.5" strokeWidth="1.4" style={{ fill: 'var(--navy-raise)', stroke: 'var(--gold-lo)' }} />
      </g>
      <g transform="rotate(-8 32 44)">
        <rect x="10" y="10" width="42" height="60" rx="4" fill="url(#lg-foil)" />
        <rect x="10.5" y="10.5" width="41" height="59" rx="3.6" fill="none" strokeWidth=".8" style={{ stroke: 'var(--gold-ink)' }} />
        <rect x="14" y="14" width="34" height="52" rx="2.4" style={{ fill: 'var(--navy-deep)' }} />
        {detail && (
          <>
            <rect x="14" y="14" width="34" height="52" rx="2.4" fill="url(#pt-engrave)" style={{ color: 'var(--edge-hi)' }} />
            <rect x="16.5" y="16.5" width="29" height="47" rx="1.4" fill="none" strokeWidth=".5" style={{ stroke: 'var(--gold-lo)' }} />
            <circle cx="31" cy="39" r="15" fill="none" strokeWidth=".5" style={{ stroke: 'var(--gold)' }} />
            <circle cx="31" cy="39" r="17" fill="none" strokeWidth=".5" strokeDasharray=".8 1.6" style={{ stroke: 'var(--gold-lo)' }} />
            <path d="M18 60h26" strokeWidth=".5" style={{ stroke: 'var(--gold-lo)' }} />
            <text x="31" y="59" textAnchor="middle" style={{ font: '900 6px var(--display)', fill: 'var(--gold-hi)', letterSpacing: '.6px' }}>CT</text>
          </>
        )}
        <path d="M36 10h12a4 4 0 0 1 4 4v7H41a5 5 0 0 1-5-5z" fill="url(#lg-foil)" strokeWidth=".8" style={{ stroke: 'var(--gold-ink)' }} />
        <path d="M31 27.5l2.9 7.6 8.1.4-6.3 5.1 2.1 7.8L31 44l-6.8 4.4 2.1-7.8-6.3-5.1 8.1-.4z" strokeWidth=".6" style={{ fill: 'var(--gold-hi)', stroke: 'var(--gold-lo)' }} />
      </g>
    </svg>
  )
}
