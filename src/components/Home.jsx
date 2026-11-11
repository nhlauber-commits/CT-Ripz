import { useEffect, useRef, useState } from 'react'
import { R, TOTAL } from '../data/game.js'
import { useGame, BY, own, totalFound, dupeValue, reset } from '../state/game.js'
import Card from './Card.jsx'
import Burst from './Burst.jsx'
import Logo from './Logo.jsx'
import Legendaries from './Legendaries.jsx'

const fmt = (n) => n.toLocaleString('en-US')

export default function Home({ active, go, showCard }) {
  const S = useGame()
  const [armed, setArmed] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const got = totalFound()
  const recent = S.recent.map((k) => BY[k]).filter((c) => c && own(c)).slice(0, 5)
  const startOver = () => {
    if (!armed) { setArmed(true); timer.current = setTimeout(() => setArmed(false), 3000); return }
    clearTimeout(timer.current); setArmed(false); reset()
  }

  return (
    <section className="view home" id="home" role="tabpanel" aria-labelledby="tab-home" hidden={!active}>
      <div className="sticker hero paper">
        <div className="ht" aria-hidden="true" />
        <div>
          <h2 className="misreg">Rip a <b className="misreg">pack</b></h2>
          <p>Eight themes, 800 cards, three pack sizes. Every pull goes in your binder.</p>
          <div className="acts">
            <button type="button" className="btn" onClick={() => go('store')}>Open the store</button>
            <button type="button" className="btn sec" onClick={() => go('inventory')}>View inventory</button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <Burst />
          <span className="mark"><Logo detail /></span>
          <span className="badge">{TOTAL}<small>cards</small></span>
        </div>
      </div>

      <dl className="ledger paper">
        <div className="tile">
          <dt>Cards collected</dt>
          <dd className="num">{got}<i>of {TOTAL}</i></dd>
          <div className="meter" aria-hidden="true"><i style={{ width: (got / TOTAL) * 100 + '%' }} /></div>
        </div>
        <div className="tile"><dt>Packs ripped</dt><dd className="num">{fmt(S.opened)}</dd></div>
        <div className="tile"><dt>Duplicates worth</dt><dd className="num">{fmt(dupeValue())}<i>coins</i></dd></div>
      </dl>

      <Legendaries active={active} />

      <div className="sticker odds paper">
        <div className="rule"><h3>Odds</h3></div>
        <table>
          <thead><tr><th scope="col">Rarity</th><th scope="col">Chance</th><th scope="col">Sells for</th></tr></thead>
          <tbody>
            {R.map((r) => (
              <tr key={r.id} data-r={r.id} style={{ '--w': r.w + '%' }}><td>{r.name}</td><td className="num">{r.w}%</td><td className="num">{fmt(r.sell)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sticker case">
        <div className="rule"><h3>Last pulls</h3></div>
        {recent.length ? (
          <div className="row">
            {recent.map((c) => (
              <button key={c.key} type="button" className="slot" aria-label={`${c.n}, ${R[c.ri].name}, you own ${own(c)}`} onClick={() => showCard(c)}><Card c={c} /></button>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No cards yet. Your newest pulls will show up here.</p>
            <button type="button" className="btn" onClick={() => go('store')}>Go to the store</button>
          </div>
        )}
        <div className="lip" aria-hidden="true" />
      </div>

      <div className="foot">
        <button type="button" className="reset" onClick={startOver}>{armed ? 'Press again to wipe coins and cards' : 'Start over'}</button>
      </div>
    </section>
  )
}
