import apiClient from './client';

export const ownerApi = {
    // ── 가게 ──────────────────────────────────────────────────
    getMyRestaurants: () =>
        apiClient.get('/api/owner/restaurants'),

    createRestaurant: (data) =>
        apiClient.post('/api/owner/restaurants', data),

    updateRestaurant: (id, data) =>
        apiClient.put(`/api/owner/restaurants/${id}`, data),

    toggleOpen: (id) =>
        apiClient.patch(`/api/owner/restaurants/${id}/toggle-open`),

    deleteRestaurant: (id) =>
        apiClient.delete(`/api/owner/restaurants/${id}`),

    // ── 메뉴 ──────────────────────────────────────────────────
    getMenus: (restaurantId) =>
        apiClient.get(`/api/owner/restaurants/${restaurantId}/menus`),

    createMenu: (restaurantId, data) =>
        apiClient.post(`/api/owner/restaurants/${restaurantId}/menus`, data),

    updateMenu: (restaurantId, menuId, data) =>
        apiClient.put(`/api/owner/restaurants/${restaurantId}/menus/${menuId}`, data),

    toggleMenu: (restaurantId, menuId) =>
        apiClient.patch(`/api/owner/restaurants/${restaurantId}/menus/${menuId}/toggle`),

    deleteMenu: (restaurantId, menuId) =>
        apiClient.delete(`/api/owner/restaurants/${restaurantId}/menus/${menuId}`),
};