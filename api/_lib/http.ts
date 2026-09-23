import type { IncomingMessage, ServerResponse } from 'http'

export interface ApiRequest extends IncomingMessage {
  query: Record<string, string | string[]>
  cookies: Record<string, string>
  body: unknown
}

export interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
  send(body: unknown): void
}

export function readTokenHeader(req: ApiRequest): string | null {
  const token = req.headers['x-admin-token']
  if (!token) return null
  return Array.isArray(token) ? token[0] : token
}

export async function readJsonBody(req: ApiRequest): Promise<Record<string, unknown>> {
  const body = req.body
  if (body && typeof body === 'object') return body as Record<string, unknown>
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  return {}
}
