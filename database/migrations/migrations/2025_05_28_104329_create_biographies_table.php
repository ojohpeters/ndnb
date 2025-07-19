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
        Schema::create('biographies', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('slug')->unique();
            $table->string('title')->nullable(); // e.g. "Professor", "Chief", etc.
            $table->date('date_of_birth')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_death')->nullable();
             $table->string('place_of_death')->nullable();
            $table->string('cause_of_death')->nullable();
            $table->string('state_of_origin')->nullable();
            $table->string('lga')->nullable();
            $table->string('ethnic_group')->nullable();
            $table->string('religion')->nullable();
            $table->string('language')->nullable();
            $table->string('region')->nullable();
            $table->longText('biography');
             $table->longText('how_to_cite');
             $table->longText('references');
            $table->json('bibliography')->nullable();
            $table->text('further_reading')->nullable();
            $table->string('photo')->nullable(); // path to image
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biographies');
    }
};