import { MapPin, Clock, Phone, Instagram, MessageCircle } from "lucide-react"
import { BUSINESS, HOURS } from "@/data/content"
import type { BusinessHours } from "@/types"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

function loadHours(): BusinessHours {
  try {
    const s = localStorage.getItem('barbeza-hours')
    return s ? (JSON.parse(s) as BusinessHours) : HOURS
  } catch { return HOURS }
}

export function LocationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const hours = loadHours()
  const entries = Object.values(hours)

  return (
    <section id="contato" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Como chegar</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Localização</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(61,90,61,0.12)] border border-natural-border aspect-[4/3]">
            <iframe
              src={BUSINESS.googleMapsUrl}
              className="w-full h-full border-0"
              title="Localização Barbeza"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="card-natural rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-forest"/>
                </div>
                <div>
                  <p className="font-raleway text-ink font-bold text-sm mb-1">Endereço</p>
                  <p className="font-inter text-ink-muted text-sm leading-relaxed">{BUSINESS.fullAddress}</p>
                  <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer"
                    className="font-inter text-xs text-forest hover:underline mt-1 inline-block">Ver no Google Maps →</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-forest"/>
                </div>
                <div className="flex-1">
                  <p className="font-raleway text-ink font-bold text-sm mb-3">Horário de Funcionamento</p>
                  <div className="space-y-1.5">
                    {entries.map(h => (
                      <div key={h.label} className="flex items-center justify-between text-xs">
                        <span className="font-inter text-ink-muted">{h.label}</span>
                        {h.active
                          ? <span className="font-raleway font-bold text-forest">{h.open} – {h.close}</span>
                          : <span className="font-inter text-ink-dim">Fechado</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 border-0 text-white">
                  <MessageCircle size={18} className="mr-2"/> WHATSAPP
                </Button>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${BUSINESS.phone}`}>
                  <Button variant="outline" size="sm" className="w-full"><Phone size={14} className="mr-2"/> Ligar</Button>
                </a>
                <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full"><Instagram size={14} className="mr-2"/> Instagram</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
