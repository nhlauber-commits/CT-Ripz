import { TIERS } from '../data/game.js'
import { art } from '../art/art.js'
import { ART } from '../state/art-list.js'
import Burst from './Burst.jsx'

// Which legendary each pack size shows: Mega gets the theme's flagship, Single and Triple the next two.
export function packLegendary(t, tier) {
  const legs = t.cards.filter((c) => c.ri === 4)
  const flag = legs.find((c) => c.n === t.em) || legs[0]
  const rest = legs.filter((c) => c !== flag)
  return [rest[0], rest[1], flag][TIERS.indexOf(tier)] || flag
}

// A crimped foil pack in the theme's colours. One legendary's art sits in the yellow sunburst.
export default function Pack({ t, tier }) {
  const c = packLegendary(t, tier)
  return (
    <div className="pack" aria-hidden="true" style={{ '--ta': t.a, '--tb': t.b }}>
      <div className="wrap">
        <span className="sun">
          <Burst />
          {ART.has(c.key)
            ? <span className="disc"><img src={`art/${t.id}_${c.i}.jpg`} alt="" /></span>
            : <span className="disc" dangerouslySetInnerHTML={{ __html: art(c) }} />}
        </span>
        <b>{t.name}</b>
        <i>{tier.name}</i>
      </div>
    </div>
  )
}
