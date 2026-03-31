import { BUSINESS } from "@/data/content"
import { Instagram, MapPin, Phone } from "lucide-react"
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-forest-deep text-white/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col gap-4">
            <img src="/assets/logo/logo-horizontal-branca.png" alt="Barbeza" className="h-10 w-auto object-contain object-left" />
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-xs">Experiencia masculina diferenciada em corte, barba e atendimento premium em Ipatinga-MG.</p>
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/50 hover:text-olive-light transition-colors text-sm">
              <Instagram size={15}/>@barbezabarbearia
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-raleway text-olive-light text-sm tracking-widest uppercase font-bold">Navegacao</h4>
            <ul className="flex flex-col gap-2">
              {[["#servicos","Servicos"],["#espaco","O Espaco"],["#galeria","Galeria"],["#depoimentos","Depoimentos"],["#agendamento","Agendar"],["#contato","Contato"]].map(([href,label])=>(
                <li key={href}><a href={href} className="font-inter text-sm text-white/50 hover:text-olive-light transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-raleway text-olive-light text-sm tracking-widest uppercase font-bold">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href={BUSINESS.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/50 hover:text-olive-light transition-colors text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0"/><span>{BUSINESS.fullAddress}</span>
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 text-white/50 hover:text-olive-light transition-colors text-sm">
                <Phone size={15}/>{BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/30">© {year} Barbeza Barbearia. Todos os direitos reservados.</p>
          <a href="/admin" className="font-inter text-xs text-white/20 hover:text-white/40 transition-colors">Painel Admin</a>
        </div>
      </div>
    </footer>
  )
}
