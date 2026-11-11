import { ui, setView } from '../state/game.js'
import Wallet from './Wallet.jsx'

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
        <svg className="mark" viewBox="0 0 28 28" aria-hidden="true">
          <rect x="2" y="2" width="24" height="24" rx="2.5" fill="var(--navy-hi)" stroke="var(--gold)" strokeWidth="1.5" />
          <path d="M6.5 9h15M6.5 19h15" stroke="var(--gold)" strokeWidth=".75" opacity=".45" />
          <path
            d="M12.5 10.8a3.6 3.6 0 1 0 0 6.4M14.5 10.4h5M17 10.4v7.2"
            fill="none"
            stroke="var(--gold-hi)"
            strokeWidth="1.75"
            strokeLinecap="square"
          />
        </svg>
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
