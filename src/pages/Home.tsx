import Section, { SectionHeading } from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import VantaWaves from '@/components/VantaWaves'
import { process, services, site, stats } from '@/data/site'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <VantaWaves className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-30"
          style={{
            background:
              'radial-gradient(60% 60% at 70% 20%, rgba(51,102,255,0.35) 0%, rgba(11,16,32,0) 60%)',
          }}
        />
        <Container className="relative z-10 py-24 sm:py-32">
          <div className="max-w-5xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-brand-200">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              IT Development Studio
            </p>
            <h1 className="whitespace-nowrap text-[clamp(1.25rem,5.2vw,3.75rem)] font-bold leading-tight tracking-tight">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">{site.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/contact">프로젝트 시작하기</ButtonLink>
              <ButtonLink to="/services" variant="outline" className="border-white/20 text-white hover:border-white/40 hover:text-white">
                서비스 둘러보기
              </ButtonLink>
            </div>
          </div>
        </Container>
      </VantaWaves>

      {/* Stats */}
      <section className="border-b border-border bg-bg">
        <Container className="grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-brand-600 sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* Services */}
      <Section id="services" className="bg-bg">
        <SectionHeading
          eyebrow="Services"
          title="우리가 만드는 것"
          desc="기획부터 운영까지, 제품의 전 과정을 함께합니다."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-brand-500">▹</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Process"
          title="협업 프로세스"
          desc="투명하고 예측 가능한 방식으로 함께 일합니다."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.no} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="text-sm font-bold text-brand-500">{step.no}</div>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-bg">
        <div className="rounded-3xl bg-ink px-8 py-16 text-center text-white sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            함께 만들 준비가 되셨나요?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            아이디어 단계여도 좋습니다. 무엇이든 편하게 문의해 주세요.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/contact">상담 신청하기</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
