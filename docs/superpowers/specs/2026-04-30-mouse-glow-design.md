# Mouse Glow Effect — Design Spec

**Date:** 2026-04-30
**Status:** Approved

## Summary

Add a cursor-tracking glow effect to portfolio cards. A circular amber spotlight follows the mouse within each card. When the cursor approaches a portion of the border, only that segment lights up — the rest of the border stays dark. The circle is centered at the cursor position, so moving to the top-left corner illuminates only the top-left border.

## Mechanism

### Gradient Border Trick

The core technique uses two layers:

1. **Outer wrapper** — `padding: 1px`, background is a `radial-gradient` centered at the cursor position plus a flat base color:
   ```css
   background:
     radial-gradient(circle 380px at var(--glow-x) var(--glow-y),
       rgba(232, 197, 71, 0.45) 0%,
       transparent 50%),
     #2E2E40;
   ```
   At rest the gradient is transparent → only the flat `#2E2E40` base shows = normal dark border. On hover, the gradient adds amber where the circle intersects the edge.

2. **Inner content div** — `bg-surface` (#111118) with the same `rounded-*` class as the outer. The outer also has `overflow-hidden` to clip the gradient at the corners. The solid background covers the gradient center, leaving only the 1px border (padding) gap visible.

### Mouse Tracking

The component is `"use client"`. On `mousemove`, it computes cursor position relative to the card using `getBoundingClientRect()` and sets CSS custom properties directly on the element (no React state re-renders):

```ts
el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
el.style.setProperty("--glow-opacity", "1");
```

On `mouseleave`, `--glow-opacity` is set to `0`. The outer wrapper uses `transition: opacity 400ms ease` on the gradient layer for a smooth fade.

## Component: `GlowCard`

**File:** `components/GlowCard.tsx`

```
Props:
  children   React.ReactNode
  className  string  (card styling — padding, rounded, bg, border, group, etc.)
```

Renders:
```
<div ref outerRef className="relative overflow-hidden rounded-2xl p-[1px]"
     style={{ background: gradient + base }}
     onMouseMove onMouseLeave>
  <div className="relative rounded-2xl bg-surface h-full [padding, group, hover states, etc.]">
    {children}
  </div>
</div>

<!-- rounded-xl variant used for smaller Experience sidebar cards -->
```

The `className` prop carries all visual card styles (padding, rounded, group, hover states). `relative` and `overflow-hidden` are added by GlowCard itself.

## Target Cards

| Section | Element | Count |
|---|---|---|
| `Work.tsx` | Project cards (`article` → GlowCard) | dynamic (from `projects` array) |
| `Stack.tsx` | Category cards | 3 |
| `Experience.tsx` | Education sidebar cards | 2 |
| `Experience.tsx` | "Looking for" card | 1 |

The existing static `radial-gradient(ellipse at top left…)` ambient hover glow in `Work.tsx` is removed — GlowCard replaces it with a better dynamic version.

## What Does Not Change

- All `group-hover:` child styles (image opacity, title color, etc.)
- Existing hover border transitions (`hover:border-amber/30`)
- Reveal scroll animations
- Section layouts, spacing, typography
- Background colors, design tokens

## Constraints

- No React state updates on `mousemove` — only direct DOM style mutations for performance
- `"use client"` boundary stays on `GlowCard` only; `Work.tsx`, `Stack.tsx`, `Experience.tsx` remain server components
- Glow color is hardcoded to the project's amber (`232, 197, 71`) — no prop needed
- Effect is pointer-only (no touch glow — touch devices don't have hover states)
