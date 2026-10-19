import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { ArrowRight, ArrowLeft, RefreshCw, Mail, User, CreditCard } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export const UnsubscribePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [ibanDigits, setIbanDigits] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !ibanDigits || !confirmed) return;
    setError('');
    setSuccessMessage('');
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
      setFirstName('');
      setLastName('');
      setEmail('');
      setIbanDigits('');
      setConfirmed(false);
      setSuccessMessage('Email sent successfully.');
      setStatus('idle');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to cancel the subscription.');
      setStatus('idle');
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-900 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        
        <div className="w-full max-w-2xl relative z-10 space-y-6">
          
          {/* Main Card with Deep Navy Header & Crisp White Body */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden">
            
            {/* Header: Dark Navy Contrast Banner */}
            <div className="bg-[#0A1220] text-white p-7 sm:p-9 relative overflow-hidden border-b border-slate-800">
              <div className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#00B67A]/15 blur-2xl" />
              
              <div className="relative z-10 space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-[#00B67A]/30 text-[#00D084] text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
                  <span>Subscription Management</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Cancel Subscription
                </h1>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Zero long-term lock-in. Enter your verification details below to terminate recurring renewal immediately.
                </p>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-7 sm:p-9 space-y-6">
              
              <form onSubmit={handleSubmit} className="space-y-4">
                  {successMessage && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      {successMessage}
                    </div>
                  )}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {error}
                    </div>
                  )}
                  
                  {/* Row 1: FIRST NAME * | LAST NAME * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>First Name</span>
                        <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#00B67A] focus:ring-2 focus:ring-[#00B67A]/20 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Last Name</span>
                        <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#00B67A] focus:ring-2 focus:ring-[#00B67A]/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: EMAIL ADDRESS * */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email Address</span>
                      <span className="text-[#00B67A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#00B67A] focus:ring-2 focus:ring-[#00B67A]/20 transition-all font-medium"
                    />
                  </div>

                  {/* Row 3: LAST 5 DIGITS OF IBAN / CARD * */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>Last 5 Digits of IBAN / Card</span>
                      <span className="text-[#00B67A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="12345"
                      value={ibanDigits}
                      onChange={(e) => setIbanDigits(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#00B67A] focus:ring-2 focus:ring-[#00B67A]/20 transition-all font-mono"
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="confirm-unsub"
                      required
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-[#00B67A] border-slate-300 focus:ring-[#00B67A] cursor-pointer"
                    />
                    <label htmlFor="confirm-unsub" className="text-xs font-semibold text-slate-700 cursor-pointer select-none leading-relaxed">
                      I confirm that I want to cancel my recurring subscription renewal.
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(0,182,122,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,182,122,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group"
                    >
                      {status === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Canceling Subscription...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Cancellation</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Support notice */}
                  <div className="pt-3 text-center text-xs text-slate-500 space-y-2">
                    <p>
                      Need assistance or have billing questions? Contact{' '}
                      <a href="mailto:support@contentaihub.net" className="font-bold text-[#00B67A] hover:underline">
                        support@contentaihub.net
                      </a>
                    </p>

                    <div className="pt-1">
                      <Link
                        to="/library"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00B67A] transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Wait, I want to keep learning</span>
                      </Link>
                    </div>
                  </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
