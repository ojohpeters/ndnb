<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biography extends Model
{
    /** @use HasFactory<\Database\Factories\BiographyFactory> */
    use HasFactory;

    protected $fillable = [
        'full_name',
        'slug',
        'title',
        'date_of_birth',
        'date_of_death',
        'place_of_birth',
        'place_of_death',
        'cause_of_death',
        'state_of_origin',
        'lga',
        'ethnic_group',
        'religion',
        'language',
        'region',
        'biography',
        'photo',
        'created_by',
        'how_to_cite',
        'references',
    ];

    // route key
    public function getRouteKeyName(): string
    {
        return 'slug';
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
