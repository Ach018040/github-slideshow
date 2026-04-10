# TeaSmart Next.js Starter

可直接部署的 TeaSmart MVP 骨架（Next.js 14 + Supabase + Dashboard UI）。

## Features

- Next.js 14 + TypeScript + Tailwind CSS
- Dashboard UI（圖表 + KPI 卡片）
- API routes
  - `GET /api/dashboard`
  - `GET|POST /api/operations`
  - `GET|POST /api/sensor-data`
  - `GET /api/research`（讀取 AI-Scientist 研究建議）
- Supabase schema：`supabase/schema.sql`
- Mock fallback（尚未設定 Supabase 也可運行）
- AI-Scientist-v2 整合說明：`docs/ai-scientist-integration.md`

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 <http://localhost:3000>

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Optional: Setup AI-Scientist-v2

```bash
./scripts/setup-ai-scientist.sh
```

來源專案：<https://github.com/SakanaAI/AI-Scientist-v2>

## Deploy

- 推到 GitHub
- 在 Vercel 建立專案並設定環境變數
- Deploy
