<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSightingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'animal_type_id' => ['sometimes', 'exists:animal_types,id'],
            'sighted_at' => ['sometimes', 'date', 'before_or_equal:now'],
            'lat' => ['sometimes', 'numeric', 'between:-90,90'],
            'lng' => ['sometimes', 'numeric', 'between:-180,180'],
            'note' => ['sometimes', 'nullable', 'string', 'max:100'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'animal_type_id.exists' => '選択された動物種は無効です',
            'sighted_at.date' => '目撃日時の形式が不正です',
            'sighted_at.before_or_equal' => '未来の日時は指定できません',
            'lat.numeric' => '緯度は数値で指定してください',
            'lat.between' => '緯度の値が範囲外です',
            'lng.numeric' => '経度は数値で指定してください',
            'lng.between' => '経度の値が範囲外です',
            'note.max' => '詳細は100文字以内で入力してください',
        ];
    }
}
