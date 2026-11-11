// Shared SVG filters and gradients, copied unchanged from pack-rip.html.
// Rendered once in App; every card and emblem refers to them by id.
const DEFS = String.raw`<defs>
  <!-- shared by every card: shades the flat drawing as a lit, glossy surface and adds the gold rim glow -->
  <filter id="lit" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum"/>
    <feComposite in="lum" in2="SourceAlpha" operator="arithmetic" k1="0" k2=".35" k3=".65" k4="0" result="h0"/>
    <feGaussianBlur in="h0" stdDeviation="1.6" result="h"/>
    <feDiffuseLighting in="h" surfaceScale="7" diffuseConstant="1.25" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="52"/></feDiffuseLighting>
    <feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="sh"/>
    <feSpecularLighting in="h" surfaceScale="7" specularConstant=".9" specularExponent="26" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="52"/></feSpecularLighting>
    <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
    <feComposite in="s2" in2="sh" operator="arithmetic" k1="0" k2=".8" k3="1" k4="0" result="lit"/>
    <feMorphology in="SourceAlpha" operator="dilate" radius="1.1" result="dil"/>
    <feFlood flood-color="#ffd76a"/><feComposite in2="dil" operator="in" result="rim"/>
    <feGaussianBlur in="rim" stdDeviation="3.5" result="glow"/>
    <feMerge><feMergeNode in="glow"/><feMergeNode in="rim"/><feMergeNode in="lit"/></feMerge>
  </filter>
  <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ac8"/><stop offset=".25" stop-color="#ffe27a"/><stop offset=".5" stop-color="#7dffb2"/><stop offset=".75" stop-color="#6fd6ff"/><stop offset="1" stop-color="#b68cff"/></linearGradient>
</defs>`

export default function Defs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: DEFS }}
    />
  )
}
