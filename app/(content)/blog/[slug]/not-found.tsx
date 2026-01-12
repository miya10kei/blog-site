import Link from 'next/link'

export default function BlogPostNotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="mb-4 text-4xl font-bold">404</h1>
			<p className="mb-8 text-lg text-[var(--muted)]">記事が見つかりませんでした。</p>
			<Link
				href="/blog"
				className="rounded-lg bg-[var(--foreground)] px-6 py-3 text-[var(--background)] transition-opacity hover:opacity-80"
			>
				ブログ一覧へ戻る
			</Link>
		</div>
	)
}
