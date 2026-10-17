import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  X,
  BookOpen, 
  ExternalLink, 
} from 'lucide-react';
import { COURSES_DATA, Course } from '../data/coursesData';

interface CoursesProps {
  onSelectCourse?: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const filteredCourses = COURSES_DATA;

  return (
    <section id="courses" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      
      {/* Background Soft Depth Lighting */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-teal-100/30 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Distinctive Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#00B67A] text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00B67A]" />
            <span>COMPREHENSIVE CURRICULUM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Learn AI &amp; Tech Through <br className="hidden sm:inline" />
            <span className="text-[#00B67A]">
              Courses &amp; Live Guidance
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Six comprehensive video upgrade masterclasses engineered for the creator economy. From YouTube retention and viral Reels to automated TikTok Shop commerce and anonymous faceless channels.
          </p>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {filteredCourses.map((course) => {
              return (
                <div
                  key={course.id}
                  className="rounded-[1.8rem] transition-all duration-300 flex flex-col justify-between bg-white border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)] group overflow-hidden"
                >
                  {/* Gradient video-card header */}
                  <div className={`h-[160px] p-5 bg-gradient-to-br ${course.gradientBadge} text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                    <div className="relative h-full flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="max-w-[42%] px-3 py-1 rounded-full bg-white/20 border border-white/35 text-[10px] font-black uppercase tracking-wide backdrop-blur-sm truncate">
                          {course.category}
                        </span>
                      </div>

                      <div className="mt-7">
                        <div className="text-xl sm:text-2xl font-black leading-tight line-clamp-3">{course.title}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    {/* Content Section */}
                    <div className="p-6 pb-4">
                      <div className="text-xs font-bold text-emerald-600 mb-2.5 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span className="line-clamp-1">{course.tagline}</span>
                      </div>

                      <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">{course.shortDescription}</p>

                      {/* Key Outcomes */}
                      <div className="space-y-2.5 mb-4">
                        {course.keyOutcomes.slice(0, 3).map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{outcome}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        {/* Global Bottom Button matching Screenshot */}
        <div className="mt-14 text-center">
          <Link
            to="/library"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Comprehensive Course Detail Modal */}
      {activeModalCourse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setActiveModalCourse(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className={`p-6 sm:p-8 bg-gradient-to-tr ${activeModalCourse.gradientBadge} text-white relative`}>
              <button
                onClick={() => setActiveModalCourse(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {activeModalCourse.category}
                </span>
                <span className="text-xs font-semibold text-white/80">
                  {activeModalCourse.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
                {activeModalCourse.title}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-white/90">
                {activeModalCourse.tagline}
              </p>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Outcomes */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Practical Takeaways</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalCourse.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  <span>Curriculum Breakdown ({activeModalCourse.modules.length} Modules)</span>
                </h4>
                <div className="space-y-3">
                  {activeModalCourse.modules.map((mod) => (
                    <div key={mod.number} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-violet-300 transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          {mod.number}. {mod.title}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {mod.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {mod.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 sm:px-8 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={activeModalCourse.idplrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-800 transition"
              >
                <span>View IDPLR Package Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveModalCourse(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
                >
                  Close
                </button>
                <Link
                  to="/#live-hub"
                  onClick={() => setActiveModalCourse(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-violet-500/25 active:scale-95 transition"
                >
                  <span>Enroll In Masterclass</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
