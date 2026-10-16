import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Cpu, CheckCircle, Zap } from 'lucide-react';

interface FeatureCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientBadge: string;
  features: string[];
}

const featureCards: FeatureCardData[] = [
  {
    icon: <Cpu className="w-7 h-7 text-white" />,
    title: 'AI Video Pipelines',
    description: 'Generate high-retention scripts, viral hooks, and voiceovers with production-tested AI automation toolchains.',
    gradientBadge: 'from-violet-600 to-indigo-600',
    features: ['High-retention prompt frameworks', 'Automated caption & clip workflows', 'Faceless evergreen asset vaults'],
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-white" />,
    title: 'Omnichannel Distribution',
    description: 'Syndicate content across YouTube, TikTok Shop, and Instagram Reels with algorithmically optimized video formats.',
    gradientBadge: 'from-violet-600 via-indigo-600 to-cyan-500',
    features: ['TikTok Shop & affiliate sales loops', 'Cross-platform organic repurposing', 'Algorithmic retention scoring'],
  },
  {
    icon: <Sparkles className="w-7 h-7 text-white" />,
    title: '1:1 Growth Strategy',
    description: 'Get your thumbnails, scripts, and monetization funnels audited by experienced creators and marketing specialists.',
    gradientBadge: 'from-cyan-600 to-emerald-500',
    features: ['Weekly live video audits & reviews', 'Niche profit scoring models', 'High-ticket sponsor pitch decks'],
  },
];

export const Features: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(1); // Middle card highlighted by default

  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Background Soft Depth Blooms in Emerald & Teal */}
      <div className="pointer-events-none absolute top-12 right-1/4 h-96 w-96 rounded-full bg-emerald-100/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-10 h-96 w-96 rounded-full bg-teal-100/35 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading & CTAs (Intro Column) */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00B67A] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
              WHY LEARN WITH US
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Built for <br className="hidden sm:inline" />
              <span className="text-[#00B67A]">
                Real-World Mastery
              </span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Step beyond static lectures. ContentAIHub.net equips you with production-grade AI frameworks, viral short-form hooks, TikTok Shop commerce, and faceless automation models.
            </p>

            <div className="pt-2">
              <Link
                to="/#courses"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-sm shadow-[0_12px_24px_-4px_rgba(0,182,122,0.4)] active:scale-95 transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards in Desktop Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {featureCards.map((card, idx) => {
                const isMiddle = idx === 1;
                const isSelected = activeCard === idx;

                return (
                  <div
                    key={card.title}
                    onClick={() => setActiveCard(idx)}
                    className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isMiddle
                        ? 'bg-gradient-to-b from-white to-emerald-50/40 backdrop-blur-md border-2 border-[#00B67A] shadow-[0_25px_60px_rgba(0,182,122,0.15)] hover:-translate-y-2 ring-2 ring-emerald-400/40 relative z-10'
                        : 'bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:border-emerald-200'
                    } ${isSelected && !isMiddle ? 'ring-2 ring-emerald-500/50' : ''}`}
                  >
                    {/* Middle Card Accent Glow Badge */}
                    {isMiddle && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00B67A] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                        Most Popular Strategy
                      </div>
                    )}

                    <div>
                      {/* Top Icon Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 ${
                            idx === 0 
                              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500' 
                              : idx === 1 
                                ? 'bg-gradient-to-tr from-[#00B67A] to-teal-400' 
                                : 'bg-gradient-to-tr from-teal-600 to-cyan-500'
                          }`}
                        >
                          {card.icon}
                        </div>
                        {isMiddle && (
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {card.description}
                      </p>
                    </div>

                    {/* Feature Checklist */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      {card.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
