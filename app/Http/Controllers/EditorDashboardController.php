
<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\EditorNotificationMail;
use App\Services\NotificationService;

class EditorDashboardController extends Controller
{
    public function index()
    {
        $biographies = Biography::with(['creator', 'editor'])
            ->whereIn('status', ['submitted', 'needs_redraft'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Editor/Dashboard', [
            'biographies' => $biographies
        ]);
    }

    public function show(Biography $biography)
    {
        $biography->load(['creator', 'editor']);

        return Inertia::render('Editor/Show', [
            'biography' => $biography
        ]);
    }

    public function preview(Biography $biography)
    {
        $biography->load(['creator', 'editor']);

        return Inertia::render('Editor/Preview', [
            'biography' => $biography
        ]);
    }

    public function approve(Request $request, Biography $biography)
    {
        $biography->update([
            'status' => 'editor_approved',
            'editor_id' => auth()->id(),
            'reviewed_at' => now(),
            'editor_notes' => $request->notes
        ]);

        // Send notification to contributor
        NotificationService::notifyBiographyApproved($biography, $request->notes);

        return redirect()->back()->with('success', 'Biography approved and sent to copy editors.');
    }

    public function redraft(Request $request, Biography $biography)
    {
        $request->validate([
            'notes' => 'required|string|max:1000'
        ]);

        $biography->update([
            'status' => 'needs_redraft',
            'editor_notes' => $request->notes,
            'editor_id' => auth()->id(),
            'reviewed_at' => now()
        ]);

        // Send notification to contributor
        NotificationService::notifyBiographyReturned($biography, $request->notes);

        return redirect()->back()->with('success', 'Biography returned to contributor for revisions.');
    }

    public function decline(Request $request, Biography $biography)
    {
        $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        $biography->update([
            'status' => 'declined',
            'decline_reason' => $request->reason,
            'editor_id' => auth()->id(),
            'reviewed_at' => now()
        ]);

        // Send notification to contributor
        NotificationService::notifyBiographyDeclined($biography, $request->reason);

        return redirect()->back()->with('success', 'Biography has been declined.');
    }
}
