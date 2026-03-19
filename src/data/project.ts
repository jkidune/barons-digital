export type Project = {
  title:            string
  icon:             string      // /public/images/work/[slug]/icon.png  — 32×32
  slug:             string
  category:         string
  year:             number
  summary:          string[]
  keywords:         string[]
  url:              string | null
  coverImage:       string      // /public/images/work/[slug]/cover.jpg — 780×440
  previewVideo:     string      // /public/videos/work/[slug]/preview.mp4 — keep <5MB
  media: {
    type: 'image' | 'video'
    url:  string
  }[]
}

export const projects: Project[] = [
  {
    title:        'Timeless Vows',
    icon:         '/images/work/timeless-vows/icon.png',
    slug:         'timeless-vows',
    category:     'Product',
    year:         2026,
    summary: [
      'A premium wedding brand identity and digital experience built ',
      'for a high-end wedding planning company. The project focused ',
      'on elegance, trust, and emotional resonance across every ',
      'brand touchpoint.',
    ],
    keywords: [
      'Brand Strategy',
      'Visual Identity',
      'Web Design',
      'Web Development',
      'Photography Direction',
      'Art Direction',
      'Brand Guidelines',
      'Typography',
    ],
    url:          null,
    coverImage:   '/images/work/timeless-vows/cover.jpg',
    previewVideo: '/videos/work/timeless-vows/preview.mp4',
    media: [
      { type: 'image', url: '/images/work/timeless-vows/image-01.jpg' },
      { type: 'image', url: '/images/work/timeless-vows/image-02.jpg' },
      { type: 'image', url: '/images/work/timeless-vows/image-03.jpg' },
      { type: 'video', url: '/videos/work/timeless-vows/video-01.mp4' },
      { type: 'image', url: '/images/work/timeless-vows/image-04.jpg' },
      { type: 'image', url: '/images/work/timeless-vows/image-05.jpg' },
    ],
  },
  {
    title:        'Brand Inspiration',
    icon:         '/images/work/brand-inspiration/icon.png',
    slug:         'brand-inspiration',
    category:     'Website',
    year:         2026,
    summary: [
      'A full brand identity and website for a creative consultancy ',
      'entering the Tanzanian market. Strategy-led visual system ',
      'designed to position the brand as modern, trustworthy, ',
      'and unmistakably premium.',
    ],
    keywords: [
      'Web Design',
      'Web Development',
      'Brand Identity',
      'UI Design',
      'UX Design',
      'Motion Design',
      'Brand Strategy',
      'Content Direction',
    ],
    url:          null,
    coverImage:   '/images/work/brand-inspiration/cover.jpg',
    previewVideo: '/videos/work/brand-inspiration/preview.mp4',
    media: [
      { type: 'image', url: '/images/work/brand-inspiration/image-01.jpg' },
      { type: 'image', url: '/images/work/brand-inspiration/image-02.jpg' },
      { type: 'image', url: '/images/work/brand-inspiration/image-03.jpg' },
      { type: 'video', url: '/videos/work/brand-inspiration/video-01.mp4' },
      { type: 'image', url: '/images/work/brand-inspiration/image-04.jpg' },
    ],
  },
]

/*
  ── Media file naming guide ────────────────────────────────────────────
  
  Icons       /public/images/work/[slug]/icon.png          32 × 32
  Cover       /public/images/work/[slug]/cover.jpg         780 × 440
  Gallery     /public/images/work/[slug]/image-01.jpg      1600 × 900 recommended
              /public/images/work/[slug]/image-02.jpg
              ... (continue sequence)
  Videos      /public/videos/work/[slug]/preview.mp4       keep under 5MB, 16:9
              /public/videos/work/[slug]/video-01.mp4      full quality for case study
  
  When adding a new project:
    1. Add entry to projects array above
    2. Create folder: /public/images/work/[new-slug]/
    3. Create folder: /public/videos/work/[new-slug]/
    4. Drop files following the naming above
    5. No code changes needed — paths resolve automatically
*/
