// Player history, kept as one optional object (`stats`) inside the packrip-v2 save.
// Pure functions: no React, no localStorage, so they can be tested in Node.
export const BEST_MAX = 10
export const LOG_MAX = 50
export const TIER_IDS = ['single', 'triple', 'mega']

export const freshStats = (now = Date.now()) => ({
  v: 1, since: now, packs: { single: 0, triple: 0, mega: 0 }, cards: 0, byRarity: [0, 0, 0, 0, 0],
  dupesPulled: 0, dupesSold: 0, coinsSpent: 0, coinsFromSales: 0,
  best: [], log: [], sinceLegendary: 0, firstLegendary: null,
})

/** Returns usable stats for a save. An old save has none, so start from what it does hold. */
export function loadStats(S, now = Date.now()) {
  const st = Object.assign(freshStats(now), S.stats && typeof S.stats == 'object' ? S.stats : null)
  st.packs = Object.assign({ single: 0, triple: 0, mega: 0 }, st.packs)
  if (!Array.isArray(st.byRarity) || st.byRarity.length != 5) st.byRarity = [0, 0, 0, 0, 0]
  if (!Array.isArray(st.best)) st.best = []
  if (!Array.isArray(st.log)) st.log = []
  if (!S.stats && Array.isArray(S.recent)) st.log = S.recent.map((k) => ({ k, t: 0, p: null }))
  const ok = (e) => e && typeof e == 'object' && typeof e.k == 'string'
  st.best = st.best.filter(ok).slice(0, BEST_MAX)
  st.log = st.log.filter(ok).slice(0, LOG_MAX)
  for (const k of ['cards', 'dupesPulled', 'dupesSold', 'coinsSpent', 'coinsFromSales', 'sinceLegendary']) if (typeof st[k] != 'number') st[k] = 0
  if (st.firstLegendary && !ok(st.firstLegendary)) st.firstLegendary = null
  return st
}

/** One opened pack. `pulls` is [{ key, ri, isNew }], `p` the tier index, `cost` what it cost. */
export function recordPack(st, p, cost, pulls, now = Date.now()) {
  st.packs[TIER_IDS[p]]++
  st.cards += pulls.length
  st.coinsSpent += cost
  let legendary = false
  const entries = pulls.map((x) => {
    st.byRarity[x.ri]++
    if (!x.isNew) st.dupesPulled++
    if (x.ri == 4) {
      legendary = true
      if (!st.firstLegendary) st.firstLegendary = { k: x.key, t: now }
    }
    return { k: x.key, t: now, p, r: x.ri }
  })
  st.sinceLegendary = legendary ? 0 : st.sinceLegendary + 1
  st.log = entries.concat(st.log).slice(0, LOG_MAX)
  // best: highest rarity first, then newest
  st.best = entries.concat(st.best).sort((a, b) => (b.r ?? 0) - (a.r ?? 0) || b.t - a.t).slice(0, BEST_MAX)
  return st
}

export function recordSale(st, count, coins) {
  st.dupesSold += count
  st.coinsFromSales += coins
  return st
}
