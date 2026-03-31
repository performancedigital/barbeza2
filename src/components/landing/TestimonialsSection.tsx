import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/data/content'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, isVisible } = useScrollAnimation(0.2)
  const timer = useRef<ReturnType<typeof setInterval>>()

  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length)
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    timer.current = setInterval(next, 5000)
    return () => clearInterval(timer.current)
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <section id="depoimentos" className="section-padding bg-dark">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">O que dizem</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Depoimentos</h2>
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        {/* Testimonial card */}
        <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div className="glass-card rounded-xl p-8 md:p-12 text-center relative">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-brand/10 font-playfair text-8xl leading-none select-none">
              "
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-brand fill-brand" />
              ))}
            </div>

            {/* Text */}
            <p className="font-playfair italic text-lg md:text-xl text-cream leading-relaxed mb-6 relative z-10">
              "{t.text}"
            </p>

            {/* Name + Service */}
            <div className="flex flex-col items-center gap-1">
              <p className="font-oswald text-brand text-sm tracking-widest font-semibold">{t.name}</p>
              {t.service && (
                <p className="font-inter text-xs text-cream-muted">{t.service}</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-cream-muted hover:border-brand hover:text-brand transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-brand' : 'w-2 h-2 bg-dark-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-cream-muted hover:border-brand hover:text-brand transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

