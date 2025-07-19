
<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditorInChiefDashboardController extends Controller
{
    public function index()
    {
        $biographies = Biography::with('user')
            ->where('status', 'editor_review')
            ->latest()
            ->paginate(10);

        return Inertia::render('EditorInChief/Dashboard', [
            'biographies' => $biographies
        ]);
    }

    public function show(Biography $biography)
    {
        $biography->load('user');
        
        return Inertia::render('EditorInChief/Show', [
            'biography' => $biography
        ]);
    }

    public function publish(Request $request, Biography $biography)
    {
        $biography->update([
            'status' => 'published',
            'published_at' => now(),
            'reviewed_by' => auth()->id(),
            'editor_notes' => $request->notes
        ]);

        // Send congratulations to contributor
        // Mail::to($biography->user->email)->send(new EditorNotificationMail($biography, 'published'));

        return redirect()->back()->with('success', 'Biography has been published!');
    }

    public function returnToEditor(Request $request, Biography $biography)
    {
        $request->validate([
            'notes' => 'required|string|max:1000'
        ]);

        $biography->update([
            'status' => 'submitted',
            'editor_notes' => $request->notes,
            'reviewed_by' => auth()->id()
        ]);

        return redirect()->back()->with('success', 'Biography returned to category editor.');
    }

    public function decline(Request $request, Biography $biography)
    {
        $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        $biography->update([
            'status' => 'declined',
            'editor_notes' => $request->reason,
            'reviewed_by' => auth()->id()
        ]);

        return redirect()->back()->with('success', 'Biography has been declined.');
    }
}
