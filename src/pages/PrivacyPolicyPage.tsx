import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Shield, ArrowRight } from 'lucide-react';
import { COMPANY } from '../config/company';

interface PrivacySection {
  title: string;
  content: string;
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: '1. Consent to Privacy Policy',
    content:
      'By accessing and using our Site and Services, you acknowledge that you have read and agree to this Privacy Policy.',
  },
  {
    title: '2. Information Collection and Personally Identifiable Information',
    content:
      'We collect the following personal data:\n\nRegistration data: email address, password, first name, last name, phone number, and payment details.\n\nUsage data: information about your browser, network, or device.\n\nMarketing data: details related to communication and other interaction campaigns.\n\nLegal bases\nContract performance (access to services)\nLegitimate interests (fraud prevention, network improvements)\nCompliance with legal obligations (e.g., accounting, tax)\n\nYour rights\nYou may request accessing, correcting, or deleting your data, restrict processing, or object to processing (especially marketing). We will honor such requests unless an overriding legal obligation applies.\n\nWe ensure processing to GDPR compliant data processors, such as hosting providers and payment processors. We may also be legally required to disclose information to authorities (e.g., police authorities).',
  },
  {
    title: '3. Information Use',
    content:
      'Processing payment transactions\n\nCustomizing services, ads, and recommendations\n\nContacting you and responding to requests\n\nConducting research and improving services\n\nPreventing fraud and ensuring security',
  },
  {
    title: '4. Information Sharing and Disclosure',
    content:
      'We will not disclose your personally identifiable information except:\n\nWhen required by law\n\nTo our service providers (e.g., hosting, payment processing)\n\nIn connection with corporate transactions (e.g., merger, sale)\n\nWith your explicit consent or at your direction\n\nWe may share aggregate, anonymous information with partners, advertisers, or content distributors.',
  },
  {
    title: '5. Changing or Deleting Your Information',
    content:
      'You may review, update, correct, or delete your personal information by contacting us. We may retain your data for legally required recordkeeping purposes.',
  },
  {
    title: '6. Use of Cookies and Similar Technologies',
    content:
      'The merchant uses cookies, web beacons, device fingerprinting, and similar technologies for functionality, analytics, personalization, and advertising.\n\nTypes of cookies used include:\nStrictly necessary cookies\nPerformance cookies\nFunctional cookies\nTargeting/advertising cookies\n\nCookies help improve navigation, remember preferences, and display relevant ads. You can manage cookies in your browser settings. Blocking cookies may affect site functionality.\n\nWe may use Google Analytics and Facebook Pixel for tracking and marketing.',
  },
  {
    title: '7. Behavioral Advertising and Online Privacy',
    content:
      'We may use cookies and online identifiers for behavioral advertising. We follow industry standards like Network Advertising Initiative.\n\nYou can manage cookies via browser settings, but some site functions may not work if cookies are disabled.',
  },
  {
    title: '8. Changes and Updates',
    content:
      'We may periodically update this Privacy Policy. We will notify you by posting the modified terms on site. Your continued use implies agreement.',
  },
  {
    title: '9. Contact',
    content:
      'Questions, comments, and requests regarding this Privacy Policy are welcomed and should be addressed to VAQUITA MEDIA LTD, The Old Free School, George Street, Watford, Hertfordshire, WD18 0BX, United Kingdom, or by email at support@contentaihub.net.',
  },
];

export const PrivacyPolicyPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-800 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white border border-slate-700/60 text-xs font-bold uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Privacy &amp; Cookie Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              ContentAIHub.net is committed to protecting your privacy and personal data. We explain how we collect, use, protect, and manage personal information when you use our platform and services.
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

          {/* Privacy Content Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-10 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="text-sm font-semibold text-slate-500">
              Last updated: October, 2026
            </p>
            
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              <strong>Controller details:</strong> ContentAIHub.net is operated by VAQUITA MEDIA LTD, The Old Free School, George Street, Watford, Hertfordshire, WD18 0BX, United Kingdom. Contact: support@contentaihub.net.
            </p>

            {/* Privacy Sections */}
            <div className="space-y-8 divide-y divide-slate-100">
              {PRIVACY_SECTIONS.map((section, idx) => (
                <section key={section.title} className={idx > 0 ? 'pt-8 space-y-3' : 'space-y-3'}>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-[#00B67A] text-xs font-black">
                      <Shield className="w-4 h-4 text-[#00B67A]" />
                    </span>
                    <span>{section.title}</span>
                  </h2>
                  <div className="space-y-3 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                    {section.content.split('\n\n').map((paragraph) => (
                      <p key={paragraph} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Navigation & Rights Notice */}
            <section className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-[15px] text-slate-500">
              <span>To exercise any of your privacy rights, email: <a href={`mailto:${COMPANY.email}`} className="font-bold text-slate-800 hover:text-[#00B67A]">{COMPANY.email}</a></span>
              <Link to="/terms-conditions/" className="inline-flex items-center gap-1 font-bold text-[#00B67A] hover:underline">
                <span>View Terms &amp; Conditions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
