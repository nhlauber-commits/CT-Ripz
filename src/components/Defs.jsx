import { GAME_DEFS } from '../art/defs.js'
import { VAULT_DEFS } from '../art/vault.js'

// One shared <defs> for the whole app: card-art filters and the Vault ornaments. Never one per card.
const HTML = '<defs>' + GAME_DEFS + VAULT_DEFS + '</defs>'

export default function Defs() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: HTML }} />
}
