import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags } from '@/lib/content'

export const metadata: Metadata = {
	title: 'タグ一覧',
	description: 'ブログ記事のタグ一覧',
}

export default async function TagsPage() {
	let tags: string[] = []

	try {
		tags = await getAllTags()
	} catch {
		// コンテンツ取得に失敗した場合は空配列を使用
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<h1 className="mb-8 text-3xl font-bold">タグ一覧</h1>

			{tags.length === 0 ? (
				<p className="text-[var(--muted)]">タグがありません。</p>
			) : (
				<div className="flex flex-wrap gap-3">
					{tags.map((tag) => (
						<Link
							key={tag}
							href={`/tags/${tag}`}
							className="rounded-full bg-[var(--muted)]/10 px-4 py-2 transition-colors hover:bg-[var(--muted)]/20"
						>
							{tag}
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
