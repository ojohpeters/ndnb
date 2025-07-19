<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'totalUsers' => User::count(),
            'contributors' => User::where('role', 'contributor')->count(),
            'editors' => User::where('role', 'editor')->count(),
            'copyEditors' => User::where('role', 'copy_editor')->count(),
            'editorInChief' => User::where('role', 'editor_in_chief')->count(),
        ];

        $users = User::latest()->paginate(10);

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
            'users' => $users,
        ]);
    }

    public function createUser()
    {
        return inertia('Admin/CreateUser');
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:contributor,editor,copy_editor,editor_in_chief',
            'phone' => 'nullable|string|max:20',
            'institution' => 'nullable|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'institution' => $request->institution,
            'field_of_study' => $request->field_of_study,
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'User created successfully!');
    }

    public function editUser(User $user)
    {
        return inertia('Admin/EditUser', [
            'user' => $user,
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:contributor,editor,copy_editor,editor_in_chief',
            'phone' => 'nullable|string|max:20',
            'institution' => 'nullable|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
        ]);

        $user->update($request->only([
            'first_name', 'last_name', 'email', 'role', 'phone', 'institution', 'field_of_study'
        ]));

        return redirect()->route('admin.dashboard')->with('success', 'User updated successfully!');
    }

    public function destroyUser(User $user)
    {
        if ($user->role === 'admin') {
            return back()->with('error', 'Cannot delete admin user!');
        }

        $user->delete();
        return redirect()->route('admin.dashboard')->with('success', 'User deleted successfully!');
    }
}
