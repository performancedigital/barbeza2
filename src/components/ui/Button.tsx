import { type ReactNode, type ButtonHTMLAttributes } from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: ReactNode
  href?: string
  target?: string
}

export function Button({ variant = "gold", size = "md", children, className, href, target, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-oswald font-semibold tracking-widest transition-all duration-300 select-none uppercase"
  const sizes = { sm: "px-5 py-2.5 text-xs", md: "px-8 py-3.5 text-sm", lg: "px-10 py-4 text-sm" }
  const variants = {
    gold: "bg-brand text-white hover:bg-brand-light hover:shadow-[0_0_30px_rgba(139,133,85,0.4)] active:scale-95",
    outline: "border border-brand text-brand hover:bg-brand hover:text-white hover:shadow-[0_0_30px_rgba(139,133,85,0.3)] active:scale-95",
    ghost: "text-brand hover:text-brand-light hover:underline",
  }
  const classes = cn(base, sizes[size], variants[variant], className)
  if (href) {
    return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={classes}>{children}</a>
  }
  return <button className={classes} {...props}>{children}</button>
}
