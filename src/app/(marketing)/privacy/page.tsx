import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'プライバシーポリシー',
	description: '当サイトのプライバシーポリシー',
}

export default function PrivacyPage() {
	return (
		<article className="mx-auto max-w-3xl px-4 py-12">
			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<h1>プライバシーポリシー</h1>

				<h2>収集する情報</h2>
				<p>当サイトでは、Google Analyticsを使用してアクセス情報を収集しています。</p>
				<ul>
					<li>IPアドレス（匿名化）</li>
					<li>ブラウザ・デバイス情報</li>
					<li>閲覧ページ・滞在時間</li>
				</ul>

				<h2>Cookieの使用</h2>
				<p>アクセス解析のためCookieを使用します。ブラウザ設定で無効化できます。</p>

				<h2>第三者への提供</h2>
				<p>収集した情報は、法令に基づく場合を除き第三者に提供しません。</p>

				<h2>お問い合わせ</h2>
				<p>プライバシーに関するお問い合わせは以下まで。</p>
				<p>Email: your-email@example.com</p>

				<p className="text-sm text-[var(--muted)]">最終更新日: 2024年1月1日</p>
			</div>
		</article>
	)
}
