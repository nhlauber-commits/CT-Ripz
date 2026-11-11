import { S, ui, openPack } from '../state/game.js'
import Coins from './Coins.jsx'
import Pack from './Pack.jsx'

// One pack tier on the shelf: the wrapper, its price and a buy button.
export default function PackOffer({ tier, ti }) {
  const cur = ui.cur
  const can = S.coins >= tier.cost,
    short = tier.cost - S.coins
  return (
    <div className={can ? 'offer' : 'offer short'}>
      <Pack
        t={cur}
        ti={ti}
        tag="button"
        type="button"
        disabled={!can}
        aria-label={
          can
            ? `Open a ${cur.name} ${tier.name} pack for ${tier.cost} coins`
            : `${cur.name} ${tier.name} pack costs ${tier.cost} coins, short ${short} coins`
        }
        onClick={() => openPack(ti)}
      />
      <div className="info">
        <b>{tier.name} pack</b>
        <span>{tier.note}</span>
        <div className="price">
          <Coins n={tier.cost} />
        </div>
        <span className="status">
          {can ? (
            `Can afford (${Math.floor(S.coins / tier.cost)}×)`
          ) : (
            <>
              Short <Coins n={short} />
            </>
          )}
        </span>
      </div>
      <button className="buy" type="button" disabled={!can} onClick={() => openPack(ti)}>
        {can ? (
          <>
            Buy · <Coins n={tier.cost} />
          </>
        ) : (
          <>
            Need <Coins n={short} /> more
          </>
        )}
      </button>
    </div>
  )
}
