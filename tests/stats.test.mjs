// Checks the stats kept in the packrip-v2 save: old saves load, and the lists stay small.
import test from 'node:test'
import assert from 'node:assert/strict'
import { freshStats, loadStats, recordPack, recordSale, BEST_MAX, LOG_MAX } from '../src/state/stats.js'

test('an old save without stats loads, seeded from its recent pulls', () => {
  const st = loadStats({ recent: ['monsters:0', 'cars:3'] }, 1000)
  assert.deepEqual(st.packs, { single: 0, triple: 0, mega: 0 })
  assert.equal(st.cards, 0)
  assert.deepEqual(st.byRarity, [0, 0, 0, 0, 0])
  assert.deepEqual(st.log.map((e) => e.k), ['monsters:0', 'cars:3'])
  assert.equal(st.since, 1000)
})

test('a damaged stats object is repaired, not thrown away', () => {
  const st = loadStats({ stats: { cards: 7, packs: { mega: 2 }, best: 'x', byRarity: [1] } })
  assert.equal(st.cards, 7)
  assert.deepEqual(st.packs, { single: 0, triple: 0, mega: 2 })
  assert.deepEqual(st.best, [])
  assert.deepEqual(st.byRarity, [0, 0, 0, 0, 0])
})

test('existing stats keep their log, and broken entries are dropped', () => {
  const st = loadStats({ stats: { log: [{ k: 'a:1', t: 5, p: 0 }, null, 7], best: [null, { k: 'a:2', t: 1, p: 2, r: 4 }], cards: 'x', firstLegendary: 3 }, recent: ['z:9'] })
  assert.deepEqual(st.log.map((e) => e.k), ['a:1'])
  assert.deepEqual(st.best.map((e) => e.k), ['a:2'])
  assert.equal(st.cards, 0)
  assert.equal(st.firstLegendary, null)
})

test('a pack updates every counter', () => {
  const st = freshStats(0)
  recordPack(st, 2, 425, [{ key: 'a:1', ri: 0, isNew: true }, { key: 'a:2', ri: 0, isNew: false }, { key: 'a:99', ri: 4, isNew: true }], 50)
  assert.deepEqual(st.packs, { single: 0, triple: 0, mega: 1 })
  assert.equal(st.cards, 3)
  assert.equal(st.coinsSpent, 425)
  assert.deepEqual(st.byRarity, [2, 0, 0, 0, 1])
  assert.equal(st.dupesPulled, 1)
  assert.equal(st.sinceLegendary, 0)
  assert.deepEqual(st.firstLegendary, { k: 'a:99', t: 50 })
  assert.equal(st.best[0].k, 'a:99')
  recordPack(st, 0, 100, [{ key: 'a:3', ri: 1, isNew: true }], 60)
  assert.equal(st.sinceLegendary, 1)
  assert.equal(st.log[0].k, 'a:3')
  recordSale(st, 4, 120)
  assert.deepEqual([st.dupesSold, st.coinsFromSales], [4, 120])
})

test('best and log never grow past their limits', () => {
  const st = freshStats(0)
  for (let i = 0; i < 60; i++) recordPack(st, 2, 425, [0, 1, 2, 3, 4].map((ri) => ({ key: 'a:' + i + ri, ri, isNew: true })), i)
  assert.equal(st.best.length, BEST_MAX)
  assert.equal(st.log.length, LOG_MAX)
  assert.ok(st.best.every((e) => e.r === 4))
  assert.equal(st.best[0].t, 59)
})
