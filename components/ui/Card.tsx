import type { ReactNode } from 'react'

type CardProps = {
	children: ReactNode
	className?: string
}

export function Card({ children, className = '' }: CardProps) {
	return (
		<article
			className={`rounded-lg border border-[var(--muted)]/20 bg-[var(--background)] p-6 transition-shadow hover:shadow-lg ${className}`}
		>
			{children}
		</article>
	)
}
