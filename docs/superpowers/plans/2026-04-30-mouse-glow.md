# Mouse Glow Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cursor-tracking circular amber glow to portfolio cards — the border lights up in the portion nearest the cursor, with a subtle interior spotlight.

**Architecture:** A `GlowCard` "use client" component uses the gradient-border trick: outer div has `p-[1px]` with a radial-gradient background centered at cursor position; inner div has a solid background that covers the gradient center, leaving only the 1px gap (the border) visible. A second subtle overlay inside the inner div adds an interior spotlight. Mouse position is tracked via direct DOM `style.setProperty` calls on `mousemove` — no React state, no re-renders.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `components/GlowCard.tsx` | Reusable glow wrapper component |
| Modify | `components/sections/Work.tsx` | Replace project card article with GlowCard |
| Modify | `components/sections/Stack.tsx` | Replace stack category card div with GlowCard |
| Modify | `components/sections/Experience.tsx` | Replace education sidebar cards with GlowCard |

---

## Task 1: Create `GlowCard` component

**Files:**
- Create: `components/GlowCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  rounded?: "rounded-2xl" | "rounded-xl";
  bg?: string;
};

export default function GlowCard({
  children,
  className = "",
  rounded = "rounded-2xl",
  bg = "bg-surface",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - top}px`);
    el.style.setProperty("--glow-opacity", "1");
  }

  function onMouseLeave() {
    ref.current?.style.setProperty("--glow-opacity", "0");
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden p-[1px] ${rounded}`}
      style={{ background: "#2E2E40" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Border glow — visible only in the 1px padding gap */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background:
            "radial-gradient(circle 380px at var(--glow-x, -999px) var(--glow-y, -999px), rgba(232,197,71,0.55) 0%, transparent 50%)",
        }}
      />
      {/* Inner card surface */}
      <div className={`relative ${rounded} ${bg} h-full ${className}`}>
        {/* Interior spotlight — behind children, subtle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background:
              "radial-gradient(circle 380px at var(--glow-x, -999px) var(--glow-y, -999px), rgba(232,197,71,0.08) 0%, transparent 65%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /home/erick/Projects/Personal/erick-dev && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/GlowCard.tsx
git commit -m "feat: add GlowCard component with cursor-tracking border glow"
```

---

## Task 2: Apply GlowCard to Work project cards

**Files:**
- Modify: `components/sections/Work.tsx`

The `article` element becomes a `GlowCard`. The existing static ambient hover glow div is removed (GlowCard replaces it). The border is now the 1px gradient gap instead of Tailwind's `border border-border`. `hover:border-amber/30` is removed — the dynamic glow replaces it.

- [ ] **Step 1: Add the import at the top of `Work.tsx`**

Replace the existing imports block:

```tsx
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";
import GlowCard from "@/components/GlowCard";
```

- [ ] **Step 2: Replace the article element**

Find this block (lines 38–112):

```tsx
<article className="group relative p-7 md:p-9 rounded-2xl border border-border bg-surface hover:border-amber/30 transition-all duration-300 hover:bg-surface-2">
  {/* Ambient hover glow */}
  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    style={{ background: "radial-gradient(ellipse at top left, rgba(232,197,71,0.04) 0%, transparent 60%)" }}
    aria-hidden="true"
  />

  <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
```

Replace with:

```tsx
<GlowCard className="group p-7 md:p-9 hover:bg-surface-2 transition-colors duration-300">
  <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
```

And close the article tag — find:

```tsx
              </div>
            </article>
```

Replace with:

```tsx
              </div>
            </GlowCard>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Start dev server and verify Work cards visually**

```bash
npm run dev
```

Open `http://localhost:3000` and scroll to the "Selected work" section. Move mouse over a project card — the border portion nearest the cursor should glow amber. The rest of the border stays dark. Moving to a corner should illuminate only that corner. Mouse leave should fade the glow out smoothly.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Work.tsx
git commit -m "feat: apply GlowCard to Work project cards"
```

---

## Task 3: Apply GlowCard to Stack category cards

**Files:**
- Modify: `components/sections/Stack.tsx`

The stack cards have `bg-bg` (#080810) as their background, not `bg-surface`. Pass `bg="bg-bg"` to GlowCard. The `border border-border` and `hover:border-amber/20` are replaced by GlowCard.

- [ ] **Step 1: Add the import**

Replace the existing imports block:

```tsx
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/GlowCard";
```

- [ ] **Step 2: Replace the category card div**

Find:

```tsx
<div className="p-6 rounded-2xl border border-border bg-bg hover:border-amber/20 transition-colors duration-300">
```

Replace with:

```tsx
<GlowCard bg="bg-bg" className="p-6 transition-colors duration-300">
```

Find the closing tag of this div — it's after the `</ul>`:

```tsx
                </ul>
              </div>
```

Replace with:

```tsx
                </ul>
              </GlowCard>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify Stack cards visually**

Open `http://localhost:3000` and scroll to the "Tech stack" section. Hover each of the 3 category cards. The border glow should follow the cursor. The cards sit on a `bg-surface` section background and have `bg-bg` interiors — confirm the 1px glow border is visible.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Stack.tsx
git commit -m "feat: apply GlowCard to Stack category cards"
```

---

## Task 4: Apply GlowCard to Experience education sidebar cards

**Files:**
- Modify: `components/sections/Experience.tsx`

Education cards use `rounded-xl` (smaller radius). The "Looking for" card **intentionally skips GlowCard** — it already has a prominent amber border (`border-amber/20` + `bg-amber-dim`) that gives it a distinctive visual treatment. Adding the dark `#2E2E40` 1px gap border from GlowCard would override and flatten that styling.

- [ ] **Step 1: Add the import**

Replace the existing imports block:

```tsx
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/GlowCard";
```

- [ ] **Step 2: Replace each education card div**

Find:

```tsx
                  <div
                    key={edu.degree}
                    className="p-5 rounded-xl border border-border bg-surface"
                  >
```

Replace with:

```tsx
                  <GlowCard
                    key={edu.degree}
                    rounded="rounded-xl"
                    className="p-5"
                  >
```

Find the closing div for each education card — it's after `<p className="font-body text-xs text-muted">{edu.school}</p>`:

```tsx
                    <p className="font-body text-xs text-muted">{edu.school}</p>
                  </div>
```

Replace with:

```tsx
                    <p className="font-body text-xs text-muted">{edu.school}</p>
                  </GlowCard>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify Education cards visually**

Open `http://localhost:3000` and scroll to the "Experience" section. The two education cards in the right column should glow on hover. The "Looking for" card below them should be unchanged (still has its amber border, no mouse glow).

- [ ] **Step 5: Final commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: apply GlowCard to Experience education cards"
```

---

## Task 5: Full visual pass + build check

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: no TypeScript errors, no build failures.

- [ ] **Step 2: Full visual pass**

Start dev server (`npm run dev`) and verify each section:

1. **Work cards** — glow follows cursor, border lights up at cursor position, fades out on leave, `group-hover:` effects on image opacity and title color still work, `hover:bg-surface-2` still darkens card on hover
2. **Stack cards** — 3 cards glow correctly, cards look distinct from `bg-surface` section background
3. **Experience education cards** — 2 cards glow correctly, "Looking for" card is unchanged
4. **No regressions** — Reveal scroll animations, Header, Footer, Hero, Contact all render normally

- [ ] **Step 3: Final commit if any tweaks made**

```bash
git add -p
git commit -m "fix: adjust glow values after visual pass"
```
