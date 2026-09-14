import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

/**
 * ユーザー登録ページ
 * @returns {JSX.Element}
 */
function Register() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: '登録に失敗しました。もう一度お試しください。' });
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute top-4 left-4">
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-500 flex items-center">
                    ← トップページへ
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Beast Watcher</h1>
                <p className="text-gray-500 text-sm text-center mb-6">新規登録</p>

                {errors.general && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-sm">
                        {errors.general}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">表示名</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="表示名"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            maxLength={20}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">メールアドレス</label>
                        <input
                            type="email"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="メールアドレス"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">パスワード（8文字以上）</label>
                        <input
                            type="password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="パスワード"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        登録
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <span className="text-gray-500">アカウントをお持ちの方は</span>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-1">ログイン</Link>
                </div>

                <div className="text-center text-gray-400 text-xs mt-6">© 2025 Hara Ayumu</div>
            </div>
        </div>
    );
}

export default Register;
