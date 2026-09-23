import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import type { ApiRequest, ApiResponse } from './_lib/http.js'
import { readJsonBody } from './_lib/http.js'
import { verifyPassword } from './_lib/auth.js'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const VIDEO_TYPES = ['video/mp4']

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' })
    return
  }

  const body = (await readJsonBody(req)) as unknown as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let token = ''
        try {
          const parsed = clientPayload ? JSON.parse(clientPayload) : {}
          token = typeof parsed.token === 'string' ? parsed.token : ''
        } catch {
          token = ''
        }

        if (!(await verifyPassword(token))) {
          throw new Error('Não autorizado.')
        }

        const isVideo = /\.(mp4|mov|webm)$/i.test(pathname)

        return {
          allowedContentTypes: isVideo ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: isVideo ? 100 * 1024 * 1024 : 8 * 1024 * 1024,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Upload concluído:', blob.url)
      },
    })

    res.status(200).json(jsonResponse)
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Falha no upload.' })
  }
}
