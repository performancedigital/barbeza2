import type { ApiRequest, ApiResponse } from './_lib/http.js'
import { readTokenHeader, readJsonBody } from './_lib/http.js'
import { verifyPassword, setPassword, resetPassword } from './_lib/auth.js'

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' })
    return
  }

  const body = await readJsonBody(req)
  const action = body.action as string | undefined

  if (action === 'login') {
    const password = body.password as string | undefined
    if (!password || !(await verifyPassword(password))) {
      res.status(401).json({ ok: false })
      return
    }
    res.status(200).json({ ok: true })
    return
  }

  if (action === 'change-password') {
    const token = readTokenHeader(req)
    const currentPassword = body.currentPassword as string | undefined
    const newPassword = body.newPassword as string | undefined

    if (!token || !currentPassword || token !== currentPassword || !(await verifyPassword(currentPassword))) {
      res.status(401).json({ ok: false, error: 'Senha atual incorreta.' })
      return
    }
    if (!newPassword || newPassword.length < 6) {
      res.status(400).json({ ok: false, error: 'Nova senha deve ter no mínimo 6 caracteres.' })
      return
    }
    await setPassword(newPassword)
    res.status(200).json({ ok: true })
    return
  }

  if (action === 'reset-password') {
    await resetPassword()
    res.status(200).json({ ok: true })
    return
  }

  res.status(400).json({ error: 'Ação inválida.' })
}
