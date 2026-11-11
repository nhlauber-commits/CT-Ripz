import { TIERS } from '../data/game.js'
import { S, ui } from '../state/game.js'
import Coins from './Coins.jsx'
import Rack from './Rack.jsx'
import Odds from './Odds.jsx'
import PackOffer from './PackOffer.jsx'

export default function Store() {
  const affordable = TIERS.filter((t) => S.coins >= t.cost).length
  const have = (
    <>
      You have{' '}
      <b>
        <Coins n={S.coins} />
      </b>{' '}
      ·{' '}
    </>
  )
  return (
    <>
      <section>
        <h2>Pick a theme</h2>
        <Rack id="rackS" />
      </section>
      <section>
        <div className="shelf-head">
          <h2 id="shelfTitle">{ui.cur.name} packs</h2>
          <span className="shelf-sub" id="shelfSub">
            {have}
            {affordable === TIERS.length ? (
              'All 3 pack tiers available'
            ) : affordable > 0 ? (
              `${affordable} of ${TIERS.length} tiers affordable`
            ) : (
              <>
                Short <Coins n={TIERS[0].cost - S.coins} /> for a Single pack
              </>
            )}
          </span>
        </div>
        <div className="offers" id="offers">
          {TIERS.map((tier, ti) => (
            <PackOffer key={tier.name} tier={tier} ti={ti} />
          ))}
        </div>
        <div className="store-odds">
          <div className="store-odds-head">
            <span className="label">Pull odds &amp; duplicate sell prices</span>
            <span className="store-odds-note">Mega pack guarantees at least 1 Rare or better</span>
          </div>
          <Odds id="storeOdds" />
        </div>
      </section>
    </>
  )
}
