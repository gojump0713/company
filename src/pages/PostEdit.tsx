import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Section from '@/components/ui/Section'
import { useAuth } from '@/auth/AuthProvider'
import { getPost, updatePost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import { toKoreanError } from '@/lib/errorMessage'

const field =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-brand-500'

export default function PostEdit() {
  const { id } = useParams<{ id: string }>()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getPost(id)
      .then((p) => {
        setPost(p)
        if (p) {
          setTitle(p.title)
          setContent(p.content)
        }
      })
      .catch((e) => setError(toKoreanError(e?.message)))
      .finally(() => setLoading(false))
  }, [id])

  // 로그인하지 않았으면 로그인 페이지로
  if (!authLoading && !user) {
    return <Navigate to="/login" replace state={{ from: `/board/${id}/edit` }} />
  }

  if (loading) {
    return (
      <Section className="bg-bg">
        <p className="text-sm text-muted">불러오는 중…</p>
      </Section>
    )
  }

  // 작성자 본인이 아니면 상세 페이지로 돌려보냄
  if (post && user && post.author_id !== user.id) {
    return <Navigate to={`/board/${id}`} replace />
  }

  if (!post) {
    return (
      <Section className="bg-bg">
        <p className="text-sm text-muted">글을 찾을 수 없습니다.</p>
      </Section>
    )
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!id) return
    setError(null)
    setBusy(true)
    try {
      await updatePost(id, { title: title.trim(), content: content.trim() })
      navigate(`/board/${id}`, { replace: true }) // 수정 후 상세로
    } catch (err) {
      setError(toKoreanError(err instanceof Error ? err.message : undefined))
      setBusy(false)
    }
  }

  return (
    <Section className="bg-bg">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">글 수정</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">제목</label>
            <input
              className={field}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">내용</label>
            <textarea
              className={`${field} min-h-60 resize-y`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? '저장 중…' : '저장'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/board/${id}`)}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-brand-400"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
