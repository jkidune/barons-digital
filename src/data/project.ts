export type Project = {
  title:            string
  icon:             string      // Icon image
  slug:             string
  category:         string
  year:             string
  scope:            string
  timeline:         string
  liveUrl:          string | null
  summary:          string[]
  keywords:         string[]
  coverImage:       string      // Cover image
  previewVideo:     string      // Video stream for hover cards
  
  // Case Study Sections
  overview:         string
  problem:          string
  solution:         string
  
  // Custom styled gallery grids
  media: {
    type: 'image' | 'video'
    url:  string
    caption?: string
    gridClass?: string // tailwind classes for custom placement
  }[]
}

export const projects: Project[] = [
  {
    title:        'Clonify',
    icon:         'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=80&fit=crop&q=80',
    slug:         'clonify',
    category:     'Branding & Campaigns',
    year:         '01.25',
    scope:        'Branding & Website',
    timeline:     '8 weeks',
    liveUrl:      'https://clonify.agency',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-interactive-designer-working-on-his-computer-39912-large.mp4',
    summary: [
      'A boutique creative agency specializing in playful branding ',
      'and personality-packed campaigns. We developed a cheeky but ',
      'professional visual system and interactive website experience.'
    ],
    keywords: [
      'Brand Identity',
      'Copywriting',
      'Art Direction',
      'Web Design',
      'Interaction Design'
    ],
    coverImage:   'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop&q=80',
    overview:     'Clonify is a boutique creative agency specializing in playful branding and personality-packed campaigns. Known for their cheeky tone and bold visuals, they needed a brand and website refresh that captured their humor and heart while staying sharp and professional.',
    problem:      "Clonify's existing site was too corporate and safe, failing to reflect their unique, playful creative energy and bold campaign style. Clients looking for daring creative work were passing them over.",
    solution:     'We injected maximum personality using vibrant contrasting color blocks, dynamic hover triggers, and bold typography. We paired this energetic front with a robust, lightning-fast architecture to keep the experience exceptionally professional.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&h=600&fit=crop&q=80',
        caption: 'Playful branding mockups & stationery pack',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop&q=80',
        caption: 'Minimalist landing page design system',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop&q=80',
        caption: 'Dynamic, personality-packed campaign photography direction',
        gridClass: 'col-span-2'
      }
    ]
  },
  {
    title:        'Sonido',
    icon:         'https://images.unsplash.com/photo-1590608897129-79da98d15969?w=80&h=80&fit=crop&q=80',
    slug:         'sonido',
    category:     'Acoustic Tech Ecosystem',
    year:         '04.25',
    scope:        'Product Strategy & UX/UI',
    timeline:     '10 weeks',
    liveUrl:      'https://sonido.audio',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-rhythmic-sound-waves-42171-large.mp4',
    summary: [
      'A next-generation acoustic tech company creating high-end audio ',
      'devices. We designed a tactile, minimalist dark-mode mobile application ',
      'and premium desktop web experiences.'
    ],
    keywords: [
      'UX/UI Design',
      'Design Systems',
      'Tactile Motion',
      'Acoustic Strategy',
      '3D Rendering Direction'
    ],
    coverImage:   'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&h=675&fit=crop&q=80',
    overview:     'Sonido is a next-generation acoustic tech company creating high-end audio devices and software. They needed a holistic digital ecosystem and unified brand voice to launch their debut smart acoustic monitors.',
    problem:      'Audio enthusiasts and sound engineers struggle with overly complex interface layouts when controlling smart speakers, making fine-tuning acoustic properties intimidating.',
    solution:     'We designed a tactile, minimalist dark-mode mobile application and accompanying promotional experience. Utilizing clean grid layouts, elegant high-fidelity product imagery, and glassmorphic dials, we created an interface that feels as premium as the hardware itself.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&q=80',
        caption: 'High-fidelity acoustic device render',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&q=80',
        caption: 'Premium packaging & tactile unboxing design',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=675&fit=crop&q=80',
        caption: 'The ultimate minimalist smart app UI interface',
        gridClass: 'col-span-2'
      }
    ]
  },
  {
    title:        'Timeless Vows',
    icon:         'https://images.unsplash.com/photo-1519741497674-611481863552?w=80&h=80&fit=crop&q=80',
    slug:         'timeless-vows',
    category:     'Luxury Wedding Experience',
    year:         '2026',
    scope:        'Branding & Web Design',
    timeline:     '12 weeks',
    liveUrl:      null,
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-during-wedding-celebration-42104-large.mp4',
    summary: [
      'A premium wedding brand identity and digital experience built ',
      'for a high-end wedding planning company. The project focused ',
      'on elegance, trust, and emotional resonance across every ',
      'brand touchpoint.'
    ],
    keywords: [
      'Brand Strategy',
      'Visual Identity',
      'Web Design',
      'Typography',
      'Art Direction'
    ],
    coverImage:   'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=675&fit=crop&q=80',
    overview:     'A premium wedding brand identity and digital experience built for a high-end wedding planning company. The project focused on elegance, trust, and emotional resonance across every brand touchpoint.',
    problem:      'Premium couples planning destination or luxury weddings in Zanzibar and Serengeti lacked a seamless, visually arresting portal to explore curated wedding packages, leading to friction and high inquiry drop-offs. The company needed a design language that communicated absolute sophistication.',
    solution:     'We crafted an editorial, high-end brand identity centered around elegant typography (Source Serif) and a muted sand-and-gold color palette. We then designed a modern, strategy-first digital portal that mimics a luxury coffee-table magazine, reducing booking friction by 40%.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop&q=80',
        caption: 'Luxury wedding color palettes and typography details',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&q=80',
        caption: 'Editorial website design with gold leaf typography details',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=675&fit=crop&q=80',
        caption: 'Romantic, luxury destination photoshoot direction',
        gridClass: 'col-span-2'
      }
    ]
  },
  {
    title:        'Brand Inspiration',
    icon:         'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=80&fit=crop&q=80',
    slug:         'brand-inspiration',
    category:     'Corporate Consultancy Launch',
    year:         '2026',
    scope:        'Visual Identity & Web',
    timeline:     '8 weeks',
    liveUrl:      null,
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-startup-team-working-in-a-modern-office-space-40003-large.mp4',
    summary: [
      'A full brand identity and website for a creative consultancy ',
      'entering the Tanzanian market. Strategy-led visual system ',
      'designed to position the brand as modern, trustworthy, ',
      'and unmistakably premium.'
    ],
    keywords: [
      'Web Design',
      'Web Development',
      'UI/UX Design',
      'Motion Design',
      'Brand Strategy'
    ],
    coverImage:   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop&q=80',
    overview:     'A full brand identity and website for a creative consultancy entering the Tanzanian market. Strategy-led visual system designed to position the brand as modern, trustworthy, and unmistakably premium.',
    problem:      'The creative consultancy market in East Africa is crowded with generalists. Our client needed to launch in Dar es Salaam with an authoritative digital footprint that immediately commanded high-value corporate attention.',
    solution:     'We engineered a clean, minimalist typography system paired with sharp motion design elements. The website acts as an interactive portfolio showcasing deep strategic case studies rather than simple aesthetic galleries, establishing instant authority.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&q=80',
        caption: 'Premium minimalist corporate interior branding',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
        caption: 'Strategic consulting slides and visual system layout',
        gridClass: 'col-span-1'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1531535934027-687f6430269f?w=1200&h=675&fit=crop&q=80',
        caption: 'Interactive website mockup demonstrating smooth micro-interactions',
        gridClass: 'col-span-2'
      }
    ]
  }
]
