import { STATS } from '@/data/content'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function StatsBar() {
  const { ref, isVisible } = useScrollAnimation(0.3)

  return (
    <section id="stats" className="bg-dark-surface border-y border-dark-border">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-1">
              <div
                className="font-oswald font-bold text-3xl md:text-4xl text-brand transition-all duration-500"
                style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${idx * 100}ms` }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={1800}
                  isVisible={isVisible}
                />
              </div>
              <p className="font-inter text-xs text-cream-muted tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

