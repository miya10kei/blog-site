import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
			<h1 className="mb-4 text-6xl font-bold">404</h1>
			<p className="mb-8 text-xl text-[var(--muted)]">ページが見つかりませんでした</p>
			<Link
				href="/"
				className="rounded-lg bg-[var(--foreground)] px-6 py-3 text-[var(--background)] transition-opacity hover:opacity-80"
			>
				ホームへ戻る
			</Link>
		</div>
	)
}
