
<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\EditorNotificationMail;

class EditorDashboardController extends Controller
{
    public function index()
    {
        $biographies = Biography::with('user')
            ->where('status', 'submitted')
            ->orWhere('status', 'returned')
            ->latest()
            ->paginate(10);

        return Inertia::render('Editor/Dashboard', [
            'biographies' => $biographies
        ]);
    }

    public function show(Biography $biography)
    {
        $biography->load('user');
        
        return Inertia::render('Editor/Show', [
            'biography' => $biography
        ]);
    }

    public function preview(Biography $biography)
    {
        $biography->load('user');
        
        return Inertia::render('Editor/Preview', [
            'biography' => $biography
        ]);
    }

    public function approve(Request $request, Biography $biography)
    {
        $biography->update([
            'status' => 'copy_editing',
            'reviewed_by' => auth()->id(),
            'approved_at' => now(),
            'editor_notes' => $request->notes
        ]);

        // Send notification to copy editors
        // Mail::to('copyeditors@ndnb.org')->send(new EditorNotificationMail($biography, 'approved_for_copy_editing'));

        return redirect()->back()->with('success', 'Biography approved and sent to copy editors.');
    }

    public function redraft(Request $request, Biography $biography)
    {
        $request->validate([
            'notes' => 'required|string|max:1000'
        ]);

        $biography->update([
            'status' => 'draft',
            'editor_notes' => $request->notes,
            'reviewed_by' => auth()->id()
        ]);

        // Send notification to contributor
        // Mail::to($biography->user->email)->send(new EditorNotificationMail($biography, 'redraft'));

        return redirect()->back()->with('success', 'Biography returned to contributor for revisions.');
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

        // Send notification to contributor
        // Mail::to($biography->user->email)->send(new EditorNotificationMail($biography, 'declined'));

        return redirect()->back()->with('success', 'Biography has been declined.');
    }
}
