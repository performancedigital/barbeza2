import { useEffect, useRef, useState } from "react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react"

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

      {/* Background: GIF > Video > Imagem estatica */}
      <div className="absolute inset-0">
        {/* GIF do ambiente - substitua hero-bg.gif em public/assets/images/ */}
        <img
          src="/assets/images/hero-bg.gif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          loading="eager"
          onError={(e) => {
            // fallback para jpg se gif nao existir
            const t = e.target as HTMLImageElement
            t.src = "/assets/images/hero-bg.jpg"
          }}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-50" : "opacity-0"}`}
          autoPlay muted loop playsInline preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/assets/videos/ambiente.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/75 via-forest-deep/55 to-forest-deep/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/40 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-olive/60 to-transparent" />

      {/* Conteudo central - SEM duplicar logo (navbar ja exibe) */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

        {/* Logo horizontal branca - unica aparicao no hero */}
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(-10px)" }}
        >
          <img
            src="/assets/logo/logo-horizontal-branca.png"
            alt="Barbeza Barbearia"
            className="h-14 sm:h-18 md:h-22 w-auto object-contain drop-shadow-[0_4px_24px_rgba(139,133,85,0.55)]"
            style={{ maxHeight: "80px" }}
          />
        </div>

        {/* Tagline */}
        <div
          className="mb-6 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)" }}
        >
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-10 bg-olive/50" />
            <span className="font-inter text-[11px] text-olive/80 tracking-[0.4em] uppercase">
              {BUSINESS.tagline}
            </span>
            <div className="h-px w-10 bg-olive/50" />
          </div>
        </div>

        {/* Slogan */}
        <div
          className="mb-10 transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(15px)" }}
        >
          <p className="font-playfair italic text-xl sm:text-2xl text-white/65 tracking-wide">
            {BUSINESS.slogan}
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Button
            href={BUSINESS.inbarberUrl}
            target="_blank"
            size="lg"
            className="bg-olive text-white hover:bg-olive-light border-0 shadow-[0_4px_24px_rgba(139,133,85,0.4)]"
          >
            AGENDAR HORARIO
          </Button>
          <Button
            href="#espaco"
            size="lg"
            variant="outline"
            className="border-white/60 text-white hover:bg-white hover:text-forest"
          >
            CONHECER ESPACO
          </Button>
        </div>

        <div
          className="mt-6 transition-all duration-700 delay-500"
          style={{ opacity: visible ? 0.45 : 0 }}
        >
          <span className="font-inter text-xs text-white/55 tracking-widest">
            Bethania, Ipatinga - MG
          </span>
        </div>
      </div>

      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 hover:text-white/70 transition-colors animate-bounce"
        aria-label="Ver mais"
      >
        <ChevronDown size={26} />
      </a>
    </section>
  )
}