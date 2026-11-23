import type { Metadata } from 'next'
import { PageHeading } from '@/components/ui/PageHeading'
import { PostList } from '@/features/blog/components/PostList'
import { getAllTags, getPostsByTag } from '@/lib/content'

type Props = {
	params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
	try {
		const tags = await getAllTags()
		return tags.map((tag) => ({
			tag,
		}))
	} catch {
		return []
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params
	const decodedTag = decodeURIComponent(tag)

	return {
		title: `${decodedTag} の記事`,
		description: `${decodedTag}タグの記事一覧`,
	}
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params
	const decodedTag = decodeURIComponent(tag)

	let posts: Awaited<ReturnType<typeof getPostsByTag>> = []

	try {
		posts = await getPostsByTag(decodedTag)
	} catch {
		// コンテンツ取得に失敗した場合は空配列を使用
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<PageHeading eyebrow="TAG" sprite="tag">
				<span className="text-[var(--muted)]">タグ:</span> {decodedTag}
			</PageHeading>
			<PostList posts={posts} />
		</div>
	)
}
