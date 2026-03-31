import { ChevronUp } from "lucide-react"
import { useScrollY } from "@/hooks/useScrollAnimation"
export function ScrollToTop() {
  const y = useScrollY()
  if (y < 400) return null
  return (
    <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
      className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full border border-forest/30 bg-white shadow-md flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-all duration-300"
      aria-label="Voltar ao topo">
      <ChevronUp size={18}/>
    </button>
  )
}
