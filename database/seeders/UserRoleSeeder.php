<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            // 'contributor',
            // 'editor',
            // 'copy_editor',
            // 'editor_in_chief',
            // 'admin',
        ];

        foreach ($roles as $role) {
            User::create([
                'first_name' => ucfirst($role),
                'middle_name' => null,
                'last_name' => 'User',
                'username' => $role . '_user',
                'sex' => 'Male',
                'email' => $role . '@example.com',
                'role' => $role,
                'phone_number' => '0800000000' . rand(1, 33),
                'educational_status' => 'Graduate',
                'area_of_study' => 'History',
                'level_of_study' => 'Bachelors',
                'state_of_origin' => 'Lagos',
                'lga_of_origin' => 'Ikeja',
                'state_of_residence' => 'Lagos',
                'lga_of_residence' => 'Ikeja',
                'ethnicity' => 'Yoruba',
                'country_of_residence' => 'Nigeria',
                'bio' => 'This is a sample bio for the ' . $role . ' user.',
                'email_verified_at' => now(),
                'password' => bcrypt('password'), // default password
            ]);
        }
    }
}
