<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * 管理者アカウントの初期データを投入
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'bf-admin@example.com'],
            [
                'name' => '管理者',
                'password' => Hash::make('admin1234'),
                'role' => 'admin',
            ]
        );
    }
}
