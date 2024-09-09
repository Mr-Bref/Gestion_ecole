<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ClasseController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //TODO

        $classes = Classe::all();

        return response()->json(["classes" => $classes], 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //TODO
        $request->validate([
            'nom' => ['required', 'string', 'max:30'],
            'effectif' => ['required', 'numeric', 'min:1', 'max:255'],
        ]);

        $classe = Classe::create([
            'nom' => $request->nom,
            'effectif' => $request->effectif,
        ]);

        return response()->json([
            'classe' => $classe,
            'message' => 'Nouvelle classe',
            'success' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //TODO

        $classe = Classe::with([
            'eleves' => function ($query) {
                $query->select('eleves.id', 'user_id', 'matricule', 'date_naissance', 'lieu_naissance')
                    ->with(['users']);
                    
            },
            'niveaux' => function ($query) {
                $query->select();
            },
        ])
            ->select('id', 'nom', 'niveau_id', 'annee_scolaire_id')
            ->find($id)
            ;

        if ($classe == null) {
            return response()->json(["message" => "classe introuvable"], Response::HTTP_NOT_FOUND);
        }

        // Remove 'pivot' data from the 'eleves'
        $classe->eleves->transform(function ($eleve) {
            // Merge user fields into eleve object
            if ($eleve->users) {
                $eleve->nom = $eleve->users->nom;
                $eleve->prenom = $eleve->users->prenom;
                $eleve->email = $eleve->users->email;
                $eleve->sexe = $eleve->users->sexe;
                $eleve->statut = $eleve->users->statut;
                $eleve->verified = $eleve->users->verified;
                $eleve->photo = Storage::url($eleve->users->photo);
                $eleve->adresse = $eleve->users->adresse;
                unset($eleve->users); // Remove the nested 'user' object
            }
            unset($eleve->pivot);  // Remove the 'pivot' data
            return $eleve;
        });

        return response()->json(["classe" => $classe], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JSONResponse
    {
        //TODO
        $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'effectif' => ['required', 'numeric', 'min:1', 'max:255']
        ]);

        $affectedRow = Classe::where('id', $id)->update([
            'nom' => $request->nom,
            'effectif' => $request->effectif,
        ]);

        if ($affectedRow === 0) {
            return response()->json(["message" => "No classe found with the specified ID"], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['message' => 'Classe info updated successfully.'], Response::HTTP_OK);
    }
}
