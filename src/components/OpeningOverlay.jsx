import { useEffect, useRef, useState } from 'react'
import { R, TIERS } from '../data/game.js'
import { useGame, own, sellOne } from '../state/game.js'
import Card from './Card.jsx'
import Logo from './Logo.jsx'
import Burst from './Burst.jsx'
import Pack from './Pack.jsx'

const fmt = (n) => n.toLocaleString('en-US')
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const SHAKE = 1300 // how long the pack shakes before it bursts open

// The stage. Two uses: a freshly opened pack (cards arrive face down and are turned over),
// and a single owned card looked at up close, where one duplicate can be sold.
export default function OpeningOverlay({ stage, onAgain, onClose }) {
  const S = useGame()
  const ref = useRef(null)
  // Which cards are face up, tied to the pack they belong to, so a new pack never shows the last one's state.
  const [upS, setUpS] = useState({ id: null, list: [] })
  const up = upS.id === stage?.id ? upS.list : []
  const setUp = (f) => setUpS((s) => ({ id: stage.id, list: typeof f == 'function' ? f(s.id === stage.id ? s.list : []) : f }))
  const done = useRef(null)
  const [ripped, setRipped] = useState(true)
  // A new pack shakes first, then bursts into its cards. Clicking the pack skips the wait.
  useEffect(() => {
    if (stage?.kind !== 'pull' || still()) { setRipped(true); return }
    setRipped(false)
    const id = setTimeout(() => setRipped(true), SHAKE)
    return () => clearTimeout(id)
  }, [stage?.id])
  useEffect(() => {
    const d = ref.current
    if (stage && !d.open) { d.showModal(); d.querySelector('[data-focus]')?.focus() } // never open with focus on a selling button
    if (!stage && d.open) d.close()
  }, [stage])

  const gold = stage?.kind === 'pull' && ripped && stage.pulls.some((p, i) => up[i] && p.c.ri === 4)
  let body = null
  if (stage?.kind === 'pull') {
    const tier = TIERS[stage.ti], { pulls, rs } = stage
    const all = pulls.every((_, i) => up[i]), best = Math.max(...rs)
    const fresh = pulls.filter((p) => p.isNew).length, dupes = tier.n - fresh, can = S.coins >= tier.cost
    body = !ripped ? (
      <>
        <h2 id="rip-title" className="misreg">{tier.name} pack<small role="status">{stage.theme.name}. Ripping it open.</small></h2>
        <button type="button" className="shaker" autoFocus aria-label="Open the pack now" onClick={() => setRipped(true)}>
          <Pack t={stage.theme} tier={tier} />
        </button>
      </>
    ) : (
      <>
        <h2 id="rip-title" className="misreg">{tier.name} pack<small>{stage.theme.name}. {all ? 'All cards turned.' : 'Turn each card over.'}</small></h2>
        {gold && <div className="flash" aria-hidden="true" />}
        <div className="pull dealt">
          {pulls.map((p, i) => (
            <button key={stage.id + ':' + i} type="button" className={'flip' + (p.c.ri === 4 ? ' legend' : '')} style={{ '--i': i }} aria-pressed={!!up[i]} autoFocus={i === 0}
              aria-label={up[i] ? `${p.c.n}, ${R[p.c.ri].name}${p.isNew ? ', new' : ''}` : 'Face-down card. Turn over'}
              onClick={() => setUp((u) => { const n = [...u]; n[i] = true; return n })}>
              <span className="inner">
                <span className="face backface">
                  <Burst />
                  <span className="mark"><Logo /></span>
                </span>
                <span className="face front"><Card c={p.c} /></span>
              </span>
              {up[i] && p.c.ri === 4 && <span className="legtag" aria-hidden="true">Legendary!</span>}
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
          {!all && <button type="button" className="btn" onClick={() => { setUp(pulls.map(() => true)); done.current?.focus() }}>Reveal all</button>}
          {all && <button type="button" className="btn" disabled={!can} onClick={onAgain}>{can ? `Open another ${tier.name} · ${tier.cost}` : 'Not enough coins for another'}</button>}
          <button type="button" className="btn sec" ref={done} onClick={() => ref.current.close()}>Done</button>
        </div>
      </>
    )
  } else if (stage?.kind === 'card') {
    const c = stage.c, r = R[c.ri], n = own(c)
    body = (
      <>
        <h2 id="rip-title" className="misreg">{c.n}<small>{c.t.name}, {c.t.g[c.k]}</small></h2>
        <div className="pull"><span className={'flip solo' + (c.ri === 4 ? ' legend up' : '')}><Card c={c} /></span></div>
        <p className="result" data-r={r.id} role="status"><b>{r.name}</b>You own {n}. Each copy sells for {fmt(r.sell)} coins.</p>
        <div className="acts">
          <button type="button" className="btn" disabled={n < 2} onClick={() => sellOne(c)}>{n > 1 ? `Sell one duplicate · +${fmt(r.sell)}` : 'Only copy, nothing to sell'}</button>
          <button type="button" className="btn sec" data-focus onClick={() => ref.current.close()}>Close</button>
        </div>
      </>
    )
  }

  return (
    <dialog className="rip" ref={ref} aria-labelledby="rip-title" onClose={onClose}>
      {stage && (
        <div className="stage">
          <div className={'rays' + (gold ? ' gold' : '')} aria-hidden="true" />
          <div className="ht" aria-hidden="true" />
          {body}
        </div>
      )}
    </dialog>
  )
}
