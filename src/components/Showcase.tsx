import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Clock, CheckCircle, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
const dashboardImg = '/assets/images/dashboard-showcase.webp';

export const Showcase: React.FC = () => {
  return (
    <section id="showcase" className="relative bg-[#090D16] pt-20 pb-32 overflow-hidden text-slate-50 border-t border-slate-800">
      
      {/* Sleek Top Architectural Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-10" />

      {/* Ambient Radial Lighting */}
      <div className="pointer-events-none absolute -top-10 right-10 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Stat Blocks & CTAs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block">
              ADVANCED STUDENT PORTAL
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Clear and Helpful <br />
              <span className="text-[#00D084]">
                Learning
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A contemporary, high-resolution creator command center. Monitor YouTube click-through rates, TikTok Shop conversion funnels, Reel retention spikes, and AI pipeline velocity in real time.
            </p>

            {/* Frosted Glass Stat Blocks */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              
              {/* Stat 1: +340% */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-lg text-left hover:border-emerald-400/30 transition-colors">
                <div className="flex items-center gap-2 text-[#00D084] mb-1.5">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-2xl sm:text-3xl font-black text-white">+340%</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Organic Reach Acceleration</p>
              </div>

              {/* Stat 2: 5.2x */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-lg text-left hover:border-emerald-400/30 transition-colors">
                <div className="flex items-center gap-2 text-[#00D084] mb-1.5">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl sm:text-3xl font-black text-white">5.2x</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Faster AI Video Output</p>
              </div>

            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-1 text-left">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00D084] shrink-0" />
                <span>Second-by-second viewer retention dropoff analysis</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00D084] shrink-0" />
                <span>TikTok Shop conversion funnels &amp; affiliate attribution</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/#courses"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-sm shadow-[0_12px_28px_-6px_rgba(0,182,122,0.5)] active:scale-95 transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 text-emerald-100 fill-emerald-100" />
                <span>Explore Growth Blueprints</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column: Tablet Showcase Image inside Glowing 3D Glass Stage (7 Cols) */}
          <div className="lg:col-span-7 relative">
            
            {/* Glowing Backdrop */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-400/20 rounded-3xl blur-2xl transform rotate-1" />

            {/* 3D Glass Stage Frame */}
            <div className="relative rounded-3xl border border-white/15 bg-white/5 p-3 sm:p-4 shadow-2xl backdrop-blur-md group">
              <div className="rounded-2xl overflow-hidden bg-slate-950 relative border border-white/10">
                <picture>
                  <source srcSet={dashboardImg} type="image/webp" />
                  <img
                    src={dashboardImg}
                    alt="Content & AI Marketing Growth Dashboard"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    loading="lazy"
                    width="1200"
                    height="675"
                  />
                </picture>

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/85 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Larger Pop-out Floating Stat Badge 1 (Top-Left) with backdrop-blur-xl */}
              <div className="absolute -top-3 -left-3 sm:top-5 sm:left-5 z-20 bg-slate-900/85 backdrop-blur-xl px-4 py-3 rounded-2xl border border-violet-400/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white leading-tight">+340% View Surge</div>
                  <div className="text-[10px] text-slate-400">Viral Hook Telemetry</div>
                </div>
              </div>

              {/* Larger Pop-out Floating Stat Badge 2 (Bottom-Right) with backdrop-blur-xl */}
              <div className="absolute -bottom-3 -right-3 sm:bottom-6 sm:right-6 z-20 bg-slate-900/85 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white leading-tight">100% Monetized</div>
                  <div className="text-[10px] text-slate-400">Multi-Channel Scaled</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
