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
            'full_name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'date_of_death' => ['nullable', 'date'],
            'cause_of_death' => ['nullable', 'string', 'max:255'],
            'state_of_origin' => ['nullable', 'string', 'max:255'],
            'lga' => ['nullable', 'string', 'max:255'],
            'ethnic_group' => ['nullable', 'string', 'max:255'],
            'religion' => ['nullable', 'string', 'max:255'],
            'language' => ['nullable', 'string', 'max:255'],
            'region' => ['nullable', 'string', 'max:255'],
            'biography' => ['required', 'string'],
            'how_to_cite' => ['required', 'string'],
            'references' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'place_of_birth' => ['nullable', 'string', 'max:255'],
            'place_of_death' => ['nullable', 'string', 'max:255'],
            'related_entries' => ['nullable', 'array'],
            'related_entries.*' => ['exists:biographies,id'],
            'occupations' => ['nullable', 'array'],
            'occupations.*.title' => ['nullable', 'string', 'max:255'],
            'occupations.*.description' => ['nullable', 'string', 'max:255'],
            'occupations.*.start_date' => ['nullable', 'date'],
            'occupations.*.end_date' => ['nullable', 'date'],
            'education' => ['nullable', 'array'],
            'education.*.institution_name' => ['nullable', 'string', 'max:255'],
            'education.*.location' => ['nullable', 'string', 'max:255'],
            'education.*.notes' => ['nullable', 'string', 'max:255'],
            'education.*.start_date' => ['nullable', 'date'],
            'education.*.end_date' => ['nullable', 'date'],
        ];
    }
}
