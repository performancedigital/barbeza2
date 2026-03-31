import { useState } from 'react'
import { GALLERY } from '@/data/content'
import type { GalleryItem } from '@/types'
import { Trash2, Plus } from 'lucide-react'

const STORAGE_KEY = 'barbeza-gallery'

function loadGallery(): GalleryItem[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : GALLERY
  } catch { return GALLERY }
}

const CATEGORIES = ['cortes', 'barbas', 'ambiente'] as const

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>(loadGallery)
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({ category: 'cortes' })
  const [adding, setAdding] = useState(false)

  const save = (updated: GalleryItem[]) => {
    setItems(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const remove = (id: string) => save(items.filter(i => i.id !== id))

  const add = () => {
    if (!newItem.file || !newItem.alt) return
    const item: GalleryItem = {
      id: Date.now().toString(),
      file: newItem.file!,
      alt: newItem.alt!,
      category: (newItem.category as GalleryItem['category']) || 'cortes',
    }
    save([...items, item])
    setNewItem({ category: 'cortes' })
    setAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-raleway text-forest text-lg tracking-widest">GALERIA</h2>
        <button
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 bg-forest text-dark px-4 py-2 text-xs font-raleway tracking-wider hover:bg-forest-light transition-colors"
        >
          <Plus size={14} /> Nova Foto
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="glass-card rounded-lg p-5 mb-5 flex flex-col gap-3">
          <input
            className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
            placeholder="Nome do arquivo (ex: gallery-07.jpg)"
            value={newItem.file || ''}
            onChange={e => setNewItem(n => ({ ...n, file: `/assets/images/${e.target.value}` }))}
          />
          <input
            className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
            placeholder="Descrição (alt text)"
            value={newItem.alt || ''}
            onChange={e => setNewItem(n => ({ ...n, alt: e.target.value }))}
          />
          <select
            className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
            value={newItem.category}
            onChange={e => setNewItem(n => ({ ...n, category: e.target.value as GalleryItem['category'] }))}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={add} className="bg-forest text-dark px-4 py-2 text-xs font-raleway tracking-wider w-fit">
            ADICIONAR
          </button>
        </div>
      )}

      {/* Items table */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-4 px-2 text-[10px] font-raleway text-forest/60 tracking-widest uppercase">
          <span>Arquivo</span><span>Descrição</span><span>Categoria</span>
        </div>
        {items.map(item => (
          <div key={item.id} className="glass-card rounded px-4 py-3 grid grid-cols-3 gap-4 items-center text-sm">
            <span className="font-inter text-ink-muted truncate">{item.file.split('/').pop()}</span>
            <span className="font-inter text-ink-muted truncate">{item.alt}</span>
            <div className="flex items-center justify-between">
              <span className="font-inter text-xs text-forest">{item.category}</span>
              <button onClick={() => remove(item.id)} className="text-cream-muted/40 hover:text-red-400 transition-colors ml-2">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="font-inter text-xs text-cream-muted/40 mt-4">
        Coloque as fotos em <code className="text-forest/60">public/assets/images/</code>
      </p>
    </div>
  )
}


