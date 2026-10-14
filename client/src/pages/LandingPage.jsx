import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.jpg';

export default function LandingPage() {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Sticky Enterprise Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link to="/" className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[20px]">inventory_2</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                SmartStock
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-space-lg ml-space-md">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#features">
                Features
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#how-it-works">
                How It Works
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#benefits">
                Benefits
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-space-base">
            <Link
              to="/login"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-space-xs transition-colors"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-9 px-space-base rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 flex-1">
        {/* SECTION 1: HERO */}
        <section 
          className="relative w-full px-margin-mobile md:px-margin-desktop py-space-2xl overflow-hidden bg-surface"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          {/* Subtle architectural overlay for contrast & readability */}
          <div className="absolute inset-0 bg-surface/75 backdrop-blur-[2px] pointer-events-none"></div>
          <div className="absolute -top-32 right-10 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
            {/* Left Column: Value Prop & CTAs */}
            <div className="lg:col-span-5 flex flex-col items-start gap-space-lg">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shadow-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span>B2B Multi-Store Operations Engine</span>
              </div>
              <div className="space-y-space-sm">
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-tight">
                  Take Control of Your Inventory.{' '}
                  <span className="text-primary-container">Grow Your Business.</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Manage products, track sales, monitor stock levels and understand your business performance — all from one simple dashboard.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-space-xs px-space-lg h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all duration-150 transform active:scale-95"
                >
                  <span>Get Started</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-space-lg h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-all"
                >
                  Explore Features
                </a>
              </div>
              {/* Metric strip beneath CTAs */}
              <div className="pt-space-md grid grid-cols-3 gap-space-md w-full border-t border-surface-container-high/60">
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface font-semibold">99.8%</div>
                  <div className="font-caption text-caption text-secondary uppercase tracking-wider">Audit Accuracy</div>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface font-semibold">4.2x</div>
                  <div className="font-caption text-caption text-secondary uppercase tracking-wider">Order Velocity</div>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-on-surface font-semibold">₹18.4 Cr</div>
                  <div className="font-caption text-caption text-secondary uppercase tracking-wider">Processed/Mo</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Enterprise Dashboard UI Mockup */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-xl bg-surface-container-lowest shadow-xl p-space-md transition-all border border-outline-variant/30">
                {/* Window Header / Status Bar */}
                <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-error/70"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                    </div>
                    <span className="text-caption font-caption text-on-surface-variant font-medium ml-space-xs">
                      SmartStock Operational Console • Mumbai Regional Hub
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-primary-container/10 text-primary-container font-caption text-caption">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Live Sync
                  </div>
                </div>

                {/* Top Metric KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md">
                  {/* KPI 1 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Gross Revenue</span>
                      <span className="material-symbols-outlined text-secondary text-[16px]">payments</span>
                    </div>
                    <div className="my-space-xs">
                      <div className="font-headline-md text-headline-md text-on-surface font-bold">₹1,25,480</div>
                      <div className="flex items-center gap-1 font-caption text-caption text-primary">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        <span>+14.8% vs last week</span>
                      </div>
                    </div>
                  </div>
                  {/* KPI 2 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Active Stock Units</span>
                      <span className="material-symbols-outlined text-secondary text-[16px]">inventory_2</span>
                    </div>
                    <div className="my-space-xs">
                      <div className="font-headline-md text-headline-md text-on-surface font-bold">14,892</div>
                      <div className="flex items-center gap-1 font-caption text-caption text-secondary">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        <span>884 Unique SKUs</span>
                      </div>
                    </div>
                  </div>
                  {/* KPI 3 */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Reorder Triggers</span>
                      <span className="material-symbols-outlined text-tertiary text-[16px]">notification_important</span>
                    </div>
                    <div className="my-space-xs">
                      <div className="font-headline-md text-headline-md text-tertiary font-bold">03 Alerts</div>
                      <div className="flex items-center gap-1 font-caption text-caption text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        <span>Requires restocking</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mid Section: Trend Line Mini-Visual & Stock Status */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm mb-space-md">
                  <div className="sm:col-span-8 p-space-sm rounded-lg bg-surface-container-low flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">Sales Velocity (Last 7 Days)</span>
                      <span className="font-caption text-caption text-secondary">Peak: ₹34,200</span>
                    </div>
                    {/* Inline SVG Sparkline */}
                    <div className="h-24 w-full flex items-end">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 80">
                        <defs>
                          <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"></stop>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
                          </linearGradient>
                        </defs>
                        <path d="M0,60 Q40,40 80,48 T160,28 T240,34 T320,12 L320,80 L0,80 Z" fill="url(#chartGlow)"></path>
                        <path d="M0,60 Q40,40 80,48 T160,28 T240,34 T320,12" fill="none" stroke="#10b981" strokeLinecap="round" strokeWidth="2.5"></path>
                        <circle className="fill-primary-container" cx="320" cy="12" r="3.5"></circle>
                      </svg>
                    </div>
                    <div className="flex justify-between font-caption text-caption text-secondary pt-1">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                  {/* Fulfillment health gauge mini panel */}
                  <div className="sm:col-span-4 p-space-sm rounded-lg bg-surface-container-low flex flex-col justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Fulfillment Ratio</span>
                    <div className="flex items-center justify-center my-space-xs">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                          <path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                        </svg>
                        <span className="absolute font-label-md text-label-md font-bold text-on-surface">94%</span>
                      </div>
                    </div>
                    <span className="font-caption text-caption text-center text-on-surface-variant">On-time Dispatches</span>
                  </div>
                </div>

                {/* Mini Transactional Data Ledger */}
                <div className="rounded-lg overflow-hidden bg-surface-container-low">
                  <div className="px-space-sm py-space-xs bg-surface-container flex items-center justify-between">
                    <span className="font-caption text-caption uppercase tracking-wider text-secondary font-semibold">Recent Ledger Entries</span>
                    <Link to="/login" className="font-caption text-caption text-primary hover:underline">View All</Link>
                  </div>
                  <div className="divide-y divide-surface-container">
                    <div className="px-space-sm py-2 flex items-center justify-between text-body-sm hover:bg-surface-container-lowest transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center text-on-surface font-caption font-semibold">#89</div>
                        <div className="truncate">
                          <p className="font-label-sm text-label-sm text-on-surface truncate">Stainless Steel Valve 2" (SKU-V44)</p>
                          <p className="font-caption text-caption text-secondary">24 mins ago • Direct POS</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-space-sm">
                        <span className="font-data-mono text-data-mono text-on-surface font-semibold">₹18,450</span>
                        <span className="block px-2 py-0.2 rounded-full bg-primary-container/15 text-primary text-[10px] font-medium text-center">Paid</span>
                      </div>
                    </div>
                    <div className="px-space-sm py-2 flex items-center justify-between text-body-sm hover:bg-surface-container-lowest transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center text-on-surface font-caption font-semibold">#88</div>
                        <div className="truncate">
                          <p className="font-label-sm text-label-sm text-on-surface truncate">Industrial Lubricant 5L (SKU-L02)</p>
                          <p className="font-caption text-caption text-secondary">1 hr ago • B2B Invoice</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-space-sm">
                        <span className="font-data-mono text-data-mono text-on-surface font-semibold">₹9,800</span>
                        <span className="block px-2 py-0.2 rounded-full bg-tertiary-fixed text-on-tertiary-container text-[10px] font-medium text-center">Low Stock: 4 units</span>
                      </div>
                    </div>
                    <div className="px-space-sm py-2 flex items-center justify-between text-body-sm hover:bg-surface-container-lowest transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center text-on-surface font-caption font-semibold">#87</div>
                        <div className="truncate">
                          <p className="font-label-sm text-label-sm text-on-surface truncate">Brass Compression Fitting (SKU-B11)</p>
                          <p className="font-caption text-caption text-secondary">2 hrs ago • Batch Order</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-space-sm">
                        <span className="font-data-mono text-data-mono text-on-surface font-semibold">₹34,120</span>
                        <span className="block px-2 py-0.2 rounded-full bg-primary-container/15 text-primary text-[10px] font-medium text-center">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURES */}
        <section className="w-full px-margin-mobile md:px-margin-desktop py-space-2xl bg-surface-container-low" id="features">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-base">
              <div className="max-w-xl">
                <div className="font-caption text-caption text-primary uppercase tracking-wider font-semibold mb-space-xs">
                  Engineered For Performance
                </div>
                <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                  Everything your business needs to stay ahead
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Eliminate manual errors and stockouts. SmartStock couples high-density ledger reliability with automated dispatch controls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-base">
              {/* Card 1 */}
              <div className="group p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">shelves</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Inventory Management</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Know exactly what is in stock and keep your product records organized across every warehouse and retail rack.
                  </p>
                </div>
                <div className="pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
                  <span>Explore catalog tools</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Sales Tracking</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Record sales and automatically update inventory quantities instantaneously with zero desynchronization risk.
                  </p>
                </div>
                <div className="pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
                  <span>Review invoice workflows</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Low-Stock Alerts</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Identify products that need restocking before they run out with smart threshold alarms and automated PO generation.
                  </p>
                </div>
                <div className="pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
                  <span>See automated triggers</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">query_stats</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Business Analytics</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Understand revenue trends and discover your best-selling products through actionable margin and turnover analytics.
                  </p>
                </div>
                <div className="pt-space-md flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
                  <span>Analyze profit yields</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section className="w-full px-margin-mobile md:px-margin-desktop py-space-2xl bg-surface" id="how-it-works">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
            <div className="text-center max-w-2xl mx-auto space-y-space-xs">
              <span className="font-caption text-caption text-primary uppercase tracking-wider font-semibold">Standard Operating Architecture</span>
              <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">Streamlined deployment in three steps</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                No complex multi-week implementations. Connect your catalog, start issuing bills, and maintain clean audited ledgers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
              <div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
                <div>
                  <div className="flex items-center justify-between mb-space-lg">
                    <span className="font-data-mono text-2xl font-bold text-primary-container">01</span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">post_add</span>
                    </div>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Add your products.</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Set up catalog details, barcodes, and minimum stock alerts in minutes. Bulk import Excel/CSV sheets with one click.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm border-t border-surface-container font-caption text-caption text-secondary">
                  Compatible with EAN-13, UPC, and custom internal SKUs
                </div>
              </div>

              <div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
                <div>
                  <div className="flex items-center justify-between mb-space-lg">
                    <span className="font-data-mono text-2xl font-bold text-primary-container">02</span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    </div>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Record your sales.</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Log point-of-sale transactions or invoices with instant inventory reduction and automatic GST calculation.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm border-t border-surface-container font-caption text-caption text-secondary">
                  Instant GST invoice generation & WhatsApp PDF receipts
                </div>
              </div>

              <div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
                <div>
                  <div className="flex items-center justify-between mb-space-lg">
                    <span className="font-data-mono text-2xl font-bold text-primary-container">03</span>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">monitoring</span>
                    </div>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Monitor inventory and revenue.</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Track live profitability, low-stock notifications, and real-time ledger health on any device without latency.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm border-t border-surface-container font-caption text-caption text-secondary">
                  Export ready audit trails for Tally and Zoho Books
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FINAL CTA BANNER */}
        <section className="w-full px-margin-mobile md:px-margin-desktop py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-2xl bg-surface-container-lowest shadow-lg p-space-xl md:p-space-2xl text-center overflow-hidden border border-outline-variant/30">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-surface-container-high/60 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-space-base">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                </div>
                <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                  Ready to simplify your inventory?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Join growing businesses managing operations effortlessly with SmartStock.
                </p>
                <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-center gap-space-sm">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-space-xs w-full sm:w-auto px-space-xl h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all transform active:scale-95"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <span className="font-caption text-caption text-secondary">
                    Demo account ready • Single click instant sign-in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <footer className="w-full bg-surface-container-low py-space-xl border-t border-surface-container-high/80">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start gap-space-xl pb-space-lg border-b border-surface-container-high/50">
            <div className="max-w-sm">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">inventory_2</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">SmartStock</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                The modern operational inventory and sales tracking platform built for high-growth enterprises and Indian SMB operators.
              </p>
            </div>
            <div className="flex flex-wrap gap-space-2xl">
              <div className="flex flex-col gap-space-sm">
                <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Platform</span>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#features">Features</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#how-it-works">How It Works</a>
              </div>
              <div className="flex flex-col gap-space-sm">
                <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Account</span>
                <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/login">Sign In</Link>
                <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/login">Demo Sandbox</Link>
              </div>
              <div className="flex flex-col gap-space-sm">
                <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">Compliance</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">GST Compliant</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">ISO 27001 Certified</span>
              </div>
            </div>
          </div>

          <div className="pt-space-md flex flex-col sm:flex-row justify-between items-center text-caption font-caption text-secondary gap-2">
            <div>© 2025 SmartStock Technologies. All rights reserved.</div>
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
              <span>Operational in India • Mumbai Hub Live</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

