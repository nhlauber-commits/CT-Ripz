// Engraved corner ornaments for a framed area. The parent must be position:relative.
export default function Corners({ which = ['tl', 'tr', 'bl', 'br'] }) {
  return which.map((c) => (
    <svg key={c} className={'corner ' + c} aria-hidden="true">
      <use href="#corner" />
    </svg>
  ))
}
