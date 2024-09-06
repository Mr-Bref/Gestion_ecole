<?php

namespace Database\Seeders;

use App\Models\Tuteur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TuteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tuteur::factory()->count(20)->create();
    }
}
