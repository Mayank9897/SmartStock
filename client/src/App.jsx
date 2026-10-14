import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import AppLayout from './components/layout/AppLayout.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import SalesPosPage from './pages/SalesPosPage.jsx';
import CustomersPage from './pages/CustomersPage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Application Routes wrapped in AppLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sales" element={<SalesPosPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

