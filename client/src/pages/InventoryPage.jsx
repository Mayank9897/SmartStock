import React, { useState } from 'react';
import { formatINR } from '../utils/formatCurrency.js';

export default function InventoryPage() {
  const [warehouse, setWarehouse] = useState('All');

  const inventoryStock = [
    { sku: 'TECH-9941', name: 'Logitech MX Master 3S', cat: 'Electronics', total: 42, mumbai: 30, bengaluru: 12, reorder: 15, status: 'Healthy' },
    { sku: 'SKU-EL-8821', name: 'Anker Prime 20,000mAh Power Bank', cat: 'Electronics', total: 118, mumbai: 90, bengaluru: 28, reorder: 25, status: 'Healthy' },
    { sku: 'SKU-CH-409', name: 'Ergonomic Mesh Task Chair', cat: 'Office Hardware', total: 3, mumbai: 2, bengaluru: 1, reorder: 15, status: 'Low Stock' },
    { sku: 'SKU-SC-088', name: 'Wireless Laser Barcode Scanner', cat: 'POS Hardware', total: 0, mumbai: 0, bengaluru: 0, reorder: 10, status: 'Out of Stock' },
    { sku: 'SKU-PP-912', name: 'Thermal Receipt Paper 50pk', cat: 'Packaging', total: 4, mumbai: 3, bengaluru: 1, reorder: 25, status: 'Low Stock' },
    { sku: 'HUB-USBC-8P', name: 'CalDigit 8-in-1 Multiport Hub', cat: 'Electronics', total: 64, mumbai: 44, bengaluru: 20, reorder: 20, status: 'Healthy' },
    { sku: 'PKG-BX-1212', name: 'Kraft Mailer Boxes 12x12x4 (50pk)', cat: 'Packaging', total: 1450, mumbai: 950, bengaluru: 500, reorder: 300, status: 'Healthy' },
  ];

  return (
    <div className="flex flex-col w-full gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <span className="font-caption uppercase text-primary font-bold tracking-wider">Multi-Warehouse Allocation</span>
          <h1 className="font-headline-lg font-bold text-on-surface mt-1">Inventory Stock Control</h1>
          <p className="font-body-sm text-secondary">Monitor regional bin allocation, threshold triggers, and inbound replenishment.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="bg-surface-bright rounded-lg px-3 py-2 text-on-surface border border-outline-variant/30 font-label-sm"
          >
            <option value="All">All Hubs (Mumbai, Bengaluru)</option>
            <option value="Mumbai">Mumbai Hub</option>
            <option value="Bengaluru">Bengaluru Depot</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-base bg-surface-container-low border-b border-surface-container-low flex justify-between items-center">
          <h3 className="font-headline-sm font-bold text-on-surface">Warehouse Stock Breakdown</h3>
          <span className="font-caption font-data-mono text-secondary">7 Verified Product Lines</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-caption uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">SKU</th>
                <th className="py-2.5 px-4 font-semibold">Product Name</th>
                <th className="py-2.5 px-4 font-semibold">Category</th>
                <th className="py-2.5 px-4 font-semibold text-center">Total Stock</th>
                <th className="py-2.5 px-4 font-semibold text-center">Mumbai Hub</th>
                <th className="py-2.5 px-4 font-semibold text-center">Bengaluru Depot</th>
                <th className="py-2.5 px-4 font-semibold text-center">Reorder Level</th>
                <th className="py-2.5 px-4 font-semibold">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm text-on-surface">
              {inventoryStock.map((row) => (
                <tr key={row.sku} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-4 font-data-mono font-semibold text-primary">{row.sku}</td>
                  <td className="py-3 px-4 font-medium">{row.name}</td>
                  <td className="py-3 px-4 text-secondary">{row.cat}</td>
                  <td className="py-3 px-4 text-center font-data-mono font-bold">{row.total}</td>
                  <td className="py-3 px-4 text-center font-data-mono text-secondary">{row.mumbai}</td>
                  <td className="py-3 px-4 text-center font-data-mono text-secondary">{row.bengaluru}</td>
                  <td className="py-3 px-4 text-center font-data-mono text-secondary">{row.reorder}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-caption font-semibold ${
                      row.status === 'Healthy'
                        ? 'bg-primary/10 text-primary'
                        : row.status === 'Low Stock'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
