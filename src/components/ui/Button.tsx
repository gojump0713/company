import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline'

const styles: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  outline:
    'border border-slate-300 text-slate-800 hover:border-brand-400 hover:text-brand-700',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors'

export function ButtonLink({
  to,
  variant = 'primary',
  children,
  className = '',
}: {
  to: string
  variant?: Variant
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  )
}
