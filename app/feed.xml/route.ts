import { SITE_CONFIG } from '@/lib/constants'
import { getPostList } from '@/lib/content'

export async function GET() {
	let posts: Awaited<ReturnType<typeof getPostList>> = []

	try {
		posts = await getPostList()
	} catch {
		// コンテンツ取得に失敗した場合は空配列を使用
	}

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
			.map(
				(post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`,
			)
			.join('')}
  </channel>
</rss>`

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	})
}
