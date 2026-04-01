import { useState, useEffect } from 'react'
import { LayoutDashboard, Scissors, Image, Clock, ShieldCheck, LogOut, ChevronRight, type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { DashboardLogin } from '@/components/dashboard/DashboardLogin'
import { DashboardHome } from '@/components/dashboard/DashboardHome'
import { ServicesManager } from '@/components/dashboard/ServicesManager'
import { GalleryManager } from '@/components/dashboard/GalleryManager'
import { HoursManager } from '@/components/dashboard/HoursManager'
import { SecurityManager } from '@/components/dashboard/SecurityManager'

type Tab = 'home' | 'services' | 'gallery' | 'hours' | 'security'
type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'home',     label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'services', label: 'Serviços',   icon: Scissors },
  { id: 'gallery',  label: 'Galeria',    icon: Image },
  { id: 'hours',    label: 'Horários',   icon: Clock },
  { id: 'security', label: 'Segurança',  icon: ShieldCheck },
]

export function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('home')
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    setAuthed(localStorage.getItem('barbeza-admin-auth') === '1')
  }, [])

  const logout = () => {
    localStorage.removeItem('barbeza-admin-auth')
    setAuthed(false)
  }

  if (!authed) return <DashboardLogin onAuth={() => setAuthed(true)} />

  const content: Record<Tab, React.ReactElement> = {
    home:     <DashboardHome />,
    services: <ServicesManager />,
    gallery:  <GalleryManager />,
    hours:    <HoursManager />,
    security: <SecurityManager />,
  }

  return (
    <div className="min-h-screen bg-natural-alt flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-natural-border shadow-sm">
        <div className="px-6 py-6 border-b border-natural-border">
          <a href="/" className="flex items-center gap-2 group">
            <img src="/assets/logo/logo-hero.png" alt="Barbeza" className="h-8 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
            <div>
              <p className="font-raleway text-forest text-xs font-bold tracking-widest">BARBEZA</p>
              <p className="font-inter text-[9px] text-ink-muted tracking-wider">ADMIN</p>
            </div>
          </a>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-200 ${
                tab === id
                  ? 'bg-forest/10 text-forest border-l-2 border-forest'
                  : 'text-ink-muted hover:text-ink hover:bg-natural'
              }`}
            >
              <Icon size={16} />
              <span className="font-inter">{label}</span>
              {tab === id && <ChevronRight size={12} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6 border-t border-natural-border pt-4">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm text-ink-muted hover:text-forest transition-colors">
            <ChevronRight size={14} className="rotate-180" />
            <span className="font-inter">Ver Site</span>
          </a>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 text-sm text-ink-muted/60 hover:text-red-400 transition-colors w-full">
            <LogOut size={14} />
            <span className="font-inter">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-white border-b border-natural-border px-4 py-3 flex items-center justify-between shadow-sm">
        <p className="font-raleway text-forest text-sm tracking-widest">BARBEZA ADMIN</p>
        <button onClick={() => setMobileNav(n => !n)} className="text-ink-muted font-inter text-xs">
          {TABS.find(t => t.id === tab)?.label} ≡
        </button>
      </div>

      {mobileNav && (
        <div className="md:hidden bg-white border-b border-natural-border px-4 py-2 flex flex-wrap gap-2">
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => { setTab(id); setMobileNav(false) }}
              className={`px-3 py-1.5 text-xs font-raleway tracking-wider border transition-colors rounded ${tab === id ? 'border-forest bg-forest/10 text-forest' : 'border-natural-border text-ink-muted'}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto bg-natural-alt">
        <div className="max-w-4xl">
          {content[tab]}
        </div>
      </main>
    </div>
  )
}
