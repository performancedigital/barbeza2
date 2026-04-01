import { BUSINESS, SERVICES } from '@/data/content'
import { ExternalLink, Image, Clock, Scissors, TrendingUp } from 'lucide-react'

export function DashboardHome() {
  const galleryCount = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-gallery') || '[]').length } catch { return 6 }
  })()
  const servicesCount = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-services') || '[]').length } catch { return SERVICES.length }
  })()
  const hoursData = (() => {
    try { return JSON.parse(localStorage.getItem('barbeza-hours') || '{}') } catch { return {} }
  })()
  const activeDays = Object.values(hoursData as Record<string, {active: boolean}>).filter(h => h.active).length || 6

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-inter text-xs text-forest tracking-widest uppercase mb-2">Bem-vindo ao</p>
        <h2 className="font-raleway text-ink text-2xl tracking-widest">PAINEL BARBEZA</h2>
        <p className="font-inter text-sm text-ink-muted mt-1">Gerencie serviços, galeria e horários diretamente aqui.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Scissors,    label: 'Serviços',     value: String(servicesCount) },
          { icon: Image,       label: 'Fotos',         value: String(galleryCount)  },
          { icon: Clock,       label: 'Dias ativos',   value: String(activeDays)    },
          { icon: TrendingUp,  label: 'Plataforma',    value: 'InBarber'            },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-card rounded-lg p-5 text-center">
            <Icon size={20} className="text-forest mx-auto mb-2" />
            <p className="font-raleway text-forest text-xl font-bold">{value}</p>
            <p className="font-inter text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div className="glass-card rounded-lg p-5">
        <h3 className="font-raleway text-ink-muted text-xs tracking-widest uppercase mb-4">Acesso Rápido</h3>
        <div className="flex flex-col gap-3">
          <a href={BUSINESS.inbarberUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Abrir sistema de agendamento (InBarber)
          </a>
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Ver Instagram @barbezabarbearia
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-inter transition-colors group">
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
            Ver o site ao vivo
          </a>
        </div>
      </div>

      {/* Info box */}
      <div className="glass-card rounded-lg p-5 border border-forest/10">
        <p className="font-inter text-xs text-ink-muted leading-relaxed">
          <strong className="text-forest font-raleway tracking-wider">COMO FUNCIONA:</strong><br/>
          Alterações em <strong>Serviços</strong> e <strong>Horários</strong> são salvas e refletem no site automáticamente.<br/>
          Fotos adicionadas na <strong>Galeria</strong> aparecem na página após um reload do visitante.
        </p>
      </div>
    </div>
  )
}
