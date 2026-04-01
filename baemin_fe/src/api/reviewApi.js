import apiClient from './client';

export const reviewApi = {
    /** 음식점 리뷰 목록 */
    getByRestaurant: (restaurantId) =>
        apiClient.get(`/api/restaurants/${restaurantId}/reviews`),

    /** 내가 쓴 리뷰 목록 */
    getMy: () => apiClient.get('/api/reviews/my'),

    /** 리뷰 작성 */
    create: (data) => apiClient.post('/api/reviews', data),
    // data: { orderId, rating, content }

    /** 리뷰 수정 */
    update: (reviewId, data) => apiClient.put(`/api/reviews/${reviewId}`, data),
    // data: { rating, content }

    /** 리뷰 삭제 */
    delete: (reviewId) => apiClient.delete(`/api/reviews/${reviewId}`),

    /** 사장님 답글 등록/수정 */
    reply: (reviewId, reply) =>
        apiClient.post(`/api/reviews/${reviewId}/reply`, { reply }),

    /** 사장님 답글 삭제 */
    deleteReply: (reviewId) =>
        apiClient.delete(`/api/reviews/${reviewId}/reply`),
};