import { useEffect, useRef, useState } from "react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react"

const PARTICLES = Array.from({ length: 18 }, (_,i) => ({
  id: i,
  style: {
    left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
    width:`${2+Math.random()*3}px`, height:`${2+Math.random()*3}px`,
    opacity: 0.1+Math.random()*0.25,
    animation:`float ${5+Math.random()*7}s ease-in-out ${Math.random()*5}s infinite`,
    background: Math.random() > 0.5 ? "rgba(139,133,85,0.6)" : "rgba(78,122,78,0.5)"
  } as React.CSSProperties
}))

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 300)
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-deep">
      {/* BG */}
      <div className="absolute inset-0">
        <img src="/assets/images/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="eager" />
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded?"opacity-50":"opacity-0"}`}
          autoPlay muted loop playsInline preload="metadata" onLoadedData={() => setVideoLoaded(true)}>
          <source src="/assets/videos/ambiente.mp4" type="video/mp4" />
        </video>
        {!videoLoaded && <div className="absolute inset-0">{PARTICLES.map(p => <div key={p.id} className="particle absolute rounded-full" style={p.style}/>)}</div>}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/60 to-forest-deep/95"/>
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 to-transparent"/>
      {/* Left accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-olive to-transparent opacity-70"/>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Logo horizontal branca */}
        <div className="flex justify-center mb-10 transition-all duration-700" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(-10px)" }}>
          <img src="/assets/logo/logo-horizontal-branca.png" alt="Barbeza Barbearia"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_20px_rgba(139,133,85,0.5)]" />
        </div>

        {/* Tagline */}
        <div className="mb-6 transition-all duration-700 delay-100" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(10px)" }}>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-8 bg-olive/60"/>
            <span className="font-inter text-xs text-olive/90 tracking-[0.4em] uppercase">{BUSINESS.tagline}</span>
            <div className="h-px w-8 bg-olive/60"/>
          </div>
        </div>

        {/* Title BARBEZA in Raleway */}
        <div className="mb-2 transition-all duration-700 delay-150" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)" }}>
          <h1 className="font-raleway font-black text-7xl sm:text-9xl leading-none tracking-wider text-forest-shimmer">
            BARBEZA
          </h1>
        </div>
        <div className="mb-10 transition-all duration-700 delay-200" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)" }}>
          <h2 className="font-playfair italic text-xl sm:text-2xl text-white/70 tracking-wide">{BUSINESS.slogan}</h2>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300" style={{ opacity:visible?1:0 }}>
          <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg"
            className="bg-olive text-white hover:bg-olive-light border-0 shadow-[0_4px_24px_rgba(139,133,85,0.4)]">
            AGENDAR HORARIO
          </Button>
          <Button href="#espaco" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-forest">
            CONHECER ESPACO
          </Button>
        </div>

        <div className="mt-6 transition-all duration-700 delay-500" style={{ opacity:visible?0.5:0 }}>
          <span className="font-inter text-xs text-white/60 tracking-widest">📍 Bethania, Ipatinga — MG</span>
        </div>
      </div>

      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors animate-bounce">
        <ChevronDown size={28}/>
      </a>

      {/* Corner deco */}
      <div className="absolute top-24 right-8 hidden lg:block opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect x="0" y="0" width="1" height="60" fill="white"/><rect x="0" y="0" width="60" height="1" fill="white"/></svg>
      </div>
    </section>
  )
}
