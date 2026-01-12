# CLAUDE.md - AI Assistant Guide

This document provides essential information for AI assistants working with this codebase.

## Project Overview

A production-ready Japanese tech blog platform built with Next.js 16 App Router. Content is stored externally on GitHub (MDX files in a separate repository) and fetched at build/runtime with ISR caching.

## Quick Reference

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm start                # Start production server

# Code Quality
npm run lint             # Check with Biome
npm run lint:fix         # Auto-fix issues
npm run format           # Format code

# Testing
npm run test             # Unit tests (watch mode)
npm run test:run         # Unit tests (single run)
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests (Playwright)
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (content)/          # Route group: blog, portfolio, tags
│   ├── (marketing)/        # Route group: about, privacy
│   ├── api/                # API routes (og, revalidate)
│   ├── [slug]/             # Dynamic blog post pages
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
│   ├── layout/             # Header, Footer, SkipLink
│   └── ui/                 # Button, Card, ThemeToggle
├── features/               # Feature modules (domain-driven)
│   ├── blog/               # Blog components
│   ├── search/             # Search modal and hooks
│   └── portfolio/          # Portfolio components
└── lib/                    # Utilities and business logic
    ├── content.ts          # GitHub content fetching
    ├── mdx.ts              # MDX processing with Shiki
    ├── search.ts           # Fuse.js search implementation
    └── constants.ts        # Site configuration
```

### Key Patterns

**Server vs Client Components:**
- Server Components (default): Data fetching, no interactivity
- Client Components (`'use client'`): Interactive UI, hooks, browser APIs
- Examples of client components: `ThemeToggle`, `SearchModal`, `CookieConsent`

**Content Architecture:**
- Application code in this repo
- MDX content hosted externally on GitHub (`miya10kei/blog-contents` repo)
- Fetched server-side with ISR caching (1 hour revalidation)

**Route Groups:**
- `(content)` - Blog, portfolio, tags pages
- `(marketing)` - About, privacy pages
- Parentheses prevent group name from appearing in URL

## Technology Stack

| Category | Technology | Notes |
|----------|------------|-------|
| Framework | Next.js 16.1.1 | App Router, Server Components |
| Language | TypeScript 5 | Strict mode enabled |
| UI | React 19.2.3 | Latest with RSC support |
| Styling | Tailwind CSS v4 | Utility-first, CSS variables for theming |
| Markdown | MDX + next-mdx-remote-client | JSX in markdown |
| Syntax Highlighting | Shiki 3.21.0 | VSCode-quality |
| Search | Fuse.js 7.1.0 | Client-side fuzzy search |
| Validation | Zod 4.3.5 | Runtime schema validation |
| Testing | Vitest + Playwright | Unit and E2E |
| Linting/Formatting | Biome 2.3.11 | All-in-one (Rust-based) |
| Git Hooks | Husky + lint-staged | Pre-commit linting |

## Code Conventions

### Formatting (Biome)

- **Indentation:** Tabs
- **Line width:** 100 characters
- **Quotes:** Single quotes
- **Semicolons:** As needed (no trailing)
- **Imports:** Auto-organized on save

### TypeScript

- **Strict mode:** Always enabled
- **Path alias:** `@/*` maps to `./src/*`
- **No unused:** Imports and variables are errors

### Component Patterns

```typescript
// Named exports for components
export function Header() {
  return <header>...</header>
}

// Default exports for pages
export default function BlogPage() {
  return <main>...</main>
}

// Props with explicit types
type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  // ...
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PostCard.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `SITE_CONFIG` |
| Files | kebab-case for utils | `reading-time.ts` |
| Test files | Colocated | `content.test.ts` |

### Accessibility Requirements

- WCAG 2.1 Level AA compliance
- Semantic HTML (`<header>`, `<nav>`, `<article>`, `<footer>`)
- Color contrast: 4.5:1+ for normal text
- Focus indicators on interactive elements
- Skip links for keyboard navigation
- ARIA labels where needed

## Testing

### Unit Tests (Vitest)

Tests are colocated with source files: `src/lib/content.test.ts`

```typescript
describe('calculateReadingTime', () => {
  it('should calculate reading time for Japanese text', () => {
    const text = 'あ'.repeat(400)
    expect(calculateReadingTime(text)).toBe(1)
  })
})
```

**Run tests:**
```bash
npm run test           # Watch mode
npm run test:run       # Single run
npm run test:coverage  # With coverage
```

### E2E Tests (Playwright)

Located in `e2e/` directory. Tests run against multiple browsers (Chrome, Firefox, Safari, mobile).

```bash
npm run test:e2e
```

### Test Configuration

- Environment: jsdom
- Setup file: `src/test/setup.ts`
- Coverage: v8 provider with HTML reports

## Environment Variables

Required variables (validated with Zod at runtime):

```bash
# GitHub (required for content fetching)
GITHUB_TOKEN=ghp_...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXX

# ISR Revalidation (optional)
REVALIDATE_SECRET=your-secret

# Sentry (optional)
SENTRY_DSN=https://...
```

## Important Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, theme provider, analytics |
| `src/lib/content.ts` | GitHub content fetching with caching |
| `src/lib/mdx.ts` | MDX processing and Shiki highlighting |
| `src/lib/constants.ts` | Site configuration and metadata |
| `src/lib/env.ts` | Environment variable validation |
| `next.config.ts` | Security headers, remote image patterns |
| `biome.json` | Linting and formatting rules |
| `vitest.config.ts` | Unit test configuration |
| `playwright.config.ts` | E2E test configuration |

## Common Tasks

### Adding a New Component

1. Create component in appropriate directory:
   - `src/components/ui/` for atomic UI components
   - `src/features/[domain]/components/` for domain-specific
2. Use named exports
3. Add tests in same directory: `ComponentName.test.tsx`
4. Run `npm run lint:fix` before committing

### Adding a New Page

1. Create in `src/app/` following App Router conventions
2. Use route groups `(content)` or `(marketing)` if appropriate
3. Export metadata for SEO
4. Use Server Components by default
5. Add `'use client'` only if needed for interactivity

### Modifying Content Fetching

Content logic is in `src/lib/content.ts`:
- `getPostList()` - Get all published posts
- `getPost(slug)` - Get single post by slug
- Uses GitHub raw content URLs with ISR caching

### Running Pre-commit Checks Manually

```bash
npm run lint:fix && npm run format
```

## Security Considerations

- **Slug sanitization:** Remove non-alphanumeric characters to prevent path traversal
- **API authentication:** Secret-based validation for `/api/revalidate`
- **Environment validation:** Zod validates all env vars at startup
- **CSP headers:** Configured in `next.config.ts`

## Git Workflow

- Pre-commit hooks run `lint-staged` automatically
- TypeScript/TSX files are checked with Biome
- JSON/MD files are formatted with Biome

## Notes for AI Assistants

1. **Always read before editing:** Understand existing code patterns before making changes
2. **Run linting:** Execute `npm run lint:fix` after code changes
3. **Test your changes:** Run `npm run test:run` for unit tests
4. **Follow existing patterns:** Match the coding style of surrounding code
5. **Server vs Client:** Default to Server Components; only use `'use client'` when necessary
6. **Japanese locale:** This is a Japanese tech blog - UI text, dates, and reading time calculations are Japanese-oriented
7. **No over-engineering:** Keep solutions simple and focused on the immediate task
8. **Accessibility:** Maintain WCAG 2.1 AA compliance in all UI changes
9. **GitHub CLI (gh):** When using gh commands, always use the `-R miya10kei/blog-site` flag to specify the repository explicitly (required due to sandbox proxy configuration)
