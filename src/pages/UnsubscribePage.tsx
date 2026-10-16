import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, ShieldAlert } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export const UnsubscribePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [ibanDigits, setIbanDigits] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !ibanDigits || !confirmed) return;
    setError('');
    setStatus('loading');
    try {
      const response = await fetch(API_ENDPOINTS.unsubscribe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          iban_last_5: ibanDigits,
          is_unsubscribe: true,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Unable to cancel the subscription.');
      setStatus('success');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to cancel the subscription.');
      setStatus('idle');
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-28 pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        
        {/* Soft Background Depth Lighting */}
        <div className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-rose-100/30 blur-[130px]" />

        <div className="w-full max-w-2xl relative z-10 space-y-6">
          
          {/* Main Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(15,45,95,0.07)] p-8 sm:p-12 space-y-8 relative overflow-hidden">
            
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500" />

            {/* Header */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Self-Service Subscription Management</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Manage or Cancel Subscription
              </h1>

              <p className="text-sm text-slate-500 leading-relaxed">
                To cancel your recurring membership, enter your account details below. Your renewal will be terminated immediately with no further billing cycles.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Subscription Cancelled</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Auto-renewal has been terminated for <strong className="text-slate-900">{email}</strong>. You will retain access until the end of your current paid period.
                  </p>
                </div>
                <div className="pt-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#0B57A2] text-white text-xs font-black uppercase tracking-wider hover:bg-[#084582] transition-all shadow-md"
                  >
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
                )}
                
                {/* Row 1: FIRST NAME * | LAST NAME * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                      First Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                      Last Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Row 2: EMAIL ADDRESS * */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                    Email Address <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Row 3: LAST 5 DIGITS OF IBAN * */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                    Last 5 Digits of IBAN / Card <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="12345"
                    value={ibanDigits}
                    onChange={(e) => setIbanDigits(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                  />
                </div>

                {/* Row 4: Confirmation Checkbox */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="confirm-unsub"
                    required
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="confirm-unsub" className="text-xs font-semibold text-slate-700 cursor-pointer select-none leading-relaxed">
                    I confirm that I want to unsubscribe from my active recurring subscription.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-2xl bg-[#0B57A2] hover:bg-[#084582] text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Canceling Subscription...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Cancellation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Support notice */}
                <div className="pt-2 text-center text-xs text-slate-500 space-y-2">
                  <p>
                    Need assistance or have billing questions? Contact{' '}
                    <a href="mailto:support@contentaihub.net" className="font-bold text-[#0B57A2] hover:underline">
                      support@contentaihub.net
                    </a>
                  </p>

                  <div>
                    <Link
                      to="/library"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B57A2] transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Wait, I want to keep learning</span>
                    </Link>
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
