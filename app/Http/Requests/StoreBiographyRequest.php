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
            'draft_id' => 'nullable|integer|exists:draft_biographies,id',
            'full_name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'date_of_death' => 'nullable|date|after_or_equal:date_of_birth',
            'place_of_birth' => 'nullable|string|max:255',
            'place_of_death' => 'nullable|string|max:255',
            'cause_of_death' => 'nullable|string|max:255',
            'state_of_origin' => 'nullable|string|max:255',
            'lga' => 'nullable|string|max:255',
            'ethnic_group' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'region' => 'nullable|string|max:255',
            'biography' => 'required|string|max:4000', // Approximately 500 words
            'how_to_cite' => 'nullable|string',
            'references' => 'nullable|string',
            'status' => 'required|in:draft,submitted',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'related_entries' => 'nullable|array',
            'related_entries.*' => 'exists:biographies,id',
            'education' => 'nullable|array',
            'education.*.institution_name' => 'nullable|string|max:255',
            'education.*.location' => 'nullable|string|max:255',
            'education.*.notes' => 'nullable|string',
            'education.*.start_date' => 'nullable|date',
            'education.*.end_date' => 'nullable|date|after_or_equal:education.*.start_date',
            'occupations' => 'nullable|array',
            'occupations.*.title' => 'nullable|string|max:255',
            'occupations.*.description' => 'nullable|string',
            'occupations.*.start_date' => 'nullable|date',
            'occupations.*.end_date' => 'nullable|date|after_or_equal:occupations.*.start_date',
        ];
    }
}