interface Props { icon?:"diamond"|"scissor"; className?:string; light?:boolean }
export function GoldDivider({ icon="diamond", className="", light=false }: Props) {
  const color = light ? "rgba(255,255,255,0.3)" : "rgba(61,90,61,0.25)"
  const iconColor = light ? "rgba(255,255,255,0.5)" : "#3D5A3D"
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px" style={{ background:`linear-gradient(to right,transparent,${color})` }} />
      <div style={{ color: iconColor, opacity: 0.7 }}>
        {icon==="scissor" ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
            <path d="M10 10 L2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 10 L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <div className="flex-1 h-px" style={{ background:`linear-gradient(to left,transparent,${color})` }} />
    </div>
  )
}
