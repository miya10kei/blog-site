import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export type Project = {
	title: string
	description: string
	image?: string
	tags: string[]
	github?: string
	demo?: string
	slug?: string
}

type ProjectCardProps = {
	project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<article className="group overflow-hidden rounded-lg border border-[var(--muted)]/20 transition-shadow hover:shadow-lg">
			{project.image && (
				<div className="relative aspect-video overflow-hidden bg-[var(--muted)]/10">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
			)}
			<div className="p-6">
				<h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
				<p className="mb-4 text-[var(--muted)] line-clamp-2">{project.description}</p>

				<div className="mb-4 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span key={tag} className="rounded-full bg-[var(--muted)]/10 px-2 py-0.5 text-xs">
							{tag}
						</span>
					))}
				</div>

				<div className="flex gap-4">
					{project.github && (
						<Link
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
						>
							<Github className="h-4 w-4" />
							GitHub
						</Link>
					)}
					{project.demo && (
						<Link
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
						>
							<ExternalLink className="h-4 w-4" />
							Demo
						</Link>
					)}
				</div>
			</div>
		</article>
	)
}
