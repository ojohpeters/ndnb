<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        
        Mail::to('admin@ndnb.ng')->send(new ContactFormMail($validated));

        // For demo, just return success
        return back()->with('success', 'Thank you for contacting us!');
    }
}
