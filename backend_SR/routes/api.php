<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::apiResource('users', UserController::class);
Route::post('/login', [UserController::class, 'login']);

// mostrar usuarios
Route::get('/usuarios/ciudadanos', [UserController::class, 'ciudadanos']);
Route::get('/usuarios/personal', [UserController::class, 'personal']);
// crear personal
Route::post('/usuarios/personal', [UserController::class, 'storePersonal']);

// mostrar roles
Route::get('/roles/personal', [UserController::class, 'rolesPersonal']);