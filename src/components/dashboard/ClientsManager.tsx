import { useState } from 'react'
import type { Client } from '@/types'
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'

const STORAGE_KEY = 'barbeza-clients'

function loadClients(): Client[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : []
  } catch { return [] }
}

function saveClients(clients: Client[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

const BLANK: Omit<Client, 'id' | 'createdAt'> = {
  name: '', phone: '', preference: '', notes: '', lastVisit: '',
}

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>(loadClients)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(BLANK)

  const upsert = (id?: string) => {
    if (!form.name) return
    let updated: Client[]
    if (id) {
      updated = clients.map(c => c.id === id ? { ...c, ...form } : c)
    } else {
      updated = [...clients, { ...form, id: Date.now().toString(), createdAt: new Date().toLocaleDateString('pt-BR') }]
    }
    setClients(updated)
    saveClients(updated)
    setEditing(null)
    setAdding(false)
    setForm(BLANK)
  }

  const remove = (id: string) => {
    const updated = clients.filter(c => c.id !== id)
    setClients(updated)
    saveClients(updated)
  }

  const startEdit = (c: Client) => {
    setEditing(c.id)
    setForm({ name: c.name, phone: c.phone, preference: c.preference, notes: c.notes, lastVisit: c.lastVisit })
  }

  const ClientForm = ({ id }: { id?: string }) => (
    <div className="glass-card rounded-lg p-5 mb-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream" placeholder="Nome*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream" placeholder="Telefone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <input className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream" placeholder="Preferência de corte" value={form.preference} onChange={e => setForm(f => ({ ...f, preference: e.target.value }))} />
        <input type="date" className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream" value={form.lastVisit} onChange={e => setForm(f => ({ ...f, lastVisit: e.target.value }))} />
      </div>
      <textarea className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream resize-none" rows={2} placeholder="Notas" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      <div className="flex gap-2">
        <button onClick={() => upsert(id)} className="flex items-center gap-1 bg-brand text-dark px-4 py-1.5 text-xs font-oswald tracking-wider hover:bg-brand-light">
          <Check size={14} /> Salvar
        </button>
        <button onClick={() => { setAdding(false); setEditing(null); setForm(BLANK) }} className="flex items-center gap-1 border border-dark-border text-cream-muted px-4 py-1.5 text-xs rounded">
          <X size={14} /> Cancelar
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-oswald text-brand text-lg tracking-widest">CLIENTES</h2>
        <button onClick={() => { setAdding(true); setEditing(null) }} className="flex items-center gap-2 bg-brand text-dark px-4 py-2 text-xs font-oswald tracking-wider hover:bg-brand-light">
          <Plus size={14} /> Novo Cliente
        </button>
      </div>

      {adding && <ClientForm />}

      {clients.length === 0 && !adding && (
        <p className="font-inter text-cream-muted/50 text-sm text-center py-10">Nenhum cliente cadastrado ainda.</p>
      )}

      <div className="flex flex-col gap-3">
        {clients.map(client => (
          <div key={client.id}>
            {editing === client.id ? (
              <ClientForm id={client.id} />
            ) : (
              <div className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-oswald text-cream text-sm">{client.name}</p>
                    <span className="font-inter text-xs text-cream-muted">• {client.phone}</span>
                  </div>
                  <p className="font-inter text-xs text-cream-muted/70">{client.preference || '—'}</p>
                  {client.notes && <p className="font-inter text-xs text-cream-muted/50 mt-1">{client.notes}</p>}
                </div>
                <div className="flex items-center gap-4 text-xs">
                  {client.lastVisit && (
                    <span className="font-inter text-brand/60">Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}</span>
                  )}
                  <button onClick={() => startEdit(client)} className="text-cream-muted hover:text-brand transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => remove(client.id)} className="text-cream-muted/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

