# Frontend — Arithmetic Expression Tree Visualizer

React + Vite frontend for the Arithmetic Expression Tree Visualizer.

## Stack
- React 18 + JavaScript (JSX)
- Vite 5 (dev server & bundler)
- Tailwind CSS 3 (dark DeFi theme with neon-green accents)
- Zustand (state management)
- D3 (tree layout computation)
- Framer Motion (animations)
- i18next + react-i18next (EN/AR bilingual, RTL support)
- Axios (API client)

## Scripts
```bash
pnpm install      # install dependencies
pnpm run dev      # start dev server on http://localhost:5173
pnpm run build    # production build -> dist/
pnpm run preview  # preview the production build
pnpm run lint     # run ESLint
pnpm run test     # run Vitest unit tests
```

## Environment
Create `.env` (or `.env.local`) in this folder:
```
VITE_API_BASE_URL=http://localhost:3001
```

## Project Layout
```
src/
├── components/    # InputPanel, TreeVisualizer, StepsPanel, DeveloperCard, etc.
├── hooks/         # useExpressionParser
├── i18n/          # locales (en.json, ar.json) + config
├── store/         # Zustand appStore
├── App.jsx        # Root component with RTL handling
├── main.jsx       # Entry point
└── index.css      # Tailwind + global styles
```

## Backend
This frontend expects the Express backend to be running on `http://localhost:3001`.
See `../backend/README.md` or the root `../README.md` for backend setup.

## Developer
**Mousa Alawad** — Full-Stack Developer