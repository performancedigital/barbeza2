import { Scissors, Smile, Sparkles, Crown, type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { SERVICES, BUSINESS } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

const ICON_MAP: Record<string, LucideIcon> = {
  Scissors,
  Smile,
  Sparkles,
  Crown,
}

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="servicos" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">O que oferecemos</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Nossos Serviços</h2>
          <GoldDivider icon="scissor" className="max-w-xs mx-auto" />
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Scissors
            return (
              <div
                key={service.id}
                className="relative glass-card rounded-lg p-6 flex flex-col gap-4 hover:border-brand/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] transition-all duration-400 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'none' : 'translateY(30px)',
                  transition: `all 0.5s ease ${idx * 100}ms`,
                }}
              >
                {/* Badge */}
                {service.featured && (
                  <span className="absolute top-4 right-4 bg-brand text-dark text-[9px] font-oswald font-bold px-2 py-1 tracking-wider">
                    MAIS POPULAR
                  </span>
                )}
                {service.premium && (
                  <span className="absolute top-4 right-4 bg-transparent border border-brand text-brand text-[9px] font-oswald font-bold px-2 py-1 tracking-wider">
                    PREMIUM
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-full border border-brand/20 flex items-center justify-center group-hover:border-brand/50 transition-colors duration-300">
                  <Icon size={20} className="text-brand" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-oswald text-cream font-semibold text-base tracking-wide mb-2">
                    {service.name}
                  </h3>
                  <p className="font-inter text-sm text-cream-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price + Duration */}
                <div className="flex items-end justify-between border-t border-dark-border pt-4 mt-auto">
                  <div>
                    <span className="font-oswald text-2xl font-bold text-brand">
                      R${service.price}
                    </span>
                  </div>
                  <span className="font-inter text-xs text-cream-muted">{service.duration}</span>
                </div>

                {/* CTA */}
                <Button
                  href={BUSINESS.inbarberUrl}
                  target="_blank"
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  AGENDAR
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

