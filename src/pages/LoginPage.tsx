import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../auth/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Unable to sign in.');
      authenticate(payload.data.token, payload.data.user);
      const nextPath = new URLSearchParams(location.search).get('next');
      navigate(nextPath?.startsWith('/') && !nextPath.startsWith('//') ? nextPath : '/library', { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-800 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-blue-100/60 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[400px] w-[400px] rounded-full bg-indigo-100/40 blur-[130px]" />

      {/* Top Simple Brand Bar */}
      <header className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight text-xl group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-md shadow-violet-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline font-black tracking-tight text-lg text-slate-900">
              <span>Content</span>
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">AIHub</span>
              <span className="text-emerald-500 font-mono text-xs ml-0.5 font-bold">.net</span>
            </div>
          </Link>

          <Link
            to="/signup"
            className="text-xs font-bold text-slate-700 hover:text-slate-950 px-4 py-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white shadow-sm transition"
          >
            Create Free Account
          </Link>
        </div>
      </header>

      {/* Login Card Form */}
      <div className="max-w-md w-full mx-auto px-4 py-8 relative z-10">
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,45,95,0.07)] space-y-6">
          
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In to Your Hub
            </h1>
            <p className="text-xs text-slate-500">
              Access your enrolled video masterclasses, prompt vaults, and live studio.
            </p>
          </div>

          {/* Sign-in helper */}
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0B57A2] shrink-0" />
            <div>
              <span className="font-bold text-[#0B57A2] block">Secure account access</span>
              <span className="text-[11px] text-slate-500">Use the email address and password for your account.</span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/unsubscribe"
                  className="text-xs font-semibold text-[#0B57A2] hover:underline transition"
                >
                  Need Help?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition font-medium font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0B57A2] hover:bg-[#084582] text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Learning Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="text-[#0B57A2] font-bold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>
      </div>

      {/* Simple Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} ContentAIHub.net — Zenaria Ltd. All rights reserved.
      </footer>
    </div>
  );
};
