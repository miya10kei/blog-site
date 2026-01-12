import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant
	children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
	default: 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-90',
	outline: 'border border-current bg-transparent hover:bg-[var(--muted)]/10',
	ghost: 'bg-transparent hover:bg-[var(--muted)]/10',
}

export function Button({ variant = 'default', className = '', children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
