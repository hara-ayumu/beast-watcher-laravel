import DataGrid from '../../../../components/DataGrid';
import PanelLoading from '../../../common/components/PanelLoading';

import { useAdminUsers } from '../hooks/useAdminUsers';

/**
 * 管理者用ユーザー管理パネル
 * @returns {JSX.Element}
 */
function AdminUserPanel() {
    const { users, loading, error, loadUsers } = useAdminUsers();

    const columns = [
        { accessorKey: 'name', header: '表示名' },
        { accessorKey: 'email', header: 'メール' },
        { accessorKey: 'line_name', header: 'LINE名' },
        { accessorKey: 'role', header: '権限' },
        {
            accessorKey: 'created_at',
            header: '登録日',
            cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : '',
        },
    ];

    return (
        <div className="flex-1 min-h-0 relative">
            {loading && <PanelLoading />}

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

            <div className="h-full p-2">
                <DataGrid
                    columns={columns}
                    data={users}
                    zebra={true}
                />
            </div>
        </div>
    );
}

export default AdminUserPanel;
