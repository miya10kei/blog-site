# Tech Blog 実装プラン

## 概要

技術ブログ、個人ブログ、ポートフォリオを兼ねたモダンなブログサイトを構築する。

## リポジトリ構成

コードとコンテンツを分離した2リポジトリ構成を採用する。
コンテンツはランタイムで取得し、CDNでキャッシュする。

```
┌─────────────────────────────────────────────────────────────┐
│  tech-blog (メインリポジトリ)                                │
│  - Next.js アプリケーションコード                            │
│  - コンポーネント、スタイル、設定                            │
│                                                             │
│         ↓ ランタイムで取得 (GitHub API)                     │
│         ↓ CDNキャッシュ (Vercel Edge)                       │
│                                                             │
│  tech-blog-content (コンテンツリポジトリ)                    │
│  - ブログ記事 (MDX)                                          │
│  - ポートフォリオ (MDX)                                      │
│  - 画像アセット                                              │
└─────────────────────────────────────────────────────────────┘
```

| リポジトリ | 役割 | 更新頻度 |
|------------|------|----------|
| `tech-blog` | アプリケーションコード | 機能追加時 |
| `tech-blog-content` | 記事・コンテンツ | 記事投稿時 |

### メリット
- コードと記事の関心を分離
- Submodule不要でシンプルな運用
- 記事更新時に再デプロイ不要（ISRで自動反映）
- CDNキャッシュで高速配信

### コンテンツ取得フロー

```
1. ユーザーがページにアクセス
2. Vercel Edge (CDN) がキャッシュを確認
3. キャッシュあり → 即座にレスポンス
4. キャッシュなし/期限切れ → ISRでバックグラウンド再生成
   └── GitHub Raw URL から MDX を取得
   └── next-mdx-remote-client でパース
   └── HTMLを生成してキャッシュ更新
```

## 技術スタック

| カテゴリ | 技術 | 理由 |
|----------|------|------|
| フレームワーク | Next.js 15 (App Router) | Turbopack標準、React 19対応、最新 |
| 言語 | TypeScript | 型安全、開発体験向上 |
| スタイリング | Tailwind CSS v4 | Oxide Engine (5x高速)、Zero config |
| マークダウン | MDX + next-mdx-remote-client | 活発メンテ、MDX v3、React 19対応 |
| コードハイライト | Shiki | VSCode同等のハイライト |
| ダークモード | next-themes | 簡単実装、フラッシュ防止 |
| 検索 | Fuse.js | クライアントサイド、ランタイムコンテンツ対応 |
| テスト | Vitest + React Testing Library | 高速、ESM対応、DX良好 |
| E2Eテスト | Playwright | クロスブラウザ対応、非同期RSC対応 |
| Linter/Formatter | Biome | 超高速、ESLint+Prettier統合、Rust製 |
| アクセス解析 | Google Analytics 4 | 詳細なユーザー分析 |
| オブザーバビリティ | Vercel Analytics + Speed Insights | 無料、Core Web Vitals監視 |
| ホスティング | Vercel | Next.js最適、Edge Runtime対応 |

### Next.js 15 の新機能活用

- **Turbopack**: 開発時ビルド高速化 (`next dev --turbo`)
- **React 19**: Server Components安定化、Actions改善
- **Streaming**: Suspenseによる段階的表示
- **Edge Runtime**: グローバル低レイテンシ配信

## ディレクトリ構造

```
tech-blog/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト
│   ├── loading.tsx             # グローバルローディングUI
│   ├── error.tsx               # グローバルエラーUI
│   ├── not-found.tsx           # 404ページ
│   ├── (marketing)/            # Route Group: マーケティング
│   │   ├── page.tsx            # ホームページ
│   │   └── about/
│   │       └── page.tsx        # 自己紹介
│   ├── (content)/              # Route Group: コンテンツ
│   │   ├── blog/
│   │   │   ├── page.tsx        # ブログ一覧
│   │   │   ├── loading.tsx     # ブログローディング
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 記事詳細
│   │   ├── portfolio/
│   │   │   └── page.tsx        # ポートフォリオ
│   │   └── tags/
│   │       ├── page.tsx        # タグ一覧
│   │       └── [tag]/
│   │           └── page.tsx    # タグ別記事
│   ├── api/
│   │   ├── revalidate/
│   │   │   └── route.ts        # On-demand Revalidation
│   │   └── og/
│   │       └── route.tsx       # OGP画像生成
│   ├── feed.xml/
│   │   └── route.ts            # RSS フィード
│   ├── sitemap.ts              # サイトマップ
│   └── robots.ts               # robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── ui/                     # 共通UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ThemeToggle.tsx
│   ├── GoogleAnalytics.tsx     # GAページビュー
│   └── JsonLd.tsx              # 構造化データ
├── features/                   # 機能別モジュール
│   ├── blog/
│   │   ├── components/
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostList.tsx
│   │   │   ├── PostMeta.tsx          # 日付・読了時間
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   ├── CodeBlock.tsx         # コピーボタン付き
│   │   │   └── ContentImage.tsx      # 画像最適化
│   │   ├── hooks/
│   │   │   └── useTableOfContents.ts
│   │   └── utils/
│   │       └── parse-frontmatter.ts
│   ├── portfolio/
│   │   └── components/
│   │       └── ProjectCard.tsx
│   └── search/
│       ├── components/
│       │   └── SearchModal.tsx
│       └── hooks/
│           └── useSearch.ts
├── lib/
│   ├── content.ts              # コンテンツ取得 (GitHub API)
│   ├── gtag.ts                 # Google Analytics ヘルパー
│   ├── mdx.ts                  # MDXパース・コンポーネント
│   ├── reading-time.ts         # 読了時間計算
│   ├── search.ts               # Fuse.js検索
│   └── utils.ts                # ユーティリティ
├── __tests__/
│   ├── components/
│   ├── features/
│   ├── lib/
│   └── e2e/                    # Playwright E2Eテスト
├── public/
│   └── images/
├── app/globals.css             # Tailwind v4 (CSS内で設定)
├── postcss.config.mjs          # Tailwind v4 PostCSS設定
├── vitest.config.ts
├── playwright.config.ts
├── biome.json
├── next.config.ts              # セキュリティヘッダー + 画像設定
└── package.json
```

### Tailwind CSS v4 の設定

v4では `tailwind.config.ts` が不要。CSSファイル内で設定：

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.6 0.15 250);
  --color-accent: oklch(0.65 0.15 300);
  --font-sans: "Inter", sans-serif;
}
```

### コンテンツリポジトリ構造 (tech-blog-content)

フラット構造を採用（日付はfrontmatterで管理）：

```
tech-blog-content/
├── blog/
│   ├── hello-world.mdx
│   ├── getting-started-nextjs.mdx
│   └── new-year-goals.mdx
├── projects/
│   ├── project-1.mdx
│   └── project-2.mdx
├── images/
│   ├── blog/
│   │   └── hello-world/
│   │       └── cover.png
│   └── projects/
│       └── project-1/
│           └── screenshot.png
└── README.md
```

### コンテンツ取得の実装

```typescript
// lib/content.ts
import { getFrontmatter } from 'next-mdx-remote-client/utils'

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/user/tech-blog-content/main'

export async function getPost(slug: string) {
  // セキュリティ: slugをサニタイズ
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '')
  const url = `${GITHUB_RAW_BASE}/blog/${sanitizedSlug}.mdx`
  const response = await fetch(url, {
    next: { revalidate: 3600 } // 1時間キャッシュ
  })
  return response.text()
}

export async function getPostList() {
  // GitHub API で記事一覧を取得
  const url = 'https://api.github.com/repos/user/tech-blog-content/contents/blog'
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
    next: { revalidate: 3600 }
  })
  const files = await response.json() as { name: string }[]

  // 各記事のメタデータを取得
  const posts = await Promise.all(
    files
      .filter((file) => file.name.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.name.replace('.mdx', '')
        const meta = await getPostMeta(slug)
        return { slug, ...meta }
      })
  )

  // 日付で降順ソート
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostMeta(slug: string) {
  const source = await getPost(slug)
  const { frontmatter } = getFrontmatter<Frontmatter>(source)
  return frontmatter
}

// 型定義
type Frontmatter = {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  published: boolean
}
```

```typescript
// app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { Suspense } from 'react'
import { getPost } from '@/lib/content'
import { mdxComponents } from '@/lib/mdx'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const source = await getPost(params.slug)

  return (
    <article>
      <Suspense fallback={<div>Loading...</div>}>
        <MDXRemote source={source} components={mdxComponents} />
      </Suspense>
    </article>
  )
}

// ISR: 1時間ごとに再生成
export const revalidate = 3600
```

### next-mdx-remote-client の利点

```typescript
// 1. frontmatterをコンパイルなしで取得
import { getFrontmatter } from 'next-mdx-remote-client/utils'

const { frontmatter, strippedSource } = getFrontmatter<Frontmatter>(source)
// → コンパイル前にメタデータを取得可能

// 2. App Router専用のRSCコンポーネント
import { MDXRemote } from 'next-mdx-remote-client/rsc'

// 3. import/export文のサポート
// MDXファイル内で import { Chart } from './Chart' が使用可能
```

### On-demand Revalidation

記事更新時に即座にキャッシュを更新：

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { slug, secret } = await request.json()

  // Webhookシークレットを検証
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')

  return Response.json({ revalidated: true, slug })
}
```

### セキュリティ注意事項

⚠️ **next-mdx-remote-client のセキュリティ**

MDXはJavaScriptにコンパイルされサーバーで実行される。

| リスク | 対策 |
|--------|------|
| RCE (リモートコード実行) | 信頼できるソース（自分のGitHubリポジトリ）のみから取得 |
| XSS | ユーザー入力をMDXに含めない |
| パストラバーサル | slugをサニタイズ |

```typescript
// ❌ 危険: ユーザー入力を直接使用
<MDXRemote source={userInput} />

// ✅ 安全: 信頼できるソースのみ
const source = await getPost(sanitizedSlug) // GitHub Raw のみ
<MDXRemote source={source} components={allowedComponents} />
```

### キャッシュ戦略

| レイヤー | TTL | 役割 |
|----------|-----|------|
| Vercel Edge (CDN) | 1時間 | グローバル配信、最速 |
| Next.js ISR | 1時間 | バックグラウンド再生成 |
| GitHub Raw | - | 常に最新を返す |

### 環境変数

```bash
# .env.local
GITHUB_TOKEN=ghp_xxxx  # GitHub Personal Access Token (任意)
CONTENT_REPO=user/tech-blog-content
REVALIDATE_SECRET=your-secret-key  # On-demand Revalidation用
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX     # Google Analytics

# Vercel デプロイ用 (GitHub Secrets)
VERCEL_TOKEN=xxxx
VERCEL_ORG_ID=xxxx
VERCEL_PROJECT_ID=xxxx
```

## ページ構成

### 1. ホームページ (`/`)
- ヒーローセクション（自己紹介）
- 最新記事 3〜5件
- ポートフォリオハイライト
- SNSリンク

### 2. ブログ一覧 (`/blog`)
- 記事カード一覧（ページネーション）
- カテゴリフィルター
- タグフィルター

### 3. ブログ記事詳細 (`/blog/[slug]`)
- 記事タイトル・メタ情報
- 目次（Table of Contents）
- 記事本文（MDX）
- SNSシェアボタン
- 前後の記事リンク

### 4. ポートフォリオ (`/portfolio`)
- プロジェクト一覧
- 技術スタック表示
- GitHub/デモリンク

### 5. 自己紹介 (`/about`)
- プロフィール
- スキル一覧
- 経歴
- SNSリンク

### 6. タグ/カテゴリページ
- タグ別記事一覧
- カテゴリ別記事一覧

## 機能詳細

### 1. マークダウン記事管理
```mdx
---
title: "記事タイトル"
description: "記事の説明"
date: "2024-01-10"
category: "技術"
tags: ["Next.js", "React", "TypeScript"]
published: true
---

# 見出し

本文...
```

### 2. ダークモード
- システム設定に追従
- 手動切替可能
- LocalStorageで保存

### 3. 検索機能
- Fuse.jsによるファジー検索（ランタイムコンテンツ対応）
- キーボードショートカット (Cmd/Ctrl + K)
- 検索結果ハイライト

```typescript
// lib/search.ts
import Fuse from 'fuse.js'

const fuseOptions = {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,
  includeScore: true
}

export function createSearchIndex(posts: Post[]) {
  return new Fuse(posts, fuseOptions)
}

export function searchPosts(fuse: Fuse<Post>, query: string) {
  return fuse.search(query).map(result => result.item)
}
```

### 4. RSS フィード
- `/feed.xml` でRSSフィード提供
- 記事更新時に自動生成

### 5. SEO対策

#### メタデータ設定 (Next.js 15 Metadata API)

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Tech Blog',
    template: '%s | Tech Blog'
  },
  description: '技術ブログ、個人ブログ、ポートフォリオ',
  keywords: ['技術ブログ', 'プログラミング', 'Web開発'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://yourdomain.com',
    siteName: 'Tech Blog',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://yourdomain.com',
    types: {
      'application/rss+xml': '/feed.xml'
    }
  }
}
```

#### 動的メタデータ (記事ページ)

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPost, getPostMeta } from '@/lib/content'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = await getPostMeta(params.slug)

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: meta.date,
      authors: ['Your Name'],
      tags: meta.tags,
      images: [{
        url: `/api/og?title=${encodeURIComponent(meta.title)}`,
        width: 1200,
        height: 630,
        alt: meta.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    }
  }
}
```

#### OGP画像自動生成

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Tech Blog'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '40px'
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#ededed',
            textAlign: 'center',
            lineHeight: 1.4
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#888',
            marginTop: '20px'
          }}
        >
          Tech Blog
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

#### sitemap.xml

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPostList } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostList()
  const baseUrl = 'https://yourdomain.com'

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    ...blogEntries
  ]
}
```

#### robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/']
    },
    sitemap: 'https://yourdomain.com/sitemap.xml'
  }
}
```

#### JSON-LD 構造化データ

```typescript
// components/JsonLd.tsx
type ArticleJsonLdProps = {
  title: string
  description: string
  date: string
  url: string
  image: string
}

export function ArticleJsonLd({ title, description, date, url, image }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: 'Your Name',
      url: 'https://yourdomain.com/about'
    },
    publisher: {
      '@type': 'Person',
      name: 'Your Name'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// 使用例: app/blog/[slug]/page.tsx
<ArticleJsonLd
  title={meta.title}
  description={meta.description}
  date={meta.date}
  url={`https://yourdomain.com/blog/${slug}`}
  image={`https://yourdomain.com/api/og?title=${encodeURIComponent(meta.title)}`}
/>
```

### 6. パフォーマンス最適化
- 画像最適化 (next/image)
- ISR (Incremental Static Regeneration)
- フォント最適化
- **Turbopack** 開発ビルド高速化
- **Streaming** Suspenseによる段階的表示
- **Edge Runtime** 低レイテンシ配信

### 7. Google Analytics

アクセス解析のためにGoogle Analytics 4 (GA4) を導入。

```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID!, {
    page_path: url
  })
}

export const event = (action: string, category: string, label: string, value?: number) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
```

※ layout.tsx の統合サンプルは「Vercel Observability」セクションを参照

### 8. Error/Loading UI

```typescript
// app/error.tsx - グローバルエラーUI
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  )
}

// app/loading.tsx - グローバルローディングUI
export default function Loading() {
  return <div>読み込み中...</div>
}

// app/(content)/blog/loading.tsx - ブログ専用ローディング
export default function BlogLoading() {
  return <PostCardSkeleton />
}
```

### 9. セキュリティヘッダー

```typescript
// next.config.ts (統合版)
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation()' }
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/user/tech-blog-content/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  }
}

export default nextConfig
```

| ヘッダー | 効果 |
|----------|------|
| `Strict-Transport-Security` | HTTPS強制 |
| `X-Frame-Options` | クリックジャッキング防止 |
| `X-Content-Type-Options` | MIMEスニッフィング防止 |
| `Referrer-Policy` | リファラー情報制御 |
| `Permissions-Policy` | ブラウザ機能の制限 |

### 10. 読了時間

```typescript
// lib/reading-time.ts
const WORDS_PER_MINUTE = 400 // 日本語は文字数ベース

export function calculateReadingTime(content: string): number {
  // HTMLタグとコードブロックを除去
  const text = content
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')

  // 日本語文字数をカウント
  const charCount = text.replace(/\s/g, '').length
  const minutes = Math.ceil(charCount / WORDS_PER_MINUTE)

  return Math.max(1, minutes)
}

// 使用例
export function formatReadingTime(minutes: number): string {
  return `${minutes}分で読めます`
}
```

```typescript
// features/blog/components/PostMeta.tsx
type Props = {
  date: string
  readingTime: number
}

export function PostMeta({ date, readingTime }: Props) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <time dateTime={date}>{formatDate(date)}</time>
      <span>・</span>
      <span>{readingTime}分で読めます</span>
    </div>
  )
}
```

### 11. コードコピーボタン

```typescript
// features/blog/components/CodeBlock.tsx
'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type Props = {
  code: string
  language?: string
}

export function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-md bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="コードをコピー"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
```

```typescript
// lib/mdx.ts - MDXコンポーネント (統合版)
import { CodeBlock } from '@/features/blog/components/CodeBlock'
import { ContentImage } from '@/features/blog/components/ContentImage'

export const mdxComponents = {
  pre: ({ children, ...props }) => {
    const code = children?.props?.children
    const language = children?.props?.className?.replace('language-', '')
    return <CodeBlock code={code} language={language} {...props} />
  },
  img: ({ src, alt, ...props }) => (
    <ContentImage src={src} alt={alt} {...props} />
  )
}
```

### 12. コンテンツ画像の最適化

GitHub Raw URL から取得した画像を next/image で最適化（設定は `next.config.ts` 統合版を参照）：

```typescript
// features/blog/components/ContentImage.tsx
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  caption?: string
}

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/user/tech-blog-content/main'

export function ContentImage({ src, alt, caption }: Props) {
  // 相対パスをGitHub Raw URLに変換
  const imageSrc = src.startsWith('http') ? src : `${GITHUB_RAW_BASE}${src}`

  return (
    <figure className="my-8">
      <Image
        src={imageSrc}
        alt={alt}
        width={800}
        height={450}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
```

**画像使用例 (MDX内):**
```mdx
![スクリーンショット](/images/blog/hello-world/screenshot.png)
```

## テスト戦略 (TDD)

### TDD開発サイクル
```
Red → Green → Refactor

1. Red:    失敗するテストを書く
2. Green:  テストが通る最小限のコードを書く
3. Refactor: コードをリファクタリング（テストは通ったまま）
```

### テストの種類

| 種類 | ツール | 対象 | 実行タイミング |
|------|--------|------|----------------|
| ユニットテスト | Vitest | 関数、ユーティリティ | 常時（watch mode） |
| コンポーネントテスト | Vitest + RTL | Client / 同期Server Components | 常時（watch mode） |
| E2Eテスト | Playwright | **非同期Server Components**、ユーザーフロー | CI/CD、リリース前 |

### ⚠️ 非同期Server Componentsのテスト

Vitestは非同期Server Componentsをサポートしていない。E2Eテストで対応：

```typescript
// ❌ Vitestでテスト不可（非同期Server Component）
export default async function PostPage() {
  const data = await fetch(...)  // 非同期
  return <div>{data}</div>
}

// ✅ Playwrightでテスト
test('post page should render content', async ({ page }) => {
  await page.goto('/blog/hello-world')
  await expect(page.locator('article')).toBeVisible()
})
```

| コンポーネント種類 | Vitest | Playwright |
|-------------------|--------|------------|
| Client Components | ✅ | ✅ |
| 同期 Server Components | ✅ | ✅ |
| 非同期 Server Components | ❌ | ✅ |

### テスト方針

#### 1. ユニットテスト
- `lib/` 配下のユーティリティ関数
- 日付フォーマット、スラッグ生成、タグ処理など
- カバレッジ目標: 90%以上

```typescript
// 例: lib/utils.test.ts
describe('formatDate', () => {
  it('should format date to Japanese locale', () => {
    expect(formatDate('2024-01-10')).toBe('2024年1月10日')
  })
})
```

#### 2. コンポーネントテスト
- 重要なUIコンポーネント
- ユーザーインタラクション
- アクセシビリティ

```typescript
// 例: components/PostCard.test.tsx
describe('PostCard', () => {
  it('should render post title and description', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByRole('heading')).toHaveTextContent('記事タイトル')
  })

  it('should navigate to post detail on click', async () => {
    // ...
  })
})
```

#### 3. E2Eテスト
- クリティカルなユーザーフロー
- ページ遷移
- 検索機能
- ダークモード切替

```typescript
// 例: e2e/blog.spec.ts
test('should navigate from blog list to post detail', async ({ page }) => {
  await page.goto('/blog')
  await page.click('text=最初の記事')
  await expect(page).toHaveURL(/\/blog\/first-post/)
})
```

### テストコマンド

```bash
# ユニット/コンポーネントテスト
npm run test          # 一回実行
npm run test:watch    # watch mode（TDD用）
npm run test:coverage # カバレッジレポート

# E2Eテスト
npm run test:e2e      # ヘッドレス実行
npm run test:e2e:ui   # UI mode（デバッグ用）
```

### Biome コマンド

```bash
# Lint + Format チェック
npm run check         # lint + format チェック（CI用）

# 自動修正
npm run check:fix     # lint + format 自動修正

# 個別実行
npm run lint          # lintのみ
npm run format        # formatのみ
```

### CI/CD でのテスト

```yaml
# GitHub Actions
- name: Run Biome check
  run: npm run check

- name: Run unit tests
  run: npm run test:coverage

- name: Run E2E tests
  run: npm run test:e2e
```

### GitHub Release でデプロイ

GitHubでリリースを作成したら自動でVercelにデプロイする。

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: |
          npm run check
          npm run test:coverage
          npm run test:e2e

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

**セットアップ手順:**
1. Vercelダッシュボードで「Settings > Tokens」からトークンを取得
2. プロジェクトの「Settings > General」からOrg IDとProject IDを取得
3. GitHubリポジトリの「Settings > Secrets」に登録:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

**リリースフロー:**
```
1. git tag v1.0.0
2. git push origin v1.0.0
3. GitHub上でRelease作成
4. → GitHub Actions起動
5. → テスト実行
6. → Vercel本番デプロイ
```

### Vercel Observability (無料機能のみ)

Vercelの無料オブザーバビリティ機能でモニタリング。

| 機能 | 説明 | 制限 |
|------|------|------|
| **Insights** | Edge Request、Functions、ISR、画像最適化のメトリクス | 無制限 |
| **Logs** | ビルド・ランタイム・関数ログ | 1時間保持 |
| **Speed Insights** | Core Web Vitalsモニタリング | 無制限 |
| **Web Analytics** | プライバシーフレンドリーなアクセス解析 | 2,500イベント/月 |

**統合 layout.tsx (GA + Vercel Analytics):**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'Tech Blog',
    template: '%s | Tech Blog'
  },
  description: '技術ブログ・ポートフォリオサイト',
  metadataBase: new URL('https://yourdomain.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>
        {children}
        <GoogleAnalytics />
        <SpeedInsights />
        <VercelAnalytics />
      </body>
    </html>
  )
}
```

```typescript
// components/GoogleAnalytics.tsx
'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url
    })
  }, [pathname, searchParams])

  return null
}
```

**依存関係追加:**
```bash
npm install @vercel/speed-insights @vercel/analytics
```

## デザイン方針

### カラーパレット
```
Light Mode:
- Background: #ffffff
- Text: #1a1a1a
- Primary: #3b82f6 (Blue)
- Accent: #8b5cf6 (Purple)

Dark Mode:
- Background: #0a0a0a
- Text: #ededed
- Primary: #60a5fa
- Accent: #a78bfa
```

### タイポグラフィ
- 見出し: Inter または Noto Sans JP
- 本文: システムフォント
- コード: JetBrains Mono

### レスポンシブ対応
- Mobile First
- ブレークポイント: sm(640px), md(768px), lg(1024px), xl(1280px)

## 実装ステップ

### Phase 1: プロジェクト初期設定
1. Next.js プロジェクト作成
2. TypeScript 設定
3. Tailwind CSS 設定
4. **Biome 設定 (Linter + Formatter)**
5. **Vitest + React Testing Library 設定**
6. **Playwright 設定**
7. **コンテンツリポジトリ作成 (tech-blog-content)**
8. 基本的なディレクトリ構造作成

### Phase 2: レイアウト・UI構築 (TDD)
1. ヘッダーのテスト作成 → 実装
2. フッターのテスト作成 → 実装
3. ナビゲーションのテスト作成 → 実装
4. ダークモードのテスト作成 → 実装
5. 基本UIコンポーネントのテスト作成 → 実装

### Phase 3: コンテンツ管理 (TDD)
1. GitHub API コンテンツ取得のテスト作成 → 実装
2. next-mdx-remote-client 設定
3. コードハイライト (Shiki)
4. ISR + CDNキャッシュ設定
5. サンプル記事作成（コンテンツリポジトリ）

### Phase 4: ページ実装 (TDD)
1. ホームページのテスト作成 → 実装
2. ブログ一覧のテスト作成 → 実装
3. ブログ詳細のテスト作成 → 実装
4. ポートフォリオのテスト作成 → 実装
5. Aboutページのテスト作成 → 実装
6. タグ/カテゴリページのテスト作成 → 実装

### Phase 5: 機能追加 (TDD)
1. 目次コンポーネントのテスト作成 → 実装
2. SNSシェアボタンのテスト作成 → 実装
3. 検索機能のテスト作成 → 実装 (Fuse.js)
4. RSS フィードのテスト作成 → 実装
5. 読了時間のテスト作成 → 実装
6. コードコピーボタンのテスト作成 → 実装
7. コンテンツ画像コンポーネントのテスト作成 → 実装

### Phase 6: 最適化・デプロイ
1. E2Eテスト作成（クリティカルパス）
2. SEO対策
3. パフォーマンス最適化
4. Google Analytics 設定
5. Vercel Analytics / Speed Insights 設定
6. CI/CD パイプライン設定（テスト自動実行）
7. GitHub Release デプロイ設定
8. Vercel デプロイ設定
9. カスタムドメイン設定（任意）

## 使用ライブラリ

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-themes": "^0.4.0",
    "next-mdx-remote-client": "^2.0.0",
    "lucide-react": "^0.400.0",
    "fuse.js": "^7.0.0",
    "@vercel/speed-insights": "^1.0.0",
    "@vercel/analytics": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "shiki": "^1.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@biomejs/biome": "^1.9.0",
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^25.0.0",
    "@playwright/test": "^1.48.0"
  }
}
```

## 今後の拡張案（任意）

- [ ] i18n 多言語対応
- [ ] ニュースレター登録
- [ ] View Count（閲覧数）
- [ ] いいねボタン
- [ ] 関連記事表示
- [ ] 記事シリーズ機能
- [ ] AI による記事要約

---

このプランに基づいて実装を進めます。
