import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
	it('should render children', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
	})

	it('should handle click events', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Button onClick={handleClick}>Click me</Button>)
		await user.click(screen.getByRole('button'))

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('should apply variant styles', () => {
		render(<Button variant="outline">Outline</Button>)
		const button = screen.getByRole('button')
		expect(button).toHaveClass('border')
	})

	it('should be disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>)
		expect(screen.getByRole('button')).toBeDisabled()
	})
})
