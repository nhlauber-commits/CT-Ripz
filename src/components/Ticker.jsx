// The scrolling strip along the top. Decorative: hidden from assistive tech.
const ITEMS = ['Rip it', 'Rip that shit', 'Rip, Rip, Rip that shit']

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div>
        {[0, 1, 2, 3, 4, 5, 6, 7].flatMap((k) => ITEMS.flatMap((t, i) => [<span key={k + 't' + i}>{t}</span>, <span key={k + 's' + i}>✶</span>]))}
      </div>
    </div>
  )
}
