import Logo from './Logo.jsx'
import Wallet from './Wallet.jsx'

export const TABS = [['home', 'Home'], ['store', 'Store'], ['inventory', 'Inventory'], ['stats', 'Stats']]

export default function TopBar({ tab, setTab }) {
  const onKey = (e, k) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = TABS[(k + step + TABS.length) % TABS.length][0]
    setTab(next)
    document.getElementById('tab-' + next)?.focus()
  }
  return (
    <header className="bar">
      <div className="brand">
        <span className="mark"><Logo /></span>
        <h1 className="misreg">CT <span>Ripz</span></h1>
      </div>
      <nav className="tabs" role="tablist" aria-label="Sections">
        {TABS.map(([id, name], k) => (
          <button key={id} type="button" role="tab" id={'tab-' + id} aria-controls={id} aria-selected={tab === id}
            tabIndex={tab === id ? 0 : -1} onClick={() => setTab(id)} onKeyDown={(e) => onKey(e, k)}>{name}</button>
        ))}
      </nav>
      <Wallet />
    </header>
  )
}
