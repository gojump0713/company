import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

/** Read a brand CSS variable (#rrggbb) as a numeric color for three.js. */
function readBrandColor(shade: number, fallback: number): number {
  try {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-brand-${shade}`)
      .trim()
    if (v.startsWith('#')) return parseInt(v.slice(1), 16)
  } catch {
    /* ignore */
  }
  return fallback
}

type VantaEffect = { destroy: () => void }

/**
 * Hero background using Vanta.WAVES (three.js).
 * - Lazy-loads three + vanta so they stay out of the initial bundle.
 * - Recolors with the active accent palette.
 * - Skips animation when the user prefers reduced motion.
 */
export default function VantaWaves({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { accent } = useTheme()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current) return

    let effect: VantaEffect | null = null
    let cancelled = false

    Promise.all([import('three'), import('vanta/dist/vanta.waves.min')])
      .then(([THREE, vanta]) => {
        if (cancelled || !ref.current) return
        effect = vanta.default({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: readBrandColor(800, 0x1a2fb6),
          shininess: 35.0,
          waveHeight: 15.0,
          waveSpeed: 0.85,
          zoom: 0.9,
        })
      })
      .catch(() => {
        /* effect is optional; ignore load failures */
      })

    return () => {
      cancelled = true
      if (effect) effect.destroy()
    }
  }, [accent])

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  )
}
