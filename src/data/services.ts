export type Service = {
  number:      string         // '01', '02' etc
  title:       string
  description: string
  pills:       string[]
  hoverImage:  string         // /public/images/services/[slug].jpg  — 400 × 300
}

export const services: Service[] = [
  {
    number:      '01',
    title:       'Brand Strategy',
    description: 'We help businesses define what they stand for, how they should be positioned, and how to express that clearly in the market.',
    pills: [
      'Research & Insights',
      'Competitive Study',
      'Voice & Tone',
      'Naming & Copywriting',
      'Workshops',
      'Brand Strategy',
    ],
    hoverImage: '/images/services/brand-strategy.jpg',
  },
  {
    number:      '02',
    title:       'Identity & Digital Design',
    description: 'We design visual systems and digital experiences that communicate trust, clarity, and modern ambition.',
    pills: [
      'Identity Design',
      'Wireframing',
      'Web Design',
      'Product Design',
      'Digital Products',
    ],
    hoverImage: '/images/services/identity-design.jpg',
  },
  {
    number:      '03',
    title:       'Website Design & Development',
    description: 'We build websites and digital products that do more than look good. They work harder for credibility, conversion, and growth.',
    pills: [
      'Next.js',
      'React',
      'Responsive Design',
      'CMS Integration',
      'Performance',
      'SEO',
    ],
    hoverImage: '/images/services/web-development.jpg',
  },
  {
    number:      '04',
    title:       'Content & Production',
    description: 'We create supporting visual and communications assets that make a brand feel complete across channels.',
    pills: [
      'Videography',
      'Photography',
      'Voice & Tone',
      'Social Media Marketing',
      'Digital Marketing',
    ],
    hoverImage: '/images/services/content-production.jpg',
  },
]

/*
  ── Hover image file guide ──────────────────────────────────────────
  /public/images/services/brand-strategy.jpg         400 × 300
  /public/images/services/identity-design.jpg        400 × 300
  /public/images/services/web-development.jpg        400 × 300
  /public/images/services/content-production.jpg     400 × 300

  Use real project photography or mood imagery.
  Aspect ratio 4:3 recommended.
*/
