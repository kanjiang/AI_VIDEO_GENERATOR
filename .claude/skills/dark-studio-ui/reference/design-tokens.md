# Design Tokens & Component Recipes

Complete CSS variable set and ready-to-copy component patterns for dark studio UI pages.

## Full token block

Copy this block into the page's root container class (e.g. `.xx-main`), replacing `xx` with your page prefix:

```css
.xx-main {
    /* ─── Palette ─── */
    --xx-bg: #0c0d12;
    --xx-surface: rgba(255, 255, 255, 0.04);
    --xx-surface-hover: rgba(255, 255, 255, 0.07);
    --xx-surface-strong: rgba(255, 255, 255, 0.08);
    --xx-glass: rgba(22, 24, 32, 0.72);
    --xx-glass-border: rgba(255, 255, 255, 0.08);

    /* ─── Text ─── */
    --xx-text: #e8e6e3;
    --xx-text-secondary: rgba(232, 230, 227, 0.56);
    --xx-text-muted: rgba(232, 230, 227, 0.36);

    /* ─── Accent ─── */
    --xx-accent: #6c5ce7;
    --xx-accent-glow: rgba(108, 92, 231, 0.24);

    /* ─── Semantic colors ─── */
    --xx-green: #00b894;
    --xx-green-soft: rgba(0, 184, 148, 0.14);
    --xx-red: #ff6b6b;
    --xx-red-soft: rgba(255, 107, 107, 0.14);
    --xx-amber: #feca57;
    --xx-amber-soft: rgba(254, 202, 87, 0.12);
    --xx-blue: #54a0ff;
    --xx-blue-soft: rgba(84, 160, 255, 0.12);

    /* ─── Radii ─── */
    --xx-radius: 16px;
    --xx-radius-sm: 10px;
    --xx-radius-xs: 6px;

    /* ─── Typography ─── */
    --xx-font: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --xx-mono: "JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, monospace;

    /* ─── Root styles ─── */
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    font-family: var(--xx-font);
    color: var(--xx-text);
    background: var(--xx-bg);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
}
```

## Layout

### Sidebar + Content grid

```css
.xx-layout {
    display: grid;
    grid-template-columns: 272px minmax(0, 1fr);
    min-height: 100vh;
    gap: 0;
}

.xx-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    background: rgba(14, 15, 22, 0.96);
    border-right: 1px solid var(--xx-glass-border);
    backdrop-filter: blur(20px);
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}

.xx-content {
    display: grid;
    gap: 1px;
    align-content: start;
    padding: 24px 28px;
    overflow-y: auto;
    background: var(--xx-bg);
}
```

### Sidebar brand block

```css
.xx-sidebar__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--xx-glass-border);
}

.xx-sidebar__brand-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--xx-accent), #a29bfe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}
```

### Sidebar nav items

```css
.xx-nav-btn {
    appearance: none;
    display: grid;
    gap: 3px;
    padding: 10px 12px;
    border-radius: var(--xx-radius-sm);
    border: 1px solid transparent;
    background: transparent;
    color: var(--xx-text);
    font-family: var(--xx-font);
    text-align: left;
    cursor: pointer;
    transition: all 140ms ease;
}

.xx-nav-btn:hover {
    background: var(--xx-surface-hover);
}

.xx-nav-btn--active {
    background: var(--xx-accent-glow) !important;
    border-color: rgba(108, 92, 231, 0.28);
}

.xx-nav-btn--active strong {
    color: #c3b8ff;
}
```

## Components

### Header bar

```css
.xx-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--xx-glass-border);
    margin-bottom: 20px;
}

.xx-header-bar__title {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--xx-text), var(--xx-text-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Glass card

```css
.xx-card {
    display: grid;
    gap: 12px;
    padding: 20px;
    border-radius: var(--xx-radius);
    border: 1px solid var(--xx-glass-border);
    background: var(--xx-glass);
    backdrop-filter: blur(16px);
    transition: all 200ms ease;
}

.xx-card:hover {
    border-color: rgba(255,255,255,0.12);
    background: rgba(22, 24, 32, 0.82);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
}
```

### Stat badge

```css
.xx-stat {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: var(--xx-radius);
    border: 1px solid var(--xx-glass-border);
    background: var(--xx-glass);
    backdrop-filter: blur(16px);
}

.xx-stat__value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
}

.xx-stat__label {
    font-size: 11px;
    color: var(--xx-text-muted);
}

/* Semantic variants */
.xx-stat--ok   { border-color: rgba(0, 184, 148, 0.2); }
.xx-stat--ok   .xx-stat__value { color: var(--xx-green); }
.xx-stat--warn { border-color: rgba(254, 202, 87, 0.16); }
.xx-stat--warn .xx-stat__value { color: var(--xx-amber); }
```

### Filter chip (pill)

```css
.xx-filter-chip {
    appearance: none;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 12px;
    border-radius: 999px;
    border: 1px solid var(--xx-glass-border);
    background: var(--xx-surface);
    color: var(--xx-text-secondary);
    font-family: var(--xx-font);
    font-size: 12px;
    cursor: pointer;
    transition: all 140ms;
}

.xx-filter-chip:hover {
    background: var(--xx-surface-hover);
    color: var(--xx-text);
}

.xx-filter-chip--active {
    background: var(--xx-accent) !important;
    border-color: var(--xx-accent) !important;
    color: #fff !important;
    box-shadow: 0 2px 12px var(--xx-accent-glow);
}
```

### Search input

```css
.xx-search {
    flex: 1 1 260px;
    padding: 10px 16px;
    border-radius: var(--xx-radius-sm);
    border: 1px solid var(--xx-glass-border);
    background: var(--xx-surface);
    color: var(--xx-text);
    font-family: var(--xx-font);
    font-size: 13px;
    outline: none;
    transition: all 160ms;
}

.xx-search::placeholder {
    color: var(--xx-text-muted);
}

.xx-search:focus {
    border-color: rgba(108, 92, 231, 0.48);
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.12);
    background: rgba(255,255,255,0.06);
}
```

### Status badge (inline)

Pattern: semantic background + semantic text + subtle border.

```css
.xx-status--pending    { background: var(--xx-amber-soft); color: var(--xx-amber); border-color: rgba(254,202,87,0.2); }
.xx-status--generating { background: var(--xx-blue-soft);  color: var(--xx-blue);  border-color: rgba(84,160,255,0.2); }
.xx-status--done       { background: var(--xx-green-soft); color: var(--xx-green); border-color: rgba(0,184,148,0.2); }
.xx-status--failed     { background: var(--xx-red-soft);   color: var(--xx-red);   border-color: rgba(255,107,107,0.2); }
```

### Copy button with feedback

```css
.xx-copy-btn {
    appearance: none;
    padding: 5px 14px;
    border-radius: 999px;
    border: 1px solid var(--xx-glass-border);
    background: var(--xx-surface);
    color: var(--xx-text-secondary);
    font-family: var(--xx-font);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 140ms;
}

.xx-copy-btn:hover {
    background: var(--xx-surface-hover);
    color: var(--xx-text);
    transform: translateY(-1px);
}

.xx-copy-btn--copied {
    background: var(--xx-green-soft) !important;
    border-color: rgba(0, 184, 148, 0.28) !important;
    color: var(--xx-green) !important;
}
```

### Accent action button

```css
.xx-action-btn {
    appearance: none;
    padding: 9px 18px;
    border-radius: 999px;
    border: 1px solid rgba(108, 92, 231, 0.4);
    background: linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(162, 155, 254, 0.12));
    color: #c3b8ff;
    font-family: var(--xx-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 160ms;
}

.xx-action-btn:hover {
    background: linear-gradient(135deg, rgba(108, 92, 231, 0.36), rgba(162, 155, 254, 0.2));
    box-shadow: 0 4px 20px var(--xx-accent-glow);
    transform: translateY(-1px);
}
```

### Accent panel (highlight section)

```css
.xx-accent-panel {
    display: grid;
    gap: 14px;
    padding: 18px 20px;
    border-radius: var(--xx-radius);
    border: 1px solid rgba(108, 92, 231, 0.18);
    background: linear-gradient(135deg, rgba(108, 92, 231, 0.08), rgba(162, 155, 254, 0.04));
    backdrop-filter: blur(12px);
}
```

### Code / prompt text block

```css
.xx-code-block {
    margin: 0;
    padding: 16px 18px;
    white-space: pre-wrap;
    word-break: break-word;
    border-radius: var(--xx-radius-sm);
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid var(--xx-glass-border);
    color: var(--xx-text-secondary);
    font-family: var(--xx-mono);
    font-size: 11.5px;
    line-height: 1.75;
    max-height: 480px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}
```

### Portal popover

```css
.xx-popover {
    position: fixed;
    z-index: 9999;
    width: 340px;
    border-radius: var(--xx-radius, 16px);
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(18, 20, 28, 0.97);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255,255,255,0.1);
    overflow: hidden;
    animation: xx-popover-in 160ms ease;
    backdrop-filter: blur(24px);
}

@keyframes xx-popover-in {
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
```

React pattern for portal popovers:

```tsx
function Popover({ anchorRef, children, onClose }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      left: Math.min(rect.left, window.innerWidth - 360),
    });
  }, [anchorRef]);

  return createPortal(
    <div className="xx-popover" style={{ top: pos.top, left: pos.left }}>
      {children}
    </div>,
    document.body
  );
}
```

### Loading state

```css
.xx-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
    gap: 16px;
}

.xx-loading__spinner {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid var(--xx-glass-border);
    border-top-color: var(--xx-accent);
    animation: xx-spin 800ms linear infinite;
}

@keyframes xx-spin {
    to { transform: rotate(360deg); }
}
```

### Empty state

```css
.xx-empty {
    padding: 48px 32px;
    text-align: center;
    color: var(--xx-text-muted);
    font-size: 14px;
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: var(--xx-radius);
}
```

## Responsive breakpoint

```css
@media (max-width: 900px) {
    .xx-layout {
        grid-template-columns: 1fr;
    }

    .xx-sidebar {
        position: static;
        height: auto;
        max-height: none;
        border-right: none;
        border-bottom: 1px solid var(--xx-glass-border);
    }

    .xx-content {
        padding: 16px;
    }

    .xx-header-bar {
        flex-direction: column;
        align-items: flex-start;
    }

    .xx-popover {
        width: 280px;
    }
}
```
