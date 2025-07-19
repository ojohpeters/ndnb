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
        'maiden_name',
        'birth_year',
        'death_year',
        'date_of_birth',
        'date_of_death',
        'place_of_birth',
        'place_of_death',
        'cause_of_death',
        'state_of_origin',
        'local_government_area',
        'ethnicity',
        'religion',
        'occupation',
        'biography_text',
        'written_by',
        'region',
        'photo',
        'how_to_cite',
        'references',
        'status',
        'editor_notes',
        'submitted_at',
        'approved_at',
        'published_at',
        'reviewed_by',
    ];

    protected $casts = [
        'bibliography' => 'array',
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

    public function education()
    {
        return $this->hasMany(Education::class);
    }

    public function occupations()
    {
        return $this->hasMany(Occupation::class);
    }
    
}