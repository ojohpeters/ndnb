<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Essay extends Model
{
    /** @use HasFactory<\Database\Factories\EssayFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'author',
        'date_published',
        'project_id',
        'status',
        'submitted_at',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function getExcerptAttribute(): string
    {
        return strip_tags(substr($this->content, 0, 200)) . '...';
    }
}