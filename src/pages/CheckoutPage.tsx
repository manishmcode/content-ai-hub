import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../auth/AuthContext';

interface Plan { id: number; name: string; price: string; currency: string; is_active: boolean; description: string | null; }
interface ApiResponse<T> { success: boolean; message?: string; data?: T; }

const formatPrice = (price: string, currency: string) => new Intl.NumberFormat(undefined, {
  style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
}).format(Number(price));

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, getDashboard } = useAuth();
  const planId = Number(sessionStorage.getItem('contentaihub_checkout_plan_id'));
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', country: 'IN', address: '', city: '', postal_code: '', phone: '' });

  useEffect(() => {
    if (!Number.isInteger(planId) || planId < 1) { setError('Please select a membership plan first.'); setLoading(false); return; }
    const controller = new AbortController();
    const loadCheckout = async () => {
      try {
        const [plansResponse, dashboard] = await Promise.all([
          fetch(API_ENDPOINTS.plans, { signal: controller.signal }),
          token ? getDashboard() : Promise.resolve(null),
        ]);
        const payload: ApiResponse<Plan[]> = await plansResponse.json();
        const selectedPlan = payload.data?.find((item) => item.id === planId && item.is_active);
        if (!plansResponse.ok || !payload.success || !selectedPlan) throw new Error('This membership plan is no longer available.');
        setPlan(selectedPlan);
        setForm({
          first_name: dashboard?.firstname || '', last_name: dashboard?.lastname || '', email: dashboard?.email || '',
          country: dashboard?.country || 'IN', address: dashboard?.address || '', city: dashboard?.city || '',
          postal_code: dashboard?.postal_code || '', phone: dashboard?.phone || '',
        });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError(requestError instanceof Error ? requestError.message : 'Unable to prepare checkout.');
      } finally { if (!controller.signal.aborted) setLoading(false); }
    };
    void loadCheckout();
    return () => controller.abort();
  }, [planId, token, getDashboard]);

  const updateField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const submitCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!plan) return;
    if (!token) {
      navigate(`/login?next=${encodeURIComponent('/checkout')}`);
      return;
    }
    setSubmitting(true); setError('');
    try {
      const response = await fetch(API_ENDPOINTS.createPaymentSession, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, country: form.country.toUpperCase(), plan_id: plan.id, plan_name: plan.name, amount: Number(plan.price) }),
      });
      const payload: ApiResponse<{ paymentUrl: string }> = await response.json();
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Unable to start secure payment.');
      if (!payload.data?.paymentUrl) throw new Error('The payment service did not provide a checkout URL.');
      window.location.assign(payload.data.paymentUrl);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to start secure payment.'); }
    finally { setSubmitting(false); }
  };

  return <div className="min-h-screen bg-[#F4F8FC] py-12 px-4 text-slate-800"><div className="max-w-5xl mx-auto"><Link to="/pricing" className="inline-flex items-center gap-2 text-xs font-bold text-[#0B57A2] hover:underline mb-6"><ArrowLeft className="w-4 h-4" />Back to membership plans</Link>{loading ? <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center text-sm text-slate-500">Preparing secure checkout…</div> : error && !plan ? <div className="rounded-3xl bg-rose-50 border border-rose-200 p-6 text-rose-700 text-sm">{error}</div> : plan && <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"><section className="lg:col-span-3 rounded-3xl bg-white border border-slate-200 p-7 sm:p-9 shadow-sm"><div className="flex items-center gap-3 mb-7"><div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B57A2] flex items-center justify-center"><CreditCard className="w-5 h-5" /></div><div><h1 className="text-2xl font-black text-slate-900">Checkout</h1><p className="text-xs text-slate-500">Your details are used to create your secure payment session.</p></div></div>{error && <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">{error}</div>}<form onSubmit={submitCheckout} className="space-y-4"><div className="grid sm:grid-cols-2 gap-4"><label className="text-xs font-bold">First name<input required value={form.first_name} onChange={updateField('first_name')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label><label className="text-xs font-bold">Last name<input required value={form.last_name} onChange={updateField('last_name')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label></div><label className="block text-xs font-bold">Email address<input required type="email" value={form.email} onChange={updateField('email')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label><div className="grid sm:grid-cols-2 gap-4"><label className="text-xs font-bold">Country code<input required minLength={2} maxLength={2} value={form.country} onChange={updateField('country')} placeholder="IN" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium uppercase" /></label><label className="text-xs font-bold">Phone<input value={form.phone} onChange={updateField('phone')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label></div><label className="block text-xs font-bold">Address<input value={form.address} onChange={updateField('address')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label><div className="grid sm:grid-cols-2 gap-4"><label className="text-xs font-bold">City<input value={form.city} onChange={updateField('city')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label><label className="text-xs font-bold">Postal code<input value={form.postal_code} onChange={updateField('postal_code')} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium" /></label></div><button disabled={submitting} type="submit" className="w-full mt-3 rounded-xl bg-[#0B57A2] hover:bg-[#084582] disabled:opacity-60 text-white py-3.5 text-xs font-black uppercase tracking-wider">{submitting ? 'Opening secure payment…' : `Continue to payment · ${formatPrice(plan.price, plan.currency)}`}</button></form></section><aside className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-7 shadow-sm space-y-5"><span className="text-[10px] font-black uppercase tracking-wider text-[#0B57A2]">Order summary</span><div className="border-b border-slate-100 pb-5"><h2 className="text-xl font-black text-slate-900">{plan.name}</h2>{plan.description && <p className="mt-2 text-xs leading-relaxed text-slate-500 whitespace-pre-line">{plan.description}</p>}</div><div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-600">Total per month</span><span className="text-2xl font-black text-[#0B57A2]">{formatPrice(plan.price, plan.currency)}</span></div><div className="flex gap-2 text-xs text-slate-500"><Lock className="w-4 h-4 text-emerald-600 shrink-0" />Payment is completed through our secure payment provider.</div><div className="flex gap-2 text-xs text-slate-500"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />The plan name and price are verified again by the backend.</div></aside></div>}</div></div>;
};
