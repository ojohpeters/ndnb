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
            $table->string('first_name')->after('name');
            $table->string('middle_name')->nullable()->after('first_name');
            $table->string('last_name')->after('middle_name');
            $table->string('username')->unique()->after('last_name');
            $table->enum('sex', ['Male', 'Female'])->after('username');
            $table->string('phone_number')->unique()->after('email');
            $table->enum('educational_status', ['Student', 'Graduate'])->after('phone_number');
            $table->string('area_of_study')->after('educational_status');
            $table->enum('level_of_study', ['NCE', 'ND', 'HND', 'Bachelors', 'Masters', 'PhD'])->after('area_of_study');
            $table->string('state_of_origin')->after('level_of_study');
            $table->string('lga_of_origin')->nullable()->after('state_of_origin');
            $table->string('state_of_residence')->nullable()->after('lga_of_origin');
            $table->string('lga_of_residence')->nullable()->after('state_of_residence');
            $table->string('ethnicity')->nullable()->after('lga_of_residence');
            $table->string('country_of_residence')->default('Nigeria')->after('ethnicity');
            $table->text('bio')->nullable()->after('country_of_residence');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name', 'middle_name', 'last_name', 'username', 'sex',
                'phone_number', 'educational_status', 'area_of_study', 'level_of_study',
                'state_of_origin', 'lga_of_origin', 'state_of_residence', 'lga_of_residence',
                'ethnicity', 'country_of_residence', 'bio'
            ]);
        });
    }
};