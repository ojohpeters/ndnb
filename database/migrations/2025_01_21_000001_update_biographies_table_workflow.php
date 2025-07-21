
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('biographies', function (Blueprint $table) {
            // Update status enum
            $table->enum('status', [
                'draft',
                'submitted',
                'needs_redraft',
                'editor_approved',
                'copyeditor_approved',
                'eic_approved',
                'returned_to_editor',
                'published',
                'declined'
            ])->default('draft')->change();

            // Add new nullable columns
            $table->unsignedBigInteger('editor_id')->nullable()->after('reviewed_by');
            $table->unsignedBigInteger('copy_editor_id')->nullable()->after('editor_id');
            $table->unsignedBigInteger('editor_in_chief_id')->nullable()->after('copy_editor_id');
            $table->text('copyeditor_notes')->nullable()->after('editor_notes');
            $table->text('eic_notes')->nullable()->after('copyeditor_notes');
            $table->text('decline_reason')->nullable()->after('eic_notes');

            // Add foreign key constraints
            $table->foreign('editor_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('copy_editor_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('editor_in_chief_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('biographies', function (Blueprint $table) {
            // Drop foreign keys
            $table->dropForeign(['editor_id']);
            $table->dropForeign(['copy_editor_id']);
            $table->dropForeign(['editor_in_chief_id']);

            // Drop new columns
            $table->dropColumn([
                'editor_id',
                'copy_editor_id',
                'editor_in_chief_id',
                'copyeditor_notes',
                'eic_notes',
                'decline_reason'
            ]);

            // Revert status enum to original
            $table->enum('status', [
                'draft',
                'submitted',
                'under_review',
                'copy_editing',
                'editor_review',
                'published',
                'declined',
                'returned'
            ])->default('draft')->change();
        });
    }
};
