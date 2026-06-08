import api from '../../utils/api';

import { ServiceError } from '../../../errors/ServiceError';

import { ERROR_CODES } from '../constants/errorCodes';

/**
 * 投稿者用: 新規投稿（ステータスは必ず未承認）
 */
export const createSighting = async (data) => {
    try {
        const response = await api.post('/sightings', {
            animal_type_id: data.animal_type_id,
            sighted_at: data.sighted_at instanceof Date ? data.sighted_at.toISOString() : data.sighted_at,
            lat: data.lat,
            lng: data.lng,
            note: data.note || '',
        });
        return response.data;
    }
    catch (err) {
        throw new ServiceError(ERROR_CODES.CREATE_SIGHTING_FAILED, err, {
            operation: 'createSighting',
            animalTypeId: data.animal_type_id,
            hasNote: !!data.note,
        });
    }
};

/**
 * 投稿者用: 投稿を取得（承認済みのみ）
 * 誤情報拡散防止のため
 */
export const fetchPublicSightings = async () => {
    try {
        const response = await api.get('/sightings');
        return response.data;
    }
    catch (err) {
        throw new ServiceError(ERROR_CODES.FETCH_PUBLIC_SIGHTINGS_FAILED, err, {
            operation: 'fetchPublicSightings',
        });
    }
};

/**
 * 管理者用: すべての投稿を取得
 */
export const fetchAllSightings = async () => {
    try {
        const response = await api.get('/admin/sightings');
        return response.data;
    }
    catch (err) {
        throw new ServiceError(ERROR_CODES.FETCH_ALL_SIGHTINGS_FAILED, err, {
            operation: 'fetchAllSightings',
        });
    }
};

/**
 * 管理者用: 投稿更新
 * - ステータス変更を含む任意のフィールド更新が可能
 * @param {number} id - 投稿ID
 * @param {Object} patch - 更新するフィールド
 * @returns {Promise<Object>}
 */
export const updateSighting = async (id, patch) => {
    try {
        const response = await api.patch(`/admin/sightings/${id}`, patch);
        return response.data;
    }
    catch (err) {
        throw new ServiceError(ERROR_CODES.UPDATE_SIGHTING_FAILED, err, {
            operation: 'updateSighting',
            sightingId: id,
            updatedFields: Object.keys(patch),
        });
    }
};

/**
 * 管理者用: 投稿のレビューを更新する
 * @param {number} id - 投稿ID
 * @param {{ status: string, review_comment: string }} data - レビューデータ
 * @returns {Promise<Object>}
 */
export const reviewSighting = async (id, { status, review_comment }) => {
    try {
        const response = await api.patch(`/admin/sightings/${id}/review`, {
            status,
            review_comment,
        });
        return response.data;
    }
    catch (err) {
        throw new ServiceError(ERROR_CODES.REVIEW_SIGHTING_FAILED, err, {
            operation: 'reviewSighting',
            sightingId: id,
            reviewAction: status,
            hasComment: !!review_comment,
        });
    }
};
