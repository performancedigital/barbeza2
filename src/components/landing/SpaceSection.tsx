import { SPACE_ROOMS } from '@/data/content'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

function SpaceCard({ room, index }: { room: typeof SPACE_ROOMS[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.2)
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} gap-0 overflow-hidden rounded-xl border border-dark-border group`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : `translateX(${isEven ? '-30px' : '30px'})`,
        transition: 'all 0.7s ease',
      }}
    >
      {/* Image */}
      <div className="relative md:w-1/2 aspect-video md:aspect-auto min-h-[260px] overflow-hidden bg-dark-card">
        <img
          src={room.image}
          alt={room.label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
          }}
        />
        {/* Placeholder when no image */}
        <div className="absolute inset-0 video-placeholder flex items-center justify-center">
          <span className="font-oswald text-brand/30 text-xs tracking-widest">FOTO EM BREVE</span>
        </div>
        {/* Badge */}
        {room.badge && (
          <span className="absolute top-4 left-4 bg-brand text-dark text-[9px] font-oswald font-bold px-3 py-1.5 tracking-widest z-10">
            {room.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="md:w-1/2 bg-dark-surface p-8 md:p-12 flex flex-col justify-center gap-5">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand" />
            <span className="font-inter text-xs text-brand tracking-widest uppercase">O Espaço</span>
          </div>
          <h3 className="font-playfair text-2xl md:text-3xl text-cream mb-4">{room.label}</h3>
          <p className="font-inter text-cream-muted leading-relaxed">{room.description}</p>
        </div>
        <div className="w-12 h-px bg-brand/30" />
        <p className="font-oswald text-xs text-brand/60 tracking-widest">BARBEZA BARBEARIA</p>
      </div>
    </div>
  )
}

export function SpaceSection() {
  return (
    <section id="espaco" className="section-padding bg-dark">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Novo Projeto Arquitetônico</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Nosso Espaço</h2>
          <GoldDivider className="max-w-xs mx-auto mb-6" />
          <p className="font-inter text-cream-muted max-w-xl mx-auto leading-relaxed">
            Um ambiente sofisticado sendo preparado especialmente para você. Design exclusivo, conforto e experiência premium.
          </p>
        </div>

        {/* Rooms */}
        <div className="flex flex-col gap-8">
          {SPACE_ROOMS.map((room, index) => (
            <SpaceCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

