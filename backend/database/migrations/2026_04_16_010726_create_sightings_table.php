<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sightings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_type_id')->comment('動物種ID')->constrained('animal_types');
            $table->timestamp('sighted_at')->comment('目撃日時');
            $table->decimal('lat', 10, 8)->comment('緯度');
            $table->decimal('lng', 11, 8)->comment('経度');
            $table->string('note', 100)->nullable()->comment('詳細メモ');
            $table->string('status')->default('pending')->comment('ステータス（pending / approved / rejected）');
            $table->text('review_comment')->nullable()->comment('レビューコメント');
            $table->foreignId('reviewed_by')->nullable()->comment('レビュー実施者')->constrained('users');
            $table->timestamp('reviewed_at')->nullable()->comment('レビュー日時');
            $table->foreignId('created_by')->nullable()->comment('投稿者')->constrained('users');
            $table->foreignId('updated_by')->nullable()->comment('最終更新者')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sightings');
    }
};
