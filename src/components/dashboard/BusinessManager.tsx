import { useState } from 'react'
import { useContent } from '@/context/ContentContext'
import { saveContent } from '@/lib/api'
import type { BusinessInfo } from '@/data/defaultContent'
import { Building2, Check } from 'lucide-react'

const TOKEN_KEY = 'barbeza-admin-token'

const FIELDS: { key: keyof BusinessInfo; label: string; placeholder?: string }[] = [
  { key: 'name', label: 'Nome do negócio' },
  { key: 'slogan', label: 'Slogan' },
  { key: 'tagline', label: 'Tagline (linha curta acima do slogan)' },
  { key: 'address', label: 'Endereço curto' },
  { key: 'city', label: 'Cidade' },
  { key: 'fullAddress', label: 'Endereço completo' },
  { key: 'phone', label: 'Telefone (exibição)' },
  { key: 'whatsapp', label: 'WhatsApp (somente números, com DDI, ex: 5531999999999)' },
  { key: 'instagram', label: 'Usuário do Instagram (sem @)' },
  { key: 'instagramUrl', label: 'Link do Instagram' },
  { key: 'inbarberUrl', label: 'Link de agendamento (InBarber)' },
  { key: 'googleMapsUrl', label: 'Link do mapa incorporado (embed)' },
  { key: 'googleMapsLink', label: 'Link do Google Maps (abrir em nova aba)' },
  { key: 'googleReviewUrl', label: 'Link para avaliar no Google' },
]

export function BusinessManager() {
  const { content, setContent } = useContent()
  const [form, setForm] = useState<BusinessInfo>(content.business)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = sessionStorage.getItem(TOKEN_KEY) || ''
    setSaving(true)
    try {
      const result = await saveContent({ business: form }, token)
      setContent(result)
      flash('ok', 'Dados do negócio salvos com sucesso!')
    } catch (err) {
      flash('err', err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <Building2 size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">DADOS DO NEGÓCIO</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">Nome, contatos, endereço e links</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-xl p-6 flex flex-col gap-4">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="font-inter text-xs text-ink-muted mb-1 block">{label}</label>
            <input
              className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
              value={form[key]}
              placeholder={placeholder}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            />
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
            <Check size={14}/> {saving ? 'SALVANDO...' : 'SALVAR DADOS'}
          </button>
        </div>
      </form>
    </div>
  )
}
