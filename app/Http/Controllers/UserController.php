<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Importation du modèle User
use Illuminate\Support\Facades\Hash; // Importation de la façade Hash

class UserController extends Controller
{
    public function creer_admin(Request $request)
    {
        // Vérifie s'il existe déjà un administrateur
        $admin = User::where('role', 'administrateur')->first();
        
        if ($admin) {
            return response()->json('Compte admin existant', 200); // Code de réponse HTTP 200
        }

        // Crée un nouvel administrateur
        $admin = User::create([
            'nom' => 'myadmin',
            'prenom' => 'admin',
            'sexe' => 'masculin', 
            'role' => 'administrateur',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'), // Hashage du mot de passe
        ]);

        return response()->json('Compte admin créé avec succès', 201); // Code de réponse HTTP 201
    }
}
