import type { ReactNode } from 'react'
import Container from './Container'

export default function Section({
  id,
  children,
  className = '',
  containerClassName = '',
}: {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  desc?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-lg text-muted">{desc}</p>}
    </div>
  )
}
