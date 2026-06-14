// three@0.134 ships no bundled types; we only pass it through to Vanta.
declare module 'three'

declare module 'vanta/dist/vanta.waves.min' {
  type VantaEffect = {
    destroy: () => void
    setOptions?: (options: Record<string, unknown>) => void
  }
  const WAVES: (options: Record<string, unknown>) => VantaEffect
  export default WAVES
}
