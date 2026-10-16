import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Home, BookOpen, Sparkles } from 'lucide-react';
import { courses } from '../data/coursesData';

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

          {/* Quick Links to Featured Video Courses */}
          <div className="pt-10 border-t border-slate-200 text-left">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-4 text-center">
              Popular Video Upgrades &amp; Masterclasses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses.slice(0, 3).map((course) => (
                <Link
                  key={course.id}
                  to={`/library`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group block"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#0B57A2] transition-colors line-clamp-1">
                    {course.title}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{course.duration}</span>
                    <span className="text-emerald-600 font-bold">{course.price || '€49.00'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
