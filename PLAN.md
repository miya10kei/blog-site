# Tech Blog 実装プラン

## 概要

技術ブログ、個人ブログ、ポートフォリオを兼ねたモダンなブログサイトを構築する。

## 技術スタック

| カテゴリ | 技術 | 理由 |
|----------|------|------|
| フレームワーク | Next.js 14+ (App Router) | 最も人気、SSG対応、React エコシステム |
| 言語 | TypeScript | 型安全、開発体験向上 |
| スタイリング | Tailwind CSS | 高速開発、カスタマイズ性 |
| マークダウン | MDX + Velite | 型安全なコンテンツ管理、活発にメンテナンス |
| コードハイライト | Shiki | VSCode同等のハイライト |
| ダークモード | next-themes | 簡単実装、フラッシュ防止 |
| 検索 | Pagefind | 静的サイト向け、高速 |
| テスト | Vitest + React Testing Library | 高速、ESM対応、DX良好 |
| E2Eテスト | Playwright | クロスブラウザ対応、信頼性高い |
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
│   └── utils.ts              # ユーティリティ
├── __tests__/                # テストファイル
│   ├── components/           # コンポーネントテスト
│   │   ├── PostCard.test.tsx
│   │   └── Header.test.tsx
│   ├── lib/                  # ユーティリティテスト
│   │   └── utils.test.ts
│   └── e2e/                  # E2Eテスト (Playwright)
│       ├── blog.spec.ts
│       └── navigation.spec.ts
├── .velite/                  # Velite生成ファイル（自動生成）
├── public/
│   ├── images/               # 画像
│   └── favicon.ico
├── styles/
│   └── globals.css           # グローバルスタイル
├── velite.config.ts          # Velite設定
├── vitest.config.ts          # Vitest設定
├── playwright.config.ts      # Playwright設定
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
| コンポーネントテスト | Vitest + RTL | Reactコンポーネント | 常時（watch mode） |
| E2Eテスト | Playwright | ユーザーフロー全体 | CI/CD、リリース前 |

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

### CI/CD でのテスト

```yaml
# GitHub Actions
- name: Run unit tests
  run: npm run test:coverage

- name: Run E2E tests
  run: npm run test:e2e
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
4. ESLint/Prettier 設定
5. **Vitest + React Testing Library 設定**
6. **Playwright 設定**
7. 基本的なディレクトリ構造作成

### Phase 2: レイアウト・UI構築 (TDD)
1. ヘッダーのテスト作成 → 実装
2. フッターのテスト作成 → 実装
3. ナビゲーションのテスト作成 → 実装
4. ダークモードのテスト作成 → 実装
5. 基本UIコンポーネントのテスト作成 → 実装

### Phase 3: コンテンツ管理 (TDD)
1. Velite 設定
2. MDX 設定
3. コードハイライト (Shiki)
4. コンテンツ取得ユーティリティのテスト作成 → 実装
5. サンプル記事作成

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
3. 検索機能のテスト作成 → 実装 (Pagefind)
4. RSS フィードのテスト作成 → 実装

### Phase 6: 最適化・デプロイ
1. E2Eテスト作成（クリティカルパス）
2. SEO対策
3. パフォーマンス最適化
4. CI/CD パイプライン設定（テスト自動実行）
5. Vercel デプロイ設定
6. カスタムドメイン設定（任意）

## 使用ライブラリ

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next-themes": "^0.2.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "velite": "^0.2.0",
    "shiki": "^1.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^24.0.0",
    "@playwright/test": "^1.45.0"
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
