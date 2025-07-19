
<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Biography;
use App\Models\User;

class NotificationService
{
    public static function notifyBiographySubmitted(Biography $biography)
    {
        // Notify editors about new submission
        $editors = User::role('editor')->get();
        
        foreach ($editors as $editor) {
            Notification::create([
                'user_id' => $editor->id,
                'biography_id' => $biography->id,
                'type' => 'submission_received',
                'title' => 'New Biography Submission',
                'message' => "A new biography for '{$biography->full_name}' has been submitted by {$biography->creator->first_name} {$biography->creator->last_name}.",
                'data' => [
                    'contributor_name' => $biography->creator->first_name . ' ' . $biography->creator->last_name,
                    'biography_title' => $biography->full_name
                ]
            ]);
        }
    }

    public static function notifyBiographyApproved(Biography $biography, $editorNotes = null)
    {
        Notification::create([
            'user_id' => $biography->created_by,
            'biography_id' => $biography->id,
            'type' => 'biography_approved',
            'title' => 'Biography Approved for Copy Editing',
            'message' => "Great news! Your biography for '{$biography->full_name}' has been approved and sent to copy editors for review.",
            'data' => [
                'editor_notes' => $editorNotes,
                'biography_title' => $biography->full_name
            ]
        ]);
    }

    public static function notifyBiographyDeclined(Biography $biography, $reason)
    {
        Notification::create([
            'user_id' => $biography->created_by,
            'biography_id' => $biography->id,
            'type' => 'biography_declined',
            'title' => 'Biography Declined',
            'message' => "We regret to inform you that your biography for '{$biography->full_name}' has been declined. Please see the reason provided below.",
            'data' => [
                'reason' => $reason,
                'biography_title' => $biography->full_name
            ]
        ]);
    }

    public static function notifyBiographyReturned(Biography $biography, $notes)
    {
        Notification::create([
            'user_id' => $biography->created_by,
            'biography_id' => $biography->id,
            'type' => 'biography_returned',
            'title' => 'Biography Needs Revision',
            'message' => "Your biography for '{$biography->full_name}' needs some revisions. Please review the editor's notes and resubmit when ready.",
            'data' => [
                'editor_notes' => $notes,
                'biography_title' => $biography->full_name
            ]
        ]);
    }

    public static function notifyBiographyPublished(Biography $biography)
    {
        Notification::create([
            'user_id' => $biography->created_by,
            'biography_id' => $biography->id,
            'type' => 'biography_published',
            'title' => 'Biography Published!',
            'message' => "Congratulations! Your biography for '{$biography->full_name}' has been published. Keep building — feel free to create another biography.",
            'data' => [
                'biography_title' => $biography->full_name,
                'published_url' => route('biographies.show', $biography->slug)
            ]
        ]);
    }

    public static function notifyCopyEditingComplete(Biography $biography)
    {
        // Notify Editor-in-Chief
        $editorInChief = User::role('editor-in-chief')->first();
        
        if ($editorInChief) {
            Notification::create([
                'user_id' => $editorInChief->id,
                'biography_id' => $biography->id,
                'type' => 'copy_editing_complete',
                'title' => 'Biography Ready for Final Review',
                'message' => "The biography for '{$biography->full_name}' has completed copy editing and is ready for your final review.",
                'data' => [
                    'biography_title' => $biography->full_name
                ]
            ]);
        }
    }
}
