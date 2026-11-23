import Link from 'next/link'
import { PixelSprite, type PixelSpriteName } from '@/components/ui/PixelSprite'
import { SITE_CONFIG } from '@/lib/constants'

const destinations: Array<{
	description: string
	href: string
	label: string
	sprite: PixelSpriteName
}> = [
	{ description: '技術や日々の記録を読む', href: '/blog', label: 'ブログ', sprite: 'book' },
	{
		description: 'つくったものを見る',
		href: '/portfolio',
		label: 'ポートフォリオ',
		sprite: 'folder',
	},
	{ description: '書いている人について', href: '/about', label: 'About', sprite: 'user' },
]

export default function Home() {
	return (
		<div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-20">
			<section className="pixel-box flex flex-col items-start gap-8 p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
				<div className="min-w-0">
					<p className="pixel-label mb-3 text-sm text-[var(--muted)]">TECH BLOG / PORTFOLIO</p>
					<h1 className="pixel-heading mb-4 text-4xl sm:text-6xl">
						{SITE_CONFIG.name}
						<span className="pixel-cursor" aria-hidden="true" />
					</h1>
					<p className="mb-8 text-lg text-[var(--muted)]">{SITE_CONFIG.description}</p>
					<div className="flex flex-wrap gap-4">
						<Link href="/blog" className="pixel-button pixel-button-primary">
							ブログを読む
						</Link>
						<Link href="/tags" className="pixel-button pixel-button-secondary">
							タグから探す
						</Link>
					</div>
				</div>
				<div className="relative hidden flex-none sm:block">
					<PixelSprite name="terminal" size={168} />
					<PixelSprite name="sparkle" size={48} className="absolute -right-5 -top-5" />
				</div>
			</section>

			<nav aria-label="コンテンツ" className="mt-10">
				<ul className="grid gap-6 md:grid-cols-3">
					{destinations.map((destination) => (
						<li key={destination.href}>
							<Link
								href={destination.href}
								className="pixel-box pixel-box-interactive flex h-full items-center gap-4 p-5"
							>
								<PixelSprite name={destination.sprite} size={36} />
								<span>
									<span className="pixel-heading block text-xl">{destination.label}</span>
									<span className="block text-sm text-[var(--muted)]">
										{destination.description}
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
