<?php

namespace App\Http\Controllers;

use App\Models\PuntoRecoleccion;
use Illuminate\Http\Request;

class PuntoRecoleccionController extends Controller {

    // mostar puntos de recoleccion
    public function index() {
        $puntos = PuntoRecoleccion::with('generacion.ruta')->get();
        return response()->json($puntos);
    }

    // ver punto de recoleccion
    public function show($id) {
        $punto = PuntoRecoleccion::with('generacion')
                    ->findOrFail($id);

        return response()->json($punto);
    }

    // crear punto de recoleccion
    public function store(Request $request) {
        $request->validate([
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'volumen_estimado' => 'required|numeric',
            'id_generacion' => 'required|exists:generacion_basura,id_generacion'
        ]);

        $punto = PuntoRecoleccion::create($request->all());

        return response()->json($punto,201);
    }

    // actualizar punto de recoleccion
    public function update(Request $request,$id) {
        $punto = PuntoRecoleccion::findOrFail($id);

        $punto->update($request->all());

        return response()->json($punto);
    }

    // eliminar punto de recoleccion
    public function destroy($id) {
        $punto = PuntoRecoleccion::findOrFail($id);
        $punto->delete();

        return response()->json([
            'message'=>'Punto eliminado'
        ]);
    }
}