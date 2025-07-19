<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftBiography extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'full_name',
        'title',
        'date_of_birth',
        'date_of_death',
        'place_of_birth',
        'place_of_death',
        'cause_of_death',
        'state_of_origin',
        'local_government_area',
        'ethnicity',
        'religion',
        'region',
        'biography_text',
        'how_to_cite',
        'references',
        'education',
        'occupations',
        'related_entries',
    ];

    protected $casts = [
        'education' => 'array',
        'occupations' => 'array',
        'related_entries' => 'array',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
