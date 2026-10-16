export interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'live' | 'replay';
  attendeesCount: number;
  description: string;
  keyTopics: string[];
  learningObjectives: string[];
  prerequisites: string[];
}

export const LIVE_SESSIONS_DATA: LiveSession[] = [
  {
    id: 'youtube-hook-sprint',
    title: 'YouTube Algorithm & Retention Sprint: Live Script Breakdown',
    instructor: 'Marcus Vance',
    instructorRole: 'Head of Growth & Video Optimization',
    instructorAvatar: 'avatar-mentor.webp',
    category: 'YouTube Growth',
    date: 'Next Tuesday',
    time: '6:00 PM UTC',
    duration: '75 mins',
    status: 'upcoming',
    attendeesCount: 164,
    description: 'Bring your opening 30-second scripts. We will deconstruct student hooks live on stream, pinpoint viewer dropoff triggers, and demonstrate real-time pattern interrupts.',
    keyTopics: [
      'Visual contrast & second-by-second retention curve analysis',
      'The 3 psychological hook archetypes that trigger suggested video loops',
      'Live student script edits with real-time feedback'
    ],
    learningObjectives: [
      'Identify retention leaks in video pacing',
      'Engineer compelling opening loops that beat 65% retention benchmarks',
      'Master high-speed subtitle editing techniques'
    ],
    prerequisites: ['Completed or enrolled in How To YouTube Video Upgrade']
  },
  {
    id: 'tiktok-shop-live-blueprint',
    title: 'TikTok Shop E-Commerce Intensive: Sourcing & Affiliate Outreach',
    instructor: 'Elena Rostova',
    instructorRole: 'E-Commerce & TikTok Commerce Lead',
    instructorAvatar: 'avatar-mentor.webp',
    category: 'TikTok Shop',
    date: 'Next Thursday',
    time: '5:00 PM UTC',
    duration: '90 mins',
    status: 'upcoming',
    attendeesCount: 198,
    description: 'Comprehensive walkthrough of TikTok Seller Center compliance, sending targeted samples to high-performing affiliates, and negotiating commission tiers.',
    keyTopics: [
      'Finding viral high-margin trending products with supplier validation',
      'Automated sample request pipelines in Creator Affiliate Center',
      'Live review of student product listing copy and showcase videos'
    ],
    learningObjectives: [
      'Set up a verified TikTok Shop ready for transaction processing',
      'Create an irresistible affiliate commission structure',
      'Produce short-form demo videos that convert viewer attention into orders'
    ],
    prerequisites: ['Desire to sell physical or digital goods via TikTok Shop']
  },
  {
    id: 'faceless-ai-pipeline-workshop',
    title: 'Faceless Video Automation: Generative AI Pipelines in Practice',
    instructor: 'David Kim',
    instructorRole: 'AI Workflow Architect',
    instructorAvatar: 'avatar-mentor.webp',
    category: 'Faceless Marketing',
    date: 'Next Saturday',
    time: '4:00 PM UTC',
    duration: '60 mins',
    status: 'upcoming',
    attendeesCount: 220,
    description: 'Learn how to construct a 100% hands-off faceless video production engine combining LLM script prompting, ElevenLabs voice models, and automated caption rendering.',
    keyTopics: [
      'Crafting structured prompts that yield narrative-driven video scripts',
      'Eliminating robotic AI cadence with pacing adjustments',
      'Automating batch rendering of 10+ short-form videos in one afternoon'
    ],
    learningObjectives: [
      'Build an automated end-to-end faceless content pipeline',
      'Avoid YouTube automated reuse strikes with unique transforms',
      'Syndicate to YouTube Shorts, Instagram Reels, and TikTok automatically'
    ],
    prerequisites: ['Basic familiarity with generative AI concepts']
  },
  {
    id: 'instagram-dm-funnel-clinic',
    title: 'Instagram Reels & DM Automation: Zero to Inbound Lead Machine',
    instructor: 'Sophia Morales',
    instructorRole: 'Social Conversion Strategist',
    instructorAvatar: 'avatar-mentor.webp',
    category: 'Instagram Marketing',
    date: 'Every Monday',
    time: '7:00 PM UTC',
    duration: '60 mins',
    status: 'upcoming',
    attendeesCount: 145,
    description: 'Turn Reels viewers into direct messages and closed deals. We set up automated keyword triggers, lead magnet deliveries, and high-converting story sequences.',
    keyTopics: [
      'Optimizing Instagram bio links and highlight funnels',
      'Setting up automated ManyChat keyword-to-DM triggers',
      'Live review of student profile positioning and Reels hooks'
    ],
    learningObjectives: [
      'Achieve 30%+ lead conversion from viral Reels',
      'Automate lead capture 24/7 without manual messaging',
      'Analyze profile analytics to spot growth opportunities'
    ],
    prerequisites: ['Active Instagram account']
  }
];
