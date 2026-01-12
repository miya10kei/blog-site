import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { CookieConsent } from '@/components/CookieConsent'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { SITE_CONFIG } from '@/lib/constants'
import { GA_ID } from '@/lib/gtag'
import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.name,
		template: `%s | ${SITE_CONFIG.name}`,
	},
	description: SITE_CONFIG.description,
	keywords: ['技術ブログ', 'プログラミング', 'Web開発'],
	authors: [{ name: SITE_CONFIG.author.name }],
	creator: SITE_CONFIG.author.name,
	openGraph: {
		type: 'website',
		locale: 'ja_JP',
		url: SITE_CONFIG.url,
		siteName: SITE_CONFIG.name,
		images: [{ url: '/og-default.png', width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		creator: SITE_CONFIG.author.twitter,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: SITE_CONFIG.url,
		types: {
			'application/rss+xml': '/feed.xml',
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				{GA_ID && (
					<>
						<Script
							strategy="afterInteractive"
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
						/>
						<Script id="gtag-init" strategy="afterInteractive">
							{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // デフォルトで拒否（同意後に有効化）- Consent Mode v2
                gtag('consent', 'default', {
                  analytics_storage: 'denied'
                });

                // 既に同意済みの場合は有効化
                if (typeof window !== 'undefined' && localStorage.getItem('cookie-consent') === 'accepted') {
                  gtag('consent', 'update', { analytics_storage: 'granted' });
                }

                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
						</Script>
					</>
				)}
			</head>
			<body className="flex min-h-screen flex-col antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SkipLink />
					<Header />
					<main id="main-content" className="flex-1">
						{children}
					</main>
					<Footer />
					<CookieConsent />
					<GoogleAnalytics />
					<SpeedInsights />
					<VercelAnalytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
