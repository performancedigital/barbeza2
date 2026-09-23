export function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace('#', '').trim()
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean
  const r = parseInt(full.substring(0, 2), 16)
  const g = parseInt(full.substring(2, 4), 16)
  const b = parseInt(full.substring(4, 6), 16)
  if ([r, g, b].some(Number.isNaN)) return '0 0 0'
  return `${r} ${g} ${b}`
}
