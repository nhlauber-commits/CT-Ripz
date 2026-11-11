import { useState } from 'react'
import { R } from '../data/game.js'
import { art } from '../art/art.js'
import { IMG, ART } from '../state/art-list.js'
import { num } from '../state/game.js'

// One card: metal frame tinted by rarity, full-bleed art, name top-left, rarity tab top-right.
// Built from spans so it can sit inside a button.
export default function Card({ c }) {
  const [broken, setBroken] = useState(false)
  const r = R[c.ri], photo = IMG[c.t.id + ':' + c.n]

  if (photo && !broken) {
    return (
      <span className="card photo" data-r={r.id}>
        <img src={photo} alt={c.n + ', ' + r.name} onError={() => setBroken(true)} />
        <span className="sheen" />
      </span>
    )
  }
  const painted = ART.has(c.key) && !broken
  return (
    <span className="card" data-r={r.id}>
      <span className="in">
        {painted
          ? <span className="art"><img src={`art/${c.t.id}_${c.i}.jpg`} alt="" loading="lazy" onError={() => setBroken(true)} /></span>
          : <span className="art" dangerouslySetInnerHTML={{ __html: art(c) }} />}
      </span>
      <span className="nm">{c.n}</span>
      <span className="tb">{r.name}</span>
      <span className="bl">{r.name}</span>
      <span className="br">{c.t.g[c.k]} · {num(c)}</span>
      <span className="sheen" />
    </span>
  )
}
