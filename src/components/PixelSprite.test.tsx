import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PixelSprite } from '@/components/ui/PixelSprite'

describe('PixelSprite', () => {
	it('should render a decorative svg hidden from assistive technology', () => {
		const { container } = render(<PixelSprite name="book" />)
		expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
	})

	it('should apply the requested size', () => {
		const { container } = render(<PixelSprite name="tag" size={48} />)
		const svg = container.querySelector('svg')
		expect(svg).toHaveAttribute('width', '48')
		expect(svg).toHaveAttribute('height', '48')
	})

	it('should draw pixels inside the 12x12 grid', () => {
		const { container } = render(<PixelSprite name="sun" />)
		const pixels = [...container.querySelectorAll('rect')]
		expect(pixels.length).toBeGreaterThan(0)
		for (const pixel of pixels) {
			expect(Number(pixel.getAttribute('x'))).toBeLessThan(12)
			expect(Number(pixel.getAttribute('y'))).toBeLessThan(12)
		}
	})
})
