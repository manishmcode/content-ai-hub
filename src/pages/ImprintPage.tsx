import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Building2, Mail, MapPin, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { COMPANY } from '../config/company';

const sectionHeadingClass = 'text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5';
const fieldLabelClass = 'text-xs uppercase tracking-wider text-slate-400 font-bold';
const fieldValueClass = 'text-sm sm:text-[15px] font-semibold text-slate-900 leading-relaxed';
const supportingTextClass = 'text-sm sm:text-[15px] text-slate-600 leading-relaxed';

export const ImprintPage: React.FC = () => {
  const { pathname } = useLocation();

  const disclaimers = [
    'The information provided on this website is for general informational purposes only. While we make every effort to keep the content accurate and up to date, we do not accept liability for any errors, omissions, or outdated information.',
    'This imprint is provided for transparency and legal disclosure purposes. For any questions regarding the website or company information, please contact us using the email address listed above.',
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-800 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white border border-slate-700/60 text-xs font-bold uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Legal Notice &amp; Identification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Imprint &amp; Legal Disclosure
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Official company information, registration details, and legal disclosures for transparency.
            </p>

            {/* Quick Navigation Between Legal Pages */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/terms-conditions/"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/terms-conditions/'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/privacy-policy/"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/privacy-policy/'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/imprint/"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/imprint/'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Imprint &amp; Disclosure
              </Link>
            </div>
          </div>

          {/* Imprint Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-8 text-slate-600 text-sm sm:text-base leading-relaxed">
            
            {/* Clearly separated legal-information cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                <h2 className={sectionHeadingClass}>
                  <Building2 className="w-5 h-5 text-[#00B67A]" />
                  Company details
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className={fieldLabelClass}>Legal company name</dt>
                    <dd className={`${fieldValueClass} mt-1`}>{COMPANY.name}</dd>
                  </div>
                  <div>
                    <dt className={fieldLabelClass}>Website operated</dt>
                    <dd className={`${fieldValueClass} mt-1`}>ContentAIHub.net</dd>
                  </div>
                  <div>
                    <dt className={fieldLabelClass}>Director</dt>
                    <dd className={`${fieldValueClass} mt-1`}>{COMPANY.directorName}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                <h2 className={sectionHeadingClass}>
                  <MapPin className="w-5 h-5 text-[#00B67A]" />
                  Registered address
                </h2>
                <div>
                  <p className={fieldLabelClass}>Registered office</p>
                  <address className={`${fieldValueClass} mt-2 not-italic space-y-1`}>
                    {COMPANY.addressLines.map((line) => <div key={line}>{line}</div>)}
                  </address>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                <h2 className={sectionHeadingClass}>
                  <FileText className="w-5 h-5 text-[#00B67A]" />
                  Company registration
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className={fieldLabelClass}>Registration number</dt>
                    <dd className={`${fieldValueClass} mt-1`}>{COMPANY.companyNumber}</dd>
                  </div>
                  <div>
                    <dt className={fieldLabelClass}>Country of registration</dt>
                    <dd className={`${fieldValueClass} mt-1`}>United Kingdom</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                <h2 className={sectionHeadingClass}>
                  <Mail className="w-5 h-5 text-[#00B67A]" />
                  Contact details
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className={fieldLabelClass}>Email for enquiries and support</dt>
                    <dd className="mt-1"><a href={`mailto:${COMPANY.email}`} className="text-sm sm:text-[15px] font-semibold text-[#00B67A] hover:underline">{COMPANY.email}</a></dd>
                  </div>
                  <div>
                    <dt className={fieldLabelClass}>Website</dt>
                    <dd className={`${supportingTextClass} mt-1`}><a href={COMPANY.website} className="font-semibold text-slate-700 hover:underline">{COMPANY.website}</a></dd>
                  </div>
                </dl>
              </section>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-3">
              <h2 className={sectionHeadingClass}>
                <ShieldCheck className="w-5 h-5 text-[#00B67A]" />
                Responsible for website content
              </h2>
              <p className={fieldValueClass}>{COMPANY.name}</p>
              <p className={supportingTextClass}>{COMPANY.addressLines.join(', ')}</p>
            </section>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 sm:p-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Disclaimer
              </h3>
              <div className="space-y-3">
                {disclaimers.map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

      

            <section className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-[15px] text-slate-500">
              <span>© {new Date().getFullYear()} ContentAIHub.net — All Rights Reserved.</span>
              <Link to="/terms-conditions/" className="inline-flex items-center gap-1 font-bold text-[#00B67A] hover:underline">
                <span>View Terms of Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
