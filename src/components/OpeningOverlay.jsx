import { useEffect, useRef } from 'react'
import { R } from '../data/game.js'
import { fx } from '../art/helpers.js'
import {
  S,
  ui,
  calm,
  own,
  num,
  navList,
  revealing,
  revealNow,
  openPack,
  sellPackDupes,
  sellOne,
  stepCard,
  closeStage,
} from '../state/game.js'
import Coins from './Coins.jsx'
import Card from './Card.jsx'
import Pack from './Pack.jsx'

// A pack being opened: the sealed wrapper, then the cards flipping over, then the summary.
function packStage(st) {
  const { t, ti, tier, pulls, best, nw } = st
  const slot = st.flips ? (
    pulls.map((p, i) => (
      <div key={i} className={('flip ' + st.flips[i]).trim()}>
        <Card c={p.c} />
        <div className="back">
          <span>CT</span>
        </div>
        {p.isNew ? (
          <span className="new">NEW</span>
        ) : (
          <span className="dupe-badge">{p.sold ? 'SOLD' : `DUPLICATE · +${R[p.c.ri].sell}`}</span>
        )}
      </div>
    ))
  ) : (
    <Pack t={t} ti={ti} />
  )
  if (!st.done) {
    return {
      slot,
      result: (
        <>
          <b>
            Opening {t.name} {tier.name} pack…
          </b>
          <span>Tap anywhere or press Space to reveal all at once</span>
        </>
      ),
      actions: [{ cls: 'ghost', label: 'Reveal all now (Space)', fn: revealNow }],
    }
  }
  const unsold = pulls.filter((p) => !p.isNew && !p.sold && own(p.c) > 1)
  const dupeVal = unsold.reduce((sum, p) => sum + R[p.c.ri].sell, 0)
  const bestCard = pulls.find((p) => p.c.ri === best).c
  const s = (n) => (n == 1 ? '' : 's')
  const can = S.coins >= tier.cost,
    short = tier.cost - S.coins
  return {
    slot,
    r: R[best].id,
    result: (
      <>
        <b>{tier.n == 1 ? `${R[best].name} — ${pulls[0].c.n}` : `Best pull: ${R[best].name} (${bestCard.n})`}</b>
        <span>
          {unsold.length ? (
            <>
              {nw} new · {unsold.length} duplicate{s(unsold.length)} worth <Coins n={dupeVal} />
            </>
          ) : st.soldCount ? (
            <>
              {nw} new · Sold {st.soldCount} duplicate{s(st.soldCount)} for <Coins n={st.soldCoins} />
            </>
          ) : tier.n == 1 ? (
            'New to your binder!'
          ) : (
            `All ${nw} cards are new to your binder!`
          )}
        </span>
        <div className="result-pills">
          {pulls.map((p, i) => (
            <span key={i} data-r={R[p.c.ri].id}>
              <i></i>
              {p.c.n} ({p.isNew ? 'New' : p.sold ? 'Sold' : '×' + own(p.c)})
            </span>
          ))}
        </div>
      </>
    ),
    actions: [
      {
        cls: 'primary',
        off: !can,
        fn: () => openPack(ti),
        label: can ? (
          <>
            Open another {tier.name} · <Coins n={tier.cost} />
          </>
        ) : (
          <>
            Need <Coins n={short} /> more for {tier.name}
          </>
        ),
      },
      {
        cls: 'sell',
        off: !unsold.length,
        fn: sellPackDupes,
        label: unsold.length ? (
          <>
            Sell duplicates from this pack ({unsold.length}) · +<Coins n={dupeVal} />
          </>
        ) : st.soldCount ? (
          <>
            Sold duplicates from this pack · +<Coins n={st.soldCoins} />
          </>
        ) : (
          'No duplicates in this pack'
        ),
      },
      { cls: 'ghost', label: 'Done', fn: closeStage },
    ],
  }
}

// One owned card in detail, with Previous / Next through the list it was opened from.
function cardStage(st) {
  const c = st.c,
    n = own(c),
    r = R[c.ri]
  const list = navList(),
    idx = list.indexOf(c),
    tot = list.length
  return {
    r: r.id,
    slotCls: 'slot n1',
    slot: (
      <div key={c.key + ':' + st.focus} className="flip up">
        <Card c={c} />
        <span className={n > 1 ? 'new' : 'dupe-badge'}>OWNED ×{n}</span>
      </div>
    ),
    result: (
      <>
        <b>
          {c.n} · {r.name}
        </b>
        <span>
          {c.t.g[c.k]} · {num(c)} · You own {n} {n == 1 ? 'copy' : 'copies'} · Duplicate sells for <Coins n={r.sell} />
          {idx >= 0 && tot > 0 ? ` · Card ${idx + 1} of ${tot}` : ''}
        </span>
      </>
    ),
    actions: [
      { cls: 'ghost', label: '← Previous', off: idx <= 0, fn: () => stepCard(-1) },
      {
        cls: 'primary',
        off: n < 2,
        fn: () => sellOne(c),
        label:
          n > 1 ? (
            <>
              Sell one duplicate · +<Coins n={r.sell} />
            </>
          ) : (
            'Only copy, nothing to sell'
          ),
      },
      { cls: 'ghost', label: 'Next →', off: idx < 0 || idx >= tot - 1, fn: () => stepCard(1) },
      { cls: 'ghost', label: 'Close', fn: closeStage },
    ],
  }
}

export default function OpeningOverlay() {
  const st = ui.stage
  const stage = useRef(null),
    actions = useRef(null)
  const focus = st ? st.focus : 0

  // Each new set of buttons puts the keyboard on the first one that can be pressed.
  useEffect(() => {
    if (!focus) return
    const f = actions.current.querySelector('button:not(:disabled)')
    if (f) f.focus()
  }, [focus])

  useEffect(() => {
    function key(e) {
      if (!ui.stage) return
      if (revealing() && (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape')) {
        e.preventDefault()
        revealNow()
        return
      }
      if (ui.stage.kind == 'card' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        if (stepCard(e.key === 'ArrowLeft' ? -1 : 1)) e.preventDefault()
        return
      }
      if (e.key === 'Escape') closeStage()
    }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [])

  function click(e) {
    if (revealing()) {
      if (!e.target.closest || !e.target.closest('#actions button')) revealNow()
      return
    }
    if (e.target === stage.current) closeStage()
  }
  // The face-up card leans toward the pointer and its foil follows it.
  function move(e) {
    const f = e.target.closest && e.target.closest('.flip.up')
    if (!f || calm) return
    const b = f.getBoundingClientRect(),
      px = (e.clientX - b.left) / b.width,
      py = (e.clientY - b.top) / b.height
    f.classList.add('tilt')
    f.style.transform = `rotateY(${fx((px - 0.5) * 24)}deg) rotateX(${fx((0.5 - py) * 24)}deg)`
    f.style.setProperty('--mx', fx(px * 100) + '%')
    f.style.setProperty('--my', fx(py * 100) + '%')
  }
  function out(e) {
    const f = e.target.closest && e.target.closest('.flip.up')
    if (f && !f.contains(e.relatedTarget)) {
      f.classList.remove('tilt')
      f.style.transform = ''
    }
  }

  const v = !st ? null : st.kind == 'pack' ? packStage(st) : cardStage(st)
  return (
    <div className="stage" id="stage" ref={stage} hidden={!st} onClick={click} onPointerMove={move} onPointerOut={out}>
      <div className="stage-in">
        <div className={v ? v.slotCls || 'slot n' + st.tier.n : 'slot'} id="slot">
          {v && v.slot}
        </div>
        {/* a div, not the <p> of pack-rip.html: the summary holds a div, which a <p> may not contain */}
        <div className="result" id="result" aria-live="polite" data-r={v ? v.r : undefined}>
          {v && v.result}
        </div>
        <div className="actions" id="actions" ref={actions} hidden={!v}>
          {v &&
            v.actions.map((a, i) => (
              <button key={i} className={a.cls} type="button" disabled={!!a.off} onClick={a.fn}>
                {a.label}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
