import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { clearSession, fetchWithSession } from './session';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
  user_meta?: { phone?: string | number; role?: string };
}

export interface DashboardData {
  firstname: string;
  lastname: string;
  email: string;
  plan_id: number | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  user_meta: { plan_id?: number; subscription_status?: string; display_name?: string } | null;
  payments: Array<{ payment_id: string; date: string; status: string; price: number }>;
  subscriptions: Array<{
    id: number;
    plan_id: number;
    plan_name: string;
    price: number;
    currency: string;
    status: string;
    payment_status: string;
    payment_reference: string;
    starts_at: string;
    ends_at: string;
    billing_frequency: string;
  }>;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasActivePlan: boolean | null;
  authenticate: (token: string, user: AuthUser) => void;
  logout: () => void;
  apiFetch: (url: string, options?: RequestInit) => Promise<Response>;
  getDashboard: () => Promise<DashboardData>;
  updateProfile: (profile: { firstname: string; lastname: string; display_name: string }) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const TOKEN_KEY = 'contentaihub_token';
const USER_KEY = 'contentaihub_user';
const ASSET_AUTH_COOKIE = 'bgp_auth_token';
const ACCESS_COOKIE = 'contentaihub_access';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const setAssetAuthCookie = (value: string, maxAge = 0) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ASSET_AUTH_COOKIE}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${secure}${maxAge ? `; Max-Age=${maxAge}` : ''}`;
};

const setAccessCookie = (maxAge = 0) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ACCESS_COOKIE}=1; Path=/; SameSite=Lax${secure}${maxAge ? `; Max-Age=${maxAge}` : ''}`;
};

const readStoredUser = (): AuthUser | null => {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) as AuthUser : null;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [hasActivePlan, setHasActivePlan] = useState<boolean | null>(null);

  const authenticate = useCallback((nextToken: string, nextUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    // <img> and <video> requests cannot send an Authorization header. The
    // backend accepts this same JWT from a first-party cookie for /v/:token.
    setAssetAuthCookie(nextToken, 7 * 24 * 60 * 60);
    setAccessCookie(7 * 24 * 60 * 60);
    setToken(nextToken);
    setUser(nextUser);
    setHasActivePlan(null);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
    setHasActivePlan(null);
  }, []);

  const handleExpiredSession = useCallback(() => {
    logout();
    window.location.replace('/login/');
  }, [logout]);

  const apiFetch = useCallback((url: string, options: RequestInit = {}) => (
    fetchWithSession(url, options, token, handleExpiredSession)
  ), [token, handleExpiredSession]);

  const getDashboard = useCallback(async () => {
    if (!token) throw new Error('Please sign in to view your account.');

    const response = await apiFetch(API_ENDPOINTS.dashboard, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.message || 'Unable to load account information.');
    }
    const dashboard = payload.data as DashboardData;
    setHasActivePlan(dashboard.subscriptions.some((subscription) => subscription.status.toLowerCase() === 'active'));
    return dashboard;
  }, [token, apiFetch]);

  const requestWithAuth = useCallback(async (url: string, method: 'POST' | 'PUT', body: Record<string, string>) => {
    if (!token) throw new Error('Please sign in to continue.');
    const response = await apiFetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.message || 'Request could not be completed.');
  }, [token, apiFetch]);

  const updateProfile = useCallback(async (profile: { firstname: string; lastname: string; display_name: string }) => {
    await requestWithAuth(API_ENDPOINTS.profile, 'PUT', profile);
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      const nextUser = { ...currentUser, name: profile.display_name || `${profile.firstname} ${profile.lastname}`.trim() };
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      return nextUser;
    });
  }, [requestWithAuth]);

  const changePassword = useCallback((oldPassword: string, newPassword: string) => (
    requestWithAuth(API_ENDPOINTS.changePassword, 'POST', { old_password: oldPassword, new_password: newPassword })
  ), [requestWithAuth]);

  useEffect(() => {
    if (!token) return;
    setAssetAuthCookie(token, 7 * 24 * 60 * 60);
    setAccessCookie(7 * 24 * 60 * 60);
    getDashboard().catch(() => setHasActivePlan(false));
  }, [token, getDashboard]);

  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), hasActivePlan, authenticate, logout, apiFetch, getDashboard, updateProfile, changePassword }), [token, user, hasActivePlan, authenticate, logout, apiFetch, getDashboard, updateProfile, changePassword]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
};
