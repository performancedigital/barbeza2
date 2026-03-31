import { useEffect, useState } from "react"
import { BUSINESS } from "@/data/content"

const LETTERS = "BARBEZA".split("")

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem("barbeza-loaded")
    if (seen) { onDone(); return }
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLetters(i)
      if (i >= LETTERS.length) {
        clearInterval(interval)
        setTimeout(() => setShowLogo(true), 200)
        setTimeout(() => setFading(true), 1800)
        setTimeout(() => { sessionStorage.setItem("barbeza-loaded", "1"); onDone() }, 2400)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`fixed inset-0 z-[9998] bg-dark flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute inset-0 bg-gradient-radial from-brand/10 to-transparent opacity-20" />

      {/* Animated letters */}
      <div className="flex items-end gap-1 md:gap-2 mb-4">
        {LETTERS.map((letter, idx) => (
          <span key={idx} className="font-oswald font-bold text-5xl md:text-8xl transition-all duration-300"
            style={{ color: "#8B8555", opacity: idx < visibleLetters ? 1 : 0, transform: idx < visibleLetters ? "translateY(0)" : "translateY(20px)", textShadow: idx < visibleLetters ? "0 0 40px rgba(139,133,85,0.5)" : "none" }}>
            {letter}
          </span>
        ))}
      </div>

      <p className="font-playfair italic text-cream-muted text-sm md:text-lg tracking-[0.4em] transition-all duration-700" style={{ opacity: visibleLetters >= LETTERS.length ? 1 : 0 }}>
        {BUSINESS.slogan}
      </p>

      {showLogo && (
        <div className="mt-10">
          <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center animate-pulse-brand shadow-[0_0_30px_rgba(139,133,85,0.5)]">
            <img src="/assets/logo/logo.png" alt="Barbeza" className="w-14 h-14 object-contain" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 h-[2px] bg-brand-gradient transition-all duration-1000" style={{ width: `${(visibleLetters / LETTERS.length) * 100}%` }} />
    </div>
  )
}
