import { Link } from 'react-router-dom'
import brand from '../config/brand'

interface NavButtonProps {
  to: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function NavButton({ to, children, variant = 'primary' }: NavButtonProps) {
  const { palette, typography } = brand

  const base =
    `inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold ` +
    `transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 font-${typography.primary}`

  const variants = {
    primary: `
      bg-[${palette.accent}]
      text-white
      hover:bg-[${palette.contrast}]
      active:bg-[${palette.secondary}]
      focus:ring-[${palette.accent}]
    `,
    secondary: `
      bg-white
      text-[${palette.accent}]
      border border-[${palette.contrast}]
      hover:bg-[${palette.neutral}]
      active:bg-[${palette.secondary}]
      focus:ring-[${palette.accent}]
    `,
  }
  return (
    <Link to={to} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  )
}
