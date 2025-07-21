<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\NotificationService;

class CopyEditorDashboardController extends Controller
{
    public function index()
    {
        $biographies = Biography::with(['creator', 'editor', 'copyEditor'])
            ->where('status', 'editor_approved')
            ->latest()
            ->paginate(10);

        return Inertia::render('CopyEditor/Dashboard', [
            'biographies' => $biographies
        ]);
    }

    public function show(Biography $biography)
    {
        $biography->load(['creator', 'editor', 'copyEditor']);

        return Inertia::render('CopyEditor/Show', [
            'biography' => $biography
        ]);
    }

    public function approve(Request $request, Biography $biography)
    {
        $biography->update([
            'status' => 'copyeditor_approved',
            'copy_editor_id' => auth()->id(),
            'copyeditor_notes' => $request->notes,
            'reviewed_at' => now()
        ]);

        // Notify Editor-in-Chief
        NotificationService::notifyCopyEditingComplete($biography);

        return redirect()->back()->with('success', 'Biography approved and sent to Editor-in-Chief.');
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
}