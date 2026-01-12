import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkipLink } from '@/components/layout/SkipLink'

describe('SkipLink', () => {
	it('should render a skip link', () => {
		render(<SkipLink />)
		const link = screen.getByRole('link', { name: /メインコンテンツへスキップ/i })
		expect(link).toBeInTheDocument()
	})

	it('should have correct href', () => {
		render(<SkipLink />)
		const link = screen.getByRole('link', { name: /メインコンテンツへスキップ/i })
		expect(link).toHaveAttribute('href', '#main-content')
	})

	it('should have skip-link class for styling', () => {
		render(<SkipLink />)
		const link = screen.getByRole('link', { name: /メインコンテンツへスキップ/i })
		expect(link).toHaveClass('skip-link')
	})
})
