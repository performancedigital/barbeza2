import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { SectionsVisibility } from '@/data/defaultContent'
import { Eye, Check } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

const FIELDS: { key: keyof SectionsVisibility; label: string }[] = [
  { key: 'stats', label: 'Estatísticas (números em destaque)' },
  { key: 'services', label: 'Serviços' },
  { key: 'video', label: 'Espaço em vídeo' },
  { key: 'space', label: 'Ambientes' },
  { key: 'gallery', label: 'Galeria de fotos' },
  { key: 'testimonials', label: 'Depoimentos' },
  { key: 'booking', label: 'Agendamento' },
  { key: 'location', label: 'Localização' },
]

export function SectionsManager() {
  const { content, setContent } = useContent()
  const [form, setForm] = useState<SectionsVisibility>(content.sections)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const toggle = async (key: keyof SectionsVisibility) => {
    const updated = { ...form, [key]: !form[key] }
    setForm(updated)
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    try {
      const result = await saveContent({ sections: updated }, token)
      setContent(result)
    } catch (err) {
      setForm(form)
      flash('err', err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <Eye size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">SEÇÕES DO SITE</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">
            Mostre ou esconda partes da página {saving && '• salvando...'}
          </p>
        </div>
      </div>

      {msg && (
        <p className={`font-inter text-xs rounded px-3 py-2 mb-4 ${msg.type === 'ok' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-500'}`}>
          {msg.text}
        </p>
      )}

      <div className="glass-card rounded-xl p-2 flex flex-col divide-y divide-natural-border">
        {FIELDS.map(({ key, label }) => (
          <label key={key} className="flex items-center justify-between px-4 py-3.5 cursor-pointer">
            <span className="font-inter text-sm text-ink">{label}</span>
            <button
              type="button"
              onClick={() => toggle(key)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${form[key] ? 'bg-forest' : 'bg-natural-border'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form[key] ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </label>
        ))}
      </div>

      <div className="mt-4 glass-card rounded-lg p-4 flex items-center gap-2">
        <Check size={14} className="text-forest" />
        <p className="font-inter text-xs text-ink-muted">Alterações são salvas automaticamente.</p>
      </div>
    </div>
  )
}
