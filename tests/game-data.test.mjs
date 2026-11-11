// Checks the game data and card art in src/ and that they still match pack-rip.html.
// Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { R, TIERS, START, PAY, WAIT, CAP, T } from '../src/data/game.js'
import { TOTAL } from '../src/art/helpers.js'
import { art } from '../src/art/art.js'
import { IMG, ART } from '../src/state/artFiles.js'

const html = readFileSync('pack-rip.html', 'utf8')
// The text between two section comments of the pack-rip.html script.
function section(from, to) {
  const head = (name) => `/* ================= ${name} ================= */`
  const a = html.indexOf(head(from)),
    b = html.indexOf(head(to))
  assert.ok(a >= 0 && b > a, `sections "${from}" and "${to}" not found in pack-rip.html`)
  return html.slice(a + head(from).length, b).trim()
}

test('8 themes of 100 cards, split 40 / 28 / 18 / 10 / 4', () => {
  assert.equal(T.length, 8)
  assert.equal(TOTAL, 800)
  for (const t of T) {
    assert.equal(t.cards.length, 100, t.id)
    const split = [0, 1, 2, 3, 4].map((ri) => t.cards.filter((c) => c.ri === ri).length)
    assert.deepEqual(split, [40, 28, 18, 10, 4], t.id)
  }
})

test('no duplicate card names within a theme, no duplicate keys', () => {
  const keys = new Set()
  for (const t of T) {
    const names = t.cards.map((c) => c.n)
    const twice = names.filter((n, i) => names.indexOf(n) !== i)
    assert.deepEqual(twice, [], `${t.id} repeats a card name`)
    for (const c of t.cards) {
      assert.ok(!keys.has(c.key), c.key)
      keys.add(c.key)
    }
  }
})

test('every card has a category label', () => {
  for (const t of T) for (const c of t.cards) assert.ok(t.g[c.k], `${c.key} has no label for "${c.k}"`)
})

test('rarities, pack tiers and coin rules', () => {
  assert.deepEqual(
    R.map((r) => [r.name, r.w, r.sell]),
    [
      ['Common', 55, 10],
      ['Uncommon', 25, 30],
      ['Rare', 12, 90],
      ['Epic', 6, 300],
      ['Legendary', 2, 1500],
    ],
  )
  assert.deepEqual(
    TIERS.map((t) => [t.name, t.n, t.cost, t.min]),
    [
      ['Single', 1, 100, undefined],
      ['Triple', 3, 270, undefined],
      ['Mega', 5, 425, 2],
    ],
  )
  assert.deepEqual([START, PAY, WAIT, CAP], [1000, 1000, 60000, 5000])
})

test('art() returns clean SVG for every card', () => {
  let bytes = 0
  for (const t of T)
    for (const c of t.cards) {
      const s = art(c)
      assert.ok(s.startsWith('<svg'), `${c.key} does not start with <svg`)
      assert.ok(!/NaN|undefined/.test(s), `${c.key} contains NaN or undefined`)
      bytes += s.length
    }
  assert.ok(bytes / TOTAL < 16000, `average card SVG is ${Math.round(bytes / TOTAL)} bytes`)
})

test('src/data matches the data section of pack-rip.html', () => {
  assert.ok(readFileSync('src/data/game.js', 'utf8').includes(section('data', 'helpers')))
})

test('src/art matches the helpers and card art sections of pack-rip.html', () => {
  assert.ok(readFileSync('src/art/helpers.js', 'utf8').includes(section('helpers', 'card art (generated SVG)')))
  assert.ok(readFileSync('src/art/art.js', 'utf8').includes(section('card art (generated SVG)', 'state')))
})

test('ART and IMG in src/state match pack-rip.html', () => {
  const list = JSON.parse(html.match(/const ART=new Set\((\[[^\]]*\])\)/)[1])
  assert.deepEqual([...ART].sort(), list.sort())
  const img = html.match(/const IMG=(\{[^}]*\})/)[1].replaceAll("'public/art/", "'art/")
  assert.equal(JSON.stringify(IMG).replaceAll('"', "'"), img)
})

test('src/styles matches the style block of pack-rip.html', () => {
  const css = html.slice(html.indexOf('<style>') + 7, html.indexOf('</style>')).trim()
  assert.ok(readFileSync('src/styles/game.css', 'utf8').includes(css))
})
