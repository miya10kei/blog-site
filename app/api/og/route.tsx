import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { OG_IMAGE_CONFIG, SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const title = searchParams.get('title') || SITE_CONFIG.name

	// タイトルを制限
	const truncatedTitle =
		title.length > OG_IMAGE_CONFIG.maxTitleLength
			? `${title.slice(0, OG_IMAGE_CONFIG.maxTitleLength)}...`
			: title

	return new ImageResponse(
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#0a0a0a',
				padding: '40px 80px',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
				}}
			>
				<h1
					style={{
						fontSize: '60px',
						fontWeight: 'bold',
						color: '#ededed',
						lineHeight: 1.2,
						marginBottom: '20px',
					}}
				>
					{truncatedTitle}
				</h1>
				<p
					style={{
						fontSize: '24px',
						color: '#a3a3a3',
					}}
				>
					{SITE_CONFIG.name}
				</p>
			</div>
		</div>,
		{
			width: OG_IMAGE_CONFIG.width,
			height: OG_IMAGE_CONFIG.height,
		},
	)
}
