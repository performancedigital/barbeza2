import type { ApiRequest, ApiResponse } from './_lib/http.js'
import { readTokenHeader, readJsonBody } from './_lib/http.js'
import { getSiteContent, saveSiteContent } from './_lib/blob.js'
import { verifyPassword } from './_lib/auth.js'

function omitAuth(data: Record<string, unknown>): Record<string, unknown> {
  const { _auth, ...safe } = data
  return safe
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') {
    const content = await getSiteContent()
    res.status(200).json(omitAuth(content))
    return
  }

  if (req.method === 'POST') {
    const token = readTokenHeader(req)
    if (!token || !(await verifyPassword(token))) {
      res.status(401).json({ error: 'Não autorizado.' })
      return
    }
    const body = await readJsonBody(req)
    const partial = omitAuth(body)
    const updated = await saveSiteContent(partial)
    res.status(200).json(omitAuth(updated))
    return
  }

  res.status(405).json({ error: 'Método não permitido.' })
}
