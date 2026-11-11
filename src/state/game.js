// All game state lives here: the saved game (S), what the screen is showing (ui), and every
// action that changes them. Ported from the state, rendering and opening-packs sections of
// pack-rip.html. Same localStorage key and shape, so a save from either version loads in the other.
//
// Components call useGame() to re-render when anything changes, and read S / ui directly.
import { useSyncExternalStore } from 'react'
import { R, TIERS, START, PAY, WAIT, CAP, T } from '../data/game.js'
import '../art/helpers.js' // builds t.cards for every theme
import { IMG, ART } from './artFiles.js'

export const KEY = 'packrip-v2'
export { IMG, ART }

export let S = { coins: START, opened: 0, owned: {}, last: Date.now(), recent: [] }
try {
  const s = JSON.parse(localStorage.getItem(KEY))
  if (s && s.owned && typeof s.coins == 'number') S = Object.assign(S, s)
} catch (e) {}
if (!Array.isArray(S.recent)) S.recent = []
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(S))
  } catch (e) {}
}

export const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
export const BY = {}
T.forEach((t) => t.cards.forEach((c) => (BY[c.key] = c)))

// What the screen is showing. stage is null, a pack being opened, or one card in detail.
export const ui = {
  cur: T.find((t) => t.id === S.theme) || T[0],
  view: ['home', 'store', 'inv'].includes(S.view) ? S.view : 'home',
  filter: -1,
  searchQuery: '',
  ownedOnly: false,
  dupesOnly: false,
  sortBy: 'num',
  stage: null,
  toast: null,
}
let cardNavList = []
let busy = false
let focusN = 0

/* ---------- subscriptions ---------- */
let version = 0
let tickVersion = 0
const subs = new Set()
const tickSubs = new Set()
function emitTick() {
  tickVersion++
  tickSubs.forEach((f) => f())
}
function emit() {
  version++
  subs.forEach((f) => f())
  emitTick()
}
const sub = (set) => (f) => {
  set.add(f)
  return () => set.delete(f)
}
const subscribe = sub(subs)
const subscribeTick = sub(tickSubs)
// Re-renders the component whenever the game changes.
export const useGame = () => useSyncExternalStore(subscribe, () => version)
// Re-renders once a second as well (the wallet countdown).
export const useTick = () => useSyncExternalStore(subscribeTick, () => tickVersion)

function refresh() {
  S.view = ui.view
  S.theme = ui.cur.id
  save()
  emit()
}

/* ---------- reading ---------- */
export const own = (c) => S.owned[c.key] || 0
export const found = (t) => t.cards.filter(own).length
export const num = (c) => '#' + String(c.i + 1).padStart(3, '0')
function roll(min = 0) {
  const pool = R.slice(min)
  let x = Math.random() * pool.reduce((n, r) => n + r.w, 0)
  for (let i = 0; i < pool.length; i++) {
    if (x < pool[i].w) return i + min
    x -= pool[i].w
  }
  return min
}
export function dupeCount() {
  let n = 0
  T.forEach((t) =>
    t.cards.forEach((c) => {
      if (own(c) > 1) n += own(c) - 1
    }),
  )
  return n
}
export function dupeValue() {
  let v = 0
  T.forEach((t) =>
    t.cards.forEach((c) => {
      if (own(c) > 1) v += (own(c) - 1) * R[c.ri].sell
    }),
  )
  return v
}
export function getFilteredBinder() {
  const { cur, filter, ownedOnly, dupesOnly, sortBy } = ui
  const q = ui.searchQuery.trim().toLowerCase()
  const list = cur.cards.filter((c) => {
    if (filter >= 0 && c.ri !== filter) return false
    if (ownedOnly && !own(c)) return false
    if (dupesOnly && own(c) < 2) return false
    if (q && !c.n.toLowerCase().includes(q)) return false
    return true
  })
  return list.slice().sort((a, b) => {
    if (sortBy === 'rarity') return b.ri - a.ri || own(b) - own(a) || a.i - b.i
    if (sortBy === 'copies') return own(b) - own(a) || b.ri - a.ri || a.i - b.i
    return a.i - b.i
  })
}
// The owned cards that Previous / Next step through in the card detail.
export const navList = () => cardNavList

/* ---------- toast ---------- */
let toastTimer = null
export function toast(msg) {
  ui.toast = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    ui.toast = null
    emit()
  }, 3400)
  emit()
}

/* ---------- images that fail to load fall back to the drawn art ---------- */
export function imageFailed(c) {
  const ik = c.t.id + ':' + c.n
  if (IMG[ik]) delete IMG[ik]
  else ART.delete(c.key)
  emit()
}

/* ---------- tabs, themes, binder filters ---------- */
export function setView(v) {
  ui.view = v
  refresh()
}
export function pickTheme(t, fromHome) {
  if (t !== ui.cur) clearBinderFilters()
  ui.cur = t
  ui.filter = -1
  if (fromHome) ui.view = 'inv'
  refresh()
}
export function dismissGuide() {
  S.guideDismissed = true
  save()
  emit()
}
export function setFilter(ri) {
  ui.filter = ri
  emit()
}
export function setSearch(q) {
  ui.searchQuery = q
  emit()
}
export function setSort(v) {
  ui.sortBy = v
  emit()
}
export function toggleOwned() {
  ui.ownedOnly = !ui.ownedOnly
  emit()
}
export function toggleDupes() {
  ui.dupesOnly = !ui.dupesOnly
  emit()
}
// Search, rarity and ownership filters go back to showing everything. The sort order is kept.
function clearBinderFilters() {
  ui.filter = -1
  ui.searchQuery = ''
  ui.ownedOnly = false
  ui.dupesOnly = false
}
export function resetBinderFilters() {
  clearBinderFilters()
  emit()
}

/* ---------- selling and starting over ---------- */
export function sellAll() {
  const v = dupeValue(),
    n = dupeCount()
  if (!v) return
  Object.keys(S.owned).forEach((k) => {
    if (S.owned[k] > 1) S.owned[k] = 1
  })
  S.coins += v
  save()
  refresh()
  toast(`Sold ${n} duplicate${n == 1 ? '' : 's'} for ${v.toLocaleString('en-US')} coins`)
}
export function sellOne(c) {
  const n = own(c),
    r = R[c.ri]
  if (n < 2) return
  S.owned[c.key] = n - 1
  S.coins += r.sell
  save()
  refresh()
  showCard(c, null, 1)
  toast(`Sold 1 duplicate of ${c.n} for ${r.sell.toLocaleString('en-US')} coins`)
}
export function resetGame() {
  S = { coins: START, opened: 0, owned: {}, last: Date.now(), recent: [] }
  clearBinderFilters()
  save()
  refresh()
  toast('Collection reset — started fresh with 1,000 coins')
}

/* ---------- opening packs ---------- */
let ripTimers = [],
  finishReveal = null
function clearRipTimers() {
  ripTimers.forEach(clearTimeout)
  ripTimers = []
}
function later(fn, ms) {
  const id = setTimeout(fn, ms)
  ripTimers.push(id)
  return id
}
export const revealing = () => !!finishReveal
export function revealNow() {
  if (finishReveal) finishReveal()
}
export function openPack(ti) {
  const tier = TIERS[ti],
    t = ui.cur
  if (busy || S.coins < tier.cost) return
  busy = true
  clearRipTimers()
  S.coins -= tier.cost
  S.opened++
  const rs = []
  for (let i = 0; i < tier.n; i++) rs.push(roll())
  if (tier.min && Math.max(...rs) < tier.min) rs[tier.n - 1] = roll(tier.min)
  const pulls = rs.map((ri) => {
    const pool = t.cards.filter((c) => c.ri === ri),
      c = pool[Math.floor(Math.random() * pool.length)],
      isNew = !own(c)
    S.owned[c.key] = own(c) + 1
    return { c, isNew, sold: false }
  })
  S.recent = pulls
    .map((p) => p.c.key)
    .concat(S.recent.filter((k) => !pulls.some((p) => p.c.key == k)))
    .slice(0, 7)
  save()
  // flips: null while the sealed pack shows, then one of 'down', '' (turning) or 'up' per card.
  const st = {
    kind: 'pack',
    t,
    ti,
    tier,
    pulls,
    best: Math.max(...rs),
    nw: pulls.filter((p) => p.isNew).length,
    flips: null,
    done: false,
    soldCount: 0,
    soldCoins: 0,
    focus: ++focusN,
  }
  ui.stage = st
  finishReveal = () => {
    if (!finishReveal) return
    finishReveal = null
    clearRipTimers()
    st.flips = pulls.map(() => 'up')
    busy = false
    st.done = true
    st.focus = ++focusN
    emit()
  }
  refresh()
  if (calm) {
    finishReveal()
    return
  }
  later(() => {
    st.flips = pulls.map(() => 'down')
    emit()
    pulls.forEach((p, i) =>
      later(() => {
        st.flips[i] = ''
        emit()
        later(() => {
          st.flips[i] = 'up'
          emit()
        }, 700)
      }, 120 + i * 480),
    )
    later(() => {
      if (finishReveal) finishReveal()
    }, 120 + tier.n * 480 + 500)
  }, 900)
}
// Sells the duplicates that came out of the pack on stage.
export function sellPackDupes() {
  const st = ui.stage
  if (!st || st.kind != 'pack') return
  let nSold = 0,
    gained = 0
  st.pulls.forEach((p) => {
    if (!p.isNew && !p.sold && own(p.c) > 1) {
      S.owned[p.c.key] = own(p.c) - 1
      const v = R[p.c.ri].sell
      S.coins += v
      p.sold = true
      nSold++
      gained += v
    }
  })
  if (!nSold) return
  st.soldCount += nSold
  st.soldCoins += gained
  st.focus = ++focusN
  save()
  refresh()
  toast(`Sold ${nSold} duplicate${nSold == 1 ? '' : 's'} for ${gained.toLocaleString('en-US')} coins`)
}
// In the binder, Previous / Next follow the filters as they are now. The card on show stays in
// the list even if a sale means it no longer matches; it drops out once the player steps away.
function syncNav(c) {
  const fresh = getFilteredBinder().filter(own)
  if (!fresh.includes(c)) fresh.splice(Math.min(Math.max(cardNavList.indexOf(c), 0), fresh.length), 0, c)
  cardNavList = fresh
}
// focusIdx: the button that keeps the keyboard focus, when it can still be pressed.
export function showCard(c, list, focusIdx) {
  if (busy) return
  if (Array.isArray(list)) cardNavList = list.filter(own)
  else if (ui.view === 'inv') syncNav(c)
  else if (!cardNavList.length || !cardNavList.includes(c)) cardNavList = ui.cur.cards.filter(own)
  ui.stage = { kind: 'card', c, focus: ++focusN, focusIdx }
  emit()
}
export function stepCard(d) {
  const st = ui.stage
  if (busy || !st || st.kind != 'card') return false
  const idx = cardNavList.indexOf(st.c)
  if (d < 0 && idx > 0) showCard(cardNavList[idx - 1], null, 0)
  else if (d > 0 && idx >= 0 && idx < cardNavList.length - 1) showCard(cardNavList[idx + 1], null, 2)
  else return false
  return true
}
export function closeStage() {
  if (busy) {
    if (finishReveal) finishReveal()
    return
  }
  ui.stage = null
  emit()
}

/* ---------- free coins ---------- */
function tick() {
  // no free coins at or above the cap; the minute restarts once the balance drops below it
  if (S.coins >= CAP) S.last = Date.now()
  else if (Date.now() - S.last >= WAIT) {
    S.coins += PAY
    S.last = Date.now()
    save()
    emit()
    return
  }
  emitTick()
}
const timer = setInterval(tick, 1000)
if (import.meta.hot) import.meta.hot.dispose(() => clearInterval(timer))

// Like the first refresh() in pack-rip.html: remember the tab and theme that are showing.
S.view = ui.view
S.theme = ui.cur.id
save()
