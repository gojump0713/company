import Section, { SectionHeading } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/Button'
import { services } from '@/data/site'

export default function Services() {
  return (
    <>
      <Section className="bg-ink text-white">
        <SectionHeading
          eyebrow="Services"
          title="서비스 소개"
          desc="제품의 시작부터 성장까지, 단계별로 필요한 기술을 제공합니다."
        />
      </Section>

      <Section className="bg-bg">
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex gap-5 rounded-2xl border border-border bg-card p-8"
            >
              <div className="text-4xl">{s.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-muted">{s.summary}</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="text-brand-500">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ButtonLink to="/contact">프로젝트 상담하기</ButtonLink>
        </div>
      </Section>
    </>
  )
}
