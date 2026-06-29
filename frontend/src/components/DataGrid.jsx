import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

/**
 * TanStack Tableベースの汎用データテーブル
 * - ヘッダークリックによるソート
 * - 行クリックによるコールバック
 * @param {Object} props
 * @param {import('@tanstack/react-table').ColumnDef[]} props.columns - TanStack Tableのカラム定義
 * @param {Object[]} props.data - 表示するデータ
 * @param {boolean} [props.zebra=false] - 奇数偶数で色分け
 * @param {(row: Object) => void} [props.onRowClick] - 行クリック時
 * @param {(row: Object) => JSX.Element} [props.rowActions] - 行右端にボタンなどを描画
 * @returns {JSX.Element}
 */
function DataGrid({ columns, data, zebra = false, onRowClick, rowActions }) {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="overflow-y-auto h-full">
            <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-gray-100 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left font-semibold border-b border-gray-300 cursor-pointer select-none hover:bg-gray-200 transition-colors"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="flex items-center gap-1">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        <span className="text-gray-400 text-xs">
                                            {{ asc: '▲', desc: '▼' }[
                                                header.column.getIsSorted()
                                            ] ?? ''}
                                        </span>
                                    </div>
                                </th>
                            ))}
                            {rowActions && (
                                <th className="px-4 py-2 text-center font-semibold border-b border-gray-300">
                                    操作
                                </th>
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            onClick={() => onRowClick && onRowClick(row.original)}
                            className={`cursor-pointer transition-colors ${
                                zebra
                                    ? idx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                    : 'bg-white'
                            } hover:bg-blue-50`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 border-b border-gray-200"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                            {rowActions && (
                                <td className="px-4 py-2 border-b border-gray-200">
                                    {typeof rowActions === 'function'
                                        ? rowActions(row.original)
                                        : null}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataGrid;
