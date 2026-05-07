<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnimalType extends Model
{
    protected $fillable = [
        'name',
        'icon_path',
    ];

    /**
     * 目撃情報一覧を取得
     */
    public function sightings()
    {
        return $this->hasMany(Sighting::class);
    }
}
