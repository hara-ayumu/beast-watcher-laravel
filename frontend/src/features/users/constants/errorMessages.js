import { USER_ERROR_CODES } from './errorCodes';

export const USER_ERROR_MESSAGES = {
    [USER_ERROR_CODES.FETCH_USERS_FAILED]: 'ユーザー情報の取得に失敗しました。',
    [USER_ERROR_CODES.UPDATE_ROLE_FAILED]: '権限の変更に失敗しました。もう一度お試しください。',
    [USER_ERROR_CODES.CREATE_ADMIN_USER_FAILED]: '管理者アカウントの作成に失敗しました。もう一度お試しください。',
    [USER_ERROR_CODES.UNKNOWN_ERROR]: '予期せぬエラーが発生しました。時間をおいて再度お試しください。',
};
