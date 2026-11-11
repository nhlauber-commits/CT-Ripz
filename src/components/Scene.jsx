// The page background, back to front: linen weave, paper fibre, guilloche rosette, edge hatching, vignette.
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="linen" />
      <svg className="fibre" preserveAspectRatio="none"><rect width="100%" height="100%" filter="url(#fx-fibre)" /></svg>
      <svg className="rosette"><use href="#rosette" /></svg>
      <div className="hatch" />
      <div className="vignette" />
    </div>
  )
}
