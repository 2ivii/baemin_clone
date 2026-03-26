import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => authApi.isLoggedIn());

    const login = useCallback(async (loginId, password) => {
        const res = await authApi.login({ loginId, password });
        setUser(res.user);
        setIsLoggedIn(true);
        return res;
    }, []);

    const signup = useCallback(async (formData) => {
        const res = await authApi.signup(formData);
        // 회원가입 후 바로 로그인 처리하지 않음 (로그인 탭으로 유도)
        return res;
    }, []);

    const logout = useCallback(() => {
        authApi.logout();
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