# Barons Website Redesign Blueprint

Status: Proposed foundation for review  
Branch: `develop`  
Scope: Content, information architecture, user journeys, design system, components, motion, CMS and CRM integration  
Implementation status: No production UI changes in this document

## 1. Purpose

This document defines the strategic and visual foundation for the next Barons website before implementation begins. It is intended to keep writing, design, components, CMS content and CRM workflows aligned.

The redesign should feel editorial, confident and contemporary while remaining unmistakably Barons: Tanzanian in context, precise in execution and focused on making real quality visible.

The redesign is informed by:

- Barons' approved public positioning and the line **Make Quality Visible.**
- The existing Barons website, portfolio content and technical architecture.
- The Foster Digital Agency community design as a visual reference for editorial scale, whitespace, project composition and modular page rhythm.
- Motto as a strategic reference for belief-led positioning, named methods, evidence-rich case studies, structured engagements and thought leadership.

These sources are references, not templates. We should adopt useful principles without copying protected copy, layouts, branding, imagery or proprietary naming.

## 2. Strategic recommendation

Keep the existing Next.js application and redesign it systematically. Do not migrate to Vite.

The target platform remains one connected system:

1. The public website communicates the Barons proposition and generates qualified enquiries.
2. Sanity manages public editorial content such as work, articles, team profiles and reusable page modules.
3. Supabase manages private operational data such as users, enquiries, leads, clients, projects, tasks and activity history.
4. A protected `/admin` experience connects website publishing with CRM workflows.

### Primary website goal

Turn qualified visitors into confident prospective clients by showing:

- what Barons believes;
- who Barons is for;
- what Barons can solve;
- how Barons works;
- evidence that Barons can deliver; and
- a clear next step.

### Supporting goals

- Present Barons as a strategic partner, not a production-only vendor.
- Make diverse capabilities feel like one coherent business.
- Establish a consistent language and visual system.
- Make projects and articles easy to publish without code changes.
- Convert enquiries directly into structured CRM leads.
- Create a scalable foundation for future client, proposal and project-management features.

## 3. Brand idea and public positioning

### Core line

**Make Quality Visible.**

This should be treated as the central organizing idea, not merely a footer tagline. Every page should demonstrate how Barons closes the gap between the quality of a client's work and the way that work is perceived or experienced.

### Supporting line

**Strategy. Precision. Craft.**

### Short description

Barons is a Tanzanian creative and business solutions company helping serious businesses, brands and organizations present themselves clearly, communicate with confidence and deliver experiences worthy of the quality behind them.

### One-sentence digital description

Barons turns strong businesses into clear brands, effective digital experiences, memorable moments and practical solutions people can trust.

### Positioning guardrail

The company has a broad offer. The website must not read like an unrelated list of services. Every capability should connect to one promise:

> We help serious operators make the quality of what they do visible, credible and valuable.

## 4. Audiences and jobs to be done

### A. Founders and business leaders

They need to improve how their company is positioned, understood and trusted.

Questions they bring:

- Can Barons understand the business problem behind the design request?
- Have they solved serious problems before?
- Will the process be organized and reliable?
- What level of investment and participation will be required?

Primary path: Home -> Work -> Capability or Method -> Start a project.

### B. Organizations and programme teams

They need credible communication, digital platforms, campaigns, reports or event experiences delivered with accountability.

Questions they bring:

- Can Barons work with multiple stakeholders and detailed requirements?
- Can they manage content-heavy or multilingual work?
- Do they understand accessibility, reporting and institutional standards?

Primary path: Relevant case study -> Method -> Capabilities -> Enquiry.

### C. Couples and event clients

They need a coordinated, polished and dependable creative experience for an important personal event.

Primary path: Experiences capability -> Selected event work or Timeless Vows -> Enquiry.

### D. Procurement and sourcing clients

They need clearer specifications, dependable supplier coordination and transparent delivery.

Primary path: Sourcing capability -> Process and safeguards -> Enquiry.

### E. Readers and future clients

They discover Barons through an article, recommendation or search result and need useful thinking before they are ready to enquire.

Primary path: Article -> Related work or capability -> Newsletter or enquiry.

## 5. Information architecture

### Primary navigation

| Label | Route | Purpose |
|---|---|---|
| Work | `/work` | Evidence and case studies |
| Capabilities | `/capabilities` | Problems, outcomes and services |
| Method | `/method` | The five-step quality process |
| About | `/about` | Positioning, story, promise and team |
| Journal | `/journal` | Articles, perspectives and practical guidance |
| Start a project | `/contact` | Primary conversion action |

Use **Capabilities** instead of **Services** because the offer includes strategic thinking, delivery systems and business support—not only production tasks.

### Secondary and utility routes

- `/work/[slug]`
- `/capabilities/[slug]` when enough content exists to justify dedicated pages
- `/journal/[slug]`
- `/authors/[slug]`
- `/privacy`
- `/terms`
- `/studio` for Sanity editors
- `/admin` for authenticated operational users

### Recommended footer groups

- Explore: Work, Capabilities, Method, About
- Learn: Journal, FAQs, Contact
- Connect: LinkedIn, Instagram, email and telephone
- Legal: Privacy and Terms
- Locations: Dar es Salaam, Tanzania

## 6. Core user journeys

### Journey 1: Qualified enquiry

1. Visitor understands the central promise in the first screen.
2. Visitor sees selected evidence rather than an unverified list of claims.
3. Visitor opens a case study relevant to their need.
4. Visitor reviews the challenge, thinking, execution and outcome.
5. Visitor reviews the Barons method and capability fit.
6. Visitor submits a structured project enquiry.
7. The submission creates a CRM lead with source and interest data.
8. Barons receives an internal notification and begins qualification.

### Journey 2: Article-led discovery

1. Visitor lands on an article from search or social media.
2. Article establishes useful expertise without a hard sell.
3. Related capability and case-study links give the reader evidence.
4. Reader subscribes or starts an enquiry.
5. Source, article and campaign parameters are recorded in the CRM.

### Journey 3: Referral visitor

1. Visitor arrives already aware of Barons.
2. Work, process and contact actions are visible immediately.
3. Contact form asks only information needed for a useful first conversation.
4. Confirmation explains what will happen next and when.

### Journey 4: CRM project to public case study

1. A won lead becomes a client and active CRM project.
2. The internal team records scope, dates, services, milestones and outcomes.
3. When complete, an authorized user selects **Create case-study draft**.
4. A Sanity draft is created with approved non-confidential fields.
5. An editor adds the narrative, media, credits, SEO and evidence.
6. Publication requires editorial approval.

## 7. Voice and editorial rules

### Voice attributes

- Confident, never boastful.
- Intelligent, never academic for its own sake.
- Precise, never overloaded with jargon.
- Sophisticated, never distant.
- Approachable, never casual about quality.
- Commercially aware, never desperate to sell.

### Writing principles

1. Lead with the business meaning, then explain the deliverable.
2. Prefer specific verbs: clarify, position, organize, build, launch, measure.
3. Use short headlines and readable paragraphs.
4. Show evidence before adjectives.
5. Use sentence case for most interface language.
6. Reserve all caps for small labels, indexes and metadata.
7. Do not use a statistic unless its owner, period and source are recorded.
8. Do not publish a testimonial without permission and attribution.
9. Avoid claims such as "world-class," "best," "stunning," "innovative" and "results-driven" unless the surrounding evidence makes the meaning concrete.
10. Refer to people as clients, partners, readers or visitors—not users—unless discussing a digital product.

### Preferred vocabulary

- Start a project
- View the work
- Explore the capability
- See how we work
- Selected work
- Our approach
- What changed
- The outcome
- Built in Tanzania

### Avoid

- Hire us today
- Cheap or affordable
- We do everything
- One-stop shop
- Cutting-edge solutions
- Transform your business overnight
- Generic filler such as "we bring your vision to life" without explaining how

## 8. Page content blueprint

The following copy is a first editorial draft. Final publication still requires founder approval, factual verification and the replacement of marked evidence placeholders.

### 8.1 Home

#### Hero

Eyebrow:

> BARONS / DAR ES SALAAM

Headline:

> Make quality visible.

Intro:

> We help serious Tanzanian businesses and organizations turn the quality of what they do into brands, digital experiences, memorable moments and practical solutions people can trust.

Primary action: **View selected work**  
Secondary action: **Start a project**

Support line:

> Strategy. Precision. Craft.

#### The gap

Label: **WHY BARONS**

Headline:

> Good work should not be underestimated.

Body:

> Too many capable businesses are held back by unclear positioning, inconsistent communication or experiences that do not reflect the quality behind them. Barons closes that gap—combining strategic thinking, creative direction and reliable execution to help quality become visible.

#### Selected work

Label: **SELECTED WORK**

Headline:

> Evidence, not decoration.

Intro:

> A selection of brands, platforms and experiences built around a real problem, a clear idea and careful execution.

Actions: **View case study** and **See all work**.

Each project card must show project name, client category, year and the most relevant outcome or scope. Do not repeat identical labels across every card.

#### Capabilities

Label: **WHAT WE DO**

Headline:

> Different capabilities. One standard.

Intro:

> We bring strategy, creativity and disciplined delivery together around the result a client needs.

Capability groups:

1. **Digital marketing**  
   Campaigns, content and channel systems designed to make a business easier to discover, understand and choose.
2. **Brand and creative**  
   Positioning, identity and communication systems that express the real quality of a business consistently.
3. **Wedding and event creative**  
   Coordinated identities, invitations, digital experiences and event communication designed with care and delivered reliably.
4. **Product sourcing and procurement**  
   Structured support for identifying, specifying and coordinating quality products from supplier to delivery.
5. **Business support and creative consultancy**  
   Practical strategic and creative support for teams that need clarity, capacity or a dependable execution partner.

#### Method

Label: **THE BARONS QUALITY GATE**

Headline:

> Quality is not a final check. It is the process.

Intro:

> Every engagement moves through five deliberate gates so the work stays aligned with the problem, the audience and the standard promised.

Steps:

1. **Understand** — The client, problem, audience, objective, constraints and definition of success.
2. **Strategize** — The clearest route from the present situation to the desired outcome.
3. **Create** — The identity, experience, product, campaign or solution with craft and intent.
4. **Verify** — Accuracy, quality, accessibility, responsiveness and alignment with the approved direction.
5. **Deliver** — Professional handover, clear communication, documentation and follow-up.

Action: **See how we work**.

#### Proof

Label: **PROOF OF QUALITY**

Headline:

> Measured by what changed.

Use only verified metrics. Preferred examples include delivery time, conversion improvement, reach, applications, qualified enquiries, repeat work, accessibility improvements or content-management efficiency.

Until verified proof is available, use client names, detailed case-study outcomes and approved testimonials instead of invented counters.

#### About

Label: **ABOUT BARONS**

Headline:

> Built in Tanzania. Exacting by standard.

Body:

> Barons is a creative and business solutions company for people who take their work seriously. We combine local understanding with disciplined strategy, modern craft and accountable delivery—so strong ideas and capable businesses are seen at their true value.

Action: **Meet Barons**.

#### Journal

Label: **JOURNAL**

Headline:

> Thinking behind the work.

Body:

> Practical perspectives on brand, digital experience, communication, events, sourcing and the systems that make quality repeatable.

Action: **Read the journal**.

#### Closing call to action

Headline:

> Your work deserves to be seen at its true value.

Body:

> Tell us what you are building, changing or trying to make clearer. We will help identify the most useful next step.

Action: **Start a project**.

### 8.2 Work archive

Headline:

> Work that makes quality visible.

Intro:

> Explore selected engagements across brand, digital platforms, communication and experiences. Each case study explains the problem, the thinking, the work and what changed.

Filters should be optional and based on useful visitor choices, not internal terminology:

- All
- Brand
- Digital
- Campaigns
- Experiences
- Business solutions

### 8.3 Case-study template

Every published case study should include:

1. Project title and concise outcome statement.
2. Client, year, sector, scope, duration and live link when appropriate.
3. Context and challenge.
4. Strategic insight or organizing idea.
5. Approach and key decisions.
6. Visual or functional execution.
7. Verified outcome and evidence.
8. Approved client quote when available.
9. Credits.
10. Related capability, article and next project.

Recommended labels:

- Context
- The challenge
- The idea
- What we did
- The system
- What changed
- Credits

Avoid presenting a gallery with no explanation. The narrative should make the work more valuable than the images alone.

### 8.4 Capabilities

Hero headline:

> Clarity before decoration. Systems before noise.

Intro:

> Barons combines strategic thinking and careful execution across five capability areas. We recommend the right combination for the problem rather than selling a fixed list of outputs.

Each capability module should answer:

- What problem does this solve?
- Who is it for?
- What outcomes should the client expect?
- What may be included?
- Which case studies demonstrate it?
- What is the next step?

Do not publish fixed pricing until scope boundaries, commercial approval and maintenance rules are defined. Use engagement starting points only if they help qualify leads and can be maintained accurately.

### 8.5 Method

Hero headline:

> Quality is a process.

Intro:

> Our five-step quality gate keeps strategy, creativity and delivery connected from the first conversation to the final handover.

Sections:

- Understand
- Strategize
- Create
- Verify
- Deliver
- What we need from clients
- Communication and approvals
- Frequently asked questions

The page should clearly explain that client participation, timely feedback and approved decision-makers are part of successful delivery.

### 8.6 About

Hero headline:

> Built to close the gap between quality and perception.

Lead:

> Barons exists because capable businesses should not be invisible, inconsistent or underestimated. We help make their quality clear through strategy, communication, creative work, experiences and dependable execution.

Recommended sections:

- Why Barons exists
- The public brand promise
- How the company works
- Selected values expressed as behaviors
- Founders and team
- Tanzania and regional ambition
- Careers or collaboration when active

Values should be demonstrated as behaviors rather than published as an undifferentiated list. Suggested groupings:

- **Raise the standard** — excellence, precision and creativity.
- **Do what we promise** — integrity, reliability and accountability.
- **Work with people, not around them** — customer focus, collaboration and respect.
- **Improve the system** — innovation, learning and documentation.

### 8.7 Journal

Hero headline:

> Ideas for businesses serious about how they are seen.

Intro:

> Analysis, practical guidance and perspectives from the work of building clearer brands, stronger digital experiences and more reliable creative systems.

Initial editorial categories:

- Brand and positioning
- Websites and digital experience
- Marketing and communication
- Events and audience experience
- Sourcing and business systems
- Inside Barons

Initial article directions:

1. Why good Tanzanian businesses are often underestimated online.
2. What a serious website brief should include before design begins.
3. The difference between a logo and a working brand system.
4. How to measure whether a website is creating business value.
5. Why quality control should begin before creative production.
6. What organizations should prepare before commissioning a content-heavy website.
7. Building bilingual digital experiences for Tanzanian audiences.
8. From completed project to credible case study.

### 8.8 Contact

Hero headline:

> Tell us what deserves to be seen.

Intro:

> Share the problem, opportunity or change you are working through. We will review the details and respond with the most useful next step.

Recommended fields:

- Full name
- Work email
- Phone or WhatsApp, optional
- Company or organization
- Capability of interest
- Project stage
- Indicative budget range
- Preferred launch or delivery period
- What needs to change?
- How did you hear about Barons?
- Consent to the privacy notice

Submit label: **Send project enquiry**

Success message:

> Thank you. Your enquiry has reached Barons. We will review it and respond within the published response window.

Only publish a response-time commitment that the team can consistently meet.

## 9. Design direction

### Design concept

**Editorial confidence with visible precision.**

The interface should behave like a well-directed publication: strong hierarchy, deliberate pacing, asymmetric but controlled compositions, excellent typography and enough space for work to carry the argument.

### Principles to adopt from the references

| Principle | Barons interpretation |
|---|---|
| Oversized editorial type | Use short, meaningful statements at large scale; never enlarge weak copy. |
| Asymmetric project rhythm | Alternate image scale and alignment while preserving a consistent grid and metadata system. |
| Restrained palette | Let warm paper, ink and media dominate; use Barons navy and gold as signals. |
| Named methodology | Turn the existing five-step quality gate into a clear, ownable method. |
| Outcome-led services | Explain capabilities through problems, outcomes and proof—not a shopping list. |
| Thought leadership | Make useful articles part of the main experience, not an abandoned blog. |
| Repeated conversion paths | Place contextual calls to action after evidence and explanation. |
| Rich case studies | Combine narrative, media, decisions and verified outcomes. |

### What not to copy

- Reference-site headlines, slogans, proprietary programme names or body copy.
- Identical hero composition or project sequence.
- Decorative statistics without Barons evidence.
- Pricing cards designed for a different commercial model.
- Generic team, testimonial or blog modules with placeholder content.
- Motion that slows access to information or ignores reduced-motion preferences.

## 10. Design-system foundations

### 10.1 Color roles

The final values should be tested in design and code, but the proposed foundation is:

| Token | Proposed value | Role |
|---|---:|---|
| `color.ink` | `#101725` | Primary text and dark sections |
| `color.navy` | `#14264A` | Core Barons brand field |
| `color.navyStrong` | `#0C1B36` | High-contrast dark surface |
| `color.paper` | `#F3F0E8` | Warm editorial background |
| `color.surface` | `#FFFFFF` | Cards, forms and clean sections |
| `color.gold` | `#E89A00` | Brand signal and selected emphasis |
| `color.blue` | `#315A98` | Interactive or supporting brand color |
| `color.muted` | `#69707C` | Secondary text |
| `color.line` | `rgba(16, 23, 37, 0.16)` | Rules and borders |
| `color.positive` | `#176246` | Confirmed success states |
| `color.critical` | `#B9382F` | Errors and destructive warnings |

Rules:

- Gold is an accent, not a default text color on white.
- Media and typography should provide most of the visual energy.
- Every text/background pair must meet WCAG 2.2 AA contrast.
- Interactive states must not rely on color alone.

### 10.2 Typography

Retain the current licensed and performant font foundation:

- **Geist** for headlines, body copy, labels, navigation and interface text.
- **Source Serif 4 Italic** for limited editorial emphasis, quotations or contrast—not long body copy.

Proposed semantic scale:

| Style | Desktop intent | Mobile intent |
|---|---|---|
| Display XL | `clamp(4.5rem, 10vw, 9rem)` | Fluid, maximum 4.75rem |
| Display L | `clamp(3.5rem, 7vw, 7rem)` | Fluid, maximum 3.75rem |
| Heading 1 | `clamp(3rem, 5vw, 5.5rem)` | Fluid, maximum 3.25rem |
| Heading 2 | `clamp(2.25rem, 3.5vw, 4rem)` | Fluid, maximum 2.5rem |
| Heading 3 | `clamp(1.5rem, 2vw, 2.25rem)` | 1.5rem to 1.875rem |
| Lead | 1.375rem to 1.75rem | 1.125rem to 1.375rem |
| Body | 1rem to 1.125rem | 1rem |
| Small | 0.875rem | 0.875rem |
| Label | 0.75rem uppercase | 0.75rem uppercase |

Typography rules:

- Display line lengths should normally stay under 12 words.
- Body measure should remain between 55 and 75 characters.
- Use tight display leading and comfortable body leading.
- Avoid all-uppercase paragraphs.
- Use tabular numerals for metrics and timelines.

### 10.3 Layout and spacing

- Twelve-column desktop grid.
- Maximum content width: 1440px.
- Reading width: 680px to 760px.
- Desktop gutters: 48px to 64px.
- Tablet gutters: 32px.
- Mobile gutters: 20px to 24px.
- Base spacing unit: 4px, with an 8px practical rhythm.
- Section spacing should be fluid and use named tokens rather than one-off values.

Proposed spacing tokens:

`space.1` 4, `space.2` 8, `space.3` 12, `space.4` 16, `space.5` 24, `space.6` 32, `space.7` 48, `space.8` 64, `space.9` 96, `space.10` 128, `space.11` 160.

### 10.4 Shape, borders and elevation

- Use square or lightly rounded editorial surfaces by default.
- Small control radius: 6px.
- Card radius: 12px.
- Feature-media radius: 16px maximum.
- Pills are reserved for tags, filters and compact controls.
- Prefer one-pixel rules and tonal separation over large shadows.
- Use shadows only when they explain layering or interaction.

### 10.5 Image direction

Use imagery that feels observed, capable and specific:

- real project outcomes and interfaces;
- real people working, presenting, building or participating;
- Tanzanian locations and context without stock-photo stereotypes;
- close detail and wide environmental views;
- strong cropping and intentional negative space;
- accurate captions and credits.

Do not use unrelated stock images as permanent project covers. Temporary placeholders must be labeled in the CMS.

## 11. Component system

Components should be built in Figma and code with matching names, variants and intent. Composition belongs at page level; reusable interaction and styling belong in components.

### Global components

| Component | Required variants |
|---|---|
| `SiteHeader` | Light, dark, transparent, condensed |
| `NavigationMenu` | Desktop panel, mobile drawer |
| `SiteFooter` | Default, compact |
| `Button` | Primary, secondary, text, icon; default, hover, focus, disabled, loading |
| `TextLink` | Inline, standalone, arrow, external |
| `SectionLabel` | Numbered, unnumbered, light, dark |
| `Tag` | Static, filter, selected |
| `Divider` | Solid, subtle, light-on-dark |

### Editorial components

| Component | Purpose |
|---|---|
| `StatementHero` | Short belief-led headline, intro and actions |
| `SplitStatement` | Editorial heading paired with explanatory copy |
| `ManifestoBlock` | Strong point of view with controlled line length |
| `PullQuote` | Approved quotation with attribution |
| `ProofStrip` | Verified metrics or proof points |
| `RichText` | Accessible article and case-study content |
| `MediaFigure` | Image or video with caption, credit and ratio control |

### Work components

| Component | Purpose |
|---|---|
| `FeaturedProject` | Large homepage project feature |
| `ProjectCard` | Reusable archive card |
| `ProjectGrid` | Alternating editorial layout |
| `ProjectMeta` | Client, year, sector, scope and duration |
| `CaseStudyChapter` | Numbered narrative section |
| `OutcomePanel` | Verified evidence and approved quote |
| `NextProject` | Contextual case-study continuation |

### Capability and method components

- `CapabilityIndex`
- `CapabilityPanel`
- `DeliverablesList`
- `EngagementFit`
- `ProcessRail`
- `ProcessStep`
- `FAQAccordion`

### Journal components

- `ArticleCard`
- `ArticleFeature`
- `ArticleMeta`
- `AuthorCard`
- `RelatedReading`
- `NewsletterForm`

### Conversion components

- `ProjectEnquiryForm`
- `FormField`
- `SelectField`
- `BudgetRangeField`
- `FormStatus`
- `ContactOptions`
- `CallToActionBand`

## 12. Interaction and motion system

Motion should clarify hierarchy, continuity and state. It should not become the identity by itself.

### Motion principles

- Reveal structure, not every individual element.
- Keep reading and navigation available immediately.
- Use fewer, better transitions.
- Preserve scroll position and avoid unexpected layout shifts.
- Disable or simplify non-essential motion when `prefers-reduced-motion` is enabled.
- Never require animation to understand content.

### Recommended patterns

1. **Page entrance** — restrained opacity and vertical reveal for the hero, 500-700ms.
2. **Navigation** — menu panels reveal as one coordinated system, not many unrelated tweens.
3. **Project media** — subtle scale or mask reveal when entering the viewport.
4. **Project archive** — alternating cards retain natural document flow; no scroll hijacking.
5. **Capability rail** — active capability changes supporting media or details with an accessible non-animated fallback.
6. **Quality gate** — steps progress through a pinned or sequential story on large screens and a normal vertical list on mobile.
7. **Links and buttons** — 160-220ms state transitions with visible focus treatment.
8. **Route transition** — short continuity transition; content must not wait behind a long preloader on repeat visits.

### Motion tokens

- `duration.fast`: 180ms
- `duration.base`: 320ms
- `duration.slow`: 650ms
- `ease.standard`: cubic-bezier(0.22, 1, 0.36, 1)
- `ease.exit`: cubic-bezier(0.4, 0, 1, 1)

The current GSAP and Lenis implementation can support this direction. Duplicate and deprecated Lenis dependencies should be resolved during implementation.

## 13. Responsive behavior

- Content priority must remain identical across breakpoints.
- Mobile layouts should be designed, not merely stacked desktop sections.
- Oversized type must remain readable without clipping or extreme line breaks.
- Navigation becomes a full-height accessible drawer.
- Project metadata moves into a compact two-column or stacked definition list.
- Pinned desktop stories become normal vertical sequences on smaller screens.
- Hover-only information must also be visible through focus or tap.
- Media must define aspect ratio to prevent layout shift.
- Touch targets must be at least 44px.

Reference breakpoints may align with Tailwind, but components should respond to available space rather than assume device models.

## 14. Accessibility and quality standards

Target WCAG 2.2 AA.

Required standards:

- Semantic landmarks and heading order.
- Keyboard access to navigation, filters, forms, dialogs and accordions.
- Visible focus indicators.
- Meaningful alternative text and empty alt text for decorative imagery.
- Captions or transcripts for meaningful video.
- Form labels, descriptions and errors connected programmatically.
- No color-only meaning.
- Reduced-motion support.
- Sufficient text contrast.
- Clear status announcements for asynchronous forms.
- Accessible names for icon-only controls.
- Content usable at 200 percent zoom.

## 15. Performance and technical budgets

The visual direction must remain fast on Tanzanian mobile networks.

Initial budgets:

- Largest Contentful Paint target below 2.5 seconds at the 75th percentile.
- Cumulative Layout Shift below 0.1.
- Interaction to Next Paint below 200ms.
- Initial route JavaScript should be reviewed per page and kept as low as the experience allows.
- Avoid autoplaying a 29MB hero video. Provide optimized poster images and responsive, compressed media variants.
- Lazy-load below-the-fold media.
- Use modern image formats and explicit dimensions.
- Load animation code only where required.
- Keep Sanity images transformed through the image pipeline.

## 16. Content models

### Project

Add or standardize:

- title and slug;
- short outcome statement;
- client and sector;
- capability references;
- year, duration and status;
- cover media and archive-media variant;
- context, challenge, insight, approach, system and outcome;
- verified metrics with source notes kept private;
- testimonial with approval state;
- credits;
- SEO title, description and social image;
- featured and display order;
- publication status and date.

### Article

- title and slug;
- excerpt;
- author;
- category and tags;
- cover image;
- portable rich-text body;
- related projects and capabilities;
- SEO fields;
- canonical URL;
- publication status, date and scheduled date;
- estimated reading time.

### Capability

- name and slug;
- proposition;
- problems solved;
- ideal fit;
- outcomes;
- deliverables;
- related projects and articles;
- enquiry category mapping;
- display order.

### Person

- name, role and short biography;
- portrait and alt text;
- social links;
- author status;
- team visibility;
- display order.

### Testimonial

- quote;
- person, role and organization;
- related project;
- permission status;
- source and approval date;
- publication status.

## 17. CRM foundation

Recommended private Supabase entities:

- `profiles`
- `roles`
- `organizations`
- `contacts`
- `leads`
- `lead_activities`
- `projects`
- `project_members`
- `tasks`
- `notes`
- `files`
- `proposals`
- `activity_logs`

Suggested lead pipeline:

1. New enquiry
2. Reviewing
3. Contacted
4. Discovery
5. Qualified
6. Proposal sent
7. Negotiation
8. Won
9. Lost
10. Archived

Public forms must write through validated server-side actions, include rate limiting and bot protection, and never expose database error details to visitors.

## 18. Delivery roadmap

### Phase 0: Foundation and decisions

- Approve this blueprint.
- Confirm public service hierarchy and naming.
- Confirm which business lines require dedicated pages or separate brands.
- Collect verified metrics, testimonials, client permissions and project media.
- Approve public copy and response-time commitments.

### Phase 1: Design system

- Create Figma variables for color, type, spacing, radius and motion.
- Create text and effect styles.
- Build accessible component variants.
- Design desktop and mobile templates.
- Map Figma components to React component names.
- Implement CSS variables and Tailwind theme tokens.
- Create a component development and review environment.

### Phase 2: Public redesign

- Header, navigation and footer.
- Home.
- Work archive and case-study template.
- Capabilities.
- Method.
- About.
- Contact.
- Responsive and accessibility review.

### Phase 3: Editorial publishing

- Article, author, category and capability schemas.
- Journal archive and article pages.
- Preview and publishing workflows.
- Page metadata, structured data, sitemap and feeds.
- Newsletter integration.

### Phase 4: CRM

- Supabase migrations and row-level security.
- Authentication and roles.
- Dashboard, leads, contacts, clients, projects and tasks.
- Contact-to-lead automation.
- Activity history and operational notifications.

### Phase 5: Integration and optimization

- CRM project to Sanity case-study draft.
- Analytics and conversion events.
- Security review and rate limiting.
- Media optimization.
- Performance, accessibility and SEO audits.
- Content QA and launch checklist.

## 19. Definition of done for future implementation PRs

Every implementation PR should include:

- the blueprint section or approved design it implements;
- screenshots for affected breakpoints;
- component states and edge cases;
- accessibility checks;
- reduced-motion behavior when animation is involved;
- tests for business logic;
- CMS or database migration notes;
- performance impact;
- content and SEO review;
- a rollback or compatibility note when data structures change.

## 20. Content and evidence still required

Before final design, Barons should provide or approve:

- final public description of each capability;
- priority order of capabilities;
- approved founder and team biographies;
- high-resolution team portraits;
- verified client list and logo permissions;
- at least three approved testimonials;
- verified metrics with sources and reporting periods;
- final project shortlist;
- original project imagery, video and credits;
- outcome evidence for every featured case study;
- contact response-time commitment;
- legal privacy and cookie language;
- social profile URLs;
- newsletter ownership and cadence;
- whether wedding/event and sourcing work remain within this website or link to dedicated experiences.

## 21. Immediate approval decisions

The following decisions should be made before interface coding begins:

1. Approve **Make Quality Visible.** as the dominant website proposition.
2. Approve the primary navigation: Work, Capabilities, Method, About, Journal and Start a project.
3. Approve the five public capability groups or request consolidation.
4. Decide whether the site presents **Barons** as the master brand or **Barons Digital** as a specialist unit.
5. Approve Geist and Source Serif 4 as the initial typography system.
6. Approve the warm-paper, ink, navy and gold visual direction.
7. Confirm that unverified statistics will not be published.
8. Confirm the first three case studies and first four journal articles to prepare.

Once these decisions are approved, design-system work can begin without creating avoidable component or content rework.
