import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import DataGrid from '../../../../components/DataGrid';
import PanelLoading from '../../../common/components/PanelLoading';
import SectionLoading from '../../../common/components/SectionLoading';
import AddAdminUserModal from './AddAdminUserModal';

import { useAdminUsers } from '../hooks/useAdminUsers';
import { useAuth } from '../../../auth/hooks/useAuth';

/**
 * 管理者用ユーザー管理パネル
 * @returns {JSX.Element}
 */
function AdminUserPanel() {
    const { users, loading, error, updating, loadUsers, updateRole, createUser } = useAdminUsers();
    const { user: currentUser } = useAuth();
    const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);

    const handleRoleChange = async (targetUser) => {
        const nextRole = targetUser.role === 'admin' ? 'user' : 'admin';
        const label = nextRole === 'admin' ? '管理者に変更' : '一般ユーザーに変更';

        if (!window.confirm(`${targetUser.name} を ${label} しますか？`)) {
            return;
        }

        const result = await updateRole(targetUser.id, nextRole);
        if (result.success) {
            toast.success(`${targetUser.name} を ${label} しました`);
        } else {
            toast.error(result.error);
        }
    };

    const handleCreateUser = async (data) => {
        const result = await createUser(data);
        if (result.success) {
            toast.success('管理者アカウントを作成しました');
            setIsAddModalOpen(false);
        }
        return result;
    };

    const columns = [
        { accessorKey: 'name', header: '表示名' },
        { accessorKey: 'email', header: 'メール', meta: { truncate: true } },
        { accessorKey: 'line_name', header: 'LINE名' },
        { accessorKey: 'role', header: '権限' },
        { accessorKey: 'created_at', header: '登録日時', cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleString() : '' },
        { accessorKey: 'updated_at', header: '更新日時', cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleString() : '' },
    ];

    return (
        <div className="flex-1 min-h-0 relative">
            <Toaster />
            {loading && <PanelLoading />}
            {updating && <SectionLoading message="更新中..." />}

            {error && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
                    <div className="text-center p-4">
                        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded mb-4">
                            <p>{error}</p>
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            onClick={() => loadUsers()}
                        >
                            再試行
                        </button>
                    </div>
                </div>
            )}

            <div className="h-full flex flex-col">
                <div className="p-2 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        管理者を追加
                    </button>
                </div>

                <div className="flex-1 min-h-0 px-2 pb-2">
                    <DataGrid
                        columns={columns}
                        data={users}
                        zebra={true}
                        rowActions={(row) => (
                            <button
                                className={`px-3 py-1 text-sm rounded transition-colors ${
                                    row.id === currentUser?.id
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : row.role === 'admin'
                                            ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                                            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (row.id !== currentUser?.id) {
                                        handleRoleChange(row);
                                    }
                                }}
                                disabled={row.id === currentUser?.id}
                            >
                                {row.id === currentUser?.id
                                    ? '自分'
                                    : row.role === 'admin'
                                        ? '一般に変更'
                                        : '管理者に変更'
                                }
                            </button>
                        )}
                    />
                </div>
            </div>

            <AddAdminUserModal
                isOpen={isAddModalOpen}
                onSubmit={handleCreateUser}
                onCancel={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}

export default AdminUserPanel;
