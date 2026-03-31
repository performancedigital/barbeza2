import { useState } from "react"
import { useScrollY, useScrollProgress } from "@/hooks/useScrollAnimation"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Servicos", href: "#servicos" },
  { label: "Espaco", href: "#espaco" },
  { label: "Galeria", href: "#galeria" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
]

export function Navbar() {
  const scrollY = useScrollY()
  const progress = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = scrollY > 60

  return (
    <>
      <div className="fixed top-0 left-0 z-[100] h-[2px] bg-brand-gradient transition-all duration-100" style={{ width: `${progress * 100}%` }} />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-dark/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-brand/60 group-hover:border-brand transition-colors duration-300 bg-brand flex items-center justify-center">
              <img src="/assets/logo/logo.png" alt="Barbeza" className="w-10 h-10 object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="font-oswald text-brand text-base font-bold tracking-[0.25em] leading-none uppercase">BARBEZA</p>
              <p className="font-inter text-cream-muted text-[9px] tracking-[0.2em] uppercase mt-0.5">Barbearia</p>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className="font-inter text-xs text-cream-muted hover:text-brand tracking-wider uppercase transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href={BUSINESS.inbarberUrl} target="_blank" size="sm" variant="gold">AGENDAR</Button>
          </div>

          <button className="md:hidden text-cream p-2" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-dark/98 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand overflow-hidden flex items-center justify-center">
                <img src="/assets/logo/logo.png" alt="Barbeza" className="w-8 h-8 object-contain" />
              </div>
              <p className="font-oswald text-brand text-sm font-bold tracking-[0.25em]">BARBEZA</p>
            </div>
            <button className="text-cream p-2" onClick={() => setMobileOpen(false)}><X size={22} /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="font-oswald text-3xl text-cream hover:text-brand tracking-widest transition-colors duration-200 uppercase">
                {link.label}
              </a>
            ))}
            <div className="mt-6">
              <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg" variant="gold" onClick={() => setMobileOpen(false)}>AGENDAR HORARIO</Button>
            </div>
          </div>
          <div className="pb-10 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-brand/30" />
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-xs text-cream-muted hover:text-brand tracking-wider transition-colors">@barbezabarbearia</a>
            <div className="h-px w-12 bg-brand/30" />
          </div>
        </div>
      )}
    </>
  )
}
