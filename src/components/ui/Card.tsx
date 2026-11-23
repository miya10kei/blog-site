import type { ReactNode } from 'react'

type CardProps = {
	children: ReactNode
	className?: string
}

export function Card({ children, className = '' }: CardProps) {
	return (
		<article className={`pixel-box pixel-box-interactive p-6 ${className}`}>{children}</article>
	)
}
