import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { DEFAULT_CONTENT, type SiteContent, type ThemeColors } from '@/data/defaultContent'
import { fetchContent } from '@/lib/api'
import { hexToRgbTriplet } from '@/lib/color'

interface ContentContextValue {
  content: SiteContent
  loading: boolean
  refresh: () => Promise<void>
  setContent: (content: SiteContent) => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

const CSS_VAR_MAP: Record<keyof ThemeColors, string> = {
  forest: '--color-forest',
  forestLight: '--color-forest-light',
  forestDark: '--color-forest-dark',
  forestDeep: '--color-forest-deep',
  olive: '--color-olive',
  oliveLight: '--color-olive-light',
  oliveDark: '--color-olive-dark',
}

function applyTheme(colors: ThemeColors | undefined) {
  if (!colors) return
  const root = document.documentElement
  ;(Object.keys(CSS_VAR_MAP) as (keyof ThemeColors)[]).forEach(key => {
    const value = colors[key]
    if (value) root.style.setProperty(CSS_VAR_MAP[key], hexToRgbTriplet(value))
  })
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await fetchContent()
      setContentState(data)
      applyTheme(data.theme?.colors)
    } catch {
      setContentState(DEFAULT_CONTENT)
      applyTheme(DEFAULT_CONTENT.theme.colors)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const setContent = useCallback((next: SiteContent) => {
    setContentState(next)
    applyTheme(next.theme?.colors)
  }, [])

  return (
    <ContentContext.Provider value={{ content, loading, refresh: load, setContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent deve ser usado dentro de <ContentProvider>')
  return ctx
}
