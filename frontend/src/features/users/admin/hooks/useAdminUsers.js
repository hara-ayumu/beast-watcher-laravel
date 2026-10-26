import { useCallback, useEffect, useState } from 'react';
import { fetchUsers, updateUserRole, createAdminUser } from '../../services/userService';
import { USER_ERROR_CODES } from '../../constants/errorCodes';
import { USER_ERROR_MESSAGES } from '../../constants/errorMessages';

/**
 * 管理者画面用のユーザー管理フック
 * @returns {{ users: Object[], loading: boolean, updating: boolean, error: string|null, loadUsers: () => Promise<void>, updateRole: (userId: number, role: string) => Promise<{ success: boolean, error?: string }>, createUser: (data: Object) => Promise<{ success: boolean, error?: string, validationErrors?: Object }> }}
 */
export const useAdminUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ updating, setUpdating ] = useState(false);
    const [ error, setError ] = useState(null);

    const loadUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch {
            setError(USER_ERROR_MESSAGES[USER_ERROR_CODES.FETCH_USERS_FAILED]);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = useCallback(async (userId, role) => {
        setUpdating(true);
        try {
            const updatedUser = await updateUserRole(userId, role);
            setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || USER_ERROR_MESSAGES[USER_ERROR_CODES.UPDATE_ROLE_FAILED];;
            return { success: false, error: message };
        } finally {
            setUpdating(false);
        }
    }, []);

    const createUser = useCallback(async (data) => {
        setUpdating(true);
        try {
            const newUser = await createAdminUser(data);
            setUsers(prev => [newUser, ...prev]);
            return { success: true };
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                return { success: false, validationErrors: err.response.data.errors };
            }
            return { success: false, error: USER_ERROR_MESSAGES[USER_ERROR_CODES.CREATE_ADMIN_USER_FAILED] };
        } finally {
            setUpdating(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, []);

    return { users, loading, error, updating, loadUsers, updateRole, createUser };
};
