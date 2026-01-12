import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t border-[var(--muted)]/20 py-8">
			<div className="mx-auto max-w-5xl px-4">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-sm text-[var(--muted)]">
						© {currentYear} {SITE_CONFIG.author.name}. All rights reserved.
					</p>
					<nav aria-label="フッターナビゲーション">
						<ul className="flex gap-4 text-sm">
							<li>
								<Link href="/privacy" className="text-[var(--muted)] hover:underline">
									プライバシーポリシー
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	)
}
