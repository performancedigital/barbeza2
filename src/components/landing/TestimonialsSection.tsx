import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { TESTIMONIALS } from "@/data/content"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  const { ref, isVisible } = useScrollAnimation(0.2)
  const timer = useRef<ReturnType<typeof setInterval>>()
  const next = () => setCur(c => (c+1)%TESTIMONIALS.length)
  const prev = () => setCur(c => (c-1+TESTIMONIALS.length)%TESTIMONIALS.length)
  useEffect(() => { timer.current = setInterval(next, 5000); return () => clearInterval(timer.current) }, [])
  const t = TESTIMONIALS[cur]
  return (
    <section id="depoimentos" className="section-padding bg-forest-deep">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="font-inter text-xs text-olive/80 tracking-[0.35em] uppercase mb-3">O que dizem</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-white mb-4">Avaliações</h2>
          <GoldDivider className="max-w-xs mx-auto" light={true}/>
        </div>
        <div ref={ref} style={{ opacity:isVisible?1:0, transition:"opacity 0.7s ease" }}>
          <div className="glass-card-dark rounded-2xl p-8 md:p-12 text-center relative">
            <div className="absolute top-6 left-8 text-white/5 font-playfair text-9xl leading-none select-none">"</div>
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({length:t.rating}).map((_,i) => <Star key={i} size={16} className="text-olive fill-olive"/>)}
            </div>
            <p className="font-playfair italic text-lg md:text-xl text-white/90 leading-relaxed mb-6 relative z-10">"{t.text}"</p>
            <div className="flex flex-col items-center gap-1">
              <p className="font-raleway text-olive-light text-sm tracking-widest font-bold">{t.name}</p>
              {t.service && <p className="font-inter text-xs text-white/40">{t.service}</p>}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-olive hover:text-olive transition-all duration-200"><ChevronLeft size={18}/></button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_,i) => (
                <button key={i} onClick={() => setCur(i)} className={`rounded-full transition-all duration-300 ${i===cur?"w-6 h-2 bg-olive":"w-2 h-2 bg-white/20"}`}/>
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-olive hover:text-olive transition-all duration-200"><ChevronRight size={18}/></button>
          </div>
        </div>
      </div>
    </section>
  )
}