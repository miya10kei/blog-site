import Link from 'next/link'
import { StatusPanel } from '@/components/ui/StatusPanel'

export default function NotFound() {
	return (
		<StatusPanel>
			<h1 className="pixel-heading mb-4 text-6xl">404</h1>
			<p className="mb-8 text-lg text-[var(--muted)]">ページが見つかりませんでした</p>
			<Link href="/" className="pixel-button pixel-button-primary">
				ホームへ戻る
			</Link>
		</StatusPanel>
	)
}
