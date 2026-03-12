<?php

namespace App\Http\Controllers;

use App\Models\Recoleccion;
use Illuminate\Http\Request;

class RecoleccionController extends Controller {

    // listar recolecciones
    public function index() {
        $recolecciones = Recoleccion::with([
            'asignacion.camion',
            'asignacion.ruta',
            'incidencias'
        ])->get();

        return response()->json($recolecciones);
    }

    // mostrar una recoleccion
    public function show($id) {
        $recoleccion = Recoleccion::with([
            'asignacion.camion',
            'asignacion.ruta',
            'incidencias'
        ])->findOrFail($id);

        return response()->json($recoleccion);
    }

    // crear
    public function store(Request $request) {
        $request->validate([
            'hora_inicio' => 'required',
            'estado' => 'required|string',
            'id_asignacion' => 'required|exists:asignacion_camion,id_asignacion'
        ]);

        $recoleccion = Recoleccion::create($request->all());

        return response()->json($recoleccion,201);
    }

    // actualizar
    public function update(Request $request,$id) {
        $recoleccion = Recoleccion::findOrFail($id);

        $recoleccion->update($request->all());

        return response()->json($recoleccion);
    }

    // eliminar
    public function destroy($id) {
        $recoleccion = Recoleccion::findOrFail($id);

        $recoleccion->delete();

        return response()->json([
            'message'=>'Recoleccion eliminada'
        ]);
    }
}