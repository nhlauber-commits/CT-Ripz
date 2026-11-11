// The starburst sticker shape, drawn from the shared symbol.
export default function Burst({ className = '' }) {
  return (
    <svg className={'burst ' + className} viewBox="-110 -110 220 220" aria-hidden="true">
      <use href="#burst" x="-110" y="-110" width="220" height="220" />
    </svg>
  )
}
