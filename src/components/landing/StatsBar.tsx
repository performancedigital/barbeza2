import { STATS } from "@/data/content"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function StatsBar() {
  const { ref, isVisible } = useScrollAnimation(0.3)
  return (
    <section id="stats" className="bg-forest border-y border-forest-light/20">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s,i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <div className="font-raleway font-black text-3xl md:text-4xl text-white transition-all duration-500" style={{ opacity:isVisible?1:0, transitionDelay:`${i*100}ms` }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} duration={1800} isVisible={isVisible}/>
              </div>
              <p className="font-inter text-xs text-white/60 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
