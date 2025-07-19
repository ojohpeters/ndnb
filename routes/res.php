<?php

$stats = [
        'totalBiographies' => Biography::where('created_by', $user->id)->count(),
        'drafts' => Biography::where('created_by', $user->id)->where('status', 'draft')->count(),
        'underReview' => Biography::where('created_by', $user->id)->whereIn('status', ['submitted', 'under_review', 'copy_editing', 'editor_review'])->count(),
        'published' => Biography::where('created_by', $user->id)->where('status', 'published')->count(),
    ];

