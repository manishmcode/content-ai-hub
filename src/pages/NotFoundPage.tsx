import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Home, BookOpen, Sparkles } from 'lucide-react';
import { courses } from '../data/coursesData';

export const NotFoundPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-36 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Neon 404 Badge */}
          <div className="relative inline-block">
            <span className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent select-none">
              404
            </span>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-300">
              <Sparkles className="w-4 h-4 text-[#0B57A2]" />
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0B57A2] hover:bg-[#084582] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              to="/library"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#0B57A2]" />
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
