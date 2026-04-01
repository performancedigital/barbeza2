import { useState } from 'react'
import { Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react'

const DEFAULT_PASSWORD = 'barbeza@2025'
const PWD_KEY = 'barbeza-pwd'

function getCurrentPassword() {
  return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD
}

export function SecurityManager() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const hasCustomPwd = !!localStorage.getItem(PWD_KEY)

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (current !== getCurrentPassword()) {
      flash('err', 'Senha atual incorreta.')
      return
    }
    if (next.length < 6) {
      flash('err', 'Nova senha deve ter no mínimo 6 caracteres.')
      return
    }
    if (next !== confirm) {
      flash('err', 'As senhas não coincidem.')
      return
    }
    localStorage.setItem(PWD_KEY, next)
    flash('ok', 'Senha alterada com sucesso!')
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  const handleReset = () => {
    localStorage.removeItem(PWD_KEY)
    flash('ok', 'Senha redefinida para o padrão: barbeza@2025')
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
          <ShieldCheck size={18} className="text-forest" />
        </div>
        <div>
          <h2 className="font-raleway text-forest text-lg tracking-widest">SEGURANÇA</h2>
          <p className="font-inter text-xs text-ink-muted mt-0.5">
            {hasCustomPwd ? 'Senha personalizada ativa' : 'Usando senha padrão'}
          </p>
        </div>
      </div>

      <form onSubmit={handleChange} className="glass-card rounded-xl p-6 flex flex-col gap-4">
        <h3 className="font-raleway text-ink text-sm tracking-wider">Alterar Senha</h3>

        {/* Senha atual */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Senha atual</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={e => setCurrent(e.target.value)}
              placeholder="Digite a senha atual"
              className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 pr-10 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            />
            <button type="button" onClick={() => setShowCurrent(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest">
              {showCurrent ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
        </div>

        {/* Nova senha */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Nova senha</label>
          <div className="relative">
            <input
              type={showNext ? 'text' : 'password'}
              value={next}
              onChange={e => setNext(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 pr-10 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
            />
            <button type="button" onClick={() => setShowNext(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest">
              {showNext ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
        </div>

        {/* Confirmar */}
        <div>
          <label className="font-inter text-xs text-ink-muted mb-1 block">Confirmar nova senha</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repita a nova senha"
            className="w-full bg-natural border border-natural-border rounded px-3 py-2.5 font-inter text-sm text-ink outline-none focus:border-forest transition-colors"
          />
        </div>

        {msg && (
          <p className={`font-inter text-xs rounded px-3 py-2 ${msg.type === 'ok' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-500'}`}>
            {msg.text}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button type="submit"
            className="flex items-center gap-2 bg-forest text-white px-5 py-2 text-xs font-raleway tracking-wider rounded hover:bg-forest-light transition-colors">
            <Check size={14}/> SALVAR SENHA
          </button>
          {hasCustomPwd && (
            <button type="button" onClick={handleReset}
              className="flex items-center gap-1.5 border border-natural-border text-ink-muted px-4 py-2 text-xs rounded hover:border-red-300 hover:text-red-400 transition-colors">
              <Lock size={13}/> Redefinir para padrão
            </button>
          )}
        </div>
      </form>

      <div className="mt-4 glass-card rounded-lg p-4">
        <p className="font-inter text-xs text-ink-muted leading-relaxed">
          <strong className="text-ink">Dica:</strong> A senha fica salva neste navegador. Se trocar de dispositivo, use a senha padrão <code className="bg-natural px-1 rounded text-forest">barbeza@2025</code> ou redefina pelo link na tela de login.
        </p>
      </div>
    </div>
  )
}
