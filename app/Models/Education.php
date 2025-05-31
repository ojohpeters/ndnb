<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    /** @use HasFactory<\Database\Factories\EducationFactory> */
    use HasFactory;

    protected $fillable = [
        'biography_id', 'institution_name', 'location', 'notes', 'start_date', 'end_date'
    ];
    
}
