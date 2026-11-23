import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t-4 border-[var(--line)] bg-[var(--surface)] py-6">
			<div className="mx-auto max-w-5xl px-4">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-sm text-[var(--muted)]">
						© {currentYear} {SITE_CONFIG.author.name}. All rights reserved.
					</p>
					<nav aria-label="フッターナビゲーション">
						<ul className="flex gap-4 text-sm">
							<li>
								<Link
									href="/privacy"
									className="pixel-nav-link text-[var(--muted)] hover:text-[var(--foreground)]"
								>
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
