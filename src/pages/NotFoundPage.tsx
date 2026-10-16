import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Home, BookOpen, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-800 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Neon 404 Badge */}
          <div className="relative inline-block">
            <span className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent select-none">
              404
            </span>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 shadow-md">
              <Sparkles className="w-4 h-4 text-[#00B67A]" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Page or Track Not Found
            </h1>
            <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
              The content you're searching for might have been updated, relocated, or is no longer publicly indexed. Let's get you back on track.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              to="/library"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border border-slate-800 active:scale-95 transition-all shadow-md"
            >
              <BookOpen className="w-4 h-4 text-[#00B67A]" />
              <span>Explore Course Library</span>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
