# Blog Site

技術ブログ、個人ブログ、ポートフォリオを統合したモダンなブログサイトです。

## 主な特徴

- **MDXサポート** - JSXコンポーネントを埋め込めるMarkdownで記事を執筆
- **ダークモード** - OS設定連動＋手動切替に対応
- **全文検索** - Fuse.jsによるファジーマッチング検索（Cmd/Ctrl+K）
- **SEO最適化** - メタデータ、OGP画像自動生成、sitemap、RSS対応
- **コード分離アーキテクチャ** - アプリケーションコードとコンテンツを別リポジトリで管理
- **アクセシビリティ** - WCAG 2.1 Level AA準拠

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router) |
| 言語 | [TypeScript](https://www.typescriptlang.org/) 5 |
| UI | [React](https://react.dev/) 19 |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4 |
| MDX処理 | [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) + [Shiki](https://shiki.style/) |
| 検索 | [Fuse.js](https://www.fusejs.io/) |
| テスト | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| Linter/Formatter | [Biome](https://biomejs.dev/) |
| 分析 | [Vercel Analytics](https://vercel.com/analytics) + [Google Analytics](https://analytics.google.com/) |
| エラー監視 | [Sentry](https://sentry.io/) |

## セットアップ

### 必要な環境

- Node.js 18以上
- npm 9以上

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd blog-site

# 依存関係をインストール
npm install

# Git hooksを設定
npm run prepare
```

### 環境変数

`.env.local` ファイルを作成し、以下の環境変数を設定してください。

```env
# 必須：コンテンツリポジトリの情報
GITHUB_TOKEN=your_github_token
CONTENT_REPO_OWNER=your_github_username
CONTENT_REPO_NAME=tech-blog-content
CONTENT_REPO_BRANCH=main

# オプション：分析・監視
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## 開発

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# ブラウザで http://localhost:3000 を開く
```

## スクリプト一覧

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm start` | 本番サーバー起動 |
| `npm run test` | ユニットテスト（watchモード） |
| `npm run test:run` | ユニットテスト（単発実行） |
| `npm run test:coverage` | カバレッジレポート生成 |
| `npm run test:e2e` | E2Eテスト実行 |
| `npm run lint` | Lintチェック |
| `npm run lint:fix` | Lint自動修正 |
| `npm run format` | フォーマットチェック |

## プロジェクト構造

```
src/
├── app/                  # Next.js App Router
│   ├── (content)/        # コンテンツページ（blog, tags, portfolio）
│   ├── (marketing)/      # マーケティングページ（about, privacy）
│   ├── api/              # APIルート（OGP生成、revalidation）
│   └── ...
├── components/           # 再利用可能なコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   └── ui/               # UIコンポーネント
├── features/             # 機能別モジュール
│   ├── blog/             # ブログ機能
│   ├── portfolio/        # ポートフォリオ機能
│   └── search/           # 検索機能
├── lib/                  # ユーティリティ・ビジネスロジック
└── test/                 # テスト設定
```

## テスト

このプロジェクトはTDD（テスト駆動開発）で構築されています。

```bash
# ユニット・コンポーネントテストを実行
npm run test

# E2Eテストを実行（Chromium, Firefox, WebKit, モバイル）
npm run test:e2e

# カバレッジレポートを生成
npm run test:coverage
```

## デプロイ

[Vercel](https://vercel.com/) へのデプロイを推奨します。

1. Vercelにリポジトリを接続
2. 環境変数を設定
3. 自動デプロイが有効化されます

## ライセンス

MIT License
