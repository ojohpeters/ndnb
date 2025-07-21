<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biography extends Model
{
    /** @use HasFactory<\Database\Factories\BiographyFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'created_by',
        'full_name',
        'slug',
        'title',
        'date_of_birth',
        'place_of_birth',
        'date_of_death',
        'place_of_death',
        'cause_of_death',
        'state_of_origin',
        'local_government_area',
        'ethnic_group',
        'religion',
        'language',
        'region',
        'biography_text',
        'biography',
        'how_to_cite',
        'references',
        'status',
        'submitted_at',
        'reviewed_at',
        'published_at',
        'birth_year',
        'death_year',
        'photo',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_death' => 'date',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'published_at' => 'datetime',
        'birth_year' => 'integer',
        'death_year' => 'integer',
        'biography' => 'string', // Preserve as raw text for markdown
    ];

    // route key
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function relatedBiographies()
    {
        return $this->belongsToMany(
            Biography::class,
            'related_entries',
            'biography_id',
            'related_biography_id'
        );
    }

    public function relatedTo()
    {
        return $this->belongsToMany(
            Biography::class,
            'related_entries',
            'related_biography_id',
            'biography_id'
        );
    }

    // Accessor to get raw biography text (preserves markdown)
    public function getBiographyTextAttribute()
    {
        return $this->biography_text;
    }

    // Method to get formatted HTML (for display purposes)
    public function getBiographyHtmlAttribute()
    {
        // You could use a markdown parser here if needed for HTML output
        return $this->biography_text;
    }

    public function education()
    {
        return $this->hasMany(Education::class);
    }

    public function occupations()
    {
        return $this->hasMany(Occupation::class);
    }

}