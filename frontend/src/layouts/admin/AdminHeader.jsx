import { useNavigate } from 'react-router-dom';

import HeaderBase from '../HeaderBase';
import HeaderButtonLink from '../HeaderButtonLink';

import { useAuth } from '../../features/auth/hooks/useAuth';

/**
 * 管理者画面ヘッダー
 * - 常時表示の固定ヘッダー
 * - セクション切り替え（投稿管理 / ユーザー管理）
 * - 利用者画面へのリンクと、ログアウトボタンを表示
 * @param {Object} props
 * @param {'sightings'|'users'} props.activeSection
 * @param {(section: string) => void} props.onSectionChange
 * @returns {JSX.Element}
 */
function AdminHeader({ activeSection, onSectionChange }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        }
        catch (err) {
            console.log(err);
        }
    };

    const sectionItems = [
        { key: 'sightings', label: '投稿管理' },
        { key: 'users', label: 'ユーザー管理' },
    ];

    return (
        <HeaderBase
            title="Beast Watcher 管理パネル"
            right={
                <div className="flex items-center gap-4">
                    {sectionItems.map(item => (
                        <HeaderButtonLink
                            key={item.key}
                            className={`px-2 py-1 rounded ${
                                activeSection === item.key
                                    ? 'font-bold underline underline-offset-4'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => onSectionChange(item.key)}
                        >
                            {item.label}
                        </HeaderButtonLink>
                    ))}
                    <HeaderButtonLink to="/" className="px-2 py-1 hover:bg-gray-200 rounded">利用者画面へ</HeaderButtonLink>
                    <HeaderButtonLink className="px-2 py-1 hover:bg-gray-200 rounded" onClick={handleLogout}>ログアウト</HeaderButtonLink>
                </div>
            }
        />
    );
}

export default AdminHeader;
