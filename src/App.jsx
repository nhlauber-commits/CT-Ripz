import { ui, useGame } from './state/game.js'
import Defs from './components/Defs.jsx'
import Scene from './components/Scene.jsx'
import Corners from './components/Corners.jsx'
import TopBar from './components/TopBar.jsx'
import Home from './components/Home.jsx'
import Store from './components/Store.jsx'
import Inventory from './components/Inventory.jsx'
import OpeningOverlay from './components/OpeningOverlay.jsx'
import Toast from './components/Toast.jsx'

// The React version of CT Ripz, ported from pack-rip.html (see PROMPT.md, Part 1).
export default function App() {
  useGame()
  const { view } = ui
  return (
    <>
      <Defs />
      <Scene view={view} />
      <TopBar />
      <div className="wrap">
        <Corners />
        <div className="view" id="v-home" hidden={view != 'home'}>
          {view == 'home' && <Home />}
        </div>
        <div className="view" id="v-store" hidden={view != 'store'}>
          {view == 'store' && <Store />}
        </div>
        <div className="view" id="v-inv" hidden={view != 'inv'}>
          {view == 'inv' && <Inventory />}
        </div>
      </div>
      <OpeningOverlay />
      <Toast />
    </>
  )
}
