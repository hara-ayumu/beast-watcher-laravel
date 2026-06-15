<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSightingRequest;
use App\Http\Requests\UpdateSightingRequest;
use App\Http\Requests\ReviewSightingRequest;
use App\Models\Sighting;

class SightingController extends Controller
{
    /**
     * 承認済みの目撃情報一覧を取得
     */
    public function index()
    {
        $sightings = Sighting::where('status', 'approved')
            ->with('animalType')
            ->orderByDesc('sighted_at')
            ->get();

        return response()->json($sightings);
    }

    /**
     * 新規目撃情報を投稿
     */
    public function store(StoreSightingRequest $request)
    {
        $sighting = Sighting::create([
            'animal_type_id' => $request->animal_type_id,
            'sighted_at' => $request->sighted_at,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'note' => $request->note,
            'status' => 'pending',
        ]);

        return response()->json($sighting, 201);
    }

    /**
     * すべての目撃情報一覧を取得
     */
    public function adminIndex()
    {
        $sightings = Sighting::with(['animalType', 'reviewer'])
            ->orderByDesc('sighted_at')
            ->get();

        return response()->json($sightings);
    }

    /**
     * 目撃情報を更新
     */
    public function update(UpdateSightingRequest $request, Sighting $sighting)
    {
        $sighting->update($request->validated());

        $sighting->load('animalType');

        return response()->json($sighting);
    }

    /**
     * 目撃情報のレビュー
     */
    public function review(ReviewSightingRequest $request, Sighting $sighting)
    {
        $sighting->update([
            'status' => $request->status,
            'review_comment' => $request->review_comment,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        $sighting->load(['animalType', 'reviewer']);

        return response()->json($sighting);
    }
}
