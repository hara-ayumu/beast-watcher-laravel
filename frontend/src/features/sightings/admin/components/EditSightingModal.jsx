import { useState, useEffect } from 'react';

import Modal from 'react-modal';

import { validateForUpdate } from '../../validation/validateSighting';

import { SIGHTING_TYPE_OPTIONS } from '../../constants/sightingTypes';
import { VALIDATION_CONSTANTS } from '../../constants/validationConstants';

/**
 * 投稿編集モーダル
 * @param {Object} props
 * @param {boolean} props.isOpen - モーダルの表示状態
 * @param {Object|null} props.post - 編集対象の投稿
 * @param {(patch: Object) => Promise<void>} props.onSubmit - 更新確定時のコールバック
 * @param {() => void} props.onCancel - キャンセル時のコールバック
 * @returns {JSX.Element}
 */
function EditSightingModal({ isOpen, post, onSubmit, onCancel }) {
    const [animalTypeId, setAnimalTypeId] = useState('');
    const [sightedAt, setSightedAt] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (post) {
            setAnimalTypeId(post.animal_type_id ?? '');
            const dt = post.sighted_at ? new Date(post.sighted_at) : null;
            if (dt && !isNaN(dt.getTime())) {
                const pad = (n) => String(n).padStart(2, '0');
                setSightedAt(
                    `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
                );
            } else {
                setSightedAt('');
            }
            setNote(post.note ?? '');
            setErrors({});
        }
    }, [post]);

    if (!post) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const patch = {
            animal_type_id: Number(animalTypeId),
            sighted_at: new Date(sightedAt).toISOString(),
            note,
        };

        const validationResult = validateForUpdate(patch);
        if (!validationResult.isValid) {
            setErrors(validationResult.errors);
            return;
        }

        setSubmitting(true);
        await onSubmit(patch);
        setSubmitting(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            ariaHideApp={false}
            className="bg-white p-4 rounded shadow max-w-md mx-auto mt-40"
            overlayClassName="fixed inset-0 bg-black/40 z-40"
        >
            <h2 className="text-lg font-bold mb-4">投稿を編集</h2>

            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm mb-3">
                    種類：
                    <select
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                            errors.animal_type_id ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={animalTypeId}
                        onChange={(e) => setAnimalTypeId(e.target.value)}
                    >
                        {SIGHTING_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.animal_type_id && (
                        <p className="text-red-500 text-xs mt-1">{errors.animal_type_id}</p>
                    )}
                </label>

                <label className="block text-gray-700 text-sm mb-3">
                    日時：
                    <input
                        type="datetime-local"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                            errors.sighted_at ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={sightedAt}
                        onChange={(e) => setSightedAt(e.target.value)}
                    />
                    {errors.sighted_at && (
                        <p className="text-red-500 text-xs mt-1">{errors.sighted_at}</p>
                    )}
                </label>

                <label className="block text-gray-700 text-sm mb-3">
                    詳細（任意: {VALIDATION_CONSTANTS.MAX_NOTE_LENGTH}字以内）：
                    <textarea
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                            errors.note ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={note}
                        maxLength={VALIDATION_CONSTANTS.MAX_NOTE_LENGTH}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <div className={`text-xs mt-1 ${note.length > VALIDATION_CONSTANTS.MAX_NOTE_LENGTH ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        {note.length}/{VALIDATION_CONSTANTS.MAX_NOTE_LENGTH}文字
                    </div>
                    {errors.note && (
                        <p className="text-red-500 text-xs mt-1">{errors.note}</p>
                    )}
                </label>

                {errors.general && (
                    <p className="text-red-500 text-sm mb-3">{errors.general}</p>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300"
                        disabled={submitting}
                    >
                        {submitting ? '更新中...' : '更新'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditSightingModal;
