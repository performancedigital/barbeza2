import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'

const TOKEN_KEY = 'barbeza-admin-token'

export function HoursManager() {
  const { content, setContent } = useContent()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = async (key: string, field: string, value: string | boolean) => {
    const updatedHours = { ...content.hours, [key]: { ...content.hours[key], [field]: value } }
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    setError(null)
    try {
      const result = await saveContent({ hours: updatedHours }, token)
      setContent(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="font-raleway text-forest text-lg tracking-widest mb-6">HORÁRIOS DE FUNCIONAMENTO</h2>
      {error && <p className="font-inter text-xs text-red-500 bg-red-50 rounded px-3 py-2 mb-4">{error}</p>}
      <div className="flex flex-col gap-3">
        {Object.entries(content.hours).map(([key, day]) => (
          <div key={key} className="glass-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:w-40">
              <input
                type="checkbox"
                checked={day.active}
                onChange={e => update(key, 'active', e.target.checked)}
                className="w-4 h-4 accent-[#C9A84C]"
              />
              <span className="font-inter text-sm text-ink">{day.label}</span>
            </div>
            {day.active ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs text-ink-muted">Abre:</span>
                  <input
                    type="time"
                    value={day.open}
                    onChange={e => update(key, 'open', e.target.value)}
                    className="bg-natural border border-natural-border rounded px-2 py-1 text-sm text-ink"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-inter text-xs text-ink-muted">Fecha:</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={e => update(key, 'close', e.target.value)}
                    className="bg-natural border border-natural-border rounded px-2 py-1 text-sm text-ink"
                  />
                </div>
              </div>
            ) : (
              <span className="font-inter text-xs text-cream-muted/50">Fechado</span>
            )}
          </div>
        ))}
      </div>
      <p className="font-inter text-xs text-cream-muted/40 mt-4">{saving ? 'Salvando...' : 'Alterações salvas automaticamente'}</p>
    </div>
  )
}
