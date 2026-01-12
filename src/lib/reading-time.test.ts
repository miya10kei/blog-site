import { describe, expect, it } from 'vitest'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'

describe('reading-time', () => {
	describe('calculateReadingTime', () => {
		it('should calculate reading time for Japanese text', () => {
			// 400 characters = 1 minute
			const text = 'あ'.repeat(400)
			expect(calculateReadingTime(text)).toBe(1)
		})

		it('should round up to at least 1 minute', () => {
			const text = 'あ'.repeat(100)
			expect(calculateReadingTime(text)).toBe(1)
		})

		it('should calculate longer texts correctly', () => {
			// 800 characters = 2 minutes
			const text = 'あ'.repeat(800)
			expect(calculateReadingTime(text)).toBe(2)
		})

		it('should strip HTML tags', () => {
			const text = `<p>${'あ'.repeat(400)}</p>`
			expect(calculateReadingTime(text)).toBe(1)
		})

		it('should strip code blocks', () => {
			const text = `${'あ'.repeat(400)}\`\`\`typescript\nconst x = 1\n\`\`\``
			expect(calculateReadingTime(text)).toBe(1)
		})

		it('should strip inline code', () => {
			const text = `${'あ'.repeat(400)}\`code\``
			expect(calculateReadingTime(text)).toBe(1)
		})

		it('should ignore whitespace', () => {
			const text = `${'あ'.repeat(400)}   \n\n   \t`
			expect(calculateReadingTime(text)).toBe(1)
		})
	})

	describe('formatReadingTime', () => {
		it('should format reading time in Japanese', () => {
			expect(formatReadingTime(1)).toBe('1分で読めます')
			expect(formatReadingTime(5)).toBe('5分で読めます')
		})
	})
})
