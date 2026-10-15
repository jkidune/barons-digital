# Barons Digital

Marketing site for [Barons Digital](https://barons-digital.com), built with Next.js (App Router), GSAP, Sanity CMS and deployed to Cloudflare Workers.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Management (Sanity)

Projects (case studies) and Articles (Journal) are managed in Sanity Studio.

- **Live Studio:** https://barons-digital-studio.kidunejoseph91.workers.dev (also reachable at `/studio` on the site)
- **Project ID:** `93o5rcrm`, dataset `production`
- **Schemas:** [`src/sanity/schemaTypes/`](src/sanity/schemaTypes) — `project.ts` and `article.ts` (title, slug, category, date, excerpt, cover image, body paragraphs)
- **Front-end queries:** [`src/lib/projects.ts`](src/lib/projects.ts) and [`src/lib/articles.ts`](src/lib/articles.ts). Both revalidate every 60 seconds (ISR) and fall back to the static data in `src/data/` if Sanity is unreachable or empty.
- **Pages fed by Sanity:** `/`, `/work`, `/work/[slug]`, `/journal`, `/journal/[slug]`

Allowed CORS origins on the Sanity project: the Studio URL, `http://localhost:3000` and `https://www.barons-digital.com`.

### Studio commands

| Command | What it does |
|---|---|
| `npm run studio:dev` | Run Studio locally at http://localhost:3333 |
| `npm run studio:build` | Build the Studio bundle into `dist/` |
| `npm run studio:deploy` | Build and deploy Studio to Cloudflare Workers (`wrangler.studio.jsonc`) |

## Motion

Animation uses GSAP + ScrollTrigger with Lenis smooth scrolling, following these rules:

- Animate `transform` and `opacity` only.
- Content is readable without JavaScript; hidden start states are set from JS, never base CSS.
- Reveals play once. Scroll-linked motion is scrubbed with smoothing.
- `prefers-reduced-motion` swaps movement for a quick fade (via `gsap.matchMedia`) and disables smooth scrolling.

**Homepage:** motion lives in [`src/components/home/HomeLanding.tsx`](src/components/home/HomeLanding.tsx). The preloader and custom cursor are in [`src/components/layout/ExperienceLayer.tsx`](src/components/layout/ExperienceLayer.tsx).

**Interior pages:** [`src/components/ui/PageMotion.tsx`](src/components/ui/PageMotion.tsx) is a render-nothing component that animates markup opting in with data attributes:

| Attribute | Effect |
|---|---|
| `data-reveal` | Fade and rise into place once (batched, staggered) |
| `data-mask` | Image or video settles from a slight zoom inside its frame |
| `data-progress` | Fixed bar scrubbed to reading progress (journal articles) |

It is used on work, journal, services, about and contact pages.

## Page design notes

- **Case studies** (`/work/[slug]`): each section leads with a takeaway headline (the first sentence), detail beneath in a narrow reading column; the project `media` gallery renders with every third frame full-width.
- **Journal** (`/journal`): latest article featured large. **Articles** have reading time, a drop cap, a pull quote, a reading-progress bar and a read-next block.
- **Contact:** project brief form with a short "what happens next" block.

## Deployment

Production is deployed to Cloudflare from the `main` branch. Every push to `main` triggers a new Cloudflare build and deployment.

To build and deploy manually:

```bash
npm install
npm run deploy
```
