import { T } from '../data/game.js'
import { useGame, found } from '../state/game.js'
import Binder from './Binder.jsx'

export default function Inventory({ active, theme, setTheme, showCard }) {
  useGame()
  return (
    <section className="view" id="inventory" role="tabpanel" aria-labelledby="tab-inventory" hidden={!active}>
      <div className="inv-head">
        <h2 className="misreg">{theme.name}</h2>
        <p className="num">{found(theme)}<i> / {theme.cards.length} collected</i></p>
      </div>
      <div className="index" role="group" aria-label="Binder">
        {T.map((t) => (
          <button key={t.id} type="button" aria-pressed={t === theme} style={{ '--ta': t.a, '--tb': t.b }} onClick={() => setTheme(t)}>{t.name}</button>
        ))}
      </div>
      <Binder key={theme.id} theme={theme} showCard={showCard} />
    </section>
  )
}
