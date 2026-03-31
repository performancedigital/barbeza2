import { useState } from "react"
import { SPACE_ROOMS, BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function SpaceSection() {
  const [active, setActive] = useState(0)
  const { ref, isVisible } = useScrollAnimation(0.1)
  const room = SPACE_ROOMS[active]
  return (
    <section id="espaco" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Nosso Espaço</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">O Ambiente</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_40px_rgba(61,90,61,0.12)]">
            <img src={room.image} alt={room.label}
              className="w-full h-full object-cover transition-all duration-700"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity="0" }}/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-forest" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <p className="font-raleway text-ink font-bold text-sm tracking-widest">{room.label}</p>
                <p className="font-inter text-ink-dim text-xs mt-1">Imagem em breve</p>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-forest text-white text-[9px] font-raleway font-bold px-3 py-1 tracking-widest rounded">{room.badge}</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-3 flex-wrap">
              {SPACE_ROOMS.map((r,i) => (
                <button key={r.id} onClick={() => setActive(i)}
                  className={`font-inter text-xs tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                    i === active
                      ? "bg-forest text-white border-forest"
                      : "border-natural-border text-ink-muted hover:border-forest hover:text-forest"
                  }`}>{r.label}</button>
              ))}
            </div>
            <div>
              <h3 className="font-raleway text-3xl font-black text-ink mb-4">{room.label}</h3>
              <p className="font-inter text-ink-muted leading-relaxed">{room.description}</p>
            </div>
            <div className="pt-2">
              <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg">AGENDAR VISITA</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}