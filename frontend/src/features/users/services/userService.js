import api from '../../utils/api';

/**
 * 管理者用: ユーザー一覧を取得
 * @returns {Promise<Object[]>}
 */
export const fetchUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};
