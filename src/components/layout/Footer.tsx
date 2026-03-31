import { BUSINESS } from "@/data/content"
import { Instagram, MapPin, Phone } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center overflow-hidden">
                <img src="/assets/logo/logo.png" alt="Barbeza" className="w-11 h-11 object-contain" />
              </div>
              <div>
                <p className="font-oswald text-brand text-base font-bold tracking-[0.25em]">BARBEZA</p>
                <p className="font-inter text-cream-muted text-[9px] tracking-[0.2em] uppercase">Barbearia</p>
              </div>
            </div>
            <p className="font-inter text-sm text-cream-muted leading-relaxed max-w-xs">Experiencia masculina diferenciada em corte, barba e atendimento premium em Ipatinga-MG.</p>
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cream-muted hover:text-brand transition-colors text-sm">
              <Instagram size={16} />@barbezabarbearia
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-oswald text-brand text-sm tracking-widest uppercase font-semibold">Navegacao</h4>
            <ul className="flex flex-col gap-2">
              {["#servicos","#espaco","#galeria","#depoimentos","#agendamento","#contato"].map((href) => {
                const labels: Record<string,string> = {"#servicos":"Servicos","#espaco":"O Espaco","#galeria":"Galeria","#depoimentos":"Depoimentos","#agendamento":"Agendar","#contato":"Contato"}
                return <li key={href}><a href={href} className="font-inter text-sm text-cream-muted hover:text-brand transition-colors">{labels[href]}</a></li>
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-oswald text-brand text-sm tracking-widest uppercase font-semibold">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-cream-muted hover:text-brand transition-colors text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" /><span>{BUSINESS.fullAddress}</span>
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 text-cream-muted hover:text-brand transition-colors text-sm">
                <Phone size={15} />{BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-cream-muted/50">© {year} Barbeza Barbearia. Todos os direitos reservados.</p>
          <a href="/admin" className="font-inter text-xs text-cream-muted/30 hover:text-cream-muted/60 transition-colors">Painel Admin</a>
        </div>
      </div>
    </footer>
  )
}
