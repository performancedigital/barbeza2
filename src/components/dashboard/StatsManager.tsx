import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { Stat } from '@/types'
import { TrendingUp, Check } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

export function StatsManager() {
  const { content, setContent } = useContent()
  const [form, setForm] = useState<Stat[]>(content.stats)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const update = (idx: number, field: keyof Stat, value: string | number) => {
    setForm(f => f.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    try {
      const result = await saveContent({ stats: form }, token)
      setContent(result)
      flash('ok', 'Estatísticas atualizadas!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <TrendingUp size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">ESTATÍSTICAS</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">Números exibidos na barra de destaque</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {form.map((stat, idx) => (
          <div key={idx} className="glass-card rounded-lg p-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="col-span-2 sm:col-span-2">
              <label className="font-inter text-[10px] text-ink-muted mb-1 block">Label</label>
              <input className="w-full bg-natural border border-natural-border rounded px-2 py-2 text-sm text-ink"
                value={stat.label} onChange={e => update(idx, 'label', e.target.value)} />
            </div>
            <div>
              <label className="font-inter text-[10px] text-ink-muted mb-1 block">Valor</label>
              <input type="number" className="w-full bg-natural border border-natural-border rounded px-2 py-2 text-sm text-ink"
                value={stat.value} onChange={e => update(idx, 'value', Number(e.target.value))} />
            </div>
            <div>
              <label className="font-inter text-[10px] text-ink-muted mb-1 block">Prefixo</label>
              <input className="w-full bg-natural border border-natural-border rounded px-2 py-2 text-sm text-ink"
                value={stat.prefix || ''} onChange={e => update(idx, 'prefix', e.target.value)} />
            </div>
            <div>
              <label className="font-inter text-[10px] text-ink-muted mb-1 block">Sufixo</label>
              <input className="w-full bg-natural border border-natural-border rounded px-2 py-2 text-sm text-ink"
                value={stat.suffix || ''} onChange={e => update(idx, 'suffix', e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-5">
              <label className="font-inter text-[10px] text-ink-muted mb-1 block">Link (opcional)</label>
              <input className="w-full bg-natural border border-natural-border rounded px-2 py-2 text-sm text-ink"
                value={stat.link || ''} onChange={e => update(idx, 'link', e.target.value)} placeholder="https://..." />
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
            <Check size={14}/> {saving ? 'SALVANDO...' : 'SALVAR ESTATÍSTICAS'}
          </button>
        </div>
      </form>
    </div>
  )
}
