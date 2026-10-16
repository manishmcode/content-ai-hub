import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Video,
  Mic,
  Sparkles,
  VolumeX,
  VideoOff,
  Zap,
  BarChart2,
  Flame
} from 'lucide-react';
const tutorCallImg = '/assets/images/tutor-video-call.webp';
const avatarEva = '/assets/images/avatar-eva.webp';
const avatarMentor = '/assets/images/avatar-mentor.webp';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  text: string;
  isMentor?: boolean;
}

const HOOK_PRESETS = [
  {
    niche: 'Faceless YouTube',
    hook1: '“99% of people have no idea this AI tool is replacing 6-figure jobs right now...”',
    hook2: '“Here is the exact blueprint an anonymous channel used to make $14k last month...”',
    hook3: '“Stop posting videos without this 3-second psychological interrupt...”',
    score: '96% Viral Probability',
    cpm: '$18.50 Avg CPM'
  },
  {
    niche: 'TikTok Shop E-Commerce',
    hook1: '“I tested 50 products on TikTok Shop so you don’t waste your money—this one sold out in 4 hours.”',
    hook2: '“If you’re still selling without creator affiliates, you’re leaving 80% of revenue on the table.”',
    hook3: '“Watch how this $4 gadget generated 1.2M views using zero paid ads...”',
    score: '94% Viral Probability',
    cpm: '4.8x ROAS Benchmark'
  },
  {
    niche: 'Instagram Reels',
    hook1: '“Comment ‘SCALE’ and my automated system will DM you the entire 7-step playbook right now.”',
    hook2: '“The Instagram algorithm changed yesterday. Here is what is actually working this week...”',
    hook3: '“Three subtle mistakes you’re making that keep your Reels under 2,000 views...”',
    score: '91% Viral Probability',
    cpm: '38% DM Lead Rate'
  },
];

export const TutorsLiveHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'console' | 'retention' | 'hookgen'>('console');
  const [selectedHookNiche, setSelectedHookNiche] = useState<number>(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Eva Sanchez (Creator)',
      avatar: avatarEva,
      time: '2m ago',
      text: 'Hi! Ready for the YouTube hook & TikTok Shop showcase audit! 🚀',
      isMentor: false,
    },
    {
      id: '2',
      sender: 'Eva Sanchez (Creator)',
      avatar: avatarEva,
      time: '1m ago',
      text: 'Can we inspect the first 3-second hook for my faceless marketing sprint?',
      isMentor: false,
    },
    {
      id: '3',
      sender: 'Marcus Vance (Growth Lead)',
      avatar: avatarMentor,
      time: 'Just now',
      text: 'Streaming the script retention curve and TikTok product showcase layout right now ✨',
      isMentor: true,
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You (Creator)',
      avatar: avatarEva,
      time: 'Just now',
      text: inputVal.trim(),
      isMentor: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'Marcus Vance (Growth Lead)',
          avatar: avatarMentor,
          time: 'Just now',
          text: 'Great angle! Swapping the opening hook with a high-contrast pattern interrupt should boost 5-second retention by 35%.',
          isMentor: true,
        },
      ]);
    }, 1100);
  };

  return (
    <section id="live-hub" className="py-24 md:py-32 bg-white relative overflow-hidden text-slate-800 border-b border-slate-100">
      
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[500px] w-[500px] rounded-full bg-teal-100/30 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00B67A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#00B67A]" />
            <span>LIVE TUTOR SESSIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Tutors &amp; <br className="hidden sm:inline" />
            <span className="text-[#00B67A]">
              Live Session Hub
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Test viral hooks, inspect second-by-second retention curves, and collaborate live with top content strategists in an interactive creator war-room.
          </p>

          {/* Interactive Feature Mode Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'console'
                  ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Live Studio &amp; Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('retention')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'retention'
                  ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Retention Curve Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('hookgen')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'hookgen'
                  ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Hook Simulator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Studio & Chat Console */}
        {activeTab === 'console' && (
          <div className="rounded-[32px] bg-slate-900/80 p-6 sm:p-8 lg:p-10 border border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-fadeIn">
            
            {/* Top Bar with Live Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Workshop: Algorithmic Video &amp; E-Commerce Conversion
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  184 Active Creators in Room
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="text-slate-400">Low-Latency 4K WebRTC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Chat (5 Cols) */}
              <div className="lg:col-span-5 bg-[#0C1222] rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col h-[520px]">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-bold text-white">Live Feedback Stream</span>
                    <span className="text-[10px] bg-violet-500/20 text-violet-300 font-bold px-2 py-0.5 rounded-full border border-violet-500/30">
                      Sprint #04
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Office Hours
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                  {messages.map((msg) => (
                    <div key={msg.id} className="space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <img
                          src={msg.avatar}
                          alt={msg.sender}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-white/20"
                          width="24"
                          height="24"
                        />
                        <span className="text-xs font-semibold text-slate-200">{msg.sender}</span>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed max-w-[92%] ${
                          msg.isMentor
                            ? 'bg-slate-800/90 text-slate-200 border border-slate-700/60 ml-2'
                            : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white ml-2 shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask strategist a question or submit hook..."
                    className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm rounded-full px-4 py-2.5 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white flex items-center justify-center shadow-md active:scale-95 transition cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Column: Two Active Streams + Quick Controls (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Main Video: Marcus Vance Stream */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-950 group">
                  <div className="relative aspect-[16/9]">
                    <picture>
                      <source srcSet={tutorCallImg} type="image/webp" />
                      <img
                        src={tutorCallImg}
                        alt="Marcus Vance - Live Growth Stream"
                        className="w-full h-full object-cover"
                        width="800"
                        height="450"
                      />
                    </picture>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

                    {/* Top Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        LIVE STREAM
                      </span>
                      <span className="bg-black/60 backdrop-blur-md text-[10px] font-semibold text-cyan-400 px-2.5 py-1 rounded-full border border-white/10">
                        4K 60FPS · Studio Mic
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs text-white">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Screen: YouTube Analytics &amp; TikTok UGC</span>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="bg-black/70 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl text-white flex items-center gap-2.5">
                        <span className="text-xs font-bold">Marcus Vance</span>
                        <span className="text-[10px] text-violet-300">Head of Growth</span>
                        <div className="flex items-center gap-0.5 ml-1">
                          <span className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          <span className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:150ms]" />
                          <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-pulse [animation-delay:300ms]" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/15 p-1 rounded-xl">
                        <button
                          onClick={() => setMicActive(!micActive)}
                          className={`p-1.5 rounded-lg transition ${
                            micActive ? 'text-white hover:bg-white/20' : 'bg-red-500 text-white'
                          }`}
                          title="Toggle Mic"
                        >
                          {micActive ? <Mic className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setCamActive(!camActive)}
                          className={`p-1.5 rounded-lg transition ${
                            camActive ? 'text-white hover:bg-white/20' : 'bg-red-500 text-white'
                          }`}
                          title="Toggle Video"
                        >
                          {camActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md">
                    <span className="text-xs font-bold text-cyan-400 block mb-0.5">Audience Telemetry</span>
                    <p className="text-[11px] text-slate-400">Real-time attention heatmaps &amp; hook dropoff checks.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md">
                    <span className="text-xs font-bold text-violet-400 block mb-0.5">Dual Screen Rig</span>
                    <p className="text-[11px] text-slate-400">Inspect editing timelines, script prompts &amp; gear setup.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md">
                    <span className="text-xs font-bold text-emerald-400 block mb-0.5">Direct Critique</span>
                    <p className="text-[11px] text-slate-400">Submit your video link or script for live breakdown.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Retention Curve Lab */}
        {activeTab === 'retention' && (
          <div className="rounded-[32px] bg-slate-900/90 p-6 sm:p-10 border border-violet-500/20 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                Algorithmic Attention Telemetry
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                The Viral Retention Curve: Anatomy of a 1M+ View Video
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                See how high-retention creators maintain engagement compared to average videos. The algorithm rewards content that stays above the 60% retention threshold at the 30-second mark.
              </p>
            </div>

            {/* Retention Graph Visualization */}
            <div className="bg-[#0C1222] rounded-3xl p-6 sm:p-8 border border-white/10 relative">
              
              <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400" />
                    <strong className="text-white">ContentAIHub Blueprint Video</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-600" />
                    <span>Average Creator Video (High Dropoff)</span>
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">+184% Watch Time Advantage</span>
              </div>

              {/* Progress Milestones Bar */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-cyan-300">0:00 - 0:03 | The Pattern Interrupt Hook</span>
                    <span className="text-cyan-400 font-mono">94% Retention (vs 68% avg)</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-[94%]" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Visual contrast change + psychological curiosity anchor before viewer can swipe.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-cyan-300">0:15 - 0:25 | Open Loop &amp; Value Delivery</span>
                    <span className="text-cyan-400 font-mono">82% Retention (vs 44% avg)</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-[82%]" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    B-roll pacing shift every 2.4 seconds keeps eye tracking active.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-cyan-300">0:45 - 1:00 | Call-To-Action &amp; Comment Trigger</span>
                    <span className="text-cyan-400 font-mono">74% Retention (vs 28% avg)</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-[74%]" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Automated keyword prompt triggers comment spikes, boosting algorithmic distribution.
                  </p>
                </div>
              </div>

              {/* Benchmark Summary Badge */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  ⚡ All 6 Course Upgrades include pre-tested retention script templates.
                </span>
                <Link
                  to="/#courses"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-xs hover:shadow-lg transition active:scale-95"
                >
                  Get Retention Templates →
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: AI Hook Simulator */}
        {activeTab === 'hookgen' && (
          <div className="rounded-[32px] bg-slate-900/90 p-6 sm:p-10 border border-violet-500/20 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                Interactive AI Hook Simulator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Generate High-Converting Opening Hooks in Seconds
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Click a category below to test proven psychological hook formulas tailored for different platforms.
              </p>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {HOOK_PRESETS.map((preset, idx) => (
                <button
                  key={preset.niche}
                  onClick={() => setSelectedHookNiche(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedHookNiche === idx
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-500/25'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {preset.niche}
                </button>
              ))}
            </div>

            {/* Generated Hooks Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: 'Curiosity Gap Hook', text: HOOK_PRESETS[selectedHookNiche].hook1, icon: '🔥' },
                { title: 'Social Proof / Case Study', text: HOOK_PRESETS[selectedHookNiche].hook2, icon: '📈' },
                { title: 'Negative Urgency Hook', text: HOOK_PRESETS[selectedHookNiche].hook3, icon: '⚠️' },
              ].map((h, i) => (
                <div
                  key={i}
                  className="bg-[#0C1222] p-5 rounded-2xl border border-white/10 hover:border-violet-400/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-3">
                      <span>{h.icon} {h.title}</span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">Formula #{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed italic">
                      {h.text}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                    <span>{HOOK_PRESETS[selectedHookNiche].score}</span>
                    <span className="text-slate-400 font-normal">{HOOK_PRESETS[selectedHookNiche].cpm}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-300">
                Want 100+ prompt templates for YouTube, TikTok Shop, and Faceless AI?
              </span>
              <Link
                to="/#courses"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-xs hover:shadow-lg transition active:scale-95"
              >
                Access Full Prompt Vault →
              </Link>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
