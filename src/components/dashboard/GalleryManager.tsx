import { useState, useRef } from 'react'
import { GALLERY } from '@/data/content'
import type { GalleryItem } from '@/types'
import { Trash2, Plus, Upload, X } from 'lucide-react'

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
  const [adding, setAdding] = useState(false)
  const [newAlt, setNewAlt] = useState('')
  const [newCat, setNewCat] = useState<GalleryItem['category']>('cortes')
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const save = (updated: GalleryItem[]) => {
    setItems(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const remove = (id: string) => {
    if (!confirm('Remover esta foto?')) return
    save(items.filter(i => i.id !== id))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo 5MB por imagem.')
      return
    }
    setUploading(true)
    const reader = new FileReader()
    reader.onload = ev => {
      setPreview(ev.target?.result as string)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const add = () => {
    if (!preview) return
    const item: GalleryItem = {
      id: Date.now().toString(),
      file: preview,
      alt: newAlt || 'Barbeza',
      category: newCat,
    }
    save([...items, item])
    setPreview(null)
    setNewAlt('')
    setNewCat('cortes')
    setAdding(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const cancel = () => {
    setAdding(false)
    setPreview(null)
    setNewAlt('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-raleway text-forest text-lg tracking-widest">GALERIA</h2>
        <button
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 bg-forest text-white px-4 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors"
        >
          <Plus size={14} /> Nova Foto
        </button>
      </div>

      {adding && (
        <div className="glass-card rounded-lg p-5 mb-6 flex flex-col gap-4 border border-forest/20">
          <h3 className="font-raleway text-forest text-xs tracking-widest">ADICIONAR FOTO</h3>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-natural-border rounded-lg p-8 text-center cursor-pointer hover:border-forest/50 transition-colors group"
          >
            {preview ? (
              <img src={preview} alt="preview" className="h-32 mx-auto rounded object-cover" />
            ) : (
              <>
                <Upload size={24} className="text-forest/40 mx-auto mb-2 group-hover:text-forest transition-colors" />
                <p className="font-inter text-sm text-ink-muted">Clique para selecionar imagem</p>
                <p className="font-inter text-xs text-ink-muted/60 mt-1">JPG, PNG ou WebP &bull; Máx 5MB</p>
              </>
            )}
            {uploading && <p className="font-inter text-xs text-forest mt-2">Carregando...</p>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

          <input
            className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
            placeholder="Descrição (ex: Corte degrê clássico)"
            value={newAlt}
            onChange={e => setNewAlt(e.target.value)}
          />
          <select
            className="bg-natural border border-natural-border rounded px-3 py-2 text-sm text-ink"
            value={newCat}
            onChange={e => setNewCat(e.target.value as GalleryItem['category'])}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>

          <div className="flex gap-3">
            <button
              onClick={add}
              disabled={!preview}
              className="flex items-center gap-2 bg-forest text-white px-5 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Upload size={14} /> SALVAR FOTO
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-2 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-forest/50 transition-colors"
            >
              <X size={14} /> Cancelar
            </button>
          </div>
        </div>
      )}

      <p className="font-inter text-xs text-ink-muted mb-4">{items.length} foto{items.length !== 1 ? 's' : ''} na galeria</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map(item => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden">
            <img
              src={item.file}
              alt={item.alt}
              className="w-full h-32 object-cover"
              onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x150?text=Sem+foto' }}
            />
            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
              <p className="font-inter text-white text-[10px] text-center leading-tight">{item.alt}</p>
              <span className="text-[9px] bg-forest text-white px-1.5 py-0.5 rounded">{item.category}</span>
              <button
                onClick={() => remove(item.id)}
                className="mt-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="font-inter text-sm text-ink-muted/50">Nenhuma foto ainda. Adicione a primeira!</p>
        </div>
      )}
    </div>
  )
}
