/**
 * AuthContext — Secure JWT Authentication
 *
 * Security design:
 * - Tokens stored ONLY in sessionStorage (cleared on tab close, never persists)
 * - Access token: 2hr TTL, used for API calls
 * - Refresh token: 7-day TTL, used only to silently refresh access token
 * - On logout: refresh token is blacklisted server-side + sessionStorage wiped
 * - No PII is ever logged to console
 * - Auto-refresh: access token refreshed 5min before expiry using a timer
 */

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { readResponseJson, userFacingHttpMessage } from '../utils/httpError';

const AuthContext = createContext(null);

const TOKEN_KEY = 'cy_at';     // access token key
const REFRESH_KEY = 'cy_rt';  // refresh token key
const USER_KEY = 'cy_usr';    // user data key

// Parse JWT payload without any library
function parseJwt(token) {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}

function getTokenExpiry(token) {
    const payload = parseJwt(token);
    return payload?.exp ? payload.exp * 1000 : 0; // to ms
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const raw = sessionStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    });
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);
    const refreshTimerRef = useRef(null);

    // ── Token Management ─────────────────────────────────────────
    const storeTokens = useCallback((access, refresh, userData) => {
        sessionStorage.setItem(TOKEN_KEY, access);
        sessionStorage.setItem(REFRESH_KEY, refresh);
        sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
        setAccessToken(access);
        setUser(userData);
        scheduleRefresh(access);
    }, []);

    const clearSession = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_KEY);
        sessionStorage.removeItem(USER_KEY);
        setAccessToken(null);
        setUser(null);
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
            refreshTimerRef.current = null;
        }
    }, []);

    // ── Silent Refresh ───────────────────────────────────────────
    const silentRefresh = useCallback(async () => {
        const refresh = sessionStorage.getItem(REFRESH_KEY);
        if (!refresh) { clearSession(); return; }
        try {
            const res = await fetch('/api/auth/token/refresh/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh }),
            });
            if (!res.ok) { clearSession(); return; }
            const data = await res.json();
            sessionStorage.setItem(TOKEN_KEY, data.access);
            setAccessToken(data.access);
            scheduleRefresh(data.access);
        } catch {
            clearSession();
        }
    }, [clearSession]);

    function scheduleRefresh(access) {
        if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
        const expiry = getTokenExpiry(access);
        const now = Date.now();
        // Refresh 5 minutes before expiry
        const delay = Math.max(expiry - now - 5 * 60 * 1000, 10000);
        refreshTimerRef.current = setTimeout(silentRefresh, delay);
    }

    // Schedule refresh on mount if token exists
    useEffect(() => {
        if (accessToken) {
            const expiry = getTokenExpiry(accessToken);
            if (Date.now() >= expiry) {
                silentRefresh();
            } else {
                scheduleRefresh(accessToken);
            }
        }
        return () => {
            if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
        };
    }, []);

    // ── Auth Actions ─────────────────────────────────────────────
    const register = useCallback(async (formData) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await readResponseJson(res);
            if (res.ok) {
                storeTokens(data.access, data.refresh, data.user);
                return { ok: true, user: data.user };
            }
            if (res.status === 429) {
                return {
                    ok: false,
                    errors: { general: userFacingHttpMessage(429, data, 'Too many attempts. Please try again later.') },
                };
            }
            return { ok: false, errors: data.errors || { general: data.error || 'Registration failed.' } };
        } catch {
            return { ok: false, errors: { general: 'Network error. Please try again.' } };
        } finally {
            setLoading(false);
        }
    }, [storeTokens]);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await readResponseJson(res);
            if (res.ok) {
                storeTokens(data.access, data.refresh, data.user);
                return { ok: true, user: data.user };
            }
            if (res.status === 429) {
                return { ok: false, error: userFacingHttpMessage(429, data) };
            }
            return { ok: false, error: data.error || 'Invalid credentials.' };
        } catch {
            return { ok: false, error: 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }
    }, [storeTokens]);

    const logout = useCallback(async () => {
        const refresh = sessionStorage.getItem(REFRESH_KEY);
        const access = sessionStorage.getItem(TOKEN_KEY);
        clearSession();
        // Blacklist the refresh token server-side (best effort)
        if (refresh && access) {
            fetch('/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify({ refresh }),
            }).catch(() => {}); // Fire and forget
        }
    }, [clearSession]);

    // ── Authenticated Fetch Helper ───────────────────────────────
    const authFetch = useCallback(async (url, options = {}) => {
        const token = sessionStorage.getItem(TOKEN_KEY);
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            loading,
            isAuthenticated: !!user && !!accessToken,
            register,
            login,
            logout,
            authFetch,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
