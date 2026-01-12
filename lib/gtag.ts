export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const isGAEnabled = (): boolean => {
	return typeof window !== 'undefined' && !!GA_ID
}

// ページビューを送信
export const pageview = (url: string): void => {
	if (!isGAEnabled()) return
	window.gtag?.('config', GA_ID, {
		page_path: url,
	})
}

// イベントを送信
export const event = ({
	action,
	category,
	label,
	value,
}: {
	action: string
	category: string
	label?: string
	value?: number
}): void => {
	if (!isGAEnabled()) return
	window.gtag?.('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	})
}

// 同意状態を更新
export const updateConsent = (granted: boolean): void => {
	if (!isGAEnabled()) return
	window.gtag?.('consent', 'update', {
		analytics_storage: granted ? 'granted' : 'denied',
	})
}

// 型定義
declare global {
	interface Window {
		gtag?: (
			command: 'config' | 'event' | 'consent' | 'js',
			targetIdOrAction: string | Date,
			params?: Record<string, unknown>,
		) => void
		dataLayer?: unknown[]
	}
}
