import { useState } from 'react'
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react'

const DEFAULT_PASSWORD = 'barbeza@2025'
const PWD_KEY = 'barbeza-pwd'

function getCurrentPassword() {
  return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD
}

interface Props {
  onAuth: () => void
}

export function DashboardLogin({ onAuth }: Props) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === getCurrentPassword()) {
      localStorage.setItem('barbeza-admin-auth', '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleReset = () => {
    localStorage.removeItem(PWD_KEY)
    setResetDone(true)
    setInput('')
    setTimeout(() => setResetDone(false), 4000)
  }

  return (
    <div className="min-h-screen bg-natural-alt flex items-center justify-center px-4">
      <div className="glass-card rounded-xl p-10 w-full max-w-sm text-center shadow-lg">
        <div className="w-14 h-14 rounded-full border border-forest/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={22} className="text-forest" />
        </div>
        <h1 className="font-raleway text-forest text-lg tracking-widest mb-1">BARBEZA</h1>
        <p className="font-inter text-xs text-ink-muted mb-8 tracking-wider">PAINEL ADMINISTRATIVO</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Senha"
              autoFocus
              className={`w-full bg-natural border rounded px-4 py-3 pr-11 font-inter text-sm text-ink placeholder-ink-muted/40 outline-none focus:border-forest transition-colors ${
                error ? 'border-red-500' : 'border-natural-border'
              }`}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="font-inter text-xs text-red-400">Senha incorreta. Tente novamente.</p>}
          {resetDone && (
            <p className="font-inter text-xs text-forest bg-forest/10 rounded px-3 py-2">
              Senha redefinida. Use: <strong>barbeza@2025</strong>
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-forest text-white font-raleway text-xs tracking-widest py-3 rounded hover:bg-forest-light transition-colors"
          >
            ENTRAR
          </button>
        </form>

        <button
          onClick={handleReset}
          className="mt-5 flex items-center gap-1.5 text-ink-muted/50 hover:text-forest text-[11px] font-inter mx-auto transition-colors"
        >
          <KeyRound size={12} /> Esqueceu a senha? Redefinir para o padrão
        </button>

        <p className="font-inter text-[10px] text-ink-muted/30 mt-4">
          Barbeza &copy; {new Date().getFullYear()} &mdash; Acesso restrito
        </p>
      </div>
    </div>
  )
}
