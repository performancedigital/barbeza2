import { useRef, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent, uploadImage } from '@/lib/api'
import type { SpaceRoom } from '@/types'
import { DoorOpen, Plus, Trash2, Pencil, Check, X, Upload } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'
const BLANK: Omit<SpaceRoom, 'id'> = { label: '', description: '', image: '', badge: '' }

export function SpaceManager() {
  const { content, setContent } = useContent()
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const items = content.spaceRooms

  const persist = async (updated: SpaceRoom[]) => {
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    setError(null)
    try {
      const result = await saveContent({ spaceRooms: updated }, token)
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
    if (!form.label || !form.image) return
    const updated = id
      ? items.map(r => r.id === id ? { ...r, ...form } : r)
      : [...items, { ...form, id: `sala-${Date.now()}` }]
    persist(updated)
  }

  const remove = (id: string) => {
    if (!confirm('Remover este ambiente?')) return
    persist(items.filter(r => r.id !== id))
  }

  const startEdit = (r: SpaceRoom) => {
    setEditing(r.id)
    setAdding(false)
    setForm({ label: r.label, description: r.description, image: r.image, badge: r.badge || '' })
  }

  const cancel = () => {
    setEditing(null)
    setAdding(false)
    setForm(BLANK)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) {
      setError('Imagem muito grande. Máximo 8MB.')
      return
    }
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setUploading(true)
    setError(null)
    try {
      const url = await uploadImage(file, token)
      setForm(f => ({ ...f, image: url }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar imagem.')
    } finally {
      setUploading(false)
    }
  }

  const Form = ({ id }: { id?: string }) => (
    <div className="glass-card rounded-lg p-5 mb-4 flex flex-col gap-3 border border-forest/20">
      <input className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink" placeholder="Nome do ambiente"
        value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
      <textarea className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink resize-none" rows={3}
        placeholder="Descrição" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <input className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink" placeholder="Selo (ex: NOVO ESPAÇO)"
        value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-forest/50 transition-colors disabled:opacity-60">
          <Upload size={14}/> {uploading ? 'ENVIANDO...' : 'FOTO DO AMBIENTE'}
        </button>
        {form.image && <img src={form.image} alt="" className="h-12 w-16 object-cover rounded" />}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div className="flex gap-2">
        <button onClick={() => upsert(id)} disabled={saving || uploading} className="flex items-center gap-1 bg-forest text-white px-4 py-1.5 text-xs font-raleway tracking-wider rounded hover:bg-forest-light disabled:opacity-60">
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
            <DoorOpen size={18} className="text-forest" />
          </div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">AMBIENTES</h2>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); setForm(BLANK) }}
          className="flex items-center gap-2 bg-forest text-white px-4 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors">
          <Plus size={14} /> Novo Ambiente
        </button>
      </div>

      {error && <p className="font-inter text-xs text-red-500 bg-red-50 rounded px-3 py-2 mb-4">{error}</p>}

      {adding && <Form />}

      <div className="flex flex-col gap-3">
        {items.map(room => (
          <div key={room.id}>
            {editing === room.id ? (
              <Form id={room.id} />
            ) : (
              <div className="glass-card rounded-lg p-4 flex items-center gap-4">
                {room.image && <img src={room.image} alt={room.label} className="h-16 w-24 object-cover rounded shrink-0" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-raleway text-ink text-sm">{room.label}</p>
                    {room.badge && <span className="text-[9px] bg-forest text-white px-1.5 py-0.5 rounded">{room.badge}</span>}
                  </div>
                  <p className="font-inter text-xs text-ink-muted">{room.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => startEdit(room)} className="text-ink-muted hover:text-forest transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => remove(room.id)} className="text-ink-muted/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
