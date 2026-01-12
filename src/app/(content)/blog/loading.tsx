export default function BlogLoading() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<div className="mb-8 h-9 w-32 animate-pulse rounded bg-[var(--muted)]/20" />
			<div className="grid gap-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="rounded-lg border border-[var(--muted)]/20 p-6">
						<div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-[var(--muted)]/20" />
						<div className="mb-4 h-5 w-full animate-pulse rounded bg-[var(--muted)]/20" />
						<div className="flex gap-4">
							<div className="h-4 w-24 animate-pulse rounded bg-[var(--muted)]/20" />
							<div className="h-4 w-20 animate-pulse rounded bg-[var(--muted)]/20" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
