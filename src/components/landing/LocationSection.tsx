import { MapPin, Clock, Instagram, Phone } from "lucide-react"
import { BUSINESS, HOURS } from "@/data/content"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function LocationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <section id="contato" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Nos encontre</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Localizacao & Contato</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="rounded-2xl overflow-hidden border border-natural-border h-80 lg:h-full min-h-[320px] shadow-sm">
            <iframe src={BUSINESS.googleMapsUrl} width="100%" height="100%" style={{ border:0,display:"block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localizacao Barbeza"/>
          </div>
          <div className="flex flex-col gap-8">
            {[
              { icon: MapPin, title:"Endereco", content: <>{BUSINESS.fullAddress}<br/><a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer" className="font-inter text-xs text-forest hover:text-forest-light mt-1 inline-block">Ver no Google Maps →</a></> },
              { icon: Phone,  title:"Contato", content: <><a href={`tel:${BUSINESS.phone}`} className="font-inter text-ink-muted hover:text-forest transition-colors">{BUSINESS.phone}</a><br/><a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-inter text-xs text-forest hover:text-forest-light">WhatsApp →</a></> },
              { icon: Instagram, title:"Instagram", content: <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-ink-muted hover:text-forest transition-colors">@barbezabarbearia</a> },
            ].map(({ icon:Icon, title, content }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-forest/15 bg-forest/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-forest"/>
                </div>
                <div>
                  <h4 className="font-raleway text-ink text-sm tracking-wide font-bold mb-1">{title}</h4>
                  <div className="font-inter text-ink-muted text-sm leading-relaxed">{content}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-forest/15 bg-forest/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={18} className="text-forest"/>
              </div>
              <div className="flex-1">
                <h4 className="font-raleway text-ink text-sm tracking-wide font-bold mb-2">Horarios</h4>
                <div className="flex flex-col gap-1">
                  {Object.values(HOURS).map(d => (
                    <div key={d.label} className="flex justify-between text-sm">
                      <span className="font-inter text-ink-muted">{d.label}</span>
                      {d.active ? <span className="font-inter text-forest text-xs">{d.open} – {d.close}</span> : <span className="font-inter text-ink-dim text-xs">Fechado</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
