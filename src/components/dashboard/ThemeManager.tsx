import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { ThemeColors } from '@/data/defaultContent'
import { hexToRgbTriplet } from '@/lib/color'
import { Palette, Check } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

const FIELDS: { key: keyof ThemeColors; label: string }[] = [
  { key: 'forest', label: 'Verde principal (forest)' },
  { key: 'forestLight', label: 'Verde claro (forest light)' },
  { key: 'forestDark', label: 'Verde escuro (forest dark)' },
  { key: 'forestDeep', label: 'Verde profundo (fundo escuro)' },
  { key: 'olive', label: 'Dourado / oliva' },
  { key: 'oliveLight', label: 'Oliva claro' },
  { key: 'oliveDark', label: 'Oliva escuro' },
]

export function ThemeManager() {
  const { content, setContent } = useContent()
  const [form, setForm] = useState<ThemeColors>(content.theme.colors)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const preview = (colors: ThemeColors) => {
    const map: Record<keyof ThemeColors, string> = {
      forest: '--color-forest',
      forestLight: '--color-forest-light',
      forestDark: '--color-forest-dark',
      forestDeep: '--color-forest-deep',
      olive: '--color-olive',
      oliveLight: '--color-olive-light',
      oliveDark: '--color-olive-dark',
    }
    ;(Object.keys(map) as (keyof ThemeColors)[]).forEach(key => {
      document.documentElement.style.setProperty(map[key], hexToRgbTriplet(colors[key]))
    })
  }

  const update = (key: keyof ThemeColors, value: string) => {
    const updated = { ...form, [key]: value }
    setForm(updated)
    preview(updated)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    try {
      const result = await saveContent({ theme: { colors: form } }, token)
      setContent(result)
      flash('ok', 'Cores da marca atualizadas!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao salvar.')
      preview(content.theme.colors)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <Palette size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">CORES DA MARCA</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">O preview é aplicado ao site em tempo real</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-xl p-6 flex flex-col gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <label className="font-inter text-xs text-ink-muted flex-1">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form[key]}
                onChange={e => update(key, e.target.value)}
                className="w-10 h-10 rounded border border-natural-border cursor-pointer bg-transparent"
              />
              <input
                className="w-24 bg-natural border border-natural-border rounded px-2 py-1.5 font-inter text-xs text-ink uppercase"
                value={form[key]}
                onChange={e => update(key, e.target.value)}
              />
            </div>
          </div>
        ))}

        {msg && (
          <p className={`font-inter text-xs rounded px-3 py-2 ${msg.type === 'ok' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-500'}`}>
            {msg.text}
          </p>
        )}

        <div>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-forest text-white px-5 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors disabled:opacity-60">
            <Check size={14}/> {saving ? 'SALVANDO...' : 'SALVAR CORES'}
          </button>
        </div>
      </form>
    </div>
  )
}
