import { useState } from 'react'

// Shell for the React version of CT Ripz.
// The playable game still lives in ../pack-rip.html until it is ported here
// (see PROMPT.md). Each tab becomes its own component in src/components/.
const TABS = ['Home', 'Store', 'Inventory']

export default function App() {
  const [tab, setTab] = useState('Home')

  return (
    <div className="app">
      <header className="bar">
        <h1>CT <span>Ripz</span></h1>
        <nav role="tablist" aria-label="Sections">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={tab === t ? 'tab on' : 'tab'}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>
      <main className="view">
        <h2>{tab}</h2>
        <p>Not ported yet. The working game is pack-rip.html.</p>
      </main>
    </div>
  )
}
