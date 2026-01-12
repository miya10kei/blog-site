import { z } from 'zod'

const envSchema = z.object({
	// GitHub
	GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),

	// Google Analytics
	NEXT_PUBLIC_GA_ID: z
		.string()
		.regex(/^G-[A-Z0-9]+$/, 'Invalid GA4 ID format')
		.optional(),

	// Revalidation
	REVALIDATE_SECRET: z.string().min(16, 'REVALIDATE_SECRET must be at least 16 characters'),

	// Sentry
	NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

	// Vercel (自動設定)
	VERCEL_URL: z.string().optional(),
	VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
})

export type Env = z.infer<typeof envSchema>

// サーバーサイドでのみ検証
export function validateEnv(): Env {
	const result = envSchema.safeParse(process.env)

	if (!result.success) {
		console.error('❌ Environment validation failed:')
		for (const issue of result.error.issues) {
			console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
		}
		throw new Error('Invalid environment variables')
	}

	return result.data
}

// 開発時は検証をスキップ（オプショナルなenvのため）
export function getEnv(): Partial<Env> {
	if (process.env.NODE_ENV === 'development') {
		return {
			GITHUB_TOKEN: process.env.GITHUB_TOKEN,
			NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
			REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
			NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
			VERCEL_URL: process.env.VERCEL_URL,
			VERCEL_ENV: process.env.VERCEL_ENV as Env['VERCEL_ENV'],
		}
	}
	return validateEnv()
}
