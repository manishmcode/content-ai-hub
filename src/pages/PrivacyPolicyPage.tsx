import React from 'react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { ShieldCheck, Lock, Eye, Database, UserCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GDPR &amp; Privacy Compliance</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Last updated: October 1, 2026 • We respect and protect your personal data
            </p>
          </div>

          {/* Privacy Content Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,45,95,0.05)] space-y-10 text-slate-600 text-sm sm:text-base leading-relaxed">
            
            {/* Controller Box */}
            <div className="rounded-2xl bg-blue-50 border border-blue-200/80 p-6 text-xs sm:text-sm text-slate-800 space-y-1.5">
              <span className="font-black text-[#0B57A2] uppercase tracking-wider block text-xs">Data Controller</span>
              <p>
                The data controller responsible for the processing of your personal data on ContentAIHub.net under the General Data Protection Regulation (GDPR) is <strong>Zenaria Ltd</strong>, Str A15 Stadiou, 2867 Oikos, Nicosia, Cyprus.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#0B57A2]" />
                1. Information We Collect
              </h2>
              <p>
                When you visit our platform, register an account, or enroll in a video masterclass, we collect certain personal information necessary to deliver our educational services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li><strong className="text-slate-900">Account Information:</strong> Name, email address, password hash, and registration date.</li>
                <li><strong className="text-slate-900">Payment Records:</strong> Transaction IDs, billing country, VAT numbers, and receipt history. We do NOT store full credit card numbers; payment data is processed directly by PCI-compliant payment processors.</li>
                <li><strong className="text-slate-900">Course Progression Data:</strong> Completed modules, quiz scores, bookmarked videos, and playback positions.</li>
                <li><strong className="text-slate-900">Technical Log Data:</strong> IP addresses, browser types, device specifications, and referral URLs collected via server logs to prevent unauthorized account sharing.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#0B57A2]" />
                2. Legal Basis for Processing (GDPR Article 6)
              </h2>
              <p>
                We only process your personal data where a lawful basis applies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li><strong className="text-slate-900">Contract Performance:</strong> To provision your course access, deliver live coaching streams, and process transactions.</li>
                <li><strong className="text-slate-900">Legal Obligations:</strong> Retaining accounting and VAT records for European tax authorities.</li>
                <li><strong className="text-slate-900">Legitimate Interests:</strong> Improving video streaming performance, platform security, and fraud prevention.</li>
                <li><strong className="text-slate-900">Consent:</strong> For opt-in marketing newsletters and product updates (you may withdraw consent at any time).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#0B57A2]" />
                3. Third-Party Service Providers
              </h2>
              <p>
                We never sell, rent, or trade your personal data. We only share necessary subsets of information with vetted third-party service providers bound by strict data processing agreements (DPAs):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>PCI-DSS Level 1 payment gateways for secure checkout processing.</li>
                <li>Cloud hosting infrastructure and CDN providers for low-latency video streaming.</li>
                <li>Transactional email delivery providers for order receipts and password recovery tokens.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#0B57A2]" />
                4. Your GDPR &amp; Privacy Rights
              </h2>
              <p>
                As a user, you hold comprehensive rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li><strong className="text-slate-900">Right of Access:</strong> Request a copy of all personal records held about you.</li>
                <li><strong className="text-slate-900">Right to Rectification:</strong> Request correction of inaccurate information directly from your Account Settings.</li>
                <li><strong className="text-slate-900">Right to Erasure ("Right to be Forgotten"):</strong> Request full deletion of your user account and associated personal data.</li>
                <li><strong className="text-slate-900">Right to Data Portability:</strong> Request an export of your progress records and enrollment history in machine-readable JSON format.</li>
              </ul>
              <p>
                To exercise any of these rights, contact our Data Protection Office at <a href="mailto:support@contentaihub.net" className="text-[#0B57A2] font-bold hover:underline">support@contentaihub.net</a>. Requests are completed within 30 days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0B57A2]" />
                5. Data Retention &amp; Security
              </h2>
              <p>
                We employ industry-standard 256-bit TLS/SSL encryption across all network transfers. All databases are hosted within secure European data centers with automated encrypted backups. We retain personal account data only as long as necessary to maintain your active learning credentials and fulfill legal accounting requirements.
              </p>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
