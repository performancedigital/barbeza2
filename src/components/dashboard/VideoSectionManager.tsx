import { useRef, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent, uploadImage, uploadVideo } from '@/lib/api'
import { Video, Check, Upload, Image as ImageIcon } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

export function VideoSectionManager() {
  const { content, setContent } = useContent()
  const [form, setForm] = useState(content.videoSection)
  const [saving, setSaving] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingPoster, setUploadingPoster] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const posterRef = useRef<HTMLInputElement>(null)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const token = () => sessionStorage.getItem(TOKEN_KEY) || ''

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await saveContent({ videoSection: form }, token())
      setContent(result)
      flash('ok', 'Seção de vídeo atualizada!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  const handleVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 100 * 1024 * 1024) {
      flash('err', 'Vídeo muito grande. Máximo 100MB.')
      return
    }
    setUploadingVideo(true)
    try {
      const url = await uploadVideo(file, token())
      const updated = { ...form, videoUrl: url }
      setForm(updated)
      const result = await saveContent({ videoSection: updated }, token())
      setContent(result)
      flash('ok', 'Vídeo atualizado!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao enviar vídeo.')
    } finally {
      setUploadingVideo(false)
      if (videoRef.current) videoRef.current.value = ''
    }
  }

  const handlePoster = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) {
      flash('err', 'Imagem muito grande. Máximo 8MB.')
      return
    }
    setUploadingPoster(true)
    try {
      const url = await uploadImage(file, token())
      const updated = { ...form, posterUrl: url }
      setForm(updated)
      const result = await saveContent({ videoSection: updated }, token())
      setContent(result)
      flash('ok', 'Capa do vídeo atualizada!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao enviar imagem.')
    } finally {
      setUploadingPoster(false)
      if (posterRef.current) posterRef.current.value = ''
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <Video size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">ESPAÇO EM VÍDEO</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">Vídeo do ambiente exibido na landing page</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 flex flex-col gap-5 mb-6">
        <div>
          <label className="font-inter text-xs text-ink-muted mb-2 block">Vídeo</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => videoRef.current?.click()} disabled={uploadingVideo}
              className="flex items-center gap-2 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-forest/50 transition-colors disabled:opacity-60">
              <Upload size={14}/> {uploadingVideo ? 'ENVIANDO...' : 'TROCAR VÍDEO'}
            </button>
            <span className="font-inter text-xs text-ink-muted/60 truncate max-w-xs">{form.videoUrl}</span>
          </div>
          <input ref={videoRef} type="file" accept="video/mp4" className="hidden" onChange={handleVideo} />
        </div>

        <div>
          <label className="font-inter text-xs text-ink-muted mb-2 block">Capa (thumbnail) do vídeo</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => posterRef.current?.click()} disabled={uploadingPoster}
              className="flex items-center gap-2 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-forest/50 transition-colors disabled:opacity-60">
              <ImageIcon size={14}/> {uploadingPoster ? 'ENVIANDO...' : 'TROCAR CAPA'}
            </button>
            <span className="font-inter text-xs text-ink-muted/60 truncate max-w-xs">{form.posterUrl}</span>
          </div>
          <input ref={posterRef} type="file" accept="image/*" className="hidden" onChange={handlePoster} />
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-xl p-6 flex flex-col gap-4">
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Texto pequeno (eyebrow)</label>
          <input
            className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            value={form.eyebrow}
            onChange={e => setForm(f => ({ ...f, eyebrow: e.target.value }))}
          />
        </div>
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Título da seção</label>
          <input
            className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
        </div>

        {msg && (
          <p className={`font-inter text-xs rounded px-3 py-2 ${msg.type === 'ok' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-500'}`}>
            {msg.text}
          </p>
        )}

        <div>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-forest text-white px-5 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors disabled:opacity-60">
            <Check size={14}/> {saving ? 'SALVANDO...' : 'SALVAR TEXTOS'}
          </button>
        </div>
      </form>
    </div>
  )
}
