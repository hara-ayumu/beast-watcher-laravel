import { useState } from 'react';

import HeaderBase from '../HeaderBase';
import HeaderButtonLink from '../HeaderButtonLink';

import { useAuth } from '../../features/auth/hooks/useAuth';

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
                    <a
                        href={`${import.meta.env.VITE_API_URL}/auth/line/redirect`}
                        className="px-3 py-1.5 bg-[#06C755] hover:bg-[#05b04c] text-white text-sm font-medium rounded transition-colors"
                    >
                        LINEでログイン
                    </a>
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
                                <a
                                    href={`${import.meta.env.VITE_API_URL}/auth/line/redirect`}
                                    className="block px-4 py-2 text-sm text-[#06C755] font-medium hover:bg-gray-200"
                                >
                                    LINEでログイン
                                </a>
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
