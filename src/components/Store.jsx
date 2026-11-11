import { T, TIERS } from '../data/game.js'
import { useGame, found } from '../state/game.js'
import Pack from './Pack.jsx'
import PackOffer from './PackOffer.jsx'
import OddsTip from './OddsTip.jsx'

export default function Store({ active, theme, setTheme, onBuy }) {
  const S = useGame()
  return (
    <section className="view" id="store" role="tabpanel" aria-labelledby="tab-store" hidden={!active}>
      <div className="rule"><h2>Pick a theme</h2></div>
      <div className="themes" role="group" aria-label="Theme">
        {T.map((t) => (
          <button key={t.id} type="button" aria-pressed={t === theme} style={{ '--ta': t.a, '--tb': t.b }} onClick={() => setTheme(t)}>
            {t.name}<small>{found(t)}/{t.cards.length} collected</small>
          </button>
        ))}
      </div>
      <div className="sticker shelf" style={{ '--ta': theme.a, '--tb': theme.b }}>
        <div className="back">
          {TIERS.map((tier) => (
            <div className="offer" key={tier.name}>
              <OddsTip tier={tier} />
              <Pack t={theme} tier={tier} />
            </div>
          ))}
        </div>
        <div className="tags paper">
          {TIERS.map((tier, ti) => <PackOffer key={tier.name} tier={tier} coins={S.coins} onBuy={() => onBuy(ti)} />)}
        </div>
      </div>
    </section>
  )
}
