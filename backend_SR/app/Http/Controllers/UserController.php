<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    
    // Listar usuarios
    public function index() {
        $users = User::with('roles')->get();
        return response()->json($users);
    }

    // mostar roles
    public function rolesPersonal() {
        return Rol::where('nombre', '!=', 'ciudadano')->get();
    }

    // funcion para registrar usuarios ciudadanos
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

    // funcion para agregar usuarios (personal)
    public function storePersonal(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'rol_id' => 'required|exists:rol,id_rol',
        ]);

        // validar que no sea ciudadano
        $rol = Rol::findOrFail($request->rol_id);

        if ($rol->nombre === 'ciudadano') {
            return response()->json([
                'message' => 'No se puede asignar rol ciudadano en personal'
            ], 400);
        }

        // crear usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // asignar rol
        $user->roles()->attach($request->rol_id);

        return response()->json([
            'message' => 'usuario personal creado',
            'user' => $user->load('roles')
        ], 201);
    }

    // funcion para mostrar usuarios ciudadanos
    public function ciudadanos() {
        $users = User::whereHas('roles', function ($query) {
            $query->where('nombre', 'ciudadano');
        })->with('roles')->get();

        return response()->json($users);
    }

    // funcion para mostrar personal
    public function personal() {
        $users = User::whereHas('roles', function ($query) {
            $query->where('nombre', '!=', 'ciudadano');
        })->with('roles')->get();

        return response()->json($users);
    }

    // mostrar usuario
    public function show(string $id) {
        $user = User::findOrFail($id);
        return response()->json($user);
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

        // mandar datos usuario y rol
        $user = Auth::user()->load('roles');
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
    
}