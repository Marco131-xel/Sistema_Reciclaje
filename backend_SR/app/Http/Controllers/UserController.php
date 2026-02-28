<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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

        $user = User::create($request->all());

        return response()->json(['message' => 'usuario creado', 'user' => $user], 201);
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
}
