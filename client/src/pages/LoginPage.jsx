import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@smartstock.in');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeState, setActiveState] = useState('normal');

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid business email address.');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password cannot be blank.');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Demo QA / Verification state pills from original Stitch design
  const applyState = (stateName) => {
    setActiveState(stateName);
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (stateName === 'normal') {
      setEmail('admin@smartstock.in');
      setPassword('Admin@123');
    } else if (stateName === 'invalid-email') {
      setEmail('invalid.email-format');
      setPassword('Admin@123');
      setEmailError('Please enter a valid business email address.');
    } else if (stateName === 'missing-password') {
      setEmail('admin@smartstock.in');
      setPassword('');
      setPasswordError('Password cannot be blank.');
    } else if (stateName === 'bad-auth') {
      setEmail('wrong.user@unknown.com');
      setPassword('WrongPassword456');
      setErrorMessage('The email or password you entered is incorrect. Please try again.');
    } else if (stateName === 'staff') {
      setEmail('staff@smartstock.in');
      setPassword('Staff@123');
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface">
      <div className="flex flex-col w-full items-center justify-center py-6 md:py-12">
        <div className="w-full max-w-5xl rounded-xl shadow-xl overflow-hidden bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-outline-variant/30">
          
          {/* Left Column: Authentication Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-surface-container-lowest">
            <div>
              {/* Brand Identity */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">
                    SmartStock
                  </span>
                  <span className="font-caption text-caption px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                    OPS v2.4
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-1 mb-6">
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Welcome back</h1>
                <p className="font-body-sm text-body-sm text-secondary">
                  Sign in to manage your inventory and sales operations.
                </p>
              </div>

              {/* Credential Alert Banner */}
              {errorMessage && (
                <div className="mb-5 p-3 rounded bg-error-container text-on-error-container flex items-start gap-2.5 transition-all">
                  <span className="material-symbols-outlined text-[18px] text-error flex-shrink-0 mt-0.5">error</span>
                  <div className="flex-1">
                    <p className="font-label-sm text-label-sm font-semibold">Authentication failed</p>
                    <p className="font-caption text-caption text-on-surface-variant">{errorMessage}</p>
                  </div>
                  <button 
                    className="text-on-surface-variant hover:text-on-surface" 
                    onClick={() => setErrorMessage('')} 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="email-input">
                    Work Email
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-10 px-3.5 pr-10 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline outline-none transition-shadow duration-150 focus:shadow-[0_0_0_2px_#10b981]"
                      id="email-input"
                      name="email"
                      placeholder="admin@smartstock.in"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[20px] pointer-events-none">
                      mail
                    </span>
                  </div>
                  {emailError && (
                    <p className="font-caption text-caption text-error flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="password-input">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-10 px-3.5 pr-11 rounded bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline outline-none transition-shadow duration-150 focus:shadow-[0_0_0_2px_#10b981]"
                      id="password-input"
                      name="password"
                      placeholder="Enter credentials"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-2.5 top-2 h-6 w-6 flex items-center justify-center text-outline hover:text-on-surface transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      title="Toggle password visibility"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {passwordError && (
                    <p className="font-caption text-caption text-error flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Utilities Row: Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Remember me for 30 days</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => alert('Demo Reset: Use admin@smartstock.in / Admin@123 or staff@smartstock.in / Staff@123')}
                    className="font-label-sm text-label-sm text-primary hover:text-on-primary-container font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Primary CTA Button */}
                <button
                  className="w-full h-10 mt-2 bg-primary-container hover:bg-surface-tint text-on-primary font-label-md text-label-md rounded flex items-center justify-center gap-2 transition duration-150 shadow-sm hover:shadow disabled:opacity-75"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Interactive QA / Demo Controls Switcher */}
              <div className="mt-8 pt-5 bg-surface-container-low p-3.5 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption uppercase text-secondary font-semibold tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">tune</span> Quick Fill Demo Accounts
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">One-Click Testing</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    className={`px-2.5 py-1 rounded-full font-caption text-caption font-medium transition ${
                      activeState === 'normal' ? 'bg-primary-container text-on-primary font-semibold' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                    onClick={() => applyState('normal')}
                    type="button"
                  >
                    Admin Account (admin@smartstock.in)
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded-full font-caption text-caption font-medium transition ${
                      activeState === 'staff' ? 'bg-primary-container text-on-primary font-semibold' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                    onClick={() => applyState('staff')}
                    type="button"
                  >
                    Staff Account (staff@smartstock.in)
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded-full font-caption text-caption font-medium transition ${
                      activeState === 'bad-auth' ? 'bg-primary-container text-on-primary font-semibold' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                    onClick={() => applyState('bad-auth')}
                    type="button"
                  >
                    Trigger Credential Alert
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-outline gap-2 border-t border-surface-container-high/40">
              <div className="flex items-center gap-1.5 font-caption text-caption">
                <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
                <span>Enterprise-grade AES 256-bit encryption</span>
              </div>
              <div className="font-caption text-caption">
                BCA Mini-Project • <span className="text-on-surface font-medium">Examiner Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Operational Telemetry & Live Mock Stream */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary-container opacity-40 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full bg-primary-fixed opacity-30 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-xs text-on-surface-variant font-caption text-caption">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                Mumbai Hub Active Sync
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight leading-snug font-bold">
                Real-time stock valuation and seamless point-of-sale synchronisation.
              </h2>
              <p className="font-body-sm text-body-sm text-secondary">
                Monitor multi-location fulfillment nodes, automate vendor requisitions, and audit retail transactions in real-time.
              </p>
            </div>

            {/* Telemetry Snapshots */}
            <div className="relative z-10 my-8 space-y-3.5">
              {/* Snapshot 1: MTD Sales */}
              <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm space-y-3 transition hover:shadow-md border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">sync_alt</span>
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Central Grid Sync</span>
                  </div>
                  <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-medium">
                    99.98% Latency
                  </span>
                </div>
                <div className="flex items-end justify-between pt-1">
                  <div>
                    <p className="font-caption text-caption text-secondary uppercase tracking-wider">Mumbai Hub MTD Sales</p>
                    <p className="font-headline-md text-headline-md font-bold text-on-surface">₹1,25,000</p>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-caption text-caption font-semibold">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +14.8% vs last week
                  </div>
                </div>
                <div className="w-full pt-1">
                  <svg className="w-full h-8 text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 200 32">
                    <path d="M0 26 L25 22 L55 24 L85 14 L115 17 L145 9 L175 12 L200 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    <path d="M0 26 L25 22 L55 24 L85 14 L115 17 L145 9 L175 12 L200 4 L200 32 L0 32 Z" fill="currentColor" fillOpacity="0.08"></path>
                  </svg>
                </div>
              </div>

              {/* Snapshot 2: Low-Stock Inventory Alerts */}
              <div className="bg-surface-container-lowest p-3.5 rounded-lg shadow-sm flex items-center justify-between transition hover:shadow-md border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm font-semibold text-on-surface">Critical Inventory Threshold</p>
                    <p className="font-caption text-caption text-secondary">SKUs #8832, #9104, #2140 pending PO</p>
                  </div>
                </div>
                <span className="font-caption text-caption px-2.5 py-1 rounded-full bg-tertiary-container/30 text-on-tertiary-container font-semibold whitespace-nowrap">
                  4 Low Stock
                </span>
              </div>

              {/* Snapshot 3: POS Stream */}
              <div className="bg-surface-container-lowest p-3.5 rounded-lg shadow-sm space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between font-caption text-caption text-secondary">
                  <span className="flex items-center gap-1 font-medium text-on-surface">
                    <span className="material-symbols-outlined text-[15px] text-primary">receipt_long</span>
                    Latest Cash Register Order
                  </span>
                  <span className="font-data-mono">14s ago</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface font-medium truncate max-w-[160px]">Barcode Scanner Pro #04</span>
                  <span className="font-data-mono font-semibold text-on-surface">₹4,890.00</span>
                </div>
                <div className="flex items-center gap-2 pt-1 font-caption text-caption text-outline">
                  <span>Terminal 03</span>
                  <span>•</span>
                  <span className="text-primary font-medium">Synced via MQTT</span>
                </div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="relative z-10 pt-3 border-t border-surface-container flex items-center justify-between text-secondary font-caption text-caption">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Cluster: ap-south-1 (Mumbai)
              </span>
              <span className="font-data-mono">Build 2025.04.1</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
