import { BUSINESS } from '@/data/content'
import { ExternalLink, Image, Clock, Users, Scissors, CheckCircle, Circle } from 'lucide-react'

const SETUP_ITEMS = [
  { key: 'logo', label: 'Logo enviada em public/assets/logo/' },
  { key: 'hero', label: 'Foto do hero em public/assets/images/hero-bg.jpg' },
  { key: 'gallery', label: 'Fotos da galeria em public/assets/images/' },
  { key: 'renders', label: 'Renders do espaço em public/assets/renders/' },
  { key: 'video', label: 'Vídeo do ambiente em public/assets/videos/ambiente.mp4' },
  { key: 'phone', label: 'Telefone/WhatsApp atualizado em src/data/content.ts' },
]

export function DashboardHome() {
  const checked = JSON.parse(localStorage.getItem('barbeza-setup') || '{}') as Record<string, boolean>

  const toggle = (key: string) => {
    const updated = { ...checked, [key]: !checked[key] }
    localStorage.setItem('barbeza-setup', JSON.stringify(updated))
    window.location.reload()
  }

  const completedCount = Object.values(checked).filter(Boolean).length

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <p className="font-inter text-xs text-forest tracking-widest uppercase mb-2">Bem-vindo ao</p>
        <h2 className="font-raleway text-ink text-2xl tracking-widest">PAINEL BARBEZA</h2>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Scissors, label: 'Serviços', value: '4' },
          { icon: Image, label: 'Fotos', value: '6' },
          { icon: Clock, label: 'Dias ativos', value: '6' },
          { icon: Users, label: 'Clientes', value: JSON.parse(localStorage.getItem('barbeza-clients') || '[]').length.toString() },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-card rounded-lg p-5 text-center">
            <Icon size={20} className="text-forest mx-auto mb-2" />
            <p className="font-raleway text-forest text-2xl font-bold">{value}</p>
            <p className="font-inter text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div className="glass-card rounded-lg p-5">
        <h3 className="font-raleway text-ink-muted text-xs tracking-widest uppercase mb-4">Acesso Rápido</h3>
        <a
          href={BUSINESS.inbarberUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-forest hover:text-brand-light text-sm font-inter transition-colors"
        >
          <ExternalLink size={14} />
          Abrir sistema de agendamento (InBarber)
        </a>
        <div className="mt-2">
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-brand-light text-sm font-inter transition-colors"
          >
            <ExternalLink size={14} />
            Ver Instagram @barbezabarbearia
          </a>
        </div>
      </div>

      {/* Setup checklist */}
      <div className="glass-card rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-raleway text-ink-muted text-xs tracking-widest uppercase">Checklist de Setup</h3>
          <span className="font-raleway text-forest text-xs">{completedCount}/{SETUP_ITEMS.length}</span>
        </div>
        <div className="flex flex-col gap-3">
          {SETUP_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className="flex items-center gap-3 text-left group"
            >
              {checked[item.key]
                ? <CheckCircle size={16} className="text-forest flex-shrink-0" />
                : <Circle size={16} className="text-cream-muted/40 flex-shrink-0 group-hover:text-forest/50 transition-colors" />
              }
              <span className={`font-inter text-sm ${checked[item.key] ? 'text-cream-muted/50 line-through' : 'text-ink-muted'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


