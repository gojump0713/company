import { useTheme } from '@/theme/ThemeProvider'
import { ACCENTS } from '@/theme/theme'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeControls({ className = '' }: { className?: string }) {
  const { theme, toggleTheme, accent, setAccent } = useTheme()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dark / light toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg transition-colors hover:border-brand-400 hover:text-brand-600"
      >
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>

      <span className="h-5 w-px bg-border" aria-hidden="true" />

      {/* 5-color accent palette */}
      <div className="flex items-center gap-1.5" role="group" aria-label="컬러 테마 선택">
        {ACCENTS.map((a) => {
          const active = accent === a.id
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setAccent(a.id)}
              aria-label={`${a.label} 컬러`}
              aria-pressed={active}
              title={a.label}
              className={`h-5 w-5 rounded-full ring-offset-2 ring-offset-bg transition ${
                active
                  ? 'ring-2 ring-fg'
                  : 'ring-1 ring-border hover:scale-110 hover:ring-fg/40'
              }`}
              style={{ backgroundColor: a.swatch }}
            />
          )
        })}
      </div>
    </div>
  )
}
