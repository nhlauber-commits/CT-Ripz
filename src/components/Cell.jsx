import { R } from '../data/game.js'
import { own, showCard } from '../state/game.js'
import Card from './Card.jsx'

// An owned card as a button that opens its detail; shows ×N when there are duplicates.
export default function Cell({ c, navList }) {
  const n = own(c)
  return (
    <button
      type="button"
      className="cell"
      aria-label={`${c.n}, ${R[c.ri].name}, you own ${n}`}
      onClick={() => showCard(c, navList)}
    >
      <Card c={c} />
      {n > 1 && <span className="cnt">×{n}</span>}
    </button>
  )
}
