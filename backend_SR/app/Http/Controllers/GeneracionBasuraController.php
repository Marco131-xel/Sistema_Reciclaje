<?php

namespace App\Http\Controllers;

use App\Models\GeneracionBasura;
use Illuminate\Http\Request;

class GeneracionBasuraController extends Controller {

    // mostrar basura
    public function index() {
        $generaciones = GeneracionBasura::with(['ruta','puntos'])->get();
        return response()->json($generaciones);
    }

    // mostrar dato basura
    public function show($id) {
        $generacion = GeneracionBasura::with(['ruta','puntos'])->findOrFail($id);
        return response()->json($generacion);
    }

    // crear basura
    public function store(Request $request) {
        $request->validate([
            'cantidad_puntos' => 'required|integer',
            'volumen_estimado' => 'required|numeric',
            'total_estimado' => 'required|numeric',
            'dia_semana' => 'required|string',
            'id_ruta' => 'required|exists:ruta,id_ruta'
        ]);

        $generacion = GeneracionBasura::create($request->all());

        return response()->json($generacion,201);
    }

    // actualizar basura
    public function update(Request $request,$id) {
        $generacion = GeneracionBasura::findOrFail($id);

        $generacion->update($request->all());

        return response()->json($generacion);
    }

    // eliminar basura
    public function destroy($id){
        $generacion = GeneracionBasura::findOrFail($id);
        $generacion->delete();

        return response()->json([
            'message'=>'Generacion eliminada'
        ]);
    }
}