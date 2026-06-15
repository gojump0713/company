import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Section from '@/components/ui/Section'
import { supabase } from '@/lib/supabase'
import { toKoreanError } from '@/lib/errorMessage'
import KakaoButton from '@/components/auth/KakaoButton'

const field =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-brand-500'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<'login' | 'confirm' | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }
    if (password !== password2) {
      setError('비밀번호가 서로 일치하지 않습니다.')
      return
    }
    if (!supabase) {
      setError('Supabase 연결이 설정되지 않았습니다.')
      return
    }

    setBusy(true)
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    setBusy(false)

    if (signUpError) {
      setError(toKoreanError(signUpError.message))
      return
    }

    // 이메일 인증이 꺼져 있으면 즉시 세션이 생기고, 켜져 있으면 확인 메일을 보냄
    if (data.session) {
      navigate('/board', { replace: true })
    } else {
      setDone('confirm')
    }
  }

  if (done === 'confirm') {
    return (
      <Section className="bg-bg">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="text-4xl">📧</div>
          <h1 className="mt-4 text-xl font-bold">확인 메일을 보냈습니다</h1>
          <p className="mt-2 text-sm text-muted">
            <b>{email}</b> 으로 보낸 인증 메일의 링크를 누르면 가입이 완료됩니다.
            인증 후 로그인해 주세요.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            로그인하러 가기
          </Link>
        </div>
      </Section>
    )
  }

  return (
    <Section className="bg-bg">
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-2xl font-bold">회원가입</h1>
        <p className="mt-2 text-center text-sm text-muted">
          이메일과 비밀번호로 계정을 만드세요.
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
              placeholder="6자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              className={field}
              placeholder="비밀번호를 다시 입력"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? '가입 중…' : '회원가입'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" /> 또는 <span className="h-px flex-1 bg-border" />
        </div>
        <KakaoButton label="카카오로 시작하기" />

        <p className="mt-6 text-center text-sm text-muted">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </Section>
  )
}
