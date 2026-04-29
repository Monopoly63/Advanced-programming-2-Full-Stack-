# 🌿 Arithmetic Expression Tree Visualizer

Full-stack web application that parses arithmetic expressions into interactive expression trees.

- **Frontend:** React 18 + Vite + Tailwind CSS + D3 (layout only) + Zustand + i18next (EN / AR with full RTL)
- **Backend:** Node.js + Express + Zod (recursive-descent parser)

## 🗂 Project structure

```
arithmetic-expression-tree/
├── frontend/   # React + Vite app (port 5173)
└── backend/    # Express API (port 3001)
```

## 🚀 Getting started

### 1. Install dependencies

```bash
cd backend  && npm install
cd frontend && npm install
```

### 2. Run in development

Open two terminals:

```bash
# Terminal 1
cd backend && npm run dev
# ✅ Server running on http://localhost:3001

# Terminal 2
cd frontend && npm run dev
# ➜  Local: http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend on port 3001, so no `VITE_API_URL` is required in development.

### 3. Production build

```bash
cd frontend && npm run build
cd backend  && npm start
```

## 🔌 API

`POST /api/parse-expression`

Request body:
```json
{ "expression": "(A + B) * C" }
```

Successful response:
```json
{
  "success": true,
  "expression": "(A + B) * C",
  "tree": { "id": "node-5", "value": "*", "type": "operator", "left": { ... }, "right": { ... } },
  "metadata": { "nodeCount": 5, "depth": 3, "tokenCount": 7 },
  "steps": [ { "step": 1, "action": "create", "detail": "...", "nodeId": "node-1", "value": "A" } ]
}
```

Error response:
```json
{
  "success": false,
  "expression": "A + * B",
  "error": { "code": "SYNTAX_ERROR", "message": "Unexpected token \"*\" at position 4.", "position": 4 }
}
```

### Supported grammar

```
expression := term  (('+' | '-')  term)*
term       := power (('*' | '/' | '%') power)*
power      := unary ('^' power)?           // right-associative
unary      := '-' unary | primary
primary    := number | identifier | '(' expression ')'
```

## 🧪 Example expressions

- `(A + B) * C`
- `a + b * c`
- `(x + y) / (z - 1)`
- `2 ^ 3 + 4 * 5`
- `-a + b * (c - d)`

## 👨‍💻 Developer

**Mousa Alawad**

- GitHub — [MousaAlawad1](https://github.com/MousaAlawad1)
- Instagram — @1mousa_alawad
- Telegram — @Mousa_Alawad