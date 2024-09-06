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
        Schema::create('eleve_tuteur', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('eleve_id')->nullable();
            $table->unsignedBigInteger('tuteur_id')->nullable();
            $table->unique(['eleve_id', 'tuteur_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleve_tuteur');
    }
};
