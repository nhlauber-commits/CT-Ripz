import { ui } from '../state/game.js'

// Short in-page message, e.g. after selling duplicates.
export default function Toast() {
  return (
    <div className="toast" id="toast" role="status" aria-live="polite" aria-atomic="true" hidden={!ui.toast}>
      {ui.toast}
    </div>
  )
}
