interface GoldDividerProps { icon?: "diamond" | "scissor"; className?: string }
export function GoldDivider({ icon = "diamond", className = "" }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand opacity-30" />
      <div className="text-brand opacity-60 text-xs">
        {icon === "scissor" ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
            <path d="M10 10 L2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 10 L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand opacity-30" />
    </div>
  )
}
