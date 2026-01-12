import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
	{ href: '/blog', label: 'ブログ' },
	{ href: '/portfolio', label: 'ポートフォリオ' },
	{ href: '/about', label: 'About' },
]

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--muted)]/20 bg-[var(--background)]/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
				<Link href="/" className="text-xl font-bold">
					{SITE_CONFIG.name}
				</Link>
				<nav aria-label="メインナビゲーション">
					<ul className="flex gap-6">
						{navLinks.map((link) => (
							<li key={link.href}>
								<Link href={link.href} className="transition-opacity hover:opacity-70">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}
