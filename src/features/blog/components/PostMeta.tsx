import { formatReadingTime } from '@/lib/reading-time'

type PostMetaProps = {
	date: string
	readingTime: number
}

export function PostMeta({ date, readingTime }: PostMetaProps) {
	return (
		<div className="flex items-center gap-4 text-sm text-[var(--muted)]">
			<time dateTime={date}>{formatDate(date)}</time>
			<span>{formatReadingTime(readingTime)}</span>
		</div>
	)
}

function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
