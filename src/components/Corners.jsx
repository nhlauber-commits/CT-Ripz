// Four engraved corner flourishes for a framed surface.
export default function Corners() {
  return ['tl', 'tr', 'bl', 'br'].map((p) => (
    <svg key={p} className={'corner ' + p} aria-hidden="true"><use href="#corner" /></svg>
  ))
}
