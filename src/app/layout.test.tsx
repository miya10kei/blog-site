import { Children, type ReactElement, type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/font/google', () => {
	const font = () => ({ variable: 'font-variable' })
	return { DotGothic16: font, JetBrains_Mono: font, Noto_Sans_JP: font }
})
vi.mock('@/lib/gtag', () => ({ GA_ID: '' }))

import RootLayout from '@/app/layout'

describe('RootLayout', () => {
	it('should not add text nodes to head when GA is not configured', () => {
		const html = RootLayout({ children: null }) as ReactElement<{ children: ReactNode }>
		const head = Children.toArray(html.props.children).find(
			(child) => (child as ReactElement).type === 'head',
		) as ReactElement<{ children: ReactNode }>

		expect(Children.toArray(head.props.children)).toEqual([])
	})
})
