import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatINR } from '../utils/formatCurrency.js';
import { analyticsApi } from '../services/api.js';

// 12 Periods Bar + Line curve data matching Stitch visual density
const trajectoryData = [
  { period: 'Oct 01', cogs: 6000, revenue: 10000, margin: 40 },
  { period: 'Oct 04', cogs: 6500, revenue: 11000, margin: 41 },
  { period: 'Oct 07', cogs: 5000, revenue: 9500, margin: 47 },
  { period: 'Oct 10', cogs: 7000, revenue: 12500, margin: 44 },
  { period: 'Oct 13', cogs: 7500, revenue: 13000, margin: 42 },
  { period: 'Oct 16', cogs: 5500, revenue: 10500, margin: 48 },
  { period: 'Oct 19', cogs: 8000, revenue: 14000, margin: 43 },
  { period: 'Oct 22', cogs: 8500, revenue: 14500, margin: 41 },
  { period: 'Oct 25', cogs: 7000, revenue: 12000, margin: 42 },
  { period: 'Oct 28', cogs: 9000, revenue: 15200, margin: 41 },
  { period: 'Oct 30', cogs: 9500, revenue: 16000, margin: 41 },
  { period: 'Oct 31', cogs: 10000, revenue: 16500, margin: 39 },
];

// Category Donut data
const categoryShareData = [
  { name: 'Electronics', value: 119666, percent: 42, color: '#006c49' },
  { name: 'Office Furniture', value: 74079, percent: 26, color: '#10b981' },
  { name: 'Shipping & Packaging', value: 51285, percent: 18, color: '#515f74' },
  { name: 'Peripherals & Cables', value: 39890, percent: 14, color: '#b9c7e0' },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days (Oct 1 - Oct 31)');
  const [comparePrevious, setComparePrevious] = useState(true);
  const [facility, setFacility] = useState('All Facilities (Mumbai, Bengaluru, Delhi)');

  const [topProducts, setTopProducts] = useState([
    { rank: '01', name: 'Dell UltraSharp 32" 4K', sku: 'DEL-U3223QE', units: 142, revenue: 566580, margin: '32.4%' },
    { rank: '02', name: 'Ergonomic Task Chair High-Back', sku: 'HMA-CH-B', units: 48, revenue: 451200, margin: '38.1%' },
    { rank: '03', name: 'CalDigit TS4 Thunderbolt Dock', sku: 'CAL-TS4-US', units: 86, revenue: 343140, margin: '44.0%' },
    { rank: '04', name: 'Logitech MX Master 3S Combo', sku: 'LOG-MX3S-BND', units: 112, revenue: 246400, margin: '49.2%' },
    { rank: '05', name: 'Zebra Direct Thermal Label Barcode', sku: 'ZEB-ZD621-4', units: 31, revenue: 192200, margin: '27.5%' },
  ]);

  const [deadStock, setDeadStock] = useState([
    { name: 'Series 1 Mesh Stool (Plum)', loc: 'Delhi Bin #A-14', units: 28, capital: 123200, days: '142 d', action: 'Liquidate', actionColor: 'bg-tertiary/10 text-tertiary' },
    { name: 'Pneumatic Strapping Kit', loc: 'Mumbai Depot #C-08', units: 14, capital: 154000, days: '118 d', action: 'Reallocate WH', actionColor: 'bg-secondary-container text-on-secondary-container' },
    { name: 'USB-C Gen1 Dongle Legacy', loc: 'Bengaluru Mezzanine #M-02', units: 190, capital: 72200, days: '104 d', action: 'Run Promo 25%', actionColor: 'bg-surface-container text-secondary' },
    { name: 'Heavy Poly Bags 24x36', loc: 'Delhi Bulk Yard #B-21', units: 65, capital: 58500, days: '96 d', action: 'Reallocate WH', actionColor: 'bg-secondary-container text-on-secondary-container' },
    { name: 'Ergonomic Dual Monitor Arm', loc: 'Mumbai Primary #A-02', units: 12, capital: 40200, days: '92 d', action: 'Run Promo 15%', actionColor: 'bg-surface-container text-secondary' },
  ]);

  useEffect(() => {
    analyticsApi.getTopProducts()
      .then(res => {
        if (res && res.topProducts && res.topProducts.length > 0) {
          setTopProducts(res.topProducts);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-base pb-space-lg">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-secondary font-caption text-caption tracking-wider uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Executive Intelligence • Mumbai / Bengaluru / Delhi Hubs</span>
          </div>
          <div className="flex items-baseline gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Sales Trends & Stock Valuation
            </h1>
            <span className="font-caption text-caption text-secondary font-data-mono bg-surface-container px-space-xs py-0.5 rounded">
              Q3 REAL-TIME
            </span>
          </div>
        </div>

        {/* Filter & Action Strip */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="relative bg-surface-container-lowest rounded shadow-sm flex items-center px-space-sm py-1.5 gap-space-xs border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[18px]">calendar_today</span>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer pr-space-xs"
            >
              <option>Last 30 Days (Oct 1 - Oct 31)</option>
              <option>Quarter to Date (Q3)</option>
              <option>Year to Date (2025)</option>
            </select>
          </div>

          <label className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1.5 rounded shadow-sm cursor-pointer select-none border border-outline-variant/30">
            <input
              checked={comparePrevious}
              onChange={(e) => setComparePrevious(e.target.checked)}
              className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
              type="checkbox"
            />
            <span className="font-label-sm text-label-sm text-secondary">vs. Previous Period</span>
          </label>

          <div className="relative bg-surface-container-lowest rounded shadow-sm flex items-center px-space-sm py-1.5 gap-space-xs border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer"
            >
              <option>All Facilities (Mumbai, Bengaluru, Delhi)</option>
              <option>Mumbai Regional Hub (Primary)</option>
              <option>Bengaluru Depot</option>
              <option>Delhi Transit Facility</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded shadow-sm transition-colors border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary Metric KPI Cards (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Net Sales Volume</span>
            <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">payments</span>
            </span>
          </div>
          <div className="my-space-xs">
            <div className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
              {formatINR(2849200)}
            </div>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="flex items-center text-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +18.2%
              </span>
              <span className="font-caption text-caption text-secondary">vs. prior 30 days (₹24.1L)</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-2xs">
            <div className="bg-primary h-full w-[78%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Valuation (Asset Cost)</span>
            <span className="w-7 h-7 rounded-full bg-secondary-container/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="my-space-xs">
            <div className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
              {formatINR(4126500)}
            </div>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="font-caption text-caption text-secondary">Acquisition cost on hand</span>
              <span className="font-data-mono font-caption text-caption text-on-surface bg-surface-container px-1 rounded">12,480 units</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-2xs">
            <div className="bg-secondary h-full w-[64%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Valuation (MSRP Retail)</span>
            <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
            </span>
          </div>
          <div className="my-space-xs">
            <div className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
              {formatINR(7251800)}
            </div>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="text-primary font-label-sm text-label-sm font-semibold">+{formatINR(3125300)}</span>
              <span className="font-caption text-caption text-secondary">Unrealized Gross Margin (43.1%)</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-2xs">
            <div className="bg-primary-container h-full w-[88%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Turnover Velocity</span>
            <span className="px-space-xs py-0.5 rounded-full bg-primary/10 text-primary font-caption text-caption font-semibold">OPTIMAL</span>
          </div>
          <div className="my-space-xs">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold font-data-mono">6.4x</span>
              <span className="font-caption text-caption text-secondary">annualized</span>
            </div>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="text-primary font-label-sm font-medium">+1.2x</span>
              <span className="font-caption text-caption text-secondary">over industry norm (5.2x benchmark)</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-space-2xs">
            <div className="bg-primary h-full w-[92%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Visualizations Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-lg">
        
        {/* Chart 1: Revenue vs Cost Bar + Margin Line Curve */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Revenue, Cost & Margin Trajectory
              </h2>
              <p className="font-body-sm text-body-sm text-secondary">
                Daily gross bookings alongside real-time margin percentage curve
              </p>
            </div>
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
                <span className="font-caption text-caption text-secondary font-medium">Daily Revenue</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-sm bg-secondary-fixed-dim"></span>
                <span className="font-caption text-caption text-secondary font-medium">COGS</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-4 h-0.5 bg-tertiary"></span>
                <span className="font-caption text-caption text-secondary font-medium">Margin %</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-64 bg-surface-container-low/40 rounded p-space-sm flex flex-col justify-between border border-outline-variant/20">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#515f74' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#515f74' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 10, fill: '#a43a3a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(val, name) => [name === 'Margin %' ? `${val}%` : formatINR(val * 10), name]}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar yAxisId="left" dataKey="cogs" fill="#b9c7e0" radius={[2, 2, 0, 0]} name="COGS" barSize={12} />
                <Bar yAxisId="left" dataKey="revenue" fill="#006c49" radius={[2, 2, 0, 0]} name="Daily Revenue" barSize={12} />
                <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#a43a3a" strokeWidth={2.5} name="Margin %" dot={{ r: 3, fill: '#a43a3a' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-md border-t border-outline-variant/20 mt-space-sm">
            <div className="flex items-center gap-space-sm font-body-sm text-secondary">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span>Avg Gross Margin for Period: <strong className="text-on-surface font-semibold font-data-mono">41.8%</strong></span>
            </div>
            <div className="flex items-center gap-space-xs font-caption text-secondary">
              <span>Peak Daily Intake: </span>
              <span className="font-data-mono text-on-surface font-semibold">₹1,65,000 (Oct 31)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Sales by Category Donut */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded p-space-lg shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Sales by Category</h2>
              <span className="font-caption text-caption text-secondary font-data-mono">4 SECTORS</span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mb-space-md">Contribution share of gross billings</p>

            {/* Donut Chart */}
            <div className="flex items-center justify-center my-space-sm relative">
              <div className="w-44 h-44 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="font-caption text-caption uppercase text-secondary font-semibold">Total Revenue</span>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">₹28.4L</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Legend */}
          <div className="space-y-space-xs mt-space-sm border-t border-outline-variant/20 pt-space-xs">
            {categoryShareData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-space-xs rounded hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-data-mono font-semibold text-on-surface">{formatINR(item.value)}</span>
                  <span className="font-caption text-caption text-secondary ml-space-xs">({item.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Warehouse Health Callout Banner */}
      <div className="relative bg-surface-container-lowest rounded shadow-sm overflow-hidden mb-space-lg border border-outline-variant/30">
        <div className="p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="max-w-2xl">
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="font-caption text-caption uppercase text-primary font-bold tracking-wider">
                Automated Warehouse Health Check
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-primary/10 text-primary font-data-mono text-[11px] font-semibold">
                MUMBAI SYNC OK
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">
              Hub Distribution & Rebalancing Recommendations
            </h3>
            <p className="font-body-md text-body-md text-secondary">
              Mumbai central depot is running at <strong className="text-on-surface font-medium">91.4% bin utilization</strong> while Bengaluru has 34% free capacity. Reallocating slow-moving ergonomic seating units will recover ₹4,48,000 in active handling costs before Diwali peak intake.
            </p>
          </div>
          <button 
            onClick={() => alert('Initiating auto-rebalancing dispatch manifest...')}
            className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold transition-colors shadow-xs whitespace-nowrap"
            type="button"
          >
            Review Rebalance Manifest
          </button>
        </div>
      </div>

      {/* High-Value Operational Analysis (Two Split Tables) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md mb-space-lg">
        {/* Left: Top 5 Best-Selling Products */}
        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">leaderboard</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Top 5 Best-Sellers by Revenue</h3>
              </div>
              <span className="font-caption text-caption text-secondary font-medium">30-Day Contribution</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-secondary font-caption text-caption uppercase">
                    <th className="py-2 px-space-xs text-center w-8">#</th>
                    <th className="py-2 px-space-xs">Product Details</th>
                    <th className="py-2 px-space-xs text-right">Units</th>
                    <th className="py-2 px-space-xs text-right">Gross Rev</th>
                    <th className="py-2 px-space-xs text-right">Margin %</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/10">
                  {topProducts.map((p) => (
                    <tr key={p.rank} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-2.5 px-space-xs text-center font-data-mono font-bold text-primary">{p.rank}</td>
                      <td className="py-2.5 px-space-xs">
                        <div className="font-label-sm text-label-sm font-semibold truncate max-w-[190px]">{p.name}</div>
                        <div className="font-caption text-caption text-secondary font-data-mono">{p.sku}</div>
                      </td>
                      <td className="py-2.5 px-space-xs text-right font-data-mono">{p.units}</td>
                      <td className="py-2.5 px-space-xs text-right font-data-mono font-semibold">{formatINR(p.revenue)}</td>
                      <td className="py-2.5 px-space-xs text-right">
                        <span className="inline-block px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-caption text-caption font-semibold">
                          {p.margin}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-space-xs border-t border-outline-variant/20 flex items-center justify-between text-secondary font-caption text-caption mt-space-xs">
            <span>Combined share of volume: <strong className="text-on-surface font-semibold">63.2%</strong></span>
          </div>
        </div>

        {/* Right: Dead Stock & Capital Exposure */}
        <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div>
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[20px]">warning</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dead Stock & Capital Exposure</h3>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-semibold">
                ₹4.48L At Risk
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-secondary font-caption text-caption uppercase">
                    <th className="py-2 px-space-xs">Product</th>
                    <th className="py-2 px-space-xs text-right">Idle Units</th>
                    <th className="py-2 px-space-xs text-right">Tied Capital</th>
                    <th className="py-2 px-space-xs text-right">Days Idle</th>
                    <th className="py-2 px-space-xs text-center">Action Plan</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/10">
                  {deadStock.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-2.5 px-space-xs">
                        <div className="font-label-sm text-label-sm font-semibold truncate max-w-[160px]">{item.name}</div>
                        <div className="font-caption text-caption text-secondary">{item.loc}</div>
                      </td>
                      <td className="py-2.5 px-space-xs text-right font-data-mono">{item.units}</td>
                      <td className="py-2.5 px-space-xs text-right font-data-mono text-tertiary font-semibold">{formatINR(item.capital)}</td>
                      <td className="py-2.5 px-space-xs text-right font-data-mono text-tertiary font-bold">{item.days}</td>
                      <td className="py-2.5 px-space-xs text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-caption text-caption font-semibold ${item.actionColor}`}>
                          {item.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-space-xs border-t border-outline-variant/20 flex items-center justify-between text-secondary font-caption text-caption mt-space-xs">
            <span className="flex items-center gap-space-2xs text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> Recommended Clearance: Nov 15
            </span>
          </div>
        </div>

      </div>

      {/* Micro Audit Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-space-md py-space-sm bg-surface-container-lowest rounded shadow-sm text-secondary font-caption text-caption border border-outline-variant/30">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-space-2xs">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-on-surface font-medium">MongoDB Ledger: Reconciled</span>
          </span>
          <span>Calculated FIFO inventory cost valuation</span>
          <span className="font-data-mono">Latency: 42ms</span>
        </div>
        <div className="flex items-center gap-space-sm mt-space-2xs sm:mt-0 font-data-mono">
          <span>Checksum: 0x8F34_C119</span>
          <span>•</span>
          <span>Audited: Today, IST</span>
        </div>
      </div>

    </div>
  );
}
