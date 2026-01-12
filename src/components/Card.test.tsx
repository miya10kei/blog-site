import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from '@/components/ui/Card'

describe('Card', () => {
	it('should render children', () => {
		render(<Card>Card content</Card>)
		expect(screen.getByText('Card content')).toBeInTheDocument()
	})

	it('should render as article element', () => {
		render(<Card>Content</Card>)
		expect(screen.getByRole('article')).toBeInTheDocument()
	})

	it('should apply custom className', () => {
		render(<Card className="custom-class">Content</Card>)
		expect(screen.getByRole('article')).toHaveClass('custom-class')
	})
})
