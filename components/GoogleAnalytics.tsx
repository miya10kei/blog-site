'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { GA_ID, pageview } from '@/lib/gtag'

function GoogleAnalyticsInner() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		if (!GA_ID) return

		const url = pathname + searchParams.toString()
		pageview(url)
	}, [pathname, searchParams])

	return null
}

export function GoogleAnalytics() {
	if (!GA_ID) return null

	return (
		<Suspense fallback={null}>
			<GoogleAnalyticsInner />
		</Suspense>
	)
}
