import api from '../../utils/api';

import { ServiceError } from '../../../errors/ServiceError';

import { ERROR_CODES } from '../../utils/constants/errorCodes';

/**
 * 管理者用: ユーザー一覧を取得
 * @returns {Promise<Object[]>}
 */
export const fetchUsers = async () => {
    try {
        const response = await api.get('/admin/users');
        return response.data;
    } catch (err) {
        throw new ServiceError(ERROR_CODES.FETCH_USERS_FAILED, err, {
            operation: 'fetchUsers',
        });
    }
};

/**
 * 管理者用: ユーザーの権限を変更
 * @param {number} userId
 * @param {string} role - 'user' | 'admin'
 * @returns {Promise<Object>}
 */
export const updateUserRole = async (userId, role) => {
    try {
        const response = await api.patch(`/admin/users/${userId}/role`, { role });
        return response.data;
    } catch (err) {
        throw new ServiceError(ERROR_CODES.UPDATE_ROLE_FAILED, err, {
            operation: 'updateUserRole',
            userId,
            role,
        });
    }
};

/**
 * 管理者用: 管理者アカウントを新規作成
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<Object>}
 */
export const createAdminUser = async (data) => {
    try {
        const response = await api.post('/admin/users', data);
        return response.data;
    } catch (err) {
        throw new ServiceError(ERROR_CODES.CREATE_ADMIN_USER_FAILED, err, {
            operation: 'createAdminUser',
            email: data.email,
        });
    }
};
