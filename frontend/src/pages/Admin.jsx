import { useState } from 'react';

import { Toaster } from 'react-hot-toast';

import AdminHeader from '../layouts/admin/AdminHeader';
import AdminSightingPanel from '../features/sightings/admin/components/AdminSightingPanel';
import AdminUserPanel from '../features/users/admin/components/AdminUserPanel';

/**
 * Admin（管理者画面）
 * - 投稿一覧表示
 * - Google Map 上での投稿の確認
 * - 投稿ステータスの承認/却下
 * - 投稿管理 / ユーザー管理をセクション切り替えで表示
 * @returns {JSX.Element}
 */
function Admin() {
    const [ activeSection, setActiveSection ] = useState('sightings');

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Toaster />
            <AdminHeader
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            {activeSection === 'sightings' && <AdminSightingPanel />}
            {activeSection === 'users' && <AdminUserPanel />}
        </div>
    );
}

export default Admin;
