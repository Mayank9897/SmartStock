import React, { useState } from 'react';
import { formatINR } from '../utils/formatCurrency.js';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: 'CUST-4029', name: 'Apex Innovations Pvt Ltd', contact: 'Rajesh Sharma', phone: '+91 98201 44821', city: 'Mumbai', tier: 'Business Gold', balance: 145000 },
    { id: 'CUST-3810', name: 'Meridian Retailers', contact: 'Anita Joshi', phone: '+91 98450 11920', city: 'Pune', tier: 'Enterprise Tier', balance: 48900 },
    { id: 'CUST-2901', name: 'Urban Artisan Roastery', contact: 'Vikram Mehta', phone: '+91 99100 88219', city: 'Delhi', tier: 'Standard', balance: 12400 },
    { id: 'CUST-1044', name: 'Dr. Marcus Vance Clinic', contact: 'Dr. Vance', phone: '+91 80234 55910', city: 'Bengaluru', tier: 'Standard', balance: 0 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCust, setNewCust] = useState({ name: '', contact: '', phone: '', city: 'Mumbai', tier: 'Standard' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCust.name) return;
    setCustomers([
      ...customers,
      {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: newCust.name,
        contact: newCust.contact,
        phone: newCust.phone,
        city: newCust.city,
        tier: newCust.tier,
        balance: 0,
      },
    ]);
    setIsModalOpen(false);
    setNewCust({ name: '', contact: '', phone: '', city: 'Mumbai', tier: 'Standard' });
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <span className="font-caption uppercase text-primary font-bold tracking-wider">Client Accounts</span>
          <h1 className="font-headline-lg font-bold text-on-surface mt-1">Customer Directory</h1>
          <p className="font-body-sm text-secondary">Manage customer loyalty tiers, credit limits, and purchase history.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-caption uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Account ID</th>
                <th className="py-2.5 px-4 font-semibold">Business Name</th>
                <th className="py-2.5 px-4 font-semibold">Primary Contact</th>
                <th className="py-2.5 px-4 font-semibold">Phone / City</th>
                <th className="py-2.5 px-4 font-semibold">Tier</th>
                <th className="py-2.5 px-4 font-semibold text-right">Credit Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm text-on-surface">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-4 font-data-mono font-semibold text-primary">{c.id}</td>
                  <td className="py-3 px-4 font-medium">{c.name}</td>
                  <td className="py-3 px-4 text-secondary">{c.contact}</td>
                  <td className="py-3 px-4 text-secondary">{c.phone} • {c.city}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full font-caption font-semibold bg-amber-100 text-amber-800">
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-data-mono font-semibold text-on-surface">
                    {formatINR(c.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-space-xl border border-outline-variant/30">
            <h3 className="font-headline-sm font-bold text-on-surface mb-4">Add New Customer</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block font-label-sm text-secondary mb-1">Company / Customer Name *</label>
                <input
                  required
                  placeholder="e.g. Tata Retail Logistics"
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block font-label-sm text-secondary mb-1">Contact Person</label>
                <input
                  placeholder="e.g. Suresh Nair"
                  value={newCust.contact}
                  onChange={(e) => setNewCust({ ...newCust, contact: e.target.value })}
                  className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Phone</label>
                  <input
                    placeholder="+91 98..."
                    value={newCust.phone}
                    onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-secondary mb-1">City</label>
                  <input
                    placeholder="Mumbai"
                    value={newCust.city}
                    onChange={(e) => setNewCust({ ...newCust, city: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-surface-container-low mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-lg py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
