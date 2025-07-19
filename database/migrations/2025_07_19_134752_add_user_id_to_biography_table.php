
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
            $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
            $table->string('status')->default('draft')->after('references');
            $table->timestamp('submitted_at')->nullable()->after('status');
            $table->timestamp('approved_at')->nullable()->after('submitted_at');
            $table->timestamp('published_at')->nullable()->after('approved_at');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null')->after('published_at');
            $table->text('editor_notes')->nullable()->after('reviewed_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('biographies', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['reviewed_by']);
            $table->dropColumn([
                'user_id',
                'status',
                'submitted_at',
                'approved_at',
                'published_at',
                'reviewed_by',
                'editor_notes'
            ]);
        });
    }
};
