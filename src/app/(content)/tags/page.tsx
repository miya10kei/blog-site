import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeading } from '@/components/ui/PageHeading'
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
			<PageHeading eyebrow="TAGS" sprite="tag">
				タグ一覧
			</PageHeading>

			{tags.length === 0 ? (
				<p className="text-[var(--muted)]">タグがありません。</p>
			) : (
				<div className="flex flex-wrap gap-3">
					{tags.map((tag) => (
						<Link key={tag} href={`/tags/${tag}`} className="pixel-tag">
							{tag}
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
