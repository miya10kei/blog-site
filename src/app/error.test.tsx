import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ErrorPage from '@/app/error'

describe('ErrorPage', () => {
	it('should call reset when retry is clicked', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		const reset = vi.fn()
		const user = userEvent.setup()

		render(<ErrorPage error={new Error('failure')} reset={reset} />)
		await user.click(screen.getByRole('button', { name: '再試行' }))

		expect(reset).toHaveBeenCalledOnce()
	})
})
