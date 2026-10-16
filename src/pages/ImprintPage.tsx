import React from 'react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Building2, Mail, MapPin, Scale, ExternalLink } from 'lucide-react';
import { COMPANY } from '../config/company';

export const ImprintPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0B57A2] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Legal Notice &amp; Identification</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Imprint / Legal Disclosure
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Information in accordance with Section 5 of the European E-Commerce Directive
            </p>
          </div>

          {/* Imprint Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,45,95,0.05)] space-y-8 text-slate-600 text-sm sm:text-base leading-relaxed">
            
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0B57A2]" />
                  Service Provider
                </h2>
                <div className="space-y-1 text-slate-700 font-medium">
                  <p className="text-lg font-black text-slate-900">{COMPANY.name}</p>
                  <p>Operating Entity for ContentAIHub.net</p>
                  <p>Director: {COMPANY.directorName}</p>
                  <p>Company Number: {COMPANY.companyNumber}</p>
                  <p className="text-xs text-slate-500">Jurisdiction: United Kingdom</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0B57A2]" />
                  Registered Office Address
                </h2>
                <div className="space-y-1 text-slate-700">
                  {COMPANY.addressLines.map((line, index) => (
                    <p key={line} className={index === 0 ? 'font-semibold text-slate-900' : undefined}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Electronic Contact Details */}
            <div className="space-y-4 pb-8 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                Electronic Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Customer Support:</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-[#0B57A2] font-bold hover:underline font-mono">
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Website URL:</span>
                  <span className="text-slate-800 font-mono font-bold">{COMPANY.website}</span>
                </div>
              </div>
            </div>

            {/* Online Dispute Resolution (ODR) */}
            <div className="space-y-4 pb-8 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#0B57A2]" />
                EU Dispute Resolution
              </h2>
              <p>
                The European Commission provides a platform for online dispute resolution (ODR), accessible at:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B57A2] font-bold hover:underline inline-flex items-center gap-1 font-mono text-xs"
                >
                  <span>https://ec.europa.eu/consumers/odr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-slate-500 text-xs">
                We are neither obligated nor committed to participate in dispute resolution proceedings before a consumer arbitration board, but prefer to resolve any customer questions directly and constructively through our support desk.
              </p>
            </div>

            {/* Disclaimer & Copyright */}
            <div className="space-y-4 text-xs text-slate-500 leading-relaxed">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Liability for Content &amp; Links</h3>
              <p>
                The contents of our video courses and web pages have been created with the utmost care. However, we cannot guarantee the complete absence of errors or omissions. As a service provider, we are responsible for our own content on these pages under general law. We are not obligated to monitor transmitted or stored external information or investigate circumstances pointing to illegal activity.
              </p>
              <p>
                Our website contains links to external websites of third parties over whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.
              </p>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
