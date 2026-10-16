import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { FileText, ArrowRight, Building2 } from 'lucide-react';
import { COMPANY } from '../config/company';

interface TermsSection {
  title: string;
  content: string;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: '1. Service',
    content:
      "We provide online courses and educational materials through our platform. The Service is provided 'as is' and 'as available' without any warranties of any kind. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.",
  },
  {
    title: '2. User Agreement',
    content:
      'By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, then you may not access the Service. You must provide accurate and complete information when creating an account.',
  },
  {
    title: '3. Your License',
    content:
      'We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for your personal, non-commercial educational purposes. You may not copy, modify, distribute, sell, or lease any part of our Services or included software.',
  },
  {
    title: '4. Support Services',
    content:
      `Support is provided primarily via email and our dedicated support portal. Email ${COMPANY.email} to contact ${COMPANY.name}. We strive to respond to all inquiries within 24-48 business hours.`,
  },
  {
    title: '5. Fees and Payment',
    content:
      'Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms. We may add new services for additional fees and charges, or amend fees and charges for existing services, at any time in our sole discretion.',
  },
  {
    title: '6. Cancellation',
    content:
      'You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing cycle. You will continue to have access to the Service through the end of your billing period.',
  },
  {
    title: '7. Refund Policy',
    content:
      `All courses and educational content offered through this website are delivered digitally and access is typically granted immediately upon purchase. By completing a purchase, you acknowledge that immediate access affects your eligibility for a refund.\n\nYou may request a refund within 14 days of your initial purchase, provided that you have not substantially accessed or completed the course materials. Requests are assessed on a case-by-case basis and are not automatically guaranteed.\n\nRefund requests must be submitted in writing to ${COMPANY.email}, including your order number and the reason for the request. We aim to respond to all refund requests within 5 business days.`,
  },
  {
    title: '8. Right to Terminate',
    content:
      'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
  },
  {
    title: '9. Your Responsibilities',
    content:
      'You are responsible for all activities that occur under your account. You agree not to share your account credentials with third parties, use the Service for any illegal or unauthorized purpose, attempt to hack, destabilize, or adapt the Service, or transmit any worms, viruses, or destructive code.',
  },
  {
    title: '10. Suspension / Discontinuation',
    content:
      'We reserve the right at any time to modify or discontinue, temporarily or permanently, the Service or any part thereof with or without notice.',
  },
  {
    title: '11. Dispute Resolution',
    content:
      `If you have a complaint or dispute regarding a purchase, charge, or your use of the services, you agree to first contact us at ${COMPANY.email} so that we may attempt to resolve the matter directly. We aim to acknowledge complaints within 24 hours and to reach a resolution within 5 business days.`,
  },
  {
    title: '12. Governing Law',
    content:
      'These Terms, and any dispute or claim arising out of or in connection with them or the services provided through this website, shall be governed by and construed in accordance with the laws of United Kingdom, without regard to its conflict of law provisions.',
  },
  {
    title: '13. Copyright',
    content:
      'All content, features, and functionality are and will remain the exclusive property of ContentAIHub.net and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.',
  },
  {
    title: '14. Links to Other Websites',
    content:
      'Our Service may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.',
  },
  {
    title: '15. Trademarks',
    content:
      `The company name, logo, and related names, product names, service names, designs, and slogans are trademarks of ${COMPANY.name}, ContentAIHub.net, or its affiliates or licensors.`,
  },
  {
    title: '16. Force Majeure',
    content:
      'We shall not be liable for any failure or delay in performance under these Terms resulting from acts beyond our reasonable control, including war, terrorism, riots, embargoes, fire, floods, accidents, strikes, or shortages of transportation, fuel, energy, labor, or materials.',
  },
  {
    title: '17. Disclaimer of Warranties',
    content:
      'Your use of the Service is at your sole risk. The Service is provided on an AS IS and AS AVAILABLE basis. The Service is provided without warranties of any kind, whether express or implied.',
  },
  {
    title: '18. Age Restriction',
    content:
      'The Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using the Service, you warrant and represent that you are at least eighteen (18) years of age.',
  },
  {
    title: '19. General Provisions',
    content:
      'These Terms shall be governed and construed in accordance with the laws of United Kingdom, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.',
  },
];

export const TermsPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-800 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white border border-slate-700/60 text-xs font-bold uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Legal Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Terms &amp; Conditions
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Please read these Terms and Conditions carefully before using our website and services operated by {COMPANY.name}.
            </p>

            {/* Quick Navigation Between Legal Pages */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/terms-conditions"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/terms-conditions'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/privacy-policy"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/privacy-policy'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/imprint"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                  pathname === '/imprint'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                Imprint &amp; Disclosure
              </Link>
            </div>
          </div>

          {/* Legal Content Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-10 text-slate-600 text-sm sm:text-base leading-relaxed">
            
            {/* Entity Notice */}
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-6 text-xs sm:text-sm text-slate-800 space-y-1.5">
              <span className="font-black text-[#00B67A] uppercase tracking-wider block text-xs flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                Operating Entity Details
              </span>
              <p>
                This website (<strong>ContentAIHub.net</strong>) and its educational curriculum, digital memberships, and masterclasses are operated by <strong>{COMPANY.name}</strong>, registered in the United Kingdom under Company No. <strong>{COMPANY.companyNumber}</strong>, located at <strong>{COMPANY.addressLines.join(', ')}</strong>.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-8 divide-y divide-slate-100">
              {TERMS_SECTIONS.map((section, idx) => (
                <section key={section.title} className={idx > 0 ? 'pt-8 space-y-3' : 'space-y-3'}>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-[#00B67A] text-xs font-black">
                      <FileText className="w-4 h-4 text-[#00B67A]" />
                    </span>
                    <span>{section.title}</span>
                  </h2>
                  <div className="text-slate-600 text-sm sm:text-[15px] leading-relaxed whitespace-pre-line space-y-2">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Notice */}
            <section className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Questions regarding our Terms? Contact: <a href={`mailto:${COMPANY.email}`} className="font-bold text-slate-800 hover:text-[#00B67A]">{COMPANY.email}</a></span>
              <Link to="/privacy-policy" className="inline-flex items-center gap-1 font-bold text-[#00B67A] hover:underline">
                <span>View Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
