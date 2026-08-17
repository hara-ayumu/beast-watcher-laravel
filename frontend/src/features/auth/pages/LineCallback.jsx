import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

/**
 * LINEログインのコールバック処理
 * LaravelからリダイレクトされたURLのクエリパラメータからトークンを取得し保存する
 * @returns {JSX.Element}
 */
function LineCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuthFromCallback } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (token && userParam) {
            try {
                const user = JSON.parse(userParam);
                setAuthFromCallback(token, user);
                navigate('/', { replace: true });
            } catch {
                navigate('/', { replace: true });
            }
        } else {
            navigate('/', { replace: true });
        }
    }, [searchParams, navigate, setAuthFromCallback]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">ログイン処理中...</p>
        </div>
    );
}

export default LineCallback;
