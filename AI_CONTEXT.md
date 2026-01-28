# AI Context & Documentation

This file documents the `gf-blog` codebase for AI assistants. Reference this file to understand the project structure, design system, and key technical decisions.

## 1. Project Overview

**Project Name:** `gf-blog` (My Little Blog ✿)
**Type:** Personal Blog with "Disney-simple" aesthetic
**Stack:**
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Global CSS + Framer Motion
- **CMS:** Sanity.io
- **Deployment:** Vercel (recommended)

## 2. Design System

The blog uses a specific "Sketchy Pastel" aesthetic. **Do not deviate from this style without user request.**

### Core Aesthetics
- **Vibe:** Cozy, hand-drawn, cute, "Disney-simple" animations.
- **Colors:**
  - **Pastels:** Pink (#FDF2F4), Lavender (#F3EAFC), Mint (#E8F8F0), Peach (#FDF4E8)
  - **Dark Mode:** Deep sketchy grays and muted pastels.
  - **Accents:** Neon/Highlight colors for text selection and hover states.
- **Typography:**
  - **Headings:** `Caveat` (Handwritten style)
  - **Body:** `Quicksand` (Rounded sans-serif) - *Optimized: `Inter` was replaced/modified in globals*.
- **Visual Effects:**
  - `box-shadow`: Using `var(--shadow-sketchy)` for a hand-drawn look.
  - `border-radius`: `var(--radius-sketchy)` (irregular corners).
  - **Jitter Effect:** An SVG turbulence filter (`#jitter-filter`) applied to elements to make them look like boiling lines/hand-drawn animation.

### Animation Library (Framer Motion)
- Use `framer-motion` for all UI animations.
- **Standard Spring Physics:** `{ stiffness: 400, damping: 17 }` for bouncy interactions.
- **Entrance:** Staggered fade-ins (`staggerChildren`) for lists/grids.
- **Hover:** Gentle scale (`scale: 1.02`) and rotation (`rotate: 1deg`).

## 3. Key Components

| Component | Responsibility | Special Notes |
|-----------|----------------|---------------|
| `CatCompanion.tsx` | Interactive pixel-art cat pet | Complex AI (moods, needs), sprite animation, follows mouse, canvas-free (DOM nodes). |
| `DoodleDecorations.tsx` | Floating background emojis | Parallax-like floating effect with emojis. |
| `ReadingProgressBar.tsx` | Scroll progress indicator | Uses Framer Motion `useScroll` + `useSpring` + `useTransform`. |
| `BlogCard.tsx` | Post preview card | Images have `loading="lazy"` (except first). Hover tilt effect. |
| `ThemeToggle.tsx` | Dark/Light mode switcher | Persists to `localStorage`. Animated sun/moon icon. |
| `PostContent.tsx` | Portable Text Renderer | Custom renderers for Code Blocks, Images, and Pull Quotes. |

## 4. Sanity CMS Integration

The CMS configuration is located in `/sanity`.

- **Project ID:** `c72e5433-ab74-4e25-b8c1-fe7e4dda4005` (from `.env.local` or context)
- **Dataset:** `production`
- **Schemas:**
  - `post.ts`: Main blog post type. Includes `code` blocks and custom `pullQuote` objects.
  - `author.ts`: Author profiles.
- **Queries:** Defined in `sanity/lib/queries.ts`. Includes `postsQuery`, `postQuery`, `relatedPostsQuery`.

**Editing Features:**
- **Code Blocks:** Syntax highlighting supported.
- **Pull Quotes:** 3 Styles: `fancy` (Centered), `minimal` (Left Border), `card` (Boxed).
- **Decorators:** Bold, Italic, Underline, Strike, Code, Highlight.

## 5. Technical Decisions & Gotchas

- **Dynamic Imports:** Used in `RootLayout` for `CatCompanion`, `BackToTop`, and `ScrollToTop` to reduce TBT (Total Blocking Time).
- **Font Optimization:** Google Fonts are loaded with `display=swap`. Only weights 400/600 are imported.
- **Scroll Handling:** `ScrollToTop.tsx` uses `useLayoutEffect` to ensure instant scroll reset on navigation, bypassing browser scroll restoration issues.
- **SVG Filters:** The `#jitter-filter` is defined in `RootLayout` and referenced by ID in generic CSS or components.

## 6. Development Workflow

1. **Run Dev Server:** `npm run dev`
2. **Sanity Studio:** Accessible at `/studio` route.
3. **Linting:** `npm run lint`
4. **Build:** `npm run build` (Static generation for blog posts).

## 7. Future Roadmap (Ideas)

- **Masonry Grid:** For blog cards.
- **Sticker Tags:** CSS-only peeling sticker effect for categories.
- **Washi Tape Headers:** Decorative section dividers.
- **Guestbook:** Interactive comment section.
