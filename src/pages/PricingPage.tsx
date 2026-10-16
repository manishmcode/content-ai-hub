import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, HelpCircle, Radio, ShieldCheck, Sparkles, Star, X, Zap } from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { API_ENDPOINTS } from '../config/api';

interface PlanFeature { name: string; is_included: boolean; }
interface Plan { id: number; name: string; price: string; currency: string; is_active: boolean; description: string | null; features: PlanFeature[]; }
interface PlansResponse { success: boolean; message?: string; data?: Plan[]; }

const formatPrice = (price: string, currency: string) => new Intl.NumberFormat(undefined, {
  style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
}).format(Number(price));

const isLiveClassFeature = (feature: PlanFeature) => /live|instructor|interaction|demonstration|questions|scheduled|upcoming|past classes|join eligible/i.test(feature.name);

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const loadPlans = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(API_ENDPOINTS.plans, { signal: controller.signal });
        const payload: PlansResponse = await response.json();
        if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.message || 'Unable to load membership plans.');
        }
        setPlans(payload.data.filter((plan) => plan.is_active));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError(requestError instanceof Error ? requestError.message : 'Unable to load membership plans.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void loadPlans();
    return () => controller.abort();
  }, []);

  const featuredPlanId = plans.reduce<number | null>((currentId, plan) => {
    if (currentId === null) return plan.id;
    const current = plans.find((item) => item.id === currentId);
    return Number(plan.price) > Number(current?.price ?? 0) ? plan.id : currentId;
  }, null);

  // Keep the featured (highest-priced) plan in the centre card even if the API
  // returns plans in a different order.
  const otherPlans = plans
    .filter((plan) => plan.id !== featuredPlanId)
    .sort((first, second) => Number(first.price) - Number(second.price));
  const featuredPlan = plans.find((plan) => plan.id === featuredPlanId);
  const middleIndex = Math.ceil(otherPlans.length / 2);
  const displayPlans = featuredPlan
    ? [...otherPlans.slice(0, middleIndex), featuredPlan, ...otherPlans.slice(middleIndex)]
    : otherPlans;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-28 pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[130px]" />
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1676DD] text-xs font-bold uppercase tracking-wider"><Sparkles className="w-3.5 h-3.5" />Transparent &amp; Flexible Learning Membership</span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">Invest in Practical Skills That <br className="hidden sm:inline" /><span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Scale Your Revenue</span></h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">Choose the membership that suits you. You can change or cancel your plan at any time.</p>
          </div>

          {loading && <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center text-sm font-medium text-slate-500 shadow-sm">Loading membership plans…</div>}
          {error && <div className="rounded-3xl bg-rose-50 border border-rose-200 p-6 text-center text-sm font-medium text-rose-700">{error}</div>}
          {!loading && !error && plans.length === 0 && <div className="rounded-3xl bg-white border border-slate-200 p-10 text-center text-sm font-medium text-slate-500 shadow-sm">No membership plans are available right now.</div>}

          {!loading && !error && plans.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
              {displayPlans.map((plan) => {
                const isFeatured = plan.id === featuredPlanId;
                const coreFeatures = plan.features.filter((feature) => !isLiveClassFeature(feature));
                const liveClassFeatures = plan.features.filter(isLiveClassFeature);
                return (
                  <article key={plan.id} className={`rounded-[32px] bg-white p-8 flex flex-col justify-between space-y-8 transition-all ${isFeatured ? 'border-2 border-[#0B57A2] shadow-[0_20px_50px_rgba(11,87,162,0.12)] relative lg:-translate-y-3' : 'border border-slate-200/90 shadow-[0_10px_35px_rgba(15,45,95,0.05)] hover:shadow-xl'}`}>
                    {isFeatured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap"><span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB300] text-slate-950 text-xs font-black uppercase tracking-wider shadow-md"><Star className="w-3.5 h-3.5 fill-current" />Most Complete Access</span></div>}
                    <div className={`space-y-6 ${isFeatured ? 'pt-2' : ''}`}>
                      <div className="space-y-2 pb-5 border-b border-slate-100">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${isFeatured ? 'bg-blue-50 text-[#0B57A2]' : 'bg-slate-100 text-slate-700'}`}>Membership plan</span>
                        <h2 className={`${isFeatured ? 'text-3xl' : 'text-2xl'} font-black text-slate-900 tracking-tight`}>{plan.name}</h2>
                        {plan.description && <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">{plan.description}</p>}
                        <div className="pt-3 flex items-baseline gap-1.5"><span className={`${isFeatured ? 'text-5xl text-[#0B57A2]' : 'text-4xl text-slate-900'} font-black`}>{formatPrice(plan.price, plan.currency)}</span><span className="text-xs font-semibold text-slate-500">/ per month</span></div>
                      </div>
                      <div className="space-y-3 text-xs">
                        <span className={`text-[10px] font-black uppercase tracking-wider block ${isFeatured ? 'text-[#0B57A2]' : 'text-slate-400'}`}>What's included</span>
                        {coreFeatures.map((feature, index) => <div key={`${plan.id}-core-${index}-${feature.name}`} className={`flex items-start gap-2.5 ${feature.is_included ? 'font-semibold text-slate-800' : 'text-slate-400'}`}><div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${feature.is_included ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>{feature.is_included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}</div><span className={feature.is_included ? '' : 'line-through'}>{feature.name}</span></div>)}
                      </div>
                      {liveClassFeatures.length > 0 && (
                        <div className={`rounded-2xl p-4 space-y-3 text-xs ${isFeatured ? 'bg-blue-50/70 border border-blue-200/80' : 'border-t border-slate-100 pt-4 rounded-none'}`}>
                          <div className={`flex items-center gap-2 font-black uppercase tracking-wider text-[10px] ${isFeatured ? 'text-[#0B57A2]' : 'text-slate-400'}`}>
                            <Radio className={`w-4 h-4 ${isFeatured ? 'text-[#0B57A2] animate-pulse' : 'text-slate-300'}`} />
                            {liveClassFeatures.some((feature) => feature.is_included) ? 'Includes Live Classes' : 'Live Classes (Not Included)'}
                          </div>
                          <div className="space-y-2">
                            {liveClassFeatures.map((feature, index) => <div key={`${plan.id}-live-${index}-${feature.name}`} className={`flex items-start gap-2 ${feature.is_included ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{feature.is_included ? <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" /> : <X className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />}<span className={feature.is_included ? '' : 'line-through'}>{feature.name}</span></div>)}
                          </div>
                        </div>
                      )}
                    </div>
                    <button type="button" onClick={() => { sessionStorage.setItem('contentaihub_checkout_plan_id', String(plan.id)); navigate('/checkout'); }} className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${isFeatured ? 'bg-[#0B57A2] hover:bg-[#084582] text-white shadow-lg shadow-blue-500/25 active:scale-95' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>Start Learning</button>
                  </article>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-slate-600">
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B57A2] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div><div className="text-xs"><span className="font-bold text-slate-900 block">30-Day Money-Back Guarantee</span><span>Unconditional refund if not fully satisfied.</span></div></div>
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Zap className="w-5 h-5" /></div><div className="text-xs"><span className="font-bold text-slate-900 block">Instant Activation</span><span>Full access provisioned immediately upon checkout.</span></div></div>
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><HelpCircle className="w-5 h-5" /></div><div className="text-xs"><span className="font-bold text-slate-900 block">Cancel Anytime</span><span>Self-service cancellation with zero lock-in contracts.</span></div></div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
