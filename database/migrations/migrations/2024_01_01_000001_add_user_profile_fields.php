
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->after('name');
            $table->enum('sex', ['Male', 'Female'])->after('username');
            $table->string('phone_number')->after('email');
            $table->enum('educational_status', ['Student', 'Graduate'])->after('phone_number');
            $table->enum('area_of_study', [
                'Administration',
                'Agriculture',
                'Arts & Humanities',
                'Education',
                'Engineering / Technology',
                'Environmental',
                'Law',
                'Medical / Pharmaceutical / Health Sciences',
                'Sciences',
                'Social & Management Sciences'
            ])->after('educational_status');
            $table->enum('level_of_study', ['NCE', 'ND', 'HND', 'Bachelors', 'Masters', 'PhD'])->after('area_of_study');
            $table->string('state_of_origin')->after('level_of_study');
            $table->string('lga_of_origin')->after('state_of_origin');
            $table->string('state_of_residence')->after('lga_of_origin');
            $table->string('lga_of_residence')->after('state_of_residence');
            $table->string('ethnicity')->after('lga_of_residence');
            $table->string('country_of_residence')->default('Nigeria')->after('ethnicity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username',
                'sex',
                'phone_number',
                'educational_status',
                'area_of_study',
                'level_of_study',
                'state_of_origin',
                'lga_of_origin',
                'state_of_residence',
                'lga_of_residence',
                'ethnicity',
                'country_of_residence',
            ]);
        });
    }
};
