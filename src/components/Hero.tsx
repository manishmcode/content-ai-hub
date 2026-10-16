import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
const heroImage = '/assets/images/hero-student-mentor.webp';


export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#08121E] px-4 sm:px-6 pt-28 md:pt-36 pb-32 text-slate-50">
      
      {/* Ambient Emerald & Teal Lighting Accents */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-[460px] w-[460px] rounded-full bg-teal-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Minimalist Live Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D084] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D084]" />
              </span>
              <span className="text-xs font-bold tracking-wide text-emerald-300">
                THE FUTURE OF LEARNING · AI &amp; CONTENT GROWTH
              </span>
            </div>

            {/* Headline matching screenshot visual aesthetic */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Transform Your Skills, <br />
              Live and <span className="text-[#00D084]">Guided.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Learn with expert-led courses and live classes built to help creators grow. Explore practical lessons in video marketing, faceless content, social commerce, and audience growth.
            </p>

            {/* Refined Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-sm shadow-[0_10px_25px_-5px_rgba(0,182,122,0.45)] active:scale-95 transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
    

          </div>

          {/* Right Column: Sculptural Modern AI Studio Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Subtle Gradient Backing Aura */}
            <div className="pointer-events-none absolute -inset-3 bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-400/20 rounded-[2.5rem] blur-2xl" />

            {/* Sculptural Rounded Portal Container */}
            <div className="relative w-full max-w-md">
              
              {/* Main Photo Card */}
              <div className="relative rounded-[2.25rem] overflow-hidden border border-white/15 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.55)] group">
                <div className="relative aspect-[4/5]">
                  <picture>
                    <source srcSet={heroImage} type="image/webp" />
                    <img
                      src={heroImage}
                      alt="Creator optimizing AI marketing and video workflows"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      width="1000"
                      height="1250"
                    />
                  </picture>

                  {/* Gradient Vignette for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08121E]/85 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>

      {/* Clean Straight Architectural Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-20" />

    </section>
  );
};
