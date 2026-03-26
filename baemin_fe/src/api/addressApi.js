import apiClient from './client';

export const addressApi = {
    /** 주소 목록 전체 조회 */
    getAll: () => apiClient.get('/api/addresses'),

    /** 주소 단건 조회 */
    getOne: (id) => apiClient.get(`/api/addresses/${id}`),

    /** 주소 추가 */
    add: (data) => apiClient.post('/api/addresses', data),

    /** 주소 수정 */
    update: (id, data) => apiClient.put(`/api/addresses/${id}`, data),

    /** 주소 삭제 */
    delete: (id) => apiClient.delete(`/api/addresses/${id}`),

    /** 기본 주소로 설정 */
    setDefault: (id) => apiClient.patch(`/api/addresses/${id}/default`),
};