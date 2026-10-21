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
            
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100 font-semibold">
              <div className="space-y-3">
                <h2 className={sectionHeadingClass}>
                  <Building2 className="w-5 h-5 text-[#00B67A]" />
                  Company Information
                </h2>
                <div className="space-y-2">
                  <p className={fieldLabelClass}>Company Name</p>
                  <p className={fieldValueClass}>{COMPANY.name}</p>
                  <p className={fieldValueClass}>Operating entity for ContentAIHub.net</p>
                  <div className="pt-2">
                    <p className={fieldLabelClass}>Represented by / Director</p>
                    <p className={fieldValueClass}>{COMPANY.directorName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className={sectionHeadingClass}>
                  <MapPin className="w-5 h-5 text-[#00B67A]" />
                  Registered Address
                </h2>
                <div className="space-y-2">
                  <p className={fieldLabelClass}>Official Headquarters</p>
                  {COMPANY.addressLines.map((line) => (
                    <p key={line} className={fieldValueClass}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Registration & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100 font-semibold">
              <div className="space-y-3">
                <h2 className={sectionHeadingClass}>
                  <FileText className="w-5 h-5 text-[#00B67A]" />
                  Registration
                </h2>
                <div>
                  <span className={`${fieldLabelClass} block`}>Company Registration Number</span>
                  <span className={`${fieldValueClass} block`}>{COMPANY.companyNumber}</span>
                  <p className={`${fieldValueClass} mt-1`}>Incorporated &amp; registered under the laws of the United Kingdom</p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className={sectionHeadingClass}>
                  <Mail className="w-5 h-5 text-[#00B67A]" />
                  Contact
                </h2>
                <div>
                  <span className={`${fieldLabelClass} block`}>Official Inquiries &amp; Support</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm sm:text-[15px] font-semibold text-[#00B67A] hover:underline">
                    {COMPANY.email}
                  </a>
                  <p className={`${supportingTextClass} mt-1`}>Website: <a href={COMPANY.website} className="hover:underline text-slate-700">{COMPANY.website}</a></p>
                </div>
              </div>
            </div>

            {/* Responsible for Website Content */}
            <div className="space-y-3 pb-8 border-b border-slate-100">
              <h2 className={sectionHeadingClass}>
                <ShieldCheck className="w-5 h-5 text-[#00B67A]" />
                Responsible for Website Content
              </h2>
              <p className={fieldValueClass}>{COMPANY.name}</p>
              <p className={fieldValueClass}>
                {COMPANY.addressLines.join(', ')}
              </p>
            </div>

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

      

            <section className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} ContentAIHub.net — All Rights Reserved.</span>
              <Link to="/terms-conditions/" className="inline-flex items-center gap-1 font-bold text-[#00B67A] hover:underline">
                <span>View Terms of Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
