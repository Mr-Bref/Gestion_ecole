<?php

namespace Database\Seeders;

use App\Models\Eleve;
use Illuminate\Database\Seeder;

class EleveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Eleve::factory()
            ->count(1000)           // Create 100 Eleve records
            ->withClasses()        // Associate each Eleve with classes
            ->withTuteurs()        // Associate each Eleve with up to 2 tutors
            ->create();
    }
}
