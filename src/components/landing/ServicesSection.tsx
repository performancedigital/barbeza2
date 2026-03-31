import { Scissors, Smile, Sparkles, Crown, type LucideProps } from "lucide-react"
import { type ForwardRefExoticComponent, type RefAttributes } from "react"
import { SERVICES, BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
const ICONS: Record<string,LucideIcon> = { Scissors, Smile, Sparkles, Crown }
export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <section id="servicos" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">O que oferecemos</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Nossos Serviços</h2>
          <GoldDivider icon="scissor" className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((sv,i) => {
            const Icon = ICONS[sv.icon] || Scissors
            return (
              <div key={sv.id} className="card-natural rounded-xl p-6 flex flex-col gap-4 relative"
                style={{ opacity:isVisible?1:0, transform:isVisible?"none":"translateY(30px)", transition:`all 0.5s ease ${i*100}ms` }}>
                {sv.featured && <span className="absolute top-4 right-4 bg-forest text-white text-[9px] font-raleway font-bold px-2 py-1 tracking-wider rounded">POPULAR</span>}
                {sv.premium && <span className="absolute top-4 right-4 border border-olive text-olive text-[9px] font-raleway font-bold px-2 py-1 tracking-wider rounded">PREMIUM</span>}
                <div className="w-12 h-12 rounded-full bg-forest/8 border border-forest/15 flex items-center justify-center">
                  <Icon size={20} className="text-forest"/>
                </div>
                <div className="flex-1">
                  <h3 className="font-raleway text-ink font-bold text-base tracking-wide mb-2">{sv.name}</h3>
                  <p className="font-inter text-sm text-ink-muted leading-relaxed">{sv.description}</p>
                </div>
                <div className="flex items-end justify-between border-t border-natural-border pt-4 mt-auto">
                  <span className="font-raleway text-2xl font-black text-forest">R${sv.price}</span>
                  <span className="font-inter text-xs text-ink-dim">{sv.duration}</span>
                </div>
                <Button href={BUSINESS.inbarberUrl} target="_blank" variant="outline" size="sm" className="w-full">AGENDAR</Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}