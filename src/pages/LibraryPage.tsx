import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Calendar, CheckCircle2, Clock, ExternalLink, GraduationCap, Play, Radio, Search, Video, X } from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { COURSES_DATA } from '../data/coursesData';

interface LibraryCard { title: string; image: string; link: string; type: string; plan_ids: number[]; }
interface LibraryCategory { title: string; cards: LibraryCard[]; }
interface LiveClass { id: number; name: string; recorded_class_link: string | null; class_date: string; end_date: string; end_time: string; timezone: string; is_active: boolean; plan_ids: number[]; }
interface ApiResponse<T> { success: boolean; message?: string; data?: T; }

const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
const assetUrl = (path: string) => path.startsWith('http') ? path : `${apiOrigin}${path}`;
const formatClassDate = (date: string, timezone: string) => {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: timezone }).format(new Date(date));
  } catch {
    return date;
  }
};

const formatGmtOffset = (date: string, timezone: string) => {
  try {
    const offset = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' })
      .formatToParts(new Date(date))
      .find((part) => part.type === 'timeZoneName')?.value;
    return offset?.replace(/GMT([+-])0(\d)/, 'GMT$1$2') || 'GMT';
  } catch {
    return timezone;
  }
};

// Fallback categories mapped from rich COURSES_DATA
const FALLBACK_CATEGORIES: LibraryCategory[] = COURSES_DATA.map((course) => ({
  title: course.title,
  cards: course.modules.map((mod) => ({
    title: `${mod.number}. ${mod.title}`,
    image: '',
    link: '#',
    type: 'Video Masterclass',
    plan_ids: [1, 2, 3],
  })),
}));

export const LibraryPage: React.FC = () => {
  const { token, apiFetch } = useAuth();
  const [activeTab, setActiveTab] = useState<'library' | 'live'>('library');
  const [categorySearch, setCategorySearch] = useState('');
  const [moduleSearch, setModuleSearch] = useState('');
  const [categories, setCategories] = useState<LibraryCategory[]>(FALLBACK_CATEGORIES);
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(FALLBACK_CATEGORIES[0]?.title || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState<{ card: LibraryCard; category: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadContent = async () => {
      try {
        setLoading(true);
        setError('');
        const headers = { Authorization: `Bearer ${token}` };
        const [libraryResponse, classesResponse] = await Promise.all([
          apiFetch(API_ENDPOINTS.library, { headers, signal: controller.signal }).catch(() => null),
          apiFetch(API_ENDPOINTS.classes, { headers, signal: controller.signal }).catch(() => null),
        ]);
        if (libraryResponse && libraryResponse.ok) {
          const libraryPayload: ApiResponse<LibraryCategory[]> = await libraryResponse.json();
          if (libraryPayload.success && Array.isArray(libraryPayload.data) && libraryPayload.data.length > 0) {
            setCategories(libraryPayload.data);
            setSelectedCategoryTitle(libraryPayload.data[0]?.title || '');
          }
        }
        if (classesResponse && classesResponse.ok) {
          const classesPayload: ApiResponse<LiveClass[]> = await classesResponse.json();
          if (classesPayload.success && Array.isArray(classesPayload.data)) {
            setClasses(classesPayload.data.filter((liveClass) => liveClass.is_active));
          }
        }
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    if (token) void loadContent();
    return () => controller.abort();
  }, [token, apiFetch]);

  const filteredCategories = useMemo(() => categories.filter((category) => category.title.toLowerCase().includes(categorySearch.toLowerCase())), [categories, categorySearch]);
  const selectedCategory = categories.find((category) => category.title === selectedCategoryTitle) || categories[0];
  const filteredModules = useMemo(() => selectedCategory?.cards.filter((card) => card.title.toLowerCase().includes(moduleSearch.toLowerCase())) || [], [selectedCategory, moduleSearch]);
  const now = Date.now();
  const upcomingClasses = classes.filter((liveClass) => new Date(liveClass.end_date).getTime() >= now);
  const pastClasses = classes.filter((liveClass) => new Date(liveClass.end_date).getTime() < now);

  const joinClass = async (liveClass: LiveClass) => {
    try {
      const response = await apiFetch(`${API_ENDPOINTS.classes}/${liveClass.id}/join`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const payload: ApiResponse<{ join_path: string }> = await response.json();
      if (!response.ok || !payload.success || !payload.data?.join_path) throw new Error(payload.message || 'Unable to open this class.');
      window.open(`${API_BASE_URL}${payload.data.join_path}`, '_blank', 'noopener,noreferrer');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to open this class.');
    }
  };

  const openLibraryVideo = (card: LibraryCard) => {
    if (!card.link || card.link === '#') {
      setError('This video is not available yet.');
      return;
    }
    window.open(assetUrl(card.link), '_blank', 'noopener,noreferrer');
  };

  const renderClassCard = (liveClass: LiveClass, isPast: boolean) => {
    const hasStarted = Date.now() >= new Date(liveClass.class_date).getTime();

    return (
    <div key={liveClass.id} className="rounded-2xl border border-slate-200/90 p-6 bg-white hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00B67A] flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
            isPast ? 'text-slate-600 bg-slate-100 border-slate-200' : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-slate-400' : 'bg-[#00B67A] animate-pulse'}`} />
            {isPast ? 'Recorded Session' : 'Live Class'}
          </span>
        </div>
        <h3 className="text-base font-black text-slate-900">{liveClass.name}</h3>
        <div className="space-y-1.5 text-xs text-slate-600 pt-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>{formatClassDate(liveClass.class_date, liveClass.timezone)} · {formatGmtOffset(liveClass.class_date, liveClass.timezone)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ends {formatClassDate(liveClass.end_date, liveClass.timezone)}</span>
          </div>
        </div>
      </div>
      {isPast ? (
        liveClass.recorded_class_link ? (
          <a href={assetUrl(liveClass.recorded_class_link)} target="_blank" rel="noreferrer" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
            <Video className="w-4 h-4" />View Class
          </a>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200">
            Archived stream • Session ended at {formatClassDate(liveClass.end_date, liveClass.timezone)}.
          </div>
        )
      ) : (
        hasStarted ? (
          <button type="button" onClick={() => void joinClass(liveClass)} className="w-full py-3 rounded-xl bg-[#00B67A] hover:bg-[#00A36D] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer">
            <Radio className="w-4 h-4" />Join Class
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200 text-center">
            Join available when the class starts.
          </div>
        )
      )}
    </div>
    );
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-900 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Main Top Banner Card - Dark Sculptural Aesthetic */}
          <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-[#09101D] to-[#041D14] border border-slate-800 p-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="pointer-events-none absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-[90px]" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-[90px]" />
            <div className="space-y-4 max-w-2xl text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Creator Learning Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Your Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">Learning Library</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Stream actionable video masterclasses, unlock viral frameworks, and participate in instructor-led live demonstration classes.
              </p>
            </div>
            <div className="shrink-0 relative z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-1 shadow-xl shadow-emerald-500/25">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-emerald-400">
                  <GraduationCap className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 shadow-md w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-emerald-500 to-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Library</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('live')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-gradient-to-r from-emerald-500 to-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Live Classes</span>
            </button>
          </div>

          {error && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800">
              {error}
            </div>
          )}

          {loading && (
            <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center text-sm text-slate-500 shadow-sm">
              Loading your learning content…
            </div>
          )}

          {!loading && activeTab === 'library' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Categories List */}
              <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">Categories</span>
                  <span className="text-xs font-bold bg-emerald-50 text-[#00B67A] px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {categories.length} Tracks
                  </span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filter courses..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A]"
                  />
                </div>
                <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                  {filteredCategories.map((category) => (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryTitle(category.title);
                        setModuleSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory?.title === category.title
                          ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                          : 'bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate pr-2">{category.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                        selectedCategory?.title === category.title ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-600'
                      }`}>
                        {category.cards.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Modules Grid */}
              <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                {selectedCategory ? (
                  <>
                    <div className="space-y-1 border-b border-slate-100 pb-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {selectedCategory.title}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00B67A] text-xs font-bold">
                          {selectedCategory.cards.length} modules
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Select any module to stream high-definition framework lessons and access prompt templates.
                      </p>
                    </div>

                    <div className="relative max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search modules in this track..."
                        value={moduleSearch}
                        onChange={(e) => setModuleSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredModules.map((card, index) => (
                        <div
                          key={`${card.title}-${index}`}
                          className="rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm"
                        >
                          <button
                            type="button"
                            onClick={() => openLibraryVideo(card)}
                            className="relative h-28 w-full text-left bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 overflow-hidden cursor-pointer"
                            aria-label={`Open ${card.title} in a new tab`}
                          >
                            {card.image && (
                              <img src={assetUrl(card.image)} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                            )}
                          </button>

                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                                <Play className="w-2.5 h-2.5 fill-current" />
                                {card.type}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-[#00B67A] transition-colors">
                                {card.title}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => openLibraryVideo(card)}
                              className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-emerald-700 transition-colors w-full cursor-pointer"
                            >
                              <span>Watch Video</span>
                              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-sm text-slate-500">
                    No library modules are available.
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'live' && (
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#00B67A]">
                    Live Classes &amp; Archives
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Live Classes</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00B67A] flex items-center justify-center">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              {classes.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-500 font-medium">
                  No classes available.
                </div>
              ) : <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Live and Upcoming Broadcasts
                  </span>
                  <span className="text-xs font-bold text-emerald-600">{upcomingClasses.length} Sessions</span>
                </div>
                {upcomingClasses.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingClasses.map((liveClass) => renderClassCard(liveClass, false))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-500 font-medium">
                    No live interactive sessions are currently scheduled.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Recorded Studio Replays
                  </span>
                  <span className="text-xs font-bold text-slate-500">{pastClasses.length} Replays</span>
                </div>
                {pastClasses.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastClasses.map((liveClass) => renderClassCard(liveClass, true))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-500 font-medium">
                    No past session recordings are archived.
                  </div>
                )}
              </div>
              </>}
            </div>
          )}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">{activeVideo.category}</span>
                <h3 className="text-lg font-black text-white">{activeVideo.card.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
              {activeVideo.card.link && activeVideo.card.link !== '#' ? (
                <video className="w-full h-full" controls autoPlay src={assetUrl(activeVideo.card.link)}>
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[#00D084] mx-auto flex items-center justify-center">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Previewing: {activeVideo.card.title}</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Full video streams and downloadable prompts are unlocked for active members.
                  </p>
                </div>
              )}
            </div>
            <div className="p-5 bg-slate-950/80 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                <span>Verified Member Stream • High Definition 1080p</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};
