<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    public function users()
{
    return $this->belongsTo(User::class, 'user_id');
}

public function eleves(){

    return $this->belongsToMany(Eleve::class, 'eleve_tuteur', 'tuteur_id', 'eleve_id');
}

}
