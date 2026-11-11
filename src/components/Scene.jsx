// The page background, back to front: spinning rays, two halftone fields, print grain, edge shade.
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="rays" />
      <div className="ht-a" />
      <div className="ht-b" />
      <svg className="grain" preserveAspectRatio="none"><rect width="100%" height="100%" filter="url(#fx-grain)" /></svg>
      <div className="shade" />
    </div>
  )
}
