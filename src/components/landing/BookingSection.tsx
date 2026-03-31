import { useState, useEffect } from 'react'
import { ExternalLink, Calendar } from 'lucide-react'
import { BUSINESS } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function BookingSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="agendamento" className="section-padding" style={{ background: 'linear-gradient(135deg, #0A0705 0%, #1A0F05 50%, #0A0705 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-brand/30 mb-6">
            <Calendar size={28} className="text-brand" />
          </div>
          <p className="font-inter text-xs text-brand tracking-[0.35em] uppercase mb-3">Sem filas, sem espera</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">Agende seu Horário</h2>
          <GoldDivider className="max-w-xs mx-auto mb-6" />
          <p className="font-inter text-cream-muted max-w-lg mx-auto">
            Escolha o melhor horário e garanta o seu atendimento. Rápido, fácil e sem complicação.
          </p>
        </div>

        {/* InBarber iframe (desktop only) */}
        {!isMobile && !iframeError && (
          <div className="mb-8 rounded-xl overflow-hidden border border-dark-border shadow-[0_0_40px_rgba(201,168,76,0.1)]">
            <iframe
              src={BUSINESS.inbarberUrl}
              width="100%"
              height="600"
              style={{ display: 'block', border: 'none' }}
              title="Agendamento Barbeza"
              onError={() => setIframeError(true)}
            />
          </div>
        )}

        {/* Fallback CTA (always visible on mobile, fallback on desktop) */}
        {(isMobile || iframeError) && (
          <div className="glass-card rounded-xl p-10 md:p-14 text-center">
            <p className="font-playfair italic text-xl text-cream-muted mb-8">
              Clique abaixo para agendar diretamente pelo nosso sistema
            </p>
            <Button
              href={BUSINESS.inbarberUrl}
              target="_blank"
              size="lg"
              variant="gold"
              className="animate-pulse-brand"
            >
              <ExternalLink size={16} className="mr-2" />
              AGENDAR AGORA
            </Button>
            <p className="font-inter text-xs text-cream-muted/50 mt-4">
              Você será redirecionado para o sistema de agendamento
            </p>
          </div>
        )}

        {/* Direct CTA always on desktop too */}
        {!isMobile && !iframeError && (
          <div className="text-center mt-6">
            <Button href={BUSINESS.inbarberUrl} target="_blank" variant="outline" size="sm">
              <ExternalLink size={14} className="mr-2" />
              ABRIR EM NOVA ABA
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

