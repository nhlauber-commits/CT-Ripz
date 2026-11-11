import { useEffect, useId, useRef, useState } from 'react'
import { R } from '../data/game.js'

const tail = (k) => R.slice(k).reduce((n, r) => n + r.w, 0) / 100 // chance one card is rarity k or better
// Chance a pack of n cards holds at least one card of rarity k or better.
// With a guaranteed minimum, a pack with nothing that good has its last card rolled again at that minimum or better.
function atLeast(k, n, min) {
  let p = 1 - Math.pow(1 - tail(k), n)
  if (min) { const none = Math.pow(1 - tail(min), n); p = k <= min ? 1 : p + (none * tail(k)) / tail(min) }
  return p
}
const pct = (x) => (x * 100 >= 99.95 ? '100' : (x * 100).toFixed(1).replace(/\.0$/, '')) + '%'

// The "i" on a pack. Hovering or focusing it shows a small card with that pack's odds; a tap toggles it.
// Nothing opens over the page: the card sits beside the icon and goes away when the pointer leaves.
export default function OddsTip({ tier }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const btn = useRef(null)
  // Opened by a tap: any press elsewhere closes it (touch screens do not blur or "leave" a button reliably).
  useEffect(() => {
    if (!open) return
    const away = (e) => { if (!btn.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [open])
  return (
    <span className="tipwrap">
      <button type="button" className="info" ref={btn} aria-label={`${tier.name} pack odds`} aria-describedby={id} aria-expanded={open}
        onClick={() => setOpen((o) => !o)} onBlur={() => setOpen(false)} onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false) }}
        onKeyDown={(e) => { if (e.key === 'Escape') { setOpen(false); e.currentTarget.blur() } }}>
        <span aria-hidden="true">i</span>
      </button>
      <span className={'tip paper' + (open ? ' open' : '')} role="tooltip" id={id}>
        <b>{tier.name} odds</b>
        <span className="rows">
          {R.map((r) => <span key={r.id} data-r={r.id}><i />{r.name}<em>{r.w}%</em></span>)}
        </span>
        <b>At least one</b>
        <span className="rows">
          {[[2, 'Rare+'], [3, 'Epic+'], [4, 'Legendary']].map(([k, label]) => (
            <span key={k} data-r={R[k].id}><i />{label}<em>{pct(atLeast(k, tier.n, tier.min))}</em></span>
          ))}
        </span>
      </span>
    </span>
  )
}
