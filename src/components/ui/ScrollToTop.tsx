import { ChevronUp } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollAnimation'

export function ScrollToTop() {
  const scrollY = useScrollY()

  if (scrollY < 400) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full border border-brand/40 bg-dark/80 backdrop-blur-sm flex items-center justify-center text-brand hover:bg-brand hover:text-dark transition-all duration-300"
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={18} />
    </button>
  )
}

