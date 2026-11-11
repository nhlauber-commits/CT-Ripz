import { useEffect, useRef } from 'react'
import { R, TIERS } from '../data/game.js'

const tail = (k) => R.slice(k).reduce((n, r) => n + r.w, 0) / 100 // chance one card is rarity k or better
// Chance a pack of n cards holds at least one card of rarity k or better.
// With a guaranteed minimum, a pack with nothing that good has its last card rolled again at that minimum or better.
function atLeast(k, n, min) {
  let p = 1 - Math.pow(1 - tail(k), n)
  if (min) { const none = Math.pow(1 - tail(min), n); p = k <= min ? 1 : p + (none * tail(k)) / tail(min) }
  return p
}
const pct = (x) => (x * 100 >= 99.95 ? '100' : (x * 100).toFixed(1).replace(/\.0$/, '')) + '%'

// Popup with one pack's odds, worked out from the real weights and that tier's guarantee.
export default function OddsDialog({ ti, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (ti != null && !d.open) d.showModal()
    if (ti == null && d.open) d.close()
  }, [ti])
  const tier = ti == null ? null : TIERS[ti]
  const again = tier && tier.min ? R.slice(tier.min).map((r) => `${r.name} (${Math.round(r.w / tail(tier.min))}%)`) : null

  return (
    <dialog className="oddsbox" ref={ref} aria-labelledby="odds-title" onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current.close() }}>
      {tier && (
        <div className="plate">
          <h2 id="odds-title">{tier.name} pack odds</h2>
          <p className="sub">{tier.n} {tier.n > 1 ? 'cards' : 'card'} for {tier.cost} coins</p>
          <h3>Each card</h3>
          <table><tbody>
            {R.map((r) => <tr key={r.id} data-r={r.id}><th scope="row">{r.name}</th><td className="num">{r.w}%</td></tr>)}
          </tbody></table>
          <h3>This pack: at least one</h3>
          <table><tbody>
            {[[2, 'Rare or better'], [3, 'Epic or better'], [4, 'Legendary']].map(([k, label]) => (
              <tr key={k} data-r={R[k].id}><th scope="row">{label}</th><td className="num">{pct(atLeast(k, tier.n, tier.min))}</td></tr>
            ))}
          </tbody></table>
          {again && (
            <p className="note">If none of the {tier.n} cards is {R[tier.min].name} or better, the last card is rolled again as {again.slice(0, -1).join(', ')} or {again[again.length - 1]}.</p>
          )}
          <button type="button" className="btn sec" onClick={() => ref.current.close()}>Close</button>
        </div>
      )}
    </dialog>
  )
}
