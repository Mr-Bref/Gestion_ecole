<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'note'=> 'required',
            'matiere_id' => 'required|exists:matieres,id',
            'eleve_id' => 'required|exists:eleves,id',
        ]);

        $note = Note::create([
            'libelle' => $request->libelle,
            'matiere_id' => $request->matiere_id,
            'eleve_id' => $request->eleve_id,
        ]);

        return response()->json('Note ajouté avec succès', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'note'=> 'required',
            'matiere_id' => 'required|exists:matieres,id',
            'eleve_id' => 'required|exists:eleves,id',

        ]);

        $note = Note::where('id', (int) $id)->first();

            $note ->note = $request->note;
            $note ->matiere_id= $request->matiere_id;
            $note ->eleve_id = $request->eleve_id;

            $note->save();

            return response()->json('success', 'Modification effectué avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
