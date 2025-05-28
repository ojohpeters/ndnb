<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\EssayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BiographyController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\WorkplaceController;
use App\Http\Controllers\OccupationController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('biographies', BiographyController::class);
    Route::resource('education', EducationController::class);
    Route::resource('occupations', OccupationController::class);
    Route::resource('awards', AwardController::class);
    Route::resource('workplaces', WorkplaceController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('essays', EssayController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
