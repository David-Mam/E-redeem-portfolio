import type { ComponentPropsWithoutRef } from 'react'

const variants = {
  primary:
    'bg-r-signal text-white hover:bg-r-signal-dark active:bg-r-signal-dark disabled:bg-r-border disabled:text-r-ink-muted',
  secondary:
    'bg-white text-r-signal border border-r-signal hover:bg-r-signal-tint active:bg-r-signal-tint disabled:bg-white disabled:text-r-ink-muted disabled:border-r-border',
  ghost:
    'bg-transparent text-r-signal hover:bg-r-signal-tint active:bg-r-signal-tint disabled:text-r-ink-muted',
}

type Variant = keyof typeof variants

// Always renders a <button>, so it simply extends the native button props.
interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'className'> {
  variant?: Variant
  className?: string
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-4 font-r-body text-[15px] font-semibold transition-colors duration-200 motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
