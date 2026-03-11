<?php

namespace App\Http\Controllers;

use App\Models\Incidencia;
use Illuminate\Http\Request;

class IncidenciaController extends Controller {
    
    // mostrar incidencias
    public function index() {
        $incidencias = Incidencia::with('recoleccion')->get();
        return response()->json($incidencias);
    }

    // mostrar incidencia especifica
    public function show($id) {
        $incidencia = Incidencia::with('recoleccion')->findOrFail($id);
        return response()->json($incidencia);
    }

    // crear incidencia
    public function store(Request $request) {
        $request->validate([
            'descripcion' => 'required|string',
            'fecha' => 'required|date',
            'id_recoleccion' => 'required|exists:recoleccion,id_recoleccion'
        ]);

        $incidencia = Incidencia::create($request->all());

        return response()->json($incidencia,201);
    }

    // actualizar incidencia
    public function update(Request $request,$id) {
        $incidencia = Incidencia::findOrFail($id);

        $incidencia->update($request->all());

        return response()->json($incidencia);
    }

    // eliminar incidencia
    public function destroy($id) {
        $incidencia = Incidencia::findOrFail($id);
        $incidencia->delete();

        return response()->json([
            'message'=>'Incidencia eliminada'
        ]);
    }
}