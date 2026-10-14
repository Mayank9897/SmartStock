import React, { useState } from 'react';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-101', name: 'Logitech India Distribution Pvt Ltd', contact: 'Sanjay Deshmukh', phone: '+91 22 6120 9000', email: 'supply@logitech.in', category: 'Peripherals', leadTime: '3 Days' },
    { id: 'SUP-102', name: 'Anker Innovations Electronics India', contact: 'Pooja Agarwal', phone: '+91 80 4410 8820', email: 'orders@anker.in', category: 'Batteries & Charging', leadTime: '2 Days' },
    { id: 'SUP-103', name: 'Godrej Office Seating Systems', contact: 'Mahesh Kulkarni', phone: '+91 22 2518 8000', email: 'b2b@godrej.com', category: 'Office Hardware', leadTime: '7 Days' },
    { id: 'SUP-104', name: 'Zebra Enterprise Solutions India', contact: 'Naveen Rao', phone: '+91 80 6710 4000', email: 'channel@zebra.com', category: 'POS Hardware', leadTime: '4 Days' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSup, setNewSup] = useState({ name: '', contact: '', phone: '', email: '', category: 'Electronics', leadTime: '3 Days' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSup.name) return;
    setSuppliers([
      ...suppliers,
      {
        id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
        name: newSup.name,
        contact: newSup.contact,
        phone: newSup.phone,
        email: newSup.email,
        category: newSup.category,
        leadTime: newSup.leadTime,
      },
    ]);
    setIsModalOpen(false);
    setNewSup({ name: '', contact: '', phone: '', email: '', category: 'Electronics', leadTime: '3 Days' });
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <span className="font-caption uppercase text-primary font-bold tracking-wider">Procurement Network</span>
          <h1 className="font-headline-lg font-bold text-on-surface mt-1">Vendor & Supplier Directory</h1>
          <p className="font-body-sm text-secondary">Maintain primary vendor records, lead times, and purchase order routing.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          <span>Add Supplier</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-caption uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Vendor Code</th>
                <th className="py-2.5 px-4 font-semibold">Supplier Name</th>
                <th className="py-2.5 px-4 font-semibold">Contact Person</th>
                <th className="py-2.5 px-4 font-semibold">Email & Phone</th>
                <th className="py-2.5 px-4 font-semibold">Primary Category</th>
                <th className="py-2.5 px-4 font-semibold text-center">Avg Lead Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm text-on-surface">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-4 font-data-mono font-semibold text-primary">{s.id}</td>
                  <td className="py-3 px-4 font-medium">{s.name}</td>
                  <td className="py-3 px-4 text-secondary">{s.contact}</td>
                  <td className="py-3 px-4 text-secondary">
                    <div>{s.email}</div>
                    <div className="font-caption">{s.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full font-caption font-semibold bg-surface-container text-on-surface">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-data-mono font-semibold text-primary">
                    {s.leadTime}
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
            <h3 className="font-headline-sm font-bold text-on-surface mb-4">Add New Supplier</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block font-label-sm text-secondary mb-1">Company Name *</label>
                <input
                  required
                  placeholder="e.g. Dell India Commercial"
                  value={newSup.name}
                  onChange={(e) => setNewSup({ ...newSup, name: e.target.value })}
                  className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block font-label-sm text-secondary mb-1">Representative Name</label>
                <input
                  placeholder="e.g. Rohit Verma"
                  value={newSup.contact}
                  onChange={(e) => setNewSup({ ...newSup, contact: e.target.value })}
                  className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Phone</label>
                  <input
                    placeholder="+91..."
                    value={newSup.phone}
                    onChange={(e) => setNewSup({ ...newSup, phone: e.target.value })}
                    className="w-full bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-secondary mb-1">Lead Time</label>
                  <input
                    placeholder="e.g. 3 Days"
                    value={newSup.leadTime}
                    onChange={(e) => setNewSup({ ...newSup, leadTime: e.target.value })}
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
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
