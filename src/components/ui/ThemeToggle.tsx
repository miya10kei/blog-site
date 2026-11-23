'use client'

import { useTheme } from 'next-themes'
import { PixelSprite } from './PixelSprite'

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="pixel-button pixel-button-secondary !min-h-11 !w-11 !p-0"
			aria-label="テーマ切り替え"
		>
			<PixelSprite name="sun" size={24} className="dark:hidden" />
			<PixelSprite name="moon" size={24} className="hidden dark:inline-block" />
		</button>
	)
}
