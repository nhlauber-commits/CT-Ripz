// Game state. Same localStorage key and shape as pack-rip.html, so a save made there loads here.
import { useSyncExternalStore } from 'react'
import { R, TIERS, START, PAY, WAIT, CAP, T } from '../data/game.js'
import { loadStats, freshStats, recordPack, recordSale } from './stats.js'

export const KEY = 'packrip-v2'

const fresh = () => ({ coins: START, opened: 0, owned: {}, last: Date.now(), recent: [], stats: freshStats() })

let S = fresh(), had = null
try {
  const s = JSON.parse(localStorage.getItem(KEY))
  if (s && s.owned && typeof s.coins == 'number') { had = s.stats; S = Object.assign(S, s) }
} catch (e) {}
S.recent = Array.isArray(S.recent) ? [...new Set(S.recent)] : [] // older saves could list one card twice
// Old saves have no stats: build them from what the save holds. pack-rip.html keeps the field when it saves.
S.stats = loadStats({ stats: had, recent: S.recent })

const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) {} }

let version = 0
const subs = new Set()
const emit = () => { version++; subs.forEach((f) => f()) }
const subscribe = (f) => { subs.add(f); return () => subs.delete(f) }

/** Re-renders the caller whenever the game state changes, and returns it. */
export function useGame() {
  useSyncExternalStore(subscribe, () => version)
  return S
}

export const BY = {}
T.forEach((t) => t.cards.forEach((c) => { BY[c.key] = c }))

export const own = (c) => S.owned[c.key] || 0
export const found = (t) => t.cards.filter(own).length
export const totalFound = () => T.reduce((n, t) => n + found(t), 0)
export const num = (c) => '#' + String(c.i + 1).padStart(3, '0')

function roll(min = 0) {
  const pool = R.slice(min)
  let x = Math.random() * pool.reduce((n, r) => n + r.w, 0)
  for (let i = 0; i < pool.length; i++) { if (x < pool[i].w) return i + min; x -= pool[i].w }
  return min
}

export function dupeValue() {
  let v = 0
  T.forEach((t) => t.cards.forEach((c) => { if (own(c) > 1) v += (own(c) - 1) * R[c.ri].sell }))
  return v
}
export function dupeCount() {
  let n = 0
  T.forEach((t) => t.cards.forEach((c) => { if (own(c) > 1) n += own(c) - 1 }))
  return n
}

/** Milliseconds until the next free coins, or null while the balance is at the cap. */
export const untilPay = () => (S.coins >= CAP ? null : Math.max(0, WAIT - (Date.now() - S.last)))

/** Called once a second: free coins every minute, only while the balance is under CAP. */
export function tick() {
  if (S.coins >= CAP) S.last = Date.now()
  else if (Date.now() - S.last >= WAIT) { S.coins += PAY; S.last = Date.now(); save(); emit() }
}

/** Buys and opens one pack. Returns the pulls, or null if there are not enough coins. */
export function openPack(t, ti) {
  const tier = TIERS[ti]
  if (S.coins < tier.cost) return null
  S.coins -= tier.cost; S.opened++
  const rs = []
  for (let i = 0; i < tier.n; i++) rs.push(roll())
  if (tier.min && Math.max(...rs) < tier.min) rs[tier.n - 1] = roll(tier.min)
  const pulls = rs.map((ri) => {
    const pool = t.cards.filter((c) => c.ri === ri), c = pool[Math.floor(Math.random() * pool.length)], isNew = !own(c)
    S.owned[c.key] = own(c) + 1
    return { c, isNew }
  })
  recordPack(S.stats, ti, tier.cost, pulls.map((p) => ({ key: p.c.key, ri: p.c.ri, isNew: p.isNew })))
  const keys = [...new Set(pulls.map((p) => p.c.key))] // the same card twice in one pack is listed once
  S.recent = keys.concat(S.recent.filter((k) => !keys.includes(k))).slice(0, 7)
  save(); emit()
  return { pulls, rs }
}

export function sellAll() {
  const v = dupeValue()
  if (!v) return 0
  recordSale(S.stats, dupeCount(), v)
  Object.keys(S.owned).forEach((k) => { if (S.owned[k] > 1) S.owned[k] = 1 })
  S.coins += v; save(); emit()
  return v
}

export function sellOne(c) {
  const n = own(c)
  if (n < 2) return
  S.owned[c.key] = n - 1; S.coins += R[c.ri].sell; recordSale(S.stats, 1, R[c.ri].sell); save(); emit()
}

export function reset() { S = fresh(); save(); emit() }
