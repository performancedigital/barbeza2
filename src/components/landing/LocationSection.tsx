import { MapPin, Clock, Instagram, Phone } from 'lucide-react'
import { BUSINESS, HOURS } from '@/data/content'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function LocationSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="contato" className="section-padding bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Nos encontre</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Localização & Contato</h2>
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-dark-border h-80 lg:h-full min-h-[320px]">
            <iframe
              src={BUSINESS.googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Barbeza Barbearia"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-brand" />
              </div>
              <div>
                <h4 className="font-oswald text-cream text-sm tracking-wide mb-1">Endereço</h4>
                <p className="font-inter text-cream-muted text-sm leading-relaxed">{BUSINESS.fullAddress}</p>
                <a
                  href={BUSINESS.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-xs text-brand hover:text-brand-light transition-colors mt-1 inline-block"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-brand/20 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-brand" />
              </div>
              <div>
                <h4 className="font-oswald text-cream text-sm tracking-wide mb-1">Contato</h4>
                <a href={`tel:${BUSINESS.phone}`} className="font-inter text-cream-muted text-sm hover:text-brand transition-colors">
                  {BUSINESS.phone}
                </a>
                <br />
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-xs text-brand hover:text-brand-light transition-colors"
                >
                  WhatsApp →
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={18} className="text-brand" />
              </div>
              <div className="flex-1">
                <h4 className="font-oswald text-cream text-sm tracking-wide mb-2">Horários</h4>
                <div className="grid grid-cols-1 gap-1">
                  {Object.values(HOURS).map(day => (
                    <div key={day.label} className="flex justify-between items-center text-sm">
                      <span className="font-inter text-cream-muted">{day.label}</span>
                      {day.active ? (
                        <span className="font-inter text-brand text-xs">{day.open} – {day.close}</span>
                      ) : (
                        <span className="font-inter text-cream-muted/40 text-xs">Fechado</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instagram */}
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 group"
            >
              <div className="w-10 h-10 rounded-full border border-brand/20 flex items-center justify-center flex-shrink-0 group-hover:border-brand/50 transition-colors">
                <Instagram size={18} className="text-brand" />
              </div>
              <div>
                <h4 className="font-oswald text-cream text-sm tracking-wide mb-1">Instagram</h4>
                <p className="font-inter text-cream-muted text-sm group-hover:text-brand transition-colors">
                  @barbezabarbearia
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

