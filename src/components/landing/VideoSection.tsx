import { Play } from "lucide-react"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
export function VideoSection() {
  const { ref, isVisible } = useScrollAnimation(0.2)
  return (
    <section className="section-padding bg-natural-alt">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Conheca o Ambiente</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">O Espaco em Video</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div ref={ref} className="relative rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(61,90,61,0.15)] border border-natural-border transition-all duration-700"
          style={{ opacity:isVisible?1:0, transform:isVisible?"none":"scale(0.97)" }}>
          <div className="aspect-video">
            <video className="w-full h-full object-cover" controls preload="metadata" poster="/assets/images/video-thumb.jpg">
              <source src="/assets/videos/ambiente.mp4" type="video/mp4"/>
            </video>
            <div className="absolute inset-0 video-placeholder flex flex-col items-center justify-center gap-6" id="vph">
              <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <Play size={32} className="text-white ml-1"/>
              </div>
              <div className="text-center">
                <p className="font-raleway text-white font-bold text-sm tracking-widest mb-1">AMBIENTE BARBEZA</p>
                <p className="font-inter text-white/40 text-xs">Video em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
