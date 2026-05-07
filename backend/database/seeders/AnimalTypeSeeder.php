<?php

namespace Database\Seeders;

use App\Models\AnimalType;
use Illuminate\Database\Seeder;

class AnimalTypeSeeder extends Seeder
{
    /**
     * 動物種マスタの初期データを投入
     */
    public function run(): void
    {
        $types = [
            ['name' => 'クマ', 'icon_path' => null],
            ['name' => 'サル', 'icon_path' => null],
        ];

        foreach ($types as $type) {
            AnimalType::firstOrCreate(
                ['name' => $type['name']],
                ['icon_path' => $type['icon_path']]
            );
        }
    }
}
