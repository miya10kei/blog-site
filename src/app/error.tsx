'use client'

import { useEffect } from 'react'
import { PixelSprite } from '@/components/ui/PixelSprite'

export default function ErrorPage({
	error,
	reset,
}: {
	error: globalThis.Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// エラーをログに記録（Sentryなどに送信）
		console.error(error)
	}, [error])

	return (
		<div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-24">
			<div className="pixel-box flex w-full flex-col items-center p-8 text-center sm:p-12">
				<PixelSprite name="lost" size={96} className="mb-6" />
				<h1 className="pixel-heading mb-4 text-3xl">エラーが発生しました</h1>
				<p className="mb-8 text-[var(--muted)]">申し訳ありません。問題が発生しました。</p>
				<button type="button" onClick={reset} className="pixel-button pixel-button-primary">
					再試行
				</button>
			</div>
		</div>
	)
}
