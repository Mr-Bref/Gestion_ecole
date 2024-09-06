<?php
namespace App\Http\Controllers;

use App\Models\Eleve;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eleves = Eleve::with('users')->get();

        return response()->json($eleves);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'edumaster' => 'nullable',
        'date_naissance' => 'required|date',
        'lieu_naissance' => 'required',
        'classe_id' => 'required|exists:classes,id',
        'tuteur_id' => 'nullable|exists:tuteurs,id', // optional
        'photo' => 'nullable|image', // optional
        'nom' => 'required',
        'prenom' => 'required',
        'sexe' => 'required',
        'adresse' => 'required',
        'email' => 'nullable|email', // optional
        'telephone' => 'nullable', // optional
    ]);

    // Generate unique matricule
    do {
        $matricule = 'MAT-' . str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);
    } while (Eleve::where('matricule', $matricule)->exists());

    // Create user
    $user = User::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'sexe' => $request->sexe,
        'telephone' => $request->telephone ?? null,
        'adresse' => $request->adresse,
        'email' => $request->email ?? null,
        'user_name' => $matricule.'_'.substr($request->nom, 0, 2),
        'password' => bcrypt('defaultpassword'), // Handle password securely
        'photo' => $path_photo ?? null,
    ]);

    // Handle photo
    $path_photo = null;
    if ($request->hasFile('photo')) {
        $path_photo = Storage::putFile('public/photos', $request->file('photo'));
        $path_photo = explode('/', $path_photo)[2];
    }

    // Create eleve
    $eleve = Eleve::create([
        'user_id' => $user->id,
        'matricule' => $matricule,
        'edu_master' => $request->edumaster,
        'date_naissance' => $request->date_naissance,
        'lieu_naissance' => $request->lieu_naissance,
        
    ]);

    // Add classe to eleve
    $eleve->classes()->attach($request->classe_id);
    //Add tuteur to eleve
    if ($request->tuteur_id) {
        $eleve->tuteurs()->attach($request->tuteur_id);
    }

    return response()->json(['success' => 'Compte élève créé avec succès'], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $eleve = Eleve::with('users')->findOrFail($id);

        return response()->json($eleve);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'edumaster' => 'nullable',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required',
            'classe_id' => 'required|exists:classes,id',
            'tuteur_id' => 'nullable|exists:tuteurs,id', // optional
            'photo' => 'nullable', // optional
            'nom' => 'required',
            'prenom' => 'required',
            'sexe' => 'required',
            'adresse' => 'required',
            'email' => 'nullable|email', // optional
            'telephone' => 'nullable', // optional
        ]);


        $eleve = Eleve::with('users')->findOrFail($id);


        // Update user
        $user = $eleve->users;
        $user->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'sexe' => $request->sexe,
            'telephone' => $request->telephone ?? $user->telephone,
            'adresse' => $request->adresse,
        ]);


            
        if ($request->email !== $user->email) {
            $user->update([
                'email' => $request->email ?? $user->email
            ]);
        }

        // Handle photo update
        if ($request->hasFile('photo')) {
            $path_photo = Storage::putFile('public/photos', $request->file('photo'));
            $eleve->photo = explode('/', $path_photo)[2];
        }

        // Update eleve
        $eleve->update([
            'matricule' => $request->matricule ?? $eleve->matricule,
            'edu_master' => $request->edumaster ?? $eleve->edumaster,
            'date_naissance' => $request->date_naissance,
            'lieu_naissance' => $request->lieu_naissance,
        ]);

        return response()->json(['user'=>$user,"message"=>'Modification effectuée avec succès']);
    }
}
