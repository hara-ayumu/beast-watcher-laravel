import { useState } from 'react';

import HeaderBase from '../HeaderBase';
import HeaderButtonLink from '../HeaderButtonLink';

import { useAuth } from '../../features/auth/hooks/useAuth';

/**
 * 利用者画面ヘッダー
 * - 常時表示の固定ヘッダー
 * - レスポンシブ対応（PC: リンク表示 / SP: ハンバーガーメニュー）
 * - 認証状態に応じてナビゲーションリンクを切り替え
 * @param {Object} props
 * @param {() => void} props.onTermsOpen - 「利用規約」選択時のコールバック
 * @param {() => void} props.onPostingGuideOpen - 「投稿方法」選択時のコールバック
 * @returns {JSX.Element}
 */
function PublicHeader({ onTermsOpen, onPostingGuideOpen }) {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const { user, logout } = useAuth();

    const menuItems = [
        { label: '投稿方法', onClick: onPostingGuideOpen },
        { label: '利用規約', onClick: onTermsOpen },
        user?.role === 'admin'
            ? { label: '管理画面へ', href: '/admin' }
            : null,
    ].filter(Boolean);

    const rightContent = (
        <>
            {/* PC */}
            <div className="hidden md:flex items-center gap-4">
                {menuItems.map(item => (
                    <HeaderButtonLink
                        key={item.label}
                        to={item.href}
                        className="px-2 py-1 hover:bg-gray-200 rounded"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </HeaderButtonLink>
                ))}
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{user.name}</span>
                        <button
                            onClick={logout}
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
                        >
                            ログアウト
                        </button>
                    </div>
                ) : (
                    <HeaderButtonLink
                        to="/login"
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
                    >
                        ログイン
                    </HeaderButtonLink>
                )}
            </div>

            {/* ハンバーガーメニュー */}
            <div className="md:hidden relative">
                <button
                    className="p-2"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-30">
                        {menuItems.map(item => (
                            <HeaderButtonLink
                                key={item.label}
                                to={item.href}
                                className="block px-4 py-2 hover:bg-gray-200"
                                onClick={() => {
                                    item.onClick?.();
                                    setIsMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </HeaderButtonLink>
                        ))}
                        <div className="border-t">
                            {user ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-gray-500">{user.name}</div>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        ログアウト
                                    </button>
                                </>
                            ) : (
                                <HeaderButtonLink
                                    to="/login"
                                    className="block px-4 py-2 text-sm text-blue-500 font-medium hover:bg-gray-200"
                                >
                                    ログイン
                                </HeaderButtonLink>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <HeaderBase
            title="Beast Watcher"
            right={rightContent}
        />
    );
}

export default PublicHeader;
