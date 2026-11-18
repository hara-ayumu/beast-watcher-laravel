import { useCallback, useEffect, useState } from 'react';
import { fetchUsers, updateUserRole, createAdminUser } from '../../services/userService';
import { mapErrorToUiMessage } from '../../../utils/errorMapper';

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
        } catch (err) {
            setError(mapErrorToUiMessage(err));
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
            const message = mapErrorToUiMessage(err);
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
            const originalError = err.originalError || err;
            if (originalError.response?.status === 422 && originalError.response?.data?.errors) {
                return { success: false, validationErrors: originalError.response.data.errors };
            }
            return { success: false, error: mapErrorToUiMessage(err) };
        } finally {
            setUpdating(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, []);

    return { users, loading, error, updating, loadUsers, updateRole, createUser };
};
