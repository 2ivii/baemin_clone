import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// ── axios 인스턴스 ──────────────────────────────────────────
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

// ── 요청 인터셉터: 토큰 자동 첨부 ─────────────────────────
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// ── 응답 인터셉터: 공통 에러 처리 ─────────────────────────
apiClient.interceptors.response.use(
    (response) => {
        // 백엔드 ApiResponse 래퍼 벗기기
        const { data } = response;
        if (data && !data.success) {
            return Promise.reject(new Error(data.message || '요청에 실패했습니다.'));
        }
        return data?.data ?? data;
    },
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            '네트워크 오류가 발생했습니다.';

        // 401 → 토큰 만료 처리
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.reload();
        }

        return Promise.reject(new Error(message));
    },
);

export default apiClient;