import { emblem } from '../art/art.js'

// A foil pack wrapper in the theme's colours, with the theme's emblem.
export default function Pack({ t, tier }) {
  return (
    <div className="pack" aria-hidden="true" style={{ '--ta': t.a, '--tb': t.b }}>
      <span className="em" dangerouslySetInnerHTML={{ __html: emblem(t) }} />
      <b>{t.name}</b>
      <i>{tier.name}</i>
    </div>
  )
}
