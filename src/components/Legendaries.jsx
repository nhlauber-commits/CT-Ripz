import { useEffect, useRef, useState } from 'react'
import { T } from '../data/game.js'
import Card from './Card.jsx'

// Every legendary, one theme after another: four rounds of eight.
const LEG = [0, 1, 2, 3].flatMap((i) => T.map((t) => t.cards.filter((c) => c.ri === 4)[i]))
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// A small stack of legendary cards. Every few seconds the top card slides off and tucks under the stack.
export default function Legendaries({ active }) {
  const [slots, setSlots] = useState([{ id: 0, k: 0, pos: 0 }, { id: 1, k: 1, pos: 1 }, { id: 2, k: 2, pos: 2 }])
  const [phase, setPhase] = useState('rest') // rest | out | under
  const [paused, setPaused] = useState(false)
  const hover = useRef(false), next = useRef(3), timers = useRef([])
  const live = useRef({})

  const settle = () => {
    const k = next.current
    next.current = (k + 1) % LEG.length
    setSlots((s) => s.map((x) => (x.pos === 0 ? { ...x, k, pos: 2 } : { ...x, pos: x.pos - 1 })))
    setPhase('rest')
  }
  const deal = () => {
    if (phase !== 'rest') return
    if (still()) { settle(); return }
    setPhase('out')
    timers.current = [setTimeout(() => setPhase('under'), 700), setTimeout(settle, 950)]
  }
  live.current = { deal, paused, active }

  useEffect(() => {
    const id = setInterval(() => {
      const l = live.current
      if (l.active && !l.paused && !hover.current && !document.hidden && !still()) l.deal()
    }, 4500)
    return () => { clearInterval(id); timers.current.forEach(clearTimeout) }
  }, [])

  const top = LEG[slots.find((s) => s.pos === 0).k]
  const hold = (v) => () => { hover.current = v }
  return (
    <div className="plate show" onPointerEnter={hold(true)} onPointerLeave={hold(false)} onFocus={hold(true)} onBlur={hold(false)}>
      <div>
        <div className="rule"><h3>Legendaries</h3></div>
        <p className="lg-name foil-text">{top.n}</p>
        <p className="lg-meta">{top.t.name}, {top.t.g[top.k]}</p>
        <p className="lg-fact">Four in every theme. 2% of pulls. Sells for 1,500 coins.</p>
        <div className="acts">
          {!still() && <button type="button" className="btn sec" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>{paused ? 'Play' : 'Pause'}</button>}
          <button type="button" className="btn sec" onClick={deal}>Next card</button>
        </div>
      </div>
      <div className="deck" aria-hidden="true">
        {slots.map((s) => (
          <div key={s.id} className={'dc' + (s.pos === 0 && phase !== 'rest' ? ' out' : '') + (s.pos === 0 && phase === 'under' ? ' under' : '')} data-pos={s.pos}>
            <Card c={LEG[s.k]} />
          </div>
        ))}
      </div>
    </div>
  )
}
