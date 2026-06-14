import Section, { SectionHeading } from '@/components/ui/Section'
import { site, stats } from '@/data/site'

const values = [
  {
    title: '본질에 집중',
    desc: '화려함보다 사용자가 진짜 필요로 하는 가치에 집중합니다.',
  },
  {
    title: '빠른 실행',
    desc: '작게 만들고 빠르게 검증하며 함께 방향을 잡아갑니다.',
  },
  {
    title: '지속 가능한 코드',
    desc: '오래 운영할 수 있도록 견고하고 읽기 쉬운 코드를 작성합니다.',
  },
]

export default function About() {
  return (
    <>
      <Section className="bg-ink text-white">
        <SectionHeading
          eyebrow="About"
          title={`${site.name}는 어떤 팀인가요`}
          desc={site.description}
        />
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">기술로 문제를 해결합니다</h2>
            <p className="mt-5 text-slate-600">
              {site.name}는 스타트업부터 엔터프라이즈까지 다양한 규모의 디지털 제품을
              만들어 온 IT 개발 전문 기업입니다. 우리는 기술 그 자체보다, 그 기술이
              만들어내는 비즈니스 임팩트를 중요하게 생각합니다.
            </p>
            <p className="mt-4 text-slate-600">
              제품의 첫 줄 코드부터 안정적인 운영까지, 신뢰할 수 있는 기술 파트너가
              되겠습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 p-6 text-center"
              >
                <div className="text-3xl font-bold text-brand-600">{s.value}</div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="Values" title="우리가 일하는 방식" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
