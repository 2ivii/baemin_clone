import apiClient from './client';

const TOKEN_KEY = 'accessToken';

export const authApi = {
    /** 회원가입 → 토큰 저장 후 AuthResponse 반환 */
    signup: async (data) => {
        // data: { loginId, password, name, birthDate?, email?, phone? }
        const res = await apiClient.post('/api/auth/signup', data);
        if (res?.accessToken) {
            localStorage.setItem(TOKEN_KEY, res.accessToken);
        }
        return res;
    },

    /** 로그인 → 토큰 저장 후 AuthResponse 반환 */
    login: async (data) => {
        // data: { loginId, password }
        const res = await apiClient.post('/api/auth/login', data);
        if (res?.accessToken) {
            localStorage.setItem(TOKEN_KEY, res.accessToken);
        }
        return res;
    },

    /** 아이디 중복 확인 → { available: boolean } */
    checkLoginId: (loginId) =>
        apiClient.get('/api/auth/check-id', { params: { loginId } }),

    /** 클라이언트 로그아웃 (토큰 제거) */
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    /** 현재 토큰 존재 여부 */
    isLoggedIn: () => !!localStorage.getItem(TOKEN_KEY),
};