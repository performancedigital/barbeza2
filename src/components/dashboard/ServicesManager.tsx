import { useState } from 'react'
import { SERVICES } from '@/data/content'
import type { Service } from '@/types'
import { Pencil, Check, X } from 'lucide-react'

const STORAGE_KEY = 'barbeza-services'

function loadServices(): Service[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : SERVICES
  } catch { return SERVICES }
}

function saveServices(services: Service[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>(loadServices)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Service>>({})

  const startEdit = (s: Service) => { setEditing(s.id); setForm(s) }
  const cancelEdit = () => { setEditing(null); setForm({}) }

  const saveEdit = () => {
    const updated = services.map(s => s.id === editing ? { ...s, ...form } : s)
    setServices(updated)
    saveServices(updated)
    setEditing(null)
  }

  return (
    <div>
      <h2 className="font-raleway text-forest text-lg tracking-widest mb-6">SERVIÇOS & PREÇOS</h2>
      <div className="flex flex-col gap-4">
        {services.map(service => (
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
                  <button onClick={saveEdit} className="flex items-center gap-1 bg-forest text-dark px-4 py-1.5 text-xs font-raleway tracking-wider rounded hover:bg-forest-light">
                    <Check size={14} /> Salvar
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
                    {service.featured && <span className="text-[9px] bg-forest text-dark px-1.5 py-0.5 font-raleway">POPULAR</span>}
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


