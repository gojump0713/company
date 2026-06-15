import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Section from '@/components/ui/Section'
import { useAuth } from '@/auth/AuthProvider'
import { deletePost, getPost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import { toKoreanError } from '@/lib/errorMessage'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getPost(id)
      .then(setPost)
      .catch((e) => setError(toKoreanError(e?.message)))
      .finally(() => setLoading(false))
  }, [id])

  const isAuthor = !!user && !!post && user.id === post.author_id

  async function handleDelete() {
    if (!post) return
    if (!confirm('이 글을 삭제할까요? 삭제하면 되돌릴 수 없습니다.')) return
    try {
      await deletePost(post.id)
      navigate('/board', { replace: true }) // 삭제 후 목록으로
    } catch (e) {
      setError(toKoreanError(e instanceof Error ? e.message : undefined))
    }
  }

  return (
    <Section className="bg-bg">
      <div className="mx-auto max-w-2xl">
        <Link to="/board" className="text-sm text-muted hover:text-brand-600">
          ← 목록으로
        </Link>

        {loading && <p className="mt-6 text-sm text-muted">불러오는 중…</p>}
        {error && <p className="mt-6 text-sm text-red-500">{error}</p>}
        {!loading && !post && !error && (
          <p className="mt-6 text-sm text-muted">글을 찾을 수 없습니다.</p>
        )}

        {post && (
          <article className="mt-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="mt-3 flex items-center gap-3 border-b border-border pb-4 text-sm text-muted">
              <span>{post.author_name ?? '익명'}</span>
              <span>·</span>
              <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
            </div>

            <div className="mt-6 whitespace-pre-wrap leading-relaxed text-fg">{post.content}</div>

            {isAuthor && (
              <div className="mt-10 flex gap-3 border-t border-border pt-6">
                <Link
                  to={`/board/${post.id}/edit`}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-brand-400"
                >
                  ✏️ 수정
                </Link>
                <button
                  onClick={handleDelete}
                  className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
                >
                  🗑️ 삭제
                </button>
              </div>
            )}
          </article>
        )}
      </div>
    </Section>
  )
}
