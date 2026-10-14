import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-on-primary text-[24px]">inventory_2</span>
        </div>
        <p className="font-label-sm text-label-sm text-secondary">Loading SmartStock Console...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

