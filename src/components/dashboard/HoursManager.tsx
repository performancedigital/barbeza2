import { useState } from 'react'
import { HOURS } from '@/data/content'
import type { BusinessHours } from '@/types'

const STORAGE_KEY = 'barbeza-hours'

function loadHours(): BusinessHours {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : HOURS
  } catch { return HOURS }
}

export function HoursManager() {
  const [hours, setHours] = useState<BusinessHours>(loadHours)

  const update = (key: string, field: string, value: string | boolean) => {
    const updated = { ...hours, [key]: { ...hours[key], [field]: value } }
    setHours(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <div>
      <h2 className="font-oswald text-brand text-lg tracking-widest mb-6">HORÁRIOS DE FUNCIONAMENTO</h2>
      <div className="flex flex-col gap-3">
        {Object.entries(hours).map(([key, day]) => (
          <div key={key} className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:w-40">
              <input
                type="checkbox"
                checked={day.active}
                onChange={e => update(key, 'active', e.target.checked)}
                className="w-4 h-4 accent-[#C9A84C]"
              />
              <span className="font-inter text-sm text-cream">{day.label}</span>
            </div>
            {day.active ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs text-cream-muted">Abre:</span>
                  <input
                    type="time"
                    value={day.open}
                    onChange={e => update(key, 'open', e.target.value)}
                    className="bg-dark-card border border-dark-border rounded px-2 py-1 text-sm text-cream"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs text-cream-muted">Fecha:</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={e => update(key, 'close', e.target.value)}
                    className="bg-dark-card border border-dark-border rounded px-2 py-1 text-sm text-cream"
                  />
                </div>
              </div>
            ) : (
              <span className="font-inter text-xs text-cream-muted/50">Fechado</span>
            )}
          </div>
        ))}
      </div>
      <p className="font-inter text-xs text-cream-muted/40 mt-4">Alterações salvas automaticamente</p>
    </div>
  )
}

