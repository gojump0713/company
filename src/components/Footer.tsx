import { Link } from 'react-router-dom'
import Container from './ui/Container'
import { nav, site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              T
            </span>
            <span className="text-lg">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-600">{site.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">바로가기</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-brand-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">연락처</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-600">
                {site.email}
              </a>
            </li>
            <li>{site.phone}</li>
            <li>{site.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Made with React · Vite · Tailwind</p>
        </Container>
      </div>
    </footer>
  )
}
