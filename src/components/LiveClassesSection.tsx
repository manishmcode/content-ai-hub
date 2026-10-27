import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { 
  Calendar,
  Users, 
  Laptop, 
  ArrowRight, 
  Radio,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export const LiveClassesSection: React.FC = () => {
  const { hasActivePlan } = useAuth();
  // A membership is only considered usable once the dashboard confirms an
  // active subscription. Until then, send visitors to choose a plan.
  const liveModulePath = hasActivePlan ? '/library/' : '/pricing/';

  const pillars = [
    {
      id: 1,
      badge: 'SCHEDULED ONLINE CLASSES',
      badgeIcon: <Calendar className="w-3.5 h-3.5 text-emerald-600" />,
      mainIcon: <Calendar className="w-7 h-7 text-white stroke-[2.2]" />,
      gradient: 'from-[#00B67A] to-teal-400 shadow-emerald-500/35',
      title: 'Scheduled Online Classes',
      description: 'Join scheduled sessions and follow structured lessons on the subjects offered. Check your account for available classes, timings, and session details.',
    },
    {
      id: 2,
      badge: 'GUIDED LEARNING',
      badgeIcon: <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />,
      mainIcon: <Users className="w-7 h-7 text-white stroke-[2.2]" />,
      gradient: 'from-[#00B67A] to-teal-400 shadow-emerald-500/35',
      title: 'Guided Learning and Instructor Support',
      description: 'Build your understanding through guided explanations and instructor support where available. Use the learning opportunities provided to clarify concepts and explore topics in greater depth.',
    },
    {
      id: 3,
      badge: 'ACCOUNT ACCESS',
      badgeIcon: <UserCheck className="w-3.5 h-3.5 text-emerald-600" />,
      mainIcon: <Laptop className="w-7 h-7 text-white stroke-[2.2]" />,
      gradient: 'from-[#00B67A] to-teal-400 shadow-emerald-500/35',
      title: 'Course and Session Access',
      description: 'Find your available learning materials and session information through your account. Review the access details for your enrolled courses and scheduled classes.',
    },
  ];

  return (
    <section id="live-classes" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Background Soft Depth Lighting Accents */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-100/35 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-teal-100/30 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#00B67A] text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#00B67A]" />
            <span>LEARN, CONNECT, AND DEVELOP YOUR SKILLS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Take Your Learning Further with <br className="hidden sm:inline" />
            <span className="text-[#00B67A]">
              Live Classes
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Complement your online learning with scheduled live classes. Explore available sessions, follow guided lessons, and strengthen your understanding of the topics covered in your learning programme.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch mb-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(0,182,122,0.12)] hover:-translate-y-2 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Bar with Main Icon & Feature Badge */}
                <div className="flex items-center justify-between mb-6">
                  {/* Vibrant Gradient Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.gradient} shadow-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-300`}>
                    {pillar.mainIcon}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200/70 shadow-2xs">
                    {pillar.badgeIcon}
                    <span>{pillar.badge}</span>
                  </span>
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-[#00B67A] transition-colors">
                  {pillar.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Feature Tag & Indicator */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={liveModulePath}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#00B67A] hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
                  aria-label={`Open ${pillar.title} live module`}
                >
                  <span>Live Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Live Studio Action Banner */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Member learning access */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-left w-full lg:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0 text-white">
                <Radio className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                  Keep Learning. Keep Creating. Keep Growing.
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Explore available courses and live classes to strengthen your marketing knowledge, develop your content skills, and discover new opportunities for online growth.
                </p>
              </div>
            </div>

            {/* CTA Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
              <Link
                to={liveModulePath}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-emerald-500/30 active:scale-95 transition-all duration-200 group whitespace-nowrap"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
export default LiveClassesSection;
