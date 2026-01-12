export const SITE_CONFIG = {
	name: 'Tech Blog',
	description: '技術ブログ、個人ブログ、ポートフォリオ',
	url: 'https://yourdomain.com',
	author: {
		name: 'Your Name',
		twitter: '@yourhandle',
	},
} as const

export const GITHUB_CONFIG = {
	rawBase: 'https://raw.githubusercontent.com/miya10kei/blog-contents/main',
	apiBase: 'https://api.github.com/repos/miya10kei/blog-contents/contents',
	contentRepo: 'miya10kei/blog-contents',
} as const

export const CACHE_CONFIG = {
	revalidateSeconds: 3600, // 1時間
	staleWhileRevalidate: 86400, // 24時間
} as const

export const READING_TIME_CONFIG = {
	wordsPerMinute: 400, // 日本語は文字数ベース
} as const

export const OG_IMAGE_CONFIG = {
	width: 1200,
	height: 630,
	maxTitleLength: 100,
} as const

// WCAG AA準拠 (コントラスト比 4.5:1 以上)
export const A11Y_COLORS = {
	light: {
		text: '#1a1a1a', // on #ffffff = 16.1:1 ✓
		textMuted: '#525252', // on #ffffff = 7.5:1 ✓
		primary: '#2563eb', // on #ffffff = 4.5:1 ✓
	},
	dark: {
		text: '#ededed', // on #0a0a0a = 15.3:1 ✓
		textMuted: '#a3a3a3', // on #0a0a0a = 7.2:1 ✓
		primary: '#60a5fa', // on #0a0a0a = 6.8:1 ✓
	},
} as const
