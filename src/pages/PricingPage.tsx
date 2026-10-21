import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Minus, LoaderCircle } from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { API_ENDPOINTS } from '../config/api';

interface PlanFeature {
  name: string;
  is_included: boolean;
}

interface Plan {
  id: number;
  name: string;
  price: string;
  currency: string;
  is_active: boolean;
  description?: string | null;
  features?: PlanFeature[];
  cta_text?: string;
  is_featured?: boolean;
}

interface PlansResponse {
  success: boolean;
  message?: string;
  data?: Plan[];
}

const formatPrice = (price: string, currency: string) => {
  const numericPrice = Number(price);
  const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;
  if (!isNaN(numericPrice)) {
    return `${symbol}${numericPrice}`;
  }
  return `${symbol}${price}`;
};

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
        if (response.ok && payload.success && Array.isArray(payload.data)) {
          const activePlans = payload.data.filter((plan) => plan.is_active !== false);
          setPlans(activePlans);
          if (activePlans.length === 0) {
            setError('No membership plans are currently available.');
          }
        } else {
          setError(payload.message || 'Membership plans are currently unavailable.');
        }
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError('Membership plans are currently unavailable. Please try again shortly.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void loadPlans();
    return () => controller.abort();
  }, []);

  const plansByPrice = [...plans].sort((a, b) => Number(a.price) - Number(b.price));
  const featuredPlan = plansByPrice.find((plan) => plan.name.trim().toLowerCase() === 'premium')
    ?? plansByPrice.find((plan) => plan.is_featured)
    ?? plansByPrice[Math.floor(plansByPrice.length / 2)];
  const featuredPlanId = featuredPlan?.id;
  const otherPlans = plansByPrice.filter((plan) => plan.id !== featuredPlanId);
  const orderedPlans = featuredPlan
    ? [
        ...otherPlans.slice(0, 1),
        featuredPlan,
        ...otherPlans.slice(1),
      ]
    : [];

  const handleSelectPlan = (planId: number) => {
    sessionStorage.setItem('contentaihub_checkout_plan_id', String(planId));
    navigate('/checkout/');
  };

  return (
    <PublicLayout>
      <div className="min-h-screen text-slate-900 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative font-sans">
        
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          
          {/* Main Hero Header - Light Theme */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#00B67A] border border-emerald-200/80 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
              <span>MEMBERSHIP / 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Invest in Practical Skills.{' '}
              <span className="text-[#00B67A]">
                Scale Your Revenue.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
              Simple monthly pricing with zero long-term lock-in. Instant access to courses, viral prompt vaults, and weekly live instructor sessions. Cancel anytime with one click.
            </p>
          </div>

          {loading && (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 flex items-center justify-center shadow-sm" role="status" aria-label="Loading membership plans">
              <LoaderCircle className="w-7 h-7 text-[#00B67A] animate-spin" />
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Pricing Cards Grid - Light Theme, Aligned Height Wise, Most Popular in Middle */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch pt-6">
            {orderedPlans.map((plan) => {
              const isFeatured = plan.id === featuredPlanId;
              const includedFeatures = plan.features?.filter((feature) => feature.is_included) ?? [];
              const excludedFeatures = plan.features?.filter((feature) => !feature.is_included) ?? [];

              return (
                <div key={plan.id} className="relative flex flex-col h-full">
                  
                  {/* Top-Left Attached Tab for Featured Card */}
                  <div className="h-7 flex items-end">
                    {isFeatured && (
                      <div className="self-start bg-[#00B67A] text-white font-black text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-t-xl relative z-20 shadow-sm">
                        MOST POPULAR
                      </div>
                    )}
                  </div>

                  {/* Card Container - Equal Height Flex Container */}
                  <article
                    className={`p-7 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 relative ${
                      isFeatured
                        ? 'bg-white text-slate-900 border-2 border-[#00B67A] shadow-[0_15px_40px_-10px_rgba(0,182,122,0.2)] rounded-2xl rounded-tl-none'
                        : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl rounded-2xl'
                    }`}
                  >
                    <div className="space-y-6">
                      
                      {/* Card Header */}
                      <div className="text-center space-y-1">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Price Section */}
                      <div className="text-center py-4 my-2 border-y border-slate-100">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isFeatured ? 'text-[#00B67A]' : 'text-slate-900'}`}>
                            {formatPrice(plan.price, plan.currency)}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            / month
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-1">
                          Billed monthly • Cancel anytime
                        </div>
                      </div>

                      {/* Included Features Section */}
                      {includedFeatures.length > 0 && (
                      <div className="space-y-3 pt-1">
                        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                          INCLUDED FEATURES
                        </div>

                        <ul className="space-y-2.5">
                          {includedFeatures.map((feature, fIndex) => (
                            <li key={`${plan.id}-inc-${fIndex}`} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                              <div className="w-4 h-4 rounded-full bg-[#00B67A] text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                              </div>
                              <span className="leading-snug">{feature.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      )}

                      {/* Excluded Features Section (if any) */}
                      {excludedFeatures.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                            NOT INCLUDED
                          </div>

                          <ul className="space-y-2.5">
                            {excludedFeatures.map((feature, eIndex) => (
                              <li key={`${plan.id}-exc-${eIndex}`} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 font-normal">
                                <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                                  <Minus className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <span className="leading-snug line-through decoration-slate-300">{feature.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>

                    {/* Bottom CTA Button - Locked To Baseline */}
                    <div className="pt-8 mt-auto">
                      <button
                        type="button"
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                          isFeatured
                            ? 'bg-[#00B67A] hover:bg-[#00A36D] text-white shadow-md shadow-emerald-500/25'
                            : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                        }`}
                      >
                        <span>{plan.cta_text || 'Choose plan'}</span>
                        {isFeatured && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    </div>

                  </article>
                </div>
              );
            })}
          </div>

          {/* Clean Trust Reassurance Line */}
          <div className="hidden" aria-hidden="true">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00B67A]" /> 30-Day Money-Back Guarantee
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00B67A]" /> Instant Platform Activation
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00B67A]" /> Cancel Anytime in 1 Click
              </span>
            </div>
          </div>

        </div>

      </div>
    </PublicLayout>
  );
};
