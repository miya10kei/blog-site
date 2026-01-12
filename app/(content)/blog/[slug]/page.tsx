import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { PostMeta } from '@/features/blog/components/PostMeta'
import { getPost, getPostList, parseFrontmatter } from '@/lib/content'
import { calculateReadingTime } from '@/lib/reading-time'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	try {
		const posts = await getPostList()
		return posts.map((post) => ({
			slug: post.slug,
		}))
	} catch {
		// ビルド時にGitHub APIにアクセスできない場合は空配列を返す
		// ページはランタイムで生成される
		return []
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const content = await getPost(slug)

	if (!content) {
		return {
			title: '記事が見つかりません',
		}
	}

	const frontmatter = parseFrontmatter(content)

	return {
		title: frontmatter.title,
		description: frontmatter.description,
		openGraph: {
			title: frontmatter.title,
			description: frontmatter.description,
			type: 'article',
			publishedTime: frontmatter.date,
		},
	}
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	const content = await getPost(slug)

	if (!content) {
		notFound()
	}

	const frontmatter = parseFrontmatter(content)

	// Check if published
	if (!frontmatter.published) {
		notFound()
	}

	// Extract content without frontmatter
	const mdxContent = content.replace(/^---[\s\S]*?---/, '').trim()
	const readingTime = calculateReadingTime(mdxContent)

	return (
		<article className="mx-auto max-w-3xl px-4 py-12">
			<header className="mb-8">
				<h1 className="mb-4 text-3xl font-bold">{frontmatter.title}</h1>
				<PostMeta date={frontmatter.date} readingTime={readingTime} />
				{frontmatter.tags && frontmatter.tags.length > 0 && (
					<div className="mt-4 flex gap-2">
						{frontmatter.tags.map((tag) => (
							<span key={tag} className="rounded-full bg-[var(--muted)]/10 px-3 py-1 text-sm">
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<MDXRemote source={mdxContent} />
			</div>
		</article>
	)
}
