# Task 4 — Glassmorphism Card (React + TypeScript + Vite)

A senior-level, fully-typed `GlassCard` component built with **pure
CSS-in-JS** — no external UI libraries.

## Features

- ✅ React 18 + TypeScript (strict mode)
- ✅ Generic `GlassCardProps<T extends string>` for strictly-typed tags
- ✅ Dark glassmorphism theme (frosted glass, 20px backdrop blur)
- ✅ Hover animations: subtle scale, glow, and image zoom
- ✅ Optional `image`, `badge`, and `onClick` props
- ✅ Keyboard accessible when interactive
- ✅ No external UI libraries — only inline styles

## Design Tokens

| Token          | Value                         |
|----------------|-------------------------------|
| background     | `#0a0a0a`                     |
| surface        | `#1a1a1a`                     |
| glass fill     | `rgba(255,255,255,0.05)`      |
| border         | `rgba(255,255,255,0.1)`       |
| accent / glow  | `rgba(255,255,255,0.15)`      |
| backdrop blur  | `backdrop-filter: blur(20px)` |

## Props

```ts
interface GlassCardProps<T extends string = string> {
  title: string;
  subtitle?: string;
  description: string;
  tags: readonly T[];
  image?: string;
  badge?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
```

## Run the demo

```bash
cd task4
npm install
npm run dev
```

The demo `App.tsx` showcases **three different card variants**: an
image + badge + interactive card, a badge-only product card, and a
minimal content-only card.