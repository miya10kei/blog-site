export default function BlogLoading() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<div className="pixel-skeleton mb-10 h-16 w-48 animate-pulse" />
			<div className="grid gap-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="pixel-box p-6">
						<div className="pixel-skeleton mb-2 h-7 w-3/4 animate-pulse" />
						<div className="pixel-skeleton mb-4 h-5 w-full animate-pulse" />
						<div className="flex gap-4">
							<div className="pixel-skeleton h-4 w-24 animate-pulse" />
							<div className="pixel-skeleton h-4 w-20 animate-pulse" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
