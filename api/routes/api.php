<?php
use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnneeScolaireController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\SalleClasseController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ToggleStatusController;
use App\Http\Controllers\TuteurController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NiveauxController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\UserSubmissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hi', function (Request $request) {
    return 'hi';
});

Route::apiResource('tuteurs', TuteurController::class)
    ->only(['index', 'show', 'update']);

Route::apiResource('admins', AdminController::class)
    ->only(['index', 'show', 'update']);

Route::apiResource('annees_scolaires', AnneeScolaireController::class)
    ->only(['index', 'store', 'show', 'update']);

Route::apiResource('classes', ClasseController::class)
    ->only(['index', 'store', 'show', 'update']);

Route::apiResource('salles', SalleController::class)
    ->only(['index', 'store', 'show', 'update']);

Route::post('users/toggle-status', [ToggleStatusController::class, 'toggleUserStatus']);
Route::post('users/toggle-verification', [UserSubmissionController::class, 'toggleVerificationStatus']);

Route::post('salles/link-salle-to-classe', [SalleClasseController::class, 'linkSalleToClasse']);

Route::apiResource('eleves', EleveController::class);

Route::apiResource('notes', NoteController::class);

Route::apiResource('matieres', MatiereController::class);

Route::apiResource('absences', AbsenceController::class);

Route::get('statistiques', [StatistiqueController::class, '__invoke']);

Route::apiResource('niveaux', NiveauxController::class)
    ->only(['index', 'show']);

require __DIR__ . '/auth.php';
