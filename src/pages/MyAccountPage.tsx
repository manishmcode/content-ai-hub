import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { 
  CreditCard, 
  FileText, 
  User, 
  Lock, 
  LogOut, 
  Mail, 
  CheckCircle2,
  Copy
} from 'lucide-react';
import { DashboardData, useAuth } from '../auth/AuthContext';

export const MyAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, getDashboard, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'subscriptions' | 'details' | 'password'>('payments');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

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
      });
    return () => { active = false; };
  }, [getDashboard]);

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

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#F4F8FC] text-slate-800 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Ambient Depth Glow */}
        <div className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[130px]" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">

          {/* Top User Executive Profile Card */}
          <div className="rounded-[32px] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_10px_35px_rgba(15,45,95,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0B57A2] via-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-blue-500/20">
                  {profileName.charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {profileName}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider">
                    {subscriptionStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0B57A2]" />
                    <span className="font-medium">{email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/library')}
                className="px-5 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#0B57A2] text-xs font-bold transition-all cursor-pointer"
              >
                Go to Library
              </button>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

          </div>

          {/* Main Grid: Modern Sidebar Tabs + Content Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Sidebar Navigation (4 Cols) */}
            <div className="md:col-span-4 rounded-3xl bg-white p-3 shadow-[0_8px_30px_rgba(15,45,95,0.04)] border border-slate-200/80 space-y-1.5">
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'payments'
                    ? 'bg-[#0B57A2] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Payments &amp; Invoices</span>
              </button>

              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'subscriptions'
                    ? 'bg-[#0B57A2] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>My Subscriptions</span>
              </button>

              <button
                onClick={() => setActiveTab('details')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#0B57A2] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Account Details</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'password'
                    ? 'bg-[#0B57A2] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Security &amp; Password</span>
              </button>
            </div>

            {/* Right Main Panel (8 Cols) */}
            <div className="md:col-span-8 rounded-3xl bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(15,45,95,0.04)] border border-slate-200/80">
              
              {/* TAB 1: PAYMENTS */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="space-y-0.5">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Payment History
                      </h2>
                      <p className="text-xs text-slate-500">Verified transaction receipts and monthly recurring charges.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      {dashboard?.payments.length || 0} Transactions
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
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
                          <td className="py-4 px-4 font-mono text-[11px] text-slate-700">
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
                                className="text-slate-400 hover:text-[#0B57A2] p-1 rounded transition"
                                title="Copy Reference ID"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {copiedRef && (
                              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                                Copied to clipboard!
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            {formatDate(payment.date)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-black text-slate-900 text-right text-sm">
                            {formatAmount(payment.price, primarySubscription?.currency)}
                          </td>
                        </tr>
                        ))}
                        {dashboard && dashboard.payments.length === 0 && (
                          <tr><td colSpan={4} className="py-8 px-4 text-center text-slate-500">No payment records found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: MY SUBSCRIPTIONS */}
              {activeTab === 'subscriptions' && (
                <div className="space-y-8">
                  <div className="space-y-0.5 pb-3 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      My Subscriptions
                    </h2>
                    <p className="text-xs text-slate-500">Plan details, renewal schedule, and billing information.</p>
                  </div>

                  {/* Status Box */}
                  <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden">
                    <div className="p-4 flex items-center justify-between bg-slate-50/50">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Membership Status</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black uppercase text-[10px] border border-emerald-200">
                        {primarySubscription?.status || '—'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Start Date</span>
                      <span className="font-semibold text-slate-800">{primarySubscription ? formatDate(primarySubscription.starts_at) : '—'}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">End / Renewal Date</span>
                      <span className="font-semibold text-slate-800">{primarySubscription ? formatDate(primarySubscription.ends_at) : '—'}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Payment Channel</span>
                      <span className="font-bold text-slate-900">{primarySubscription?.payment_status || '—'}</span>
                    </div>
                  </div>

                  {/* Subscription totals */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Subscription totals</h3>
                    <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden">
                      <div className="p-3.5 bg-slate-50 text-slate-500 font-bold uppercase flex justify-between tracking-wider text-[10px]">
                        <span>Product</span>
                        <span>Total</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-medium">
                        <span className="text-slate-800 font-semibold">{primarySubscription?.plan_name || '—'}</span>
                        <span className="font-bold text-slate-900">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '—'}</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-medium">
                        <span className="text-slate-500">SubTotal:</span>
                        <span className="font-bold text-slate-900">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '—'}</span>
                      </div>
                      <div className="p-3.5 flex justify-between font-black text-slate-900 text-sm bg-blue-50/40">
                        <span>Total Billed:</span>
                        <span className="text-[#0B57A2]">{primarySubscription ? formatAmount(primarySubscription.price, primarySubscription.currency) : '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Billing address */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Billing address</h3>
                    <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden">
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Address</span><span className="text-slate-700">{dashboard?.address || '—'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Country</span><span className="text-slate-700">{dashboard?.country || '—'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">City</span><span className="text-slate-700">{dashboard?.city || '—'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Postcode / ZIP</span><span className="text-slate-700">{dashboard?.postal_code || '—'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Phone</span><span className="text-slate-700">{dashboard?.phone || '—'}</span></div>
                      <div className="p-3.5 flex justify-between"><span className="text-slate-500 font-medium">Email</span><span className="font-bold text-slate-900">{dashboard?.email || email || '—'}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ACCOUNT DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="space-y-0.5 pb-3 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Account Details
                    </h2>
                    <p className="text-xs text-slate-500">Update your profile information and display preferences.</p>
                  </div>

                  <form onSubmit={handleSaveDetails} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                          First Name <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                          Last Name <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={email}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 text-sm cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-2xl bg-[#0B57A2] hover:bg-[#084582] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>

                    {savedFeedback && (
                      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
                  <div className="space-y-0.5 pb-3 border-b border-slate-100">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Security &amp; Password
                    </h2>
                    <p className="text-xs text-slate-500">Ensure your learning account is secured with a strong password.</p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                        Current Password <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                        New Password <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                        Confirm New Password <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-2xl bg-[#0B57A2] hover:bg-[#084582] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Update Password
                      </button>
                    </div>

                    {passwordFeedback && (
                      <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
