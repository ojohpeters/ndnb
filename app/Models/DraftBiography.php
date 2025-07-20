<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DraftBiography extends Model
{
    use HasFactory;

    protected $table = 'draft_biographies';

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
        'language',
        'region',
        'biography_text',
        'how_to_cite',
        'references',
        'education',
        'occupations',
        'related_entries',
        'slug',
        'photo',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_death' => 'date',
        'education' => 'array',
        'occupations' => 'array',
        'related_entries' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($draftBiography) {
            if (empty($draftBiography->slug)) {
                $draftBiography->slug = \Illuminate\Support\Str::slug($draftBiography->full_name);
                $originalSlug = $draftBiography->slug;
                $count = 1;
                while (static::where('slug', $draftBiography->slug)->exists()) {
                    $draftBiography->slug = $originalSlug . '-' . $count++;
                }
            }
        });
    }
}
