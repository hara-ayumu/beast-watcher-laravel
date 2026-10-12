import api from '../../utils/api';

/**
 * 管理者用: ユーザー一覧を取得
 * @returns {Promise<Object[]>}
 */
export const fetchUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

/**
 * 管理者用: ユーザーの権限を変更
 * @param {number} userId
 * @param {string} role - 'user' | 'admin'
 * @returns {Promise<Object>}
 */
export const updateUserRole = async (userId, role) => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
};

/**
 * 管理者用: 管理者アカウントを新規作成
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<Object>}
 */
export const createAdminUser = async (data) => {
    const response = await api.post('/admin/users', data);
    return response.data;
};
