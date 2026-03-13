<?php

use App\Http\Controllers\AsignacionCamionController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\RutaCoordenadaController;
use App\Http\Controllers\CamionController;
use App\Http\Controllers\ContenedorController;
use App\Http\Controllers\GeneracionBasuraController;
use App\Http\Controllers\IncidenciaController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PuntoRecoleccionController;
use App\Http\Controllers\PuntoVerdeController;
use App\Http\Controllers\RecoleccionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZonaController;

Route::apiResource('users', UserController::class);
Route::post('/login', [UserController::class, 'login']);

// mostrar usuarios
Route::get('/usuarios/ciudadanos', [UserController::class, 'ciudadanos']);
Route::get('/usuarios/personal', [UserController::class, 'personal']);
// crear personal
Route::post('/usuarios/personal', [UserController::class, 'storePersonal']);

// mostrar roles
Route::get('/roles/personal', [UserController::class, 'rolesPersonal']);

// Rutas, Zonas y Camiones
Route::apiResource('rutas', RutaController::class);
Route::apiResource('ruta-coordenadas', RutaCoordenadaController::class);
Route::apiResource('zonas', ZonaController::class);
Route::apiResource('camiones', CamionController::class);
Route::apiResource('asig-camion', AsignacionCamionController::class);

// basura, recoleccion e incidencias
Route::apiResource('generar-basura', GeneracionBasuraController::class);
Route::apiResource('punto-recoleccion', PuntoRecoleccionController::class);
Route::apiResource('recoleccion', RecoleccionController::class);
Route::apiResource('incidencia', IncidenciaController::class);

// puntos verdes, material y contenedor
Route::apiResource('punto-verde', PuntoVerdeController::class);
Route::apiResource('material', MaterialController::class);
Route::apiResource('contenedor', ContenedorController::class);