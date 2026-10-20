import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle2, Clock, Shield } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../auth/AuthContext';
import { PublicLayout } from '../components/layout/PublicLayout';

interface Plan {
  id: number;
  name: string;
  price: string;
  currency: string;
  is_active: boolean;
  description: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

const CHECKOUT_ENABLED = false;

const formatPrice = (price: string, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));

const DEFAULT_PLANS: Plan[] = [
  { id: 1, name: 'Basic', price: '18', currency: 'EUR', is_active: true, description: 'Cancel anytime. Access lifestyle courses.' },
  { id: 2, name: 'Classic', price: '48', currency: 'EUR', is_active: true, description: 'Cancel anytime. Access lifestyle and business courses.' },
  { id: 3, name: 'Premium', price: '98', currency: 'EUR', is_active: true, description: 'Full unlimited access with scheduled instructor-led live classes & direct Q&A.' },
];

const BillingLocationFields = lazy(() => import('../components/BillingLocationFields'));

export const CheckoutPage: React.FC = () => {
  const { token, getDashboard, apiFetch } = useAuth();
  const planId = Number(sessionStorage.getItem('contentaihub_checkout_plan_id')) || 2;
  const [plan, setPlan] = useState<Plan | null>(DEFAULT_PLANS.find(p => p.id === planId) || DEFAULT_PLANS[1]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone: '',
    address: '',
    country: 'US',
    state_region: '',
    city: '',
    postal_code: '',
    iban: '',
    agree_terms: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const loadCheckout = async () => {
      try {
        const [plansResponse, dashboard] = await Promise.all([
          fetch(API_ENDPOINTS.plans, { signal: controller.signal }).catch(() => null),
          token ? getDashboard().catch(() => null) : Promise.resolve(null),
        ]);
        if (plansResponse && plansResponse.ok) {
          const payload: ApiResponse<Plan[]> = await plansResponse.json();
          const selectedPlan = payload.data?.find((item) => item.id === planId && item.is_active);
          if (selectedPlan) {
            setPlan(selectedPlan);
          }
        }
        if (dashboard) {
          setForm((prev) => ({
            ...prev,
            first_name: dashboard.firstname || prev.first_name,
            last_name: dashboard.lastname || prev.last_name,
            email: dashboard.email || prev.email,
            country: dashboard.country || prev.country,
            address: dashboard.address || prev.address,
            city: dashboard.city || prev.city,
            postal_code: dashboard.postal_code || prev.postal_code,
            phone: dashboard.phone || prev.phone,
          }));
        }
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      }
    };
    void loadCheckout();
    return () => controller.abort();
  }, [planId, token, getDashboard]);

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!CHECKOUT_ENABLED) return;
    if (!plan) return;

    if (!form.agree_terms) {
      setError('Please agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const response = await apiFetch(API_ENDPOINTS.createPaymentSession, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          country: form.country.toUpperCase(),
          plan_id: plan.id,
          plan_name: plan.name,
          amount: Number(plan.price),
        }),
      });
      const payload: ApiResponse<{ paymentUrl: string }> = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Unable to start secure payment.');
      }
      if (!payload.data?.paymentUrl) {
        throw new Error('The payment service did not provide a checkout URL.');
      }
      window.location.assign(payload.data.paymentUrl);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to start secure payment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 text-slate-900 relative">
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          
          {/* Header section matching reference */}
          <div className="space-y-3">
            <Link
              to="/pricing/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00B67A]" />
              <span>Back to membership plans</span>
            </Link>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00B67A] font-mono block">
                ONE STEP CLOSER
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mt-1">
                Complete your ContentAIHub membership
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Secure checkout for practical AI productivity and online business learning. Your access begins as soon as your order is confirmed.
              </p>
            </div>
          </div>

          {error && !plan ? (
            <div className="rounded-3xl bg-rose-50 border border-rose-200 p-6 text-rose-700 text-sm">
              {error}
            </div>
          ) : plan && (
            <form onSubmit={submitCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Sticky Dark Membership Summary Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4">
                <div className="bg-[#0B1322] text-white rounded-[28px] p-7 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
                  
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono block">
                    YOUR MEMBERSHIP
                  </span>

                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <h2 className="text-xl font-black text-white">{plan.name}</h2>
                      <span className="text-xs text-slate-400 block mt-0.5">Subscription</span>
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-semibold">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Subscription</span>
                      <span>{formatPrice(plan.price, plan.currency)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                      <span>Total today</span>
                      <span className="text-lg text-emerald-400">{formatPrice(plan.price, plan.currency)}</span>
                    </div>
                  </div>

                  {/* Protected checkout badge box */}
                  <div className="bg-[#142138] rounded-2xl p-4 border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-slate-200">
                      <Lock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-white block">Protected checkout</span>
                      <span className="text-[11px] text-slate-400">Your information is encrypted and secure.</span>
                    </div>
                  </div>

                </div>

                <p className="text-center text-xs text-slate-500 px-4 leading-relaxed">
                  Cancel anytime from your account. Questions before you subscribe?{' '}
                  <a href="mailto:support@contentaihub.net" className="text-[#00B67A] font-bold hover:underline">
                    Contact support
                  </a>.
                </p>
              </div>

              {/* Right Column: Form Cards */}
              <div className="lg:col-span-7 space-y-6">
                
                {error && (
                  <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700">
                    {error}
                  </div>
                )}

                {/* Card 1: Your information */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight pb-1">
                    Your information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        EMAIL ADDRESS <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={updateField('email')}
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                          FIRST NAME <span className="text-[#00B67A]">*</span>
                        </label>
                        <input
                          required
                          value={form.first_name}
                          onChange={updateField('first_name')}
                          placeholder="John"
                          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                          LAST NAME <span className="text-[#00B67A]">*</span>
                        </label>
                        <input
                          required
                          value={form.last_name}
                          onChange={updateField('last_name')}
                          placeholder="Doe"
                          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        CREATE A PASSWORD <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        type="password"
                        value={form.password}
                        onChange={updateField('password')}
                        placeholder="Choose a secure password"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        PHONE NUMBER <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={updateField('phone')}
                        placeholder="Your phone number"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Billing details */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight pb-1">
                    Billing details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        STREET ADDRESS <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        value={form.address}
                        onChange={updateField('address')}
                        placeholder="Enter your street address"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                      />
                    </div>

                    <Suspense fallback={<p className="text-sm text-slate-500" role="status">Loading address options...</p>}>
                      <BillingLocationFields
                        value={form}
                        onChange={location => setForm(prev => ({ ...prev, ...location }))}
                      />
                    </Suspense>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        POSTCODE / ZIP <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        value={form.postal_code}
                        onChange={updateField('postal_code')}
                        placeholder="Enter your postcode"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 3: SEPA Direct Debit / Payment Information */}
                <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-sm space-y-5">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      SEPA Direct Debit Information
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Set up a secure SEPA Direct Debit for your ContentAIHub membership.
                    </p>
                  </div>

                  {/* Highlighted Payment Method Box */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#00B67A] text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 fill-current text-[#00B67A] stroke-white" />
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        SEPA Direct Debit
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      By providing your IBAN, you authorize ContentAIHub to collect recurring subscription payments from your account in accordance with your membership terms.
                    </p>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        IBAN <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        required
                        value={form.iban}
                        onChange={updateField('iban')}
                        placeholder="Enter your IBAN"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition font-mono uppercase"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium">
                      Payment information. All transactions are secure and encrypted.
                    </p>
                  </div>

                  {/* Terms confirmation checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={form.agree_terms}
                        onChange={updateField('agree_terms')}
                        required
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        I confirm that I have read and agree to the{' '}
                        <Link to="/terms-conditions/" target="_blank" className="text-[#00B67A] font-bold hover:underline">
                          Terms &amp; Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy/" target="_blank" className="text-[#00B67A] font-bold hover:underline">
                          Privacy Policy
                        </Link>.
                      </span>
                    </label>
                  </div>

                  {/* Complete Order Button */}
                  <button
                    type="submit"
                    disabled={!CHECKOUT_ENABLED || submitting}
                    className="w-full py-4 rounded-full font-black text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white shadow-lg active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Processing secure order…' : 'Complete secure order'}</span>
                  </button>

                  {/* Reassurance Below Button */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <Clock className="w-4 h-4 text-[#00B67A] shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">Cancel anytime</span>
                        <span className="text-[11px] text-slate-500">Manage your subscription from your account.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <Shield className="w-4 h-4 text-[#00B67A] shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">Secure processing</span>
                        <span className="text-[11px] text-slate-500">Your information is protected.</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </PublicLayout>
  );
};
