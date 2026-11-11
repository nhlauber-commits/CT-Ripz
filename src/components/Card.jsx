import { memo, useMemo } from 'react'
import { R } from '../data/game.js'
import { art } from '../art/art.js'
import { IMG, ART, num, imageFailed, useGame } from '../state/game.js'

// One card face: a full photo (IMG), painted art (ART) or the drawn SVG.
function Card({ c }) {
  useGame() // an image that fails to load switches every copy of the card to the drawn art
  const r = R[c.ri],
    ik = c.t.id + ':' + c.n
  const painted = ART.has(c.key)
  const svg = useMemo(() => (IMG[ik] || painted ? null : { __html: art(c) }), [c, ik, painted])
  if (IMG[ik]) {
    return (
      <div className="card photo" data-r={r.id}>
        <img src={IMG[ik]} alt={`${c.n}, ${r.name}`} onError={() => imageFailed(c)} />
        <div className="foil"></div>
      </div>
    )
  }
  return (
    <div className={painted ? 'card painted' : 'card'} data-r={r.id}>
      <div className="in">
        {painted ? (
          <div className="art">
            <img src={`art/${c.t.id}_${c.i}.jpg`} alt="" loading="lazy" onError={() => imageFailed(c)} />
          </div>
        ) : (
          <div className="art" dangerouslySetInnerHTML={svg}></div>
        )}
        <div className="nm">{c.n}</div>
        <div className="tab">{r.name}</div>
        <div className="bl">{r.name}</div>
        <div className="br">
          {c.t.g[c.k]} · {num(c)}
        </div>
      </div>
      <div className="foil"></div>
    </div>
  )
}
export default memo(Card)
