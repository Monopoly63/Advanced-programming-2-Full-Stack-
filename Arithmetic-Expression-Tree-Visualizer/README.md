# 🌿 Arithmetic Expression Tree Visualizer

> Full-stack web app that parses arithmetic expressions and renders interactive SVG expression trees with a **DeFi-inspired dark/neon UI**.

**Developer:** Mousa Alawad · [GitHub](https://github.com/MousaAlawad1) · Instagram `@1mousa_alawad` · Telegram `@Mousa_Alawad`

---

## ✨ Features

- 🔤 Full arithmetic expression support: `+  -  *  /  ^  %  ( )` with numbers, variables, unary minus
- 🌳 Interactive SVG tree (zoom, pan, hover tooltips) — **React owns DOM, D3 computes layout**
- 🧮 Tokenizer + recursive-descent parser with full operator-precedence support
- 🧾 Step-by-step parsing log + token list
- 🌍 Bilingual EN/AR with full RTL mirroring (Cairo font for Arabic)
- 🎨 Dark glassmorphism UI with neon-green accents (inspired by Dribbble DeFi landings)
- ✅ Deterministic node IDs: counter is reset per request via factory closure (fixed from v2.0)

---

## 🧰 Tech Stack

| Layer | Stack |
|------|------|
| **Frontend** | React 18 · Vite 5 · Tailwind CSS · D3 v7 · Zustand · i18next · framer-motion · lucide-react · axios |
| **Backend** | Node 20 · Express · Zod · CORS · morgan · dotenv |

---

## 📁 Project Structure

```
arithmetic-expression-tree/
├── frontend/      React + Vite (port 5173)
└── backend/       Node + Express (port 3001)
```

---

## 🚀 Quick Start (Local)

### 1. Clone and install

```bash
# backend
cd backend
cp .env.example .env
npm install

# frontend
cd ../frontend
cp .env.example .env
npm install
```

### 2. Run both services

```bash
# terminal 1
cd backend && npm run dev
# → ✅ Server running on http://localhost:3001

# terminal 2
cd frontend && npm run dev
# → VITE v5.x  Local: http://localhost:5173
```

Open http://localhost:5173 and try:
- `(A + B) * C`
- `((A + B) * C - D) / 2`
- `2 ^ 3 + 4`

---

## 🔌 API

### `POST /api/parse-expression`

**Request**
```json
{ "expression": "(A + B) * C" }
```

**Success response**
```json
{
  "success": true,
  "expression": "(A + B) * C",
  "tree": {
    "id": "node-5",
    "value": "*",
    "type": "operator",
    "left":  { "id": "node-3", "value": "+", "type": "operator",
               "left":  { "id": "node-1", "value": "A", "type": "operand" },
               "right": { "id": "node-2", "value": "B", "type": "operand" } },
    "right": { "id": "node-4", "value": "C", "type": "operand" }
  },
  "metadata": { "tokenCount": 7, "nodeCount": 5, "tokens": [...] },
  "steps": [ { "description": "...", "detail": "..." } ]
}
```

**Error response**
```json
{
  "success": false,
  "expression": "A + * B",
  "error": { "code": "CONSECUTIVE_OPERATORS", "message": "Consecutive operators are not allowed." }
}
```

### `GET /health`
Returns `{ "status": "ok", "timestamp": "..." }`.

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
vercel --prod
```
Set environment variable `VITE_API_URL=https://your-backend.onrender.com` in the Vercel dashboard.

`frontend/vercel.json` already includes SPA rewrites.

### Backend → Render
1. Push repo to GitHub.
2. In Render: **New → Web Service → connect repo → root `backend/`**.
3. `render.yaml` is included; or set manually:
   - Build: `npm install`
   - Start: `npm start`
   - Env: `NODE_ENV=production`, `FRONTEND_URL=https://your-frontend.vercel.app`
4. Docker deploy is also supported via `backend/Dockerfile`.

Update CORS by setting `FRONTEND_URL` to your deployed Vercel URL (comma-separate multiple origins).

---

# 🌿 شجرة التعبير الحسابي — النسخة العربية

> تطبيق ويب full-stack يحلّل التعابير الحسابية ويرسم شجرة SVG تفاعلية بتصميم **داكن بألوان نيون أخضر** مستوحى من صفحات DeFi.

**المطوّر:** موسى العواد · [GitHub](https://github.com/MousaAlawad1) · Instagram `@1mousa_alawad` · Telegram `@Mousa_Alawad`

## ✨ المزايا
- دعم كامل للعمليات `+ - * / ^ %` والأقواس والمتغيرات والسالب الأحادي.
- شجرة SVG تفاعلية مع تكبير/تحريك وtooltip — React يتحكم بالـ DOM و D3 يحسب المواضع فقط.
- tokenizer + parser تكراري مع أولويات صحيحة للعمليات.
- واجهة ثنائية اللغة (EN/AR) مع دعم كامل لاتجاه RTL وخط Cairo.
- رسائل خطأ واضحة ومقروءة.

## 🚀 التشغيل محلياً
```bash
cd backend  && cp .env.example .env && npm install && npm run dev
cd frontend && cp .env.example .env && npm install && npm run dev
```
ثم افتح http://localhost:5173

---

*v2.1 — Bootstrap-ready · DeFi-themed*