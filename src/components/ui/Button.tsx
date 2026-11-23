import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant
	children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
	default: 'pixel-button-primary',
	outline: 'border border-2 pixel-button-secondary',
	ghost: 'border-transparent bg-transparent shadow-none hover:bg-[var(--surface-raised)]',
}

export function Button({ variant = 'default', className = '', children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={`pixel-button text-sm disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
