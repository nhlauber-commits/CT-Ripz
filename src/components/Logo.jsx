// The logo: a legendary card pulled from a pack. `detail` adds halftone and a burst for large sizes.
export default function Logo({ detail = false }) {
  const ink = { stroke: 'var(--ink)' }
  return (
    <svg viewBox="0 0 64 80" aria-hidden="true">
      <g transform="rotate(9 32 44)">
        <rect x="15" y="9" width="38" height="56" rx="4" strokeWidth="2.4" style={{ fill: 'var(--cyan)', ...ink }} />
      </g>
      <g transform="rotate(-8 32 44)">
        <rect x="10" y="10" width="42" height="60" rx="4.5" strokeWidth="2.4" style={{ fill: 'var(--yellow)', ...ink }} />
        <rect x="15" y="15" width="32" height="50" rx="2.4" strokeWidth="1.6" style={{ fill: 'var(--pink)', ...ink }} />
        {detail && (
          <>
            <rect x="15" y="15" width="32" height="50" rx="2.4" fill="url(#pt-dots)" opacity=".45" />
            <use href="#burst" x="13" y="22" width="36" height="36" style={{ color: 'var(--orange)' }} />
            <text x="31" y="63" textAnchor="middle" style={{ font: '400 6.5px var(--display)', fill: 'var(--ink)', letterSpacing: '.8px' }}>CT</text>
          </>
        )}
        <path d="M37 10h10.5a4.5 4.5 0 0 1 4.5 4.5V22H42a5 5 0 0 1-5-5z" strokeWidth="1.8" style={{ fill: 'var(--cyan)', ...ink }} />
        <path d="M31 26.5l3.2 8 8.6.5-6.7 5.4 2.2 8.3L31 44l-7.3 4.7 2.2-8.3-6.7-5.4 8.6-.5z" strokeWidth="1.8" strokeLinejoin="round" style={{ fill: 'var(--cream)', ...ink }} />
      </g>
    </svg>
  )
}
