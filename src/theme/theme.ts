export type Theme = 'light' | 'dark'
export type Accent = 'blue' | 'violet' | 'emerald' | 'rose' | 'amber'

export const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
  { id: 'blue', label: '블루', swatch: '#1f48f5' },
  { id: 'violet', label: '바이올렛', swatch: '#7c3aed' },
  { id: 'emerald', label: '에메랄드', swatch: '#059669' },
  { id: 'rose', label: '로즈', swatch: '#e11d48' },
  { id: 'amber', label: '앰버', swatch: '#d97706' },
]

const ACCENT_IDS = ACCENTS.map((a) => a.id)

export const STORAGE_KEYS = {
  theme: 'tilon-theme',
  accent: 'tilon-accent',
} as const

export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.theme)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function getInitialAccent(): Accent {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.accent) as Accent | null
    if (saved && ACCENT_IDS.includes(saved)) return saved
  } catch {
    /* ignore */
  }
  return 'blue'
}
