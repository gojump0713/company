import { useState } from 'react'
import type { FormEvent } from 'react'
import Section, { SectionHeading } from '@/components/ui/Section'
import { site } from '@/data/site'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: 백엔드/폼 서비스(Formspree, EmailJS 등) 연동 지점
    setSent(true)
  }

  const field =
    'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-brand-500'

  return (
    <>
      <Section className="bg-ink text-white">
        <SectionHeading
          eyebrow="Contact"
          title="프로젝트 문의"
          desc="궁금한 점이나 진행하고 싶은 프로젝트가 있다면 알려주세요."
        />
      </Section>

      <Section className="bg-bg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="text-xl font-semibold">연락처</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted">이메일</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-brand-600 hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">전화</dt>
                <dd className="text-fg">{site.phone}</dd>
              </div>
              <div>
                <dt className="text-muted">주소</dt>
                <dd className="text-fg">{site.address}</dd>
              </div>
            </dl>
          </div>

          {sent ? (
            <div className="grid place-items-center rounded-2xl border border-brand-300 bg-brand-500/10 p-10 text-center">
              <div>
                <div className="text-4xl">✅</div>
                <h3 className="mt-4 text-lg font-semibold">문의가 접수되었습니다</h3>
                <p className="mt-2 text-sm text-muted">
                  빠른 시일 내에 답변드리겠습니다. 감사합니다.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} placeholder="이름" required />
                <input className={field} type="email" placeholder="이메일" required />
              </div>
              <input className={field} placeholder="회사명 (선택)" />
              <textarea
                className={`${field} min-h-36 resize-y`}
                placeholder="프로젝트에 대해 알려주세요"
                required
              />
              <button
                type="submit"
                className="justify-self-start rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                문의 보내기
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  )
}
