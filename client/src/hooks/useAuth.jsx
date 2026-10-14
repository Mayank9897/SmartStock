import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('smartstock_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('smartstock_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If token exists, verify session with /auth/me
    if (token) {
      authApi.getProfile()
        .then((res) => {
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('smartstock_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {
          // Token invalid or expired
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('smartstock_token', res.token);
      localStorage.setItem('smartstock_user', JSON.stringify(res.user));
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('smartstock_token', res.token);
      localStorage.setItem('smartstock_user', JSON.stringify(res.user));
      return res;
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smartstock_token');
    localStorage.removeItem('smartstock_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

