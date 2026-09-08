export type Project = {
  title: string
  icon: string
  slug: string
  category: string
  year: string
  scope: string
  timeline: string
  liveUrl: string | null
  summary: string[]
  keywords: string[]
  coverImage: string
  previewVideo: string

  client?: string
  clientType?: string
  projectType?: string
  duration?: string
  role?: string
  services?: string[]
  introductionTitle?: string
  introduction?: string[]
  challenge?: string[]
  approach?: string[]
  features?: string[]
  outcome?: string[]

  industry?: string
  outcomeStatement?: string
  scopeBlock?: { category: string; items: string[] }[]
  narrative?: string[]
  brandColor?: string
  testimonial?: { quote: string; name: string; title: string; result?: string }

  overview: string
  problem: string
  solution: string

  media: {
    type: 'image' | 'video'
    url: string
    caption?: string
    gridClass?: string
  }[]
}

const heroShowreelUrl = process.env.NEXT_PUBLIC_HERO_SHOWREEL_URL || '/videos/hero-showreel.mp4'

export const projects: Project[] = [
  {
    title: 'AfrONet',
    icon: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=80&h=80&fit=crop&q=80',
    slug: 'afronet',
    category: 'Organisational Website',
    year: '2025',
    scope: 'Website Strategy, UX/UI Design, Development, CMS, SEO and LLMO',
    timeline: '1 month',
    duration: '1 month',
    client: 'African Organic Network — AfrONet',
    clientType: 'Pan-African Network / Non-Profit Organisation',
    projectType: 'Organisational Website',
    role: 'Website strategy, information architecture, UX/UI design, development, CMS configuration, SEO and LLM optimisation',
    liveUrl: 'https://www.afronet.bio',
    previewVideo: heroShowreelUrl,
    summary: [
      'A digital platform connecting Africa’s organic agriculture movement.',
      'We helped AfrONet turn a continental mandate into a clear, connected digital experience.',
    ],
    keywords: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'SEO', 'LLMO'],
    services: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'SEO', 'LLMO'],
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&h=900&fit=crop&q=80',
    introductionTitle: 'Bringing a continental mission into one clear digital experience',
    introduction: [
      'AfrONet works across countries, institutions and agricultural networks to strengthen organic agriculture in Africa. Its digital platform needed to communicate that broad mandate without overwhelming visitors.',
      'We created a website that brings AfrONet’s identity, programmes, standards, policy work, resources and partnerships into one connected experience. The goal was to make its continental role easy to understand while giving different audiences clear pathways to explore its work and participate.',
    ],
    challenge: [
      'AfrONet serves farmers, national organic agriculture movements, researchers, policymakers, development partners and market actors. Each audience approaches the organisation with different questions and information needs.',
      'The challenge was to organise a large amount of institutional and programme information into a structure that felt simple, credible and easy to navigate.',
      'The website also needed to establish AfrONet as a recognisable authority on organic agriculture while supporting the discovery of its programmes, evidence, policy resources and impact.',
    ],
    approach: [
      'We developed a content architecture centred on AfrONet’s main areas of work: capacity and networks, standards and policy, knowledge and resources, and markets and partnerships.',
      'Clear headings, concise organisational definitions, programme pages, impact indicators and frequently asked questions were used to make information easier for both people and search technologies to understand.',
      'The website was also structured for search engine and LLM discoverability through semantic content, descriptive metadata, internal linking and answer-ready information.',
    ],
    features: [
      'Programme and initiative pages',
      'Continental impact indicators',
      'Organic standards and policy resources',
      'Partner and funder visibility',
      'News and insight publishing',
      'Frequently asked questions',
      'Newsletter integration',
      'SEO and LLM-optimised content structure',
      'Responsive mobile experience',
      'Content management system',
    ],
    outcome: [
      'The completed website gives AfrONet a clearer and more credible institutional presence. Visitors can quickly understand the organisation’s mandate, explore its programmes, access knowledge and identify opportunities to partner or participate.',
      'The result is a digital platform that does more than present information. It connects AfrONet’s programmes, evidence and partnerships into a unified story of Africa’s organic agriculture transition.',
    ],
    industry: 'Non-Profit',
    outcomeStatement: 'A clearer institutional presence that connects AfrONet’s programmes, evidence and partnerships into one story of Africa’s organic agriculture transition.',
    scopeBlock: [
      { category: 'Strategy', items: ['Content architecture', 'Audience mapping', 'Search & LLM discoverability strategy'] },
      { category: 'Design', items: ['UX/UI design', 'Information architecture', 'Responsive layout system'] },
      { category: 'Development', items: ['Website development', 'CMS configuration', 'SEO & LLMO implementation'] },
      { category: 'Delivery', items: ['Programme & initiative pages', 'Impact indicators', 'FAQ & newsletter integration'] },
    ],
    narrative: [
      'AfrONet works across countries, institutions and agricultural networks to strengthen organic agriculture in Africa — a mandate too broad for a typical organisational website.',
      'Farmers, researchers, policymakers and funders all approach AfrONet with different questions, so the site had to organise a wide institutional mandate into something simple, credible and easy to navigate.',
      'We built a content architecture around AfrONet’s core areas — networks, standards, knowledge and partnerships — structured for both human visitors and search and LLM discovery.',
    ],
    brandColor: '#2F7A3D',
    overview: 'AfrONet works across countries, institutions and agricultural networks to strengthen organic agriculture in Africa. We created a connected digital experience that makes its continental role clear and accessible.',
    problem: 'AfrONet needed to organise a large amount of institutional and programme information for farmers, researchers, policymakers, development partners and market actors without overwhelming visitors.',
    solution: 'We built a content architecture around clarity, authority and discoverability, connecting programmes, resources, standards, policy work and partnerships into a unified digital platform.',
    media: [],
  },
  {
    title: 'Framer Template for Interior Designers',
    icon: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=80&h=80&fit=crop&q=80',
    slug: 'framer-template-for-interior-designers',
    category: 'Website Templates',
    year: '2025',
    scope: 'UI Design, Framer Development, Component System',
    timeline: '2 weeks',
    duration: '2 weeks',
    clientType: 'Free Framer Marketplace Template',
    projectType: 'Website Template',
    role: 'UI design, Framer development, component system and documentation',
    liveUrl: null,
    previewVideo: heroShowreelUrl,
    summary: [
      'Hey there, design lovers! I’m excited to share a free Framer template I created just for interior designers like you, who are passionate about transforming workspaces into hubs of creativity and productivity. Whether you’re a pro looking to showcase your portfolio or a creative wanting to inspire clients with stylish, functional home offices, this template is here to help you shine',
    ],
    keywords: ['UI Design', 'Framer', 'Template', 'Component System'],
    services: ['UI Design', 'Framer Development', 'Component System'],
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=900&fit=crop&q=80',
    introductionTitle: 'A free, ready-to-launch portfolio for interior designers',
    introduction: [
      'Interior design portfolios live or die on how their photography breathes. Most free templates fight that with heavy chrome and generic layouts.',
      'We built this template as a genuine starting point — clean typography, generous image space and a calm, uncluttered structure a designer can restyle and launch with their own content in a day.',
    ],
    narrative: [
      'This free Framer template was built for interior designers who want a fast, professional way to showcase their portfolio without starting from a blank canvas.',
      'Interior design work lives and dies on how its photography breathes, so the template needed generous imagery, clean typography and a calm, uncluttered feel rather than a generic template look.',
      'We designed it as a genuine starting point — structured sections for services, process and work — that a designer can restyle and launch with their own content in a day.',
    ],
    industry: 'Templates & Products',
    outcomeStatement: 'A free, ready-to-use Framer template that gives interior designers a fast, professional way to launch their own portfolio site.',
    scopeBlock: [
      { category: 'Strategy', items: ['Positioning for a free-template audience', 'Content structure for portfolio use cases'] },
      { category: 'Design', items: ['UI design', 'Component system', 'Responsive layout'] },
      { category: 'Development', items: ['Framer build', 'CMS-ready collections', 'Interaction & animation'] },
      { category: 'Delivery', items: ['Framer Marketplace listing', 'Buyer documentation'] },
    ],
    brandColor: '#B8895A',
    overview: 'A free Framer template built for interior designers who want a fast, professional way to showcase their portfolio.',
    problem: 'Most free portfolio templates fight interior photography with heavy chrome, generic layouts and cramped image space.',
    solution: 'We designed a calm, image-first structure with clean typography that a designer can restyle and launch with their own content in a day.',
    media: [],
  },
  {
    title: 'SAfA Tanzania',
    icon: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=80&h=80&fit=crop&q=80',
    slug: 'safa-tanzania',
    category: 'Programme Website',
    year: '2024',
    scope: 'Website Strategy, Information Architecture, UX/UI Design, Development and CMS',
    timeline: '2 months',
    duration: '2 months',
    client: 'SAfA Tanzania',
    clientType: 'Multi-Partner Development Programme',
    projectType: 'Programme Website',
    role: 'Website strategy, information architecture, UX/UI design, development and CMS configuration',
    liveUrl: 'https://www.safatanzania.org',
    previewVideo: heroShowreelUrl,
    summary: [
      'One digital identity for a multi-partner youth development programme.',
      'A unified programme platform connecting partners, programmes and young people.',
    ],
    keywords: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'Content Structure'],
    services: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'Content Structure'],
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=900&fit=crop&q=80',
    introductionTitle: 'Connecting partners, programmes and young people',
    introduction: [
      'SAfA Tanzania brings together several implementing organisations working to improve the social and economic opportunities of young people.',
      'The programme operates across different regions and intervention areas, including skills development, agriculture, entrepreneurship, logistics and sexual and reproductive health.',
      'The website needed to bring these different areas together under one recognisable identity while giving each implementing partner appropriate visibility.',
    ],
    challenge: [
      'Multi-partner programmes often struggle to communicate as one initiative. Different partners, objectives, locations and activities can make the programme difficult for an outside visitor to understand.',
      'SAfA needed a platform that clearly explained the shared programme purpose while showing the distinct responsibilities and contributions of its implementing partners.',
      'It also needed to present results, stories, resources and opportunities for young people and stakeholders to engage.',
    ],
    approach: [
      'We structured the website around the central outcome of improving livelihood prospects for young people in Tanzania.',
      'The programme objectives were organised into clear thematic areas, while dedicated implementing-partner profiles explained how each organisation contributes to the wider initiative.',
      'Impact figures, programme stories, publications, galleries and community engagement features were integrated to balance institutional information with evidence of work taking place in communities.',
    ],
    features: [
      'Unified programme identity',
      'Implementing-partner profiles',
      'Programme objectives and intervention areas',
      'Beneficiary and impact statistics',
      'Publications and reports library',
      'News and success stories',
      'Photo gallery',
      'Frequently asked questions',
      'Community engagement section',
      'Newsletter integration',
      'Responsive mobile design',
      'Content management system',
    ],
    outcome: [
      'The website gives SAfA Tanzania a single digital home where partners, young people, donors and other stakeholders can understand the programme as a connected initiative.',
      'It brings together programme objectives, implementing organisations, resources and stories without losing the individual role of each partner.',
      'The result is a clearer programme identity and a more accessible platform for communicating progress, opportunity and youth impact.',
    ],
    industry: 'Development Programme',
    outcomeStatement: 'A single digital home where partners, young people and donors understand SAfA as one connected programme, not five separate organisations.',
    scopeBlock: [
      { category: 'Strategy', items: ['Information architecture', 'Multi-partner content model'] },
      { category: 'Design', items: ['UX/UI design', 'Partner profile system'] },
      { category: 'Development', items: ['Website development', 'CMS configuration'] },
      { category: 'Delivery', items: ['Impact statistics', 'Publications library', 'Community engagement section'] },
    ],
    narrative: [
      'SAfA Tanzania brings together several implementing partners working across skills development, agriculture, entrepreneurship, logistics and reproductive health — a coalition that’s easy to mistake for five separate organisations.',
      'The challenge was communicating one shared programme purpose while still giving each implementing partner its own appropriate visibility and credit.',
      'We structured the site around the programme’s central outcome — improving livelihood prospects for young people — with partner profiles, impact figures and stories organised underneath it.',
    ],
    brandColor: '#E2572B',
    overview: 'SAfA Tanzania needed a unified digital identity for a multi-partner programme improving social and economic opportunities for young people.',
    problem: 'Different partners, objectives, locations and activities made the programme difficult to understand as one connected initiative.',
    solution: 'We organised the experience around the shared programme purpose while giving each partner, objective, resource and impact story a clear place in the system.',
    media: [],
  },
]
