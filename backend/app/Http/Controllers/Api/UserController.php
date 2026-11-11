<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAdminUserRequest;
use App\Http\Requests\UpdateUserRoleRequest;
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
            'updated_at',
        ]);

        return response()->json($users);
    }

    /**
     * 管理者アカウントを新規作成
     */
    public function store(StoreAdminUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'admin',
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'line_name' => $user->line_name,
            'role' => $user->role,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ], 201);
    }

    /**
     * ユーザーの権限を変更
     */
    public function updateRole(UpdateUserRoleRequest $request, User $user)
    {
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => '自分自身の権限は変更できません',
            ], 422);
        }

        $user->update([
            'role' => $request->role,
            'updated_by' => $request->user()->id,
        ]);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'line_name' => $user->line_name,
            'role' => $user->role,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ]);
    }
}
