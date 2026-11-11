import { GAME_DEFS } from '../art/defs.js'
import { HYPER_DEFS } from '../art/hyper.js'

// One shared <defs> for the whole app: card-art filters and the Hyperprint ornaments. Never one per card.
const HTML = '<defs>' + GAME_DEFS + HYPER_DEFS + '</defs>'

export default function Defs() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: HTML }} />
}
