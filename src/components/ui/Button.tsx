import { type ReactNode, type ButtonHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary"|"outline"|"ghost"; size?: "sm"|"md"|"lg"
  children: ReactNode; href?: string; target?: string
}
export function Button({ variant="primary", size="md", children, className, href, target, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-raleway font-bold tracking-widest transition-all duration-300 select-none uppercase"
  const sizes = { sm:"px-5 py-2.5 text-xs", md:"px-8 py-3.5 text-sm", lg:"px-10 py-4 text-sm" }
  const variants = {
    primary: "bg-forest text-white hover:bg-forest-light hover:shadow-[0_4px_24px_rgba(61,90,61,0.35)] active:scale-95",
    outline:  "border-2 border-forest text-forest bg-transparent hover:bg-forest hover:text-white active:scale-95",
    ghost:    "text-forest hover:text-forest-light underline-offset-4 hover:underline",
  }
  // hero white variant
  const classes = cn(base, sizes[size], variants[variant as keyof typeof variants] || variants.primary, className)
  if (href) return <a href={href} target={target} rel={target==="_blank"?"noopener noreferrer":undefined} className={classes}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
