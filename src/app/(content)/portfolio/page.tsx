import type { Metadata } from 'next'
import { type Project, ProjectCard } from '@/features/portfolio/components/ProjectCard'

export const metadata: Metadata = {
	title: 'ポートフォリオ',
	description: '制作物・プロジェクト一覧',
}

// TODO: GitHubからコンテンツを取得するように変更
const projects: Project[] = [
	{
		title: 'Tech Blog',
		description: 'Next.js 16とTailwind CSS v4で構築したモダンな技術ブログ',
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		github: 'https://github.com/user/tech-blog',
	},
]

export default function PortfolioPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-12">
			<h1 className="mb-8 text-3xl font-bold">ポートフォリオ</h1>
			<div className="grid gap-6 md:grid-cols-2">
				{projects.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</div>
	)
}
