import apiClient from './client';

export const restaurantApi = {
    /** 음식점 목록 (카테고리 필터 선택) */
    getList: (categoryName) =>
        apiClient.get('/api/restaurants', {
            params: categoryName ? { category: categoryName } : {},
        }),

    /** 음식점 단건 상세 */
    getDetail: (id) => apiClient.get(`/api/restaurants/${id}`),

    /** 음식점 메뉴 목록 */
    getMenus: (restaurantId) => apiClient.get(`/api/restaurants/${restaurantId}/menus`),

    /** 카테고리 목록 */
    getCategories: () => apiClient.get('/api/categories'),
};