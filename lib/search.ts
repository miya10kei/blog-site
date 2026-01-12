import Fuse, { type IFuseOptions } from 'fuse.js'
import type { PostMeta } from './content'

const fuseOptions: IFuseOptions<PostMeta> = {
	keys: [
		{ name: 'title', weight: 0.4 },
		{ name: 'description', weight: 0.3 },
		{ name: 'tags', weight: 0.3 },
	],
	threshold: 0.3,
	includeScore: true,
}

export function createSearchIndex(posts: PostMeta[]): Fuse<PostMeta> {
	return new Fuse(posts, fuseOptions)
}

export function searchPosts(
	index: Fuse<PostMeta>,
	query: string,
): Array<{ item: PostMeta; score?: number }> {
	if (!query.trim()) {
		return []
	}

	return index.search(query)
}
