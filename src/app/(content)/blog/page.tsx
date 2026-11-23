import type { Metadata } from 'next'
import { PageHeading } from '@/components/ui/PageHeading'
import { PostList } from '@/features/blog/components/PostList'
import { getPostList } from '@/lib/content'

export const metadata: Metadata = {
	title: 'ブログ',
	description: '技術ブログの記事一覧',
}

export default async function BlogPage() {
	let posts: Awaited<ReturnType<typeof getPostList>> = []

	try {
		posts = await getPostList()
	} catch {
		// コンテンツ取得に失敗した場合は空配列を使用
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<PageHeading eyebrow="BLOG" sprite="book">
				ブログ
			</PageHeading>
			<PostList posts={posts} />
		</div>
	)
}
