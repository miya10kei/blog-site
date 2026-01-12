import type { Metadata } from 'next'
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
			<h1 className="mb-8 text-3xl font-bold">ブログ</h1>
			<PostList posts={posts} />
		</div>
	)
}
