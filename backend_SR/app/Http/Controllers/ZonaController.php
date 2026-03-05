<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zona;

class ZonaController extends Controller {
    
    // obtener todas las zonas
    public function index() {
        $zonas = Zona::all();
        return response()->json($zonas);
    }

    // crear una zona
    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'tipo' => 'nullable|string|max:50',
            'densidad_poblacional' => 'nullable|numeric'
        ]);

        $zona = Zona::create($request->all());

        return response()->json([
            'message' => 'Zona creada',
            'data' => $zona
        ], 201);
    }

    // mostrar una zona 
    public function show($id) {
        $zona = Zona::find($id);

        if (!$zona) {
            return response()->json([
                'message' => 'Zona no encontrada'
            ], 404);
        }

        return response()->json($zona);
    }

    // actualizar zona
    public function update(Request $request, $id) {
        $zona = Zona::find($id);

        if (!$zona) {
            return response()->json([
                'message' => 'Zona no encontrada'
            ], 404);
        }

        $zona->update($request->all());

        return response()->json([
            'message' => 'Zona actualizada',
            'data' => $zona
        ]);
    }

    // eliminar zona
    public function destroy($id) {
        $zona = Zona::find($id);

        if (!$zona) {
            return response()->json([
                'message' => 'Zona no encontrada'
            ], 404);
        }

        $zona->delete();

        return response()->json([
            'message' => 'Zona eliminada'
        ]);
    }
}