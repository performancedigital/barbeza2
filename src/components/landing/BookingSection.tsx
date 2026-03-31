import { useState, useEffect } from "react"
import { ExternalLink, Calendar } from "lucide-react"
import { BUSINESS } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
export function BookingSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize",h); return () => window.removeEventListener("resize",h)
  },[])
  return (
    <section id="agendamento" className="section-padding bg-natural-alt">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-forest/20 bg-white mb-6">
            <Calendar size={26} className="text-forest"/>
          </div>
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Sem filas, sem espera</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Agende seu Horario</h2>
          <GoldDivider className="max-w-xs mx-auto mb-6"/>
          <p className="font-inter text-ink-muted max-w-lg mx-auto">Escolha o melhor horario e garanta o seu atendimento. Rapido, facil e sem complicacao.</p>
        </div>
        {!isMobile && !iframeError && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-natural-border shadow-[0_4px_40px_rgba(61,90,61,0.1)]">
            <iframe src={BUSINESS.inbarberUrl} width="100%" height="600" style={{ display:"block",border:"none" }} title="Agendamento Barbeza" onError={() => setIframeError(true)}/>
          </div>
        )}
        {(isMobile||iframeError) && (
          <div className="bg-white rounded-2xl p-10 md:p-14 text-center border border-natural-border shadow-sm">
            <p className="font-playfair italic text-xl text-ink-muted mb-8">Clique abaixo para agendar pelo nosso sistema</p>
            <Button href={BUSINESS.inbarberUrl} target="_blank" size="lg">
              <ExternalLink size={16} className="mr-2"/>AGENDAR AGORA
            </Button>
            <p className="font-inter text-xs text-ink-dim mt-4">Voce sera redirecionado para o sistema de agendamento</p>
          </div>
        )}
        {!isMobile && !iframeError && (
          <div className="text-center mt-4">
            <Button href={BUSINESS.inbarberUrl} target="_blank" variant="outline" size="sm">
              <ExternalLink size={14} className="mr-2"/>ABRIR EM NOVA ABA
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
