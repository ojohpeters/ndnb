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

    ];

    // route key
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
