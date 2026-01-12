import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from '@/components/layout/Header'

describe('Header', () => {
	it('should render site name', () => {
		render(<Header />)
		expect(screen.getByRole('link', { name: /tech blog/i })).toBeInTheDocument()
	})

	it('should have navigation', () => {
		render(<Header />)
		expect(screen.getByRole('navigation')).toBeInTheDocument()
	})

	it('should have navigation links', () => {
		render(<Header />)
		expect(screen.getByRole('link', { name: /ブログ/i })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /ポートフォリオ/i })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
	})

	it('should render as header element', () => {
		render(<Header />)
		expect(screen.getByRole('banner')).toBeInTheDocument()
	})
})
