import { TIERS } from '../data/game.js'
import { esc } from '../art/helpers.js'
import { emblem } from '../art/art.js'

// A sealed pack wrapper in the theme's colours. tag is 'div' or 'button'.
export default function Pack({ t, ti, tag: Tag = 'div', ...rest }) {
  const html = `<span class="shine"></span>${emblem(t)}<span class="nm">${esc(t.name)}</span><span class="tag">${TIERS[ti].name} ×${TIERS[ti].n}</span>`
  return (
    <Tag
      className={'pack t' + (ti + 1)}
      style={{ '--a': t.a, '--b': t.b }}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  )
}
