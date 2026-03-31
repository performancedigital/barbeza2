import { useState } from 'react'
import { ZoomIn, X } from 'lucide-react'
import { GALLERY } from '@/data/content'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type Category = 'todos' | 'cortes' | 'barbas' | 'ambiente'

const FILTERS: { label: string; value: Category }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Cortes', value: 'cortes' },
  { label: 'Barbas', value: 'barbas' },
  { label: 'Ambiente', value: 'ambiente' },
]

export function GallerySection() {
  const [active, setActive] = useState<Category>('todos')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const { ref, isVisible } = useScrollAnimation(0.1)

  const filtered = GALLERY.filter(item => active === 'todos' || item.category === active)

  return (
    <section id="galeria" className="section-padding bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Nossos Trabalhos</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Galeria</h2>
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`font-oswald text-xs tracking-widest px-5 py-2 border transition-all duration-200 ${
                active === f.value
                  ? 'border-brand bg-brand text-dark'
                  : 'border-dark-border text-cream-muted hover:border-brand/50 hover:text-brand'
              }`}
            >
              {f.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden bg-dark-card group rounded-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.5s ease ${idx * 80}ms`,
              }}
              onClick={() => setLightbox(item.file)}
            >
              <img
                src={item.file}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.parentElement!.querySelector('.placeholder-div')!.classList.remove('hidden')
                  t.style.display = 'none'
                }}
              />
              {/* Placeholder */}
              <div className="placeholder-div absolute inset-0 video-placeholder flex items-center justify-center hidden">
                <span className="font-oswald text-brand/30 text-xs">FOTO {idx + 1}</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-brand" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-inter text-xs text-cream-muted/40 mt-6 tracking-wider">
          Siga @barbezabarbearia para mais
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[500] bg-dark/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream hover:text-brand transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

