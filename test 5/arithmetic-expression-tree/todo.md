# Arithmetic Expression Tree Visualizer — Implementation Todo

## Development Tasks

### Phase 0 — Structure & package.json
- [x] Create folder structure (frontend/, backend/, subdirs)
- [x] Create frontend/package.json (exact content from plan 0.2)
- [x] Create backend/package.json (exact content from plan 0.2)
- [x] Create root .gitignore

### Phase 1 — Config & Entry files
- [x] frontend/vite.config.js (exact from 0.3)
- [x] frontend/tailwind.config.js (exact from 0.3)
- [x] frontend/postcss.config.js (exact from 0.3)
- [x] frontend/index.html (exact from 0.3)
- [x] frontend/src/index.css (exact from 0.3)
- [x] frontend/src/main.jsx (exact from 0.3)
- [x] frontend/src/i18n/index.js (exact from 0.3)
- [x] frontend/src/setupTests.js
- [x] frontend/.env.example
- [x] frontend/public/favicon.svg
- [x] backend/server.js (exact from 0.4)
- [x] backend/src/app.js (exact from 0.4)
- [x] backend/.env.example
- [x] Gate A1: npm install backend (frontend install pending before build)
- [x] Gate A2: backend dev server starts, /health responds

### Phase 2 — Backend services
- [x] backend/src/utils/nodeFactory.js (factory closure, per-request counter)
- [x] backend/src/services/validator.js
- [x] backend/src/services/tokenizer.js
- [x] backend/src/services/parser.js (recursive descent)
- [x] backend/src/routes/parseExpression.js
- [x] backend/src/middleware/errorHandler.js
- [x] backend/src/middleware/requestLogger.js
- [x] Gate B: curl parse-expression returns valid tree; node IDs reset each request (verified — both calls start at node-1)

### Phase 3 — Frontend state + hooks + i18n locales
- [x] frontend/src/store/appStore.js (Zustand)
- [x] frontend/src/hooks/useExpressionParser.js
- [x] frontend/src/utils/treeHelpers.js
- [x] frontend/src/i18n/locales/en.json
- [x] frontend/src/i18n/locales/ar.json

### Phase 4 — Frontend UI Components
- [x] InputPanel/InputPanel.jsx
- [x] ErrorMessage/ErrorMessage.jsx
- [x] TreeVisualizer/useTreeLayout.js (d3.hierarchy + d3.tree)
- [x] TreeVisualizer/TreeNode.jsx
- [x] TreeVisualizer/TreeVisualizer.jsx (React owns DOM; d3.zoom via ref)
- [x] StepsPanel/StepsPanel.jsx
- [x] DeveloperCard/DeveloperCard.jsx
- [x] LanguageToggle/LanguageToggle.jsx
- [x] frontend/src/App.jsx
- [x] Gate D: frontend build succeeds; proxy E2E (2^3+4*5) returns correct precedence tree

### Phase 5 — Styling polish + RTL
- [x] RTL direction handling via App.jsx useEffect
- [x] Tailwind polish; Cairo font for Arabic

### Phase 6 — README
- [x] README.md at project root

## Design Notes
- Color palette (primary emerald): #ECFDF5, #D1FAE5, #6EE7B7, #10B981, #059669, #047857
- Typography: Inter (sans), JetBrains Mono (mono), Cairo (arabic)
- Layout: Input panel + Tree SVG canvas + Steps panel + Developer card
- Key component styles: rounded cards, soft shadows, interactive hover/zoom on tree