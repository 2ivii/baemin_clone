import apiClient from './client';

export const favoriteApi = {
    /** 찜 토글 → { liked: boolean, restaurantId: number } */
    toggle: (restaurantId) =>
        apiClient.post(`/api/favorites/${restaurantId}/toggle`),

    /** 내 찜 목록 상세 */
    getAll: () => apiClient.get('/api/favorites'),

    /** 찜한 음식점 ID 집합 (홈 화면 하트 표시용) */
    getIds: () => apiClient.get('/api/favorites/ids'),
};