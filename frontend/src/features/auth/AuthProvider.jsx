import { useCallback, useEffect, useState } from 'react';

import api from '../utils/api';

import { AuthContext } from './context/AuthContext';

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ authReady, setAuthReady ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setAuthReady(true);
            return;
        }

        api.get('/me')
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem('auth_token');
            })
            .finally(() => setAuthReady(true));
    }, []);

    const login = useCallback(async (email, password) => {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('auth_token', response.data.token);
        setUser(response.data.user);
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/logout');
        }
        finally {
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, authReady, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
