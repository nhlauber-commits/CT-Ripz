// A coin icon followed by an amount, e.g. the price on a button.
export default function Coins({ n }) {
  return (
    <>
      <i className="coin"></i>
      {n.toLocaleString('en-US')}
    </>
  )
}
