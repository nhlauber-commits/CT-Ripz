// The price tag under one pack: name, what is inside, price, and the buy button.
export default function PackOffer({ tier, coins, onBuy }) {
  const ok = coins >= tier.cost
  return (
    <div className="tag">
      <h3>{tier.name}</h3>
      <p>{tier.note}</p>
      <div className="price"><b className="num">{tier.cost}</b><span>coins</span></div>
      <button type="button" className="btn" disabled={!ok} onClick={onBuy}>Rip {tier.name.toLowerCase()}</button>
      <span className="short">{ok ? '' : `${(tier.cost - coins).toLocaleString('en-US')} coins short`}</span>
    </div>
  )
}
