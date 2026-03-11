<?php

namespace App\Http\Controllers;

use App\Models\Recoleccion;
use Illuminate\Http\Request;

class RecoleccionController extends Controller {

    // mostrar recolecciones
    public function index() {
        $recolecciones = Recoleccion::with(['ruta','camion','incidencias'])->get();
        return response()->json($recolecciones);
    }

    // mostrar recoleccion 
    public function show($id) {
        $recoleccion = Recoleccion::with(['ruta','camion','incidencias'])
                        ->findOrFail($id);

        return response()->json($recoleccion);
    }

    // crear recoleccion
    public function store(Request $request) {
        $request->validate([
            'hora_inicio' => 'required',
            'estado' => 'required|string',
            'id_ruta' => 'required|exists:ruta,id_ruta',
            'id_camion' => 'required|exists:camion,id_camion'
        ]);

        $recoleccion = Recoleccion::create($request->all());

        return response()->json($recoleccion,201);
    }

    // actualizar recoleccion
    public function update(Request $request,$id) {
        $recoleccion = Recoleccion::findOrFail($id);
        $recoleccion->update($request->all());

        return response()->json($recoleccion);
    }

    // eliminar recoleccion
    public function destroy($id) {
        $recoleccion = Recoleccion::findOrFail($id);
        $recoleccion->delete();

        return response()->json([
            'message'=>'Recoleccion eliminada'
        ]);
    }
}