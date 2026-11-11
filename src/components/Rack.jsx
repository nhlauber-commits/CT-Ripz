import { T } from '../data/game.js'
import { esc } from '../art/helpers.js'
import { emblem } from '../art/art.js'
import { ui, found, pickTheme } from '../state/game.js'

// The row of eight theme tiles. On Home a tile jumps to that theme's binder.
export default function Rack({ id, home }) {
  return (
    <div className="rack" id={id}>
      {T.map((t) => {
        const n = found(t)
        const html = `${emblem(t)}<b>${esc(t.name)}</b><small>${n}/${t.cards.length}</small><span class="bar"><i style="width:${(n / t.cards.length) * 100}%"></i></span>`
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={home ? undefined : t === ui.cur}
            style={{ '--a': t.a, '--b': t.b }}
            onClick={() => pickTheme(t, home)}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      })}
    </div>
  )
}
