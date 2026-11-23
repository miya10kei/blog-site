import Link from 'next/link'
import { PixelSprite } from '@/components/ui/PixelSprite'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SITE_CONFIG } from '@/lib/constants'

const navLinks = [
	{ href: '/blog', label: 'ブログ' },
	{ href: '/portfolio', label: 'ポートフォリオ' },
	{ href: '/about', label: 'About' },
]

export function Header() {
	return (
		<header className="z-50 border-b-4 border-[var(--line)] bg-[var(--surface)] sm:sticky sm:top-0">
			<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 py-2">
				<Link href="/" className="pixel-heading flex min-h-11 items-center gap-2 text-xl">
					<PixelSprite name="terminal" size={24} />
					{SITE_CONFIG.name}
				</Link>
				<div className="order-last w-full sm:order-none sm:ml-auto sm:w-auto">
					<nav aria-label="メインナビゲーション">
						<ul className="pixel-label flex justify-between gap-4 sm:gap-6">
							{navLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="pixel-nav-link">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<ThemeToggle />
			</div>
		</header>
	)
}
