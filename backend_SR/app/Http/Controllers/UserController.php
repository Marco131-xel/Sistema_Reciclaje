<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    
    // Listar usuarios
    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    // crear usuario
    public function create() {
        //
    }

    // guardar nuevo usuario
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        // crear usuario
        $user = User::create($request->all());

        // buscar rol ciudadano
        $rolCiudadano = Rol::where('nombre', 'ciudadano')->first();

        if ($rolCiudadano) {
            // asignar rol
            $user->roles()->attach($rolCiudadano->id_rol);
        }

        return response()->json(['message' => 'usuario creado', 'user' => $user->load('roles')], 201);
    }

    // mostrar usuario
    public function show(string $id) {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // editar un usuario
    public function edit(string $id) {
        //
    }

    // actualizar el usuario
    public function update(Request $request, string $id) {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|min:6',
        ]);

        $user->update($request->all());

        return response()->json([
            'message' => 'usuario actualizado', 'user' => $user]);
    }

    // eliminar un usuario
    public function destroy(string $id) {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'usuario eliminado']);
    }

    // login
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
    
}