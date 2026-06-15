import { supabase } from '@/lib/supabase'

// 실제 Supabase posts 테이블 스키마에 맞춤: author_id(작성자 uuid), author_name(표시 이름)
export type Post = {
  id: string
  author_id: string
  author_name: string | null
  title: string
  content: string
  created_at: string
}

function client() {
  if (!supabase) throw new Error('Supabase 연결이 설정되지 않았습니다.')
  return supabase
}

// 최신 글이 위로 오도록 created_at 내림차순 정렬
export async function listPosts(): Promise<Post[]> {
  const { data, error } = await client()
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await client().from('posts').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function createPost(input: { title: string; content: string }): Promise<Post> {
  const c = client()
  const {
    data: { user },
  } = await c.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다.')

  // 표시 이름: 카카오 닉네임 → 이메일 아이디 순으로 사용
  const displayName =
    (user.user_metadata?.name as string | undefined) ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split('@')[0] ??
    '익명'

  const { data, error } = await c
    .from('posts')
    .insert({
      title: input.title,
      content: input.content,
      author_id: user.id, // 현재 로그인한 사용자 id 저장
      author_name: displayName,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePost(
  id: string,
  input: { title: string; content: string },
): Promise<void> {
  // 작성자 본인만 수정 가능(RLS 로 보장). 권한 없으면 에러/0건 처리됨.
  const { error } = await client().from('posts').update(input).eq('id', id)
  if (error) throw error
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await client().from('posts').delete().eq('id', id)
  if (error) throw error
}
