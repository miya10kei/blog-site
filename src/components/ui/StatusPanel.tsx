import type { ReactNode } from 'react'
import { PixelSprite } from './PixelSprite'

type StatusPanelProps = {
	children: ReactNode
}

export function StatusPanel({ children }: StatusPanelProps) {
	return (
		<div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-24">
			<div className="pixel-box flex w-full flex-col items-center p-8 text-center sm:p-12">
				<PixelSprite name="lost" size={96} className="mb-6" />
				{children}
			</div>
		</div>
	)
}
