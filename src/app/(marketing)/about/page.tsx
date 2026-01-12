import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
	title: 'About',
	description: `${SITE_CONFIG.author.name}について`,
}

export default function AboutPage() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-12">
			<h1 className="mb-8 text-3xl font-bold">About</h1>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<h2>プロフィール</h2>
				<p>
					{SITE_CONFIG.author.name}
					です。Web開発を中心に技術的な内容を発信しています。
				</p>

				<h2>スキル</h2>
				<ul>
					<li>フロントエンド: React, Next.js, TypeScript</li>
					<li>バックエンド: Node.js, Python, Go</li>
					<li>インフラ: AWS, Docker, Kubernetes</li>
					<li>その他: Git, CI/CD, テスト駆動開発</li>
				</ul>

				<h2>連絡先</h2>
				<p>
					Twitter:{' '}
					<a
						href={`https://twitter.com/${SITE_CONFIG.author.twitter.slice(1)}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{SITE_CONFIG.author.twitter}
					</a>
				</p>
			</div>
		</div>
	)
}
