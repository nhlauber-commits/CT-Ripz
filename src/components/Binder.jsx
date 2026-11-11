import { R } from '../data/game.js'
import { ui, own, found, num, getFilteredBinder, resetBinderFilters, setView } from '../state/game.js'
import Cell from './Cell.jsx'

// The grid of one theme's cards: owned cards, and numbered empty slots for the rest.
export default function Binder() {
  const { cur, filter, ownedOnly, dupesOnly } = ui
  const filtered = getFilteredBinder(),
    ownedInView = filtered.filter(own)
  if (!filtered.length) {
    const q = ui.searchQuery.trim()
    const parts = []
    if (q) parts.push(`matching “${q}”`)
    if (filter >= 0) parts.push(`in ${R[filter].name}`)
    if (dupesOnly) parts.push('with duplicates')
    else if (ownedOnly) parts.push('that you own')
    return (
      <div className="binder" id="binder">
        <div className="binder-empty">
          <div>
            <b>No cards match your filters</b>
            <span>
              Found 0 cards in {cur.name} {parts.join(' ')}.
            </span>
          </div>
          <div className="binder-empty-actions">
            <button className="ghost" type="button" onClick={resetBinderFilters}>
              Reset filters
            </button>
            {((ownedOnly && !found(cur)) || (dupesOnly && !cur.cards.some((c) => own(c) > 1))) && (
              <button className="primary" type="button" onClick={() => setView('store')}>
                Open {cur.name} packs
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="binder" id="binder">
      {filtered.map((c) =>
        own(c) ? (
          <Cell key={c.key} c={c} navList={ownedInView} />
        ) : (
          <div key={c.key} className="slotc" data-r={R[c.ri].id}>
            <b>?</b>
            <span>{num(c)}</span>
            <i>{R[c.ri].name}</i>
          </div>
        ),
      )}
    </div>
  )
}
