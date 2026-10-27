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
    title: 'Create Better Content',
    description: 'Discover approaches to content planning, idea development, and creating relevant material that connects with your target audience.',
    features: [
      'Content planning',
      'Idea development',
      'Relevant material'
    ],
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-white" />,
    title: 'Strengthen Your Marketing Approach',
    description: 'Build your understanding of digital marketing strategies, online visibility, and audience engagement to support more effective content promotion.',
    features: [
      'Digital marketing strategies',
      'Online visibility',
      'Audience engagement'
    ],
  },
  {
    icon: <Sparkles className="w-7 h-7 text-white" />,
    title: 'Grow Your Online Presence',
    description: 'Explore ways to understand your audience, evaluate content performance, and identify opportunities to develop your brand across digital platforms.',
    features: [
      'Understand your audience',
      'Evaluate content performance',
      'Develop your brand'
    ],
  },
];

export const Features: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Background Soft Depth Blooms in Emerald & Teal */}
      <div className="pointer-events-none absolute top-12 right-1/4 h-96 w-96 rounded-full bg-emerald-100/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-10 h-96 w-96 rounded-full bg-teal-100/35 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading & CTAs (Intro Column) */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B67A] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
              YOUR CONTENT GROWTH JOURNEY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Build Your Content.<br />
              Reach Your Audience.<br />
              <span className="text-[#00B67A]">
                Grow Your Brand.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore how AI marketing concepts, content strategies, and digital marketing techniques can support your online growth. Develop your understanding of content planning, audience engagement, and marketing performance to build a stronger digital presence and adapt to the evolving online landscape.
            </p>

            <div className="pt-2">
              <Link
                to="/library/"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-sm shadow-[0_12px_24px_-4px_rgba(0,182,122,0.4)] active:scale-95 transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                <span>Explore Learning Library</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards in Desktop Grid (Original Layout & Design) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {featureCards.map((card, idx) => {
                const isSelected = activeCard === idx;

                return (
                  <div
                    key={card.title}
                    onClick={() => setActiveCard(idx)}
                    className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-2 hover:border-[#00B67A] hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/40 hover:shadow-[0_25px_60px_rgba(0,182,122,0.15)] hover:ring-2 hover:ring-emerald-400/40 ${isSelected ? 'border-[#00B67A] ring-2 ring-emerald-500/50' : ''}`}
                  >
                    <div>
                      {/* Top Icon Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 bg-gradient-to-tr from-[#00B67A] to-teal-400"
                        >
                          {card.icon}
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
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
