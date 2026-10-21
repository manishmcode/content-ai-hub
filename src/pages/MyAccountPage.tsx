import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { 
  CreditCard, 
  FileText, 
  User, 
  Lock, 
  LogOut, 
  Mail, 
  CheckCircle2,
  Copy,
  LoaderCircle,
  Radio,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';
import { DashboardData, useAuth } from '../auth/AuthContext';
import { API_ENDPOINTS } from '../config/api';

interface AdminLiveClass {
  id: number;
  name: string;
  url: string;
  recorded_class_link: string | null;
  class_date: string;
  end_date: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
  plan_ids: number[];
}

type ClassForm = Omit<AdminLiveClass, 'id'>;

const emptyClassForm = (): ClassForm => ({
  name: '', url: '', recorded_class_link: '', class_date: '', end_date: '', end_time: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', is_active: true, plan_ids: [],
});

export const MyAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, getDashboard, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'subscriptions' | 'details' | 'password'>('payments');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  // Account details state
  const [firstName, setFirstName] = useState(user?.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name.split(' ').slice(1).join(' ') || '');
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (user?.is_admin) {
      setIsDashboardLoading(false);
      return;
    }
    let active = true;
    getDashboard()
      .then((data) => {
        if (!active) return;
        setDashboard(data);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setDisplayName(data.user_meta?.display_name || `${data.firstname} ${data.lastname}`.trim());
        setEmail(data.email);
      })
      .catch(() => {
        // The page remains usable with the account details stored at sign-in.
      })
      .finally(() => {
        if (active) setIsDashboardLoading(false);
      });
    return () => { active = false; };
  }, [getDashboard, user?.is_admin]);

  const profileName = displayName || `${firstName} ${lastName}`.trim() || user?.name || 'Member';
  const primarySubscription = dashboard?.subscriptions[0];
  const subscriptionStatus = primarySubscription?.status || dashboard?.user_meta?.subscription_status || 'No active plan';
  const formatAmount = (amount: number, currency = 'EUR') => new Intl.NumberFormat(undefined, {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(amount);
  const formatDate = (date: string) => new Date(date).toLocaleString();

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    try {
      await updateProfile({ firstname: firstName, lastname: lastName, display_name: displayName });
      const updatedDisplayName = displayName.trim() || `${firstName} ${lastName}`.trim();
      setDisplayName(updatedDisplayName);
      setDashboard((currentDashboard) => currentDashboard && {
        ...currentDashboard,
        firstname: firstName,
        lastname: lastName,
        user_meta: {
          ...currentDashboard.user_meta,
          display_name: updatedDisplayName,
        },
      });
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2500);
    } catch (requestError) {
      setProfileError(requestError instanceof Error ? requestError.message : 'Unable to save your profile.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordError('Your new passwords do not match.');
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordFeedback(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordFeedback(false), 2500);
    } catch (requestError) {
      setPasswordError(requestError instanceof Error ? requestError.message : 'Unable to update your password.');
    }
  };

  if (user?.is_admin) return <AdminAccountPage />;

  if (isDashboardLoading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="w-full max-w-6xl rounded-[32px] bg-white border border-slate-200/90 shadow-sm py-20 flex items-center justify-center" role="status" aria-label="Loading account dashboard">
            <LoaderCircle className="w-9 h-9 text-[#00B67A] animate-spin" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-transparent text-slate-900 pt-36 sm:pt-40 md:pt-44 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">

          {/* Top User Executive Profile Card - Dark Sculptural Banner */}
          <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-[#0A1120] to-[#041D14] border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 bg-emerald-500/15 rounded-full blur-[80px]" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 w-72 h-72 bg-teal-500/10 rounded-full blur-[80px]" />
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative z-10">
              <div className="relative">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-emerald-500/30">
                  {profileName.charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00B67A] border-2 border-slate-900 flex items-center justify-center text-[10px] text-white font-black">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {profileName}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                    {subscriptionStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium text-slate-200">{email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 relative z-10">
              <button
                onClick={() => navigate('/library/')}
                className="px-5 py-2.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Go to Library
              </button>
              <button
                onClick={() => { logout(); navigate('/login/'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-rose-300 text-xs font-bold transition-all cursor-pointer backdrop-blur-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

          </div>

          {/* Main Grid: Modern Sidebar Tabs + Content Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Sidebar Navigation (4 Cols) */}
            <div className="md:col-span-4 rounded-3xl bg-white p-3 shadow-sm border border-slate-200/90 space-y-1.5">
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'payments'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Payments &amp; Invoices</span>
              </button>

              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'subscriptions'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>My Subscriptions</span>
              </button>

              <button
                onClick={() => setActiveTab('details')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Account Details</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'password'
                    ? 'bg-[#00B67A] text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Security &amp; Password</span>
              </button>
            </div>

            {/* Right Main Panel (8 Cols) */}
            <div className="md:col-span-8 rounded-[32px] bg-white p-6 sm:p-10 shadow-sm border border-slate-200/90">
              
              {/* TAB 1: PAYMENTS */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="space-y-0.5">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Payment History
                      </h2>
                      <p className="text-xs text-slate-500">Verified transaction receipts and monthly recurring charges.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00B67A] text-xs font-bold border border-emerald-200">
                      {dashboard?.payments.length || 0} Transactions
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Payment Ref</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {(dashboard?.payments ?? []).map((payment) => (
                        <tr key={payment.payment_id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4 text-[11px] text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate max-w-[170px] sm:max-w-[220px]">
                                {payment.payment_id}
                              </span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(payment.payment_id);
                                  setCopiedRef(true);
                                  setTimeout(() => setCopiedRef(false), 2000);
                                }}
                                className="text-slate-400 hover:text-emerald-600 p-1 rounded transition"
                                title="Copy Reference ID"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {copiedRef && (
                              <span className="text-[10px] text-[#00B67A] font-bold block mt-0.5">
                                Copied to clipboard!
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-500">
                            {formatDate(payment.date)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00B67A] text-[10px] font-black uppercase">
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-black text-slate-900 text-right text-sm">
                            {formatAmount(payment.price, primarySubscription?.currency)}
                          </td>
                        </tr>
                        ))}
                        {dashboard && dashboard.payments.length === 0 && (
                          <tr><td colSpan={4} className="py-8 px-4 text-center text-slate-400">No payment records found.</td></tr>
                        )}
                        {!dashboard && (
                          <tr>
                            <td className="py-4 px-4 text-[11px] text-slate-600">INV-2026-9481</td>
                            <td className="py-4 px-4 text-slate-500">Oct 16, 2026</td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00B67A] text-[10px] font-black uppercase">
                                Active
                              </span>
                            </td>
                            <td className="py-4 px-4 font-black text-slate-900 text-right text-sm">$59.00</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: MY SUBSCRIPTIONS */}
              {activeTab === 'subscriptions' && (
                <div className="space-y-8">
                  <div className="space-y-0.5 pb-4 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      My Subscriptions
                    </h2>
                    <p className="text-xs text-slate-500">Plan details, renewal schedule, and billing information.</p>
                  </div>

                  {/* Status Box */}
                  <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden bg-slate-50/50">
                    <div className="p-4 flex items-center justify-between bg-slate-100/60">
                      <span className="text-slate-600 font-bold uppercase tracking-wider text-[11px]">Membership Status</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00B67A] font-black uppercase text-[10px] border border-emerald-200">
                        {primarySubscription?.status || 'Active Member'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Start Date</span>
                      <span className="font-semibold text-slate-900">{primarySubscription ? formatDate(primarySubscription.starts_at) : 'Oct 16, 2026'}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">End / Renewal Date</span>
                      <span className="font-semibold text-slate-900">{primarySubscription ? formatDate(primarySubscription.ends_at) : 'Nov 16, 2026'}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Payment Channel</span>
                      <span className="font-bold text-slate-900">{primarySubscription?.payment_status || 'Card • Paid'}</span>
                    </div>
                  </div>

                  {/* Subscription totals */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Subscription Totals</h3>
                    <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden bg-slate-50/50">
                      <div className="p-3.5 bg-slate-100/60 text-slate-600 font-bold uppercase flex justify-between tracking-wider text-[10px]">
                        <span>Product</span>
                        <span>Total</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-medium">
                        <span className="text-slate-900 font-semibold">{primarySubscription?.plan_name || 'Pro Growth Accelerator'}</span>
                        <span className="font-bold text-slate-900">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '$59.00'}</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-medium">
                        <span className="text-slate-500">SubTotal:</span>
                        <span className="font-bold text-slate-900">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '$59.00'}</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-black text-slate-900 text-sm bg-emerald-50/60">
                        <span>Total Billed:</span>
                        <span className="text-[#00B67A]">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '$59.00'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Billing address */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Billing Address</h3>
                    <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden bg-slate-50/50">
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Address</span><span className="text-slate-700">{dashboard?.address || '123 Creator Way'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Country</span><span className="text-slate-700">{dashboard?.country || 'United States'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">City</span><span className="text-slate-700">{dashboard?.city || 'San Francisco'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Postcode / ZIP</span><span className="text-slate-700">{dashboard?.postal_code || '94103'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Phone</span><span className="text-slate-700">{dashboard?.phone || '+1 (555) 000-0000'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Email</span><span className="font-bold text-slate-900">{dashboard?.email || email || 'alex@contentaihub.net'}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ACCOUNT DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="space-y-0.5 pb-4 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Account Details
                    </h2>
                    <p className="text-xs text-slate-500">Update your profile information and display preferences.</p>
                  </div>

                  <form onSubmit={handleSaveDetails} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          First Name <span className="text-[#00B67A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Last Name <span className="text-[#00B67A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={email}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>

                    {savedFeedback && (
                      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />
                        <span>Account details saved successfully!</span>
                      </div>
                    )}
                    {profileError && (
                      <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                        {profileError}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* TAB 4: CHANGE PASSWORD */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div className="space-y-0.5 pb-4 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Security &amp; Password
                    </h2>
                    <p className="text-xs text-slate-500">Ensure your learning account is secured with a strong password.</p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Current Password <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        New Password <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Confirm New Password <span className="text-[#00B67A]">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#00B67A] focus:ring-1 focus:ring-[#00B67A] transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full bg-[#00B67A] hover:bg-[#00A36D] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer"
                      >
                        Update Password
                      </button>
                    </div>

                    {passwordFeedback && (
                      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />
                        <span>Security credentials updated successfully!</span>
                      </div>
                    )}
                    {passwordError && (
                      <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                        {passwordError}
                      </div>
                    )}
                  </form>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
};

const AdminAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout, changePassword, apiFetch } = useAuth();
  const [tab, setTab] = useState<'profile' | 'classes'>(() => new URLSearchParams(location.search).get('tab') === 'classes' ? 'classes' : 'profile');
  const [classes, setClasses] = useState<AdminLiveClass[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [form, setForm] = useState<ClassForm>(emptyClassForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [classError, setClassError] = useState('');
  const [classMessage, setClassMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const request = async (url: string, options: RequestInit = {}) => {
    const response = await apiFetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers },
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.message || 'Request could not be completed.');
    return payload.data;
  };

  useEffect(() => {
    setTab(new URLSearchParams(location.search).get('tab') === 'classes' ? 'classes' : 'profile');
  }, [location.search]);

  const loadClasses = async () => {
    setLoadingClasses(true);
    setClassError('');
    try { setClasses(await request(API_ENDPOINTS.classes)); }
    catch (error) { setClassError(error instanceof Error ? error.message : 'Unable to load live classes.'); }
    finally { setLoadingClasses(false); }
  };

  useEffect(() => { if (tab === 'classes') void loadClasses(); }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateForm = <K extends keyof ClassForm>(key: K, value: ClassForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const togglePlan = (planId: number) => updateForm(
    'plan_ids',
    form.plan_ids.includes(planId) ? form.plan_ids.filter((id) => id !== planId) : [...form.plan_ids, planId],
  );
  const resetForm = () => { setForm(emptyClassForm()); setEditingId(null); setClassError(''); };

  const saveClass = async (event: React.FormEvent) => {
    event.preventDefault();
    setClassError(''); setClassMessage('');
    if (!form.plan_ids.length) { setClassError('Enter at least one eligible plan ID.'); return; }
    try {
      const { recorded_class_link, ...fields } = form;
      const payload = { ...fields, class_date: new Date(form.class_date).toISOString(), end_date: new Date(form.end_date).toISOString(), ...(recorded_class_link ? { recorded_class_link } : {}) };
      await request(editingId ? `${API_ENDPOINTS.classes}/${editingId}` : API_ENDPOINTS.classes, {
        method: editingId ? 'PUT' : 'POST', body: JSON.stringify(payload),
      });
      setClassMessage(editingId ? 'Live class updated.' : 'Live class created.');
      resetForm();
      await loadClasses();
    } catch (error) { setClassError(error instanceof Error ? error.message : 'Unable to save the live class.'); }
  };

  const editClass = (item: AdminLiveClass) => {
    setEditingId(item.id);
    setForm({ ...item, class_date: item.class_date.slice(0, 16), end_date: item.end_date.slice(0, 10), recorded_class_link: item.recorded_class_link || '' });
    setClassMessage(''); setClassError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteClass = async (id: number) => {
    if (!window.confirm('Delete this live class? This cannot be undone.')) return;
    setClassError('');
    try { await request(`${API_ENDPOINTS.classes}/${id}`, { method: 'DELETE' }); setClassMessage('Live class deleted.'); await loadClasses(); }
    catch (error) { setClassError(error instanceof Error ? error.message : 'Unable to delete the live class.'); }
  };

  const submitPassword = async (event: React.FormEvent) => {
    event.preventDefault(); setPasswordError(''); setPasswordMessage('');
    if (!newPassword || newPassword !== confirmPassword) { setPasswordError('Your new passwords do not match.'); return; }
    try { await changePassword(currentPassword, newPassword); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setPasswordMessage('Password updated successfully.'); }
    catch (error) { setPasswordError(error instanceof Error ? error.message : 'Unable to update password.'); }
  };

  return <PublicLayout><div className="min-h-screen pt-36 sm:pt-40 pb-24 px-4 sm:px-6 text-slate-900"><div className="max-w-6xl mx-auto space-y-6">
    <div className="rounded-[32px] bg-gradient-to-br from-slate-950 to-emerald-950 p-7 sm:p-8 text-white flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
      <div><p className="text-emerald-300 text-xs font-black uppercase tracking-wider">Administrator</p><h1 className="text-2xl font-black mt-1">{user?.name}</h1><p className="text-sm text-slate-300 mt-1">Manage your profile and live classes.</p></div>
      <button onClick={() => { logout(); navigate('/login/'); }} className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold">Log Out</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <aside className="md:col-span-3 rounded-3xl bg-white border border-slate-200 p-3 space-y-1">
        <button onClick={() => setTab('profile')} className={`w-full flex gap-3 items-center text-left px-4 py-3 rounded-2xl text-xs font-bold ${tab === 'profile' ? 'bg-[#00B67A] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Lock className="w-4 h-4" />Profile</button>
        <button onClick={() => setTab('classes')} className={`w-full flex gap-3 items-center text-left px-4 py-3 rounded-2xl text-xs font-bold ${tab === 'classes' ? 'bg-[#00B67A] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Radio className="w-4 h-4" />Live Classes</button>
      </aside>
      <main className="md:col-span-9 rounded-[32px] bg-white border border-slate-200 p-6 sm:p-8">
        {tab === 'profile' && <div className="max-w-xl space-y-6"><div className="border-b pb-4"><h2 className="text-2xl font-black">Change Password</h2><p className="text-xs text-slate-500 mt-1">Update the password for this administrator account.</p></div><form onSubmit={submitPassword} className="space-y-4">
          <label className="block text-xs font-bold text-slate-700">Current Password<input required type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-300" /></label>
          <label className="block text-xs font-bold text-slate-700">New Password<input required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-300" /></label>
          <label className="block text-xs font-bold text-slate-700">Confirm New Password<input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-300" /></label>
          <button className="px-6 py-3 rounded-full bg-[#00B67A] text-white text-xs font-black">Update Password</button>{passwordError && <p className="text-xs text-rose-600">{passwordError}</p>}{passwordMessage && <p className="text-xs text-emerald-600">{passwordMessage}</p>}
        </form></div>}
        {tab === 'classes' && <div className="space-y-8"><div className="flex items-center justify-between border-b pb-4"><div><h2 className="text-2xl font-black">Live Classes</h2><p className="text-xs text-slate-500 mt-1">Create, edit, or delete scheduled live classes.</p></div><button onClick={resetForm} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold"><Plus className="w-4 h-4" />New Class</button></div>
          <form onSubmit={saveClass} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"><h3 className="sm:col-span-2 font-black text-sm">{editingId ? 'Edit Live Class' : 'Create Live Class'}</h3>
            <label className="text-xs font-bold">Class name<input required placeholder="e.g. YouTube Growth Workshop" value={form.name} onChange={(e) => updateForm('name', e.target.value)} className="mt-1 w-full p-3 rounded-xl border" /></label><label className="text-xs font-bold">Live meeting URL<input required type="url" placeholder="https://zoom.us/j/123456789" value={form.url} onChange={(e) => updateForm('url', e.target.value)} className="mt-1 w-full p-3 rounded-xl border" /></label>
            <label className="text-xs font-bold">Start date & time<input required type="datetime-local" placeholder="Select start date and time" title="Select start date and time" value={form.class_date} onChange={(e) => updateForm('class_date', e.target.value)} className="mt-1 w-full p-3 rounded-xl border" /></label><label className="text-xs font-bold">End date & time<input required type="datetime-local" placeholder="Select end date and time" title="Select end date and time" value={form.end_date && form.end_time ? `${form.end_date}T${form.end_time}` : ''} onChange={(e) => { const [endDate, endTime] = e.target.value.split('T'); updateForm('end_date', endDate); updateForm('end_time', endTime || ''); }} className="mt-1 w-full p-3 rounded-xl border" /></label>
            <div className="text-xs font-bold"><div className="flex flex-wrap gap-4 pt-2">{[{ id: 1, name: 'Basic' }, { id: 3, name: 'Classic' }, { id: 2, name: 'Premium' }].map((plan) => <label key={plan.id} className="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.plan_ids.includes(plan.id)} onChange={() => togglePlan(plan.id)} className="w-4 h-4 accent-[#00B67A]" />{plan.name}</label>)}</div></div>
            <label className="sm:col-span-2 flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={form.is_active} onChange={(e) => updateForm('is_active', e.target.checked)} />Active and visible to members</label><div className="sm:col-span-2 flex gap-3"><button className="px-6 py-3 rounded-full bg-[#00B67A] text-white text-xs font-black">{editingId ? 'Save Changes' : 'Create Class'}</button>{editingId && <button type="button" onClick={resetForm} className="px-5 py-3 text-xs font-bold">Cancel</button>}</div>
          </form>{classError && <p className="text-xs text-rose-600">{classError}</p>}{classMessage && <p className="text-xs text-emerald-600">{classMessage}</p>}
          {loadingClasses ? <div className="text-xs text-slate-500">Loading classes…</div> : <div className="space-y-3">{classes.map((item) => <div key={item.id} className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between"><div><p className="font-black text-sm">{item.name}</p><p className="text-xs text-slate-500 mt-1">{new Date(item.class_date).toLocaleString()}</p><p className={`text-[11px] font-bold mt-1 ${item.is_active ? 'text-emerald-600' : 'text-slate-500'}`}>{item.is_active ? 'Active' : 'Inactive'}</p></div><div className="flex gap-2"><button onClick={() => editClass(item)} className="p-2 text-emerald-700" aria-label="Edit class"><Pencil className="w-4 h-4" /></button><button onClick={() => deleteClass(item.id)} className="p-2 text-rose-600" aria-label="Delete class"><Trash2 className="w-4 h-4" /></button></div></div>)}{!classes.length && <p className="text-xs text-slate-500">No live classes have been created.</p>}</div>}
        </div>}
      </main>
    </div>
  </div></div></PublicLayout>;
};
