<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'eleves';

    public function notes()
    {
        return $this->HasMany(Note::class,'eleve_id'); 
    }

    public function absences()
    {
        return $this->HasMany(Absence::class,'eleve_id'); 
    }
    
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'eleve_classe', 'eleve_id', 'classe_id');

    }

    public function tuteurs(){

        return $this->belongsToMany(Tuteur::class, 'eleve_tuteur', 'eleve_id', 'tuteur_id');
    }

}
