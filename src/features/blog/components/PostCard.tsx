import Link from 'next/link'
import type { PostMeta } from '@/lib/content'
import { formatReadingTime } from '@/lib/reading-time'

type PostCardProps = {
	post: PostMeta
	readingTime?: number
}

export function PostCard({ post, readingTime }: PostCardProps) {
	return (
		<article className="group rounded-lg border border-[var(--muted)]/20 p-6 transition-shadow hover:shadow-lg">
			<Link href={`/blog/${post.slug}`} className="block">
				<h2 className="mb-2 text-xl font-semibold group-hover:text-[var(--color-primary)]">
					{post.title}
				</h2>
				{post.description && (
					<p className="mb-4 text-[var(--muted)] line-clamp-2">{post.description}</p>
				)}
				<div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					{readingTime && <span>{formatReadingTime(readingTime)}</span>}
					{post.tags && post.tags.length > 0 && (
						<div className="flex gap-2">
							{post.tags.slice(0, 3).map((tag) => (
								<span key={tag} className="rounded-full bg-[var(--muted)]/10 px-2 py-0.5 text-xs">
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
