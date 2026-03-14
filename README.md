# Motivating Creativity

A cinematic, single-scroll React web experience exploring evidence-based principles of creative motivation — grounded in the research of Teresa M. Amabile and related scholarship.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite 8** — build tooling & dev server
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion** — component-level animation
- **GSAP + ScrollTrigger** — scroll-driven cinematic scenes
- **Lenis** — smooth scroll

## Page Sections

1. **Hero** — Kinetic typography with Amabile quote and ambient particle field
2. **Three Components** — Amabile's componential theory (Expertise, Creative Thinking, Intrinsic Motivation)
3. **How Creativity Gets Killed** — Five managerial anti-patterns with scroll-triggered reveals
4. **Supporting Conditions** — Evidence-based organizational conditions that foster creativity
5. **Practical Interventions** — Timeline of five leadership actions with animated draw-in
6. **References** — APA 7th edition (6 sources)

## Accessibility

### Reduced Motion Support
- Respects `prefers-reduced-motion` — all GSAP animations, Lenis smooth scroll, and scroll-triggered effects are disabled entirely for users who prefer reduced motion (`App.tsx`, `Hero.tsx`, `References.tsx`)

### Skip-to-Content Link
- A visually hidden "Skip to content" link appears on keyboard focus, allowing screen reader and keyboard users to bypass decorative elements and jump directly to `<main id="main-content">`

### Semantic HTML & Landmarks
- Content is wrapped in a `<main>` element
- Every major section uses `<section>` with `aria-labelledby` pointing to its heading (`hero-title`, `killers-title`, `conditions-title`, `interventions-title`, `references-title`)

### ARIA Attributes
- Side dot navigation uses `aria-label="Page sections"` with per-button `aria-label="Jump to {section}"` and `aria-current` for the active section
- Decorative elements (dividers, progress bar, SVG icons) are marked `aria-hidden="true"` so screen readers skip them
- The animated per-letter hero title is `aria-hidden`, with a clean `sr-only` text alternative so screen readers announce "Motivating Creativity" as a single phrase

### Keyboard Navigation & Focus Styles
- All interactive cards and list items have `tabIndex={0}` for keyboard access
- Visible `focus-visible` ring styles on every focusable element (color-matched per section: purple, red, emerald, indigo)
- Framer Motion `whileFocus` provides the same slide animation on keyboard focus as on hover (Interventions timeline)

### Contrast
- Strong contrast ratios on the dark background for all body text and headings

## Build for Production

```bash
npm run build
npm run preview
```

## References

- Amabile, T. M. (1996). *Creativity in context*. Westview Press.
- Amabile, T. M. (1998). How to kill creativity. *Harvard Business Review, 76*(5), 76–87.
- Csikszentmihalyi, M. (1996). *Creativity: Flow and the psychology of discovery and invention*. HarperCollins.
- Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits. *Psychological Inquiry, 11*(4), 227–268.
- Hennessey, B. A., & Amabile, T. M. (2010). Creativity. *Annual Review of Psychology, 61*, 569–598.
- Oldham, G. R., & Cummings, A. (1996). Employee creativity. *Academy of Management Journal, 39*(3), 607–634.
