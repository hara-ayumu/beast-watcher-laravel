<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得
     */
    public function index()
    {
        $users = User::orderByDesc('created_at')->get([
            'id',
            'name',
            'email',
            'line_name',
            'role',
            'created_at',
        ]);

        return response()->json($users);
    }
}
