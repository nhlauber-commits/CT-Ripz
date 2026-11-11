// Checks the React port's data and art against the rules and against pack-rip.html.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { R, TIERS, START, PAY, WAIT, CAP, T, TOTAL } from '../src/data/game.js'
import { art, emblem } from '../src/art/art.js'
import { ART, IMG } from '../src/state/art-list.js'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const html = read('../pack-rip.html')

test('8 themes of 100 cards, split 40 / 28 / 18 / 10 / 4', () => {
  assert.equal(T.length, 8)
  assert.equal(TOTAL, 800)
  for (const t of T) {
    assert.equal(t.cards.length, 100, t.id)
    assert.deepEqual([0, 1, 2, 3, 4].map((ri) => t.cards.filter((c) => c.ri === ri).length), [40, 28, 18, 10, 4], t.id)
  }
})

test('no duplicate card names inside a theme', () => {
  for (const t of T) assert.equal(new Set(t.cards.map((c) => c.n)).size, t.cards.length, t.id)
})

test('odds, prices, tiers and coin rules', () => {
  assert.deepEqual(R.map((r) => [r.id, r.w, r.sell]), [['common', 55, 10], ['uncommon', 25, 30], ['rare', 12, 90], ['epic', 6, 300], ['legendary', 2, 1500]])
  assert.deepEqual(TIERS.map((t) => [t.name, t.n, t.cost, t.min ?? 0]), [['Single', 1, 100, 0], ['Triple', 3, 270, 0], ['Mega', 5, 425, 2]])
  assert.deepEqual([START, PAY, WAIT, CAP], [1000, 1000, 60000, 5000])
})

test('src/data/game.js holds the same data source as pack-rip.html', () => {
  const from = (s) => s.slice(s.indexOf('const R=['), s.indexOf('];', s.indexOf('const T=[')) + 2)
  assert.equal(from(read('../src/data/game.js')), from(html))
})

test('art list matches pack-rip.html', () => {
  const list = JSON.parse(html.match(/const ART=new Set\((\[.*?\])\)/)[1])
  assert.deepEqual([...ART].sort(), list.sort())
  assert.deepEqual(Object.keys(IMG), ['cars:Honda Prelude'])
})

test('every card draws: art() returns clean SVG', () => {
  for (const t of T) {
    for (const c of t.cards) {
      const s = art(c)
      assert.ok(s.startsWith('<svg'), c.key)
      assert.ok(!/NaN|undefined/.test(s), c.key)
    }
    const e = emblem(t)
    assert.ok(e.startsWith('<svg') && !/NaN|undefined/.test(e), t.id)
  }
})
