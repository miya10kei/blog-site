import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const secret = request.headers.get('x-revalidate-secret')

	if (secret !== process.env.REVALIDATE_SECRET) {
		return new Response('Unauthorized', { status: 401 })
	}

	try {
		const body = await request.json()
		const { path, tag } = body as { path?: string; tag?: string }

		if (path) {
			revalidatePath(path)
			return Response.json({ revalidated: true, path })
		}

		if (tag) {
			revalidateTag(tag, 'max')
			return Response.json({ revalidated: true, tag })
		}

		// デフォルトでブログ関連をすべて再検証
		revalidatePath('/blog')
		revalidatePath('/tags')
		revalidatePath('/feed.xml')

		return Response.json({ revalidated: true, paths: ['/blog', '/tags', '/feed.xml'] })
	} catch {
		return new Response('Invalid request', { status: 400 })
	}
}
