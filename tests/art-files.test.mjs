// Checks that the ART / IMG lists in pack-rip.html and the files in public/art/ agree.
// Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'

const html = readFileSync('pack-rip.html', 'utf8')
const artList = html.match(/const ART=new Set\((\[[^\]]*\])\)/)
const imgList = html.match(/const IMG=(\{[^}]*\})/)
const files = readdirSync('public/art').filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
const MAX_BYTES = 300 * 1024

test('ART and IMG lists are found in pack-rip.html', () => {
  assert.ok(artList, 'could not find `const ART=new Set([...])`')
  assert.ok(imgList, 'could not find `const IMG={...}`')
})

test('every ART key has an image file', () => {
  const keys = JSON.parse(artList[1])
  const missing = keys.filter((k) => !existsSync(`public/art/${k.replace(':', '_')}.jpg`))
  assert.deepEqual(missing, [], 'ART lists cards with no file in public/art/')
})

test('every image file is listed in ART or IMG', () => {
  const keys = new Set(JSON.parse(artList[1]).map((k) => k.replace(':', '_') + '.jpg'))
  const imgPaths = [...imgList[1].matchAll(/'public\/art\/([^']+)'/g)].map((m) => m[1])
  const unlisted = files.filter((f) => !keys.has(f) && !imgPaths.includes(f))
  assert.deepEqual(unlisted, [], 'files in public/art/ that never show (add their key to ART)')
})

test('IMG override files exist', () => {
  const paths = [...imgList[1].matchAll(/'(public\/art\/[^']+)'/g)].map((m) => m[1])
  assert.ok(paths.length > 0)
  for (const p of paths) assert.ok(existsSync(p), `${p} is missing`)
})

test(`image files are at most ${MAX_BYTES / 1024} KB`, () => {
  const big = files.filter((f) => statSync(`public/art/${f}`).size > MAX_BYTES)
  assert.deepEqual(big, [], 'compress these images')
})
