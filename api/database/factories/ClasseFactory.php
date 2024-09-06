<?php

namespace Database\Factories;

use App\Models\Annee_scolaire;
use App\Models\Classe;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class ClasseFactory extends Factory
{
    protected $model = Classe::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Récupère un niveau aléatoire
        $niveau = Niveau::inRandomOrder()->first();
        $niveauId = $niveau->id;
        $niveauLibelle = $niveau->libelle;

        // Récupère la dernière classe pour ce niveau
        $lastClass = Classe::where('niveau_id', $niveauId)
            ->orderBy('nom', 'desc')
            ->first();

        // Détermine la prochaine lettre
        if ($lastClass) {
            $lastLetter = preg_match('/[A-Z]$/', $lastClass->nom, $matches) ? $matches[0] : '';
            $nextLetter = chr(ord($lastLetter) + 1);
        } else {
            $nextLetter = 'A';
        }

        $nom = $niveauLibelle . $nextLetter;

        // Vérifie si le nom existe déjà, et passe à la lettre suivante si nécessaire
        while (Classe::where('nom', $nom)->exists()) {
            $nextLetter = chr(ord($nextLetter) + 1);
            $nom = $niveauLibelle . $nextLetter;
        }

        return [
            'nom' => $nom,
            'niveau_id' => $niveauId,
            'annee_scolaire_id' => Annee_scolaire::inRandomOrder()->first()->id,
        ];
    }
}
