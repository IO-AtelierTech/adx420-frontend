import { Link } from 'react-router-dom'
import brand from '../config/brand'

interface NavButtonProps {
  to: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function NavButton({ to, children, variant = 'primary' }: NavButtonProps) {
  const { palette, typography } = brand

  // Define variant-specific CSS variables
  const variantVars: Record<'primary' | 'secondary', React.CSSProperties> = {
    primary: {
      '--btn-bg': palette.accent,
      '--btn-color': palette.neutral,
      '--btn-hover': palette.contrast,
      '--btn-active': palette.secondary,
    } as React.CSSProperties,
    secondary: {
      '--btn-bg': palette.neutral,
      '--btn-color': palette.accent,
      '--btn-hover': palette.secondary,
      '--btn-active': palette.contrast,
      '--btn-border': palette.contrast,
    } as React.CSSProperties,
  }

  const baseClass = `
    inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold 
    transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 
    hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] 
    active:scale-95 focus:ring-[var(--btn-bg)]
  `

  const variantBase: Record<'primary' | 'secondary', string> = {
    primary: 'text-[var(--btn-color)] bg-[var(--btn-bg)]',
    secondary: 'text-[var(--btn-color)] bg-[var(--btn-bg)] border-2 border-[var(--btn-border)]',
  }

  return (
    <Link
      to={to}
      className={`${baseClass} ${variantBase[variant]}`}
      style={{
        fontFamily: typography.logo,
        ...variantVars[variant],
      }}
    >
      {children}
    </Link>
  )
}
