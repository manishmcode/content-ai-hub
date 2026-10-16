import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Calendar, CheckCircle2, Clock, ExternalLink, GraduationCap, Layers, Play, Radio, Search, Sparkles, Video, X } from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

interface LibraryCard { title: string; image: string; link: string; type: string; plan_ids: number[]; }
interface LibraryCategory { title: string; cards: LibraryCard[]; }
interface LiveClass { id: number; name: string; recorded_class_link: string | null; class_date: string; end_date: string; end_time: string; timezone: string; is_active: boolean; plan_ids: number[]; }
interface ApiResponse<T> { success: boolean; message?: string; data?: T; }

const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
const assetUrl = (path: string) => path.startsWith('http') ? path : `${apiOrigin}${path}`;
const formatClassDate = (date: string, timezone: string) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: timezone }).format(new Date(date));

export const LibraryPage: React.FC = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'library' | 'live'>('library');
  const [categorySearch, setCategorySearch] = useState('');
  const [moduleSearch, setModuleSearch] = useState('');
  const [categories, setCategories] = useState<LibraryCategory[]>([]);
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('');
  const [loading, setLoading] = useState(true);
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
          fetch(API_ENDPOINTS.library, { headers, signal: controller.signal }),
          fetch(API_ENDPOINTS.classes, { headers, signal: controller.signal }),
        ]);
        const libraryPayload: ApiResponse<LibraryCategory[]> = await libraryResponse.json();
        const classesPayload: ApiResponse<LiveClass[]> = await classesResponse.json();
        if (!libraryResponse.ok || !libraryPayload.success || !Array.isArray(libraryPayload.data)) throw new Error(libraryPayload.message || 'Unable to load your learning library.');
        if (!classesResponse.ok || !classesPayload.success || !Array.isArray(classesPayload.data)) throw new Error(classesPayload.message || 'Unable to load live classes.');
        const libraryCategories = libraryPayload.data;
        const liveClasses = classesPayload.data;
        setCategories(libraryCategories);
        setClasses(liveClasses.filter((liveClass) => liveClass.is_active));
        setSelectedCategoryTitle((current) => current || libraryCategories[0]?.title || '');
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError(requestError instanceof Error ? requestError.message : 'Unable to load your learning content.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    if (token) void loadContent();
    return () => controller.abort();
  }, [token]);

  const filteredCategories = useMemo(() => categories.filter((category) => category.title.toLowerCase().includes(categorySearch.toLowerCase())), [categories, categorySearch]);
  const selectedCategory = categories.find((category) => category.title === selectedCategoryTitle) || categories[0];
  const filteredModules = useMemo(() => selectedCategory?.cards.filter((card) => card.title.toLowerCase().includes(moduleSearch.toLowerCase())) || [], [selectedCategory, moduleSearch]);
  const now = Date.now();
  const upcomingClasses = classes.filter((liveClass) => new Date(liveClass.end_date).getTime() >= now);
  const pastClasses = classes.filter((liveClass) => new Date(liveClass.end_date).getTime() < now);

  const joinClass = async (liveClass: LiveClass) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.classes}/${liveClass.id}/join`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const payload: ApiResponse<{ join_path: string }> = await response.json();
      if (!response.ok || !payload.success || !payload.data?.join_path) throw new Error(payload.message || 'Unable to open this class.');
      window.open(`${API_BASE_URL}${payload.data.join_path}`, '_blank', 'noopener,noreferrer');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to open this class.');
    }
  };

  const renderClassCard = (liveClass: LiveClass, isPast: boolean) => (
    <div key={liveClass.id} className="rounded-2xl border border-slate-200 p-6 bg-white hover:border-blue-300 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between"><div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#1676DD] flex items-center justify-center"><Radio className="w-4 h-4" /></div><span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isPast ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}><span className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />{isPast ? 'Past Session' : 'Upcoming'}</span></div>
        <h3 className="text-base font-black text-slate-900">{liveClass.name}</h3>
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Available to plan IDs: {liveClass.plan_ids.join(', ')}</span>
        <div className="space-y-1.5 text-xs text-slate-600 pt-1"><div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#1676DD]" /><span>{formatClassDate(liveClass.class_date, liveClass.timezone)}</span></div><div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[#1676DD]" /><span>Ends {formatClassDate(liveClass.end_date, liveClass.timezone)}</span></div></div>
      </div>
      {isPast ? (liveClass.recorded_class_link ? <a href={assetUrl(liveClass.recorded_class_link)} target="_blank" rel="noreferrer" className="w-full py-3 rounded-xl bg-[#0B57A2] hover:bg-[#084582] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"><Video className="w-4 h-4" />Watch Recording</a> : <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200/60">This live class ended at {formatClassDate(liveClass.end_date, liveClass.timezone)}.</div>) : <button type="button" onClick={() => void joinClass(liveClass)} className="w-full py-3 rounded-xl bg-[#0B57A2] hover:bg-[#084582] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"><Radio className="w-4 h-4" />Join Live Class</button>}
    </div>
  );

  return <PublicLayout>
    <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[140px]" /><div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[130px]" />
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="rounded-[32px] bg-white border border-slate-200/80 p-8 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(15,45,95,0.06)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"><div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" /><div className="space-y-4 max-w-2xl text-left relative z-10"><div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1676DD] text-xs font-bold uppercase tracking-wider"><Sparkles className="w-3.5 h-3.5" />Member Learning Portal</div><h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">Your Digital <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Learning Library</span></h1><p className="text-slate-500 text-sm sm:text-base leading-relaxed">Stream actionable video masterclasses, unlock viral frameworks, and participate in instructor-led live demonstration classes.</p><div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-600"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60"><Layers className="w-3.5 h-3.5 text-[#1676DD]" />{categories.length} Tracks</span><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60"><Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />{categories.reduce((total, category) => total + category.cards.length, 0)} Modules</span><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60"><Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />Live Classes</span></div></div><div className="shrink-0 relative z-10"><div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/15"><div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-[#1676DD]"><GraduationCap className="w-12 h-12" /></div></div></div></div>
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit"><button type="button" onClick={() => setActiveTab('library')} className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'library' ? 'bg-[#0B57A2] text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}><BookOpen className="w-4 h-4" />Library</button><button type="button" onClick={() => setActiveTab('live')} className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'live' ? 'bg-[#0B57A2] text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}><Radio className="w-4 h-4 text-rose-400" />Live Classes</button></div>
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm font-medium text-rose-700">{error}</div>}
        {loading && <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center text-sm text-slate-500">Loading your learning content…</div>}
        {!loading && activeTab === 'library' && <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-[0_8px_30px_rgba(15,45,95,0.04)] space-y-4"><div className="flex items-center justify-between pb-2 border-b border-slate-100"><span className="text-xs font-black uppercase tracking-wider text-slate-800">Categories</span><span className="text-xs font-bold bg-blue-50 text-[#1676DD] px-2.5 py-0.5 rounded-full border border-blue-200/50">{categories.length} Tracks</span></div><div className="relative"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Filter categories..." value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500" /></div><div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">{filteredCategories.map((category) => <button key={category.title} type="button" onClick={() => { setSelectedCategoryTitle(category.title); setModuleSearch(''); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all ${selectedCategory?.title === category.title ? 'bg-[#0B57A2] text-white shadow-md' : 'bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100'}`}><span className="truncate pr-2">{category.title}</span><span className={`px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 ${selectedCategory?.title === category.title ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>{category.cards.length}</span></button>)}</div></div>
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,45,95,0.04)] space-y-6">{selectedCategory ? <><div className="space-y-1 border-b border-slate-100 pb-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selectedCategory.title}</h2><span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1676DD] text-xs font-bold">{selectedCategory.cards.length} modules</span></div><p className="text-xs text-slate-500">Click any module to stream instructional video training and access prompt vaults.</p></div><div className="relative max-w-md"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Search modules in this track..." value={moduleSearch} onChange={(event) => setModuleSearch(event.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500" /></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{filteredModules.map((card, index) => <div key={`${card.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group overflow-hidden"><div className="relative h-28 bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0B57A2] overflow-hidden">{card.image && <img src={assetUrl(card.image)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />}<div className="relative z-10 h-full p-3 flex flex-col justify-between"><div className="flex items-center justify-between text-[10px] text-white font-bold uppercase tracking-wider"><span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">MODULE {String(index + 1).padStart(2, '0')}</span><span className="text-blue-100">{card.type}</span></div><span className="text-xs font-black text-white uppercase tracking-tight line-clamp-2 drop-shadow-sm">{selectedCategory.title}</span></div></div><div className="p-4 flex-1 flex flex-col justify-between space-y-3"><div><span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1676DD] uppercase tracking-wider"><Play className="w-2.5 h-2.5 fill-current" />{card.type}</span><h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-[#1676DD] transition-colors">{card.title}</h4></div><button type="button" onClick={() => setActiveVideo({ card, category: selectedCategory.title })} className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#1676DD] transition-colors w-full"><span>Watch Video</span><ExternalLink className="w-3.5 h-3.5 text-[#1676DD]" /></button></div></div>)}</div></> : <div className="text-center py-12 text-sm text-slate-500">No library modules are available.</div>}</div></div>}
        {!loading && activeTab === 'live' && <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-[0_8px_30px_rgba(15,45,95,0.04)] space-y-10"><div className="flex items-center justify-between border-b border-slate-100 pb-6"><div><span className="text-[11px] font-black uppercase tracking-wider text-[#1676DD]">Your Live Broadcast Schedule</span><h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Live Classes</h2></div><div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#1676DD] flex items-center justify-center"><Radio className="w-6 h-6 animate-pulse" /></div></div><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-slate-800">Live and Upcoming Classes</span><span className="text-xs font-bold text-slate-400">{upcomingClasses.length} Classes</span></div>{upcomingClasses.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{upcomingClasses.map((liveClass) => renderClassCard(liveClass, false))}</div> : <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-xs text-slate-600 font-medium">No live interactive sessions are currently scheduled.</div>}</div><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-slate-800">Past Classes &amp; Studio Archives</span><span className="text-xs font-bold text-slate-400">{pastClasses.length} Classes</span></div>{pastClasses.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pastClasses.map((liveClass) => renderClassCard(liveClass, true))}</div> : <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-xs text-slate-600 font-medium">No past classes are available.</div>}</div></div>}
      </div>
    </div>
    {activeVideo && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"><div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-800"><div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50"><div><span className="text-xs text-[#1676DD] font-bold uppercase tracking-wider">{activeVideo.category}</span><h3 className="text-lg font-black text-slate-900">{activeVideo.card.title}</h3></div><button type="button" onClick={() => setActiveVideo(null)} className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700"><X className="w-5 h-5" /></button></div><div className="relative aspect-video bg-slate-950"><video className="w-full h-full" controls autoPlay src={assetUrl(activeVideo.card.link)}>Your browser does not support video playback.</video></div><div className="p-5 bg-white flex items-center gap-2 text-xs text-slate-600 border-t border-slate-100"><CheckCircle2 className="w-4 h-4 text-emerald-600" />Secure member video stream</div></div></div>}
  </PublicLayout>;
};
