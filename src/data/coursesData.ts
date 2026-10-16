export interface CourseModule {
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface Course {
  id: string;
  slug: string;
  category: 'YouTube' | 'Instagram' | 'TikTok Shop' | 'Faceless Marketing' | 'Creator Economy' | 'Niche Strategy';
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  gradientBadge: string;
  accentColor: string;
  format: string;
  duration: string;
  level: string;
  rating: number;
  studentsCount: number;
  idplrUrl: string;
  featured: boolean;
  impactMetric: string;
  keyOutcomes: string[];
  modules: CourseModule[];
  prerequisites: string[];
  targetAudience: string[];
  price?: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: 'how-to-youtube-video-upgrade',
    slug: 'how-to-youtube-video-upgrade',
    category: 'YouTube',
    title: 'How To YouTube Video Upgrade',
    tagline: 'Algorithmic Search & High-Retention Sprints',
    shortDescription: 'Master end-to-end YouTube channel growth. Learn high-retention scripting, algorithm SEO, CTR-boosting thumbnails, and multi-stream channel monetization.',
    fullDescription: 'Unlock YouTube secrets with step-by-step video frameworks. This comprehensive upgrade course covers everything from channel architecture and psychological click-through rate (CTR) thumbnail formulas to advanced video editing retention patterns and multi-tier monetization.',
    gradientBadge: 'from-red-600 via-rose-600 to-indigo-700',
    accentColor: '#E11D48',
    format: '10 HD Video Modules + Action Guide',
    duration: '10 HD Lessons • 3h 45m Total',
    level: 'Beginner to Advanced',
    rating: 4.9,
    studentsCount: 3840,
    idplrUrl: 'https://www.idplr.com/how-to-youtube-video-upgrade',
    featured: true,
    impactMetric: '+320% Watch Time Velocity',
    keyOutcomes: [
      'Algorithmic search & suggested video rankings',
      'High-retention scripting & psychological hook formulas',
      'Click-through rate (CTR) thumbnail psychology & testing',
      'Monetization via AdSense, high-ticket sponsorships & affiliate funnels'
    ],
    modules: [
      {
        number: '01',
        title: 'Channel Positioning, Branding & Authority Blueprint',
        duration: '22 mins',
        summary: 'Establish an authoritative channel visual identity, banner architecture, and keyword-rich about section that converts casual viewers into lifelong subscribers.'
      },
      {
        number: '02',
        title: 'High-Retention Scriptwriting & Visual Hook Formulas',
        duration: '28 mins',
        summary: 'Craft irresistible 3-second opening hooks, eliminate dead space with pacing techniques, and maintain viewer retention above the 60% algorithmic threshold.'
      },
      {
        number: '03',
        title: 'YouTube Algorithm Discovery & Search Optimization (SEO)',
        duration: '25 mins',
        summary: 'Optimize titles, tags, descriptions, and video chapters to capture evergreen search traffic and trigger the YouTube suggested video recommendations engine.'
      },
      {
        number: '04',
        title: 'CTR Optimization: Thumbnail Psychology & Color Theory',
        duration: '24 mins',
        summary: 'Design high-converting thumbnails using contrast, focal hierarchy, expressive emotional anchors, and A/B test methodologies to achieve 10%+ CTRs.'
      },
      {
        number: '05',
        title: 'Monetization Systems: AdSense, Sponsorships & Digital Funnels',
        duration: '31 mins',
        summary: 'Diversify revenue across automated affiliate links, lead capture magnets, digital product sales, and negotiate 4-to-5 figure direct brand sponsorships.'
      }
    ],
    prerequisites: ['Basic familiarity with YouTube', 'A computer or smartphone with internet connection'],
    targetAudience: ['Creators wanting rapid YouTube channel growth', 'Marketers leveraging video for lead generation', 'Business owners looking to dominate video search']
  },
  {
    id: 'instagram-marketing-masterclass-video-upgrade',
    slug: 'instagram-marketing-masterclass-video-upgrade',
    category: 'Instagram',
    title: 'Instagram Marketing Masterclass Video Upgrade',
    tagline: 'Viral Reels & Automated Lead Funnels',
    shortDescription: 'Supercharge your Instagram presence with viral Reels frameworks, aesthetic grid systems, automated direct message funnels, and precision ad campaigns.',
    fullDescription: 'Enhance your Instagram marketing skills with our complete HD video masterclass. Discover how top creators and e-commerce brands engineer viral short-form content, curate professional grid aesthetics, deploy automated DM lead magnets, and scale targeted paid ad campaigns.',
    gradientBadge: 'from-fuchsia-600 via-pink-600 to-rose-500',
    accentColor: '#D946EF',
    format: 'HD Masterclass Video Series',
    duration: '10 HD Lessons • 3h 15m Total',
    level: 'All Levels',
    rating: 4.8,
    studentsCount: 4210,
    idplrUrl: 'https://www.idplr.com/instagram-marketing-masterclass-video-upgrade',
    featured: true,
    impactMetric: '42%+ DM Lead Conversion',
    keyOutcomes: [
      'Viral Reels retention editing & trending audio selection',
      'Automated DM lead capture & ManyChat conversation flows',
      'High-converting bio & visual grid architecture',
      'Targeted Instagram advertising & audience retargeting'
    ],
    modules: [
      {
        number: '01',
        title: 'Profile Optimization for Rapid Follower Conversion',
        duration: '18 mins',
        summary: 'Transform your Instagram profile into a high-converting landing page with keyword-optimized handles, clear value bios, and strategic highlight covers.'
      },
      {
        number: '02',
        title: 'Short-Form Reels Creation & Viral Audio Hooks',
        duration: '26 mins',
        summary: 'Master dynamic caption styles, audio syncing, pattern interrupts, and transition techniques to maximize Instagram explore and Reels distribution.'
      },
      {
        number: '03',
        title: 'Story Selling Sequences & Automated Lead Gen Flows',
        duration: '22 mins',
        summary: 'Deploy daily storytelling structures and comment-to-DM triggers that automatically deliver lead magnets and close inbound product inquiries.'
      },
      {
        number: '04',
        title: 'Targeted Instagram Ads & Telemetry Analytics',
        duration: '27 mins',
        summary: 'Run high-return boosted post campaigns, track click-through telemetry, and retarget engaged followers into paying customers.'
      }
    ],
    prerequisites: ['An active Instagram account', 'Basic smartphone editing familiarity'],
    targetAudience: ['Social media managers', 'Content creators & influencers', 'E-commerce store owners']
  },
  {
    id: 'tiktok-shop-masterclass-video-upgrade',
    slug: 'tiktok-shop-masterclass-video-upgrade',
    category: 'TikTok Shop',
    title: 'TikTok Shop Masterclass Video Upgrade',
    tagline: 'Viral Social E-Commerce & UGC Sales',
    shortDescription: 'Ride the viral wave of social shopping. Master product selection, short-form video demonstration hooks, creator affiliate recruitment, and hands-free fulfillment.',
    fullDescription: 'Achieve rapid e-commerce sales with the TikTok Shop Masterclass Video Upgrade. Featuring comprehensive HD tutorials, this course demystifies the booming TikTok Shop ecosystem from seller onboarding and compliance to crafting viral user-generated content (UGC) and recruiting thousands of affiliate creators.',
    gradientBadge: 'from-slate-900 via-cyan-600 to-rose-500',
    accentColor: '#06B6D4',
    format: 'E-Commerce Video Blueprint',
    duration: '10 HD Video Modules • 4h Total',
    level: 'Beginner to Intermediate',
    rating: 4.95,
    studentsCount: 2950,
    idplrUrl: 'https://www.idplr.com/tiktok-shop-masterclass-video-upgrade',
    featured: true,
    impactMetric: '$18K+ Avg. Campaign Revenue',
    keyOutcomes: [
      'TikTok Seller Center & compliance blueprint setup',
      'High-converting short-form product showcase videos',
      'Creator affiliate recruiting & commission loops',
      'Live stream selling & flash sale tactics'
    ],
    modules: [
      {
        number: '01',
        title: 'TikTok Shop Seller Center Onboarding & Product Sourcing',
        duration: '25 mins',
        summary: 'Navigate shop verification, tax compliance, warehouse shipping rules, and identify high-velocity trending products with healthy profit margins.'
      },
      {
        number: '02',
        title: 'Crafting High-Converting Organic UGC Product Demos',
        duration: '32 mins',
        summary: 'Discover the exact problem-solution video script formula that generates explosive organic sales without feeling like a pushy commercial.'
      },
      {
        number: '03',
        title: 'Scaling with Creator Affiliates & Commission Structures',
        duration: '29 mins',
        summary: 'Automate creator outreach in the TikTok Affiliate Center, send free samples strategically, and incentivize top creators to sell your catalog.'
      },
      {
        number: '04',
        title: 'TikTok Live Stream Selling & Flash Sale Tactics',
        duration: '34 mins',
        summary: 'Run high-energy live sales events, leverage flash coupons, pin showcase items, and create urgency to clear inventory in hours.'
      }
    ],
    prerequisites: ['Desire to sell physical or digital goods', 'No prior TikTok Shop experience required'],
    targetAudience: ['E-commerce store owners & drop-shippers', 'Creators seeking affiliate income', 'Retail brands expanding to social commerce']
  },
  {
    id: 'faceless-marketing-masterclass-video-upgrade',
    slug: 'faceless-marketing-masterclass-video-upgrade',
    category: 'Faceless Marketing',
    title: 'Faceless Marketing Masterclass Video Upgrade',
    tagline: 'AI Automation & Anonymous Scale',
    shortDescription: 'Build profitable digital marketing empires without ever showing your face. Harness AI voiceovers, curated B-roll vaults, automated video pipelines, and digital products.',
    fullDescription: 'Master digital marketing and recurring revenue without being on camera. The Faceless Marketing Masterclass Video Upgrade reveals how to launch and scale lucrative anonymous channels across YouTube, TikTok, and Instagram using AI generative tools, atmospheric stock footage, and digital product sales funnels.',
    gradientBadge: 'from-violet-600 via-purple-600 to-indigo-700',
    accentColor: '#8B5CF6',
    format: 'Automated Systems Video Course',
    duration: '10 Step-by-Step HD Videos • 3h 30m Total',
    level: 'Beginner Friendly',
    rating: 4.9,
    studentsCount: 5120,
    idplrUrl: 'https://www.idplr.com/faceless-marketing-masterclass-video-upgrade',
    featured: true,
    impactMetric: '100% Anonymous Video Pipelines',
    keyOutcomes: [
      'End-to-end AI video pipelines (voice synthesis, scripts, visual assembly)',
      'High-profit faceless niches with evergreen demand',
      'Passive digital product sales without personal fame',
      'Automated batch production workflows to save 20+ hours weekly'
    ],
    modules: [
      {
        number: '01',
        title: 'Selecting High-Margin Faceless Verticals & Positioning',
        duration: '20 mins',
        summary: 'Analyze top-performing faceless niches including finance, motivation, tech, luxury, and history with verifiable CPM rates and audience appetite.'
      },
      {
        number: '02',
        title: 'AI Voice Generation, Script Prompts & B-Roll Workflows',
        duration: '28 mins',
        summary: 'Leverage cutting-edge AI voice models for natural delivery, prompt LLMs for high-retention storytelling, and source copyright-safe 4K B-roll.'
      },
      {
        number: '03',
        title: 'Automated Multi-Platform Syndication & Video Assembly',
        duration: '24 mins',
        summary: 'Build a rapid editing workflow using smart templates, auto-caption generators, and multi-platform aspect ratio converters.'
      },
      {
        number: '04',
        title: 'Monetizing Anonymous Audiences with High-Ticket Offers',
        duration: '26 mins',
        summary: 'Deploy automated email capture pages, sell Notion templates, eBooks, and software affiliates to generate continuous hands-off revenue.'
      }
    ],
    prerequisites: ['Computer or laptop', 'Basic willingness to learn AI tools'],
    targetAudience: ['Introverts wanting to create online businesses', 'Marketers scaling multiple simultaneous channels', 'Side-hustlers with limited on-camera time']
  },
  {
    id: 'the-creator-economy-video-upgrade',
    slug: 'the-creator-economy-video-upgrade',
    category: 'Creator Economy',
    title: 'The Creator Economy Video Upgrade',
    tagline: 'Monetization & Personal Brand Empire',
    shortDescription: 'Build a diversified audience, monetize skills, and succeed in the modern social media landscape. Master multi-channel growth, 5-figure sponsorships, and subscription communities.',
    fullDescription: 'Navigate and dominate the multi-billion dollar creator economy. This executive video series provides battle-tested blueprints for turning audience attention into a durable media enterprise with diversified revenue streams across memberships, high-ticket sponsorships, digital products, and licensing.',
    gradientBadge: 'from-amber-500 via-orange-500 to-indigo-600',
    accentColor: '#F59E0B',
    format: 'Strategic Growth Video Series',
    duration: '10 Executive Video Lessons • 3h 50m Total',
    level: 'Intermediate to Advanced',
    rating: 4.85,
    studentsCount: 3100,
    idplrUrl: 'https://www.idplr.com/89-videos/the-creator-economy-video-upgrade',
    featured: false,
    impactMetric: '5-Figure Sponsor Rate Cards',
    keyOutcomes: [
      'Diversified revenue stacks across 4+ channels',
      'High-ticket sponsor pitch decks & negotiation frameworks',
      'Paid community & membership subscription models',
      'Creator business operations, legal contracts & team delegation'
    ],
    modules: [
      {
        number: '01',
        title: 'Audience Architecture & Cross-Platform Omnipresence',
        duration: '23 mins',
        summary: 'Own your audience beyond algorithmic whims by building an interconnected flywheel between short-form video, long-form content, and owned email lists.'
      },
      {
        number: '02',
        title: 'Sponsorship Pitching: Land High-Ticket Brand Deals',
        duration: '31 mins',
        summary: 'Create professional media kits, calculate audience engagement value, pitch brand decision-makers directly, and negotiate contract usage rights.'
      },
      {
        number: '03',
        title: 'Building Paid Memberships & Subscription Communities',
        duration: '27 mins',
        summary: 'Launch recurring subscription clubs, private Discord/Skool hubs, and mastermind tiers that provide predictable monthly recurring revenue (MRR).'
      },
      {
        number: '04',
        title: 'Creator Business Operations, Contracts & Scaling',
        duration: '28 mins',
        summary: 'Structure your creator LLC, protect intellectual property, manage taxes, and hire freelance thumbnail designers and video editors efficiently.'
      }
    ],
    prerequisites: ['Existing or aspiring content creator profile', 'Basic understanding of digital marketing'],
    targetAudience: ['Creators ready to monetize', 'Founders building personal brands', 'Digital consultants and agency leads']
  },
  {
    id: 'know-your-niche-video-upgrade',
    slug: 'know-your-niche-video-upgrade',
    category: 'Niche Strategy',
    title: 'Know Your Niche Video Upgrade',
    tagline: 'Market Validation & Blue Ocean Scoring',
    shortDescription: 'Unlock niche mastery with clear, step-by-step video guidance. Validate lucrative market opportunities, uncover audience pain points, eliminate competition, and build instant authority.',
    fullDescription: 'Eliminate guesswork before you create a single video. The Know Your Niche Video Upgrade gives you actionable frameworks to uncover high-profit, low-competition sub-niches, evaluate audience buying power, discover competitor gaps, and craft an unassailable Unique Value Proposition.',
    gradientBadge: 'from-emerald-500 via-teal-600 to-cyan-600',
    accentColor: '#10B981',
    format: 'Market Research Masterclass',
    duration: '10 HD Video Tutorials • Audit Sheets',
    level: 'Foundational / Strategic',
    rating: 4.92,
    studentsCount: 2750,
    idplrUrl: 'https://www.idplr.com/know-your-niche-video-upgrade',
    featured: false,
    impactMetric: '100% Validated Niche Authority',
    keyOutcomes: [
      'Blue-ocean niche validation & market scoring matrix',
      'Competitor void discovery & audience pain mapping',
      'Positioning matrix for instant authority and pricing power',
      'Revenue feasibility audits to avoid dead-end niches'
    ],
    modules: [
      {
        number: '01',
        title: 'The Blue Ocean Niche Validation Methodology',
        duration: '21 mins',
        summary: 'Learn how to identify unsaturated sub-niches where demand is skyrocketing and established competitors are slow to adapt.'
      },
      {
        number: '02',
        title: 'Audience Search Intent & Purchasing Power Audits',
        duration: '24 mins',
        summary: 'Distinguish between tire-kicker audiences and buyers ready to invest in high-margin tools, coaching, digital guides, or physical products.'
      },
      {
        number: '03',
        title: 'Competitor Gap Analysis & Defensible UVP Creation',
        duration: '26 mins',
        summary: 'Deconstruct top players in your vertical to find unanswered customer questions and formulate an offer that renders competitors irrelevant.'
      },
      {
        number: '04',
        title: 'Monetization Feasibility & Revenue Scoring Models',
        duration: '22 mins',
        summary: 'Calculate projected customer lifetime value (LTV), sponsorship interest, and ad CPM potential before dedicating time to production.'
      }
    ],
    prerequisites: ['None. Ideal as step one for any online venture'],
    targetAudience: ['Entrepreneurs starting a new brand', 'Creators struggling to find an engaged audience', 'Marketers seeking untapped verticals']
  }
];

export const courses = COURSES_DATA;
export default COURSES_DATA;
