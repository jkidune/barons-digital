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
    overview: 'AfrONet works across countries, institutions and agricultural networks to strengthen organic agriculture in Africa. We created a connected digital experience that makes its continental role clear and accessible.',
    problem: 'AfrONet needed to organise a large amount of institutional and programme information for farmers, researchers, policymakers, development partners and market actors without overwhelming visitors.',
    solution: 'We built a content architecture around clarity, authority and discoverability, connecting programmes, resources, standards, policy work and partnerships into a unified digital platform.',
    media: [],
  },
  {
    title: 'Sustainable Agriculture Tanzania',
    icon: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=80&h=80&fit=crop&q=80',
    slug: 'sustainable-agriculture-tanzania',
    category: 'Organisational and Knowledge Website',
    year: '2021',
    scope: 'Website Strategy, UX/UI Design, Webflow Development, CMS and Responsive Implementation',
    timeline: '2 months',
    duration: '2 months',
    client: 'Sustainable Agriculture Tanzania — SAT',
    clientType: 'Non-Profit Organisation / Sustainable Agriculture',
    projectType: 'Organisational and Knowledge Website',
    role: 'Website strategy, UX/UI design, Webflow development, CMS configuration and responsive implementation',
    liveUrl: 'https://www.kilimo.org',
    previewVideo: heroShowreelUrl,
    summary: [
      'Turning field knowledge, training and impact into an accessible digital ecosystem.',
      'A content-rich bilingual platform for agroecology, farmer training, research and organisational impact.',
    ],
    keywords: ['Strategy', 'UX/UI Design', 'Webflow Development', 'CMS', 'Bilingual Content'],
    services: ['Strategy', 'UX/UI Design', 'Webflow Development', 'CMS', 'Bilingual Content'],
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=900&fit=crop&q=80',
    introductionTitle: 'Making agricultural knowledge easier to find and use',
    introduction: [
      'Sustainable Agriculture Tanzania works with farmers and communities to promote agroecology, practical training and environmentally responsible food systems.',
      'Its website needed to serve several purposes at once: communicate organisational impact, present projects and research, promote farmer training courses, publish articles and provide resources in both English and Swahili.',
      'We developed a content-rich platform that brings these different functions together while keeping the experience clear and approachable.',
    ],
    challenge: [
      'SAT communicates with farmers, trainees, researchers, donors, development partners and members of the public. Each group needs access to different types of information.',
      'The previous digital structure needed to accommodate a growing collection of projects, research, impact data, farmer stories, annual reports, courses and bilingual resources without making navigation difficult.',
      'The platform also had to remain manageable for staff as new courses, articles, projects and publications were added.',
    ],
    approach: [
      'We created a modular Webflow CMS structure that allows SAT to manage projects, courses, articles, reports and impact information independently.',
      'The content was organised around the journeys visitors are most likely to take: understanding SAT, exploring its impact, finding training opportunities, accessing research and learning from farmer experiences.',
      'English and Swahili content pathways were incorporated to improve accessibility for both institutional audiences and local farming communities.',
    ],
    features: [
      'Webflow CMS development',
      'English and Swahili content sections',
      'Organisational impact indicators',
      'Farmer Training Centre course listings',
      'Online course application pathways',
      'Project and research sections',
      'Annual reports and publications',
      'Farmer stories and articles',
      'Partner and donor visibility',
      'Newsletter integration',
      'Responsive mobile design',
    ],
    outcome: [
      'The website gives SAT a flexible platform for communicating both institutional impact and practical agricultural knowledge.',
      'Farmers can discover training opportunities, partners can understand the scale of SAT’s work, and researchers and visitors can access projects, reports and educational resources through one connected experience.',
      'The CMS also enables the organisation to keep information current as new courses, projects and stories are introduced.',
    ],
    overview: 'Sustainable Agriculture Tanzania needed a content-rich platform for agroecology, impact, farmer training, research, publications and bilingual resources.',
    problem: 'The organisation serves many audiences with different information needs, and its platform had to scale without becoming difficult to navigate or manage.',
    solution: 'We built a modular CMS structure and organised content around real visitor journeys, making knowledge, courses, stories and impact easier to find and maintain.',
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
    overview: 'SAfA Tanzania needed a unified digital identity for a multi-partner programme improving social and economic opportunities for young people.',
    problem: 'Different partners, objectives, locations and activities made the programme difficult to understand as one connected initiative.',
    solution: 'We organised the experience around the shared programme purpose while giving each partner, objective, resource and impact story a clear place in the system.',
    media: [],
  },
  {
    title: 'GEO Climate Action',
    icon: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=80&h=80&fit=crop&q=80',
    slug: 'geo-climate-action',
    category: 'Organisational Website',
    year: '2023',
    scope: 'Website Strategy, Information Architecture, UX/UI Design, Development and CMS',
    timeline: '1 month',
    duration: '1 month',
    client: 'Green Environment Organization — GEO',
    clientType: 'Environmental Non-Profit Organisation',
    projectType: 'Organisational Website',
    role: 'Website strategy, information architecture, UX/UI design, development and CMS setup',
    liveUrl: 'https://www.geoclimateaction.org',
    previewVideo: heroShowreelUrl,
    summary: [
      'Building a digital platform that turns environmental awareness into participation.',
      'A website designed around climate action, community involvement, volunteering and support.',
    ],
    keywords: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'Digital Engagement'],
    services: ['Strategy', 'UX/UI Design', 'Website Development', 'CMS', 'Digital Engagement'],
    coverImage: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1400&h=900&fit=crop&q=80',
    introductionTitle: 'Giving community-led climate action a stronger digital presence',
    introduction: [
      'Green Environment Organization works to promote environmental stewardship, community participation and sustainable practices.',
      'The organisation needed a website that could communicate its mission while encouraging visitors to do more than simply read. The platform had to create clear pathways for people to explore projects, volunteer, donate, follow news and become part of the organisation’s environmental work.',
    ],
    challenge: [
      'Environmental organisations often communicate many interconnected issues, from climate-smart agriculture and ecological protection to clean communities and advocacy.',
      'The challenge was to bring GEO’s different activities together without making the message feel broad or unfocused.',
      'The website also needed to communicate trust, showcase partnerships and help visitors understand exactly how they could support or participate in the organisation’s work.',
    ],
    approach: [
      'We organised the website around GEO’s central areas of environmental stewardship, community engagement and sustainable innovation.',
      'Projects were presented as tangible examples of the organisation’s mission in action. Clear calls to volunteer, donate and connect were positioned throughout the website to support participation.',
      'Visual storytelling and straightforward navigation were used to make climate and environmental information feel human, immediate and accessible.',
    ],
    features: [
      'Organisational mission and programme presentation',
      'Environmental project pages',
      'Volunteer and career pathways',
      'Donation calls to action',
      'Partner visibility',
      'News and updates',
      'Video integration',
      'Contact and enquiry forms',
      'Responsive mobile experience',
      'Content management system',
    ],
    outcome: [
      'The completed platform gives GEO a professional digital presence that connects its environmental mission with practical opportunities for participation.',
      'Visitors can understand what the organisation does, explore its projects and identify ways to volunteer, donate or collaborate.',
      'The result is a website that supports both institutional credibility and community mobilisation.',
    ],
    overview: 'Green Environment Organization needed a digital platform that could communicate its climate mission and turn awareness into participation.',
    problem: 'GEO had to bring different environmental activities together clearly while building trust and showing visitors how to support or participate.',
    solution: 'We designed around action and participation, using project storytelling, clear calls to volunteer or donate, and straightforward navigation.',
    media: [],
  },
]
