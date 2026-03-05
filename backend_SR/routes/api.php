<?php

use App\Http\Controllers\RutaController;
use App\Http\Controllers\RutaCoordenadaController;
use App\Http\Controllers\CamionController;
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