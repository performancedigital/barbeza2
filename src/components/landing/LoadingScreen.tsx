import { useEffect, useState } from "react"
import { BUSINESS } from "@/data/content"
const LETTERS = "BARBEZA".split("")
export function LoadingScreen({ onDone }: { onDone:()=>void }) {
  const [vis, setVis] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    const seen = sessionStorage.getItem("barbeza-loaded")
    if (seen) { onDone(); return }
    let i = 0
    const t = setInterval(() => {
      i++; setVis(i)
      if (i >= LETTERS.length) {
        clearInterval(t)
        setTimeout(() => setShowLogo(true), 200)
        setTimeout(() => setFading(true), 1800)
        setTimeout(() => { sessionStorage.setItem("barbeza-loaded","1"); onDone() }, 2400)
      }
    }, 120)
    return () => clearInterval(t)
  }, [onDone])
  return (
    <div className={`fixed inset-0 z-[9998] bg-forest-deep flex flex-col items-center justify-center transition-opacity duration-500 ${fading?"opacity-0":"opacity-100"}`}>
      <div className="flex items-end gap-1 md:gap-2 mb-4">
        {LETTERS.map((l,i) => (
          <span key={i} className="font-raleway font-black text-5xl md:text-8xl transition-all duration-300"
            style={{ color:"#F5F5F0", opacity:i<vis?1:0, transform:i<vis?"translateY(0)":"translateY(20px)", textShadow:i<vis?"0 0 40px rgba(139,133,85,0.6)":"none" }}>
            {l}
          </span>
        ))}
      </div>
      <p className="font-playfair italic text-white/50 text-sm md:text-lg tracking-[0.4em] transition-all duration-700" style={{ opacity:vis>=LETTERS.length?1:0 }}>
        {BUSINESS.slogan}
      </p>
      {showLogo && (
        <div className="mt-8">
          <img src="/assets/logo/logo-horizontal-branca.png" alt="Barbeza" className="h-10 w-auto object-contain opacity-0 animate-fade-in" style={{ animationFillMode:"forwards" }} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-forest to-olive transition-all duration-1000" style={{ width:`${(vis/LETTERS.length)*100}%` }} />
    </div>
  )
}
