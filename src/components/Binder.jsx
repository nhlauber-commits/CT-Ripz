import { useState } from 'react'
import { R } from '../data/game.js'
import { useGame, own, dupeValue, dupeCount, sellAll } from '../state/game.js'
import Card from './Card.jsx'

const fmt = (n) => n.toLocaleString('en-US')

// One theme's album page: stitched spine, rarity filter, card slots, and selling duplicates.
export default function Binder({ theme, showCard }) {
  useGame()
  const [filter, setFilter] = useState(-1)
  const [asking, setAsking] = useState(false)
  const [sold, setSold] = useState(0)
  const value = dupeValue(), count = dupeCount()
  const cards = filter < 0 ? theme.cards : theme.cards.filter((c) => c.ri === filter)

  return (
    <div className="album">
      <div className="spine" aria-hidden="true"><i /><i /><i /></div>
      <div className="page">
        <div className="filters" role="group" aria-label="Show rarity">
          {[-1, 0, 1, 2, 3, 4].map((ri) => {
            const list = ri < 0 ? theme.cards : theme.cards.filter((c) => c.ri === ri)
            return (
              <button key={ri} type="button" aria-pressed={filter === ri} data-r={ri < 0 ? undefined : R[ri].id} onClick={() => setFilter(ri)}>
                {ri < 0 ? 'All' : R[ri].name} {list.filter(own).length}/{list.length}
              </button>
            )
          })}
        </div>
        <div className="slots">
          {cards.map((c) => own(c) ? (
            <button key={c.key} type="button" className="slot" aria-label={`${c.n}, ${R[c.ri].name}, you own ${own(c)}`} onClick={() => showCard(c)}>
              {own(c) > 1 && <span className="cnt" aria-hidden="true">×{own(c)}</span>}
              <Card c={c} />
            </button>
          ) : (
            <div key={c.key} className="slot empty" data-r={R[c.ri].id}>
              <div><span className="num"><span className="vh">Card </span>{String(c.i + 1).padStart(3, '0')}<span className="vh">, {R[c.ri].name}, not collected</span></span></div>
            </div>
          ))}
        </div>
        <div className="sell">
          <p role="status">
            {value
              ? <><b>{count} {count === 1 ? 'duplicate' : 'duplicates'}</b> across all binders, worth {fmt(value)} coins.</>
              : sold ? <><b>Sold.</b> {fmt(sold)} coins added.</> : 'No duplicates to sell.'}
          </p>
          {value > 0 && !asking && (
            <div className="acts"><button type="button" className="btn sec" onClick={() => setAsking(true)}>Sell duplicates</button></div>
          )}
          {value > 0 && asking && (
            <div className="acts">
              <button type="button" className="btn" autoFocus onClick={() => { setSold(sellAll()); setAsking(false) }}>Sell {count} for {fmt(value)} coins</button>
              <button type="button" className="btn sec" onClick={() => setAsking(false)}>Keep them</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
