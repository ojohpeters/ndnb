<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // run the RolesSeeder to create roles
        $this->call(RolesSeeder::class);
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@example.com',
        ]);

        // Assign roles to the user
        $user->assignRole('admin');
        // $user->assignRole('editor');
        // $user->assignRole('contributor');
        // $user->assignRole('reviewer');
    }
}
