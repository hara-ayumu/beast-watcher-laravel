import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const DEMO_EMAIL = 'bf-admin@example.com';
const DEMO_PASSWORD = 'admin1234';

/**
 * ログインページ
 * - メールアドレス/パスワードによる認証
 * - LINEログインへの導線
 * - ポートフォリオ閲覧用のデモアカウントログイン機能
 * @returns {JSX.Element}
 */
function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const executeLogin = async (email, password) => {
        setError(false);
        try {
            await login(email, password);
            navigate('/');
        }
        catch {
            setError(true);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        executeLogin(email, password);
    };

    const handleDemoLogin = () => {
        executeLogin(DEMO_EMAIL, DEMO_PASSWORD);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute top-4 left-4">
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-500 flex items-center">
                    ← トップページへ
                </Link>
            </div>

            {/* カード */}
            <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Beast Watcher</h1>
                <p className="text-gray-500 text-sm text-center mb-6">ログイン</p>

                {/* エラーメッセージ */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-sm">
                        メールアドレスまたはパスワードが間違っています。
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    {/* メールアドレス */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm mb-1">メールアドレス</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="メールアドレス"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* パスワード */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm mb-1">パスワード</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="パスワード"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">ログイン</button>
                </form>

                {/* LINEログイン */}
                <div className="mt-4">
                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-400 text-xs">または</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <a
                        href={`${import.meta.env.VITE_API_URL}/auth/line/redirect`}
                        className="w-full py-2 bg-[#06C755] hover:bg-[#05b04c] text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                    >
                        LINEでログイン
                    </a>
                </div>

                {/* 新規登録リンク */}
                <div className="mt-4 text-center text-sm">
                    <span className="text-gray-500">アカウントをお持ちでない方は</span>
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 ml-1">新規登録</Link>
                </div>

                {/* デモアカウント */}
                <div className="mt-4 border-t pt-4">
                    <p className="text-gray-500 text-xs text-center mb-2">
                        ポートフォリオ閲覧用
                    </p>
                    <button
                        type="button"
                        className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                        onClick={handleDemoLogin}
                    >
                        デモアカウントでログイン
                    </button>
                </div>

                <div className="text-center text-gray-400 text-xs mt-6">&copy; 2025 Hara Ayumu</div>
            </div>
        </div>
    );
}

export default Login;
