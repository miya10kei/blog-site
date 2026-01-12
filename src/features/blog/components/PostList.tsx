import type { PostMeta } from '@/lib/content'
import { PostCard } from './PostCard'

type PostListProps = {
	posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
	if (posts.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-[var(--muted)]">まだ記事がありません。</p>
			</div>
		)
	}

	return (
		<div className="grid gap-6">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	)
}
