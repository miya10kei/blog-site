import Link from 'next/link'
import { StatusPanel } from '@/components/ui/StatusPanel'

export default function BlogPostNotFound() {
	return (
		<StatusPanel>
			<h1 className="pixel-heading mb-4 text-6xl">404</h1>
			<p className="mb-8 text-lg text-[var(--muted)]">記事が見つかりませんでした。</p>
			<Link href="/blog" className="pixel-button pixel-button-primary">
				ブログ一覧へ戻る
			</Link>
		</StatusPanel>
	)
}
