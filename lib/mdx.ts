import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { createHighlighter } from 'shiki'

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null

/**
 * Get or create Shiki highlighter
 */
async function getHighlighter() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-dark', 'github-light'],
			langs: [
				'typescript',
				'javascript',
				'tsx',
				'jsx',
				'json',
				'bash',
				'shell',
				'css',
				'html',
				'markdown',
				'yaml',
				'python',
				'go',
				'rust',
			],
		})
	}
	return highlighter
}

/**
 * Highlight code using Shiki
 */
export async function highlightCode(code: string, lang: string): Promise<string> {
	const hl = await getHighlighter()

	const html = hl.codeToHtml(code, {
		lang: lang || 'text',
		themes: {
			light: 'github-light',
			dark: 'github-dark',
		},
	})

	return html
}

/**
 * MDX options for next-mdx-remote-client
 */
export const mdxOptions = {
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: {
					className: ['anchor'],
				},
			},
		],
	],
}

/**
 * Extract headings from MDX content for table of contents
 */
export function extractHeadings(
	content: string,
): Array<{ id: string; text: string; level: number }> {
	const headingRegex = /^(#{1,6})\s+(.+)$/gm
	const headings: Array<{ id: string; text: string; level: number }> = []

	let match = headingRegex.exec(content)
	while (match !== null) {
		const level = match[1].length
		const text = match[2].trim()
		// Generate slug from text (same as rehype-slug)
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')

		headings.push({ id, text, level })
		match = headingRegex.exec(content)
	}

	return headings
}
