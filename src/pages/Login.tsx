import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Section from '@/components/ui/Section'
import { supabase } from '@/lib/supabase'
import { toKoreanError } from '@/lib/errorMessage'
import KakaoButton from '@/components/auth/KakaoButton'

const field =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-brand-500'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  // 보호된 페이지에서 넘어왔다면 로그인 후 그곳으로 되돌려 보냄
  const from = (location.state as { from?: string } | null)?.from ?? '/board'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!supabase) {
      setError('Supabase 연결이 설정되지 않았습니다.')
      return
    }

    setBusy(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)

    if (signInError) {
      setError(toKoreanError(signInError.message))
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <Section className="bg-bg">
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-2xl font-bold">로그인</h1>
        <p className="mt-2 text-center text-sm text-muted">
          가입한 이메일과 비밀번호로 로그인하세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이메일</label>
            <input
              type="email"
              className={field}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              className={field}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? '로그인 중…' : '로그인'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" /> 또는 <span className="h-px flex-1 bg-border" />
        </div>
        <KakaoButton label="카카오로 로그인" />

        <p className="mt-6 text-center text-sm text-muted">
          아직 계정이 없으신가요?{' '}
          <Link to="/signup" className="font-semibold text-brand-600 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </Section>
  )
}
