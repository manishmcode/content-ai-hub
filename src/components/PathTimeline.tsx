import React, { useState } from 'react';
import { GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';

interface PathStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  glowClass: string;
  icon: React.ReactNode;
  milestones: string[];
}

const pathSteps: PathStep[] = [
  {
    number: '01',
    title: 'Choose Your Course',
    subtitle: 'Select a topic that aligns with your goals',
    description: 'Explore the available video courses and select a learning topic that aligns with your personal interests, creative skills, and business goals.',
    gradient: 'from-emerald-500 via-teal-500 to-[#00B67A]',
    glowClass: 'shadow-[0_0_30px_rgba(0,182,122,0.45)] ring-4 ring-emerald-500/30',
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    milestones: [
      'Browse comprehensive video blueprints & curricula',
      'Select YouTube, Instagram, TikTok Shop, or Faceless AI',
      'Identify actionable skills for immediate implementation',
    ],
  },
  {
    number: '02',
    title: 'Learn at Your Own Pace',
    subtitle: 'Work through lessons on your schedule',
    description: 'Work through the available video lessons and learning materials at a pace that suits your schedule, on any desktop or mobile device.',
    gradient: 'from-teal-500 via-emerald-600 to-cyan-500',
    glowClass: 'shadow-[0_0_30px_rgba(13,148,136,0.45)] ring-4 ring-teal-500/30',
    icon: <Briefcase className="w-5 h-5 text-white" />,
    milestones: [
      'Self-paced on-demand HD video walkthroughs',
      'Tested scripting templates & step-by-step frameworks',
      'Weekly live instructor sessions & interactive Q&A',
    ],
  },
  {
    number: '03',
    title: 'Put Knowledge Into Practice',
    subtitle: 'Apply techniques to your everyday work',
    description: 'Apply the ideas and techniques you learn to your everyday work, personal productivity, content creation, or online business projects.',
    gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
    glowClass: 'shadow-[0_0_30px_rgba(6,182,212,0.45)] ring-4 ring-cyan-500/30',
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    milestones: [
      'Launch algorithmically optimized video channels',
      'Deploy social commerce & affiliate monetization loops',
      'Build repeatable digital media & creator revenue streams',
    ],
  },
];

export const PathTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Caret position relative to the 3 step nodes
  const caretPositions = ['left-[16%]', 'left-1/2 -translate-x-1/2', 'left-[84%] -translate-x-full'];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00B67A] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Three Simple Steps to <span className="text-[#00B67A]">Get Started</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Choose a practical learning topic, move through the course at your own pace, and apply new ideas to your work.
          </p>
        </div>

        {/* 3-Step Nodes Container with Sleek Architectural Connector */}
        <div className="relative mb-14">
          
          {/* Horizontal Architectural Connecting Track */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00B67A] rounded-full z-0 pointer-events-none" />

          {/* 3 Step Nodes in Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {pathSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Circular Node centered on track */}
                  <div className="relative mb-5">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-[#00B67A] flex items-center justify-center text-white font-black text-3xl shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-105 ${
                        isActive ? 'shadow-[0_0_30px_rgba(0,182,122,0.45)] ring-4 ring-emerald-500/30 scale-110' : 'hover:shadow-2xl'
                      }`}
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
                    <h3 className={`text-xl font-black transition-colors ${isActive ? 'text-[#00B67A]' : 'text-slate-900 group-hover:text-slate-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed pt-1 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive White Detail Card with Upward Caret Pointer */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-200/80 max-w-4xl mx-auto transition-all duration-300">
          
          {/* Upward-pointing triangle caret pointing to the active step */}
          <div
            className={`hidden md:block absolute -top-3 ${caretPositions[activeStep]} transition-all duration-300`}
          >
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white drop-shadow-[0_-3px_3px_rgba(15,23,42,0.06)]" />
          </div>

          {/* Card Header & Interactive Pill Switchers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-sm flex items-center justify-center shadow-sm">
                {pathSteps[activeStep].number}
              </span>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  {pathSteps[activeStep].title} Breakdown
                </h4>
                <p className="text-xs text-slate-500">
                  Action criteria, practical milestones, and learning expectations
                </p>
              </div>
            </div>

            {/* Interactive Pill Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 self-start sm:self-auto">
              {pathSteps.map((step, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    activeStep === i
                      ? 'bg-[#00B67A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  Step {step.number}
                </button>
              ))}
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pathSteps[activeStep].description}
            </p>
            <div className="space-y-2.5">
              {pathSteps[activeStep].milestones.map((milestone, mIdx) => (
                <div key={mIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{milestone}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default PathTimeline;
