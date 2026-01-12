'use client'

import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { PostMeta } from '@/lib/content'

type SearchModalProps = {
	isOpen: boolean
	onClose: () => void
	query: string
	onQueryChange: (query: string) => void
	results: Array<{ item: PostMeta; score?: number }>
}

export function SearchModal({ isOpen, onClose, query, onQueryChange, results }: SearchModalProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				if (!isOpen) {
					// 親コンポーネントで処理
				} else {
					onClose()
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
			{/* Backdrop */}
			<button
				type="button"
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
				aria-label="検索を閉じる"
			/>

			{/* Modal */}
			<div className="relative z-10 w-full max-w-xl rounded-lg border border-[var(--muted)]/20 bg-[var(--background)] shadow-2xl">
				{/* Search input */}
				<div className="flex items-center border-b border-[var(--muted)]/20 px-4">
					<Search className="h-5 w-5 text-[var(--muted)]" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						placeholder="記事を検索..."
						className="flex-1 bg-transparent px-4 py-4 outline-none placeholder:text-[var(--muted)]"
					/>
					<button
						type="button"
						onClick={onClose}
						className="rounded p-1 hover:bg-[var(--muted)]/10"
						aria-label="閉じる"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Results */}
				<div className="max-h-[50vh] overflow-y-auto p-2">
					{query && results.length === 0 && (
						<p className="p-4 text-center text-[var(--muted)]">検索結果がありません</p>
					)}
					{results.map(({ item }) => (
						<Link
							key={item.slug}
							href={`/blog/${item.slug}`}
							onClick={onClose}
							className="block rounded-lg p-4 transition-colors hover:bg-[var(--muted)]/10"
						>
							<h3 className="font-semibold">{item.title}</h3>
							{item.description && (
								<p className="mt-1 text-sm text-[var(--muted)] line-clamp-1">{item.description}</p>
							)}
						</Link>
					))}
				</div>

				{/* Footer */}
				<div className="border-t border-[var(--muted)]/20 px-4 py-2 text-xs text-[var(--muted)]">
					<kbd className="rounded border border-[var(--muted)]/20 px-1.5 py-0.5">Esc</kbd> で閉じる
				</div>
			</div>
		</div>
	)
}
