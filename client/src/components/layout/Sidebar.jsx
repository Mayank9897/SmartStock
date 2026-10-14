import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
  { name: 'Products', path: '/products', icon: 'inventory_2' },
  { name: 'Inventory', path: '/inventory', icon: 'warehouse' },
  { name: 'Sales & POS', path: '/sales', icon: 'point_of_sale' },
  { name: 'Customers', path: '/customers', icon: 'groups' },
  { name: 'Suppliers', path: '/suppliers', icon: 'local_shipping' },
  { name: 'Analytics & Reports', path: '/analytics', icon: 'analytics' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between border-r border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo & Header */}
          <div className="h-16 px-space-base flex items-center justify-between border-b border-outline-variant/20">
            <NavLink to="/dashboard" className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[20px]">inventory_2</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
                SmartStock
              </span>
            </NavLink>
            <button 
              aria-label="Collapse sidebar" 
              className="lg:hidden text-on-surface-variant hover:text-on-surface p-space-2xs rounded-lg transition-colors" 
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Section label */}
          <div className="px-space-base py-space-sm">
            <span className="font-caption text-caption uppercase text-secondary font-semibold tracking-wider">
              Operations
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-space-sm space-y-space-2xs overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Settings, Status, Logout */}
        <div className="p-space-sm border-t border-outline-variant/20">
          <nav>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </NavLink>
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-1 flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-md text-label-md text-error hover:bg-error-container/40 transition-colors text-left"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>

          {/* System status pill */}
          <div className="mt-space-xs p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-caption text-caption text-secondary">Mumbai Hub Online</span>
            </div>
            <span className="font-caption text-caption text-secondary font-data-mono">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

