<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Niveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class NiveauxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $niveaux = Niveau::withCount('classes')->get();
        return response()->json(['niveaux' => $niveaux], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /**
         * Afficher les classeS d'un niveau. Exemple: Afficher les classes du niveau sixieme.
         */

         // Récupère les classes avec le nombre d'élèves comptés
         $classes = Classe::withCount('eleves')
         ->where('niveau_id', $id)
         ->get();

         $niveau = Niveau::findOrFail($id);

        
        
        return response()->json(['classes' => $classes,'libelle_niveau'=>$niveau->libelle], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}
}
