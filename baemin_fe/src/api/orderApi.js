import apiClient from './client';

export const orderApi = {
    /** 주문 생성 */
    place: (data) => apiClient.post('/api/orders', data),

    /** 내 주문 내역 목록 (페이징) */
    getMyOrders: (page = 0, size = 10) =>
        apiClient.get('/api/orders', { params: { page, size } }),

    /** 주문 단건 상세 */
    getDetail: (id) => apiClient.get(`/api/orders/${id}`),

    /** 주문 취소 */
    cancel: (id) => apiClient.patch(`/api/orders/${id}/cancel`),
};