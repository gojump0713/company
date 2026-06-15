// Supabase 가 돌려주는 영어 에러 메시지를 초보자도 이해하기 쉬운 한국어로 변환합니다.
export function toKoreanError(message?: string): string {
  if (!message) return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  const m = message.toLowerCase()

  if (m.includes('invalid login credentials'))
    return '이메일 또는 비밀번호가 올바르지 않습니다.'
  if (m.includes('email not confirmed'))
    return '이메일 인증이 완료되지 않았습니다. 받은 편지함의 확인 메일을 눌러 주세요.'
  if (m.includes('user already registered') || m.includes('already been registered'))
    return '이미 가입된 이메일입니다. 로그인해 주세요.'
  if (m.includes('password should be at least'))
    return '비밀번호는 최소 6자 이상이어야 합니다.'
  if (m.includes('unable to validate email') || m.includes('invalid email'))
    return '올바른 이메일 형식이 아닙니다.'
  if (m.includes('rate limit') || m.includes('too many'))
    return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
  if (m.includes('provider is not enabled'))
    return '해당 소셜 로그인이 아직 설정되지 않았습니다. 관리자에게 문의해 주세요.'
  if (m.includes('network') || m.includes('failed to fetch'))
    return '네트워크 연결을 확인해 주세요.'

  return message
}
