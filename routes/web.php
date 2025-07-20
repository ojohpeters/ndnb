<?php

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Biography;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\EssayController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BiographyController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\WorkplaceController;
use App\Http\Controllers\OccupationController;

Route::get('/', function () {
    $latestBiographies = Biography::latest()->take(6)->get();
$latestBiography = $latestBiographies[0] ?? null;

    // Get today's month and day
    $today = Carbon::today();
    $month = $today->format('m');
    $day = $today->format('d');
    // Detect database driver
    $driver = DB::getDriverName();

    if ($driver === 'sqlite') {
        $bornThisDay = Biography::whereNotNull('date_of_birth')
            ->whereRaw("strftime('%m-%d', date_of_birth) = ?", ["$month-$day"])
            ->get();
    } else {
        // MySQL, MariaDB, etc.
        $bornThisDay = Biography::whereNotNull('date_of_birth')
            ->whereRaw("DATE_FORMAT(date_of_birth, '%m-%d') = ?", ["$month-$day"])
            ->get();
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'latestBiography' => $latestBiography,
        'latestBiographies' => $latestBiographies,
        'bornThisDay' => $bornThisDay,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about-us', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/contact-us', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact-us', [ContactController::class, 'submit'])->name('contact.submit');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::get('/dashboard', function () {
    $user = auth()->user();

    // Redirect based on role
    switch ($user->role) {
        case 'admin':
            return redirect()->route('admin.dashboard');
        case 'editor':
            return redirect()->route('editor.dashboard');
        case 'copy_editor':
            return redirect()->route('copy-editor.dashboard');
        case 'editor_in_chief':
            return redirect()->route('editor-in-chief.dashboard');
        default:
            // Contributors dashboard
            $stats = [
                'totalBiographies' => Biography::where('created_by', $user->id)->count(),
                'drafts' => \App\Models\DraftBiography::where('created_by', $user->id)->count(),
                'underReview' => Biography::where('created_by', $user->id)->whereIn('status', ['submitted', 'under_review', 'copy_editing', 'editor_review'])->count(),
                'published' => Biography::where('created_by', $user->id)->where('status', 'published')->count(),
            ];
            return Inertia::render('Dashboard', ['stats' => $stats]);
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::get('/biographies', [BiographyController::class, 'index'])->name('biographies.index');
    Route::get('/biographies/create', [BiographyController::class, 'create'])->name('biographies.create');
    Route::post('/biographies', [BiographyController::class, 'store'])->name('biographies.store');
    Route::get('/biographies/{biography}/edit', [BiographyController::class, 'edit'])->name('biographies.edit');
    Route::post('/biographies/{biography}', [BiographyController::class, 'update'])->name('biographies.update');
    Route::delete('/biographies/{biography}', [BiographyController::class, 'destroy'])->name('biographies.destroy');

    Route::resource('education', EducationController::class);
    Route::resource('occupations', OccupationController::class);
    Route::resource('awards', AwardController::class);
    Route::resource('workplaces', WorkplaceController::class);

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    Route::get('/essays', [EssayController::class, 'index'])->name('essays.index');
    Route::get('/essays/create', [EssayController::class, 'create'])->name('essays.create');
    Route::post('/essays', [EssayController::class, 'store'])->name('essays.store');
    Route::get('/essays/{essay}/edit', [EssayController::class, 'edit'])->name('essays.edit');
    Route::post('/essays/{essay}', [EssayController::class, 'update'])->name('essays.update');
    Route::delete('/essays/{essay}', [EssayController::class, 'destroy'])->name('essays.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/users', [App\Http\Controllers\AdminController::class, 'users'])->name('users.index');
        Route::get('/users/create', [App\Http\Controllers\AdminController::class, 'createUser'])->name('users.create');
        Route::post('/users', [App\Http\Controllers\AdminController::class, 'storeUser'])->name('users.store');
        Route::get('/users/{user}/edit', [App\Http\Controllers\AdminController::class, 'editUser'])->name('users.edit');
        Route::put('/users/{user}', [App\Http\Controllers\AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [App\Http\Controllers\AdminController::class, 'destroyUser'])->name('users.destroy');
        
        // Admin biography management
        Route::get('/biographies', [App\Http\Controllers\AdminController::class, 'biographies'])->name('biographies.index');
        Route::get('/biographies/{biography}', [App\Http\Controllers\AdminController::class, 'showBiography'])->name('biographies.show');
        Route::post('/biographies/{biography}/approve', [App\Http\Controllers\AdminController::class, 'approveBiography'])->name('biographies.approve');
        Route::post('/biographies/{biography}/reject', [App\Http\Controllers\AdminController::class, 'rejectBiography'])->name('biographies.reject');
        Route::delete('/biographies/{biography}', [App\Http\Controllers\AdminController::class, 'deleteBiography'])->name('biographies.delete');
    });

    // Editor Dashboard Routes
    Route::prefix('editor')->name('editor.')->middleware('role:editor')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\EditorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/biography/{biography}', [App\Http\Controllers\EditorDashboardController::class, 'show'])->name('show');
        Route::get('/biography/{biography}/preview', [App\Http\Controllers\EditorDashboardController::class, 'preview'])->name('preview');
        Route::post('/biography/{biography}/approve', [App\Http\Controllers\EditorDashboardController::class, 'approve'])->name('approve');
        Route::post('/biography/{biography}/redraft', [App\Http\Controllers\EditorDashboardController::class, 'redraft'])->name('redraft');
        Route::post('/biography/{biography}/decline', [App\Http\Controllers\EditorDashboardController::class, 'decline'])->name('decline');
    });

    // Copy Editor Dashboard Routes
    Route::prefix('copy-editor')->name('copy-editor.')->middleware('role:copy_editor')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\CopyEditorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/biography/{biography}', [App\Http\Controllers\CopyEditorDashboardController::class, 'show'])->name('show');
        Route::post('/biography/{biography}/approve', [App\Http\Controllers\CopyEditorDashboardController::class, 'approve'])->name('approve');
        Route::post('/biography/{biography}/return', [App\Http\Controllers\CopyEditorDashboardController::class, 'returnToEditor'])->name('return');
    });

    // Editor-in-Chief Dashboard Routes
    Route::prefix('editor-in-chief')->name('editor-in-chief.')->middleware('role:editor_in_chief')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\EditorInChiefDashboardController::class, 'index'])->name('dashboard');
        Route::get('/biography/{biography}', [App\Http\Controllers\EditorInChiefDashboardController::class, 'show'])->name('show');
        Route::post('/biography/{biography}/publish', [App\Http\Controllers\EditorInChiefDashboardController::class, 'publish'])->name('publish');
        Route::post('/biography/{biography}/return', [App\Http\Controllers\EditorInChiefDashboardController::class, 'returnToEditor'])->name('return');
        Route::post('/biography/{biography}/decline', [App\Http\Controllers\EditorInChiefDashboardController::class, 'decline'])->name('decline');
    });

    Route::resource('biographies', BiographyController::class);
    Route::get('biographies-drafts', [BiographyController::class, 'drafts'])->name('biographies.drafts');
    Route::resource('essays', EssayController::class);
Route::get('essays-drafts', [EssayController::class, 'drafts'])->name('essays.drafts');
    Route::resource('projects', ProjectController::class);

    // Notification routes
    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('/', [App\Http\Controllers\NotificationController::class, 'index'])->name('index');
        Route::post('/{notification}/read', [App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('mark-read');
        Route::post('/mark-all-read', [App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('mark-all-read');
        Route::get('/unread-count', [App\Http\Controllers\NotificationController::class, 'getUnreadCount'])->name('unread-count');
    });
});

Route::get('/biographies', function(Request $request) {
    $query = Biography::query();

    // Search by name or title
    if ($search = $request->input('search')) {
        $query->where(function($q) use ($search) {
            $q->where('full_name', 'like', "%{$search}%")
              ->orWhere('title', 'like', "%{$search}%");
        });
    }

    // Filter by state_of_origin
    if ($state = $request->input('state_of_origin')) {
        $query->where('state_of_origin', $state);
    }

    $biographies = $query->latest()->paginate(10)->withQueryString();

    // For filter dropdown
    $states = Biography::select('state_of_origin')
        ->distinct()
        ->whereNotNull('state_of_origin')
        ->orderBy('state_of_origin')
        ->pluck('state_of_origin');

    return Inertia::render('Biographies/All', [
        'biographies' => $biographies,
        'filters' => $request->only(['search', 'state_of_origin']),
        'states' => $states,
    ]);
})->name('biographies.all');

Route::get('/biographies/{biography}', [BiographyController::class, 'show'])->name('biographies.show');

Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/essays/{essay}', [EssayController::class, 'show'])->name('essays.show');

require __DIR__ . '/auth.php';