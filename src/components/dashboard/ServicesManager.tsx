import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { Service } from '@/types'
import { Pencil, Check, X } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

export function ServicesManager() {
  const { content, setContent } = useContent()
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Service>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startEdit = (s: Service) => { setEditing(s.id); setForm(s); setError(null) }
  const cancelEdit = () => { setEditing(null); setForm({}); setError(null) }

  const saveEdit = async () => {
    const updated = content.services.map(s => s.id === editing ? { ...s, ...form } : s)
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    setError(null)
    try {
      const result = await saveContent({ services: updated }, token)
      setContent(result)
      setEditing(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-raleway text-forest text-lg tracking-widest mb-6">SERVIÇOS & PREÇOS</h2>
      {error && <p className="font-inter text-xs text-red-500 bg-red-50 rounded px-3 py-2 mb-4">{error}</p>}
      <div className="flex flex-col gap-4">
        {content.services.map(service => (
          <div key={service.id} className="glass-card rounded-lg p-5">
            {editing === service.id ? (
              <div className="flex flex-col gap-3">
                <input
                  className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
                  value={form.name || ''}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nome do serviço"
                />
                <div className="flex gap-3">
                  <input
                    type="number"
                    className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink w-32"
                    value={form.price || 0}
                    onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                    placeholder="Preço (R$)"
                  />
                  <input
                    className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink flex-1"
                    value={form.duration || ''}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                    placeholder="Duração"
                  />
                </div>
                <textarea
                  className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink resize-none"
                  rows={2}
                  value={form.description || ''}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Descrição"
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} disabled={saving} className="flex items-center gap-1 bg-forest text-white px-4 py-1.5 text-xs font-raleway tracking-wider rounded hover:bg-forest-light disabled:opacity-60">
                    <Check size={14} /> {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-1 border border-natural-border text-ink-muted px-4 py-1.5 text-xs rounded hover:border-forest/50">
                    <X size={14} /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-raleway text-ink text-sm tracking-wide">{service.name}</p>
                    {service.featured && <span className="text-[9px] bg-forest text-white px-1.5 py-0.5 font-raleway">POPULAR</span>}
                    {service.premium && <span className="text-[9px] border border-forest text-forest px-1.5 py-0.5 font-raleway">PREMIUM</span>}
                  </div>
                  <p className="font-inter text-xs text-ink-muted">{service.duration} • {service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-raleway text-forest font-bold text-lg">R${service.price}</span>
                  <button onClick={() => startEdit(service)} className="text-ink-muted hover:text-forest transition-colors">
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
