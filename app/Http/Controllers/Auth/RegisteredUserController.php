<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'sex' => 'required|in:Male,Female',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone_number' => 'required|string|max:20|unique:'.User::class,
            'educational_status' => 'required|in:Student,Graduate',
            'area_of_study' => 'required|string|max:255',
            'level_of_study' => 'required|in:NCE,ND,HND,Bachelors,Masters,PhD',
            'state_of_origin' => 'required|string|max:255',
            'lga_of_origin' => 'required_if:country_of_residence,Nigeria|nullable|string|max:255',
            'state_of_residence' => 'required_if:country_of_residence,Nigeria|nullable|string|max:255',
            'lga_of_residence' => 'required_if:country_of_residence,Nigeria|nullable|string|max:255',
            'ethnicity' => 'required_if:country_of_residence,Nigeria|nullable|string|max:255',
            'country_of_residence' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create full name with optional middle name
        $fullName = $request->first_name;
        if ($request->middle_name) {
            $fullName .= ' ' . $request->middle_name;
        }
        $fullName .= ' ' . $request->last_name;

        $user = User::create([
            'name' => $fullName,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'sex' => $request->sex,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'educational_status' => $request->educational_status,
            'area_of_study' => $request->area_of_study,
            'level_of_study' => $request->level_of_study,
            'state_of_origin' => $request->state_of_origin,
            'lga_of_origin' => $request->lga_of_origin,
            'state_of_residence' => $request->state_of_residence,
            'lga_of_residence' => $request->lga_of_residence,
            'ethnicity' => $request->ethnicity,
            'country_of_residence' => $request->country_of_residence,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
