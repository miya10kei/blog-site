'use client'

import { useEffect } from 'react'
import { StatusPanel } from '@/components/ui/StatusPanel'

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
		<StatusPanel>
			<h1 className="pixel-heading mb-4 text-3xl">エラーが発生しました</h1>
			<p className="mb-8 text-[var(--muted)]">申し訳ありません。問題が発生しました。</p>
			<button type="button" onClick={reset} className="pixel-button pixel-button-primary">
				再試行
			</button>
		</StatusPanel>
	)
}
