import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
	useTheme: () => ({
		theme: 'light',
		setTheme: mockSetTheme,
		resolvedTheme: 'light',
	}),
}))

import { ThemeToggle } from '@/components/ui/ThemeToggle'

describe('ThemeToggle', () => {
	it('should render a button', () => {
		render(<ThemeToggle />)
		expect(screen.getByRole('button', { name: /テーマ切り替え/i })).toBeInTheDocument()
	})

	it('should toggle theme on click', async () => {
		const user = userEvent.setup()
		render(<ThemeToggle />)

		const button = screen.getByRole('button', { name: /テーマ切り替え/i })
		await user.click(button)

		expect(mockSetTheme).toHaveBeenCalledWith('dark')
	})
})
