<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RutaCoordenada;
use Illuminate\Http\Request;

class RutaCoordenadaController extends Controller {

    // listar todas la rutas coordenadas
    public function index() {
        $coords = RutaCoordenada::with('ruta')->get();
        return response()->json($coords);
    }


    // crear ruta coordenada
    public function store(Request $request) {
        $request->validate([
            'latitud' => 'required',
            'longitud' => 'required',
            'orden' => 'required',
            'id_ruta' => 'required'
        ]);

        $coord = RutaCoordenada::create($request->all());

        return response()->json([
            "message" => "Coordenada agregada",
            "data" => $coord
        ],201);
    }


    // mostra ruta coordenada espcifica
    public function show($id) {
        $coord = RutaCoordenada::find($id);

        if(!$coord){
            return response()->json([
                "message" => "Coordenada no encontrada"
            ],404);
        }

        return response()->json($coord);
    }


    // actualizar ruta coordenada
    public function update(Request $request, $id) {
        $coord = RutaCoordenada::find($id);

        if(!$coord){
            return response()->json([
                "message" => "Coordenada no encontrada"
            ],404);
        }

        $coord->update($request->all());

        return response()->json([
            "message" => "Coordenada actualizada",
            "data" => $coord
        ]);
    }


    // eliminar ruta coordenada
    public function destroy($id) {
        $coord = RutaCoordenada::find($id);

        if(!$coord){
            return response()->json([
                "message" => "Coordenada no encontrada"
            ],404);
        }

        $coord->delete();

        return response()->json([
            "message" => "Coordenada eliminada"
        ]);
    }

}