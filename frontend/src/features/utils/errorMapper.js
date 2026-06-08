import { ValidationError, ServiceError } from '../../errors';

import { ERROR_CODES } from '../sightings/constants/errorCodes';
import { ERROR_MESSAGES } from '../sightings/constants/errorMessages';

/**
 * API エラーレスポンスからメッセージを取得
 * @param {Error} error - axios から投げられたエラー
 * @returns {string} - ユーザー向けメッセージ
 */
const parseApiError = (error) => {
    const response = error?.response;
    if (!response) {
        return ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
    }

    // LaravelのバリデーションエラーはHTTP 422で返る
    if (response.status === 422 && response.data?.errors) {
        const firstField = Object.keys(response.data.errors)[0];
        return response.data.errors[firstField][0];
    }

    // Laravelのエラーメッセージ
    if (response.data?.message) {
        return response.data.message;
    }

    // ステータスコード別
    const statusMessages = {
        401: 'ログインが必要です。',
        403: 'アクセス権限がありません。',
        404: 'データが見つかりませんでした。',
        429: 'リクエスト制限を超えました。時間をおいて再度お試しください。',
        500: 'サーバー内部エラーが発生しました。',
    };

    // 開発環境でのみログ出力
    const isDev = import.meta.env.VITE_APP_ENV === 'development';
    if (isDev && !statusMessages[response.status]) {
        console.warn('未知のAPIエラー:', response.status, response.data);
    }

    return statusMessages[response.status] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
};

/**
 * Errorオブジェクト（またはanything）をUI表示用の日本語メッセージに変換する
 * @param {any} err 受け取るエラー（serviceからthrowされるError、または未知の値）
 * @returns {string} UIに表示する日本語メッセージ（定数から必ず返す）
 */
export const mapErrorToUiMessage = (err) => {
    // ValidationError: 入力不備を優先的に返す
    if (err instanceof ValidationError) {
        return err.message;
    }

    // ServiceError: 内部にラップされた元エラー（API由来等）があればそちらを解析
    if (err instanceof ServiceError) {
        if (err.originalError) {
            const apiMessage = parseApiError(err.originalError);
            if (apiMessage !== ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR]) {
                return apiMessage;
            }
        }

        return ERROR_MESSAGES[err.code] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
    }

    // 文字列が直接throwされた場合
    if (typeof err === 'string') {
        return err;
    }

    // axiosエラーが直接渡された場合の処理
    if (err && typeof err === 'object' && err.response) {
        const apiMessage = parseApiError(err);
        if (apiMessage !== ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR]) {
            return apiMessage;
        }
    }

    // 標準のErrorオブジェクト: メッセージがあればそれを返す
    if (err && typeof err === 'object' && err.message) {
        return err.message;
    }

    return ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
};

/**
 * ValidationError からフィールド情報を取得
 * - UI側でエラーフィールドをハイライトするために使用
 * @param {any} err - 判定対象のエラー
 * @returns {Object|null} - { field: string, errors: Object } または null
 */
export const getValidationDetails = (err) => {
    if (err instanceof ValidationError) {
        return {
            field: err.field,
            errors: err.errors,
        };
    }
    return null;
};
