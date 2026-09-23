import { list, put } from '@vercel/blob'
import { DEFAULT_SITE_CONTENT } from './defaultContent.js'

export const CONTENT_PATHNAME = 'content/site.json'
export const AUTH_PATHNAME = 'content/auth.json'

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const { blobs } = await list({ prefix: pathname, limit: 1 })
  const match = blobs.find(b => b.pathname === pathname) ?? blobs[0]
  if (!match) return null
  const res = await fetch(match.url, { cache: 'no-store' })
  if (!res.ok) return null
  return (await res.json()) as T
}

async function writeJsonBlob(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

export async function getSiteContent(): Promise<Record<string, unknown>> {
  const content = await readJsonBlob<Record<string, unknown>>(CONTENT_PATHNAME)
  if (content) return content
  await writeJsonBlob(CONTENT_PATHNAME, DEFAULT_SITE_CONTENT)
  return DEFAULT_SITE_CONTENT
}

export async function saveSiteContent(partial: Record<string, unknown>): Promise<Record<string, unknown>> {
  const current = await getSiteContent()
  const updated = { ...current, ...partial }
  await writeJsonBlob(CONTENT_PATHNAME, updated)
  return updated
}

export interface AuthData {
  passwordHash: string
}

export async function getAuthData(): Promise<AuthData> {
  const auth = await readJsonBlob<AuthData>(AUTH_PATHNAME)
  return auth ?? { passwordHash: '' }
}

export async function saveAuthData(data: AuthData): Promise<void> {
  await writeJsonBlob(AUTH_PATHNAME, data)
}
