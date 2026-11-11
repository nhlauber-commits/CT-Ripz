import { R } from '../data/game.js'
import Coins from './Coins.jsx'

// Pull odds and sell price for each rarity.
export default function Odds({ id }) {
  return (
    <ul className="odds" id={id}>
      {R.map((r) => (
        <li key={r.id} data-r={r.id}>
          <i></i>
          <b>{r.name}</b> {r.w}% · sells <Coins n={r.sell} />
        </li>
      ))}
    </ul>
  )
}
