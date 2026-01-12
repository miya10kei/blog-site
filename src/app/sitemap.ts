import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getAllTags, getPostList } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = SITE_CONFIG.url

	// 静的ページ
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/portfolio`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/tags`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]

	// 動的ページ（ブログ記事）
	let postPages: MetadataRoute.Sitemap = []
	try {
		const posts = await getPostList()
		postPages = posts.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: new Date(post.date),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		}))
	} catch {
		// コンテンツ取得に失敗した場合はスキップ
	}

	// タグページ
	let tagPages: MetadataRoute.Sitemap = []
	try {
		const tags = await getAllTags()
		tagPages = tags.map((tag) => ({
			url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.5,
		}))
	} catch {
		// コンテンツ取得に失敗した場合はスキップ
	}

	return [...staticPages, ...postPages, ...tagPages]
}
