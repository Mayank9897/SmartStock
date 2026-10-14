import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedHub, setSelectedHub] = useState('Main Warehouse — Mumbai Hub');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine current section from path
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('products')) return 'Products Directory';
    if (path.includes('inventory')) return 'Inventory Stock';
    if (path.includes('sales')) return 'Point of Sale (POS)';
    if (path.includes('customers')) return 'Customer Directory';
    if (path.includes('suppliers')) return 'Supplier Directory';
    if (path.includes('analytics')) return 'Analytics & Valuation';
    if (path.includes('settings')) return 'Settings';
    return 'Executive Overview';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/30 shadow-[0_1px_4px_rgba(0,0,0,0.02)] z-30 flex items-center justify-between px-space-base lg:px-space-lg">
      {/* Left: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center gap-space-sm">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface transition-colors"
          aria-label="Open navigation menu"
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
          <span className="hover:text-on-surface transition-colors">Operations</span>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold">{getBreadcrumb()}</span>
        </nav>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-space-sm sm:mx-space-lg">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <span className="material-symbols-outlined text-[18px] text-secondary absolute left-space-md pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-surface-bright border border-outline-variant/40 rounded-lg pl-9 pr-14 py-space-xs font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary"
            placeholder="Search products, SKU, orders..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="hidden sm:block absolute right-space-sm px-1.5 py-0.5 font-caption text-caption text-secondary bg-surface-container-highest/60 rounded border border-outline-variant/30 font-data-mono">
            ⌘K
          </kbd>
        </form>
      </div>

      {/* Right Controls: Warehouse Hub, Quick Action, Alerts, User Profile */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        {/* Hub Selector (hidden on small mobile) */}
        <div className="relative hidden md:block">
          <button 
            className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg border border-outline-variant/40 bg-surface-bright text-on-surface hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">storefront</span>
            <span className="font-label-sm text-label-sm max-w-[150px] truncate">{selectedHub}</span>
            <span className="material-symbols-outlined text-[16px] text-secondary">arrow_drop_down</span>
          </button>
        </div>

        {/* Quick Action Button: New Sale */}
        <button
          onClick={() => navigate('/sales')}
          className="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm px-space-md py-1.5 rounded-lg transition-colors shadow-xs"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="hidden sm:inline">New Sale / POS</span>
        </button>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            aria-label="Notifications"
            className="p-space-xs rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface transition-colors relative"
            type="button"
            onClick={() => navigate('/products?filter=lowstock')}
            title="3 Low Stock Alerts"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold leading-none">
              3
            </span>
          </button>
        </div>

        <div className="hidden sm:block h-6 w-px bg-outline-variant/30"></div>

        {/* User Profile */}
        <div 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-space-sm pl-space-xs cursor-pointer hover:opacity-85 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">
              {user?.name || 'Sarah Jenkins'}
            </span>
            <span className="font-caption text-caption text-secondary leading-tight capitalize">
              {user?.role || 'Operations Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
