import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Scale, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0B57A2] text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Terms of Service</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Terms &amp; Conditions
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Last updated: October 1, 2026 • Effective for all users and subscribers of ContentAIHub.net
            </p>
          </div>

          {/* Legal Content Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,45,95,0.05)] space-y-10 text-slate-600 text-sm sm:text-base leading-relaxed">
            
            {/* Entity Notice */}
            <div className="rounded-2xl bg-blue-50 border border-blue-200/80 p-6 text-xs sm:text-sm text-slate-800 space-y-1.5">
              <span className="font-black text-[#0B57A2] uppercase tracking-wider block text-xs">Service Provider Details</span>
              <p>
                This website (<strong>ContentAIHub.net</strong>) and its educational content, video upgrades, and digital memberships are owned and operated by <strong>Zenaria Ltd</strong>, a registered company with offices at <strong>Str A15 Stadiou, 2867 Oikos, Nicosia, Cyprus</strong> (hereafter "Company", "we", "us", or "our").
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, registering for an account, or purchasing any educational video course, digital guide, or subscription package through ContentAIHub.net, you agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all terms stated herein, you must refrain from using the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                2. Educational Services &amp; Video Courses
              </h2>
              <p>
                ContentAIHub.net provides digital educational material, high-definition instructional video masterclasses, prompt templates, action roadmaps, and optional live interactive growth coaching related to social media algorithms, AI content production, and digital marketing.
              </p>
              <p>
                All materials provided are intended strictly for informational and educational purposes. We do not guarantee specific income figures, algorithmic virality, or follower counts, as real-world results depend on individual dedication, market niches, and platform algorithmic updates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                3. Subscriptions, Pricing &amp; Billing
              </h2>
              <p>
                We offer recurring membership plans (such as €29 Basic, €59 Standard, and €97 Premium per month) providing on-demand video access and interactive live classes.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
                <li>Recurring subscriptions renew automatically at the specified monthly interval unless cancelled prior to the renewal date.</li>
                <li>All transactions are processed securely via SSL encryption using PCI-compliant payment gateways (supporting Visa, Mastercard, SEPA, and debit cards).</li>
                <li>Your bank statement will display the descriptor <strong>Zenaria Ltd</strong>.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                4. Cancellation &amp; 30-Day Money-Back Guarantee
              </h2>
              <p>
                We maintain an unconditional <strong>30-day money-back guarantee</strong> for all initial course enrollments and subscription starts. If you determine our content does not meet your standards within 30 days of initial purchase, contact support at <a href="mailto:support@contentaihub.net" className="text-[#0B57A2] font-bold hover:underline">support@contentaihub.net</a> for a full refund.
              </p>
              <p>
                You may cancel your monthly subscription at any time without penalty via your account dashboard (/my-account) or the self-service <Link to="/unsubscribe" className="text-[#0B57A2] font-bold hover:underline">Unsubscribe page</Link>. Upon cancellation, your access remains active until the expiration of your prepaid period.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                5. Intellectual Property Rights
              </h2>
              <p>
                All digital video materials, software code, graphic designs, audio files, text, and curricula hosted on ContentAIHub.net are protected under international copyright and intellectual property treaties. Enrolled students are granted a non-exclusive, non-transferable personal license to view materials for educational development. 
              </p>
              <p className="text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm font-medium">
                Reselling, unauthorized public mirroring, group-buying sharing, or mass distribution of video streams without express written consent from Zenaria Ltd is strictly prohibited and subject to account termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                6. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the Republic of Cyprus and relevant European Union consumer legislation. Any dispute arising out of or in connection with these Terms shall be submitted to the exclusive jurisdiction of the competent courts of Nicosia, Cyprus.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B57A2]" />
                7. Contact Information
              </h2>
              <p>
                For legal notices or questions regarding these Terms, contact:
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                <p className="text-slate-900 font-bold">Zenaria Ltd</p>
                <p>Str A15 Stadiou, 2867 Oikos, Nicosia, Cyprus</p>
                <p>Email: <a href="mailto:support@contentaihub.net" className="text-[#0B57A2] font-bold">support@contentaihub.net</a></p>
              </div>
            </section>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
