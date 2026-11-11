import { useEffect, useState } from 'react'
import { PAY, CAP } from '../data/game.js'
import { useGame, tick, untilPay } from '../state/game.js'

const fmt = (n) => n.toLocaleString('en-US')

// Coin balance and the free-coin countdown. Also drives the once-a-second game tick.
export default function Wallet() {
  const S = useGame()
  const [, beat] = useState(0)
  useEffect(() => {
    const id = setInterval(() => { tick(); beat((n) => n + 1) }, 1000)
    return () => clearInterval(id)
  }, [])

  const left = untilPay(), sec = left == null ? 0 : Math.ceil(left / 1000)
  const clock = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0')
  return (
    <div className="wallet">
      <svg aria-hidden="true"><use href="#coin" /></svg>
      <div>
        <span className="num"><span className="vh">Coins: </span>{fmt(S.coins)}</span>
        <small>{left == null ? `Paused at ${fmt(CAP)}` : `+${fmt(PAY)} in ${clock}`}</small>
      </div>
    </div>
  )
}
