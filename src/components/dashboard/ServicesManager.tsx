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
      <h2 className="font-oswald text-brand text-lg tracking-widest mb-6">SERVIÇOS & PREÇOS</h2>
      <div className="flex flex-col gap-4">
        {services.map(service => (
          <div key={service.id} className="glass-card rounded-lg p-5">
            {editing === service.id ? (
              <div className="flex flex-col gap-3">
                <input
                  className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream"
                  value={form.name || ''}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nome do serviço"
                />
                <div className="flex gap-3">
                  <input
                    type="number"
                    className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream w-32"
                    value={form.price || 0}
                    onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                    placeholder="Preço (R$)"
                  />
                  <input
                    className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream flex-1"
                    value={form.duration || ''}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                    placeholder="Duração"
                  />
                </div>
                <textarea
                  className="bg-dark-card border border-dark-border rounded px-3 py-2 text-sm text-cream resize-none"
                  rows={2}
                  value={form.description || ''}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Descrição"
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1 bg-brand text-dark px-4 py-1.5 text-xs font-oswald tracking-wider rounded hover:bg-brand-light">
                    <Check size={14} /> Salvar
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-1 border border-dark-border text-cream-muted px-4 py-1.5 text-xs rounded hover:border-brand/50">
                    <X size={14} /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-oswald text-cream text-sm tracking-wide">{service.name}</p>
                    {service.featured && <span className="text-[9px] bg-brand text-dark px-1.5 py-0.5 font-oswald">POPULAR</span>}
                    {service.premium && <span className="text-[9px] border border-brand text-brand px-1.5 py-0.5 font-oswald">PREMIUM</span>}
                  </div>
                  <p className="font-inter text-xs text-cream-muted">{service.duration} • {service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-oswald text-brand font-bold text-lg">R${service.price}</span>
                  <button onClick={() => startEdit(service)} className="text-cream-muted hover:text-brand transition-colors">
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

