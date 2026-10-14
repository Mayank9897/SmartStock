import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-4xl">
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <span className="font-caption uppercase text-primary font-bold tracking-wider">System Preferences</span>
        <h1 className="font-headline-lg font-bold text-on-surface mt-1">Platform Settings</h1>
        <p className="font-body-sm text-secondary">Manage enterprise organization details, GST tax profile, and operational users.</p>
      </div>

      {/* Organization Details */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-4">
        <h3 className="font-headline-sm font-bold text-on-surface border-b border-surface-container-low pb-2">
          Organization Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-sm text-secondary mb-1">Company / Legal Entity</label>
            <input
              disabled
              value="SmartStock Technologies India Pvt Ltd"
              className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30"
            />
          </div>
          <div>
            <label className="block font-label-sm text-secondary mb-1">GSTIN Number</label>
            <input
              disabled
              value="27AABCS1429B1Z8 (Maharashtra)"
              className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 font-data-mono"
            />
          </div>
          <div>
            <label className="block font-label-sm text-secondary mb-1">Primary Operating Currency</label>
            <input
              disabled
              value="INR (₹) — Indian Rupee (en-IN)"
              className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 font-data-mono"
            />
          </div>
          <div>
            <label className="block font-label-sm text-secondary mb-1">Default POS Warehouse</label>
            <input
              disabled
              value="Mumbai Regional Hub (ap-south-1)"
              className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30"
            />
          </div>
        </div>
      </div>

      {/* Operator Session */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 space-y-4">
        <h3 className="font-headline-sm font-bold text-on-surface border-b border-surface-container-low pb-2">
          Active Operator Credentials
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <p className="font-headline-sm font-bold text-on-surface">{user?.name || 'Sarah Jenkins'}</p>
            <p className="font-body-sm text-secondary">{user?.email || 'admin@smartstock.in'}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full font-caption font-semibold bg-primary-fixed/40 text-on-primary-fixed-variant uppercase">
              Role: {user?.role || 'admin'}
            </span>
          </div>
        </div>
      </div>

      {/* College Viva Note */}
      <div className="bg-primary/5 p-space-md rounded-xl border border-primary/20 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">school</span>
        <div>
          <p className="font-label-md font-bold text-primary">Academic Viva Demonstration Note</p>
          <p className="font-body-sm text-secondary mt-0.5">
            This deployment is configured with pre-seeded demo records for BCA presentation. The currency formatting is driven by the browser’s native <code className="bg-surface-container px-1 py-0.5 rounded font-data-mono text-xs">Intl.NumberFormat('en-IN')</code> and currency is stored as an unformatted numeric float in MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
}

