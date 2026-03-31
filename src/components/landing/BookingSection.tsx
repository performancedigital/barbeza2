import { useState } from "react"
import { Phone, MessageCircle, Calendar } from "lucide-react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function BookingSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  return (
    <section id="agendamento" className="section-padding bg-natural-alt">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Reserve seu horário</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Agendamento</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="flex flex-col gap-6">
            <div className="card-natural rounded-2xl p-7">
              <h3 className="font-raleway text-ink font-black text-xl mb-5 tracking-wide">Reserve seu Horário</h3>
              <div className="space-y-4">
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-natural-border hover:border-forest hover:bg-forest/5 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MessageCircle size={18} className="text-green-600"/>
                  </div>
                  <div>
                    <p className="font-raleway text-sm font-bold text-ink">WhatsApp</p>
                    <p className="font-inter text-xs text-ink-muted">{BUSINESS.phone}</p>
                  </div>
                </a>
                <a href={BUSINESS.inbarberUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-natural-border hover:border-forest hover:bg-forest/5 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-full bg-forest/8 border border-forest/20 flex items-center justify-center group-hover:bg-forest/15 transition-colors">
                    <Calendar size={18} className="text-forest"/>
                  </div>
                  <div>
                    <p className="font-raleway text-sm font-bold text-ink">InBarber App</p>
                    <p className="font-inter text-xs text-ink-muted">Agendamento online</p>
                  </div>
                </a>
                <a href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-natural-border hover:border-forest hover:bg-forest/5 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-full bg-forest/8 border border-forest/20 flex items-center justify-center group-hover:bg-forest/15 transition-colors">
                    <Phone size={18} className="text-forest"/>
                  </div>
                  <div>
                    <p className="font-raleway text-sm font-bold text-ink">Ligar</p>
                    <p className="font-inter text-xs text-ink-muted">{BUSINESS.phone}</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg" className="w-full">ABRIR AGENDA ONLINE</Button>
            </div>
          </div>
          <div className="card-natural rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(61,90,61,0.08)]">
            <div className="bg-forest px-5 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20"/>
                <div className="w-3 h-3 rounded-full bg-white/20"/>
                <div className="w-3 h-3 rounded-full bg-white/20"/>
              </div>
              <p className="font-inter text-white/70 text-xs ml-2">Agenda Barbeza — InBarber</p>
            </div>
            <div className="relative" style={{ height: "520px" }}>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-natural gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-forest/20 border-t-forest animate-spin"/>
                  <p className="font-inter text-ink-muted text-sm">Carregando agenda...</p>
                </div>
              )}
              <iframe
                src={BUSINESS.inbarberUrl}
                className="w-full h-full border-0"
                title="Agendamento InBarber"
                onLoad={() => setIframeLoaded(true)}
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            </div>
            <div className="px-5 py-3 bg-natural border-t border-natural-border md:hidden">
              <Button href={BUSINESS.inbarberUrl} target="_blank" size="sm" className="w-full">ABRIR NO APP</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}