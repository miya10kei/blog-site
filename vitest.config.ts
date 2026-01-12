import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./__tests__/setup.ts'],
		include: ['**/*.test.{ts,tsx}'],
		exclude: ['node_modules', '.next', 'e2e'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			exclude: ['node_modules', '.next', '**/*.test.{ts,tsx}', '__tests__/setup.ts'],
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './'),
		},
	},
})
