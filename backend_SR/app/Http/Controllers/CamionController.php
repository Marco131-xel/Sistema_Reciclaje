<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Camion;

class CamionController extends Controller {
    
    // obtener todos los camiones
    public function index() {
        $camiones = Camion::all();
        return response()->json($camiones);
    }

    // crear camion
    public function store(Request $request) {
        $request->validate([
            'placa' => 'required|string|max:20',
            'capacidad_ton' => 'required|numeric',
            'estado' => 'required|string|max:50',
            'conductor' => 'nullable|string|max:100'
        ]);

        $camion = Camion::create($request->all());

        return response()->json([
            'message' => 'Camión creado',
            'data' => $camion
        ], 201);
    }

    // mostrar camion 
    public function show($id) {
        $camion = Camion::find($id);

        if (!$camion) {
            return response()->json([
                'message' => 'Camión no encontrado'
            ], 404);
        }

        return response()->json($camion);
    }

    // actualizar camion
    public function update(Request $request, $id) {
        $camion = Camion::find($id);

        if (!$camion) {
            return response()->json([
                'message' => 'Camión no encontrado'
            ], 404);
        }

        $camion->update($request->all());

        return response()->json([
            'message' => 'Camión actualizado',
            'data' => $camion
        ]);
    }

    // eliminar camion
    public function destroy($id) {
        $camion = Camion::find($id);

        if (!$camion) {
            return response()->json([
                'message' => 'Camión no encontrado'
            ], 404);
        }

        $camion->delete();

        return response()->json([
            'message' => 'Camión eliminado'
        ]);
    }
}