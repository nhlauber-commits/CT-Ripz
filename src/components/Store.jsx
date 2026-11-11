import { T, TIERS } from '../data/game.js'
import { useGame, found } from '../state/game.js'
import Pack from './Pack.jsx'
import PackOffer from './PackOffer.jsx'

export default function Store({ active, theme, setTheme, onBuy, onOdds }) {
  const S = useGame()
  return (
    <section className="view" id="store" role="tabpanel" aria-labelledby="tab-store" hidden={!active}>
      <div className="rule"><h2>Pick a theme</h2></div>
      <div className="themes" role="group" aria-label="Theme">
        {T.map((t) => (
          <button key={t.id} type="button" aria-pressed={t === theme} style={{ '--ta': t.a }} onClick={() => setTheme(t)}>
            {t.name}<small>{found(t)}/{t.cards.length} collected</small>
          </button>
        ))}
      </div>
      <div className="shelf">
        <div className="back">
          {TIERS.map((tier, ti) => (
            <div className="offer" key={tier.name}>
              <button type="button" className="info" aria-label={`${tier.name} pack odds`} onClick={(e) => onOdds(ti, e.currentTarget)}><span aria-hidden="true">i</span></button>
              <Pack t={theme} tier={tier} />
            </div>
          ))}
        </div>
        <div className="lip" aria-hidden="true" />
        <div className="tags">
          {TIERS.map((tier, ti) => <PackOffer key={tier.name} tier={tier} coins={S.coins} onBuy={() => onBuy(ti)} />)}
        </div>
      </div>
    </section>
  )
}
