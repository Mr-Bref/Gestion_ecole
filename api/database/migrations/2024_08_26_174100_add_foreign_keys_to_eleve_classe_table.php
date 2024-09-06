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
        Schema::table('eleve_classe', function (Blueprint $table) {
            $table->foreign('eleve_id')
                ->references('id')
                ->on('eleves')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->foreign('classe_id')
                ->references('id')
                ->on('classes')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('eleve_classe', function (Blueprint $table) {
            $table->dropForeign(['eleve_id']); 
            $table->dropForeign(['classe_id']); 
        });
    }
};
