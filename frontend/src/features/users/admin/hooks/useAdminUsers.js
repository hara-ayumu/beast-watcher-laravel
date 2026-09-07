import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/userService';

/**
 * 管理者画面用のユーザー管理フック
 * @returns {{ users: Object[], loading: boolean, error: string|null, loadUsers: () => Promise<void> }}
 */
export const useAdminUsers = () => {
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const loadUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch {
            setError('ユーザー情報の取得に失敗しました。');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return { users, loading, error, loadUsers };
};
