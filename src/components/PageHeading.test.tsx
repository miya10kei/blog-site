import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageHeading } from '@/components/ui/PageHeading'

describe('PageHeading', () => {
	it('should render children as the only h1', () => {
		render(
			<PageHeading eyebrow="BLOG" sprite="book">
				ブログ
			</PageHeading>,
		)
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
		expect(screen.getByRole('heading', { level: 1, name: 'ブログ' })).toBeInTheDocument()
	})

	it('should render the eyebrow outside the heading', () => {
		render(
			<PageHeading eyebrow="BLOG" sprite="book">
				ブログ
			</PageHeading>,
		)
		expect(screen.getByText('BLOG').closest('h1')).toBeNull()
	})
})
