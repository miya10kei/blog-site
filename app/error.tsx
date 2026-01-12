'use client'

import { useEffect } from 'react'

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
		<div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
			<h1 className="mb-4 text-4xl font-bold">エラーが発生しました</h1>
			<p className="mb-8 text-[var(--muted)]">申し訳ありません。問題が発生しました。</p>
			<button
				type="button"
				onClick={reset}
				className="rounded-lg bg-[var(--foreground)] px-6 py-3 text-[var(--background)] transition-opacity hover:opacity-80"
			>
				再試行
			</button>
		</div>
	)
}
