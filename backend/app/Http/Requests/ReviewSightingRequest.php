<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewSightingRequest extends FormRequest
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
            'status' => ['required', 'in:approved,rejected'],
            'review_comment' => ['required_if:status,rejected', 'nullable', 'string', 'max:200'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'ステータスを指定してください',
            'status.in' => 'ステータスは approved または rejected を指定してください',
            'review_comment.required_if' => '却下時はコメントを入力してください',
            'review_comment.max' => 'コメントは200文字以内で入力してください',
        ];
    }
}
