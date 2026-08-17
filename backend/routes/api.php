<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LineAuthController;
use App\Http\Controllers\Api\SightingController;
use Illuminate\Support\Facades\Route;

Route::get('/sightings', [SightingController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('web')->group(function () {
    Route::get('/auth/line/redirect', [LineAuthController::class, 'redirect']);
    Route::get('/auth/line/callback', [LineAuthController::class, 'callback']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/sightings', [SightingController::class, 'store']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/sightings', [SightingController::class, 'adminIndex']);
        Route::patch('/admin/sightings/{sighting}', [SightingController::class, 'update']);
        Route::patch('/admin/sightings/{sighting}/review', [SightingController::class, 'review']);
    });
});
