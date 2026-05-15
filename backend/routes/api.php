<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SightingController;
use Illuminate\Support\Facades\Route;

Route::get('/sightings', [SightingController::class, 'index']);
Route::post('/sightings', [SightingController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/admin/sightings', [SightingController::class, 'adminIndex']);
    Route::patch('/admin/sightings/{sighting}/review', [SightingController::class, 'review']);
});
