import Link from 'next/link'
import type { PostMeta } from '@/lib/content'
import { formatReadingTime } from '@/lib/reading-time'

type PostCardProps = {
	post: PostMeta
	readingTime?: number
}

export function PostCard({ post, readingTime }: PostCardProps) {
	return (
		<article className="group pixel-box pixel-box-interactive p-5 sm:p-6">
			<Link href={`/blog/${post.slug}`} className="block">
				<h2 className="pixel-heading mb-2 text-xl group-hover:text-[var(--link)] sm:text-2xl">
					{post.title}
				</h2>
				{post.description && (
					<p className="mb-4 text-[var(--muted)] line-clamp-2">{post.description}</p>
				)}
				<div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					{readingTime && <span>{formatReadingTime(readingTime)}</span>}
					{post.tags && post.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{post.tags.slice(0, 3).map((tag) => (
								<span key={tag} className="pixel-tag">
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</Link>
		</article>
	)
}

function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
