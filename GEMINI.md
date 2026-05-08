# Essential Luxe - Architecture & Style Guide

This project has been upgraded to meet **Premium Luxury Standards**. Adherence to these guidelines is mandatory for all future modifications.

## Core Philosophy
"Visual Silence over Noise." Every element must serve the brand's status as a premium gateway. Avoid generic templates, cramped layouts, and loud colors.

## Design System (Luxe Editorial)
- **Palette:** Midnight charcoal (`oklch(0.15 0.02 260)`) and Luxe Gold metallic accent (`oklch(0.82 0.12 85)`).
- **Typography:** `Playfair Display` (Serif) for headlines, `Inter`/`Geist` (Sans) for body. Use large, high-contrast editorial scales.
- **Layout:** Prefer asymmetric grids, sticky content sidebars (`.processSticky`), and masonry grids (`.galleryGrid`) with generous whitespace.
- **Visuals:** Use high-resolution, monochrome-leaning or desaturated imagery. Images should overlap or use varying aspect ratios to avoid a "bootstrap" look.
- **Motion:** All sections must use `AnimatedSection` (Framer Motion) with quintic easing (`cubic-bezier(0.22, 1, 0.36, 1)`).

## Technical Standards (React 19 / Next.js 15+)
- **Server Actions:** All mutations (e.g., Auth, Order placement) must use Server Actions in `src/lib/actions.ts`. Avoid separate API routes for internal logic.
- **Form State:** Use React 19 `useActionState` and `useFormStatus` for all forms.
- **Components:** Maintain a clear distinction between Server Components (layout, data fetching) and Client Components (interactivity).

## Active Skills
The following specialized capabilities are integrated:
- **`emil-design-eng`**: High-end micro-interactions and polish.
- **`impeccable`**: Continuous UI/UX audit and refinement.
- **`vercel-react-best-practices`**: Next.js 15+ architectural patterns.

## Development Workflow
1.  **Motion First:** When adding features, define the entrance/interaction motion in `framer-motion`.
2.  **Editorial Check:** Ensure new layouts don't look like generic "SaaS templates."
3.  **Action Pattern:** Always start with a Server Action in `lib/actions.ts` before building the UI.
