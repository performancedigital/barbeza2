import { Play } from 'lucide-react'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function VideoSection() {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <section className="section-padding bg-dark-surface">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Conheça o Ambiente</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">O Espaço em Vídeo</h2>
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        {/* Video container */}
        <div
          ref={ref}
          className="relative rounded-xl overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.15)] border border-dark-border transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'scale(0.97)' }}
        >
          <div className="aspect-video">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/assets/images/video-thumb.jpg"
            >
              {/* Coloque o vídeo em: public/assets/videos/ambiente.mp4 */}
              <source src="/assets/videos/ambiente.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>

            {/* Placeholder overlay (shown when no video) */}
            <div
              className="absolute inset-0 video-placeholder flex flex-col items-center justify-center gap-6"
              id="video-placeholder"
            >
              <div className="w-20 h-20 rounded-full border-2 border-brand/40 flex items-center justify-center backdrop-blur-sm">
                <Play size={32} className="text-brand ml-1" />
              </div>
              <div className="text-center">
                <p className="font-oswald text-brand text-sm tracking-widest mb-1">AMBIENTE BARBEZA</p>
                <p className="font-inter text-cream-muted/60 text-xs">Vídeo em breve</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center font-inter text-xs text-cream-muted/40 mt-4">
          Mergulhe na experiência Barbeza
        </p>
      </div>
    </section>
  )
}

