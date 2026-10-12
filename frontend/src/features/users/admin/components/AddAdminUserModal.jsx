import { useState } from 'react';
import Modal from 'react-modal';

/**
 * 管理者アカウント作成モーダル
 * @param {Object} props
 * @param {boolean} props.isOpen - モーダルの表示状態
 * @param {(data: Object) => Promise<{ success: boolean, error?: string, validationErrors?: Object }>} props.onSubmit - 作成確定時のコールバック
 * @param {() => void} props.onCancel - キャンセル時のコールバック
 * @returns {JSX.Element}
 */
function AddAdminUserModal({ isOpen, onSubmit, onCancel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);

        const result = await onSubmit({ name, email, password });

        if (!result.success) {
            if (result.validationErrors) {
                setErrors(result.validationErrors);
            } else {
                setErrors({ general: result.error });
            }
            setSubmitting(false);
            return;
        }

        setName('');
        setEmail('');
        setPassword('');
        setErrors({});
        setSubmitting(false);
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setErrors({});
        onCancel();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCancel}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto mt-20 p-6 outline-none"
            overlayClassName="fixed inset-0 bg-black/50 flex justify-center z-50"
        >
            <h2 className="text-lg font-bold mb-4">管理者アカウントを作成</h2>

            {errors.general && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {errors.general}
                </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        onClick={handleCancel}
                        disabled={submitting}
                    >
                        キャンセル
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:opacity-50"
                        disabled={submitting}
                    >
                        {submitting ? '作成中...' : '作成'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddAdminUserModal;
