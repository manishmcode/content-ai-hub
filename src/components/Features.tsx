import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Video, CheckCircle, Zap } from 'lucide-react';

interface FeatureCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const featureCards: FeatureCardData[] = [
  {
    icon: <Video className="w-7 h-7 text-white" />,
    title: 'YouTube & Video Marketing',
    description: 'Learn practical ways to grow a YouTube channel, create stronger videos, and reach the right audience.',
    features: [
      'Create a branded YouTube channel',
      'Grow subscribers and channel traffic',
      'Improve search rankings and reach'
    ],
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-white" />,
    title: 'Faceless Marketing',
    description: 'Build a strong digital presence and create content without showing your face.',
    features: [
      'Build anonymous brand identities',
      'Create content without personal exposure',
      'Monetize your faceless brand'
    ],
  },
  {
    icon: <Sparkles className="w-7 h-7 text-white" />,
    title: 'Creator Economy',
    description: 'Develop the skills to create consistently, build partnerships, and earn as a content creator.',
    features: [
      'Build branded partnerships',
      'Choose content that serves your audience',
      'Explore creator income opportunities'
    ],
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
              Learn Skills for Your <br className="hidden sm:inline" />
              <span className="text-[#00B67A]">
                Creator Journey
              </span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Explore practical video lessons for YouTube growth, faceless marketing, social commerce, and the creator economy.
            </p>

            <div className="pt-2">
              <Link
                to="/library"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-sm shadow-[0_12px_24px_-4px_rgba(0,182,122,0.4)] active:scale-95 transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                <span>Explore Library</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards in Desktop Grid (Original Layout & Design) */}
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
                      <div className="hidden">
                     
                      </div>
                    )}

                    <div>
                      {/* Top Icon Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 bg-gradient-to-tr from-[#00B67A] to-teal-400"
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
export default Features;
