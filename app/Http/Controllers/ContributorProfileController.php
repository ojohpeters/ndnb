
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContributorProfile;

class ContributorProfileController extends Controller
{
    public function show()
    {
        $profile = auth()->user()->contributorProfile;
        
        return Inertia::render('ContributorProfile', [
            'profile' => $profile
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bio' => 'required|string|max:500',
        ]);

        auth()->user()->contributorProfile()->create([
            'bio' => $request->bio,
        ]);

        return redirect()->back()->with('success', 'Profile created successfully.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'bio' => 'required|string|max:500',
        ]);

        auth()->user()->contributorProfile()->update([
            'bio' => $request->bio,
        ]);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
