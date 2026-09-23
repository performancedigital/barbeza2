import { createHash } from 'crypto'
import { getAuthData, saveAuthData } from './blob'

const PEPPER = 'barbeza-2026-salt'
export const DEFAULT_PASSWORD = 'barbeza@2025'

export function hashPassword(password: string): string {
  return createHash('sha256').update(password + PEPPER).digest('hex')
}

export async function getCurrentPasswordHash(): Promise<string> {
  const auth = await getAuthData()
  if (auth.passwordHash) return auth.passwordHash
  return hashPassword(DEFAULT_PASSWORD)
}

export async function verifyPassword(password: string): Promise<boolean> {
  if (!password) return false
  const hash = await getCurrentPasswordHash()
  return hashPassword(password) === hash
}

export async function setPassword(password: string): Promise<void> {
  await saveAuthData({ passwordHash: hashPassword(password) })
}

export async function resetPassword(): Promise<void> {
  await saveAuthData({ passwordHash: hashPassword(DEFAULT_PASSWORD) })
}
