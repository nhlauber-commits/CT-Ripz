// Guilloché: bands of interlaced sine-wave rings, as on a banknote.
// Pure maths; returns SVG path markup for a viewBox of -420 -420 840 840.
const BANDS = [
  [372, 24, 24, 6],
  [296, 42, 12, 10],
  [206, 34, 9, 8],
  [130, 30, 16, 8],
  [62, 24, 7, 6],
]
function rosette(bands) {
  let out = ''
  for (const [R, A, k, n] of bands)
    for (let j = 0; j < n; j++) {
      let d = ''
      for (let s = 0; s <= 360; s++) {
        const t = (s * Math.PI) / 180,
          r = R + A * Math.sin(k * t + (j * 2 * Math.PI) / n)
        d += (s ? 'L' : 'M') + (r * Math.cos(t)).toFixed(1) + ' ' + (r * Math.sin(t)).toFixed(1)
      }
      out += `<path d="${d}Z"/>`
    }
  return out
}
export const ROSETTE = rosette(BANDS)
// A smaller ring pattern for card backs.
export const ROSETTE_SMALL = rosette([
  [300, 60, 10, 8],
  [170, 50, 8, 8],
  [70, 30, 6, 6],
])
