<?php

namespace Database\Factories;

use App\Models\Classe;
use App\Models\Eleve;
use App\Models\Tuteur;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Eleve>
 */
class EleveFactory extends Factory
{
    protected $model = Eleve::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Create a new user
            'matricule' => $this->faker->unique()->numerify('MAT-#####'),
            'edu_master' => $this->faker->numerify('#########'), // Generates a 9-digit number like 897414689
            'date_naissance' => $this->faker->date(),
            'lieu_naissance' => $this->faker->city(),
        ];
    }

    /**
     * Indicate that the eleve should be associated with one or more classes.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withClasses(int $count = 1): Factory
    {
        return $this->afterCreating(function (Eleve $eleve) use ($count) {
            // Retrieve a random set of class IDs, limited by the provided count
            $classes = Classe::inRandomOrder()->take($count)->pluck('id');

            // If any classes were retrieved, attach them to the eleve
            if ($classes->isNotEmpty()) {
                $eleve->classes()->attach($classes);
            }
        });
    }

    /**
     * Indicate that the eleve should be associated with up to two tutors.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withTuteurs(int $count = 2): Factory
    {
        return $this->afterCreating(function (Eleve $eleve) use ($count) {
            // Retrieve a random set of tutor IDs, limited by the provided count
            $tuteurs = Tuteur::inRandomOrder()->take($count)->pluck('id');

            // If any tutors were retrieved, attach them to the eleve
            if ($tuteurs->isNotEmpty()) {
                $eleve->tuteurs()->attach($tuteurs);
            }
        });
    }
}
