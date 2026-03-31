import { useScissorCursor } from '@/hooks/useScissorCursor'

export function ScissorCursor() {
  const { coords, isHovering, isVisible } = useScissorCursor()

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: coords.x - 16,
        top: coords.y - 16,
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      <img
        src={isHovering ? '/cursor-scissor-pointer.svg' : '/cursor-scissor.svg'}
        alt=""
        width={32}
        height={32}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.6))',
          transition: 'filter 0.2s',
        }}
      />
    </div>
  )
}
