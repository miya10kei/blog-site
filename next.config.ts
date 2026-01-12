import type { NextConfig } from 'next'

const securityHeaders = [
	{ key: 'X-DNS-Prefetch-Control', value: 'on' },
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
	{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation()' },
	{
		key: 'Content-Security-Policy',
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https://raw.githubusercontent.com https://*.googletagmanager.com",
			"font-src 'self'",
			"connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.ingest.sentry.io",
			"frame-ancestors 'none'",
		].join('; '),
	},
]

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				pathname: '/user/tech-blog-content/**',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		]
	},
}

export default nextConfig
