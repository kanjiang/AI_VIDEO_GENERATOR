---
name: dark-studio-ui
description: Build dark-themed studio tool pages with glass-morphism, scoped CSS variables, and modern micro-interactions. Use when creating or redesigning any internal tool page (browser, dashboard, editor, viewer) in this Next.js project. Triggers on "做页面", "做个网页", "做个界面", "new page", "build a UI", "redesign the page", "dark theme", "studio UI", or when the user asks for a new tool/browser page inside the project.
---

# Dark Studio UI

Build self-contained, dark-themed tool pages with glass-morphism aesthetic for this Next.js project. Each page owns its styles — no globals pollution.

## Architecture rules

1. **Scoped CSS file** — every tool page gets `<page-name>.css` in its route folder, imported as `import "./<page-name>.css";` at the top of `page.tsx`. Never add page-specific styles to `globals.css`.
2. **Namespaced classes** — all classes use a short unique prefix (e.g. `sb-`, `ed-`, `vw-`). This prevents collisions.
3. **CSS variables on root container** — define the full token set on the page's top-level `.<prefix>-main` class. Components inherit via `var()`.
4. **`"use client"`** — tool pages are interactive; always client components.
5. **Portal for overlays** — popovers, modals, and tooltips render via `createPortal(el, document.body)` with `position: fixed` so they escape parent `overflow`/`backdrop-filter` traps.

## Design tokens

Define these on the page root element. See [reference/design-tokens.md](reference/design-tokens.md) for the full token table and component recipes.

Core palette summary:

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#0c0d12` | Page background |
| `--surface` | `rgba(255,255,255,0.04)` | Resting surface |
| `--glass` | `rgba(22,24,32,0.72)` | Card / panel fill |
| `--glass-border` | `rgba(255,255,255,0.08)` | Subtle borders |
| `--text` | `#e8e6e3` | Primary text |
| `--text-secondary` | `rgba(232,230,227,0.56)` | Secondary text |
| `--text-muted` | `rgba(232,230,227,0.36)` | Muted / labels |
| `--accent` | `#6c5ce7` | Primary accent (purple) |
| `--accent-glow` | `rgba(108,92,231,0.24)` | Accent backgrounds |

Semantic colors: green `#00b894`, red `#ff6b6b`, amber `#feca57`, blue `#54a0ff`, each with a `*-soft` variant at ~12-14% alpha for backgrounds.

## Typography

- Body: `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Mono: `"JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace`
- Import Inter via `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`
- Enable `-webkit-font-smoothing: antialiased` on the root.

## Layout pattern

```
┌──────────────┬─────────────────────────────────────┐
│   Sidebar    │         Content area                │
│  (272px)     │   ┌─ Header bar ──────────────┐     │
│  sticky,     │   │  Title  |  Actions        │     │
│  full-height │   └───────────────────────────┘     │
│              │   ┌─ Toolbar (stats + filters) ┐    │
│  • Brand     │   └────────────────────────────┘    │
│  • Nav items │   ┌─ Card list ──────────────┐     │
│              │   │  Card 1                   │     │
│              │   │  Card 2                   │     │
│              │   └───────────────────────────┘     │
└──────────────┴─────────────────────────────────────┘
```

- Grid: `grid-template-columns: 272px minmax(0, 1fr)`.
- Sidebar: `position: sticky; top: 0; height: 100vh; overflow-y: auto;` with `backdrop-filter: blur(20px)`.
- Content: `padding: 24px 28px; overflow-y: auto;`.
- Responsive: collapse to `grid-template-columns: 1fr` at `max-width: 900px`.

## Component patterns

### Glass card
```css
border-radius: var(--radius);          /* 16px */
border: 1px solid var(--glass-border);
background: var(--glass);
backdrop-filter: blur(16px);
transition: all 200ms ease;
```
On hover: lighten background, add box-shadow `0 8px 32px rgba(0,0,0,0.24)`.

### Pill button / chip
```css
border-radius: 999px;
border: 1px solid var(--glass-border);
background: var(--surface);
font-size: 11-12px;
transition: all 140ms;
```
Active state: `background: var(--accent); color: #fff; box-shadow: 0 2px 12px var(--accent-glow);`

### Status badge
Use semantic color tokens. Pattern: `background: var(--<color>-soft); color: var(--<color>); border-color: rgba(..., 0.2);`

### Copy button feedback
On copy: swap to `background: var(--green-soft); color: var(--green);` for 1.5s, then revert.

### Portal popover
- Render via `createPortal(jsx, document.body)`.
- Position with `position: fixed; top/left` calculated from `getBoundingClientRect()`.
- Background: `rgba(18,20,28,0.97)` with `backdrop-filter: blur(24px)`.
- Entry animation: `opacity 0→1, translateY(-6px)→0, scale(0.97)→1` over 160ms.

## Workflow

1. Create the route folder: `app/<page-name>/page.tsx` + `<page-name>.css`.
2. Copy the design token block from [reference/design-tokens.md](reference/design-tokens.md) into the CSS root class.
3. Build components using the patterns above (glass cards, pills, status badges, etc.).
4. For any overlay (popover, modal), use `createPortal` — never `position: absolute` inside a card.
5. Add responsive breakpoint at 900px.
6. Verify no styles leak to `globals.css`.

## Checklist before delivery

- [ ] All classes use a unique namespace prefix
- [ ] CSS file lives in the page's route folder, not in `globals.css`
- [ ] Root element sets all CSS variables
- [ ] Overlays use `createPortal` + `position: fixed`
- [ ] Responsive layout at ≤ 900px
- [ ] Page uses `"use client"` directive
- [ ] `Inter` font imported in CSS
