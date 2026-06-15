import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Section, { SectionHeading } from '@/components/ui/Section'
import { useAuth } from '@/auth/AuthProvider'
import { listPosts } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import { toKoreanError } from '@/lib/errorMessage'

export default function Board() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    listPosts()
      .then(setPosts)
      .catch((e) => setError(toKoreanError(e?.message)))
      .finally(() => setLoading(false))
  }, [])

  // 로그인 안 한 사용자가 글쓰기를 누르면 로그인 페이지로 이동(이전 위치 기억)
  function handleWrite() {
    if (!user) {
      alert('글을 작성하려면 로그인이 필요합니다.')
      navigate('/login', { state: { from: '/board/new' } })
      return
    }
    navigate('/board/new')
  }

  return (
    <>
      <Section className="bg-ink text-white">
        <SectionHeading eyebrow="Community" title="게시판" desc="자유롭게 글을 작성하고 의견을 나눠보세요." />
      </Section>

      <Section className="bg-bg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">전체 글 {posts.length > 0 && `(${posts.length})`}</h2>
          <button
            onClick={handleWrite}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            ✏️ 글쓰기
          </button>
        </div>

        {loading && <p className="text-sm text-muted">불러오는 중…</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted">
            아직 작성된 글이 없습니다. 첫 글을 남겨보세요!
          </div>
        )}

        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                to={`/board/${p.id}`}
                className="flex items-center justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-surface"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-fg">{p.title}</h3>
                  <p className="mt-1 truncate text-sm text-muted">{p.content}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-muted">
                  <div>{p.author_name ?? '익명'}</div>
                  <div className="mt-1">{new Date(p.created_at).toLocaleDateString('ko-KR')}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
