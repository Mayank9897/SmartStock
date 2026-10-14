/**
 * SmartStock API Service Layer
 * Centralized fetch client with JWT Bearer Token injection
 */

const API_BASE = '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('smartstock_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 && !endpoint.includes('/auth/login')) {
        localStorage.removeItem('smartstock_token');
        localStorage.removeItem('smartstock_user');
      }
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export const authApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => apiRequest('/auth/me'),
};

export const productApi = {
  getAll: (params = '') => apiRequest(`/products${params ? `?${params}` : ''}`),
  getById: (id) => apiRequest(`/products/${id}`),
  create: (data) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
  adjustStock: (id, adjustment) => apiRequest(`/products/${id}/adjust-stock`, { method: 'POST', body: JSON.stringify(adjustment) }),
};

export const saleApi = {
  create: (saleData) => apiRequest('/sales', { method: 'POST', body: JSON.stringify(saleData) }),
  getAll: (params = '') => apiRequest(`/sales${params ? `?${params}` : ''}`),
  getById: (id) => apiRequest(`/sales/${id}`),
};

export const customerApi = {
  getAll: () => apiRequest('/customers'),
  create: (data) => apiRequest('/customers', { method: 'POST', body: JSON.stringify(data) }),
};

export const supplierApi = {
  getAll: () => apiRequest('/suppliers'),
  create: (data) => apiRequest('/suppliers', { method: 'POST', body: JSON.stringify(data) }),
};

export const analyticsApi = {
  getSummary: () => apiRequest('/analytics/summary'),
  getTrends: (period = '30d') => apiRequest(`/analytics/trends?period=${period}`),
  getCategories: () => apiRequest('/analytics/categories'),
  getTopProducts: () => apiRequest('/analytics/top-products'),
  getDeadStock: () => apiRequest('/analytics/dead-stock'),
};

