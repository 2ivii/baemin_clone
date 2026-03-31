import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

const USER_KEY = 'currentUser';

const loadUser = () => {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser]           = useState(() => loadUser());
    const [isLoggedIn, setIsLoggedIn] = useState(() => authApi.isLoggedIn());

    const login = useCallback(async (loginId, password) => {
        const res = await authApi.login({ loginId, password });
        setUser(res.user);
        setIsLoggedIn(true);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        return res;
    }, []);

    const signup = useCallback(async (formData) => {
        const res = await authApi.signup(formData);
        return res;
    }, []);

    const logout = useCallback(() => {
        authApi.logout();
        localStorage.removeItem(USER_KEY);
        setUser(null);
        setIsLoggedIn(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};