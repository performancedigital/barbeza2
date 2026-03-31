import { Phone, MessageCircle, Calendar, ExternalLink } from "lucide-react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function BookingSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <section id="agendamento" className="section-padding bg-natural-alt">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Reserve seu horário</p>
          <h2 className="font-raleway font-bold text-4xl md:text-5xl text-ink mb-4 tracking-wider">Agendamento</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="max-w-2xl mx-auto"
          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>

          {/* Botao principal InBarber */}
          <a href={BUSINESS.inbarberUrl} target="_blank" rel="noopener noreferrer"
            className="group flex items-center justify-between w-full bg-forest hover:bg-forest/80 text-white px-8 py-6 rounded-2xl mb-4 transition-all duration-300 shadow-[0_4px_30px_rgba(139,133,85,0.3)] hover:shadow-[0_6px_40px_rgba(139,133,85,0.5)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                <Calendar size={22} className="text-white"/>
              </div>
              <div className="text-left">
                <p className="font-raleway text-lg font-bold tracking-widest">AGENDAR ONLINE</p>
                <p className="font-inter text-xs text-white/70">via InBarber App — rápido e fácil</p>
              </div>
            </div>
            <ExternalLink size={20} className="text-white/60 group-hover:text-white transition-colors"/>
          </a>

          {/* Outros canais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-natural-border hover:border-forest bg-white hover:bg-natural transition-all duration-200 group">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-600"/>
              </div>
              <div>
                <p className="font-raleway text-ink font-bold text-sm tracking-widest">WHATSAPP</p>
                <p className="font-inter text-xs text-ink-muted">{BUSINESS.phone}</p>
              </div>
            </a>
            <a href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-natural-border hover:border-forest bg-white hover:bg-natural transition-all duration-200 group">
              <div className="w-10 h-10 rounded-full bg-brand/10 border border-forest/20 flex items-center justify-center">
                <Phone size={18} className="text-forest"/>
              </div>
              <div>
                <p className="font-raleway text-ink font-bold text-sm tracking-widest">LIGAR</p>
                <p className="font-inter text-xs text-ink-muted">{BUSINESS.phone}</p>
              </div>
            </a>
          </div>

          {/* Info horário rápido */}
          <div className="text-center p-6 rounded-xl border border-natural-border bg-white">
            <p className="font-inter text-xs text-forest tracking-widest uppercase mb-3">Horários de Atendimento</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              <span className="font-inter text-sm text-ink-muted">Seg – Sex: <span className="text-ink font-medium">09h – 19h</span></span>
              <span className="font-inter text-sm text-ink-muted">Sexta: <span className="text-ink font-medium">09h – 20h</span></span>
              <span className="font-inter text-sm text-ink-muted">Sábado: <span className="text-ink font-medium">08h – 18h</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}