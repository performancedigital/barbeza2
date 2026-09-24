import type { SiteContent } from '@/data/defaultContent'

const TOKEN_HEADER = 'x-admin-token'

async function parseJsonResponse(res: Response) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = (data && (data.error || data.text)) || 'Erro na requisição.'
    throw new Error(message)
  }
  return data
}

export async function fetchContent(): Promise<SiteContent> {
  const res = await fetch('/api/content', { cache: 'no-store' })
  if (!res.ok) throw new Error('Falha ao carregar conteúdo do site.')
  return (await res.json()) as SiteContent
}

export async function saveContent(partial: Partial<SiteContent>, token: string): Promise<SiteContent> {
  const res = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [TOKEN_HEADER]: token,
    },
    body: JSON.stringify(partial),
  })
  return (await parseJsonResponse(res)) as SiteContent
}

export async function login(password: string): Promise<boolean> {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', password }),
  })
  const data = await res.json().catch(() => ({ ok: false }))
  return !!data.ok
}

export async function changePassword(current: string, next: string, token: string): Promise<void> {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [TOKEN_HEADER]: token,
    },
    body: JSON.stringify({ action: 'change-password', currentPassword: current, newPassword: next }),
  })
  await parseJsonResponse(res)
}

export async function resetPassword(): Promise<void> {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reset-password' }),
  })
  await parseJsonResponse(res)
}

async function uploadViaPresignedUrl(file: File, token: string): Promise<string> {
  const initRes = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, fileName: file.name }),
  })
  const { presignedUrl } = (await parseJsonResponse(initRes)) as { presignedUrl: string }

  const putRes = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  })
  if (!putRes.ok) {
    const message = await putRes.text().catch(() => '')
    throw new Error(message || 'Falha ao enviar arquivo.')
  }
  const result = (await putRes.json()) as { url: string }
  return result.url
}

export async function uploadImage(file: File, token: string): Promise<string> {
  return uploadViaPresignedUrl(file, token)
}

export async function uploadVideo(file: File, token: string): Promise<string> {
  return uploadViaPresignedUrl(file, token)
}
