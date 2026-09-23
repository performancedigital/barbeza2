import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { Testimonial } from '@/types'
import { Plus, Trash2, Pencil, Check, X, Quote, Star } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'
const BLANK: Omit<Testimonial, 'id'> = { name: '', text: '', rating: 5, service: '' }

export function TestimonialsManager() {
  const { content, setContent } = useContent()
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const items = content.testimonials

  const persist = async (updated: Testimonial[]) => {
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    setError(null)
    try {
      const result = await saveContent({ testimonials: updated }, token)
      setContent(result)
      setEditing(null)
      setAdding(false)
      setForm(BLANK)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  const upsert = (id?: string) => {
    if (!form.name || !form.text) return
    const updated = id
      ? items.map(t => t.id === id ? { ...t, ...form } : t)
      : [...items, { ...form, id: Date.now().toString() }]
    persist(updated)
  }

  const remove = (id: string) => {
    if (!confirm('Remover este depoimento?')) return
    persist(items.filter(t => t.id !== id))
  }

  const startEdit = (t: Testimonial) => {
    setEditing(t.id)
    setAdding(false)
    setForm({ name: t.name, text: t.text, rating: t.rating, service: t.service || '' })
  }

  const cancel = () => {
    setEditing(null)
    setAdding(false)
    setForm(BLANK)
  }

  const Form = ({ id }: { id?: string }) => (
    <div className="glass-card rounded-lg p-5 mb-4 flex flex-col gap-3 border border-forest/20">
      <input className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink" placeholder="Nome do cliente"
        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <textarea className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink resize-none" rows={3}
        placeholder="Depoimento" value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} />
      <div className="flex gap-3">
        <input className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink flex-1" placeholder="Serviço (opcional)"
          value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
        <select className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink w-28"
          value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} estrela{n !== 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <button onClick={() => upsert(id)} disabled={saving} className="flex items-center gap-1 bg-forest text-white px-4 py-1.5 text-xs font-raleway tracking-wider rounded hover:bg-forest-light disabled:opacity-60">
          <Check size={14} /> {saving ? 'Salvando...' : 'Salvar'}
        </button>
        <button onClick={cancel} className="flex items-center gap-1 border border-natural-border text-ink-muted px-4 py-1.5 text-xs rounded hover:border-forest/50">
          <X size={14} /> Cancelar
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
            <Quote size={18} className="text-forest" />
          </div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">DEPOIMENTOS</h2>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); setForm(BLANK) }}
          className="flex items-center gap-2 bg-forest text-white px-4 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors">
          <Plus size={14} /> Novo Depoimento
        </button>
      </div>

      {error && <p className="font-inter text-xs text-red-500 bg-red-50 rounded px-3 py-2 mb-4">{error}</p>}

      {adding && <Form />}

      <div className="flex flex-col gap-3">
        {items.map(t => (
          <div key={t.id}>
            {editing === t.id ? (
              <Form id={t.id} />
            ) : (
              <div className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-raleway text-ink text-sm">{t.name}</p>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={11} className="text-olive fill-olive" />)}
                    </span>
                    {t.service && <span className="font-inter text-xs text-ink-muted">• {t.service}</span>}
                  </div>
                  <p className="font-inter text-xs text-ink-muted">{t.text}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => startEdit(t)} className="text-ink-muted hover:text-forest transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => remove(t.id)} className="text-ink-muted/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && !adding && (
        <p className="font-inter text-ink-muted/50 text-sm text-center py-10">Nenhum depoimento cadastrado ainda.</p>
      )}
    </div>
  )
}
