import { READING_TIME_CONFIG } from './constants'

/**
 * Calculate reading time for content
 * @param content - The content to calculate reading time for
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
	// HTMLタグを除去
	let text = content.replace(/<[^>]*>/g, '')

	// コードブロックを除去
	text = text.replace(/```[\s\S]*?```/g, '')

	// インラインコードを除去
	text = text.replace(/`[^`]*`/g, '')

	// 空白を除去して文字数をカウント
	const charCount = text.replace(/\s/g, '').length

	// 読了時間を計算（日本語は文字数ベース）
	const minutes = Math.ceil(charCount / READING_TIME_CONFIG.wordsPerMinute)

	// 最低1分
	return Math.max(1, minutes)
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number): string {
	return `${minutes}分で読めます`
}
