import Link from 'next/link'
import { PixelSprite } from '@/components/ui/PixelSprite'

export default function BlogPostNotFound() {
	return (
		<div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-24">
			<div className="pixel-box flex w-full flex-col items-center p-8 text-center sm:p-12">
				<PixelSprite name="lost" size={96} className="mb-6" />
				<h1 className="pixel-heading mb-4 text-6xl">404</h1>
				<p className="mb-8 text-lg text-[var(--muted)]">記事が見つかりませんでした。</p>
				<Link href="/blog" className="pixel-button pixel-button-primary">
					ブログ一覧へ戻る
				</Link>
			</div>
		</div>
	)
}
