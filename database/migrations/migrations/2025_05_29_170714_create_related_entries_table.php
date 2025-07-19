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
        Schema::create('related_entries', function (Blueprint $table) {
        $table->id();
        $table->foreignId('biography_id')->constrained('biographies')->onDelete('cascade');
        $table->foreignId('related_biography_id')->constrained('biographies')->onDelete('cascade');
        $table->timestamps();
        $table->unique(['biography_id', 'related_biography_id']); // prevent duplicates
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('related_entries');
    }
};
