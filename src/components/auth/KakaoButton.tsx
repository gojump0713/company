import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toKoreanError } from '@/lib/errorMessage'

// 카카오 OAuth 로그인 버튼.
// ⚠️ 동작하려면 Supabase 대시보드 → Authentication → Providers → Kakao 를
//    활성화하고 카카오 개발자센터의 REST API 키/시크릿을 등록해야 합니다.
//    (자세한 설정은 docs/supabase-setup.md 참고)
export default function KakaoButton({ label = '카카오로 로그인' }: { label?: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signInWithKakao() {
    setError(null)
    if (!supabase) {
      setError('Supabase 연결이 설정되지 않았습니다.')
      return
    }
    setBusy(true)
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // 로그인 후 앱으로 되돌아올 주소 (GitHub Pages base 경로 포함)
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}board`,
      },
    })
    // 정상이면 카카오 페이지로 리다이렉트되므로 아래는 실패 시에만 실행됨
    if (oauthError) {
      setBusy(false)
      setError(toKoreanError(oauthError.message))
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={signInWithKakao}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FEE500] px-6 py-3 text-sm font-semibold text-[#191600] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-base">💬</span>
        {busy ? '이동 중…' : label}
      </button>
      {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
    </div>
  )
}
