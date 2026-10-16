import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY } from '../config/company';
import { VisaIcon, MastercardIcon, SepaIcon } from './common/PaymentIcons';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <footer className="bg-[#08121E] border-t border-slate-800/80 text-slate-400 relative overflow-hidden font-sans">

      {/* Subtle Ambient Glowing Depth Shapes */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />

      {/* Floating Pre-Footer CTA Banner - Displayed on Homepage */}
      {isHome && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 sm:pt-20 mb-8 sm:mb-12">
          <div className="rounded-[32px] bg-gradient-to-r from-[#043327] via-[#054D3B] to-[#022119] p-8 sm:p-10 lg:p-14 shadow-2xl text-white relative overflow-hidden border border-emerald-500/30">

            {/* Subtle Ambient Shapes */}
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="pointer-events-none absolute left-10 -top-10 w-64 h-64 rounded-full bg-teal-400/20 blur-xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* CTA Copy (8 Cols) */}
              <div className="lg:col-span-8 text-center lg:text-left space-y-4">
                <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#00D084]">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>ContentAIHub Library</span>
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
                  Learn Skills for Your <br className="hidden sm:inline" />
                  Creator Business
                </h2>

                <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Explore practical lessons in YouTube and video marketing, faceless marketing, TikTok Shop, the creator economy, and niche strategy.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-white/90 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                    <span>Practical video lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                    <span>Live classes for members</span>
                  </div>
                </div>
              </div>

              {/* CTA Button (4 Cols) */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <Link
                  to="/library"
                  className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white text-slate-950 font-black text-sm hover:bg-emerald-50 hover:text-emerald-950 hover:shadow-2xl active:scale-95 transition-all duration-300 shadow-xl group"
                >
                  <span>Explore Library</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isHome ? 'pt-8 pb-12' : 'pt-16 pb-12'}`}>

        {/* Exact 4-Column Layout from Reference Site in Dark Theme */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.05fr] mb-16">

          {/* Column 1: Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-black text-white tracking-tight mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-[#00B67A] flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline font-black tracking-tight text-2xl">
                <span>Content</span>
                <span className="text-[#00B67A]">AIHub</span>
                <span className="text-[#00B67A] font-mono text-sm ml-0.5 font-bold">.net</span>
              </div>
            </Link>

            <p className="text-[14px] leading-relaxed text-slate-400 font-medium max-w-[310px] mb-8">
              ContentAIHub.net offers video courses and live classes on AI productivity, remote work, freelancing, and online business.
            </p>

            {/* Accepted Payment Methods */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-7 px-2.5 bg-white rounded-md flex items-center justify-center shadow-sm transition-transform hover:scale-105" title="Visa">
                  <VisaIcon className="h-3 w-auto" />
                </div>
                <div className="h-7 px-2 bg-white rounded-md flex items-center justify-center shadow-sm transition-transform hover:scale-105" title="Mastercard">
                  <MastercardIcon className="h-4 w-auto" />
                </div>
                <div className="h-7 px-2 bg-white rounded-md flex items-center justify-center shadow-sm transition-transform hover:scale-105" title="SEPA Direct Debit">
                  <SepaIcon className="h-3.5 w-auto" />
                </div>
         
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-6">
              Quick links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/unsubscribe" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Unsubscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-[13px] font-bold text-slate-400 hover:text-emerald-400 transition-colors">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Details */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-6">
              Company Details
            </h4>
            <div className="space-y-3 text-[13px] leading-relaxed text-slate-400 font-medium">
              <p>
                <strong className="text-slate-200 font-bold">Company Name:</strong>{' '}
                {COMPANY.name}
              </p>
              <p>
                <strong className="text-slate-200 font-bold">Company Address:</strong>{' '}
                {COMPANY.addressLines.join(', ')}
              </p>
              <p>
                <strong className="text-slate-200 font-bold">Email:</strong>{' '}
                <a href={`mailto:${COMPANY.email}`} className="text-emerald-400 hover:underline font-semibold">
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching reference */}
        <div className="border-t border-slate-800/80 pt-6 text-[12px] font-bold text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ContentAIHub.net. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link to="/imprint" className="hover:text-slate-300 transition-colors">
              Imprint
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
};
export default Footer;
