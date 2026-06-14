import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './ui/Container'
import { ButtonLink } from './ui/Button'
import ThemeControls from './ThemeControls'
import { nav, site } from '@/data/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-brand-600 ${
      isActive ? 'text-brand-600' : 'text-muted'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-fg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            T
          </span>
          <span className="text-lg">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster: CTA + theme controls (far right) */}
        <div className="hidden items-center gap-4 md:flex">
          <ButtonLink to="/contact">프로젝트 문의</ButtonLink>
          <ThemeControls />
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-fg md:hidden"
        >
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface"
              >
                {item.label}
              </NavLink>
            ))}
            <ButtonLink to="/contact" className="mt-2">
              프로젝트 문의
            </ButtonLink>
            <div className="mt-3 border-t border-border pt-4">
              <ThemeControls />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
