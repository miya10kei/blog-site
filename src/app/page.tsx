import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Home() {
	return (
		<section className="flex flex-1 flex-col items-center justify-center p-8">
			<div className="max-w-2xl text-center">
				<h1 className="mb-4 text-4xl font-bold">{SITE_CONFIG.name}</h1>
				<p className="mb-8 text-lg text-[var(--muted)]">{SITE_CONFIG.description}</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href="/blog"
						className="rounded-lg bg-[var(--foreground)] px-6 py-3 text-[var(--background)] transition-opacity hover:opacity-80"
					>
						ブログを読む
					</Link>
					<Link
						href="/portfolio"
						className="rounded-lg border border-current px-6 py-3 transition-opacity hover:opacity-80"
					>
						ポートフォリオ
					</Link>
					<Link
						href="/about"
						className="rounded-lg border border-current px-6 py-3 transition-opacity hover:opacity-80"
					>
						About
					</Link>
				</div>
			</div>
		</section>
	)
}
