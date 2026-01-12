import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPost, getPostList, getPostSlugs } from '@/lib/content'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('content', () => {
	beforeEach(() => {
		mockFetch.mockReset()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('getPost', () => {
		it('should fetch post content by slug', async () => {
			const mockContent = `---
title: Test Post
date: 2024-01-01
published: true
---
# Hello World`

			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () => Promise.resolve(mockContent),
			})

			const result = await getPost('hello-world')
			expect(result).toBe(mockContent)
			expect(mockFetch).toHaveBeenCalledWith(
				expect.stringContaining('hello-world.mdx'),
				expect.any(Object),
			)
		})

		it('should return null for 404', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
			})

			const result = await getPost('non-existent')
			expect(result).toBeNull()
		})

		it('should sanitize slug to prevent path traversal', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () => Promise.resolve('content'),
			})

			await getPost('../../../etc/passwd')
			expect(mockFetch).toHaveBeenCalledWith(
				expect.stringContaining('etcpasswd.mdx'),
				expect.any(Object),
			)
		})
	})

	describe('getPostSlugs', () => {
		it('should fetch list of post slugs', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve([
						{ name: 'post-1.mdx', type: 'file' },
						{ name: 'post-2.mdx', type: 'file' },
						{ name: 'images', type: 'dir' },
					]),
			})

			const slugs = await getPostSlugs()
			expect(slugs).toEqual(['post-1', 'post-2'])
		})
	})

	describe('getPostList', () => {
		it('should return list of posts with metadata', async () => {
			// Mock getPostSlugs
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve([
						{ name: 'post-1.mdx', type: 'file' },
						{ name: 'post-2.mdx', type: 'file' },
					]),
			})

			// Mock getPost for each slug
			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () =>
					Promise.resolve(`---
title: Post 1
date: 2024-01-02
published: true
description: First post
tags:
  - react
---
Content`),
			})

			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () =>
					Promise.resolve(`---
title: Post 2
date: 2024-01-01
published: true
description: Second post
tags:
  - nextjs
---
Content`),
			})

			const posts = await getPostList()
			expect(posts).toHaveLength(2)
			expect(posts[0].title).toBe('Post 1') // Sorted by date desc
			expect(posts[1].title).toBe('Post 2')
		})

		it('should filter out unpublished posts', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve([
						{ name: 'published.mdx', type: 'file' },
						{ name: 'draft.mdx', type: 'file' },
					]),
			})

			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () =>
					Promise.resolve(`---
title: Published
date: 2024-01-01
published: true
---
Content`),
			})

			mockFetch.mockResolvedValueOnce({
				ok: true,
				text: () =>
					Promise.resolve(`---
title: Draft
date: 2024-01-01
published: false
---
Content`),
			})

			const posts = await getPostList()
			expect(posts).toHaveLength(1)
			expect(posts[0].title).toBe('Published')
		})
	})
})
