import { PAY, WAIT, CAP } from '../data/game.js'
import { S, useTick } from '../state/game.js'

// Coin balance and the countdown to the next free coins.
export default function Wallet() {
  useTick()
  const capped = S.coins >= CAP,
    left = capped ? WAIT : Math.max(0, WAIT - (Date.now() - S.last)),
    sec = Math.ceil(left / 1000)
  const cap = CAP.toLocaleString('en-US'),
    pay = PAY.toLocaleString('en-US')
  return (
    <div className={capped ? 'wallet paused' : 'wallet'} id="wallet">
      <div className="bal">
        <i className="coin"></i>
        <span id="nCoins">{S.coins.toLocaleString('en-US')}</span>
      </div>
      <div className="next">
        <span id="walletStatus">
          {capped ? (
            <b>Paused at {cap}</b>
          ) : (
            <>
              +<b>{pay}</b>/min in{' '}
              <b>
                {Math.floor(sec / 60)}:{String(sec % 60).padStart(2, '0')}
              </b>
            </>
          )}
        </span>
        <span className="rule" id="walletRule">
          {capped ? `Spend <${cap} for +${pay}/min` : `Free every min, pauses at ${cap}`}
        </span>
        <span className="meter">
          <i id="meter" style={{ width: (capped ? 0 : 100 - (left / WAIT) * 100) + '%' }}></i>
        </span>
      </div>
    </div>
  )
}
