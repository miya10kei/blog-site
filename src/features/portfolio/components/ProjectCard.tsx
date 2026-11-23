import { ExternalLink } from 'lucide-react'
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
		<article className="pixel-box pixel-box-interactive overflow-hidden">
			{project.image && (
				<div className="relative aspect-video overflow-hidden border-b-2 border-[var(--line)] bg-[var(--surface-raised)]">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover [image-rendering:pixelated]"
					/>
				</div>
			)}
			<div className="p-6">
				<h3 className="pixel-heading mb-2 text-xl">{project.title}</h3>
				<p className="mb-4 text-[var(--muted)] line-clamp-2">{project.description}</p>

				<div className="mb-4 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span key={tag} className="pixel-tag">
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
							className="pixel-nav-link gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
						>
							<GithubIcon className="h-4 w-4" />
							GitHub
						</Link>
					)}
					{project.demo && (
						<Link
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							className="pixel-nav-link gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
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

// lucide-react 1.x で削除されたブランドアイコンを 0.562.0 (ISC License) から移植
function GithubIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	)
}
