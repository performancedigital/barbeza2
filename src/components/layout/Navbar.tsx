import { useState } from "react"
import { useScrollY, useScrollProgress } from "@/hooks/useScrollAnimation"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label:"Servicos", href:"#servicos" },
  { label:"Espaco",   href:"#espaco" },
  { label:"Galeria",  href:"#galeria" },
  { label:"Depoimentos", href:"#depoimentos" },
  { label:"Contato",  href:"#contato" },
]

export function Navbar() {
  const scrollY = useScrollY()
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const scrolled = scrollY > 60
  const isHero = scrollY < 80

  return (
    <>
      {/* progress bar */}
      <div className="fixed top-0 left-0 z-[100] h-[2px] transition-all duration-100" style={{ width:`${progress*100}%`, background:"linear-gradient(90deg,#3D5A3D,#8B8555)" }} />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-natural/96 backdrop-blur-md shadow-[0_2px_20px_rgba(61,90,61,0.1)] border-b border-natural-border"
                 : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            {isHero ? (
              <img src="/assets/logo/logo-horizontal-branca.png" alt="Barbeza" className="h-8 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center overflow-hidden">
                  <img src="/assets/logo/logo.png" alt="Barbeza" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="font-raleway text-forest text-sm font-black tracking-[0.2em] leading-none">BARBEZA</p>
                  <p className="font-inter text-ink-muted text-[9px] tracking-widest uppercase">Barbearia</p>
                </div>
              </div>
            )}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className={`font-inter text-xs tracking-wider uppercase transition-colors duration-200 ${isHero ? "text-white/80 hover:text-white" : "text-ink-muted hover:text-forest"}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href={BUSINESS.inbarberUrl} target="_blank" size="sm" variant={isHero ? "outline" : "primary"}
              className={isHero ? "border-white text-white hover:bg-white hover:text-forest" : ""}>
              AGENDAR
            </Button>
          </div>

          <button className={`md:hidden p-2 ${isHero ? "text-white" : "text-ink"}`} onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-natural/98 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-natural-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center overflow-hidden">
                <img src="/assets/logo/logo.png" alt="" className="w-7 h-7 object-contain" />
              </div>
              <p className="font-raleway text-forest text-sm font-black tracking-widest">BARBEZA</p>
            </div>
            <button className="text-ink p-2" onClick={() => setOpen(false)}><X size={22}/></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="font-raleway text-3xl text-ink font-black hover:text-forest tracking-widest transition-colors uppercase">
                {l.label}
              </a>
            ))}
            <div className="mt-4">
              <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg" onClick={() => setOpen(false)}>AGENDAR HORARIO</Button>
            </div>
          </div>
          <div className="pb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-forest/20" />
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-xs text-ink-muted hover:text-forest tracking-wider">@barbezabarbearia</a>
            <div className="h-px w-10 bg-forest/20" />
          </div>
        </div>
      )}
    </>
  )
}
