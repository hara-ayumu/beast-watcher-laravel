import { SIGHTING_STATUS } from '../../constants/sightingStatus';

/**
 * 編集機能の有無と投稿ステータスに応じた操作ボタンを表示するコンポーネント
 * DataGridやInfoWindowなど共通で使用可能
 * @param {Object} props
 * @param {string} props.status - 投稿の状態 ("pending" | "approved" | "rejected")
 * @param {() => void} props.onApprove - 承認ボタンをクリックしたときに呼ばれる関数
 * @param {() => void} props.onReject - 却下ボタンをクリックしたときに呼ばれる関数
 * @param {() => void} [props.onEdit] - 編集ボタンをクリックしたときに呼ばれる関数
 * @returns {JSX.Element} 状態に応じた操作ボタンの JSX
 */
function PostActionButtons({ status, onApprove, onReject, onEdit }) {
    // 編集機能の有無とステータスに応じたボタン配列を返す関数
    const getButtons = () => {
        const buttons = [];

        if (onEdit) {
            buttons.push({
                label: '編集',
                color: 'bg-blue-500 hover:bg-blue-600',
                action: onEdit,
            });
        }

        switch (status) {
            case SIGHTING_STATUS.PENDING:
                buttons.push(
                    {
                        label: '承認',
                        color: 'bg-green-500 hover:bg-green-600 text-white',
                        action: onApprove,
                    },
                    {
                        label: '却下',
                        color: 'bg-red-500 hover:bg-red-600',
                        action: onReject,
                    },
                );
                break;
            case SIGHTING_STATUS.APPROVED:
                buttons.push({
                    label: '却下',
                    color: 'bg-red-500 hover:bg-red-600',
                    action: onReject,
                });
                break;
            case SIGHTING_STATUS.REJECTED:
                buttons.push({
                    label: '承認',
                    color: 'bg-green-500 hover:bg-green-600 text-white',
                    action: onApprove,
                });
                break;
        }

        return buttons;
    };

    return (
        <div className="flex gap-2 justify-center">
            {getButtons().map((btn, i) => (
                <button
                    key={i}
                    className={`px-3 py-1 text-white rounded ${btn.color}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        btn.action();
                    }}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}

export default PostActionButtons;
