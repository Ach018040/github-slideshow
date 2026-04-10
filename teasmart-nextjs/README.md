# TeaSmart Next.js Starter

可直接部署的 TeaSmart MVP 骨架（Next.js 14 + Supabase + Dashboard UI）。

## Features

- Next.js 14 + TypeScript + Tailwind CSS
- Dashboard UI（圖表 + KPI 卡片）
- API routes
  - `GET /api/dashboard`
  - `GET|POST /api/operations`
  - `GET|POST /api/sensor-data`
- Supabase schema：`supabase/schema.sql`
- Mock fallback（尚未設定 Supabase 也可運行）

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

## Deploy

- 推到 GitHub
- 在 Vercel 建立專案並設定環境變數
- Deploy
