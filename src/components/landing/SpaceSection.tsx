import { SPACE_ROOMS } from "@/data/content"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
function SpaceCard({ room, index }: { room: typeof SPACE_ROOMS[0]; index:number }) {
  const { ref, isVisible } = useScrollAnimation(0.2)
  const isEven = index % 2 === 0
  return (
    <div ref={ref} className={`flex flex-col md:flex-row ${isEven?"":"md:flex-row-reverse"} overflow-hidden rounded-2xl border border-natural-border shadow-sm group`}
      style={{ opacity:isVisible?1:0, transform:isVisible?"none":`translateX(${isEven?"-30px":"30px"})`, transition:"all 0.7s ease" }}>
      <div className="relative md:w-1/2 aspect-video md:aspect-auto min-h-[260px] overflow-hidden bg-natural-alt">
        <img src={room.image} alt={room.label} loading="lazy" decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e)=>{ (e.target as HTMLImageElement).style.display="none" }}/>
        <div className="absolute inset-0 video-placeholder flex items-center justify-center opacity-80">
          <span className="font-raleway text-white/30 text-xs tracking-widest">FOTO EM BREVE</span>
        </div>
        {room.badge && <span className="absolute top-4 left-4 bg-forest text-white text-[9px] font-raleway font-bold px-3 py-1.5 tracking-widest z-10 rounded">{room.badge}</span>}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
      </div>
      <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center gap-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px w-8 bg-forest"/>
          <span className="font-inter text-xs text-forest tracking-widest uppercase">O Espaco</span>
        </div>
        <h3 className="font-raleway font-black text-2xl md:text-3xl text-ink">{room.label}</h3>
        <p className="font-inter text-ink-muted leading-relaxed">{room.description}</p>
        <div className="w-12 h-px bg-forest/20"/>
        <p className="font-raleway text-xs text-forest/50 tracking-widest font-bold">BARBEZA BARBEARIA</p>
      </div>
    </div>
  )
}
export function SpaceSection() {
  return (
    <section id="espaco" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Novo Projeto Arquitetonico</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Nosso Espaco</h2>
          <GoldDivider className="max-w-xs mx-auto mb-6"/>
          <p className="font-inter text-ink-muted max-w-xl mx-auto leading-relaxed">Um ambiente sofisticado sendo preparado especialmente para voce. Design exclusivo, conforto e experiencia premium.</p>
        </div>
        <div className="flex flex-col gap-8">
          {SPACE_ROOMS.map((r,i) => <SpaceCard key={r.id} room={r} index={i}/>)}
        </div>
      </div>
    </section>
  )
}
