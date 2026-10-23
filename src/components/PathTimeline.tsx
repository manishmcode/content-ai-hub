import React from 'react';
import { GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';

interface PathStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  glowClass: string;
  icon: React.ReactNode;
}

const pathSteps: PathStep[] = [
  {
    number: '01',
    title: 'Choose Your Course',
    subtitle: 'Browse the available learning paths',
    description: 'Browse the available learning paths and select a course that matches your interests, current skills, and growth objectives.',
    gradient: 'from-emerald-500 via-teal-500 to-[#00B67A]',
    glowClass: 'shadow-[0_0_30px_rgba(0,182,122,0.45)] ring-4 ring-emerald-500/30',
    icon: <GraduationCap className="w-5 h-5 text-white" />,
  },
  {
    number: '02',
    title: 'Learn at Your Own Pace',
    subtitle: 'Work through lessons on your schedule',
    description: 'Work through the available course materials according to your schedule and the access conditions of your course. Join scheduled live classes where included.',
    gradient: 'from-teal-500 via-emerald-600 to-cyan-500',
    glowClass: 'shadow-[0_0_30px_rgba(13,148,136,0.45)] ring-4 ring-teal-500/30',
    icon: <Briefcase className="w-5 h-5 text-white" />,
  },
  {
    number: '03',
    title: 'Apply What You Learn',
    subtitle: 'Develop your content and marketing goals',
    description: 'Use your knowledge to develop content ideas, improve your marketing approach, understand your audience, and explore new opportunities for growing your online presence.',
    gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
    glowClass: 'shadow-[0_0_30px_rgba(6,182,212,0.45)] ring-4 ring-cyan-500/30',
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
  },
];

export const PathTimeline: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00B67A] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Start Your Learning Journey in <span className="text-[#00B67A]">Three Simple Steps</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Choose an area you want to develop, explore the available course materials, and apply your knowledge to your content and marketing goals.
          </p>
        </div>

        {/* 3-Step Nodes Container with Sleek Architectural Connector */}
        <div className="relative mb-14">
          
          {/* Horizontal Architectural Connecting Track */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00B67A] rounded-full z-0 pointer-events-none" />

          {/* 3 Step Nodes in Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {pathSteps.map((step) => {
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circular Node centered on track */}
                  <div className="relative mb-5">
                    <div
                      className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-[#00B67A] flex items-center justify-center text-white font-black text-3xl shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-105 hover:shadow-2xl"
                    >
                      <span>{step.number}</span>
                    </div>

                    {/* Mini Icon Badge */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#08121E] border-2 border-white flex items-center justify-center shadow-md">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5 px-2">
                    <h3 className="text-xl font-black text-slate-900 transition-colors group-hover:text-slate-700">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
export default PathTimeline;
