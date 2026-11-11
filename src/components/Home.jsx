import { useEffect, useRef, useState } from 'react'
import { T, TIERS } from '../data/game.js'
import { TOTAL } from '../art/helpers.js'
import { S, ui, BY, own, found, dupeValue, setView, dismissGuide, resetGame } from '../state/game.js'
import Coins from './Coins.jsx'
import Cell from './Cell.jsx'
import Rack from './Rack.jsx'
import Odds from './Odds.jsx'

// "Start over" asks for a second tap within three seconds instead of a confirm dialog.
function ResetButton() {
  const [armed, setArmed] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  function click() {
    if (!armed) {
      setArmed(true)
      timer.current = setTimeout(() => setArmed(false), 3000)
      return
    }
    clearTimeout(timer.current)
    setArmed(false)
    resetGame()
  }
  return (
    <button className="ghost" id="reset" type="button" onClick={click}>
      {armed ? 'Tap again to wipe coins and cards' : 'Start over'}
    </button>
  )
}

export default function Home() {
  const cur = ui.cur
  const totFound = T.reduce((n, t) => n + found(t), 0)
  const have = S.coins.toLocaleString('en-US')
  const list = S.recent.map((k) => BY[k]).filter((c) => c && own(c))
  return (
    <>
      <div className="home-cta">
        <div className="home-cta-text">
          <b id="homeCtaTitle">{totFound ? `Keep building your ${cur.name} binder` : 'Ready to rip your first pack?'}</b>
          <span id="homeCtaSub">
            {S.coins >= TIERS[0].cost
              ? `You have ${have} coins ready to spend in the Store.`
              : `You have ${have} coins — free +1,000 coins arrive every minute.`}
          </span>
        </div>
        <button className="primary" id="homeStoreBtn" type="button" onClick={() => setView('store')}>
          {totFound ? `Open ${cur.name} packs in Store →` : 'Go to the Store →'}
        </button>
      </div>
      <div className="guide" id="homeGuide" hidden={!!(totFound > 0 || S.guideDismissed)}>
        <div className="guide-head">
          <b>How CT Ripz works</b>
          <button className="ghost" id="dismissGuide" type="button" onClick={dismissGuide}>
            Got it, dismiss
          </button>
        </div>
        <ol className="guide-steps">
          <li>
            <b>
              <i>1</i>Earn coins
            </b>
            <span>Start with 1,000 coins and earn +1,000 free every minute while your balance is under 5,000.</span>
          </li>
          <li>
            <b>
              <i>2</i>Open packs
            </b>
            <span>
              Visit the Store to rip Single (100), Triple (270), or Mega (425, guaranteed Rare+) packs across 8 themes.
            </span>
          </li>
          <li>
            <b>
              <i>3</i>Sell duplicates
            </b>
            <span>
              Every extra copy sells for coins (10 to 1,500 by rarity) to fund more packs and finish your binders.
            </span>
          </li>
        </ol>
      </div>
      <div className="stats">
        <div>
          <b id="nOpened">{S.opened}</b>
          <span className="label">Packs ripped</span>
        </div>
        <div>
          <b id="nFound">
            {totFound}/{TOTAL}
          </b>
          <span className="label">Cards found</span>
        </div>
        <div>
          <b id="nDupes">
            <Coins n={dupeValue()} />
          </b>
          <span className="label">Duplicates worth</span>
        </div>
      </div>
      <section>
        <h2>Latest pulls</h2>
        {list.length ? (
          <div id="recent" className="recent">
            {list.map((c) => (
              <Cell key={c.key} c={c} navList={list} />
            ))}
          </div>
        ) : (
          <div id="recent" className="empty">
            <span>No cards yet. Open a pack in the Store and your newest pulls will show up here.</span>
          </div>
        )}
      </section>
      <section>
        <h2>Your collections</h2>
        <Rack id="rackH" home />
      </section>
      <section>
        <h2>Odds and sell prices</h2>
        <Odds id="odds" />
        <div className="foot">
          <ResetButton />
        </div>
      </section>
    </>
  )
}
