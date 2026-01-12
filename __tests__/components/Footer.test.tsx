import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
	it('should render as footer element', () => {
		render(<Footer />)
		expect(screen.getByRole('contentinfo')).toBeInTheDocument()
	})

	it('should display copyright notice', () => {
		render(<Footer />)
		expect(screen.getByText(/©/)).toBeInTheDocument()
	})

	it('should have privacy policy link', () => {
		render(<Footer />)
		expect(screen.getByRole('link', { name: /プライバシーポリシー/i })).toBeInTheDocument()
	})
})
