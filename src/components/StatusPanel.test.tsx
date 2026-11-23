import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusPanel } from '@/components/ui/StatusPanel'

describe('StatusPanel', () => {
	it('should render children alongside a decorative sprite', () => {
		const { container } = render(
			<StatusPanel>
				<h1>404</h1>
			</StatusPanel>,
		)
		expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument()
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
	})
})
