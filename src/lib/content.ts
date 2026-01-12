import { CACHE_CONFIG, GITHUB_CONFIG } from './constants'

export type PostFrontmatter = {
	title: string
	date: string
	published: boolean
	description?: string
	tags?: string[]
	coverImage?: string
}

export type PostMeta = PostFrontmatter & {
	slug: string
}

/**
 * Fetch a single post by slug
 */
export async function getPost(slug: string): Promise<string | null> {
	// セキュリティ: slugをサニタイズ（英数字とハイフンのみ許可）
	const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '')
	const url = `${GITHUB_CONFIG.rawBase}/blog/${sanitizedSlug}.mdx`

	const response = await fetch(url, {
		next: { revalidate: CACHE_CONFIG.revalidateSeconds },
	})

	if (!response.ok) {
		if (response.status === 404) return null
		throw new Error(`Failed to fetch post: ${response.status}`)
	}

	return response.text()
}

/**
 * Get list of all post slugs
 */
export async function getPostSlugs(): Promise<string[]> {
	const url = `${GITHUB_CONFIG.apiBase}/blog`

	const response = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			...(process.env.GITHUB_TOKEN && {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			}),
		},
		next: { revalidate: CACHE_CONFIG.revalidateSeconds },
	})

	if (!response.ok) {
		throw new Error(`Failed to fetch post list: ${response.status}`)
	}

	const files = (await response.json()) as Array<{ name: string; type: string }>

	return files
		.filter((file) => file.type === 'file' && file.name.endsWith('.mdx'))
		.map((file) => file.name.replace(/\.mdx$/, ''))
}

/**
 * Parse frontmatter from MDX content
 */
export function parseFrontmatter(content: string): PostFrontmatter {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---/
	const match = content.match(frontmatterRegex)

	if (!match) {
		throw new Error('No frontmatter found')
	}

	const frontmatterStr = match[1]
	const frontmatter: Record<string, unknown> = {}

	// Simple YAML parsing for common fields
	const lines = frontmatterStr.split('\n')
	let currentKey: string | null = null
	let arrayValues: string[] = []

	for (const line of lines) {
		const trimmed = line.trim()

		// Array item
		if (trimmed.startsWith('- ') && currentKey) {
			arrayValues.push(trimmed.slice(2))
			continue
		}

		// Save previous array
		if (currentKey && arrayValues.length > 0) {
			frontmatter[currentKey] = arrayValues
			arrayValues = []
		}

		// Key-value pair
		const colonIndex = line.indexOf(':')
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim()
			const value = line.slice(colonIndex + 1).trim()

			if (value === '') {
				// Start of array
				currentKey = key
			} else {
				// Parse value
				if (value === 'true') {
					frontmatter[key] = true
				} else if (value === 'false') {
					frontmatter[key] = false
				} else {
					frontmatter[key] = value
				}
				currentKey = null
			}
		}
	}

	// Save any remaining array
	if (currentKey && arrayValues.length > 0) {
		frontmatter[currentKey] = arrayValues
	}

	return {
		title: String(frontmatter.title || ''),
		date: String(frontmatter.date || ''),
		published: frontmatter.published === true,
		description: frontmatter.description ? String(frontmatter.description) : undefined,
		tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined,
		coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
	}
}

/**
 * Get list of all posts with metadata
 */
export async function getPostList(): Promise<PostMeta[]> {
	const slugs = await getPostSlugs()

	const results = await Promise.allSettled(
		slugs.map(async (slug) => {
			const content = await getPost(slug)
			if (!content) return null

			const frontmatter = parseFrontmatter(content)

			// Filter unpublished
			if (!frontmatter.published) return null

			return {
				slug,
				...frontmatter,
			}
		}),
	)

	const posts = results
		.filter(
			(result): result is PromiseFulfilledResult<PostMeta | null> => result.status === 'fulfilled',
		)
		.map((result) => result.value)
		.filter((post): post is PostMeta => post !== null)

	// Sort by date descending
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
	const posts = await getPostList()
	const tagSet = new Set<string>()

	for (const post of posts) {
		if (post.tags) {
			for (const tag of post.tags) {
				tagSet.add(tag)
			}
		}
	}

	return Array.from(tagSet).sort()
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
	const posts = await getPostList()
	return posts.filter((post) => post.tags?.includes(tag))
}
