import { useEffect, useRef, useState } from "react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react"

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  style: { left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`, opacity: 0.15 + Math.random() * 0.3, animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite` } as React.CSSProperties,
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 video-placeholder">
        <img src="/assets/images/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="eager" decoding="async" />
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-60" : "opacity-0"}`} autoPlay muted loop playsInline preload="metadata" onLoadedData={() => setVideoLoaded(true)}>
          <source src="/assets/videos/ambiente.mp4" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <div className="absolute inset-0">
            {PARTICLES.map(p => <div key={p.id} className="particle absolute rounded-full" style={p.style} />)}
          </div>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent" />

      {/* Decorative brand stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo mark */}
        <div className="flex justify-center mb-8" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
          <div className="w-24 h-24 rounded-full bg-brand shadow-[0_0_60px_rgba(139,133,85,0.4)] flex items-center justify-center border-4 border-brand-light/30">
            <img src="/assets/logo/logo.png" alt="Barbeza" className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "all 0.6s ease 0.1s" }}>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-10 bg-brand opacity-60" />
            <span className="font-inter text-xs text-brand tracking-[0.35em] uppercase">{BUSINESS.tagline}</span>
            <div className="h-px w-10 bg-brand opacity-60" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-2" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
          <h1 className="font-oswald font-bold text-7xl sm:text-9xl text-brand-shimmer leading-none tracking-wider">BARBEZA</h1>
        </div>
        <div className="mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.3s" }}>
          <h2 className="font-playfair italic text-xl sm:text-2xl md:text-3xl text-cream-muted tracking-wide">{BUSINESS.slogan}</h2>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.4s" }}>
          <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg" variant="gold">AGENDAR HORARIO</Button>
          <Button href="#espaco" size="lg" variant="outline">CONHECER ESPACO</Button>
        </div>

        <div className="mt-8" style={{ opacity: visible ? 0.6 : 0, transition: "opacity 0.8s ease 0.6s" }}>
          <span className="font-inter text-xs text-cream-muted tracking-widest">📍 Bethania, Ipatinga — MG</span>
        </div>
      </div>

      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand/60 hover:text-brand transition-colors animate-bounce" aria-label="Rolar para baixo">
        <ChevronDown size={28} />
      </a>

      {/* Corner decorations */}
      <div className="absolute top-20 right-8 hidden lg:block opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="0" y="0" width="1" height="80" fill="#8B8555"/><rect x="0" y="0" width="80" height="1" fill="#8B8555"/></svg>
      </div>
      <div className="absolute bottom-20 left-8 hidden lg:block opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="79" y="0" width="1" height="80" fill="#8B8555"/><rect x="0" y="79" width="80" height="1" fill="#8B8555"/></svg>
      </div>
    </section>
  )
}
