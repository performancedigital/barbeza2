import { STATS } from "@/data/content"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function StatsBar() {
  const { ref, isVisible } = useScrollAnimation(0.3)
  return (
    <section id="stats" className="bg-forest-deep border-y border-forest/20">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, idx) => {
            const inner = (
              <div className="flex flex-col items-center text-center gap-1">
                <div className="font-raleway font-bold text-3xl md:text-4xl text-olive transition-all duration-500"
                  style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${idx * 100}ms` }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1800} isVisible={isVisible} />
                </div>
                <p className="font-inter text-xs text-white/60 tracking-wider uppercase">
                  {stat.label}
                </p>
                {stat.link && <p className="font-inter text-[9px] text-olive/60 tracking-widest mt-0.5">AVALIAR ↗</p>}
              </div>
            )
            return stat.link ? (
              <a key={idx} href={stat.link} target="_blank" rel="noopener noreferrer"
                className="group hover:scale-105 transition-transform duration-200 cursor-pointer">
                {inner}
              </a>
            ) : (
              <div key={idx}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}