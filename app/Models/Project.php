<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'launched_on',
    ];

    // route key
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function essays()
    {
        return $this->hasMany(Essay::class);
    }
}
