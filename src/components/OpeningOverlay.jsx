import { useEffect, useRef, useState } from 'react'
import { R, TIERS } from '../data/game.js'
import { useGame, own, sellOne } from '../state/game.js'
import Card from './Card.jsx'
import Logo from './Logo.jsx'

const fmt = (n) => n.toLocaleString('en-US')

// The stage. Two uses: a freshly opened pack (cards arrive face down and are turned over),
// and a single owned card looked at up close, where one duplicate can be sold.
export default function OpeningOverlay({ stage, onAgain, onClose }) {
  const S = useGame()
  const ref = useRef(null)
  const [up, setUp] = useState([])
  useEffect(() => { setUp([]) }, [stage?.id])
  useEffect(() => {
    const d = ref.current
    if (stage && !d.open) d.showModal()
    if (!stage && d.open) d.close()
  }, [stage])

  let body = null
  if (stage?.kind === 'pull') {
    const tier = TIERS[stage.ti], { pulls, rs } = stage
    const all = pulls.every((_, i) => up[i]), best = Math.max(...rs)
    const fresh = pulls.filter((p) => p.isNew).length, dupes = tier.n - fresh, can = S.coins >= tier.cost
    body = (
      <>
        <h2 id="rip-title">{tier.name} pack<small>{stage.theme.name}. {all ? 'All cards turned.' : 'Turn each card over.'}</small></h2>
        <div className="pull">
          {pulls.map((p, i) => (
            <button key={stage.id + ':' + i} type="button" className="flip" aria-pressed={!!up[i]} autoFocus={i === 0}
              aria-label={up[i] ? `${p.c.n}, ${R[p.c.ri].name}${p.isNew ? ', new' : ''}` : 'Face-down card. Turn over'}
              onClick={() => setUp((u) => { const n = [...u]; n[i] = true; return n })}>
              <span className="inner">
                <span className="face backface">
                  <svg className="seal2" aria-hidden="true"><use href="#rosette" /></svg>
                  <span className="mark"><Logo /></span>
                </span>
                <span className="face front"><Card c={p.c} /></span>
              </span>
              {up[i] && p.isNew && <span className="new">New</span>}
            </button>
          ))}
        </div>
        <p className="result" data-r={R[best].id} role="status">
          {all && (
            <>
              <b>{tier.n === 1 ? R[best].name : 'Best pull: ' + R[best].name}</b>
              {tier.n === 1
                ? pulls[0].c.n + (fresh ? ' is new to your binder.' : `: you now have ${own(pulls[0].c)}.`)
                : `${fresh} new, ${dupes} duplicate${dupes === 1 ? '' : 's'}.`}
            </>
          )}
        </p>
        <div className="acts">
          {!all && <button type="button" className="btn" onClick={() => setUp(pulls.map(() => true))}>Reveal all</button>}
          {all && <button type="button" className="btn" disabled={!can} onClick={onAgain}>{can ? `Open another ${tier.name} · ${tier.cost}` : 'Not enough coins for another'}</button>}
          <button type="button" className="btn sec" onClick={() => ref.current.close()}>Done</button>
        </div>
      </>
    )
  } else if (stage?.kind === 'card') {
    const c = stage.c, r = R[c.ri], n = own(c)
    body = (
      <>
        <h2 id="rip-title">{c.n}<small>{c.t.name}, {c.t.g[c.k]}</small></h2>
        <div className="pull"><span className="flip solo"><Card c={c} /></span></div>
        <p className="result" data-r={r.id} role="status"><b>{r.name}</b>You own {n}. Each copy sells for {fmt(r.sell)} coins.</p>
        <div className="acts">
          <button type="button" className="btn" disabled={n < 2} onClick={() => sellOne(c)}>{n > 1 ? `Sell one duplicate · +${fmt(r.sell)}` : 'Only copy, nothing to sell'}</button>
          <button type="button" className="btn sec" autoFocus onClick={() => ref.current.close()}>Close</button>
        </div>
      </>
    )
  }

  return (
    <dialog className="rip" ref={ref} aria-labelledby="rip-title" onClose={onClose}>
      {stage && (
        <div className="stage">
          <svg className="seal" aria-hidden="true"><use href="#rosette" /></svg>
          {body}
        </div>
      )}
    </dialog>
  )
}
