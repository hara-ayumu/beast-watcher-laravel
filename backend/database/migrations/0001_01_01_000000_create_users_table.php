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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('表示名');
            $table->string('email')->unique()->nullable()->comment('メールアドレス');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable()->comment('パスワード（ハッシュ）');
            $table->string('line_id')->unique()->nullable()->comment('LINE ユーザーID');
            $table->string('line_name')->nullable()->comment('LINE 表示名');
            $table->string('role')->default('user')->comment('権限（admin / user）');
            $table->rememberToken();
            $table->foreignId('created_by')->nullable()->comment('作成者')->constrained('users');
            $table->foreignId('updated_by')->nullable()->comment('最終更新者')->constrained('users');
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
