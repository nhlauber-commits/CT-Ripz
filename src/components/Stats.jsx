import { R, T, TIERS, TOTAL } from '../data/game.js'
import { useGame, BY, own, found, totalFound, dupeValue, dupeCount } from '../state/game.js'
import { TIER_IDS } from '../state/stats.js'
import Card from './Card.jsx'

const fmt = (n) => n.toLocaleString('en-US')
const day = (t) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
function ago(t) {
  if (!t) return 'Earlier'
  const s = Math.max(0, (Date.now() - t) / 1000)
  if (s < 60) return 'Just now'
  if (s < 3600) return Math.floor(s / 60) + ' min ago'
  if (s < 86400) return Math.floor(s / 3600) + ' hr ago'
  return day(t)
}
const BAR = 60 // the rarity bars run from 0 to 60%, so the Common bar does not fill the row

// The player's history: packs ripped, what came out of them, luck, coins and recent rips.
export default function Stats({ active, go, showCard }) {
  const S = useGame()
  const st = S.stats
  const tracked = TIER_IDS.reduce((n, id) => n + st.packs[id], 0)
  const before = Math.max(0, S.opened - tracked)
  const got = totalFound()
  const first = st.firstLegendary && BY[st.firstLegendary.k]
  const entry = (e, i, caption) => {
    const c = BY[e.k]
    if (!c) return null
    return (
      <figure key={i + e.k}>
        {own(c)
          ? <button type="button" className="slot" aria-label={`${c.n}, ${R[c.ri].name}. ${caption}`} onClick={() => showCard(c)}><Card c={c} /></button>
          : <Card c={c} />}
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }

  return (
    <section className="view stats" id="stats" role="tabpanel" aria-labelledby="tab-stats" hidden={!active}>
      <div className="inv-head">
        <h2 className="misreg">Stats</h2>
        <p className="since">Counting since {day(st.since)}</p>
      </div>

      <div className="st-top">
        <div className="sticker st-packs paper">
          <div className="ht" aria-hidden="true" />
          <h3>Packs ripped</h3>
          <p className="num big misreg">{fmt(S.opened)}</p>
          <ul>
            {TIERS.map((t, i) => <li key={t.name}>{t.name}<b className="num">{fmt(st.packs[TIER_IDS[i]])}</b></li>)}
          </ul>
          {before > 0 && <p className="note">{fmt(before)} ripped before stats began, size not recorded.</p>}
        </div>
        <dl className="st-side paper">
          <div className="tile"><dt>Cards pulled</dt><dd className="num">{fmt(st.cards)}</dd></div>
          <div className="tile">
            <dt>Unique cards</dt>
            <dd className="num">{got}<i>of {TOTAL}</i></dd>
            <div className="meter" aria-hidden="true"><i style={{ width: (got / TOTAL) * 100 + '%' }} /></div>
          </div>
        </dl>
      </div>

      <div className="sticker st-rar paper">
        <div className="rule"><h3>Pulled by rarity</h3></div>
        {R.map((r, ri) => {
          const n = st.byRarity[ri], share = st.cards ? (n / st.cards) * 100 : 0
          return (
            <div className="rar" key={r.id} data-r={r.id}>
              <span className="nm">{r.name}</span>
              <span className="track" aria-hidden="true">
                <i style={{ width: Math.min(100, (share / BAR) * 100) + '%' }} />
                <b style={{ left: (r.w / BAR) * 100 + '%' }} />
              </span>
              <span className="num">{fmt(n)}</span>
              <small>{share.toFixed(1).replace(/\.0$/, '')}% of pulls, odds say {r.w}%</small>
            </div>
          )
        })}
        <p className="key"><b aria-hidden="true" /> Pink mark: the share the odds predict.</p>
      </div>

      <div className="sticker st-luck">
        <div className="rule"><h3>Luck and coins</h3></div>
        <dl>
          <dt>Packs since last Legendary</dt><dd className="num">{st.byRarity[4] ? fmt(st.sinceLegendary) : 'None yet'}</dd>
          <dt>First Legendary</dt><dd className="num">{first ? first.n : 'None yet'}{first && <small>{day(st.firstLegendary.t)}</small>}</dd>
          <dt>Legendaries pulled</dt><dd className="num">{fmt(st.byRarity[4])}</dd>
          <dt>Coins spent on packs</dt><dd className="num">{fmt(st.coinsSpent)}</dd>
          <dt>Coins from selling</dt><dd className="num">{fmt(st.coinsFromSales)}</dd>
          <dt>Duplicates pulled</dt><dd className="num">{fmt(st.dupesPulled)}</dd>
          <dt>Duplicates sold</dt><dd className="num">{fmt(st.dupesSold)}</dd>
          <dt>Duplicates held now</dt><dd className="num">{fmt(dupeCount())}<small>worth {fmt(dupeValue())} coins</small></dd>
        </dl>
      </div>

      <div className="sticker st-best">
        <div className="rule"><h3>Best pulls</h3></div>
        {st.best.length
          ? <div className="st-grid">{st.best.map((e, i) => entry(e, i, `${c0(e)} · ${ago(e.t)}`))}</div>
          : <div className="empty"><p>Nothing yet. Your ten best pulls will be ranked here.</p><button type="button" className="btn" onClick={() => go('store')}>Go to the store</button></div>}
      </div>

      <div className="sticker st-log paper">
        <div className="rule"><h3>Recent rips</h3></div>
        {st.log.length
          ? <div className="st-grid">{st.log.slice(0, 20).map((e, i) => entry(e, i, `${e.p == null ? 'Pack' : TIERS[e.p].name} · ${ago(e.t)}`))}</div>
          : <p className="none">No rips yet. The last 20 cards you pull will show up here, newest first.</p>}
      </div>

      <div className="sticker st-themes">
        <div className="rule"><h3>Theme completion</h3></div>
        {T.map((t) => (
          <div className="th" key={t.id} style={{ '--ta': t.a, '--tb': t.b }}>
            <span className="nm">{t.name}</span>
            <span className="track" aria-hidden="true"><i style={{ width: (found(t) / t.cards.length) * 100 + '%' }} /></span>
            <span className="num">{found(t)}<i>/{t.cards.length}</i></span>
          </div>
        ))}
      </div>
    </section>
  )
}

const c0 = (e) => (BY[e.k] ? BY[e.k].t.name : '')
