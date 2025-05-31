<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEssayRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|unique:essays,title,' . $this->route('essay')->id,
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'date_published' => 'nullable|date',
            'project_id' => 'nullable|exists:projects,id',
        ];
    }
}
