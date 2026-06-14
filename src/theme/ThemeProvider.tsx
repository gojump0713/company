import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  type Accent,
  type Theme,
  STORAGE_KEYS,
  getInitialAccent,
  getInitialTheme,
} from './theme'

type ThemeContextValue = {
  theme: Theme
  accent: Accent
  toggleTheme: () => void
  setTheme: (t: Theme) => void
  setAccent: (a: Accent) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [accent, setAccent] = useState<Accent>(getInitialAccent)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    try {
      localStorage.setItem(STORAGE_KEYS.accent, accent)
    } catch {
      /* ignore */
    }
  }, [accent])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, accent, toggleTheme, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
