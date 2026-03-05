<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ruta;
use Illuminate\Http\Request;

class RutaController extends Controller {

    // mostrar rutas
    public function index() {
        $rutas = Ruta::with('zona')->get();
        return response()->json($rutas);
    }

    // crear rutas
    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required',
            'inicio_lat' => 'required',
            'inicio_lon' => 'required',
            'fin_lat' => 'required',
            'fin_lon' => 'required',
            'distancia_km' => 'nullable',
            'dias_recoleccion' => 'nullable',
            'horario' => 'nullable',
            'tipo_residuo' => 'nullable',
            'id_zona' => 'required'
        ]);

        $ruta = Ruta::create($request->all());

        return response()->json([
            "message" => "Ruta creada",
            "data" => $ruta
        ], 201);
    }


    // mostrar ruta especifica
    public function show($id) {
        $ruta = Ruta::with(['zona','coordenadas'])->find($id);

        if(!$ruta){
            return response()->json([
                "message" => "Ruta no encontrada"
            ],404);
        }

        return response()->json($ruta);
    }


    // actualizar ruta
    public function update(Request $request, $id) {
        $ruta = Ruta::find($id);

        if(!$ruta){
            return response()->json([
                "message" => "Ruta no encontrada"
            ],404);
        }

        $ruta->update($request->all());

        return response()->json([
            "message" => "Ruta actualizada",
            "data" => $ruta
        ]);
    }


    // eliminar ruta
    public function destroy($id) {
        $ruta = Ruta::find($id);

        if(!$ruta){
            return response()->json([
                "message" => "Ruta no encontrada"
            ],404);
        }

        $ruta->delete();

        return response()->json([
            "message" => "Ruta eliminada"
        ]);
    }

}