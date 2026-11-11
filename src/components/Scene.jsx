import { ROSETTE } from '../vault/guilloche.js'

// The page background, drawn once behind everything: linen (on the body), a guilloché rosette,
// engraved hatching toward the edges and a vignette. Also holds the shapes other components
// reuse by id: the corner ornament and the logo's foil gradients.
export default function Scene({ view }) {
  return (
    <div className="scene" data-view={view} aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <symbol id="corner" viewBox="0 0 64 64">
            <g className="orn">
              <path d="M2 62V14Q2 2 14 2H62" />
              <path d="M8 50V20Q8 8 20 8H50" />
              <path d="M8 34C16 34 22 28 22 22C22 17 18 14 15 16C12 18 13 23 17 23" />
              <path d="M34 8C34 16 28 22 22 22" />
              <path d="M14 44C24 42 30 36 32 26M44 14C42 24 36 30 26 32" />
              <path d="M2 62C6 58 8 54 8 50M62 2C58 6 54 8 50 8" />
            </g>
          </symbol>
          <symbol id="rosette" viewBox="-420 -420 840 840" dangerouslySetInnerHTML={{ __html: ROSETTE }} />
          <linearGradient id="lg-frame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--gold-hi)' }} />
            <stop offset=".38" style={{ stopColor: 'var(--legendary)' }} />
            <stop offset=".7" style={{ stopColor: 'var(--flame)' }} />
            <stop offset="1" style={{ stopColor: 'var(--gold-hi)' }} />
          </linearGradient>
          <linearGradient id="lg-tab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--gold-hi)' }} />
            <stop offset="1" style={{ stopColor: 'var(--legendary)' }} />
          </linearGradient>
        </defs>
      </svg>
      <svg className="rosette guil">
        <use href="#rosette" />
      </svg>
      <div className="edges"></div>
      <div className="vignette"></div>
    </div>
  )
}
