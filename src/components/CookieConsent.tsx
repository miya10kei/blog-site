'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { updateConsent } from '@/lib/gtag'

export function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem('cookie-consent')
		if (!consent) {
			setShowBanner(true)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie-consent', 'accepted')
		updateConsent(true)
		setShowBanner(false)
	}

	const handleReject = () => {
		localStorage.setItem('cookie-consent', 'rejected')
		updateConsent(false)
		setShowBanner(false)
	}

	if (!showBanner) return null

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--muted)]/20 bg-[var(--background)] p-4 shadow-lg">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
				<p className="text-sm text-[var(--muted)]">
					当サイトではアクセス解析のためCookieを使用しています。
					<Link href="/privacy" className="underline hover:no-underline">
						プライバシーポリシー
					</Link>
				</p>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={handleReject}
						className="rounded-lg border border-[var(--muted)]/20 px-4 py-2 text-sm transition-colors hover:bg-[var(--muted)]/10"
					>
						拒否
					</button>
					<button
						type="button"
						onClick={handleAccept}
						className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)] transition-opacity hover:opacity-90"
					>
						同意
					</button>
				</div>
			</div>
		</div>
	)
}
