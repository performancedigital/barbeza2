import { useState } from 'react'
import { Lock } from 'lucide-react'

const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'barbeza2025'

interface Props {
  onAuth: () => void
}

export function DashboardLogin({ onAuth }: Props) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      localStorage.setItem('barbeza-admin-auth', '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="glass-card rounded-xl p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full border border-brand/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={22} className="text-brand" />
        </div>
        <h1 className="font-oswald text-brand text-lg tracking-widest mb-1">BARBEZA</h1>
        <p className="font-inter text-xs text-cream-muted mb-8 tracking-wider">PAINEL ADMINISTRATIVO</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Senha"
            autoFocus
            className={`w-full bg-dark-card border rounded px-4 py-3 font-inter text-sm text-cream placeholder-cream-muted/40 outline-none focus:border-brand transition-colors ${
              error ? 'border-red-500' : 'border-dark-border'
            }`}
          />
          {error && <p className="font-inter text-xs text-red-400">Senha incorreta</p>}
          <button
            type="submit"
            className="w-full bg-brand text-dark font-oswald text-xs tracking-widest py-3 hover:bg-brand-light transition-colors"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  )
}

