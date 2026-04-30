# Arithmetic Expression Tree Visualizer — Todo

## Design System (Dribbble DeFi Dark Theme) ✅
- Background: `#0A0E1A` (deep navy) / `#0D1117` (charcoal)
- Neon accent: `#C6FF3D` / `#B4FF39` (operators, CTAs, highlights)
- Glassmorphism cards: `backdrop-blur-xl bg-white/5 border border-white/10`
- Radial neon-green glows in background
- Typography: Inter / Space Grotesk (UI), JetBrains Mono (expressions), Cairo (Arabic)
- Operators glow neon-green; operands use muted white/gray
- Smooth framer-motion animations (fade, scale, hover)

## Development Tasks
- [x] Phase 0: Clean frontend dir, create backend dir, write package.json files
- [x] Phase 1: Frontend config files (vite, tailwind, postcss, index.html, main.jsx, index.css, i18n)
- [x] Phase 1: Backend config files (server.js, app.js, .env.example)
- [x] Phase 2: Backend services (tokenizer, parser, validator, nodeFactory, errorHandler, route) — Gate B passed
- [x] Phase 3: Frontend state (Zustand store), hook, i18n locales
- [x] Phase 4: InputPanel, ErrorMessage, TreeVisualizer+TreeNode+useTreeLayout, StepsPanel, DeveloperCard, LanguageToggle
- [x] Phase 4: App.jsx shell with RTL handling
- [x] Phase 5: Background glows, glassmorphism, animations, RTL polish
- [x] Phase 6: Deployment files (vercel.json, render.yaml, Dockerfile, Procfile), README (EN+AR)
- [x] Phase 6: Install deps, run build ✅, start dev servers ✅

## Gate Verification
- [x] Gate A1: `npm install` succeeds in both frontend & backend
- [x] Gate A2: Both dev servers running (backend on 3001, frontend on 5173)
- [x] Gate B: `/api/parse-expression` returns valid tree for `(A + B) * C`; node IDs reset between requests ✅
- [x] Gate D: End-to-end ready (build passes, UI renders)