import { issueSignedToken, presignUrl } from '@vercel/blob'
import type { ApiRequest, ApiResponse } from './_lib/http.js'
import { readJsonBody } from './_lib/http.js'
import { verifyPassword } from './_lib/auth.js'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const VIDEO_TYPES = ['video/mp4']

function sanitizeFileName(name: string): string {
  const lower = name.toLowerCase().trim()
  return lower.replace(/[^a-z0-9.\-]+/g, '-').replace(/-+/g, '-')
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' })
    return
  }

  const body = await readJsonBody(req)
  const token = typeof body.token === 'string' ? body.token : ''

  if (!(await verifyPassword(token))) {
    res.status(401).json({ error: 'Não autorizado.' })
    return
  }

  const fileName = typeof body.fileName === 'string' ? body.fileName : ''
  if (!fileName) {
    res.status(400).json({ error: 'Nome do arquivo ausente.' })
    return
  }

  const pathname = `uploads/${Date.now()}-${sanitizeFileName(fileName)}`
  const isVideo = /\.(mp4|mov|webm)$/i.test(pathname)
  const allowedContentTypes = isVideo ? VIDEO_TYPES : IMAGE_TYPES
  const maximumSizeInBytes = isVideo ? 100 * 1024 * 1024 : 8 * 1024 * 1024

  try {
    const signed = await issueSignedToken({
      pathname,
      operations: ['put'],
      allowedContentTypes,
      maximumSizeInBytes,
      validUntil: Date.now() + 15 * 60 * 1000,
    })

    const { presignedUrl } = await presignUrl(signed, {
      operation: 'put',
      pathname,
      access: 'public',
      allowedContentTypes,
      maximumSizeInBytes,
      addRandomSuffix: true,
    })

    res.status(200).json({ presignedUrl })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Falha ao preparar upload.' })
  }
}
