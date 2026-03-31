import { useState } from "react"
import { ZoomIn, X } from "lucide-react"
import { GALLERY } from "@/data/content"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
type Cat = "todos"|"cortes"|"barbas"|"ambiente"
const FILTERS: {label:string;value:Cat}[] = [{label:"Todos",value:"todos"},{label:"Cortes",value:"cortes"},{label:"Barbas",value:"barbas"},{label:"Ambiente",value:"ambiente"}]
export function GallerySection() {
  const [active, setActive] = useState<Cat>("todos")
  const [lightbox, setLightbox] = useState<string|null>(null)
  const { ref, isVisible } = useScrollAnimation(0.1)
  const filtered = GALLERY.filter(i => active==="todos"||i.category===active)
  return (
    <section id="galeria" className="section-padding bg-natural">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <p className="font-inter text-xs text-forest tracking-[0.35em] uppercase mb-3">Nossos Trabalhos</p>
          <h2 className="font-raleway font-black text-4xl md:text-5xl text-ink mb-4">Galeria</h2>
          <GoldDivider className="max-w-xs mx-auto"/>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <button key={f.value} onClick={() => setActive(f.value)}
              className={`font-raleway text-xs tracking-widest px-5 py-2 rounded border transition-all duration-200 font-bold ${active===f.value?"border-forest bg-forest text-white":"border-natural-border text-ink-muted hover:border-forest hover:text-forest"}`}>
              {f.label.toUpperCase()}
            </button>
          ))}
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((item,i) => (
            <div key={item.id} className="relative aspect-square overflow-hidden bg-natural-alt rounded-xl group"
              style={{ opacity:isVisible?1:0, transition:`opacity 0.5s ease ${i*80}ms` }}
              onClick={() => setLightbox(item.file)}>
              <img src={item.file} alt={item.alt} loading="lazy" decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
              <div className="placeholder-div absolute inset-0 flex items-center justify-center hidden">
                <span className="font-raleway text-ink-dim text-xs font-bold">FOTO {i+1}</span>
              </div>
              <div className="absolute inset-0 bg-forest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-white"/>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-inter text-xs text-ink-dim mt-6">Siga @barbezabarbearia para mais</p>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[500] bg-ink/90 backdrop-blur-lg flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-olive-light transition-colors" onClick={() => setLightbox(null)}><X size={28}/></button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}/>
        </div>
      )}
    </section>
  )
}
