<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class LineAuthController extends Controller
{
    /**
     * LINEログイン画面にリダイレクト
     */
    public function redirect()
    {
        return Socialite::driver('line')->redirect();
    }

    /**
     * LINEからのコールバックを処理しSanctumトークンを発行
     */
    public function callback()
    {
        $lineUser = Socialite::driver('line')->user();

        $user = User::updateOrCreate(
            ['line_id' => $lineUser->getId()],
            [
                'name' => $lineUser->getName(),
                'line_name' => $lineUser->getName(),
            ]
        );

        $token = $user->createToken('line-auth-token')->plainTextToken;

        $frontendUrl = config('app.frontend_url', 'http://localhost:5173');

        return redirect($frontendUrl . '/auth/line/callback?' . http_build_query([
            'token' => $token,
            'user' => json_encode([
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
            ]),
        ]));
    }
}
