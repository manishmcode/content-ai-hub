import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY } from '../config/company';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <footer className={`relative bg-[#08121E] text-slate-400 ${isHome ? 'pt-10 sm:pt-14' : 'pt-8'}`}>
      
      {/* Floating Pre-Footer High-Converting CTA Banner - Displayed on Homepage only */}
      {isHome && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mb-12 sm:mb-16">
        <div className="rounded-[32px] bg-gradient-to-r from-[#043327] via-[#054D3B] to-[#022119] p-8 sm:p-10 lg:p-14 shadow-2xl text-white relative overflow-hidden border border-emerald-500/30">
          
          {/* Subtle Ambient Shapes */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="pointer-events-none absolute left-10 -top-10 w-64 h-64 rounded-full bg-teal-400/20 blur-xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* CTA Copy (8 Cols) */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-4">
              <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#00D084]">
                <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
                <span>AI Marketing &amp; Content Growth</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
                Start Mastering Real-World <br className="hidden sm:inline" />
                Skills Today
              </h2>

              <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Join 15,000+ ambitious creators, digital marketers, and e-commerce entrepreneurs scaling across YouTube, TikTok Shop, Instagram, and anonymous AI channels.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-white/90 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                  <span>Instant Access to 6 HD Courses</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                  <span>Action Playbooks &amp; Prompt Vaults</span>
                </div>
              </div>
            </div>

            {/* CTA Button (4 Cols) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                to="/library"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white text-slate-950 font-black text-sm hover:bg-emerald-50 hover:text-emerald-950 hover:shadow-2xl active:scale-95 transition-all duration-300 shadow-xl group"
              >
                <span>Get All 6 Courses</span>
                <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
      )}

      {/* 4-Column Dark Footer with Subtle Top Border */}
      <div className="border-t border-white/10 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            
            {/* Column 1: Brand Info (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5 text-white font-extrabold tracking-tight text-xl group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-baseline font-black tracking-tight text-lg">
                  <span>Content</span>
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AIHub</span>
                  <span className="text-emerald-400 font-mono text-xs ml-0.5 font-bold">.net</span>
                </div>
              </Link>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                ContentAIHub.net is the premier destination for AI-powered marketing, viral video growth blueprints, TikTok Shop commerce, and creator economy business scaling.
              </p>

              {/* Payment Methods Badges */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Accepted Payment Methods</span>
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs font-bold text-slate-300">Visa</span>
                  <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs font-bold text-slate-300">Mastercard</span>
                  <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs font-bold text-slate-300">SEPA</span>
                  <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs font-bold text-slate-300">PayPal</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link to="/library" className="hover:text-cyan-400 transition-colors">Library</Link></li>
                <li><Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link to="/unsubscribe" className="hover:text-cyan-400 transition-colors">Unsubscribe</Link></li>
                <li><Link to="/my-account" className="hover:text-cyan-400 transition-colors">My Account</Link></li>
              </ul>
            </div>

            {/* Column 3: 6 Featured Courses */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">6 Video Upgrades</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/courses/how-to-youtube-video-upgrade" className="hover:text-cyan-400 transition-colors">YouTube Video Upgrade</Link></li>
                <li><Link to="/courses/instagram-marketing-masterclass-video-upgrade" className="hover:text-cyan-400 transition-colors">Instagram Masterclass</Link></li>
                <li><Link to="/courses/tiktok-shop-masterclass-video-upgrade" className="hover:text-cyan-400 transition-colors">TikTok Shop Blueprint</Link></li>
                <li><Link to="/courses/faceless-marketing-masterclass-video-upgrade" className="hover:text-cyan-400 transition-colors">Faceless AI Marketing</Link></li>
                <li><Link to="/courses/the-creator-economy-video-upgrade" className="hover:text-cyan-400 transition-colors">The Creator Economy</Link></li>
                <li><Link to="/courses/know-your-niche-video-upgrade" className="hover:text-cyan-400 transition-colors">Know Your Niche</Link></li>
              </ul>
            </div>

            {/* Column 4: Legal & Company Info */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-cyan-400 transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link to="/imprint" className="hover:text-cyan-400 transition-colors">Imprint</Link></li>
              </ul>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">{COMPANY.name}</p>
                <p>{COMPANY.addressLines.join(', ')}</p>
                <p className="text-cyan-400">{COMPANY.email}</p>
              </div>
            </div>

          </div>

          {/* Bottom Credits & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} ContentAIHub.net — {COMPANY.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link to="/unsubscribe" className="hover:text-slate-300 transition-colors">Unsubscribe</Link>
              <Link to="/imprint" className="hover:text-slate-300 transition-colors">Imprint</Link>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
