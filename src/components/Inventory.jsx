import { useRef } from 'react'
import { R } from '../data/game.js'
import { ui, own, found, dupeValue, sellAll, setFilter, setSearch, setSort, toggleOwned, toggleDupes } from '../state/game.js'
import Coins from './Coins.jsx'
import Rack from './Rack.jsx'
import Binder from './Binder.jsx'

export default function Inventory() {
  const { cur, filter } = ui
  const search = useRef(null)
  const dv = dupeValue()
  const baseRarity = filter < 0 ? cur.cards : cur.cards.filter((c) => c.ri === filter)
  return (
    <>
      <section>
        <h2>Pick a binder</h2>
        <Rack id="rackI" />
      </section>
      <section>
        <div className="head">
          <h2 id="binderTitle">
            {cur.name} binder · {found(cur)}/{cur.cards.length}
          </h2>
          <button className="sell" id="sellAll" type="button" disabled={!dv} onClick={sellAll}>
            {dv ? (
              <>
                Sell all duplicates · +<Coins n={dv} />
              </>
            ) : (
              'No duplicates to sell'
            )}
          </button>
        </div>
        <div className="inv-tools">
          <div className="search-wrap">
            <input
              ref={search}
              className="search"
              id="invSearch"
              type="search"
              placeholder="Search cards in this binder by name…"
              aria-label="Search cards by name"
              autoComplete="off"
              value={ui.searchQuery}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="search-clear"
              id="invClear"
              type="button"
              aria-label="Clear search"
              hidden={!ui.searchQuery.length}
              onClick={() => {
                setSearch('')
                search.current.focus()
              }}
            >
              ×
            </button>
          </div>
          <label className="sort-wrap" htmlFor="invSort">
            <span className="label">Sort by</span>
            <select className="sort" id="invSort" value={ui.sortBy} onChange={(e) => setSort(e.target.value)}>
              <option value="num">Card number (#001–100)</option>
              <option value="rarity">Rarity (high to low)</option>
              <option value="copies">Most copies</option>
            </select>
          </label>
        </div>
        <div className="inv-filters">
          <div className="tabs" id="tabs" role="group" aria-label="Filter by rarity">
            {[-1, 0, 1, 2, 3, 4].map((ri) => {
              const list = ri < 0 ? cur.cards : cur.cards.filter((c) => c.ri === ri)
              return (
                <button
                  key={ri}
                  type="button"
                  data-r={ri >= 0 ? R[ri].id : undefined}
                  aria-pressed={filter === ri}
                  onClick={() => setFilter(ri)}
                >
                  {ri >= 0 && <i></i>}
                  {(ri < 0 ? 'All' : R[ri].name) + ' ' + list.filter(own).length + '/' + list.length}
                </button>
              )
            })}
          </div>
          <div className="toggles" role="group" aria-label="Filter by ownership">
            <button type="button" id="togOwned" aria-pressed={ui.ownedOnly} onClick={toggleOwned}>
              Owned only ({baseRarity.filter(own).length})
            </button>
            <button type="button" id="togDupes" aria-pressed={ui.dupesOnly} onClick={toggleDupes}>
              Duplicates only ({baseRarity.filter((c) => own(c) > 1).length})
            </button>
          </div>
        </div>
        <Binder />
      </section>
    </>
  )
}
