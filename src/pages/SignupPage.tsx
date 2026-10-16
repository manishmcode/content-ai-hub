import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../auth/AuthContext';
import { PublicLayout } from '../components/layout/PublicLayout';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Unable to create your account.');
      authenticate(payload.data.token, payload.data.user);
      navigate('/library', { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 text-slate-900 relative overflow-hidden flex items-center justify-center">
        
        <div className="max-w-md w-full mx-auto relative z-10 space-y-6">
          
          <div className="bg-white border border-slate-200/90 rounded-[32px] p-8 sm:p-10 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px]" />
            
            <div className="space-y-2 relative z-10 text-center sm:text-left">
            
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-1">
                Create Account
              </h1>
              <p className="text-xs text-slate-500">
                Instant access to our creator masterclasses and resource library.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms-conditions" className="text-emerald-600 font-bold hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-emerald-600 font-bold hover:underline">
                      Privacy Policy
                    </Link>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <span>Creating Your Account...</span>
                ) : (
                  <>
                    <span>Complete Free Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 relative z-10">
              <span>Already have an account? </span>
              <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                Sign In
              </Link>
            </div>

          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
            <span>256-Bit Bank Grade Encryption &amp; Privacy Protection</span>
          </div>

        </div>

      </div>
    </PublicLayout>
  );
};
