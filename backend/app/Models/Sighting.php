<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sighting extends Model
{
    protected $fillable = [
        'animal_type_id',
        'sighted_at',
        'lat',
        'lng',
        'note',
        'status',
        'review_comment',
        'reviewed_by',
        'reviewed_at',
        'created_by',
        'updated_by',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sighted_at' => 'datetime',
            'reviewed_at' => 'datetime',
            'lat' => 'float',
            'lng' => 'float',
        ];
    }

    /**
     * 動物種を取得
     */
    public function animalType()
    {
        return $this->belongsTo(AnimalType::class);
    }

    /**
     * 投稿者を取得
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * レビュー実施者を取得
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * 最終更新者を取得
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
