import Section from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section className="bg-white">
      <div className="grid place-items-center py-20 text-center">
        <p className="text-7xl font-bold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-slate-600">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <ButtonLink to="/" className="mt-8">
          홈으로 돌아가기
        </ButtonLink>
      </div>
    </Section>
  )
}
