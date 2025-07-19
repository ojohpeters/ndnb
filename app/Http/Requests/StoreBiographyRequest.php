<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBiographyRequest extends FormRequest
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
            'full_name' => 'required|string|max:255',
            'maiden_name' => 'nullable|string|max:255',
            'birth_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'death_year' => 'nullable|integer|min:1800|max:' . date('Y') . '|gte:birth_year',
            'date_of_birth' => 'nullable|date',
            'date_of_death' => 'nullable|date|after_or_equal:date_of_birth',
            'place_of_birth' => 'nullable|string|max:255',
            'place_of_death' => 'nullable|string|max:255',
            'state_of_origin' => 'nullable|string|max:255',
            'local_government_area' => 'nullable|string|max:255',
            'ethnicity' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'biography_text' => 'required|string',
            'written_by' => 'nullable|string|max:255',
            'how_to_cite' => 'nullable|string',
            'references' => 'nullable|string',
            'status' => 'nullable|in:draft,submitted,under_review,copy_editing,editor_review,published,declined,returned',
            'submitted_at' => 'nullable|date',
        ];
    }
}