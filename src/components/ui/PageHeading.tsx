import type { ReactNode } from 'react'
import { PixelSprite, type PixelSpriteName } from './PixelSprite'

type PageHeadingProps = {
	children: ReactNode
	eyebrow: string
	sprite: PixelSpriteName
}

export function PageHeading({ children, eyebrow, sprite }: PageHeadingProps) {
	return (
		<header className="mb-10 flex items-center gap-4">
			<span className="pixel-box grid h-16 w-16 flex-none place-items-center">
				<PixelSprite name={sprite} size={36} />
			</span>
			<div className="min-w-0">
				<p className="pixel-label text-sm text-[var(--muted)]">{eyebrow}</p>
				<h1 className="pixel-heading text-3xl sm:text-4xl">{children}</h1>
			</div>
		</header>
	)
}
