import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  X, 
  BookOpen, 
  Play, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { COURSES_DATA, Course } from '../data/coursesData';

interface CoursesProps {
  onSelectCourse?: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const categories = [
    { label: 'All Blueprints', value: 'All' },
    { label: 'YouTube', value: 'YouTube' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'TikTok Shop', value: 'TikTok Shop' },
    { label: 'Faceless AI', value: 'Faceless Marketing' },
    { label: 'Creator Economy', value: 'Creator Economy' },
    { label: 'Niche Strategy', value: 'Niche Strategy' },
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const openModal = (course: Course) => {
    setActiveModalCourse(course);
    if (onSelectCourse) {
      onSelectCourse(course);
    }
  };

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

          {/* Interactive Search & Filter Console */}
          <div className="mt-8 max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-md shadow-slate-200/50 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill, hook, platform, or keyword..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap border border-emerald-200/50">
                {filteredCourses.length} of {COURSES_DATA.length} Available
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25 scale-105'
                    : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No courses match your search</h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your search terms or select "All Blueprints" to view all 6 video upgrades.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCardId === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => openModal(course)}
                  className="rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white border border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,92,246,0.16)] hover:border-violet-400/50 group overflow-hidden"
                >
                  <div>
                    {/* Media Header Banner with Video Overlay */}
                    <div className={`relative h-44 bg-gradient-to-tr ${course.gradientBadge} p-5 flex flex-col justify-between overflow-hidden text-white`}>
                      {/* Ambient pattern overlay */}
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                      
                      {/* Top Badges */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25">
                          {course.category}
                        </span>

                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 border border-white/10">
                          <Zap className="w-3 h-3 fill-emerald-300" />
                          <span>{course.impactMetric}</span>
                        </div>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/95 text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white/90">HD Video Blueprint</div>
                          <div className="text-[11px] text-white/70">{course.format}</div>
                        </div>
                      </div>

                      {/* Bottom Duration & Rating Bar */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-300" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-amber-300">
                          <Star className="w-3.5 h-3.5 fill-amber-300" />
                          <span>{course.rating} ({course.studentsCount.toLocaleString()})</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{course.tagline}</span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#00B67A] transition-colors mb-3">
                        {course.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {course.shortDescription}
                      </p>

                      {/* Key Outcomes */}
                      <div className="space-y-2 mb-4">
                        {course.keyOutcomes.slice(0, 3).map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{outcome}</span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive In-Card Module Toggle */}
                      <div className="pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(course.id, e)}
                          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-[#00B67A] py-1.5 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Curriculum Quick-Look ({course.modules.length} Modules)</span>
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2.5 space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100 animate-fadeIn">
                            {course.modules.map((m) => (
                              <div key={m.number} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                                <span className="font-bold text-emerald-600 shrink-0">{m.number}.</span>
                                <span className="font-medium line-clamp-1">{m.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Bar */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={course.idplrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold text-slate-400 hover:text-[#00B67A] flex items-center gap-1 transition"
                      title="View original IDPLR resource"
                    >
                      <span>IDPLR Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#00B67A] group-hover:translate-x-0.5 transition-transform">
                        Explore Blueprint
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#00B67A] text-slate-700 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Global Bottom Button matching Screenshot */}
        <div className="mt-14 text-center">
          <Link
            to="/library"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <span>Explore All 6 Courses</span>
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
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Course Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalCourse.fullDescription}
                </p>
              </div>

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
