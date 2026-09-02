# Barons Digital Design System v1

Status: foundation approved; Figma component build in progress  
Figma: https://www.figma.com/design/ijeHKdbkpakvtDDcB2yx2h  
Reference direction: Foster community layout and Motto's Outten & Golden case-study system  
Last updated: 2 September 2026

## 1. Design intent

Barons should feel like an editorial publication with the precision of a digital product. The interface is quiet; ideas, language, photography and film provide the energy.

The system is built around four principles:

1. **Clarity first.** Hierarchy should be understood in one glance.
2. **Image-led.** Photography and film provide colour and emotion.
3. **Editorial rhythm.** Alternate scale, density and silence across the page.
4. **Purposeful motion.** Motion explains structure and rewards attention.

This is an original Barons system. The references inform the principles and composition, not copied brand assets, copy or signature expressions.

## 2. Visual grammar

Every public page should combine the same small set of moves:

- small indexed labels paired with large narrative headings;
- a twelve-column desktop grid with deliberate asymmetry;
- generous white space before and after high-impact statements;
- thin rules as the primary separator;
- full-bleed, split, offset and portrait media compositions;
- near-square corners and almost no elevation;
- black and white interface surfaces, with imagery carrying visual colour;
- occasional editorial serif italics used as a human aside, never as the default body face.

## 3. Color tokens

### 3.1 Primitives

| Token | Value | Purpose |
|---|---:|---|
| `neutral/000` | `#FFFFFF` | Pure white |
| `neutral/025` | `#FAFAF8` | Warm white |
| `neutral/050` | `#F2F2EF` | Muted canvas |
| `neutral/100` | `#E4E4DF` | Subtle rules |
| `neutral/300` | `#B7B7B0` | Disabled and quiet borders |
| `neutral/500` | `#777771` | Muted text |
| `neutral/700` | `#3A3A37` | Secondary text |
| `neutral/850` | `#1A1A18` | Strong surface |
| `neutral/950` | `#0B0B0A` | Near-black surface |
| `neutral/1000` | `#000000` | Pure black |
| `signal/success` | `#246B49` | System feedback only |
| `signal/error` | `#A43832` | Validation only |

### 3.2 Semantic roles

Use semantic roles in components; do not bind components directly to primitives.

| Family | Tokens |
|---|---|
| Surface | `canvas`, `subtle`, `muted`, `strong`, `inverse` |
| Text | `primary`, `secondary`, `muted`, `inverse`, `disabled` |
| Border | `subtle`, `default`, `strong`, `inverse` |
| Icon | `primary`, `inverse` |
| Status | `success`, `error` |

Figma Starter supports one variable mode in this workspace. Light and dark compositions therefore use explicit canvas and inverse tokens rather than a second mode.

## 4. Typography

### 4.1 Families

- **Geist**: primary interface, display, headings, labels and body.
- **Source Serif 4 Italic**: restrained editorial emphasis.

### 4.2 Styles

| Style | Size / line | Weight | Use |
|---|---:|---|---|
| Display / Hero | 144 / 132 | Medium | One short homepage or case-study statement |
| Display / Statement | 96 / 92 | Medium | Section-scale propositions |
| Heading / H1 | 72 / 72 | Medium | Page title |
| Heading / H2 | 48 / 52 | Medium | Major section title |
| Heading / H3 | 32 / 36 | Medium | Card or sub-section title |
| Body / Large | 20 / 30 | Regular | Introductions and lead copy |
| Body / Default | 16 / 24 | Regular | Core reading text |
| Body / Small | 14 / 20 | Regular | Metadata and supporting copy |
| Label / Index | 12 / 16 | Medium | Section numbers and taxonomy |
| Label / UI | 12 / 16 | Medium | Controls and compact labels |
| Editorial / Accent | 72 / 72 | Italic | One human or emotional phrase |

Display copy must stay short enough to retain its intended line count. Body copy defaults to a 620px maximum measure.

## 5. Spacing and layout

### 5.1 Spacing scale

`0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 256`

The 4–32 range handles component spacing. The 48–160 range controls editorial grouping. The 256 token is reserved for exceptional desktop section pauses.

### 5.2 Responsive grids

| Viewport | Columns | Edge gutter | Column gutter |
|---|---:|---:|---:|
| Desktop | 12 | 64px | 24px |
| Tablet | 8 | 32px | 20px |
| Mobile | 4 | 20px | 12px |

The reference desktop canvas is 1440px. Layouts must remain fluid rather than assuming a fixed viewport.

### 5.3 Shape

Radius tokens: `0, 2, 4, 8, 16, full`.

- Editorial media normally uses 0–4px.
- Controls may use 0–8px.
- 16px is reserved for special floating media or CRM panels.
- Full radius is reserved for filters, status chips and icon controls.
- Shadows are not a default styling device.

## 6. Media compositions

The CMS and component system must support these repeatable modules:

1. **Full bleed** — one cinematic image or video across the content width.
2. **Split 6/6** — paired media with equal visual weight.
3. **Offset 4/7** — one dominant asset with deliberate negative space.
4. **Portrait + note** — portrait image paired with concise commentary.
5. **Mosaic** — two or three assets with one clear dominant image.
6. **Statement break** — oversized text between image sequences.

Images should feel documentary, tactile and specific. Avoid generic technology stock photography, arbitrary gradients and decorative mockups that do not reveal the work.

## 7. Core component inventory

### 7.1 Actions

- **Button**: Primary, Secondary, Ghost; Medium and Large; Default, Hover, Focus and Disabled.
- **Text link**: default and inverse; optional directional arrow.
- **Filter chip**: Default, Selected and Disabled.

Primary actions are black on white or white on black. Secondary actions use a one-pixel rule. Ghost actions are text-led.

### 7.2 Navigation

- Desktop site header
- Mobile site header
- Menu panel
- Breadcrumb / back link
- Footer link groups

Navigation wording should remain concrete: Work, Capabilities, About, Journal, Contact.

### 7.3 Editorial

- Section index
- Statement hero
- Intro block
- Long-form text block
- Pull quote
- Metadata list
- Numbered process row
- Inline media and caption
- Next-story navigation

### 7.4 Work and journal

- Project card: landscape, portrait and feature
- Project metadata row
- Case-study chapter
- Article card: lead, standard and compact
- Author/date metadata
- Topic filter
- Related-content row

### 7.5 Forms

- Text field
- Text area
- Select
- Checkbox
- Radio group
- Validation message
- Form status panel

Controls require visible hover, focus, filled, error and disabled states. Focus must never rely on colour alone.

## 8. Page patterns

### 8.1 Home

Header → statement hero → selected work → five capabilities → method → point of view → journal → contact CTA.

### 8.2 Case study

Project hero → overview and metadata → full-bleed media → challenge → split media → idea/strategy statement → execution chapters → outcomes → next project.

### 8.3 Journal article

Article header → standfirst → lead media → reading body → pull quote or media break → related thinking → CTA.

### 8.4 Contact

Direct proposition → enquiry form → expectations / response note → alternate contact details.

## 9. Motion

Motion should be calm and spatial:

- control feedback: 160–220ms;
- content reveal: 320–480ms;
- editorial transitions: 600–900ms;
- use transforms and opacity;
- stagger only when it clarifies reading order;
- support `prefers-reduced-motion`;
- never hide critical content behind animation completion.

Recommended easing:

- UI: `cubic-bezier(0.2, 0, 0, 1)`;
- reveal: `cubic-bezier(0.16, 1, 0.3, 1)`;
- exit: `cubic-bezier(0.4, 0, 1, 1)`.

## 10. Content rules

- Lead with the visitor's problem or ambition.
- Prefer precise verbs: clarify, shape, build, launch, improve.
- Avoid unsupported superlatives and vague agency language.
- Use sentence case for headings and controls.
- Section labels may use uppercase.
- Keep display lines concise.
- Samples must remain clearly marked and isolated from production.
- Real case studies require approved client names, evidence and outcomes.

## 11. Accessibility

- Minimum WCAG AA contrast for all functional text.
- Keyboard access for every interactive component.
- Visible focus state with at least a 2px indicator.
- Minimum 44px target size for essential controls.
- Semantic heading order and landmarks.
- Descriptive alt text; decorative media uses empty alt text.
- Captions and transcripts for meaningful video.
- Never place critical copy over uncontrolled image detail without a protective surface.

## 12. Figma-to-code contract

- Figma variables use `--bd-*` web syntax.
- React components must consume semantic tokens.
- Tailwind theme variables should mirror the Figma names.
- Component names and variant properties should match code APIs where practical.
- The current hardcoded blue, cream, glass and oversized-radius values are legacy and should not be carried into the redesign unless explicitly approved.
- Build public components before page implementation.
- The CRM may share typography and semantic colours while using denser spacing and more conventional application layouts.

## 13. Figma build status

Completed:

- 83 variables across Primitives, Color, Spacing, Sizing, Radius and Typography;
- 11 local text styles;
- desktop, tablet and mobile grid styles;
- cover direction;
- foundations board covering principles, colour, typography, spacing, shape, grid and editorial rhythm.

Pending after the Figma Starter MCP quota resets or the workspace is upgraded:

- correct one wrapped display specimen on the foundations board;
- construct and validate component variants;
- document page patterns;
- add Code Connect mappings when the React components exist.

