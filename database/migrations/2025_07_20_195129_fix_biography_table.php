
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
        Schema::table('biographies', function (Blueprint $table) {
            // Ensure biography column exists and is nullable initially
            if (!Schema::hasColumn('biographies', 'biography')) {
                $table->longText('biography')->nullable()->after('region');
            }
            
            // If biography_text exists, copy data and then drop it
            if (Schema::hasColumn('biographies', 'biography_text')) {
                // Copy data from biography_text to biography if biography is empty
                DB::statement('UPDATE biographies SET biography = biography_text WHERE biography IS NULL AND biography_text IS NOT NULL');
                
                // Drop biography_text column
                $table->dropColumn('biography_text');
            }
            
            // Make biography column required
            $table->longText('biography')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('biographies', function (Blueprint $table) {
            // Re-add biography_text column
            $table->longText('biography_text')->nullable()->after('biography');
            
            // Copy data from biography to biography_text
            DB::statement('UPDATE biographies SET biography_text = biography WHERE biography_text IS NULL');
            
            // Drop biography column
            $table->dropColumn('biography');
        });
    }
};
