# Tech Blog 実装プラン

## 概要

技術ブログ、個人ブログ、ポートフォリオを兼ねたモダンなブログサイトを構築する。

## 技術スタック

| カテゴリ | 技術 | 理由 |
|----------|------|------|
| フレームワーク | Next.js 14+ (App Router) | 最も人気、SSG対応、React エコシステム |
| 言語 | TypeScript | 型安全、開発体験向上 |
| スタイリング | Tailwind CSS | 高速開発、カスタマイズ性 |
| マークダウン | MDX + Contentlayer | 型安全なコンテンツ管理 |
| コードハイライト | Shiki | VSCode同等のハイライト |
| ダークモード | next-themes | 簡単実装、フラッシュ防止 |
| 検索 | Pagefind | 静的サイト向け、高速 |
| ホスティング | Vercel | Next.js最適、自動デプロイ |

## ディレクトリ構造

```
tech-blog/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # ルートレイアウト
│   ├── page.tsx              # ホームページ
│   ├── blog/
│   │   ├── page.tsx          # ブログ一覧
│   │   └── [slug]/
│   │       └── page.tsx      # ブログ記事詳細
│   ├── portfolio/
│   │   └── page.tsx          # ポートフォリオページ
│   ├── about/
│   │   └── page.tsx          # 自己紹介ページ
│   ├── tags/
│   │   ├── page.tsx          # タグ一覧
│   │   └── [tag]/
│   │       └── page.tsx      # タグ別記事一覧
│   ├── categories/
│   │   └── [category]/
│   │       └── page.tsx      # カテゴリ別記事一覧
│   └── feed.xml/
│       └── route.ts          # RSS フィード
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # ヘッダー
│   │   ├── Footer.tsx        # フッター
│   │   └── Navigation.tsx    # ナビゲーション
│   ├── blog/
│   │   ├── PostCard.tsx      # 記事カード
│   │   ├── PostList.tsx      # 記事一覧
│   │   ├── TableOfContents.tsx # 目次
│   │   ├── ShareButtons.tsx  # SNSシェアボタン
│   │   └── TagList.tsx       # タグ一覧
│   ├── portfolio/
│   │   └── ProjectCard.tsx   # プロジェクトカード
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ThemeToggle.tsx   # ダークモード切替
│   └── search/
│       └── SearchModal.tsx   # 検索モーダル
├── content/
│   ├── blog/                 # ブログ記事 (MDX)
│   │   └── hello-world.mdx
│   └── projects/             # ポートフォリオ用
│       └── project-1.mdx
├── lib/
│   ├── contentlayer.ts       # コンテンツ設定
│   └── utils.ts              # ユーティリティ
├── public/
│   ├── images/               # 画像
│   └── favicon.ico
├── styles/
│   └── globals.css           # グローバルスタイル
├── contentlayer.config.ts    # Contentlayer設定
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
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
- Pagefindによる全文検索
- キーボードショートカット (Cmd/Ctrl + K)
- 検索結果ハイライト

### 4. RSS フィード
- `/feed.xml` でRSSフィード提供
- 記事更新時に自動生成

### 5. SEO対策
- メタタグ自動生成
- OGP画像自動生成
- sitemap.xml
- robots.txt

### 6. パフォーマンス最適化
- 画像最適化 (next/image)
- 静的サイト生成 (SSG)
- フォント最適化

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
4. ESLint/Prettier 設定
5. 基本的なディレクトリ構造作成

### Phase 2: レイアウト・UI構築
1. ヘッダー/フッター
2. ナビゲーション
3. ダークモード実装
4. 基本UIコンポーネント

### Phase 3: コンテンツ管理
1. Contentlayer 設定
2. MDX 設定
3. コードハイライト (Shiki)
4. サンプル記事作成

### Phase 4: ページ実装
1. ホームページ
2. ブログ一覧・詳細
3. ポートフォリオ
4. Aboutページ
5. タグ/カテゴリページ

### Phase 5: 機能追加
1. 目次コンポーネント
2. SNSシェアボタン
3. 検索機能 (Pagefind)
4. RSS フィード

### Phase 6: 最適化・デプロイ
1. SEO対策
2. パフォーマンス最適化
3. Vercel デプロイ設定
4. カスタムドメイン設定（任意）

## 使用ライブラリ

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "contentlayer": "^0.3.0",
    "next-contentlayer": "^0.3.0",
    "next-themes": "^0.2.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "shiki": "^1.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0"
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
