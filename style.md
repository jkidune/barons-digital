# Barons Digital — Design Tokens & Style Guide

Welcome to the **Barons Digital Style Guide**. This living document serves as the single source of truth for the brand's design system, layout standards, components, and style conventions. It ensures visual consistency, premium craftsmanship, and cohesive development across the entire web presence.

---

## 1. Brand Philosophy & Aesthetic Direction

Barons Digital represents Tanzanian businesses that refuse to settle for average. The design aesthetic is **ultra-premium, serious, strategic, and minimal**, drawing inspiration from contemporary high-end design agencies.

- **Contrast & Depth**: Deep pure black backdrops paired with soft white primary typography, charcoal division lines, and subtle dark-grey hover blocks.
- **Glassmorphism**: Elegant transparent overlays with precise borders and backdrop blurs to establish layered interfaces.
- **Micro-Animations**: Custom scroll reveals, smooth accordion expansions, state-based glow effects, and precise transition timings that make the interface feel alive and interactive.

---

## 2. Design Tokens

Design tokens are defined as CSS custom properties inside `src/app/globals.css` using the Tailwind v4 `@theme` directive.

### A. Color Palette

#### Global Tailwind Theme Colors (`globals.css`)
These colors are registered inside the CSS `@theme` block and can be accessed with standard Tailwind utility classes (e.g. `bg-bd-dark`, `text-bd-muted`):

| Variable | HEX Code | Tailwind Utility | Purpose / Use Case |
| :--- | :--- | :--- | :--- |
| `--color-bd-white` | `#FFFFFF` | `bg-bd-white`, `text-bd-white` | Pure white highlight, active icon color. |
| `--color-bd-black` | `#000000` | `bg-bd-black` | Pure black default canvas background. |
| `--color-bd-dark` | `#242424` | `bg-bd-dark` | Deep dark charcoal for container surfaces. |
| `--color-bd-service` | `#272727` | `bg-bd-service` | Deep grey for service component panels. |
| `--color-bd-card` | `#FBF5EF` | `bg-bd-card` | Light cream card background for high-contrast items. |
| `--color-bd-light` | `#F8F5F5` | `bg-bd-light` | Soft off-white for alternative text or overlays. |
| `--color-bd-muted` | `#D3D3D3` | `text-bd-muted` | Muted silver-grey for high-importance secondary text. |
| `--color-bd-subtle` | `#4F4F4F` | `text-bd-subtle` | Medium grey for tertiary descriptions or subheadings. |
| `--color-bd-pill` | `#3D3D3D` | `bg-bd-pill` | Charcoal pill background for badges and badges border. |
| `--color-bd-placeholder` | `#1C94F6` | `bg-bd-placeholder` | Vibrating electric blue highlight dot. |

#### Dark Mode Specific / Coming Soon Semantic Grays
These colors are utilized in the premium dark components (like the Waitlist and Contact modules):

- **Pure Canvas Canvas Background**: `#000000` (Default page background)
- **Component Hover Surfaces**: `#0d0d0d` (Subtle dark gray highlight on mouseover)
- **Deep Division Borders**: `#1a1a1a` (Crisp charcoal border lines)
- **Light Division Borders**: `rgba(255, 255, 255, 0.08)` or `rgba(255, 255, 255, 0.1)`

#### Glassmorphism Semantics
- **Glass Card Background**: `rgba(255, 255, 255, 0.04)` or `rgba(255, 255, 255, 0.05)`
- **Glass Card Border**: `rgba(255, 255, 255, 0.1)` or `rgba(255, 255, 255, 0.12)`
- **Glass Backdrop Blur**: `blur(8px)` or `blur(5px)`

---

### B. Typography

The type scale combines a modern, highly legible geometric Sans-Serif font with an elegant editorial Serif for premium emphasis.

- **Primary Sans-Serif**: `Geist` (Next.js font loaded as `--font-geist` in layout). Fallback stack: `"Helvetica Neue", Helvetica, -apple-system, BlinkMacSystemFont, Arial, sans-serif`.
- **Primary Serif (Display / Editorial)**: `Source Serif 4` (Next.js font loaded as `--font-source-serif-4` in layout). Used exclusively for italicized display highlights. Fallback: `"Georgia", serif`.

#### Type Scales & Styling Rules

| Element | Size | Weight | Line Height | Tracking | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | `clamp(2.5rem, 5.5vw, 4rem)` | `500` | `1.2` | `-0.03em` | `--font-geist` |
| **Italic Highlight** | Matches Parent | `500` | Parent | `-0.01em` | `--font-source-serif-4` (Italic) |
| **Section Header (`h2`)** | `clamp(1.8rem, 3.5vw, 2.8rem)` | `500` | `1.15` | `-0.02em` | `--font-geist` |
| **Hero Paragraph** | `18px` | `400` | `25px` / `1.4` | `Normal` | `--font-geist` (RGBA 80%) |
| **Subheadings / Accordions** | `15px` | `400` / `500` | `1.2` - `1.3` | `Normal` | `--font-geist` |
| **Body Descriptions** | `14px` | `400` | `1.75` - `1.85` | `Normal` | `--font-geist` (RGBA 45%-50%) |
| **Small Text / Badges** | `12px` | `400` | `1` | `Normal` | `--font-geist` (RGBA 50%-60%) |

---

### C. Spacing, Layout & Layout Constraints

Establishing breathing room is critical to achieving a premium layout.

- **Section Spacing**: Registered as `--spacing-section` (`100px`). Custom sections utilize standard fluid padding: `py-32 sm:py-48 lg:py-[250px]` (for main banners), and `py-16` to `py-24` for minor content sections.
- **Maximum Width Containers**:
  - `max-w-[1280px]` (`--width-container`): The primary global navigation and page container.
  - `max-w-5xl` (`1024px`): Default container for grid blocks (Contact grids, FAQ width).
  - `max-w-[800px]`: Maximum constraint for typographic headers to ensure high readability.
  - `max-w-lg` (`512px`): Maximum width constraint for focal cards like forms and boxes.
- **Content Gaps**:
  - Main items spacing: `gap-12 sm:gap-20` (horizontal spacing in columns).
  - List / Form elements spacing: `gap-6` or `gap-3`.

---

### D. Border Radiuses

- `--radius-card` (`6px`): Standard corner roundness for default media containers or badges.
- `--radius-media` (`8px`): Corners for medium UI panels and embedded items.
- `--radius-media-lg` (`10px`): Outer wrapper corners for images and videos.
- `--radius-panel` (`29px`): Premium card wrappers (e.g. Footers, central cards).
- **Accented Glass Containers**: `16px` (`rounded-2xl`). This is the default roundness for the waitlist form card, FAQ items, and contact containers.
- **Pills & Buttons**: `64px` or `--radius-pill` (`360px`). Full circle capsules for badges, status chips, and button triggers.

---

## 3. UI Component Standards

### A. Badges & Chips (Pill UI)
- **Structure**: Rounded capsules with light border overlays and subtle transparent backgrounds.
- **Status Indicators**: Include a pulsing indicator dot.
  - **Status Dot**: `w-1.5 h-1.5 rounded-full`.
  - **Live / Coming Soon Status**: Emerald green dot (`bg-emerald-400`) backed by a glowing drop shadow: `box-shadow: 0 0 6px rgba(74, 222, 128, 0.6)`.

```tsx
<div
  className="flex items-center gap-2 rounded-[64px] border border-white/10 bg-white/5 px-4 py-2 text-[12px] text-white/50"
>
  <span className="h-1 w-1 rounded-full bg-white/30" />
  Dar es Salaam · Tanzania
</div>
```

---

### B. Glassmorphic Input & Form Fields
- **Background**: Translucent surface (`rgba(255, 255, 255, 0.04)`) blurred to distinct levels (`backdrop-filter: blur(8px)`).
- **Borders**: Thin elegant borders (`rgba(255,255,255,0.1)`). Divider lines within fields use `rgba(255,255,255,0.08)`.
- **Interactive State**: Mouse clicks/focus transitions the cell color to active glass: `focus:bg-white/[0.04]`.
- **Text Inputs**: Placeholder values styled with deep muted grey: `placeholder:text-white/25`. Font color remains bright at `rgba(255,255,255,0.8)` for extreme readability.

---

### C. Accordion Panel System (FAQ)
- **Outline & Structure**: Border outlines set to deep charcoal (`#1a1a1a`).
- **Rounded Edge Transitions**:
  - First item in the list must round top corners: `border-radius: 16px 16px 0 0`.
  - Last item in the list must round bottom corners: `border-radius: 0 0 16px 16px`.
  - Inner list items remain clean and straight: `border-radius: 0` with a singular top border to prevent double outline thicknesses.
- **Mouse Hover Feedbacks**: Shifts background from pure black `#000000` to charcoal `#0d0d0d` using smooth easing: `transition: background-color 0.2s ease`.
- **Expansion Physics**: Max-height handles smooth expansions:
  - Transition details: `transition: max-height 0.35s ease, opacity 0.28s ease`.

---

## 4. Reusable Footer Components

To support modular layouts, the website utilizes two distinct footer implementations depending on page context.

### A. Reusable Simple Footer (`ComingSoonFooter.tsx`)
Designed specifically for the Coming Soon phase, landing pages, and standalone portals. It features a minimal footprint, clean column divisions, and basic social navigation.

- **Component Path**: [ComingSoonFooter.tsx](file:///Volumes/ACO%20SSD/Masonda%20Personal%20Files/Software%20&%20Web/Barons%20Agency%20Website/barons-digital/src/components/layout/ComingSoonFooter.tsx)
- **Features**:
  - Clean brand introduction with high-legibility.
  - Three distinct link groups (Services, Company, Connect).
  - Hover states on links transitioning from muted white (`rgba(255,255,255,0.5)`) to clear solid white (`rgb(255,255,255)`).
  - Automatically updating copyright year hook.

```tsx
import ComingSoonFooter from '@/components/layout/ComingSoonFooter'

// Usage inside Standalone Layouts:
export default function Layout() {
  return (
    <div>
      <main>...</main>
      <ComingSoonFooter />
    </div>
  )
}
```

### B. Premium Brand Footer (`Footer.tsx`)
Designed for the production-level main portal. It features premium scroll-driven animations, an active newsletter form, and a full-width brand logo reveal.

- **Component Path**: [Footer.tsx](file:///Volumes/ACO%20SSD/Masonda%20Personal%20Files/Software%20&%20Web/Barons%20Agency%20Website/barons-digital/src/components/layout/Footer.tsx)
- **Key Features**:
  - Full-width layout wrapped inside a curved dark panel (`border-radius: 29px` / `--radius-panel`, background `#1A1A1A`).
  - GSAP powered title character transitions: words fade and slide up (`power3.out`).
  - Large SVG Brand logo featuring white lettering and gold-colored (`#B7A073`) accents that dynamically clip-reveals itself from bottom to top as you scroll.
  - Active newsletter capture form with positive validation transitions.
  - Highlighted email anchor point using a signature electric blue accent square (`--color-bd-placeholder`).

---

## 5. Micro-Animations & Easing Guidelines

All custom user interface animations should align with these durations to preserve a luxury feels:

- **Ultra-fast Easing (Pills / Badges / Input Highlights)**: `0.15s ease`.
- **Standard Button & Anchor Overlays**: `0.2s ease` or `duration-200`.
- **Card Panel Overlays / Height Expansions**: `0.28s` to `0.35s` using `cubic-bezier(0.25, 1, 0.5, 1)` or `ease`.
- **GSAP Orchestrations**:
  - Entrance animations: Duration of `0.9s`, delay offsets of `0.1s`, staggered item sequences of `0.1s`, with easing defined as `'power3.out'`.
  - Form transitions (fade outs): Duration of `0.28s`, easing defined as `'power2.in'`.

---

## 6. Development Checklist for New Pages

When developing additional pages or features (e.g. Services, About, Portfolio):
1. **Font Variables**: Ensure pages use `var(--font-geist)` or standard fallbacks for body, and `var(--font-source-serif-4)` for display serif emphasis.
2. **Backdrops & Canvases**: Use standard `#000000` default bg or `--color-bd-black` for high-contrast dark sections. For high-contrast panels, utilize `--color-bd-card`.
3. **Margins & Spacings**: Restrict layout containers to `max-w-[1280px]` and maintain section boundaries using fluid paddings (`py-24` or `py-32`).
4. **Dividers & Outlines**: Implement `#1a1a1a` for solid borders and `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.1)` for glass surfaces.
5. **Interactive Controls**: Apply transitions explicitly to interactive states (`hover:`, `focus:`, `disabled:`). Ensure color changes use smooth transitions (`transition-colors duration-200`).
6. **Unique Testing IDs**: Place semantic descriptive `id` attributes on form inputs, interactive links, accordions, and buttons to guarantee testability.
