import { useEffect, useState } from 'react'
import { T } from './data/game.js'
import { openPack } from './state/game.js'
import Defs from './components/Defs.jsx'
import Scene from './components/Scene.jsx'
import Ticker from './components/Ticker.jsx'
import TopBar from './components/TopBar.jsx'
import Home from './components/Home.jsx'
import Store from './components/Store.jsx'
import Inventory from './components/Inventory.jsx'
import Stats from './components/Stats.jsx'
import OpeningOverlay from './components/OpeningOverlay.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  const [theme, setTheme] = useState(T[0])
  const [stage, setStage] = useState(null) // { kind: 'pull' | 'card', ... } while the overlay is open

  useEffect(() => { document.body.dataset.tab = tab; window.scrollTo(0, 0) }, [tab])

  // Foil follows the pointer on whichever card it is over.
  useEffect(() => {
    const move = (e) => {
      const c = e.target.closest && e.target.closest('.card')
      if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(0) + '%')
      c.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(0) + '%')
    }
    document.addEventListener('pointermove', move)
    return () => document.removeEventListener('pointermove', move)
  }, [])

  const buy = (t, ti) => {
    const res = openPack(t, ti)
    if (res) setStage({ kind: 'pull', id: Date.now(), theme: t, ti, ...res })
  }
  const showCard = (c) => setStage({ kind: 'card', id: c.key, c })
  const go = (id) => { setTab(id); document.getElementById('tab-' + id)?.focus() }

  return (
    <>
      <Defs />
      <Scene />
      <Ticker />
      <div className="frame">
        <TopBar tab={tab} setTab={setTab} />
        <main>
          <Home active={tab === 'home'} go={go} showCard={showCard} />
          <Store active={tab === 'store'} theme={theme} setTheme={setTheme} onBuy={(ti) => buy(theme, ti)} />
          <Inventory active={tab === 'inventory'} theme={theme} setTheme={setTheme} showCard={showCard} />
          <Stats active={tab === 'stats'} go={go} showCard={showCard} />
        </main>
      </div>
      <OpeningOverlay stage={stage} onAgain={() => buy(stage.theme, stage.ti)} onClose={() => setStage(null)} />
    </>
  )
}
