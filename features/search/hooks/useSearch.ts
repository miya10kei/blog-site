'use client'

import { useCallback, useMemo, useState } from 'react'
import type { PostMeta } from '@/lib/content'
import { createSearchIndex, searchPosts } from '@/lib/search'

export function useSearch(posts: PostMeta[]) {
	const [query, setQuery] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const searchIndex = useMemo(() => createSearchIndex(posts), [posts])

	const results = useMemo(() => {
		if (!query.trim()) {
			return []
		}
		return searchPosts(searchIndex, query)
	}, [searchIndex, query])

	const openSearch = useCallback(() => setIsOpen(true), [])
	const closeSearch = useCallback(() => {
		setIsOpen(false)
		setQuery('')
	}, [])

	return {
		query,
		setQuery,
		results,
		isOpen,
		openSearch,
		closeSearch,
	}
}
