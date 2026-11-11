import { ui, setView } from '../state/game.js'
import Wallet from './Wallet.jsx'
import Logo from './Logo.jsx'

const TABS = [
  ['home', 'Home'],
  ['store', 'Store'],
  ['inv', 'Inventory'],
]

// Sticky header: logo, the three tabs and the wallet.
export default function TopBar() {
  return (
    <header>
      <div className="brand">
        <Logo size={24} className="mark" />
        <h1>
          CT <span>Ripz</span>
        </h1>
      </div>
      <nav className="nav" id="nav" aria-label="Sections">
        {TABS.map(([v, name]) => (
          <button key={v} type="button" data-v={v} aria-current={ui.view == v ? 'page' : undefined} onClick={() => setView(v)}>
            {name}
          </button>
        ))}
      </nav>
      <Wallet />
    </header>
  )
}
